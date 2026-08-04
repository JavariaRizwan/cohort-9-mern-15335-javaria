import React, {useState} from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { useNavigate } from 'react-router-dom' 
import { BookOpen, Folder, Star, Trash2, LogOut } from 'lucide-react';
import CreateNote from './NotesPages/CreateNote';

const Sidebar = ({ sidebarOpen, setSidebarOpen, onLogout, activeCategory, setActiveCategory, onSaveNote }) => {

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

const handleNavClick = (category) => {
  setActiveCategory(category);
  if (window.innerWidth < 768) {
    setSidebarOpen(false);
  }
};



  return (

<>

    {/* <aside

className={`sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shrink-0 z-30 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
  sidebarOpen 
    ? 'translate-x-0' 
    : '-translate-x-full md:-translate-x-full'
}`}
    > */}
    <aside
      className={`fixed md:sticky left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shrink-0 z-30 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
        sidebarOpen 
          ? 'translate-x-0' 
          : '-translate-x-full md:-translate-x-full'
      }`}
    >
      <div className="space-y-6">
        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Workspace
          </p>
          <nav className="space-y-1">

             <button 
             onClick={() => {
    setIsModelOpen(true);
    if (window.innerWidth < 768 && setSidebarOpen) {
      setSidebarOpen(false);
    }
  }}
  type="button"
  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium text-sm px-3 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
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

            <button
onClick={() => handleNavClick('all')} 
            type="button"
            className={`w-full flex items-center cursor-pointer gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
    !activeCategory || activeCategory === 'all'
      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  }`}>
              <BookOpen size={18} />
              All Notes
            </button>
            <button
            onClick={() => handleNavClick('pinned')}
            type="button" 
            className={`w-full flex items-center cursor-pointer gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
    activeCategory === 'pinned'
      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  }`}>
              <Star size={18} />
              Pinned
            </button>
            <button
            onClick={() => handleNavClick('archived')}
            type="button" className={`w-full flex items-center cursor-pointer gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
    activeCategory === 'archived'
      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  }`}>
              <Folder size={18} />
              Archived
            </button>
            {/* <button
            onClick={() => setActiveCategory('categories')}
            type="button" className="w-full flex cursor-pointer items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <LayoutGrid size={18} />
              Categories
            </button> */}
          </nav>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Archive
          </p>
          <nav className="space-y-1">
            <button
              onClick={() => handleNavClick('trash')}
              type="button" className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
    activeCategory === 'trash'
      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  }`}>
              <Trash2 size={18} />
              Trash
            </button>
          </nav>
        </div>
      </div>

      {onLogout && (
        <button type="button" 
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
onSaveNote={onSaveNote}
/>

</>
  );
};

export default Sidebar;