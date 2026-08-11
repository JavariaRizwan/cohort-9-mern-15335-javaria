import { useRef } from "react";
import {toast} from 'react-hot-toast'

const ImportFile=( {onFileImport})=>{

const inputFileRef=useRef(null);
const handleImportButton=()=>{
  inputFileRef.current.click();
}

const handleFileChange=(e)=>{
const file=e.target.files[0];
if(!file) return;

if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      toast.error("Please select a valid .txt file.");
      e.target.value = "";
      return;
    }

try {
const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;
            console.log("File loaded suessfully, it's length is ", fileContent.length, "characters");
            if (onFileImport) {
                onFileImport(fileContent);
            }
        };
        reader.onerror = (error) => {
            console.error("Error occurred while loading file", error);
        };
        
        reader.readAsText(file);
        e.target.value = "";

} catch (error) {
  console.error("Error occured while loadign file", error.message);
}

e.target.value="";
}



    return (

        
      <div>
          <button
            type="button"
            onClick={handleImportButton}
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
          </button>


 <input
        type="file"
        accept=".txt"
        ref={inputFileRef}
        onChange={handleFileChange}
        className="hidden"
      />
</div>

    )
}


export default ImportFile;