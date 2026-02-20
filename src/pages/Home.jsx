import React from 'react';
import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, SquarePen, Zap } from "lucide-react";
import ActivityCard from '../components/ui/Activities'; 

const Home = () => {
  const navigate=useNavigate();
  const username = "Jude";
  const activities = [
    {
      title: "Memory & Logic",
      description: "Train your cognitive functions with high-intensity puzzles.",
      bgColor: "from-amber-400 to-orange-600", 
      path: "/activities/logic",
      icon: <Brain size={32} />
    },
    {
      title: "Fact Station",
      description: "Explore the digital void and discover mind-bending facts.",
      bgColor: "from-indigo-500 to-purple-600",
      path: "/activities/fact-station",
      icon: <Sparkles size={32} />
    },
    {
      title: "Creative Writing",
      description: "Level up your technical prowess in the dev environment.",
      bgColor: "from-emerald-400 to-teal-600",
      path: "/activities/creative",
      icon: <SquarePen size={32} />

    }
  ];

  return (
    <div className="min-h-screen w-full pt-28 pb-20 px-6 relative overflow-hidden bg-[#0a0a0c]">
      
      <div className="absolute top-0 right-0 w-125 h-125 bg-blue-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-indigo-500/10 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Section */}
        <header className="mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-black uppercase tracking-widest">
            <Zap size={14} fill="currentColor" />
            <span>Welcome Back</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase italic tracking-tighter leading-none ">
            <span className="text-white block">DOOM</span>
            <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent pr-4">
              DASHBOARD
            </span>
          </h1>
          
          <p className="text-zinc-500 text-xl font-medium max-w-xl leading-relaxed">
            Hey! <span className="text-white font-bold">{username}</span>. 
            Select an activity to proceed.
          </p>
        </header>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div 
              key={index}
              onClick={() => navigate(activity.path)}
              className="group relative cursor-pointer"
            >
              {/*Card */}
              <div className="h-full p-10 rounded-[3rem] bg-[#16161a] border border-white/5 
                              shadow-2xl transition-all duration-500 
                              hover:bg-white/3 hover:border-white/20 hover:-translate-y-2">
                
                {/* Icon */}
                <div className={`w-20 h-20 mb-8 rounded-3xl flex items-center justify-center bg-linear-to-br ${activity.bgColor} 
                                text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {activity.icon}
                </div>

                <h2 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tight">
                  {activity.title}
                </h2>
                <p className="text-zinc-500 text-base leading-relaxed mb-10 group-hover:text-zinc-300 transition-colors">
                  {activity.description}
                </p>

                {/* Status */}
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full w-1/3 bg-linear-to-r ${activity.bgColor} group-hover:w-full transition-all duration-1000`}></div>
                </div>
                <div className="mt-4 flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <span>Status: Ready</span>
                  <span>v1.0.0</span>
                </div>
              </div>

              
              <div className={`absolute inset-0 -z-10 bg-linear-to-br ${activity.bgColor} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-[3rem]`}></div>
            </div>
          ))}
        </div>

        {/* 4. Bottom Brainrot Section Anchor
        <div id="brainrot-calc" className="mt-32 p-1 border-t border-white/5">
           {/* You can add your Brainrot Calculator logic here later */}
           {/* <div className="pt-20 text-center">
             <h2 className="text-3xl font-black text-white uppercase italic mb-2">Neural Analysis</h2>
             <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Calculation Module Coming Soon</p>
           </div>
        </div>  */}
      </div>
    </div>
  );
};
export default Home;