
import { toast } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import CreateNote from './NotesPages/CreateNote';
import axios from "axios";
import SortDropDown from "./NotesPages/SortDropDown";

const MainBody = ({ activeCategory }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc");

  const filteredNotes = notes.filter((note) => {
    if (!activeCategory || activeCategory === "all") return true;
    if (activeCategory === "pinned") return note.isPinned;
    if (activeCategory === "trash") return note.isDeleted;
    return note.category === activeCategory;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === "date-desc") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "date-asc") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "title-asc") return a.title.localeCompare(b.title);
    if (sortBy === "title-desc") return b.title.localeCompare(a.title);
    if (sortBy === "pinned-first") return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
    return 0;
  });

  const getAllNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user-notes', {
        withCredentials: true,
      });
      if (response.data.success) {
        setNotes(response.data.response || []);
      }
    } catch (error) {
      console.error("Fetch notes error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch notes");
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleSaveNote = () => {
    getAllNotes();
    setIsModelOpen(false);
  };

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
      const response = await axios.post(
        `http://localhost:5000/api/delete-note/${noteId}`,
        {},
        { withCredentials: true }
      );
      if (response.data?.success) {
        toast.success(response.data.message || "Note deleted successfully");
        setNotes((prevNotes) => prevNotes.filter((n) => (n._id || n.id) !== noteId));
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to delete note");
    }
  };

  const handleUpdate = async (e, note) => {
    e.stopPropagation();
  };

  return (
    <>
      <main className="flex-1 p-3 sm:p-5 md:p-6 max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-4 pb-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight capitalize">
              {activeCategory ? `${activeCategory} Notes` : "My Notes"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Manage and organize your ideas
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModelOpen(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-medium text-xs sm:text-sm px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
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
            <div className="bg-white cursor-pointer dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs transition-all border-l-4 border-l-teal-500">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
                  No notes found
                </h3>
              </div>
            </div>
          ) : (
            sortedNotes.map((note) => {
              const currentId = note._id || note.id;
              return (
                <div
                  key={currentId}
                  className={`group relative bg-white cursor-pointer dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all border-l-4 ${
                    note.isPinned
                      ? "border-l-amber-500 bg-amber-50/20 dark:bg-amber-950/10"
                      : "border-l-teal-500"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-semibold line-clamp-1 text-slate-900 dark:text-slate-100 text-base sm:text-lg">
                      {note.title}
                    </h3>

                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 pointer-events-none group-hover:pointer-events-auto">
                      {/* Pin Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePin(e, currentId);
                        }}
                        title={note.isPinned ? "Unpin note" : "Pin note"}
                        className={`relative z-20 pointer-events-auto p-1.5 cursor-pointer rounded-lg transition-colors ${
                          note.isPinned
                            ? "text-amber-500 bg-amber-100/50 dark:bg-amber-900/30 hover:bg-amber-200/50"
                            : "text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
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

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={(e) => handleUpdate(e, note)}
                        title="Edit note"
                        className="relative z-20 pointer-events-auto p-1.5 rounded-lg cursor-pointer text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, currentId)}
                        title="Delete note"
                        className="relative z-20 pointer-events-auto p-1.5 rounded-lg text-slate-400 cursor-pointer hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                  </div>

                  <p className="text-slate-600 line-clamp-3 dark:text-slate-400 text-sm mt-1">
                    {note.description}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </main>

      <CreateNote
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onSaveNote={handleSaveNote}
      />
    </>
  );
};

export default MainBody;