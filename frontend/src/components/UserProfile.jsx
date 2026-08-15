


import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Clock, ArrowLeftIcon, FileText, Trash2, LogOut, ShieldCheck, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const UserProfile = ({ onLogout, onNavigateToTrash }) => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({ user: null, notes: [], loading: true });



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

    useEffect(() => {

        const getUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user-notes', { withCredentials: true });
                if (response.data.success) {
                    setProfileData({ user: response.data.user, notes: response.data.notes, loading: false });
                } else {
                    setProfileData(prev => ({ ...prev, loading: false }));
                }
            } catch (error) {
                console.error("Failed to get Profile", error.message);
                toast.info("Error occured while fetching profile. Try again");
                setProfileData(prev => ({ ...prev, loading: false }));
            }
        }

        getUserData();
    }, [])


    if (profileData.loading) {
        return <div className="p-8 text-center">Loading profile...</div>;
    }

    const { user, notes } = profileData;
    const totalNotes = notes ? notes.length : 0;
    const trashItems = notes ? notes.filter(note => note.isDeleted).length : 0;



    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
            <div className="bg-white border border-slate-200/80  rounded-3xl p-6 sm:p-5 shadow-xl">
                <button type="button"
                    onClick={() => navigate('/user_dashboard')}
                    className="inline-flex items-center cursor-pointer gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-4"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Dashboard
                </button>
                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                        <div className="relative">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none border-4 border-white focus:ring-blue-300 font-medium shadow-md flex items-center justify-center font-bold text-3xl">
                                {user.username ? user.username.charAt(0).toUpperCase() : <User className="w-12 h-12" />}
                            </div>
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Active Session" />
                        </div>

                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900  tracking-tight">
                                    {user?.username}
                                </h1>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600  border border-blue-200">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                                </span>
                            </div>

                            <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
                                <Mail className="w-4 h-4 text-slate-400" />
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <button type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600  bg-rose-50  hover:bg-rose-100 border border-rose-200 rounded-xl transition-all cursor-pointer active:scale-95"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white  border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                    <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Notes</p>
                        <p className="text-2xl font-bold text-slate-900 ">{totalNotes}</p>
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-white  border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-amber-50 text-amber-600  rounded-xl shrink-0">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Trash Bin</p>
                            <p className="text-2xl font-bold text-slate-900">{trashItems}</p>
                        </div>
                    </div>
                    {onNavigateToTrash && (
                        <button type="button"
                            onClick={onNavigateToTrash}
                            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                            title="Open Trash"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                    <div className="p-3.5 bg-blue-50 text-blue-600  rounded-xl shrink-0">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Member Since</p>
                        <p className="text-sm font-bold text-slate-900  mt-1">
                            {formatDate(user.createdAt)}
                        </p>
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80  shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                    <div className="p-3.5 bg-cyan-50  text-cyan-600  rounded-xl shrink-0">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Last Login</p>
                        <p className="text-sm font-bold text-slate-900 mt-1">
                            {formatTimeAgo(user.lastLogin)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white  border border-slate-200/80  rounded-3xl shadow-md p-6 space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100  pb-4">

                    <h2 className="text-lg font-bold text-slate-900">Account Configuration</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</span>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800">
                            {user.username}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</span>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800">
                            {user.email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;