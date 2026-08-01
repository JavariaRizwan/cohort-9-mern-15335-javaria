import React, { useState, useEffect, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { toast } from 'react-hot-toast';
import { ArrowLeft,  Tag, Check } from 'lucide-react';
import categories from "../../data/categories";
import axios from "axios";


const getCharCount = (html) => {
  if (!html) return 0;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent?.length || 0;
};


const CreateNote = ({ isOpen, onClose, onSaveNote, isEditingNote = null }) => {
    const [user, setUser] = useState("");
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = {
        readonly: false,
        placeholder: 'Start typing your detailed note here...',
        height: 'calc(100vh - 220px)',
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'heading', 'font', 'fontsize', '|',
            'ul', 'ol', '|',
            'outdent', 'indent', '|',
            'align', 'undo', 'redo', '|',
            'hr', 'eraser'
        ]
    };

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        subCategory: '',
    });

useEffect(()=>{
    if(isEditingNote){
        setFormData({
            title:isEditingNote.title || '',
            description:isEditingNote.description || '',
            category:isEditingNote.category || '',
            subCategory:isEditingNote.subCategory || ''
        });
        setContent(isEditingNote.description || '');
    }
    else{
        setFormData({
            title:'',
            description:'',
            category:'',
            subCategory:''
        });
        setContent('');
    }
}, [isEditingNote, isOpen])


    useEffect(() => {
        const getUserName = async () => {
            try {
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

        if (isOpen) {
            getUserName();
        }
    }, [isOpen]);

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
        if (!formData.title.trim()) {
            toast.error("Please add a title for your note.");
            return;
        }

        const payload = {
            ...formData,
            description: content,
            userId: user?._id || user,
        };

        try {
            let response;
            if(isEditingNote){
                const noteId=isEditingNote._id;
                 response = await axios.put(`http://localhost:5000/api/edit-note/${noteId}`,
                    payload, {withCredentials: true}
                );
            }
            else{
            response = await axios.post(
                'http://localhost:5000/api/create-note',
                payload,
                { withCredentials: true }
            );

            }
            
            if (response.data.success) {
                onSaveNote(response.data.note);
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    subCategory: '',
                });
                setContent('');
                toast.success(isEditingNote ? "Note updated successfully!" : "Note created successfully!");
                onClose(); 
            }
        } catch (error) {
            console.error("Actual error:", error);
            toast.error(error.response?.data?.message || "Failed to create note!");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col h-screen w-screen overflow-hidden animate-fade-in">

            <header className="h-16 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 shadow-sm">

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer flex items-center gap-2 group"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="hidden sm:inline text-sm font-semibold">Dashboard</span>
                    </button>

                    <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      
                        <img
                            src="/sticky-notes.png" // assuming your image is named logo.png inside public/
                            alt="StackNotes Logo"
                            className="h-7 w-auto object-contain"
                        />
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 hidden md:inline">
                            StackNotes.
                        </span>
                    </div>
                </div>

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
                        form="create-note-form"
                        disabled={!formData.title.trim()}
                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 rounded-xl shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
                    >
                        <Check className="w-4 h-4" />
                        <span>Save Note</span>
                    </button>
                </div>
            </header>

            <form
                id="create-note-form"
                onSubmit={handleSubmit}
                className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col gap-4 overflow-hidden"
            >
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Untitled Note..."
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 bg-transparent border-none outline-none focus:ring-0 p-0 tracking-tight"
                        autoFocus
                    />
                </div>

                {/* Categories Bar */}
                <div className="flex items-center gap-3 flex-wrap pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Category:</span>
                    </div>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="px-3 py-1.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/30 cursor-pointer shadow-sm"
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
                        className="px-3 py-1.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/30 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                    >
                        <option value="">Select subcategory</option>
                        {formData.category && categories[formData.category].map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                </div>

                <div className="flex-1 min-h-[400px]">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        onBlur={(newContent) => setContent(newContent)}
                    />
                </div>

                <span className="text-xs text-slate-400 dark:text-slate-500">
  {getCharCount(content)} characters
</span>
            </form>

        </div>
    );
};

export default CreateNote;