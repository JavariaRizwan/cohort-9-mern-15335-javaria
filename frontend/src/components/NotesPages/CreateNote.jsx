import React, { useState, useEffect } from 'react';
import {toast} from 'react-hot-toast'
import { X, Sparkles, Tag } from 'lucide-react';
import categories from "../../data/categories";
import axios from "axios"



const CreateNote = ({ isOpen, onClose, onSaveNote }) => {
const [user, setUser]=useState("");


  const [formData, setFormData]=useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
  });



useEffect(() => {
  const getUserName = async () => {
    try {
      // Browsers automatically send cookies when withCredentials is true
      const response = await axios.get('http://localhost:5000/api/verify', {
        withCredentials: true,
      });

      if (response.data.success || response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
      }
    }
  };

  getUserName();
}, []);


  if (!isOpen) return null;

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category' ? { subCategory: '' } : {}),
    }));
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.title.trim()) return;

  // WRITE IT HERE
  const payload = {
    ...formData,
    userId: user?._id || user,
  };

  try {
    const response = await axios.post(
      'http://localhost:5000/api/create-note',
      payload,
      { withCredentials: true }
    );

    if (response.data.success) {
      onSaveNote(response.data.note);
      setFormData({
        title: '',
        description: '',
        category: '',
        subCategory: '',
      });
      onClose();
      toast.success("Note created successfully!");
    }
  } catch (error) {
 console.error("Actual error:", error); // add this
  toast.error(error.response?.data?.message || "Error happened!");  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
     <button
  type="button"
  className="absolute inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-md transition-opacity cursor-default"
  onClick={onClose}
  aria-label="Close modal"
/>

      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col z-10 overflow-hidden">

        <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 shrink-0" />

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Create New Note
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Capture your thoughts in clean, distraction-free space
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">

          <div>
            <input
              type="text"
              name="title"
              placeholder="Note title..."
              value={formData.title}
              onChange={handleChange}
              className="w-full text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 bg-transparent border-none outline-none focus:ring-0 p-0"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>Category</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
              name="category"
                value={formData.category}
                onChange={handleChange}
                className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/30 cursor-pointer"
              >
                <option value="">Select category</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
              name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                disabled={!formData.category}
                className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/30 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="">Select subcategory</option>
                {formData.category && categories[formData.category].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 min-h-[160px] flex flex-col pt-1">
            <textarea
              placeholder="Write your detailed notes, code snippets, or thoughts here..."
              value={formData.description}
              name="description"
              rows={6}
              onChange={handleChange}
              className="w-full flex-1 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all resize-none text-sm sm:text-base leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 shrink-0">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {formData.description.length} characters
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formData.title.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 rounded-xl shadow-md hover:shadow-lg disabled:opacity-40 disabled:hover:from-teal-600 disabled:hover:to-emerald-500 transition-all active:scale-95 cursor-pointer"
              >
                <span>Save Note</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;