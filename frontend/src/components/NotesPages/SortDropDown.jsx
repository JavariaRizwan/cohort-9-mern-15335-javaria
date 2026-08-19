import React from 'react';
import sortingOptions from '../../data/sortingOptions';
import {ChevronDown} from 'lucide-react'

const SortDropDown=({sortBy, setSortBy})=>{
return(
    <div className="relative inline-block">
    <select
    value={sortBy}
    aria-label="Sort Notes"
    onChange={(e)=>setSortBy(e.target.value)}
className="appearance-none cursor-pointer pl-3.5 pr-8 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200/90 rounded-xl shadow-2xs hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all cursor-pointer"    >
        {sortingOptions.map((option)=>(
            <option key={option.value} value={option.value}>
               {option.label}  {option.icon || ''} 
            </option>
        ))}
    </select>

<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
        <ChevronDown className="w-4 h-4" strokeWidth={2} />
      </div>
    </div>

)
}
export default SortDropDown;