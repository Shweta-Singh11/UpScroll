import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://brain-backend-3.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Server Response:", data);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("username", data.username);

        console.log("Saving to Storage:", {
          storedEmail: formData.email,
          storedUser: data.username,
        });
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Server connection failed.");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 via-zinc-100 to-indigo-50/20 dark:from-[#0a0b10] dark:via-[#0c0e18] dark:to-[#05060b] transition-colors duration-300">
      <div className="max-w-md w-full space-y-6 mt-20 mb-8 p-10 rounded-3xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/80 shadow-2xl backdrop-blur-sm transition-all duration-300">
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase">
            Welcome Back !!
          </h2>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 font-medium">
            Break the scroll. Reclaim your focus.
          </p>
        </div>

        <form onSubmit={fetchLogin} className="mt-8 space-y-4 text-slate-800 dark:text-zinc-200">
          {error && (
            <p className="text-red-500 text-center text-[11px] font-bold uppercase">
              {error}
            </p>
          )}

          <input
            name="email"
            type="email"
            placeholder="EMAIL"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 focus:border-indigo-600 dark:focus:border-cyan-400 focus:ring-2 focus:ring-indigo-600/5 dark:focus:ring-cyan-400/5 outline-none transition-all font-semibold placeholder:text-slate-400 dark:placeholder:text-zinc-500 bg-slate-50/50 dark:bg-zinc-900/50 text-slate-800 dark:text-zinc-100"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 focus:border-indigo-600 dark:focus:border-cyan-400 focus:ring-2 focus:ring-indigo-600/5 dark:focus:ring-cyan-400/5 outline-none transition-all font-semibold placeholder:text-slate-400 dark:placeholder:text-zinc-500 bg-slate-50/50 dark:bg-zinc-900/50 text-slate-800 dark:text-zinc-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-300 transition-colors p-1 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white dark:bg-white dark:text-black border border-zinc-900 dark:border-white py-4 font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:hover:bg-zinc-900 dark:hover:text-white dark:hover:border-zinc-800 transition-all duration-300 mt-4 shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.15)] active:scale-95 cursor-pointer"
          >
            Enter the Void
          </button>
        </form>

        <p className="text-center text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
          New here?{" "}
          <Link to="/signup" className="text-indigo-600 dark:text-cyan-400 hover:underline font-bold transition-all ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
