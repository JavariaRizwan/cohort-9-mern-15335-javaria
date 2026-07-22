import React from 'react';

const MainBody = () => {
  return (
    <main className="flex-1 p-3 sm:p-5 md:p-6 max-w-5xl mx-auto space-y-3">
      {/* Note Card 1 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all border-l-4 border-l-teal-500">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
            Accessibility Ideas for Notes App
          </h3>
          <span className="text-amber-500">★</span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Prioritize white space, high-contrast typography, and quick thumb access...
        </p>
        <span className="inline-block text-xs text-slate-400 mt-3">2 hours ago</span>
      </div>

      {/* Note Card 2 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
          MERN Stack API Architecture
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Set up Express router middleware, JWT auth mechanisms, and MongoDB models...
        </p>
        <span className="inline-block text-xs text-slate-400 mt-3">Yesterday</span>
      </div>
    </main>
  );
};

export default MainBody;