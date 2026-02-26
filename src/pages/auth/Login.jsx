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
        "http://10.209.220.75:8080/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-linear-to-br from-[#0f1023] via-[#141532] to-[#0c0d1a]">
      <div className="max-w-md w-full space-y-4 mt-16 mb-4 p-10 rounded-2xl bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] ">
        <div className="text-center">
          <h2 className="text-4xl font-black text-black italic tracking-tighter uppercase">
            Welcome Back !!
          </h2>
          <p className="mt-2 text-zinc-500 font-medium">
            Break the scroll. Reclaim your focus.
          </p>
        </div>

        <form onSubmit={fetchLogin} className="mt-8 space-y-4 text-black">
          {error && (
            <p className="text-red-500 text-center text-[10px] font-bold uppercase">
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
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all font-semibold placeholder:text-zinc-400 bg-zinc-50"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-black focus:ring-2 focus:ring-black/5 outline-none transition-all font-semibold placeholder:text-zinc-400 bg-zinc-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white border border-black py-4 font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all duration-300 mt-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] active:scale-95"
          >
            Enter the Void
          </button>
        </form>

        <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
          New here?{" "}
          <Link to="/signup" className="text-black  underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
