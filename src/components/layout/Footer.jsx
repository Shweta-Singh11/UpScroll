import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-transparent text-slate-700 dark:text-zinc-300 border-t border-slate-200/40 dark:border-zinc-800/40 transition-colors duration-300 relative z-30 py-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-200/40 dark:border-zinc-800/40 pb-12">
        
        {/* Left Side branding */}
        <div className="md:col-span-6 space-y-5">
          <Link
            to="/"
            className="inline-block font-extrabold text-2xl tracking-tighter uppercase italic bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent hover:opacity-85 transition-opacity"
          >
            UpScroll
          </Link>
          <p className="text-slate-500 dark:text-zinc-400 text-sm max-w-md leading-relaxed">
            Reclaim your attention. Engage with targeted, cognitive micro-actions and storytelling exercises that stimulate concentration and cognitive capacity.
          </p>
        </div>

        {/* Links Column */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-800 dark:text-zinc-200">
            About Us
          </h3>
          <nav className="flex flex-col gap-3">
            <Link
              to="/StorySection"
              className="text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors text-sm font-semibold"
            >
              Our Story
            </Link>
            <Link
              to="/TeamSection"
              className="text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors text-sm font-semibold"
            >
              Our Team
            </Link>
          </nav>
        </div>

        {/* Socials & Credits */}
        <div className="md:col-span-3 space-y-5">
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-800 dark:text-zinc-200">
            Connect
          </h3>
          <div className="flex gap-4">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/30 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-cyan-400 hover:border-indigo-500/30 dark:hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/30 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-cyan-400 hover:border-indigo-500/30 dark:hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/30 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-cyan-400 hover:border-indigo-500/30 dark:hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/30 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-cyan-400 hover:border-indigo-500/30 dark:hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-slate-400 dark:text-zinc-500 italic pt-2">
            With ❤️ <span className="font-extrabold text-slate-700 dark:text-zinc-300">Shweta</span> and{" "}
            <span className="font-extrabold text-slate-700 dark:text-zinc-300">Tusharika</span>
          </p>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
        <p>
          © 2026 <span className="text-indigo-600 dark:text-cyan-400 font-extrabold">UpScroll</span>. Crafted for focus.
        </p>
        <div className="flex gap-8">
          <a href="/privacy" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
