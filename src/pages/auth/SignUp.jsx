import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        "https://brain-backend-3.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        localStorage.setItem("email", formData.email);
        localStorage.setItem("username", formData.username);
        navigate("/login");
      } else if (response.status === 409) {
        setError("This email is already registered. Try another email.");
      }
    } catch (error) {
      console.error("Sign Up failed", error);
      setError("Server connection failed.");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 via-zinc-100 to-indigo-50/20 dark:from-[#0a0b10] dark:via-[#0c0e18] dark:to-[#05060b] transition-colors duration-300">
      <div className="max-w-md w-full space-y-6 mt-20 mb-8 p-10 rounded-3xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/80 shadow-2xl backdrop-blur-sm transition-all duration-300">
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase">
            Sign Up !!
          </h2>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 font-medium">
            Create an account to track your focus journey.
          </p>
        </div>

        <form onSubmit={fetchUser} className="mt-8 space-y-4 text-slate-800 dark:text-zinc-200">
          <input
            name="username"
            type="text"
            placeholder="NAME"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 focus:border-indigo-600 dark:focus:border-cyan-400 focus:ring-2 focus:ring-indigo-600/5 dark:focus:ring-cyan-400/5 outline-none transition-all font-semibold placeholder:text-slate-400 dark:placeholder:text-zinc-500 bg-slate-50/50 dark:bg-zinc-900/50 text-slate-800 dark:text-zinc-100"
          />
          <input
            name="email"
            type="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 focus:border-indigo-600 dark:focus:border-cyan-400 focus:ring-2 focus:ring-indigo-600/5 dark:focus:ring-cyan-400/5 outline-none transition-all font-semibold placeholder:text-slate-400 dark:placeholder:text-zinc-500 bg-slate-50/50 dark:bg-zinc-900/50 text-slate-800 dark:text-zinc-100"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 focus:border-indigo-600 dark:focus:border-cyan-400 focus:ring-2 focus:ring-indigo-600/5 dark:focus:ring-cyan-400/5 outline-none transition-all font-semibold placeholder:text-slate-400 dark:placeholder:text-zinc-500 bg-slate-50/50 dark:bg-zinc-900/50 text-slate-800 dark:text-zinc-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-300 transition-colors p-1 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 dark:bg-red-950/20 dark:border-red-900/30 animate-in fade-in slide-in-from-top-1">
              <p className="text-[11px] text-red-600 dark:text-red-400 tracking-wider text-center font-bold">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white dark:bg-white dark:text-black border border-zinc-900 dark:border-white py-4 font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:hover:bg-zinc-900 dark:hover:text-white dark:hover:border-zinc-800 transition-all duration-300 mt-4 shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.15)] active:scale-95 cursor-pointer"
          >
            Begin Journey
          </button>
        </form>

        <p className="text-center text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
          Already a member?{" "}
          <Link to="/login" className="text-indigo-600 dark:text-cyan-400 hover:underline font-bold transition-all ml-1">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
