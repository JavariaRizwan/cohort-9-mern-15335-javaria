import { useRef } from "react";
import {toast} from 'react-hot-toast'
import {Folder} from'lucide-react'

const ImportFile=( {onFileImport})=>{

const inputFileRef=useRef(null);
const handleImportButton=()=>{
  inputFileRef.current.click();
}

const handleFileChange= async(e)=>{
const file=e.target.files[0];
if(!file) return;

if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      toast.error("Please select a valid .txt file.");
      e.target.value = "";
      return;
    }

try {
// const reader = new FileReader();
//         reader.onload = (event) => {
//             const fileContent = event.target.result;
//             console.log("File loaded suessfully, it's length is ", fileContent.length, "characters");
  const fileContent = await file.text();
      console.log("File loaded successfully, it's length is", fileContent.length, "characters");
            if (onFileImport) {
                onFileImport(fileContent);
            }
          
        // };
        // reader.onerror = (error) => {
        //     console.error("Error occurred while loading file", error);
        // };
        
        // reader.readAsText(file);
        // e.target.value = "";

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
<Folder className="w-4 h-4" strokeWidth={2.5} /><span className="hidden sm:inline">Import Note</span>
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