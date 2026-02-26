import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 lg:px-16 transition-all duration-500
      ${
        scrolled
          ? "py-4 bg-black/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "py-6 bg-transparent"
      }`}
    >
      {/* Left */}
      <div className="flex gap-12 items-center">
        <Link
          to="/"
          className="font-black text-2xl tracking-tighter uppercase italic text-white"
        >
          UpScroll
        </Link>

        {/* avtivities link */}
        <div className="hidden lg:flex gap-7">
          {[
            { name: "Memory & Logic", path: "/activities/logic" },
            { name: "Facts Station", path: "/activities/fact-station" },
            { name: "Creative Thinking", path: "/activities/creative" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-[11px] font-black uppercase tracking-widest text-white-400 hover:text-white transition duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <Link to="/login">
          <button className="text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition">
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button
            className="px-6 py-2 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-full 
          hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-blue-500/40"
          >
            Join Now
          </button>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Hamburger Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 
        flex flex-col gap-6 px-8 py-8 lg:hidden transition-all duration-500
        ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <Link
          to="/activities/logic"
          onClick={() => setIsMenuOpen(false)}
          className="text-lg font-bold text-white"
        >
          Memory & Logic
        </Link>
        <Link
          to="/activities/fact-station"
          onClick={() => setIsMenuOpen(false)}
          className="text-lg font-bold text-white"
        >
          Facts Station
        </Link>
        <Link
          to="/activities/creative"
          onClick={() => setIsMenuOpen(false)}
          className="text-lg font-bold text-white"
        >
          Creative Thinking
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
