import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white dark:bg-black">
      <div className="max-w-md w-full space-y-8 p-10 border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <div className="text-center">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">Welcome Back !!</h2>
          <p className="mt-2 text-zinc-500 font-medium">Reclaim your focus. Stop the scroll.</p>
        </div>
        
        <form className="mt-8 space-y-4">
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
          
          <div className="flex justify-end">
            <a href="#" className="text-[10px] font-bold text-zinc-400 uppercase hover:text-black">Forgot Password?</a>
          </div>

          <button className="w-full bg-black text-white dark:bg-white dark:text-black py-4 font-black uppercase tracking-widest hover:invert transition-all">
            Enter the Void
          </button>
        </form>

        <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
          New here? <Link to="/signup" className="text-black dark:text-white underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;