// // import React, { useState, useEffect } from 'react';
// // import { User, Mail, Calendar, Clock, ArrowLeftIcon, FileText, Trash2, LogOut, ShieldCheck, ArrowRight } from 'lucide-react';
// // import { toast } from 'react-hot-toast';
// // import { useNavigate } from 'react-router-dom';
// // import axios from "axios";

// // const UserProfile = ({ onLogout, onNavigateToTrash }) => {
// //   const navigate = useNavigate();
// //   const [profileData, setProfileData] = useState({ user: null, notes: [], loading: true });



// //   const handleLogout = async () => {
// //     try {
// //       await axios.post('http://localhost:5000/api/logout',
// //         {},
// //         { withCredentials: true }
// //       );
// //       toast.success('User Logged out');
// //       if (onLogout) onLogout();
// //       navigate('/signin', { replace: true });
// //     } catch (error) {
// //       console.error(error.message);
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric',
// //     });
// //   };

// //   const formatTimeAgo = (dateString) => {
// //     if (!dateString) return 'Just now';
// //     const date = new Date(dateString);
// //     return date.toLocaleTimeString('en-US', {
// //       hour: '2-digit',
// //       minute: '2-digit',
// //     });
// //   };

// //   useEffect(() => {

// //     const getUserData = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/user-notes', { withCredentials: true });
// //         if (response.data.success) {
// //           setProfileData({ user: response.data.user, notes: response.data.notes, loading: false });
// //         }

// //       } catch (error) {
// //         console.error("Failed to get Profile", error.message);
// //         toast.info("Error occured while fetching profile. Try again")
// //       }
// //     }

// //     getUserData();
// //   }, [])


// //   if (profileData.loading) {
// //     return <div className="p-8 text-center">Loading profile...</div>;
// //   }

// //   const { user, notes } = profileData;
// //   const totalNotes = notes ? notes.length : 0;
// //   const trashItems = notes ? notes.filter(note => note.isDeleted).length : 0;



// //   return (
// //     <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
// //       <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-5 shadow-xl">
// //         <button
// //           onClick={() => navigate('/user_dashboard')}
// //           className="inline-flex items-center cursor-pointer gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-4"
// //         >
// //           <ArrowLeftIcon className="w-4 h-4" />
// //           Back to Dashboard
// //         </button>
// //         <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 text-center sm:text-left">
// //           <div className="flex flex-col sm:flex-row items-center gap-5">
// //             <div className="relative">
// //               <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 text-white border-4 border-slate-100 dark:border-slate-800 shadow-md flex items-center justify-center font-bold text-3xl">
// //                 {user.username ? user.username.charAt(0).toUpperCase() : <User className="w-12 h-12" />}
// //               </div>
// //               <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" title="Active Session" />
// //             </div>

// //             <div className="space-y-1">
// //               <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
// //                 <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
// //                   {user?.username}
// //                 </h1>
// //                 <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50">
// //                   <ShieldCheck className="w-3.5 h-3.5" /> Verified
// //                 </span>
// //               </div>

// //               <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
// //                 <Mail className="w-4 h-4 text-slate-400" />
// //                 {user?.email}
// //               </p>
// //             </div>
// //           </div>

// //           <button
// //             onClick={handleLogout}
// //             className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900/40 rounded-xl transition-all cursor-pointer active:scale-95"
// //           >
// //             <LogOut className="w-4 h-4" />
// //             <span>Sign Out</span>
// //           </button>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //         <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
// //           <div className="p-3.5 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-xl shrink-0">
// //             <FileText className="w-6 h-6" />
// //           </div>
// //           <div>
// //             <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Notes</p>
// //             <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalNotes}</p>
// //           </div>
// //         </div>

// //         <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <div className="p-3.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
// //               <Trash2 className="w-6 h-6" />
// //             </div>
// //             <div>
// //               <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Trash Bin</p>
// //               <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{trashItems}</p>
// //             </div>
// //           </div>
// //           {onNavigateToTrash && (
// //             <button
// //               onClick={onNavigateToTrash}
// //               className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
// //               title="Open Trash"
// //             >
// //               <ArrowRight className="w-5 h-5" />
// //             </button>
// //           )}
// //         </div>

// //         <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
// //           <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
// //             <Calendar className="w-6 h-6" />
// //           </div>
// //           <div>
// //             <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Member Since</p>
// //             <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
// //               {formatDate(user.createdAt)}
// //             </p>
// //           </div>
// //         </div>

// //         <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
// //           <div className="p-3.5 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-xl shrink-0">
// //             <Clock className="w-6 h-6" />
// //           </div>
// //           <div>
// //             <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Last Login</p>
// //             <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
// //               {formatTimeAgo(user.lastLogin)}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-md p-6 space-y-6">
// //         <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">

// //           <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Account Configuration</h2>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div className="space-y-1.5">
// //             <label htmlFor='name' className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
// //             <div name="name" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200">
// //               {user.username}
// //             </div>
// //           </div>

// //           <div className="space-y-1.5">
// //             <label htmlFor='email' className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
// //             <div name="email" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200">
// //               {user.email}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserProfile;

// import React, { useState, useEffect } from 'react';
// import { User, Mail, Calendar, Clock, ArrowLeftIcon, FileText, Trash2, LogOut, ShieldCheck, ArrowRight } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";

// const UserProfile = ({ onLogout, onNavigateToTrash }) => {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState({ user: null, notes: [], loading: true });

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
//       toast.success('User Logged out');
//       if (onLogout) onLogout();
//       navigate('/signin', { replace: true });
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   const formatTimeAgo = (dateString) => {
//     if (!dateString) return 'Just now';
//     return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//   };

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/user-notes', { withCredentials: true });
//         if (response.data.success) {
//           setProfileData({ user: response.data.user, notes: response.data.notes, loading: false });
//         }
//       } catch (error) {
//         console.error("Failed to get Profile", error.message);
//         toast.error("Error occurred while fetching profile. Try again");
//       }
//     };
//     getUserData();
//   }, []);

//   if (profileData.loading) {
//     return <div className="p-8 text-center">Loading profile...</div>;
//   }

//   const { user, notes } = profileData;
//   const totalNotes = notes ? notes.length : 0;
//   const trashItems = notes ? notes.filter(note => note.isDeleted).length : 0;

//   return (
//     <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      
//       {/* Sidebar */}
//       <aside className="w-20 lg:w-24 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-8 justify-between shrink-0">
//         <button onClick={() => navigate('/user_dashboard')} className="p-3 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors" title="Dashboard">
//           <ArrowLeftIcon className="w-6 h-6" />
//         </button>
//         <button onClick={handleLogout} className="p-3 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all" title="Sign Out">
//           <LogOut className="w-6 h-6" />
//         </button>
//       </aside>

//       <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          
//           {/* Left Column: Profile Card */}
//           <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-12 shadow-xl space-y-8 min-h-[500px] flex flex-col items-center text-center">
//             <div className="relative">
//               <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 text-white border-4 border-slate-100 dark:border-slate-800 shadow-md flex items-center justify-center font-bold text-3xl">
//                 {user.username ? user.username.charAt(0).toUpperCase() : <User className="w-12 h-12" />}
//               </div>
//               <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" title="Active Session" />
//             </div>

//             <div className="space-y-1">
//               <div className="flex items-center justify-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{user?.username}</h1>
//                 <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50">
//                   <ShieldCheck className="w-3.5 h-3.5" /> Verified
//                 </span>
//               </div>
//               <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
//                 <Mail className="w-4 h-4 text-slate-400" /> {user?.email}
//               </p>
//             </div>

//             <button onClick={handleLogout} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900/40 rounded-xl transition-all cursor-pointer">
//               <LogOut className="w-4 h-4" /> <span>Sign Out</span>
//             </button>
//           </div>

//           {/* Right Column: Stats and Configuration */}
//           <div className="lg:col-span-8 space-y-6">
            
//             {/* Stat Cards Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
//                 <div className="p-3.5 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-xl shrink-0">
//                   <FileText className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Notes</p>
//                   <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalNotes}</p>
//                 </div>
//               </div>

//               <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
//                     <Trash2 className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Trash Bin</p>
//                     <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{trashItems}</p>
//                   </div>
//                 </div>
//                 {onNavigateToTrash && (
//                   <button onClick={onNavigateToTrash} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Open Trash">
//                     <ArrowRight className="w-5 h-5" />
//                   </button>
//                 )}
//               </div>

//               <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
//                 <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
//                   <Calendar className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Member Since</p>
//                   <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{formatDate(user.createdAt)}</p>
//                 </div>
//               </div>

//               <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
//                 <div className="p-3.5 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-xl shrink-0">
//                   <Clock className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Last Login</p>
//                   <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{formatTimeAgo(user.lastLogin)}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Account Configuration Card */}
//             <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-md p-6 space-y-6">
//               <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
//                 <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Account Configuration</h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
//                   <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200">
//                     {user.username}
//                   </div>
//                 </div>
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
//                   <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200">
//                     {user.email}
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </main>

//     </div>
//   );
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Clock, ArrowLeftIcon, FileText, Trash2, LogOut, ShieldCheck, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const UserProfile = ({ onLogout, onNavigateToTrash }) => {
  const navigate = useNavigate();
  const [profileData, setProfileData]=useState({user:null, notes:[], loading:true});



  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', 
        {},
        { withCredentials: true }
      );
      toast.success('User Logged out');
      if (onLogout) onLogout();
      navigate('/signin', { replace: true });
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

useEffect(()=>{

  const getUserData=async()=>{
    try {
    const response=await axios.get('http://localhost:5000/api/user-notes', {withCredentials: true});
    if(response.data.success){
      setProfileData({user:response.data.user, notes:response.data.notes, loading:false }); 
    }
      
    } catch (error) {
  console.error("Failed to get Profile",error.message);  
  toast.info("Error occured while fetching profile. Try again")    
    }
  }

  getUserData();
}, [])


if(profileData.loading){
  return <div className="p-8 text-center">Loading profile...</div>;
}

const {user, notes} = profileData;
const totalNotes = notes? notes.length : 0;
const trashItems= notes? notes.filter(note=> note.isDeleted).length : 0;



  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-5 shadow-xl">
       <button 
    onClick={() => navigate('/user_dashboard')} 
    className="inline-flex items-center cursor-pointer gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-4"
  >
    <ArrowLeftIcon className="w-4 h-4" />
    Back to Dashboard
  </button>
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative">
<div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 text-white border-4 border-slate-100 dark:border-slate-800 shadow-md flex items-center justify-center font-bold text-3xl">
  {user.username ? user.username.charAt(0).toUpperCase() : <User className="w-12 h-12" />}
</div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" title="Active Session" />
            </div>

<div className="space-y-1">
  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
      {user?.username}
    </h1>
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50">
      <ShieldCheck className="w-3.5 h-3.5" /> Verified
    </span>
  </div>

  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
    <Mail className="w-4 h-4 text-slate-400" />
    {user?.email}
  </p>
</div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900/40 rounded-xl transition-all cursor-pointer active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="p-3.5 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-xl shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Notes</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalNotes}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Trash Bin</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{trashItems}</p>
            </div>
          </div>
          {onNavigateToTrash && (
            <button 
              onClick={onNavigateToTrash}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Open Trash"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Member Since</p>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
              {formatDate(user.createdAt)}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="p-3.5 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-xl shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Last Login</p>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
              {formatTimeAgo(user.lastLogin)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-md p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Account Configuration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label htmlFor='name' className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
            <div name='name' className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200">
              {user.username}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor='email' className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
            <div name='email' className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200">
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;