import React from 'react';
import { Sparkles, Search, FolderSync, Tags, ArrowRight,  CheckCircle2, ChevronRight } from 'lucide-react';

export default function Home({ onGetStarted, onSignIn }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 z-50 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <img 
            src="/sticky-notes.png" 
            alt="StackNotes Logo" 
            className="w-8 h-8 object-contain cursor-pointer drop-shadow-xs"
          />
          <span className="text-xl cursor-pointer font-extrabold tracking-tight bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
            StackNotes
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSignIn}
            className="px-4 py-2 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onGetStarted}
            className="px-4 cursor-pointer py-2 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
          >
            <span className='cursor-pointer'>Let's get Started</span>
            <ChevronRight size={16}  />
          </button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 text-xs font-semibold tracking-wide">
            <Sparkles size={14} className="text-teal-500" />
            <span>Next-Gen Workspace for Developer Notes</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 max-w-3xl mx-auto leading-tight">
            Organize your memory stack with{' '}
            <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              speed & precision.
            </span>
          </h1>

          <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
            A fast, markdown-ready, and command-driven notebook built to structure your technical thoughts, snippets, and project architecture without friction.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 rounded-2xl shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group"
            >
              <span className='cursor-pointer'>Let's get Started</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-teal-500" /> Free Cloud Synchronization
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-teal-500" /> Instant Command Search
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-teal-500" /> Dark & Light Mode Theme
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Engineered for modern workflows
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">
            Everything you need to capture, connect, and retrieve your thoughts instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
              <Search size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              Command Palette Search
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Use <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xs">Ctrl + K</kbd> to search across all your tags, titles, and note memory in milliseconds.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
              <FolderSync size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              Seamless Cloud Sync
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Keep your local environment and remote workspace automatically updated in real-time with zero manual effort.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
              <Tags size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              Smart Folders & Tags
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Organize your technical code blocks and personal updates with nested categories, favorite pins, and custom tags.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto my-12">
        <div className="rounded-3xl bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Ready to elevate your note-taking experience?
            </h2>
            <p className="text-teal-100 text-sm md:text-base max-w-xl mx-auto">
              Join StackNotes today and keep your workspace structured, accessible, and synchronized across all device screens.
            </p>
            <div className="pt-2 cursor-pointer">
              <button
                onClick={onGetStarted}
                className="px-8 cursor-pointer py-3.5 text-sm font-bold text-teal-900 bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span className='cursor-pointer'>Let's get Started</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
 {/* Footer stylings*/}
      <footer className="py-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} StackNotes. All rights reserved.</p>
      </footer>

    </div>
  );
}