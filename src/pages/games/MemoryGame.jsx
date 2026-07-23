import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Search, LayoutGrid, Zap } from "lucide-react";

const MemoryGame = () => {
  const navigate = useNavigate();
  const games = [
    {
      title: "Sudoku",
      description: "Classical 9x9 grid puzzles to test your logical deduction skills.",
      path: "/activities/logic/sudoku",
      icon: <LayoutGrid size={28} />,
      badge: "Logic",
      cardStyles: "hover:border-blue-500/30 dark:hover:border-blue-500/30 border-slate-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-md hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10",
      iconContainer: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
      title: "Word Search",
      description: "Find hidden patterns in a sea of letters to boost your recognition.",
      path: "/activities/logic/word-search",
      icon: <Search size={28} />,
      badge: "Pattern",
      cardStyles: "hover:border-rose-500/30 dark:hover:border-rose-500/30 border-slate-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-md hover:shadow-rose-500/5 dark:hover:shadow-rose-500/10",
      iconContainer: "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
    },
    {
      title: "Flip Flop",
      description: "A fast-paced memory matching game to sharpen your focus.",
      path: "/activities/logic/flip-flop",
      icon: <Brain size={28} />,
      badge: "Memory",
      cardStyles: "hover:border-cyan-500/30 dark:hover:border-cyan-500/30 border-slate-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-md hover:shadow-cyan-500/5 dark:hover:shadow-cyan-500/10",
      iconContainer: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
    },
  ];

  return (
    <div className="min-h-screen w-full pt-28 pb-16 px-6 relative overflow-hidden bg-transparent text-slate-800 dark:text-zinc-100 transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/10 dark:bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-[100px]"></div>

      {/* header */}
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-20 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400 bg-clip-text text-transparent drop-shadow-sm pr-4">
              Memory & Logic
            </span>
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Select a quest to sharpen your cognitive functions and clear the digital void.
          </p>
        </header>

        {/* game cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {games.map((game, index) => (
            <div
              key={index}
              onClick={() => navigate(game.path)}
              className={`group relative cursor-pointer transition-all duration-500 hover:-translate-y-4 
                ${index === 1 ? "md:scale-105 z-20" : "md:scale-95"}`}
            >
              <div
                className={`h-full p-8 rounded-[2.5rem] border shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 relative overflow-hidden ${game.cardStyles}`}
              >
                {/* Subtle layered depth elements inside the card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-indigo-500/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${game.iconContainer} shadow-sm group-hover:scale-110 transition-transform duration-500`}
                  >
                    {game.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700/50">
                    {game.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3 uppercase italic tracking-tight relative z-10">
                  {game.title}
                </h3>
                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-8 relative z-10">
                  {game.description}
                </p>

                <div className="w-full h-1 bg-slate-200 dark:bg-zinc-800/80 rounded-full overflow-hidden relative z-10">
                  <div className="h-full w-1/3 bg-indigo-500 group-hover:w-full transition-all duration-1000"></div>
                </div>
              </div>

              {/* Subtle outer glow on hover */}
              <div
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-15 blur-3xl transition-opacity duration-500 rounded-[2.5rem] bg-indigo-500"
              ></div>
            </div>
          ))}
        </div>

        {/* back */}
        <footer className="mt-24 text-center">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-full border border-slate-300 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition-all text-sm font-bold uppercase tracking-widest cursor-pointer"
          >
            ← Back to Dashboard
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MemoryGame;
