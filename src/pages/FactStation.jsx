import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, RefreshCw, ArrowLeft, BrainCircuit, Zap } from 'lucide-react';

const FactStation = () => {
  const navigate=useNavigate();
  const [fact, setFact] = useState({ text: "", id: null });
  const [loading, setLoading] = useState(true);
  const username = "Jude";

  const fetchBrainByte = async () => {
    setLoading(true);
    try { 
      const response = await fetch("https://brain-backend-2-5onn.onrender.com/api/facts/random");
      const data = await response.json();
      setFact({ text: data.text || data, id: data.id || Date.now() });
    } 
    catch (error) {
      console.error("Failed to connect to backend:", error);
      setFact({ 
        text: "Neural pathways are most active when discovering new digital fragments.", 
        id: 0 
      });
    }
    finally {
      setTimeout(()=>{setLoading(false);}
      ,400);
    }
  };

  useEffect(() => {
    fetchBrainByte();
  }, []);

  return (
    <div className="min-h-screen w-full pt-24 pb-12 px-6 relative overflow-hidden bg-[#050505] text-white">
    
      <div className="absolute top-1/4 -left-20 w-150 h-150 bg-violet-600/10 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-125 h-125 bg-cyan-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation */}
        <button 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit</span>
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-16 min-h-[60vh]">
          
          {/* Left Side */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative">

            <div className="absolute w-64 h-64 bg-violet-500/30 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative z-10 p-12 rounded-[4rem] bg-linear-to-br from-white/5 to-transparent border border-white/10 shadow-2xl backdrop-blur-sm">
              <div className="relative">
                <BrainCircuit size={200} className="text-violet-400 drop-shadow-[0_0_25px_rgba(167,139,250,0.5)]" />
                <Zap size={40} className="absolute -top-4 -right-4 text-cyan-400 animate-bounce fill-cyan-400" />
              </div>
              
              <div className="mt-8 text-center">
                <div className="h-1.5 w-32 bg-zinc-800 mx-auto rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-violet-500 to-cyan-400 w-2/3 animate-ping"></div>
                </div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Neural Sync: Active</p>
              </div>
            </div>
          </div>

          {/* Right Side*/}
          <div className="w-full lg:w-1/2 space-y-8">
            <header>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Sparkles size={12} fill="currentColor" />
                <span>Knowledge Stream</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] mb-4">
                FACT<br />
                <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent pr-4">STATION</span>
              </h1>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
                Welcome! <span className="text-white">{username}</span>
              </p>
            </header>

            <div className="relative">
              <div className={`transition-all duration-500 ${loading ? 'opacity-30 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'}`}>
                <p className="text-2xl md:text-3xl font-bold leading-tight text-white italic border-l-4 border-violet-500 pl-6 py-2">
                  {fact.text || "Standby for incoming data packet..."}
                </p>
              </div>

              {loading && (
                <div className="absolute inset-0 flex items-center pl-6">
                  <p className="text-2xl font-bold  text-cyan-400 animate-bounce [animation-delay:-0.3s] pr-2">
                    Fetching  
                  </p>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-8">
              <button 
                onClick={fetchBrainByte}
                disabled={loading}
                className="group flex items-center gap-4 px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] disabled:opacity-50"
              >
                <RefreshCw size={20} className={`group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
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