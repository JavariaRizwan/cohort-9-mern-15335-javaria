import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  PanelLeft,
  Search,
  Settings,
  Keyboard,
  ChevronDown,
  CheckCircle2,
  LogOut,
  X
} from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [user, setUser] = useState(null);

  const lastScrollY = useRef(0);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  
useEffect(() => {
  const getUserName = async () => {
    try {
      // Direct token header fallback agar cookies block ho rahi hon
      const token = localStorage.getItem('token');
      
      const response = await axios.get('http://localhost:5000/api/verify', {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      if (response.data.success || response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error.response?.data || error.message);
      // Optional: Khali initial load par toast na dikhayen jab tak status 401 explicitly nah ho
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
      }
    }
  };

  getUserName();
}, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();

        if (window.innerWidth < 768) {
          setMobileSearchOpen(true);
        } else {
          searchRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hide header on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extract initial letter for avatar badge
  const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : 'U';

  return (
    <>
      {/* Mobile Search Overlay Bar */}
      {mobileSearchOpen ? (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 z-50 px-4 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in duration-150">
          <Search size={18} className="text-teal-500 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search notes..."
            className="w-full bg-transparent text-sm outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
          />
          <button 
            onClick={() => setMobileSearchOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>
      ) : null}

      {/* Main Responsive Header */}
      <header
        className={`fixed top-0 left-0 right-0 h-16 z-40 transition-transform duration-300 ease-in-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 backdrop-blur-md px-3 md:px-6 flex items-center justify-between shadow-xs`}
      >
        {/* Left: Sidebar Toggle + Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              if (typeof onToggleSidebar === 'function') onToggleSidebar();
            }}
            className="p-2 cursor-pointer rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            aria-label="Toggle Sidebar"
          >
            <PanelLeft size={20} strokeWidth={1.8} />
          </button>

          <div className="flex items-center gap-2 cursor-pointer select-none">
            <img 
              src="/sticky-notes.png" 
              alt="StackNotes Logo" 
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
            <span className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              StackNotes
            </span>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <div
            className={`w-full flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border transition-all duration-200 ${
              searchFocused
                ? 'bg-white dark:bg-slate-800 border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                : 'bg-slate-100/70 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/60 hover:border-slate-300'
            }`}
          >
            <Search size={17} className={searchFocused ? 'text-teal-500' : 'text-slate-400'} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search notes, tags, or memory..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent text-sm outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
            <kbd className="hidden sm:inline-flex items-center justify-center min-w-[58px] whitespace-nowrap shrink-0 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium tracking-wide bg-slate-200/80 dark:bg-slate-700/80 text-slate-500 dark:text-slate-300 border border-slate-300/60 dark:border-slate-600">
              Ctrl + K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="md:hidden p-2 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            aria-label="Search"
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex cursor-pointer items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <p className="hidden lg:block text-sm font-medium">
        {user?.username || 'Guest User'}
      </p>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-400 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {userInitial}
              </div>
              <ChevronDown size={14} className="text-slate-500 dark:text-slate-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border shadow-xl overflow-hidden z-50 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/80">
                  <p className="text-sm font-semibold capitalize">
                    {user?.username || 'Guest User'}
                  </p>
                  <p className="text-xs text-slate-400 font-normal truncate mt-0.5">
                    {user?.email || 'No email associated'}
                  </p>
                  <p className="text-xs text-emerald-500 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 size={12} /> Sync Active
                  </p>
                </div>

                <div className="p-1.5 space-y-0.5">
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-slate-100 dark:hover:bg-slate-700/60">
                    <Settings size={16} /> Preferences
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-slate-100 dark:hover:bg-slate-700/60">
                    <Keyboard size={16} /> Shortcuts
                  </button>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-700/80" />
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}