import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-4 bg-slate-100/80 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="text-center max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-4">
          <FileQuestion size={32} />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight mb-1">No Path Found</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          The page or path you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate('/')}
          className="cursor-pointer py-2 px-4 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white font-semibold rounded-lg text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
}