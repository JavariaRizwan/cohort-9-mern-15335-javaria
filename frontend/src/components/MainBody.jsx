
import React from 'react';
import {useState} from 'react'
import CreateNote from './NotesPages/CreateNote';

const MainBody = () => {
  const [isModelOpen, setIsModelOpen]=useState(false);

  return (

<>
<main className="flex-1 p-3 sm:p-5 md:p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            My Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage and organize your ideas
          </p>
        </div>

        <button
          type="button" onClick={()=>setIsModelOpen(true)}
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

      <div className="space-y-3">
        <div className="bg-white cursor-pointer dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all border-l-4 border-l-teal-500">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
              Accessibility Ideas for Notes App
            </h3>
            <span className="text-amber-500">★</span>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Prioritize white space, high-contrast typography, and quick thumb access...
          </p>
          <span className="inline-block text-xs text-slate-400 mt-3">2 hours ago</span>
        </div>

        
      </div>
    </main>


<CreateNote
isOpen={isModelOpen}
onClose={()=>setIsModelOpen(false)}
onSaveNote={(newNote)=>setNotes([newNote, ...notes])}  
/>
</>
  );
};

export default MainBody;