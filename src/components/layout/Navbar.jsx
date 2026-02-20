import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-900 shadow-md transition-colors duration-300">
      
      <div className="flex gap-6 items-center">
        <Link to="/" className="font-black text-xl tracking-tighter text-black dark:text-white uppercase italic">
          Doom
        </Link>
          <div className="hidden md:flex gap-6">
            <Link to="/activities/logic" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 transition">
              Memory & Logic 
            </Link>
      
            <Link to="/activities/fact-station" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 transition">
              Facts Station
            </Link>
            
            <Link to="activities/creative" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 transition">
              Creative Thinking
            </Link>
          </div>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/signup">
          <button className="hidden sm:block px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition font-medium">
            Sign Up
          </button>
        </Link>

        <Link to="/login">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium shadow-lg shadow-blue-500/20">
            Login
          </button>
        </Link>

        <button 
          onClick={toggleDarkMode} 
          className="text-2xl p-2 hover:scale-110 transition-transform"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;