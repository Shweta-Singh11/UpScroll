import React, { useEffect, useState, useRef } from "react";

const ImpactStats = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Counter values
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [isCount3Complete, setIsCount3Complete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Helper for requestAnimationFrame count-up
    const animateValue = (start, end, duration, setValue, onComplete) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = progress * (2 - progress); // easeOutQuad easing
        setValue(Math.floor(easeProgress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setValue(end);
          if (onComplete) onComplete();
        }
      };
      window.requestAnimationFrame(step);
    };

    // Stagger counters slightly for premium feel
    const timer1 = setTimeout(() => {
      animateValue(0, 65, 1200, setCount1);
    }, 100);

    const timer2 = setTimeout(() => {
      animateValue(0, 7, 1000, setCount2);
    }, 250);

    const timer3 = setTimeout(() => {
      animateValue(0, 99, 1400, setCount3, () => {
        setIsCount3Complete(true);
      });
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 z-10 pt-4 pb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        {/* Card 1: Attention Span Loss */}
        <div 
          className="reveal-on-scroll group relative rounded-[24px] bg-[#0A0D22]/90 dark:bg-[#070A1E]/80 border border-white/[0.08] dark:border-white/5 p-8 md:p-10 shadow-[0_12px_30px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-md hover:-translate-y-1.5 hover:border-cyan-500/30 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] transition-all duration-300 ease-out flex flex-col justify-between min-h-[190px]"
        >
          {/* Subtle inside ambient glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-zinc-400 mb-6 block select-none">
              ATTENTION SPAN LOSS
            </span>
            <div className="text-[52px] md:text-[60px] font-black text-cyan-400 mb-4 select-none leading-none tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
              -{count1}%
            </div>
          </div>
          <p className="relative z-10 text-xs md:text-sm text-slate-300 dark:text-zinc-400 font-medium select-none mt-auto">
            In just two decades (2004–2024)
          </p>
        </div>

        {/* Card 2: Daily Screen Time */}
        <div 
          className="reveal-on-scroll group relative rounded-[24px] bg-[#0A0D22]/90 dark:bg-[#070A1E]/80 border border-white/[0.08] dark:border-white/5 p-8 md:p-10 shadow-[0_12px_30px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-md hover:-translate-y-1.5 hover:border-cyan-400/30 hover:shadow-[0_20px_40px_rgba(56,189,248,0.15)] transition-all duration-300 ease-out delay-150 flex flex-col justify-between min-h-[190px]"
        >
          {/* Subtle inside ambient glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-zinc-400 mb-6 block select-none">
              DAILY SCREEN TIME
            </span>
            <div className="text-[52px] md:text-[60px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 select-none leading-none tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
              {count2}+ hrs
            </div>
          </div>
          <p className="relative z-10 text-xs md:text-sm text-slate-300 dark:text-zinc-400 font-medium select-none mt-auto">
            Average daily smartphone usage
          </p>
        </div>

        {/* Card 3: Mindful Moments */}
        <div 
          className="reveal-on-scroll group relative rounded-[24px] bg-[#0A0D22]/90 dark:bg-[#070A1E]/80 border border-white/[0.08] dark:border-white/5 p-8 md:p-10 shadow-[0_12px_30px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-md hover:-translate-y-1.5 hover:border-emerald-500/30 hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] transition-all duration-300 ease-out delay-300 flex flex-col justify-between min-h-[190px]"
        >
          {/* Subtle inside ambient glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-zinc-400 mb-6 block select-none">
              MINDFUL MOMENTS
            </span>
            <div className="text-[52px] md:text-[60px] font-black text-emerald-400 mb-4 select-none leading-none tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
              {isCount3Complete ? "0 → ∞" : `0 → ${count3}`}
            </div>
          </div>
          <p className="relative z-10 text-xs md:text-sm text-slate-300 dark:text-zinc-400 font-medium select-none mt-auto">
            Every session counts. Start your journey today.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ImpactStats;
