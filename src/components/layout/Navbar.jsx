import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 transition-all duration-300 ease-in-out
      ${scrolled
          ? "py-4 bg-white/70 dark:bg-[#0B0D19]/70 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
          : "py-6 bg-transparent"
        }`}
    >
      {/* Left */}
      <div className="flex gap-12 items-center">
        <Link
          to="/"
          className="font-extrabold text-xl md:text-2xl tracking-tighter uppercase italic bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent shrink-0 hover:opacity-85 transition-opacity"
        >
          UpScroll
        </Link>

        {/* activities links */}
        <div className="hidden lg:flex gap-8">
          {[
            { name: "Memory & Logic", path: "/activities/logic" },
            { name: "Facts Station", path: "/activities/fact-station" },
            { name: "Creative Thinking", path: "/activities/creative" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="relative group text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition duration-200"
            >
              <span>{item.name}</span>
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-indigo-600 dark:bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50 transition-colors duration-200 cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Link to="/login" className="md:block">
          <button className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white transition cursor-pointer">
            Login
          </button>
        </Link>

        <Link to="/signup" className="hidden md:block">
          <button
            className="px-6 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-black text-[11px] font-extrabold uppercase tracking-widest rounded-full 
          hover:bg-indigo-600 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-black transition-all duration-300 shadow-md hover:shadow-indigo-500/20 dark:hover:shadow-cyan-400/25 cursor-pointer"
          >
            Sign Up
          </button>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-zinc-950 dark:text-white cursor-pointer"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Hamburger Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white/95 dark:bg-[#0B0D19]/95 backdrop-blur-xl border-t border-slate-100 dark:border-zinc-900 
        flex flex-col gap-6 px-8 py-8 lg:hidden transition-all duration-300 shadow-xl
        ${isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <Link
          to="/activities/logic"
          onClick={() => setIsMenuOpen(false)}
          className="text-base font-bold text-slate-800 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-cyan-400 transition"
        >
          Memory & Logic
        </Link>
        <Link
          to="/activities/fact-station"
          onClick={() => setIsMenuOpen(false)}
          className="text-base font-bold text-slate-800 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-cyan-400 transition"
        >
          Facts Station
        </Link>
        <Link
          to="/activities/creative"
          onClick={() => setIsMenuOpen(false)}
          className="text-base font-bold text-slate-800 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-cyan-400 transition"
        >
          Creative Thinking
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
