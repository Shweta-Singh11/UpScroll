import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  RefreshCw,
  ArrowLeft,
  BrainCircuit,
  Zap,
} from "lucide-react";

const FactStation = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Explorer";
  const [fact, setFact] = useState({ text: "", id: null });
  const [loading, setLoading] = useState(true);

  const fetchBrainByte = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/facts/random`
      );
      const data = await response.json();
      setFact({ text: data.text || data, id: data.id || Date.now() });
    } catch (error) {
      console.error("Failed to connect to backend:", error);
      setFact({
        text: "Neural pathways are most active when discovering new digital fragments.",
        id: 0,
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  useEffect(() => {
    fetchBrainByte();
  }, []);

  return (
    <div className="min-h-screen w-full pt-28 pb-16 px-6 relative overflow-hidden bg-transparent text-slate-800 dark:text-zinc-100 transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-150 h-150 bg-indigo-600/10 dark:bg-violet-600/10 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-125 h-125 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-all mb-8 group cursor-pointer"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Exit
          </span>
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-16 min-h-[60vh]">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative">
            <div className="absolute w-64 h-64 bg-indigo-500/20 dark:bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10 p-12 rounded-[4rem] bg-white/80 dark:bg-zinc-900/30 border border-slate-200 dark:border-zinc-800/80 shadow-2xl backdrop-blur-sm transition-all duration-300">
              <div className="relative">
                <BrainCircuit
                  size={180}
                  className="text-indigo-600 dark:text-violet-400 drop-shadow-[0_0_25px_rgba(167,139,250,0.3)] dark:drop-shadow-[0_0_25px_rgba(167,139,250,0.5)]"
                />
                <Zap
                  size={36}
                  className="absolute -top-4 -right-4 text-amber-500 dark:text-cyan-400 animate-bounce fill-current"
                />
              </div>

              <div className="mt-8 text-center">
                <div className="h-1.5 w-32 bg-slate-200 dark:bg-zinc-800 mx-auto rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-violet-500 dark:to-cyan-400 w-2/3 animate-ping"></div>
                </div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-zinc-500">
                  Neural Sync: Active
                </p>
              </div>
            </div>
          </div>
          {/* Right Side*/}
          <div className="w-full lg:w-1/2 space-y-8">
            <header>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-cyan-500/10 border border-indigo-200 dark:border-cyan-500/20 text-indigo-700 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Sparkles size={12} fill="currentColor" />
                <span>Knowledge Stream</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] mb-4">
                FACT
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent pr-4">
                  STATION
                </span>
              </h1>
              <p className="text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-widest text-xs">
                Welcome! <span className="text-indigo-600 dark:text-white font-bold">{username}</span>
              </p>
            </header>

            <div className="relative">
              <div
                className={`transition-all duration-500 ${loading ? "opacity-30 blur-sm scale-95" : "opacity-100 blur-0 scale-100"}`}
              >
                <p className="text-2xl md:text-3xl font-bold leading-tight text-slate-800 dark:text-white italic border-l-4 border-indigo-600 dark:border-violet-500 pl-6 py-2">
                  {fact.text || "Standby for incoming data packet..."}
                </p>
              </div>

              {loading && (
                <div className="absolute inset-0 flex items-center pl-6">
                  <p className="text-2xl font-bold text-indigo-600 dark:text-cyan-400 animate-bounce [animation-delay:-0.3s] pr-2">
                    Fetching
                  </p>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-indigo-600 dark:bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-indigo-600 dark:bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-indigo-600 dark:bg-cyan-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-8">
              <button
                onClick={fetchBrainByte}
                disabled={loading}
                className="group flex items-center gap-4 px-10 py-5 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-600 dark:hover:bg-cyan-400 transition-all active:scale-95 shadow-md dark:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.15)] disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw
                  size={20}
                  className={`group-hover:rotate-180 transition-transform duration-500 ${loading ? "animate-spin" : ""}`}
                />
                Next Brain Byte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactStation;
