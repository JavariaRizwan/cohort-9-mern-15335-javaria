
import { toast } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import CreateNote from './NotesPages/CreateNote';
import DOMPurify from 'dompurify'


import {RotateCcw, Trash2, ArchiveRestore, Archive, Pin, Pencil, Plus} from 'lucide-react'

import axios from "axios";
import SortDropDown from "./NotesPages/SortDropDown";
import sortingOptions from '../data/sortingOptions';

import DownloadNote from '../additional-features/DownloadNote';
import ImportFile from "../additional-features/ImportFile"


const getNoteActionButtons=(currentCategory, note, currentId, buttonHandlers)=>{
  const { handleDelete, openDeletePopup, handleArchive, handlePin, handleUpdate } = buttonHandlers;




  switch(currentCategory){
    case "trash":
      return (
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 pointer-events-none group-hover:pointer-events-auto">


                          <button
                            type="button"
                            onClick={(e) => handleDelete(e, currentId)}
                            title="Restore note"
                            className="relative z-20 pointer-events-auto p-1.5 rounded-lg text-slate-400 cursor-pointer hover:text-blue-500 hover:bg-blue-100  transition-colors"
                          >
                            <RotateCcw className="w-4 h-4 pointer-events-none" strokeWidth={2} />

                          </button>


                        
                        <button
                          type="button"
                          onClick={(e) => openDeletePopup(e, currentId)}
                          title="Delete note"
                          className="relative z-20 pointer-events-auto p-1.5 rounded-lg text-slate-400 cursor-pointer hover:text-rose-500 hover:bg-slate-100  transition-colors"
                        >
            <Trash2 className="w-4 h-4 pointer-events-none" strokeWidth={2} />
                        </button>

                      </div>

      )

      case "archived":
        return (
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 pointer-events-none group-hover:pointer-events-auto">


                          <button
                            type="button"
                            onClick={(e) => handleArchive(e, currentId)}
                            title="Un Archive note"
                            className="relative z-20 pointer-events-auto p-1.5 rounded-lg cursor-pointer text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                          >
            <ArchiveRestore className="w-4 h-4 pointer-events-none" strokeWidth={2} />

                          </button>



                          <button
                            type="button"
                            onClick={(e) => handleDelete(e, currentId)}
                            title="Delete note"
                            className="relative z-20 pointer-events-auto p-1.5 rounded-lg text-slate-400 cursor-pointer hover:text-rose-500 hover:bg-slate-100  transition-colors"
                          >
            <Trash2 className="w-4 h-4 pointer-events-none" strokeWidth={2} />
                          </button>
                        </div>
        )

        default:
          return (
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
 <Pin
              className="w-4 h-4 pointer-events-none"
              strokeWidth={2}
              fill={note.isPinned ? "currentColor" : "none"}
            />                        </button>


                        <button
                          type="button"
                          onClick={(e) => handleArchive(e, currentId)}
                          title="Archive note"
                          className="relative z-20 pointer-events-auto p-1.5 rounded-lg cursor-pointer text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                        >
                          <Archive className="w-4 h-4 pointer-events-none" strokeWidth={2} />

                        </button>


                        <button
                          type="button"
                          onClick={(e) => handleUpdate(e, note)}
                          title="Edit note"
                          className="relative z-20 pointer-events-auto p-1.5 rounded-lg cursor-pointer text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                        >
            <Pencil className="w-4 h-4 pointer-events-none" strokeWidth={2} />
                        </button>


                          <button
                            type="button"
                            onClick={(e) => handleDelete(e, currentId)}
                            title="Delete note"
                            className="relative z-20 pointer-events-auto p-1.5 rounded-lg text-slate-400 cursor-pointer hover:text-rose-500 hover:bg-slate-100  transition-colors"
                          >
            <Trash2 className="w-4 h-4 pointer-events-none" strokeWidth={2} />
                          </button>

</div>

          )


  }
}




const MainBody = ({ activeCategory, searchQuery, categories=[] }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc");
  const [isEditingNote, setIsEditingNote] = useState(null)
  const [deletingNoteId, setDeletingNoteId] = useState(null);

  const parseFileContent=(content)=>{
    const title=content.match(/^Title:(.*)$/m)
    const category=content.match(/^Category:(.*)$/m)
    const description=content.match(/Description:\n([\s\S]*)/)

    if(!title){ throw new Error('Invalid file format')};
    return {
        title: title[1].trim(),
        category: category ? category[1].trim() : '',
        description: description ? description[1].trim() : '',
    };

  }




  const handleFileImport=(fileContent)=>{
    try {
   const parseddata=parseFileContent(fileContent);
    setIsEditingNote({
      title:parseddata.title || "",
      description:parseddata.description || "",
      category:parseddata.category || "",
         });
    setIsModelOpen(true);
      
    } 
    catch (error) {
  console.error("Error occured while parsing data in the file", error.message);
  toast.error("Inavid File Format")      
    }
  }


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
      || note.category?.c_name.toLowerCase().includes(query);

    if (currentCategory === "pinned") { return (note.isPinned && matchingSearch) };
    if (!currentCategory || currentCategory === "all") { return !note.isArchived && matchingSearch; }
    if (currentCategory === "trash") { return note.isDeleted && matchingSearch; }
    if (currentCategory === "archived") { return note.isArchived && matchingSearch; }

    return note.category?.c_name === currentCategory && matchingSearch;
  });


const filteredCategories = categories.filter((cat) => {
  const catName = typeof cat === 'string' ? cat : cat.c_name;
  const query = searchQuery?.toLowerCase().trim() || '';
  return query === '' || catName?.toLowerCase().includes(query);
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
              {currentCategory === 'categories' 
                ? 'All Categories' 
                : activeCategory ? `${activeCategory} Notes` : "My Notes"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {currentCategory === 'categories' 
                ? 'Manage and view all your note categories' 
                : 'Manage and organize your ideas'}
            </p>
          </div>

<div className="flex items-center gap-2 sm:gap-3 shrink-0">
<button
  type="button"
  onClick={handleOpenCreateModal}
  className="cursor-pointer inline-flex items-center gap-1.5 justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-2 py-1.5 sm:px-4 sm:py-2.5 text-center leading-5 transition-all shadow-sm"
>
  <Plus className="w-4 h-4" strokeWidth={2.5} />

  <span className="hidden sm:inline">New Note</span>
</button>

<ImportFile onFileImport={handleFileImport}/>
</div>


        </div>

{currentCategory!=="categories" &&
        <SortDropDown sortBy={sortBy} setSortBy={setSortBy} />

}



<div className="space-y-3">

          {currentCategory === 'categories' ? (
            filteredCategories.length === 0 ? (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
                <p className="text-slate-500 text-sm">No categories found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredCategories.map((cat) => {
                  const catName = typeof cat === 'string' ? cat : cat.c_name;
                  const catId = cat._id || cat.id;
                  return (
                    <button type="button" 
                      key={catId}
                      onClick={() => handleNavClick(catName)}
className="w-full text-left bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-between group hover:-translate-y-0.5">
                      <p className="text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                        {catName}
                      </p>


                    </button>
                   
                  );
                })}
              </div>
            )
          ) : (
            sortedNotes.length === 0 ? (
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
                  <button type="button"
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyDownNote(e, note)}
                    onClick={(e) => handleUpdate(e, note)}
                    key={currentId}
                    className={`group relative text-left w-full bg-white cursor-pointer border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all border-l-4 ${note.isPinned
                      ? "border-l-amber-500 bg-amber-50/20 "
                      : "border-l-blue-500"
                    }`}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <h3 className="font-semibold line-clamp-1 text-slate-900 text-base sm:text-lg">
                        {note.title}
                      </h3>
                      <button type="button" className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                        {getNoteActionButtons(currentCategory, note, currentId, {
                          handleDelete,
                          openDeletePopup,
                          handleArchive,
                          handlePin,
                          handleUpdate
                        })}
                        <DownloadNote note={note} />
                      </button>
                    </div>

                    <div
                      className="text-slate-600 text-sm mt-1 line-clamp-1 prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(note.description || '')
                      }}
                    />
                  </button>
                );
              })
            )
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