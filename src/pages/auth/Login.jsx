import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-linear-to-br from-[#0f1023] via-[#141532] to-[#0c0d1a]">
      <div className="max-w-md w-full space-y-4 mt-16 mb-4 p-10 rounded-2xl bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] ">
        <div className="text-center">
          <h2 className="text-4xl font-black text-black italic tracking-tighter uppercase">Welcome Back !!</h2>
          <p className="mt-2 text-zinc-500 font-medium">Reclaim your focus. Stop the scroll.</p>
        </div>
        
        <form className="mt-8 space-y-4 text-black">
          <input 
            type="email" 
            placeholder="EMAIL" 
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all font-semibold uppercase placeholder:text-zinc-400 bg-zinc-50"
          />
          <input 
            type="password" 
            placeholder="PASSWORD" 
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all font-semibold uppercase placeholder:text-zinc-400 bg-zinc-50"
          />
          
          <div className="flex justify-end">
            <a href="#" className="text-[10px] font-bold text-zinc-400 uppercase hover:text-black">Forgot Password?</a>
          </div>

          <button className="w-full bg-black text-white border border-black py-4 font-black uppercase tracking-widest rounded-lg hover:bg-white hover:text-black transition-all duration-300 mt-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            Enter the Void
          </button>
        </form>

        <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
          New here? <Link to="/signup" className="text-black  underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;