import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export default function AuraPointsCounter() {
  const [auraPoints, setAuraPoints] = useState(0);
  const [displayPoints, setDisplayPoints] = useState(0);

  useEffect(() => {
    // Generate a random aura points balance for visual wow factor
    setAuraPoints(Math.floor(Math.random() * 320) + 240);
  }, []);

  useEffect(() => {
    if (displayPoints < auraPoints) {
      const difference = auraPoints - displayPoints;
      // Step value dynamically increases when far away for smoother count-up
      const step = Math.ceil(difference / 10);
      const timer = setTimeout(() => {
        setDisplayPoints((prev) => Math.min(prev + step, auraPoints));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [displayPoints, auraPoints]);

  return (
    <div className="rounded-[2rem] border border-slate-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/35 p-8 text-center backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-center gap-2 select-none">
        <Zap className="h-5 w-5 text-amber-500 fill-amber-500 animate-pulse" />
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
          Aura Points Earned
        </span>
      </div>
      <div className="mt-4 text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text select-none tracking-tight">
        +{displayPoints}
      </div>
      <div className="mt-2 text-xs md:text-sm text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
        From today's UpScroll session
      </div>
    </div>
  );
}
