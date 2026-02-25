import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Send, Image as ImageIcon } from 'lucide-react';
import meme from '../../assets/meme.png';
import political_humour from '../../assets/political_humour.png';
import nature from '../../assets/nature.png';
import art_history from '../../assets/art_history.png';
import spiritual from '../../assets/spiritual.png';
import tragedies from '../../assets/tragedies.png';
import adult from '../../assets/adult.png';
import corporate from '../../assets/corporate.png';

const categories = [
  {
    id: "meme",
    title: "Meme Culture",
    desc: "Reclaim the dopamine. Turn viral trends into high-effort wit.",
    image: meme,
  },
  {
    id: "political",
    title: "Political Humour",
    desc: "Critical analysis of global power dynamics through satire.",
    image:political_humour,
  },
  {
    id: "nature",
    title: "Natural Reset",
    desc: "Sync with the biological world. Find meaning in the organic.",
    image: nature,
  },
  {
    id: "art-history",
    title: "Artful History",
    desc: "Analyze the masterpieces of art and the heavy weight of hisory.",
    image: art_history,
  },
  {
    id: "spiritual",
    title: "Spiritual Path",
    desc: "Explore the metaphysical and the unseen connections of focus.",
    image: spiritual,
  },
  {
    id: "reality",
    title: "Bittersweet Reality",
    desc: "Find the resilience and irony within the unpolished truths of life.",
    image: tragedies,
  },
  {
    id: "adult",
    title: "Explicit Content",
    desc: "Dive into spicy humor.Mature content ahead. Click responsibly.",
    image: adult,
  },
  {
    id: "corporate",
    title: "Corporate Cringe",
    desc: "Translate the language of HR into something human.",
    image: corporate,
  }
];

const CaptionWriting = () => {
  const navigate=useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCtg, setSelectedCtg] = useState(null);
  const [caption, setCaption] = useState("");
  const [currentImg, setCurrentImg] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [specialEvent, setSpecialEvent] = useState(null);
  const [phase, setPhase] = useState("Inhale");
  const [showAura, setShowAura] = useState(false);
  const username = "James";

  const handleFetchImg = async (activity) => {
    setSpecialEvent(null);
    setFeedback(null);
    setCaption("");

    if (activity.id === "spiritual" || activity.id === "adult") {
      const eventType = activity.id === "spiritual" ? "meditation" : "caught";
      setSpecialEvent(eventType);
      
      try {
        const formData = new FormData();
        formData.append("category", activity.title); 
        formData.append("imageUrl", "");
        formData.append("caption", "");  
        formData.append("username", username);

        const response = await fetch(`http://10.209.220.75:8080/api/captions/evaluate`, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          // Backend now returns auraGained and totalAuraPoints
          setFeedback(result); 
        }
      } catch (error) {
        console.error("Backend Failed", error);
      }
      return;
    }

    setSelectedId(activity.id);
    setSelectedCtg(activity.title);
    try {
    // Send category and username to backend
      const response = await fetch(`http://10.209.220.75:8080/api/captions/image?category=${activity.title}`, {
      method: 'GET'
    });
      const data = await response.json();
      setCurrentImg({ id: data.imageId, url: data.imageUrl });
    }
    catch (error) {
    console.error("Backend Failed", error);
    }
  };

  const handleSubmitCaption = async () => {
  if (!currentImg || !currentImg.url) {
    console.error("No image found to submit");
    return;
  }

  setIsSyncing(true);
  try {
    // FormData for HTML Form submission
    const formData = new FormData();
    formData.append("category", selectedCtg); 
    formData.append("imageUrl", currentImg.url);
    formData.append("caption", caption);
    formData.append("username", username);

    const response = await fetch(`http://10.209.220.75:8080/api/captions/evaluate`, {
      method: 'POST',
      body: formData 
      
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const result = await response.json();
    setFeedback(result); 
  } catch (error) {
    console.error("Transmission Interrupted", error);
  } finally {
    setIsSyncing(false);
  }
};

  {/*breathing logic*/}
  useEffect(() => {
    if (specialEvent === "meditation") {
      const sequence = [
        { text: "Breathe In", duration: 4000 },
        { text: "Hold", duration: 4000 },
        { text: "Breathe Out", duration: 4000 }
      ];

      let current = 0;
      const interval = setInterval(() => {
        current = (current + 1) % sequence.length;
        setPhase(sequence[current].text);
      }, 4000); 

      return () => clearInterval(interval);
    }
  }, [specialEvent]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-linear-to-r from-[#0d1322] to-[#1a284a] text-white">
      
      {/* meditation */}
      {specialEvent === "meditation" && (
        <div className="fixed inset-0 z-100 bg-[#050505] flex flex-col items-center justify-center animate-in fade-in duration-1000">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-cyan-500 font-black uppercase tracking-[0.2em]">Congrats! Brain Rot Reduced</h2>
            <div className="mt-4 text-2xl text-white font-mono">
              Current Aura Points: {feedback?.totalAuraPoints || "Loading"}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Outer Glow */}
            <div className={`absolute w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl transition-all duration-4000 ${phase === "Breathe In" ? "scale-150 opacity-100" : "scale-100 opacity-50"}`}></div>
            
            {/* Breathing Circle */}
            <div className={`w-48 h-48 bg-linear-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(34,211,238,0.3)] transition-all duration-4000 ease-in-out ${phase === "Breathe In" ? "scale-125" : "scale-90"}`}>
              <span className="text-black font-black uppercase text-xs tracking-widest">
                {phase}
              </span>
            </div>
          </div>

          {/*Visual Steps*/}
          <div className="mt-24 flex gap-8 items-center justify-center">
            <div className={`transition-opacity duration-500 ${phase === "Breathe In" ? "opacity-100" : "opacity-20"}`}>
              <p className="text-cyan-400 font-black text-[20px] uppercase tracking-widest">Inhale</p>
            </div>
            <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
            <div className={`transition-opacity duration-500 ${phase === "Hold" ? "opacity-100" : "opacity-20"}`}>
              <p className="text-cyan-400 font-black text-[20px] uppercase tracking-widest">Hold</p>
            </div>
            <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
            <div className={`transition-opacity duration-500 ${phase === "Breathe Out" ? "opacity-100" : "opacity-20"}`}>
              <p className="text-cyan-400 font-black text-[20px] uppercase tracking-widest">Exhale</p>
            </div>
          </div>

          <button 
            onClick={() => { setSpecialEvent(null); setPhase("Inhale"); }}
            className="mt-20 px-12 py-4 border border-white/5 rounded-full text-[12px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white hover:bg-cyan-600 transition-all"
          >
            Claim & Exit
          </button>
        </div>
      )}
      {/* adult only */}
      {specialEvent === "caught" && (
        <div className="fixed inset-0 z-50 bg-red-600/20 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-flash-red">
          <div className="bg-black p-12 rounded-[3rem] border-4 border-red-600 shadow-[0_0_100px_rgba(220,38,38,0.5)] text-center">
            <h2 className="text-7xl font-black italic uppercase text-red-600 mb-4 animate-bounce">CAUGHT!</h2>
            <p className="text-white font-black uppercase tracking-widest mb-8">Caught in 4K. -50 Aura Points</p>
            <div className="mt-4 text-2xl text-white font-mono">
              Current Aura Points: {feedback?.totalAuraPoints || "Loading"}
            </div>
              <button 
                onClick={() => setSpecialEvent(null)}
                className="px-12 py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)]"
              >
                Surrender
              </button>
            </div>
          </div>
        
      )}

      <div className="max-w-7xl mx-auto">
        {!selectedCtg ? (
          <div className="w-full max-w-400 mx-auto animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-6xl md:text-7xl font-black uppercase italic text-center tracking-tighter leading-[0.8] mb-4">
                Caption <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent pr-4">writing</span>
              </h1>
            <header className="text-center mb-16 mt-8">
            <p className="text-zinc-400 text-3xl md:text-4xl font-black max-w-3xl mx-auto leading-none mb-8">
              Select a Category
            </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
              {categories.map(activity => (
                <div 
                  key={activity.id}
                  onClick={() => handleFetchImg(activity)}
                  className="group cursor-pointer bg-[#111] border-2 border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:scale-105 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.3)] flex flex-col h-full"
                >
                  {/* THE IMAGE SECTION */}
                  <div className="h-52 overflow-hidden ">
                    <img 
                      src={activity.image} 
                      alt={activity.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>

                  {/* THE TEXT SECTION */}
                  <div className="p-7 flex flex-col grow text-left bg-linear-to-b from-[#111] to-[#0a0a0a]">
                    <h3 className="text-2xl font-black uppercase italic mb-3 text-white group-hover:text-cyan-400 transition-colors tracking-tighter">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                      {activity.desc}
                    </p>

                    <div className="mt-auto pt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="grow h-px bg-cyan-900"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : <div className="max-w-7xl mx-auto animate-in zoom-in duration-500 px-4">
            {/*Category Name */}
            <header className="mb-16 text-center">
              <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
                Category: <span className="text-cyan-500">{selectedCtg}</span>
              </h1>
              <div className="h-1.5 w-82 bg-cyan-500 mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.6)]"></div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              
              {/*Fetched Image Area */}
              <div className="relative overflow-hidden flex items-center justify-center ">
                {currentImg ? (
                    <img 
                      src={currentImg.url} 
                      alt="Neural Target" 
                      className="w-full h-auto max-h-150 object-contain transition-transform duration-700" 
                    />
                  
                ) : (
                  <div className="h-150 w-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
                  </div>
                )}
              </div>

              {/* User Input*/}
              <div className="space-y-6">
                <div className="bg-[#111]/50 backdrop-blur-2xl border border-white/5 p-8 rounded-[3rem] shadow-xl">
                  <label htmlFor="caption-neural-input" 
                    className="block text-[12px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4"
                  >
                    Enter the Caption
                  </label>
                  <textarea
                    id="caption-neural-input"
                    name="caption-neural-input"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Compose high-impact caption here..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-md text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500/50 min-h-40 transition-all resize-none"
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    {/* Submit Button */}
                    <button onClick={handleSubmitCaption}
                      disabled={isSyncing || caption.length < 5}
                      className="grow flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95 disabled:opacity-20"
                    >
                      {isSyncing ? "Analysing..." : "Submit Caption"}
                      <Send size={20} />
                    </button>

                    {/* Aura Points Button */}
                    <button 
                      onClick={() => setShowAura(true)}
                      disabled={!feedback} 
                      className="px-8 py-5 bg-zinc-900 text-zinc-400 border border-white/5 rounded-2xl font-black uppercase tracking-widest hover:text-black hover:bg-white hover:border-zinc-400 transition-all disabled:opacity-20"
                    >
                      {feedback?.totalAuraPoints ? `Total Aura Ponts: ${feedback.totalAuraPoints}` : "Check Aura Points"}
                    </button>
                  </div>
                </div>

                {/*Feedback */}
                {feedback && (
                  <div className=" mt-4 bg-[#0c0c0e] border border-cyan-500/30 p-4 rounded-4xl animate-in fade-in zoom-in duration-500 shadow-2xl overflow-hidden max-w-full">
                    <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                      <div>
                        <h4 className="text-cyan-500 font-black uppercase text-[10px] tracking-[0.2em]">Caption Analysis Completed</h4>
                        <p className="text-zinc-500 text-[10px] uppercase font-bold">Category: {selectedCtg}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-zinc-500 text-[10px] font-black uppercase mb-1">Total Points</p>
                        <p className="text-white font-black text-3xl tracking-tighter">{feedback.auraGained} / <span className="text-2xs text-zinc-700">60</span></p>
                      </div>
                    </div>
                    {/* Feedback Text */}
                    <div className=" p-4 bg-cyan-500/5 rounded-xl border-l-4 mb-6 border-cyan-500">
                      <p className="text-zinc-300 italic text-sm leading-snug font-medium">
                        "{feedback.feedback}"
                      </p>
                    </div>

                    {/* checkpoints */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {[
                        { label: "Creativity", val: feedback.creativity, max: 15 },
                        { label: "Grammar", val: feedback.grammar, max: 10 },
                        { label: "Relevance", val: feedback.relevance, max: 15 },
                        { label: "Syntax", val: feedback.syntax , max: 10},
                        { label: "Vocabulary", val: feedback.vocabulary, max: 10 },
                      ].map((stat,index) => (
                        <div key={stat.label} style={{ animationDelay: `${index * 100}ms` }}
                          className={`bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both
                            ${index === 4 ? "col-span-2 md:col-span-1" : "col-span-1"}`}>
                          <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest ">{stat.label}</p>
                            <div className="flex items-baseline gap-1 mt-1">
                              <p className="text-lg font-black text-white">{stat.val}</p>
                              <span className="text-[10px] font-bold text-zinc-700">/{stat.max}</span>
                            </div>

                            <div className="w-full h-1 bg-zinc-800 mt-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-cyan-500 transition-all duration-1000" 
                                style={{ width: `${(stat.val / (typeof stat.max === 'number' ? stat.max : 100)) * 100}%` }}
                              ></div>
                            </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/*change category */}
            <button 
              onClick={() => { setSelectedCtg(null); setFeedback(null); }}
              className="mt-16 mx-auto flex items-center gap-2 text-white hover:text-cyan-500 transition-colors uppercase font-black text-[15px] tracking-widest"
            >
              <div className="w-8 h-px bg-white"></div>
              Change Category 
            </button>
          </div>}

          {/* back */}

        <footer className="mt-15 text-center">
          <button 
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-full border-3 border-zinc-800 text-zinc-500 hover:text-white hover:bg-blue-500 hover:border-blue-900 hover:border-3 transition-all text-sm font-bold uppercase tracking-widest"
          >
            ← Back to Dashboard
          </button>
        </footer>
      </div>

      {showAura && feedback && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowAura(false)}
          ></div>

          {/*  aura points pop up */}
          <div className="relative bg-[#0c0c0e] border-2 border-cyan-500/50 p-12 rounded-[3rem] text-center max-w-sm w-full shadow-[0_0_100px_rgba(34,211,238,0.2)]">
            <h2 className="text-cyan-500 font-black uppercase text-md tracking-[0.2em] mb-8">Your Aura Points</h2>
            
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
              <div className="relative text-7xl font-black italic text-white tracking-tighter">
                {feedback.totalAuraPoints}
                <span className="text-zinc-600 text-2xl not-italic tracking-tight ml-2">pts</span>
              </div>
            </div>

            <p className="text-zinc-400 font-medium leading-relaxed mb-10">
              {feedback.totalAuraPoints > 50 
                ? "Critical brainrot detected. Immediate meditation required." 
                : "You are a true aura farmer."}
            </p>

            <button 
              onClick={() => setShowAura(false)}
              className="w-full py-4 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all active:scale-95"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptionWriting;