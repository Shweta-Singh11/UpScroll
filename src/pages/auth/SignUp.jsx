import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white dark:bg-black">
      <div className="max-w-md w-full space-y-8 p-10 border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <div className="text-center">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">login karo bhai !!</h2>
          <p className="mt-2 text-zinc-500 font-medium">Create an account to track your focus journey.</p>
        </div>
        
        <form className="mt-8 space-y-4">
          <input 
            type="text" 
            placeholder="NAME" 
            className="w-full px-4 py-3 border-2 border-zinc-200 focus:border-black outline-none transition-all font-bold uppercase placeholder:text-zinc-300"
          />
          <input 
            type="email" 
            placeholder="EMAIL" 
            className="w-full px-4 py-3 border-2 border-zinc-200 focus:border-black outline-none transition-all font-bold uppercase placeholder:text-zinc-300"
          />
          <input 
            type="password" 
            placeholder="PASSWORD" 
            className="w-full px-4 py-3 border-2 border-zinc-200 focus:border-black outline-none transition-all font-bold uppercase placeholder:text-zinc-300"
          />
          
          <button className="w-full bg-black text-white dark:bg-white dark:text-black py-4 font-black uppercase tracking-widest hover:invert transition-all mt-4">
            Begin Journey
          </button>
        </form>

        <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Already a member? <Link to="/login" className="text-black dark:text-white underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;