import React from "react";
import { useNavigate } from "react-router-dom";
const StoryWriting = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] pt-32 pb-16 px-6 flex flex-col items-center justify-center bg-slate-50 text-slate-800 dark:bg-[#070913] dark:text-zinc-100 transition-colors duration-300">
      <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4 pr-3 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
        Finish the Story
      </h1>
      <p className="text-xl text-slate-500 dark:text-zinc-400 font-medium mb-12">
        A placeholder for your Finish the Story.
      </p>

      <div className="p-20 border-2 border-dashed border-slate-300 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900/30 shadow-md text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-widest">
        Coming Soon
      </div>

      <footer className="mt-24 text-center">
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 rounded-full border border-slate-300 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition-all text-sm font-bold uppercase tracking-widest cursor-pointer"
        >
          ← Back to Dashboard
        </button>
      </footer>

    </div>
  );
};

export default StoryWriting;
