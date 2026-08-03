import React from 'react';
import sortingOptions from '../../data/sortingOptions';


const SortDropDown=({sortBy, setSortBy})=>{
return(
    <div className="relative inline-block">
    <select
    value={sortBy}
    onChange={(e)=>setSortBy(e.target.value)}
className="appearance-none cursor-pointer pl-3.5 pr-8 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl shadow-2xs hover:border-teal-500 dark:hover:border-teal-500/70 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all cursor-pointer"    >
        {sortingOptions.map((option)=>(
            <option key={option.value} value={option.value}>
               {option.label}  {option.icon || ''} 
            </option>
        ))}
    </select>

<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 dark:text-slate-500">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

)
}
export default SortDropDown;