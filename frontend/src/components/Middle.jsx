import React, { useState } from 'react';
import Navbar from './Nav';
import Sidebar from './Sidebar';
import MainBody from './MainBody';

const Middle = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery]=useState('')

  const [notes, setNotes] = useState([]);

  const handleSaveNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

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
    setSidebarOpen={setSidebarOpen}
    activeCategory={activeCategory} 
    setActiveCategory={setActiveCategory}
    onLogout={onLogout}
    onSaveNote={handleSaveNote}
  />

  <div className={`flex-1 overflow-y-auto w-full transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-0' : 'md:-ml-64'}`}>
  <MainBody activeCategory={activeCategory} 
  searchQuery={searchQuery}
  notes={notes}
  />
</div>
</div>

    </div>
  );
};

export default Middle;