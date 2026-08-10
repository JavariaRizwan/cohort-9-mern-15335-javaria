const DownloadNote=({note})=>{

const handleDownload=async()=>{

const stripHtml = (html) => {
      if (!html) return "";
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };

    const title=note.title || '';
    const description=stripHtml(note.description);
    const category=`Category: ${note.category}`;
    const subCategory=`Sub Category: ${note.subCategory}`;

const noteData=`Title: ${title}\n${category}\n${subCategory}\n\nDescription:\n${description}`;
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
    <svg 
        className="w-4 h-4 sm:hidden" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>

      <span className="hidden sm:inline">Download</span>
    </button>
  );

}


export default DownloadNote;

