import { Download } from "lucide-react";

const DownloadNote=({note})=>{

const handleDownload=async()=>{

const stripHtml = (html) => {
      if (!html) return "";
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };

    const title=note.title || '';
    const description=stripHtml(note.description);
    const category=`Category: ${note.category?.name || note.category?.c_name || "Uncategorized"}`;

const noteData=`Title: ${title}\n${category}\n\nDescription:\n${description}`;
const blob=new Blob([noteData], {type: "text/plain; charset=utf-8"});
const url=URL.createObjectURL(blob);

const link=document.createElement('a');
link.href=url;
link.download=`${note.title || note}.txt`;
link.click();

URL.revokeObjectURL(url);


}


return (
    <button 
      type="button" 
      onClick={handleDownload}
className="cursor-pointer inline-flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-2 py-1.5 sm:px-4 sm:py-2.5 text-center leading-5 transition-all"   
 title="Download"
    >
<Download className="w-4 h-4 sm:hidden" strokeWidth={2} />

      <span className="hidden sm:inline">Download</span>
    </button>
  );

}


export default DownloadNote;

