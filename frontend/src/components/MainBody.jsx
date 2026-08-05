
import { toast } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import CreateNote from './NotesPages/CreateNote';
import DOMPurify from 'dompurify'

import axios from "axios";
import SortDropDown from "./NotesPages/SortDropDown";
import sortingOptions from '../data/sortingOptions';



const MainBody = ({ activeCategory, searchQuery }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc");
  const [isEditingNote, setIsEditingNote] = useState(null)
  const [deletingNoteId, setDeletingNoteId] = useState(null);


  const currentCategory = activeCategory || "all";


  const getAllNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user-notes', {
        withCredentials: true,
      });
      if (response.data.success) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Fetch notes error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch notes");
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);


  const openDeletePopup = (e, noteId) => {
    e.stopPropagation();
    setDeletingNoteId(noteId);
  };

  const closeDeletePopup = () => {
    setDeletingNoteId(null);
  };


  const handleOpenCreateModal = () => {
    setIsEditingNote(null);
    setIsModelOpen(true);
  };

  const handleCloseModal = () => {
    setIsModelOpen(false);
    setIsEditingNote(null);
  };


  const filteredNotes = notes.filter((note) => {

    if (note.isDeleted && currentCategory !== "trash") {
      return false;
    }

    const query = searchQuery?.toLowerCase().trim() || '';
    const matchingSearch = query === '' ||
      note.title?.toLowerCase().includes(query) || note.description?.toLowerCase().includes(query)
      || note.category?.toLowerCase().includes(query) || note.subCategory?.toLowerCase().includes(query);

    if (currentCategory === "pinned") { return (note.isPinned && matchingSearch) };
    if (!currentCategory || currentCategory === "all") { return !note.isArchived && matchingSearch; }
    if (note.isDeleted && currentCategory === "trash") { return note.isDeleted && matchingSearch; }
    if (note.isArchived && currentCategory === "archived") { return note.isArchived && matchingSearch; }

    return note.category === currentCategory && matchingSearch;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    const activeOption = sortingOptions.find((option) => option.value === sortBy);
    return activeOption?.compareFn ? activeOption.compareFn(a, b) : 0;
  });



  const handleSaveNote = () => {
    getAllNotes();
    setIsModelOpen(false);
    setIsEditingNote(null);
  };


  const handleKeyDownNote = (e, note) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleUpdate(e, note);
    }
  };


  const handleArchive = async (e, noteId) => {
    e.stopPropagation();
    try {
      const response = await axios.put(`http://localhost:5000/api/archive-note/${noteId}`, {}, { withCredentials: true });
      if (response.data?.success) {
        toast.success(response.data.message || "Note archived successfully");
        getAllNotes();
      }
    }

    catch (error) {
      toast.error("Failed to archive note");
      console.error("Error while archiving the note", error.message);
    }
  }


  const handlePermanentDelete = async (e, noteId) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`http://localhost:5000/api/permanent-delete/${noteId}`, { withCredentials: true });
      if (response.data?.success) {
        toast.success(`Note ${noteId} deleted successfully`);
        getAllNotes();
      }

    } catch (error) {
      toast.error("Error happened while deleting");
      console.error(error.message);
    }
  }



  const handlePin = async (e, noteId) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/pin-note/${noteId}`,
        {},
        { withCredentials: true }
      );
      if (response.data?.success) {
        toast.success(response.data.message || "Pin status updated");
        getAllNotes();
      }
    } catch (error) {
      console.error("Pin error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to pin note");
    }
  };

  const handleDelete = async (e, noteId) => {
    e.stopPropagation();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/delete-note/${noteId}`,
        {},
        { withCredentials: true }
      );
      if (response.data?.success) {
        toast.success(response.data.message || "Note deleted successfully");
        // setNotes((prevNotes) => prevNotes.filter((n) => (n._id || n.id) !== noteId));
        getAllNotes();
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      toast.error("Failed to delete note");
    }
  };

  const handleUpdate = async (e, note) => {
    e.stopPropagation();
    setIsEditingNote(note);
    setIsModelOpen(true);
  };

  return (
    <>
      <main className="flex-1 p-3 sm:p-5 md:p-6 max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-4 pb-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight capitalize">
              {activeCategory ? `${activeCategory} Notes` : "My Notes"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage and organize your ideas
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium text-xs sm:text-sm px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="hidden xs:inline">Create New Note</span>
            <span className="xs:hidden">New Note</span>
          </button>
        </div>

        <SortDropDown sortBy={sortBy} setSortBy={setSortBy} />

        <div className="space-y-3">
          {sortedNotes.length === 0 ? (
            <div className="bg-white cursor-pointer border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs transition-all border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-slate-900 text-base sm:text-lg">
                  No {currentCategory} notes found
                </h3>
              </div>
            </div>
          ) : (
            sortedNotes.map((note) => {
              const currentId = note._id || note.id;
              return (
                <div role="button"
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDownNote(e, note)}
                  onClick={(e) => handleUpdate(e, note)}
                  key={currentId}
                  className={`group relative text-left w-full bg-white cursor-pointer border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all border-l-4 ${note.isPinned
                      ? "border-l-amber-500 bg-amber-50/20 "
                      : "border-l-blue-500"
                    }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-semibold line-clamp-1 text-slate-900 text-base sm:text-lg">
                      {note.title}
                    </h3>


                    {currentCategory === "trash" ?  (
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 pointer-events-none group-hover:pointer-events-auto">


                          <button
                            type="button"
                            onClick={(e) => handleDelete(e, currentId)}
                            title="Restore note"
                            className="relative z-20 pointer-events-auto p-1.5 rounded-lg text-slate-400 cursor-pointer hover:text-blue-500 hover:bg-blue-100  transition-colors"
                          >
                            <svg
                              className="w-4 h-4 pointer-events-none"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                              />
                            </svg>

                          </button>


                        
                        <button
                          type="button"
                          onClick={(e) => openDeletePopup(e, currentId)}
                          title="Delete note"
                          className="relative z-20 pointer-events-auto p-1.5 rounded-lg text-slate-400 cursor-pointer hover:text-rose-500 hover:bg-slate-100  transition-colors"
                        >
                          <svg
                            className="w-4 h-4 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>

                      </div>

                    )
                      :

                      currentCategory === 'archived' ?
(
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 pointer-events-none group-hover:pointer-events-auto">


                          <button
                            type="button"
                            onClick={(e) => handleArchive(e, currentId)}
                            title="Un Archive note"
                            className="relative z-20 pointer-events-auto p-1.5 rounded-lg cursor-pointer text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                          >
                  <svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  width="24" 
  height="24" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="2" 
  strokeLinecap="round" 
  strokeLinejoin="round"
>
  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  <path d="M12 15V9" />
  <path d="m9 12 3-3 3 3" />
</svg>

                          </button>



                          <button
                            type="button"
                            //  onClick={(e) => handlePermanentDelete(e, currentId)}
                            onClick={(e) => handleDelete(e, currentId)}
                            title="Delete note"
                            className="relative z-20 pointer-events-auto p-1.5 rounded-lg text-slate-400 cursor-pointer hover:text-rose-500 hover:bg-slate-100  transition-colors"
                          >
                            <svg
                              className="w-4 h-4 pointer-events-none"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
)
                        :

                        (
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 pointer-events-none group-hover:pointer-events-auto">

  <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePin(e, currentId);
                          }}
                          title={note.isPinned ? "Unpin note" : "Pin note"}
                          className={`relative z-20 pointer-events-auto p-1.5 cursor-pointer rounded-lg transition-colors ${note.isPinned
                              ? "text-amber-500 bg-amber-100/50 hover:bg-amber-200/50"
                              : "text-slate-400 hover:text-amber-500 hover:bg-slate-100"
                            }`}
                        >
                          <svg
                            className="w-4 h-4 pointer-events-none"
                            fill={note.isPinned ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>


                        <button
                          type="button"
                          onClick={(e) => handleArchive(e, currentId)}
                          title="Archive note"
                          className="relative z-20 pointer-events-auto p-1.5 rounded-lg cursor-pointer text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                        >
                          <svg
                            className="w-4 h-4 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8v13H3V8M1 3h22v5H1V3zm10 9h4"
                            />
                          </svg>

                        </button>


                        <button
                          type="button"
                          onClick={(e) => handleUpdate(e, note)}
                          title="Edit note"
                          className="relative z-20 pointer-events-auto p-1.5 rounded-lg cursor-pointer text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                        >
                          <svg
                            className="w-4 h-4 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                            />
                          </svg>
                        </button>


                          <button
                            type="button"
                            //  onClick={(e) => handlePermanentDelete(e, currentId)}
                            onClick={(e) => handleDelete(e, currentId)}
                            title="Delete note"
                            className="relative z-20 pointer-events-auto p-1.5 rounded-lg text-slate-400 cursor-pointer hover:text-rose-500 hover:bg-slate-100  transition-colors"
                          >
                            <svg
                              className="w-4 h-4 pointer-events-none"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>

</div>
                        )
}

                  </div>

                  <div
                    className="text-slate-600 text-sm mt-1 line-clamp-1 prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(note.description || '')
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </main>

      <CreateNote
        isOpen={isModelOpen}
        onClose={handleCloseModal}
        onSaveNote={handleSaveNote}
        isEditingNote={isEditingNote}
      />

      {deletingNoteId && (
        <div id="delete-confirmation" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg font-bold mb-2">⚠️ Warning</p>
            <p className="text-sm text-gray-600 mb-4">Do you really want to delete it? It will be permanent and you can't recover it.</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeDeletePopup}
                className="px-4 py-2 bg-gray-200 rounded text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => {
                  handlePermanentDelete(e, deletingNoteId);
                  closeDeletePopup();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded text-sm cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

      )}


    </>
  );
};

export default MainBody;