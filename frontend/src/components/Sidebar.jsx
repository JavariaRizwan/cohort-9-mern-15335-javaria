import React, {useState} from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { useNavigate } from 'react-router-dom' 
import { BookOpen, Folder, Star, Trash2, LogOut, LayoutGrid, Plus, FolderPlus } from 'lucide-react';
import CreateNote from './NotesPages/CreateNote';

const Sidebar = ({ sidebarOpen, setSidebarOpen, onLogout, activeCategory, setActiveCategory, onCategoryAdded }) => {

const [isModelOpen, setIsModelOpen]=useState(false);
const [categoryModel, setCategoryModel]=useState(false);
const [formData, setFormData]=useState({c_name:''});

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



const handleChange=(e)=>{
  const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value        }));
}

  const handleSaveCategory = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`http://localhost:5000/api/save-category`,
        {c_name: formData.c_name},
         { withCredentials: true });
      if (response.data?.success) {
        toast.success(`Category saved successfully`);
   setFormData({ c_name: '' });
   closeSavePopup(); 
      
  if (onCategoryAdded) {
          onCategoryAdded();
        }
  }

    } catch (error) {
      toast.error("Error happened while Saving category");
      console.error(error.message);
    }
  }

const openSavePopup = (e) => {
    e.stopPropagation();
    setCategoryModel(true);
  };

  const closeSavePopup = () => {
    setCategoryModel(false);
    setFormData({ c_name: '' });
  };




  return (

<>

    <aside
inert={!sidebarOpen ? "" : undefined}
className={`fixed md:sticky left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white p-4 shrink-0 z-30 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
    sidebarOpen 
      ? 'translate-x-0' 
      : '-translate-x-full md:-translate-x-full'
  }`}
    >
      <div className="space-y-6">
        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Workspace
          </p>
          <nav className="space-y-1">



<div className="flex gap-2 px-3 mb-3 w-full">
    <button 
        type="button"
                     onClick={() => {
    setIsModelOpen(true);
    if (window.innerWidth < 768 && setSidebarOpen) {
      setSidebarOpen(false);
    }
  }} 
        className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium text-xs py-2 px-2 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
        title="Create New Note"
    >
  <Plus className="w-4 h-4" strokeWidth={2.5} />

        <span>New Note</span>
    </button>

    <button 
        type="button" 
        onClick={openSavePopup}
        className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-blue-600 hover:bg-blue-50 text-blue-600 font-medium text-xs py-2 px-2 rounded-xl shadow-sm transition-all active:scale-[0.98] cursor-pointer"
        title="Add Category"
    >
           <FolderPlus className="w-4 h-4" strokeWidth={2} />

        <span>Category</span>
    </button>
</div>



            <button
onClick={() => handleNavClick('all')} 
            type="button"
            className={`w-full flex items-center cursor-pointer gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
    !activeCategory || activeCategory === 'all'
      ? 'bg-blue-50 text-blue-600'
      : 'text-slate-600 hover:bg-slate-100'
  }`}>
              <BookOpen size={18} />
              All Notes
            </button>
            <button
            onClick={() => handleNavClick('pinned')}
            type="button" 
            className={`w-full flex items-center cursor-pointer gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
    activeCategory === 'pinned'
      ? 'bg-blue-50 text-blue-600'
      : 'text-slate-600 hover:bg-slate-100'
  }`}>
              <Star size={18} />
              Pinned
            </button>
            <button
            onClick={() => handleNavClick('archived')}
            type="button" className={`w-full flex items-center cursor-pointer gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
    activeCategory === 'archived'
      ? 'bg-blue-50 text-blue-600'
      : 'text-slate-600 hover:bg-slate-100'
  }`}>
              <Folder size={18} />
              Archived
            </button>
<button
  onClick={() => handleNavClick('categories')} 
  type="button"
  className={`w-full flex items-center cursor-pointer gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
    activeCategory === 'categories'
      ? 'bg-blue-50 text-blue-600'
      : 'text-slate-600 hover:bg-slate-100'
  }`}
>
  <LayoutGrid size={18} />
  All Categories
</button>

           
          </nav>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Archive
          </p>
          <nav className="space-y-1">
            <button
              onClick={() => handleNavClick('trash')}
              type="button" className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
    activeCategory === 'trash'
      ? 'bg-blue-50 text-blue-600'
      : 'text-slate-600 hover:bg-slate-100'
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
          className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 transition-colors mt-auto"
        >
          <LogOut size={18} />
          Log Out
        </button>
      )}
    </aside>

<CreateNote 
isOpen={isModelOpen}
onClose={()=>{setIsModelOpen(false)}}
/>


{categoryModel && (
        <div id="add-category" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg font-bold mb-2">✅ Save Category</p>
            <p className="text-sm text-gray-600 mb-4">Save your favourite category now!</p>
            
            <input type="text" placeholder='Enter category name ...' value={formData.c_name}
            onChange={handleChange}
            name="c_name"
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-400"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeSavePopup}
                className="px-4 py-2 bg-gray-200 rounded text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


</>
  );
};

export default Sidebar;