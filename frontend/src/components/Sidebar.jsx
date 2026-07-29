import React, {useState} from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { useNavigate } from 'react-router-dom' 
import { BookOpen, Folder, Star, Trash2, Tag, LogOut } from 'lucide-react';
import CreateNote from './NotesPages/CreateNote';

const Sidebar = ({ sidebarOpen, onLogout }) => {

const [isModelOpen, setIsModelOpen]=useState(false);


  const navigate=useNavigate();
const handleLogout=async()=>{
  try {
    await axios.post('http://localhost:5000/api/logout', 
      {},
      {withCredentials:true}
    );
    toast.success('User Logged out');
    navigate('/signin', { replace: true });
  } catch (error) {
    console.error(error.message);
  }
}





  return (

<>

    <aside
      className={`fixed md:sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shrink-0 z-30 transition-all duration-300 ease-in-out flex flex-col justify-between ${
        sidebarOpen 
          ? 'translate-x-0 opacity-100' 
          : '-translate-x-full md:translate-x-0 md:w-0 md:p-0 md:overflow-hidden md:border-none opacity-0 md:opacity-100'
      }`}
    >
      <div className="space-y-6">
        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Workspace
          </p>
          <nav className="space-y-1">

             <button onClick={()=>setIsModelOpen(true)}
  type="button"
  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-medium text-sm px-3 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
>
  <svg
    className="w-4 h-4 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
  <span>Create New Note</span>
</button>

            <button className="w-full flex items-center cursor-pointer gap-3 px-3 py-2 text-sm font-medium rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400">
              <BookOpen size={18} />
              All Notes
            </button>
            <button className="w-full flex cursor-pointer items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Star size={18} />
              Pinned
            </button>
            <button className="w-full flex items-center cursor-pointer gap-3 px-3 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Folder size={18} />
              Folders
            </button>
            <button className="w-full flex cursor-pointer items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Tag size={18} />
              Tags
            </button>
          </nav>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Archive
          </p>
          <nav className="space-y-1">
            <button className="cursor-pointer w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Trash2 size={18} />
              Trash
            </button>
          </nav>
        </div>
      </div>

      {onLogout && (
        <button 
          onClick={handleLogout}
          className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors mt-auto"
        >
          <LogOut size={18} />
          Log Out
        </button>
      )}
    </aside>

<CreateNote 
isOpen={isModelOpen}
onClose={()=>{setIsModelOpen(false)}}
onSaveNote={(newNote)=>setNotes([newNote, ...notes])}
/>

</>
  );
};

export default Sidebar;