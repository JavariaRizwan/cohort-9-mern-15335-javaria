import React, { useState } from 'react';
import Navbar from './Nav';
import Sidebar from './Sidebar';
import MainBody from './MainBody';

const Middle = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery]=useState('')


  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/** I need the search query to be set by Nav componeent so use setSearchQuery here in this componenet */}
      <Navbar onToggleSidebar={toggleSidebar} 
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery}/>

      <div className="pt-16 flex-1 flex flex-row overflow-hidden relative w-full">
  {sidebarOpen && (
    <button type="button" aria-label="Close sidebar overlay"
      onClick={() => setSidebarOpen(false)}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-20 md:hidden"
    />
  )}

  <Sidebar 
    sidebarOpen={sidebarOpen}
    activeCategory={activeCategory} 
    setActiveCategory={setActiveCategory}
    onLogout={onLogout} 
  />

  <div className={`flex-1 overflow-y-auto w-full transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-0' : 'md:-ml-64'}`}>
  <MainBody activeCategory={activeCategory} 
  searchQuery={searchQuery}
  />
</div>
</div>

    </div>
  );
};

export default Middle;