import React, { useState } from 'react';
import Navbar from './Nav';
import Sidebar from './Sidebar';
import MainBody from './MainBody';

const Middle = ({ onLogout }) => {
  // 1. Sidebar open/close toggle state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 2. State to sync selected filter/category between Sidebar and MainBody
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Fixed top Navbar */}
      <Navbar onToggleSidebar={toggleSidebar} />

      {/* Main Workspace Layout below Navbar */}
      <div className="pt-16 flex-1 flex flex-row overflow-hidden relative w-full">
        {/* Mobile backdrop overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-20 md:hidden"
          />
        )}

        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          onLogout={onLogout} 
        />

        {/* Main Canvas / Content Feed */}
        <MainBody activeCategory={activeCategory} />
      </div>
    </div>
  );
};

export default Middle;