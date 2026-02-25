import React from 'react';
import {Link} from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full bg-black text-white border-t border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-3xl font-black tracking-tighter italic">
              <a href="/" className="hover:text-gray-400 transition-colors uppercase">Doom</a>
            </h2>
            <p className="text-zinc-400 text-lg max-w-sm leading-relaxed">
              Find your own inerests and will. Explore the depths of your potential and reclaim your attention.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">
              About Us
            </h3>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/StorySection" 
                className="text-zinc-300 hover:text-white transition-colors text-sm"
              >
                Our Story
              </Link>
              <Link 
                to="/TeamSection" 
                className="text-zinc-300 hover:text-white transition-colors text-sm"
              >
                Our Team
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">Our Media Handles</h3>
            <div className="flex gap-6 text-2xl">
              <a href="#" aria-label="Facebook" className="text-zinc-400 hover:text-blue-500 transition-all transform hover:-translate-y-1">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Twitter" className="text-zinc-400 hover:text-sky-400 transition-all transform hover:-translate-y-1">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram" className="text-zinc-400 hover:text-pink-600 transition-all transform hover:-translate-y-1">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-zinc-400 hover:text-blue-400 transition-all transform hover:-translate-y-1">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <p className="pt-10 text-sm font-medium text-zinc-400 italic">
            With ❤️ <span className="text-zinc-200">Shweta</span> and <span className="text-zinc-200">Tusharika </span>
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-600">
          <p>© 2026 Doom. Crafted for focus.</p>
          <div className="flex gap-8">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;