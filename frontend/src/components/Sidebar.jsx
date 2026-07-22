import React from 'react';
import { BookOpen, Folder, Star, Trash2, Tag, LogOut } from 'lucide-react';

const Sidebar = ({ sidebarOpen, onLogout }) => {
  return (
    <aside
      className={`fixed md:sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shrink-0 z-30 transition-all duration-300 ease-in-out flex flex-col justify-between ${
        sidebarOpen 
          ? 'translate-x-0 opacity-100' 
          : '-translate-x-full md:translate-x-0 md:w-0 md:p-0 md:overflow-hidden md:border-none opacity-0 md:opacity-100'
      }`}
    >
      <div className="space-y-6">
        {/* Workspace Navigation */}
        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Workspace
          </p>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400">
              <BookOpen size={18} />
              All Notes
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Star size={18} />
              Favorites
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Folder size={18} />
              Folders
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Tag size={18} />
              Tags
            </button>
          </nav>
        </div>

        {/* Archive Navigation */}
        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Archive
          </p>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Trash2 size={18} />
              Trash
            </button>
          </nav>
        </div>
      </div>

      {/* Logout Action */}
      {onLogout && (
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors mt-auto"
        >
          <LogOut size={18} />
          Log Out
        </button>
      )}
    </aside>
  );
};

export default Sidebar;