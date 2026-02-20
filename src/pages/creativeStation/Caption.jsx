import React, { useState } from 'react';
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
    title: "Nature & Wild",
    desc: "Sync with the biological world. Find meaning in the organic.",
    image: nature,
  },
  {
    id: "art-history",
    title: "Art & History",
    desc: "Bridge the gap between eras. Decode historical aesthetics.",
    image: art_history,
  },
  {
    id: "spiritual",
    title: "Spiritual Path",
    desc: "Explore the metaphysical and the unseen connections of focus.",
    image: spiritual,
  },
  {
    id: "tragedies",
    title: "Everyday Tragedies",
    desc: "Perspective training. Find the creative silver lining in chaos.",
    image: tragedies,
  },
  {
    id: "sexual",
    title: "Adults Only",
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
  const [selectedCtg, setSelectedCtg] = useState(null);
  const [caption, setCaption] = useState("");
  const [currentImg, setCurrentImg] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleFetchImg = async (category) => {
    setSelectedCtg(category);
    setCurrentImg(`https://source.unsplash.com/random/800x600?${category.toLowerCase()}`);
  };

  const handleSubmit = async () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500); 
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-linear-to-r from-[#0d1322] to-[#1a284a] text-white">
      <div className="max-w-7xl mx-auto">
        {!selectedCtg ? (
          <div className="w-full max-w-400 mx-auto animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-6xl md:text-8xl font-black uppercase italic text-center tracking-tighter leading-[0.8] mb-4">
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
        ) : (
          <div className="space-y-8 animate-in zoom-in duration-500">
            {/* Image Container */}
            <div className="relative aspect-video w-full bg-[#111] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
              {currentImg ? (
                <img src={currentImg} alt="Neural Target" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-700">
                  <ImageIcon size={48} className="animate-pulse" />
                </div>
              )}
              <div className="absolute top-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
                Category: {selectedCtg}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-[#111]/50 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem]">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write your creative response..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 min-h-30 transition-all"
              />
              <div className="mt-6 flex justify-between items-center">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  Max 50 characters
                </p>
                <button 
                  disabled={caption.length > 50 || isSyncing}
                  onClick={handleSubmit}
                  className="flex items-center gap-3 px-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-cyan-400 disabled:opacity-20 disabled:hover:bg-white transition-all shadow-xl active:scale-95"
                >
                  {isSyncing ? "Syncing..." : "Transmit"}
                  <Send size={18} />
                </button>
              </div>
            </div>
            
            <button onClick={() => setSelectedCtg(null)} className="text-zinc-500 hover:text-white text-xs font-black uppercase tracking-widest block mx-auto">
              Change Category
            </button>
          </div>
        )}

        <footer className="mt-24 text-center">
          <button 
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-full border-3 border-zinc-800 text-zinc-500 hover:text-white hover:bg-blue-500 hover:border-blue-900 hover:border-3 transition-all text-sm font-bold uppercase tracking-widest"
          >
            ← Back to Dashboard
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CaptionWriting;