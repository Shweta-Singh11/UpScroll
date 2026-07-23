import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImpactStats from "../components/ui/ImpactStats";
import ResearchCompass from "../components/home/ResearchCompass";
import AuraPointsCounter from "../components/home/AuraPointsCounter";
import EmotionalCalibration from "../components/home/EmotionalCalibration";
import {
  Sparkles,
  Brain,
  SquarePen,
  ChevronDown,
  Target,
  BookOpen,
  GraduationCap,
  Zap,
  Palette,
  Heart,
  Gamepad2,
  ArrowRight,
} from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const totalMiliseconds = duration;
    const incrementTime = 30;
    const totalSteps = totalMiliseconds / incrementTime;
    const stepValue = end / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(stepValue * currentStep));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num;
  };

  return (
    <span ref={countRef}>
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

// FAQ Accordion Item
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200/60 dark:border-zinc-800/80 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none group cursor-pointer"
      >
        <span
          className={`text-base md:text-lg font-bold transition-all duration-300 ${isOpen
            ? "text-indigo-600 dark:text-cyan-400 translate-x-1"
            : "text-slate-800 dark:text-zinc-100 group-hover:text-indigo-500 dark:group-hover:text-cyan-300"
            }`}
        >
          {question}
        </span>
        <div
          className={`p-1.5 rounded-full transition-colors duration-300 ${isOpen ? "bg-indigo-50 dark:bg-cyan-950/40" : "bg-transparent"}`}
        >
          <ChevronDown
            className={`transform transition-transform duration-300 ${isOpen
              ? "rotate-180 text-indigo-600 dark:text-cyan-400"
              : "text-slate-400 dark:text-zinc-500"
              }`}
            size={18}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-[max-height,padding] duration-200 ease-out ${isOpen ? "max-h-96 pb-6" : "max-h-0 pb-0"
          }`}
      >
        <p className="text-slate-600 dark:text-zinc-400 leading-relaxed border-l-2 border-indigo-500/50 dark:border-cyan-500/50 pl-4 text-sm md:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Explorer";
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Parallax Effect Handler
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const y = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    setMouseOffset({ x, y });
  };

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / window.innerHeight;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const activities = [
    {
      title: "Memory & Logic",
      description:
        "Train your cognitive functions with high-intensity puzzles.",
      path: "/activities/logic",
      icon: <Brain size={28} />,
      badge: "LogicQuest",
      cardStyles:
        "group-hover:border-amber-500/40 dark:group-hover:border-amber-500/40 border-slate-200/80 dark:border-zinc-800/80 hover:shadow-amber-500/10 dark:hover:shadow-amber-500/15",
      iconContainer:
        "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
      progressBg: "bg-amber-500",
      gStart: "rgba(245, 158, 11, 0.4)",
      gEnd: "rgba(245, 158, 11, 0.05)",
    },
    {
      title: "Fact Station",
      description: "Explore the digital void and discover mind-bending facts.",
      path: "/activities/fact-station",
      icon: <Sparkles size={28} />,
      badge: "Knowledge Hub",
      cardStyles:
        "group-hover:border-indigo-500/40 dark:group-hover:border-indigo-500/40 border-slate-200/80 dark:border-zinc-800/80 hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/15",
      iconContainer:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
      progressBg: "bg-indigo-500",
      gStart: "rgba(99, 102, 241, 0.4)",
      gEnd: "rgba(99, 102, 241, 0.05)",
    },
    {
      title: "Creative Writing",
      description:
        "Level up lateral thinking by mastering the art of narrative and expression.",
      path: "/activities/creative",
      icon: <SquarePen size={28} />,
      badge: "Lateral Thinking",
      cardStyles:
        "group-hover:border-emerald-500/40 dark:group-hover:border-emerald-500/40 border-slate-200/80 dark:border-zinc-800/80 hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/15",
      iconContainer:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      progressBg: "bg-emerald-500",
      gStart: "rgba(16, 185, 129, 0.4)",
      gEnd: "rgba(16, 185, 129, 0.05)",
    },
  ];

  const faqs = [
    {
      question: "What exactly is UpScroll?",
      answer:
        "UpScroll is a digital sanctuary designed to help you break free from the infinite scroll. It's an active mental playground built on clarity, mindfulness, and constructive focus.",
    },
    {
      question: "How does it differ from traditional platforms?",
      answer:
        "Unlike traditional social media that mines your attention through passive infinite loops, UpScroll invites you to scroll upwards: translating screen time into cognitive training, creative expression, and conscious growth.",
    },
    {
      question: "What are Aura Points?",
      answer:
        "Aura Points are a measure of your digital intentionality and focus within UpScroll. Your 'Aura' grows when you complete cognitive exercises, engage with writing challenges, and dedicate quality time to active brain training instead of passive scrolling.",
    },
    {
      question: "How do I earn Aura Points?",
      answer:
        "You earn Aura automatically by executing activities. Tackling Sudoku layers, playing Memory Flips, drafting captions, or scrolling facts inside the Fact Station all elevate your focus scores, tracking progress directly.",
    },
    {
      question: "Who are the architects behind the project?",
      answer:
        "UpScroll was designed and created by Shweta Singh, our Interface Alchemist, and Tusharika Srivastava, our Backend Architect.",
    },
  ];

  // Floating Game Cards in Hero Right side
  const floatingGames = [
    {
      name: "Word Search",
      path: "/activities/logic/word-search",
      styleClass: "animate-float-card-1 top-[5%] left-[5%]",
      gradient: "from-blue-500/20 to-cyan-400/10",
    },
    {
      name: "Sudoku",
      path: "/activities/logic/sudoku",
      styleClass: "animate-float-card-2 top-[12%] right-[-5%]",
      gradient: "from-amber-500/20 to-orange-400/10",
    },
    {
      name: "Memory Match",
      path: "/activities/logic",
      styleClass: "animate-float-card-3 bottom-[18%] left-[-8%]",
      gradient: "from-indigo-500/20 to-violet-400/10",
    },
    {
      name: "Daily Facts",
      path: "/activities/fact-station",
      styleClass: "animate-float-card-4 bottom-[8%] right-[10%]",
      gradient: "from-emerald-500/20 to-teal-400/10",
    },
    {
      name: "Creative Writing",
      path: "/activities/creative",
      styleClass: "animate-float-card-5 top-[45%] right-[-18%]",
      gradient: "from-pink-500/20 to-rose-400/10",
    },
  ];

  // Floating small trait icons
  const floatingTraits = [
    {
      icon: <Target size={16} />,
      label: "Focus",
      styleClass: "animate-float-icon-1 top-[1%] left-[45%]",
      color: "text-cyan-400 bg-cyan-950/40 border-cyan-500/30",
    },
    {
      icon: <BookOpen size={16} />,
      label: "Books",
      styleClass: "animate-float-icon-2 top-[35%] left-[-15%]",
      color: "text-indigo-400 bg-indigo-950/40 border-indigo-500/30",
    },
    {
      icon: <GraduationCap size={16} />,
      label: "Learning",
      styleClass: "animate-float-icon-3 bottom-[32%] right-[-15%]",
      color: "text-amber-400 bg-amber-950/40 border-amber-500/30",
    },
    {
      icon: <Zap size={16} />,
      label: "Productivity",
      styleClass: "animate-float-icon-4 bottom-[2%] left-[25%]",
      color: "text-teal-400 bg-teal-950/40 border-teal-500/30",
    },
    {
      icon: <Palette size={16} />,
      label: "Creativity",
      styleClass: "animate-float-icon-5 top-[25%] right-[25%]",
      color: "text-pink-400 bg-pink-950/40 border-pink-500/30",
    },
    {
      icon: <Heart size={16} />,
      label: "Mindfulness",
      styleClass: "animate-float-icon-6 bottom-[10%] left-[-5%]",
      color: "text-purple-400 bg-purple-950/40 border-purple-500/30",
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gradient-to-b from-[#F3F7FA] via-[#ECF2F6] to-[#F3F7FA] dark:from-[#0B0D19] dark:via-[#111326] dark:to-[#0B0D19] text-slate-800 dark:text-zinc-100 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Noise filter */}
      <div className="noise-overlay" />

      {/* Glow Orbs - Continuous Premium Canvas */}
      <div className="absolute top-[5%] left-[5%] w-[45rem] h-[45rem] rounded-full bg-indigo-300/15 dark:bg-indigo-950/20 blur-[130px] animate-pulse-soft pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-cyan-300/15 dark:bg-cyan-950/15 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[55%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-violet-300/15 dark:bg-violet-950/15 blur-[110px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[5%] right-[5%] w-[45rem] h-[45rem] rounded-full bg-teal-300/15 dark:bg-teal-950/20 blur-[140px] pointer-events-none z-0"></div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 md:px-12 lg:px-20 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-8 text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 dark:bg-indigo-950/40 border border-indigo-200/40 dark:border-indigo-800/35 text-indigo-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest shadow-sm select-none animate-pulse-soft">
              <Sparkles size={14} className="animate-spin-slow" />
              <span>Escape Doomscrolling</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Break the scroll. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent italic tracking-tight font-black">
                  Reclaim your mind.
                </span>
              </h1>
              <p className="text-base md:text-lg text-slate-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                Break free from loops of passive consumption. Engage with
                mindful, interactive logic games, discovery grids, and creative
                writing modules crafted to empower focus.
              </p>
            </div>
          </div>

          {/* Right Column - 3D Floating Illustration */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[450px]">
            {/* Animated background rings */}
            <div
              style={{
                transform: `rotateX(60deg) rotateY(20deg) translate3d(calc(${mouseOffset.x} * -15px), calc(${mouseOffset.y} * -15px), 0)`,
                transition: "transform 0.2s ease-out",
              }}
              className="absolute w-80 h-80 rounded-full border border-indigo-500/20 dark:border-cyan-500/10 animate-ring-1"
            />
            <div
              style={{
                transform: `rotateX(-45deg) rotateY(-30deg) translate3d(calc(${mouseOffset.x} * 15px), calc(${mouseOffset.y} * 15px), 0)`,
                transition: "transform 0.2s ease-out",
              }}
              className="absolute w-[360px] h-[360px] rounded-full border border-violet-500/10 dark:border-indigo-500/5 animate-ring-2"
            />

            {/* Glowing Brain Centerpiece */}
            <div
              style={{
                transform: `translate3d(calc(${mouseOffset.x} * 20px), calc(${mouseOffset.y} * 20px), 0)`,
                transition: "transform 0.2s ease-out",
              }}
              className="relative z-10 animate-float-brain pointer-events-none"
            >
              <svg
                viewBox="0 0 200 200"
                className="w-64 h-64 md:w-72 md:h-72 drop-shadow-[0_0_50px_rgba(99,102,241,0.45)] dark:drop-shadow-[0_0_60px_rgba(34,211,238,0.35)]"
              >
                <defs>
                  <linearGradient
                    id="brainGlow"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9" />
                  </linearGradient>
                  <radialGradient id="radialGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background radial glow */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="url(#radialGlow)"
                  className="animate-pulse"
                />

                {/* Highly stylized tech brain */}
                {/* Left side hemispheres */}
                <path
                  d="M100,45 C80,42 62,38 50,56 C38,72 42,92 52,102 C36,110 40,132 60,142 C70,147 88,138 100,128 Z"
                  fill="none"
                  stroke="url(#brainGlow)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M85,55 C70,55 58,68 62,82 C55,92 62,108 72,105 C75,115 88,122 95,112"
                  fill="none"
                  stroke="url(#brainGlow)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.8"
                />

                {/* Right side hemispheres */}
                <path
                  d="M100,45 C120,42 138,38 150,56 C162,72 158,92 148,102 C164,110 160,132 140,142 C130,147 112,138 100,128 Z"
                  fill="none"
                  stroke="url(#brainGlow)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M115,55 C130,55 142,68 138,82 C145,92 138,108 128,105 C125,115 112,122 105,112"
                  fill="none"
                  stroke="url(#brainGlow)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.8"
                />

                {/* Center connection lines */}
                <line
                  x1="100"
                  y1="52"
                  x2="100"
                  y2="120"
                  stroke="url(#brainGlow)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.5"
                />

                {/* Floating circuits / node connections */}
                <circle
                  cx="85"
                  cy="55"
                  r="4.5"
                  fill="#22d3ee"
                  className="animate-ping"
                  style={{ animationDuration: "2.8s" }}
                />
                <circle
                  cx="115"
                  cy="55"
                  r="4.5"
                  fill="#818cf8"
                  className="animate-ping"
                  style={{ animationDuration: "3.3s" }}
                />
                <circle cx="62" cy="82" r="5" fill="#a78bfa" />
                <circle cx="138" cy="82" r="5" fill="#22d3ee" />
                <circle
                  cx="72"
                  cy="105"
                  r="4"
                  fill="#818cf8"
                  className="animate-ping"
                  style={{ animationDuration: "2.5s" }}
                />
                <circle
                  cx="128"
                  cy="105"
                  r="4"
                  fill="#a78bfa"
                  className="animate-ping"
                  style={{ animationDuration: "4s" }}
                />
                <circle
                  cx="100"
                  cy="90"
                  r="6"
                  fill="#ffffff"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* Floating Game Cards (interactive click triggers routing) */}
            {floatingGames.map((game, idx) => (
              <div
                key={idx}
                onClick={() => navigate(game.path)}
                style={{
                  transform: `translate3d(calc(${mouseOffset.x} * ${12 + idx * 3}px), calc(${mouseOffset.y} * ${12 + idx * 3}px), 0)`,
                  transition: "transform 0.25s ease-out",
                }}
                className={`absolute z-20 glass-panel hover:bg-white/80 dark:hover:bg-zinc-800/80 px-4 py-2.5 rounded-2xl border border-slate-200/50 dark:border-zinc-700/30 shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.2)] cursor-pointer group hover:scale-105 transition-all duration-300 ${game.styleClass}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${game.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                />
                <div className="relative flex items-center gap-2 select-none">
                  <Gamepad2
                    size={13}
                    className="text-indigo-600 dark:text-cyan-400 group-hover:rotate-12 transition-transform"
                  />
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                    {game.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Floating Trait Icons */}
            {floatingTraits.map((trait, idx) => (
              <div
                key={idx}
                style={{
                  transform: `translate3d(calc(${mouseOffset.x} * ${8 + idx * 2}px), calc(${mouseOffset.y} * ${8 + idx * 2}px), 0)`,
                  transition: "transform 0.3s ease-out",
                }}
                className={`absolute z-10 flex items-center justify-center p-2 rounded-xl border shadow-sm ${trait.color} ${trait.styleClass}`}
                title={trait.label}
              >
                {trait.icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STATISTICS SECTION */}
      <ImpactStats />

      {/* RESEARCH COMPASS SECTION */}
      <ResearchCompass />

      {/* INTERACTIVE DASHBOARD / ACTIVITIES */}
      <section className="relative py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-10">
        <div className="space-y-16">
          <header className="reveal-on-scroll flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200/40 dark:border-zinc-800/40 pb-8">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-cyan-400">
                Interactive Dashboard
              </h2>
              <p className="text-slate-800 dark:text-zinc-200 text-2xl md:text-3xl font-extrabold leading-tight">
                Welcome back,{" "}
                <span className="text-indigo-600 dark:text-blue-400 italic">
                  {username}
                </span>
                . Select a module to explore:
              </p>
            </div>
            <div className="w-full md:w-80 shrink-0">
              <AuraPointsCounter />
            </div>
          </header>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((act, index) => (
              <div
                key={index}
                onClick={() => navigate(act.path)}
                style={{
                  "--g-start": act.gStart,
                  "--g-end": act.gEnd,
                }}
                className={`reveal-on-scroll group relative rounded-[2.2rem] border border-slate-200/50 dark:border-zinc-800/80 p-8 glass-panel gradient-border-wrapper shadow-[0_20px_50px_rgba(0,0,0,0.015)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-pointer hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 overflow-hidden ${act.cardStyles}`}
              >
                {/* Interactive inner gradients */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-indigo-500/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${act.iconContainer} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    {act.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-100/80 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 border border-slate-200/40 dark:border-zinc-700/35">
                    {act.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase italic tracking-tight relative z-10 flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                  {act.title}
                  <ArrowRight
                    size={18}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </h3>

                <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 relative z-10 h-12 overflow-hidden">
                  {act.description}
                </p>

                {/* Progress bar animation */}
                <div className="w-full h-1 bg-slate-200/50 dark:bg-zinc-800/80 rounded-full overflow-hidden relative z-10">
                  <div
                    className={`h-full w-1/4 ${act.progressBg} group-hover:w-full transition-all duration-1000 ease-out`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMOTIONAL CALIBRATION SYSTEM */}
      <EmotionalCalibration />

      {/* CALL TO ACTION (Conclusion of Journey) */}
      <section className="relative py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-10">
        <div className="reveal-on-scroll relative rounded-[3rem] bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 dark:from-zinc-900 dark:via-[#0E1020] dark:to-zinc-950 p-12 md:p-20 text-center overflow-hidden border border-white/10 shadow-2xl">
          {/* Floating glowing circles / particles inside CTA */}
          <div className="absolute top-[10%] left-[20%] w-32 h-32 rounded-full bg-cyan-500/20 blur-[50px] animate-pulse pointer-events-none" />
          <div className="absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-indigo-500/20 blur-[70px] animate-pulse pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} className="animate-spin-slow" />
              <span>Sanctuary Awaits</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase italic">
              Ready to scroll up?
            </h2>

            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Step out of the loop of endless static posts. Accumulate insights,
              level up your logic faculties, and align screen habits.
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate("/signup")}
                className="btn-premium px-10 py-5 bg-gradient-to-r from-cyan-400 to-indigo-500 dark:from-cyan-500 dark:to-indigo-500 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-widest rounded-full shadow-[0_15px_40px_rgba(34,211,238,0.2)] hover:scale-103 transition-all duration-300 cursor-pointer"
              >
                Join UpScroll
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative py-24 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto z-10">
        <div className="space-y-12">
          <header className="reveal-on-scroll text-center space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-cyan-400">
              Curious Minds
            </h2>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              Frequently Asked Questions
            </h1>
          </header>

          <div className="reveal-on-scroll glass-panel border border-slate-200/50 dark:border-zinc-800/80 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 md:p-12 transition-all duration-300">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
