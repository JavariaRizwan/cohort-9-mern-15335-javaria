import React, { useState } from 'react';
import Navbar from './Nav';
import Sidebar from './Sidebar';
import MainBody from './MainBody';

const Middle = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [activeCategory, setActiveCategory] = useState('all');

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="pt-16 flex-1 flex flex-row overflow-hidden relative w-full">
        {sidebarOpen && (
          <button type="button" aria-label="Close sidebar overlay"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-20 md:hidden"
          />
        )}

        <Sidebar 
          isOpen={sidebarOpen} 
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          onLogout={onLogout} 
        />

        <MainBody activeCategory={activeCategory} />
      </div>
    </div>
  );
};

export default Middle;