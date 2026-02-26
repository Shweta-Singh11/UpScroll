import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, SquarePen, ChevronDown } from "lucide-react";
import ActivityCard from "../components/ui/Activities";
import banner2 from "../assets/banner2.jpg";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
      >
        <span
          className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? "text-cyan-400" : "text-zinc-100 group-hover:text-cyan-300"}`}
        >
          {question}
        </span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : "text-zinc-500"}`}
          size={24}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-6" : "max-h-0"}`}
      >
        <p className="text-zinc-400 leading-relaxed italic border-l-2 border-cyan-500/50 pl-4">
          {answer}
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Explorer";
  const [scrollProgress, setScrollProgress] = useState(0);
  const activities = [
    {
      title: "Memory & Logic",
      description:
        "Train your cognitive functions with high-intensity puzzles.",
      bgColor: "from-amber-400 to-orange-600",
      path: "/activities/logic",
      icon: <Brain size={32} />,
    },
    {
      title: "Fact Station",
      description: "Explore the digital void and discover mind-bending facts.",
      bgColor: "from-indigo-500 to-purple-600",
      path: "/activities/fact-station",
      icon: <Sparkles size={32} />,
    },
    {
      title: "Creative Writing",
      description:
        "Level up lateral thinking by mastering the art of narrative and expression.",
      bgColor: "from-emerald-400 to-teal-600",
      path: "/activities/creative",
      icon: <SquarePen size={32} />,
    },
  ];

  const faqs = [
    {
      question: "What exactly is UpScroll?",
      answer:
        "UpScroll is a digital sanctuary designed to help you break free from the infinite scroll. It's a platform built on clarity and intent.",
    },
    {
      question: "How does it differ from traditional platforms?",
      answer:
        "While most platforms harvest attention through noise, UpScroll prioritizes your time and focus.",
    },
    {
      question: "What are Aura Points?",
      answer:
        "Aura Points are a measure of your digital intentionality and focus within UpScroll. Unlike traditional platforms that reward mindless consumption, your 'Aura' grows when you engage deeply with cognitive modules, solve complex logic puzzles, and prioritize quality interactions over quantity.",
    },
    {
      question: "How do I earn Aura Points?",
      answer:
        "You earn Aura by 'scrolling up'—choosing activities that challenge your mind. Whether it's training your memory in Logic modules or mastering technical environments, your Aura reflects the discipline and consistency you bring to the platform.",
    },
    {
      question: "Who are the architects behind the project?",
      answer:
        "UpScroll was founded by Shweta Singh, our Interface Alchemist, and Tusharika Srivastava, our Backend Architect.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / window.innerHeight;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = 1 + scrollProgress * 0.5;
  const rotateX = Math.min(scrollProgress * 25, 20);
  const rotateY = Math.max(15 - scrollProgress * 30, 0);
  const translateZ = scrollProgress * 100;

  return (
    <div className="min-h-screen  bg-linear-to-b from-[#0c0d17] via-[#010924] to-[#142142]">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505] ">
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none"></div>
        {/* Subtle Parallax Background */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${1 + scrollProgress * 0.15})`,
            opacity: 1 - scrollProgress * 0.8,
          }}
        >
          <img
            src={banner2}
            className="w-full h-full object-cover brightness-[0.6] contrast-125"
            alt="Background"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#050505]/40 via-transparent to-[#050505]" />
        </div>

        {/* Glow Effect */}
        {/* <div className="absolute w-150 h-150 bg-blue-600/10 rounded-full blur-[120px] z-0"></div> */}

        {/* Hero Content */}
        <div
          className="relative z-30 text-center px-6 transition-all duration-500"
          style={{
            transform: `translateY(${scrollProgress * -100}px)`,
            opacity: 1 - scrollProgress * 0.8,
          }}
        >
          <h1 className="font-black uppercase tracking-tight text-white leading-tight ">
            <span className="text-5xl md:text-7xl block bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              UpScroll
            </span>
          </h1>

          <p className="mt-6 text-zinc-300 text-lg max-w-2xl mx-auto">
            Break the Scroll. Reclaim Your Focus.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 rounded-full bg-white text-black font-bold uppercase tracking-widest 
                hover:bg-blue-500 hover:text-white transition-all duration-300 
                shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-blue-500/40"
            >
              Start Now
            </button>
          </div>
        </div>
      </section>
      {/* svg */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-15 md:h-25"
        >
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            fill="#010924"
          />
        </svg>
      </div>

      {/* activities */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-40">
        <header className="mb-16 space-y-4">
          <p className="text-zinc-500  text-xl font-medium max-w-xl">
            Welcome! <span className="text-blue-500 font-bold">{username}</span>
            . Select an activity to proceed.
          </p>
        </header>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {activities.map((activity, index) => (
            <div
              key={index}
              onClick={() => navigate(activity.path)}
              className={`group relative cursor-pointer transition-all duration-500 hover:-translate-y-4 
                ${index === 1 ? "md:scale-110 z-20" : "md:scale-95"}`}
            >
              <div
                className="h-full p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 
                              shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                              group-hover:border-white/20 transition-all"
              >
                <div
                  className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-linear-to-br ${activity.bgColor} 
                                text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}
                >
                  {activity.icon}
                </div>

                <h3 className="text-2xl font-black text-white mb-3 uppercase italic tracking-tight">
                  {activity.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  {activity.description}
                </p>

                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full w-1/3 bg-linear-to-r ${activity.bgColor} group-hover:w-full transition-all duration-1000`}
                  ></div>
                </div>
              </div>
              <div
                className={`absolute inset-0 -z-10 bg-linear-to-br ${activity.bgColor} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-[2.5rem]`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* faq's */}
      <section className="pt-20 pb-10 px-6 ">
        <div className="max-w-4xl mx-auto ">
          <div className="text-center mb-10 ">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter bg-linear-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent uppercase italic">
              Frequently Asked Questions
            </h1>
          </div>

          <div
            className=" text-zinc-300 bg-white/5 backdrop-blur-xl border border-white/10 
                              shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl p-8 md:p-12  "
          >
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
