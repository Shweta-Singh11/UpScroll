import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#141532] ">
      <div className="max-w-md w-full space-y-4 mt-18 mb-4 p-10 rounded-2xl border-2 bg-white border-black">
        <div className="text-center">
          <h2 className="text-4xl font-black text-black italic tracking-tighter uppercase">login karo bhai !!</h2>
          <p className="mt-2 text-zinc-500 font-medium">Create an account to track your focus journey.</p>
        </div>
        
        <form className="mt-8 space-y-4 text-black">
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
          
          <button className="w-full bg-black text-white border border-black py-4 
            font-black uppercase tracking-widest hover:bg-white hover:text-black hover:border-black transition-all duration-300 mt-4">
            Begin Journey
          </button>
        </form>

        <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Already a member? <Link to="/login" className="text-black  underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;