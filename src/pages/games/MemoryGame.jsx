import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Search, LayoutGrid, Zap } from "lucide-react";
import ActivityCard from "../../components/ui/Activities";

const MemoryGame = () => {
    const navigate=useNavigate();
  const games = [
    {
      title: "Sudoku",
      description: "Classical 9x9 grid puzzles to test your logical deduction skills.",
      bgColor: "from-blue-400 to-indigo-600", 
      path: "/activities/logic/sudoku",
      icon: <LayoutGrid size={32} />
    },
    {
      title: "Word Search",
      description: "Find hidden patterns in a sea of letters to boost your recognition.",
      bgColor: "from-fuchsia-500 to-rose-500",
      path: "/activities/logic/word-search",
      icon: <Search size={32} />
    },
    {
      title: "Flip Flop",
      description: "A fast-paced memory matching game to sharpen your focus.",
      bgColor: "from-cyan-400 to-blue-500",
      path: "/activities/logic/flip-flop",
      icon: <Brain size={32} />
    }
  ];

  return (
    <div className="min-h-screen w-full pt-24 pb-12 px-6 relative overflow-hidden bg-[#0f172a]">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-20 space-y-4">
          <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter">
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Memory & Logic
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Select a quest to sharpen your cognitive functions and clear the digital void.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {games.map((game, index) => (
            <div 
              key={index} 
              onClick={() => navigate(game.path)}
              className={`group relative cursor-pointer transition-all duration-500 hover:-translate-y-4 
                ${index === 1 ? 'md:scale-110 z-20' : 'md:scale-95'}`}
            >
              <div className="h-full p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 
                              shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:shadow-[0_20px_50px_rgba(139,92,246,0.3)]
                              group-hover:border-white/20 transition-all">
                
                <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-linear-to-br ${game.bgColor} 
                                text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {game.icon}
                </div>

                <h2 className="text-2xl font-black text-white mb-3 uppercase tracking-tight italic">
                  {game.title}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  {game.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-400 group-hover:text-white transition-colors">
                  <span>Begin Quest</span>
                  <Zap size={14} className="group-hover:fill-current" />
                </div>
              </div>

              <div className={`absolute inset-0 -z-10 bg-linear-to-br ${game.bgColor} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-[2.5rem]`}></div>
            </div>
          ))}
        </div>

        <footer className="mt-24 text-center">
          <button 
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:bg-blue-500 hover:border-blue-900 hover:border-3 transition-all text-sm font-bold uppercase tracking-widest"
          >
            ← Back to Dashboard
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MemoryGame;