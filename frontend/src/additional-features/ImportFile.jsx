
const ImportFile=()=>{

    return (

        
          <button
            type="button"
            
className="cursor-pointer inline-flex items-center gap-1.5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-2 py-1.5 sm:px-4 sm:py-2.5 text-center leading-5 transition-all"   

          >
<svg 
  className="w-4 h-4" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="2.5" 
  viewBox="0 0 24 24" 
  xmlns="http://www.w3.org/2000/svg"
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
</svg>
<span className="hidden sm:inline">Import Note</span>
 {/* <span className="sm:hidden">Import</span> */}
          </button>

    )
}


export default ImportFile;