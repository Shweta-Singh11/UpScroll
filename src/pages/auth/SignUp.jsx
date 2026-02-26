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
        "http://10.209.220.75:8080/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        localStorage.setItem("email", formData.email);
        localStorage.setItem("username", formData.username);
        navigate("/login");
      } else if (response.status === 409) {
        setError("This email is already registered.Try another email.");
      }
    } catch (error) {
      console.error("Sign Up failed", error);
    }
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#141532] ">
      <div className="max-w-md w-full space-y-4 mt-18 mb-4 p-10 rounded-2xl border-2 bg-white border-black">
        <div className="text-center">
          <h2 className="text-4xl font-black text-black italic tracking-tighter uppercase">
            Sign Up!!
          </h2>
          <p className="mt-2 text-zinc-500 font-medium">
            Create an account to track your focus journey.
          </p>
        </div>

        <form onSubmit={fetchUser} className="mt-8 space-y-4 text-black">
          <input
            name="username"
            type="text"
            placeholder="NAME"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border-2 border-zinc-200 focus:border-black outline-none font-semibold transition-all placeholder:text-zinc-300"
          />
          <input
            name="email"
            type="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border-2 border-zinc-200 focus:border-black outline-none font-semibold transition-all placeholder:text-zinc-300"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-4 border-2 border-zinc-200 focus:border-black outline-none font-semibold transition-all placeholder:text-zinc-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 animate-in fade-in slide-in-from-top-1">
              <p className="text-[12px] text-red-600  tracking-wider text-center">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-5 font-black  rounded-3xl uppercase tracking-widest hover:bg-zinc-800 transition-all duration-300 mt-4"
          >
            Begin Journey
          </button>
        </form>

        <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Already a member?{" "}
          <Link to="/login" className="text-black  underline">
            LogIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
