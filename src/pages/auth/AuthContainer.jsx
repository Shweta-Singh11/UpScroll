import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const AuthContainer = ({ initialView = "login" }) => {
  const navigate = useNavigate();
  
  const [currentView, setCurrentView] = useState(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0); 

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    otp: ""
  });

  useEffect(() => {
    let interval;
    if (timer > 0) interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault(); setError(""); setMessage("");
    try {
      const response = await fetch("http://localhost:8081/api/users/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password }),
      });
      if (response.ok) {
        setMessage("Check your email for the OTP.");
        setCurrentView("otp"); setTimer(60); 
      } else if (response.status === 409) {
        setError("Email or Username is already taken.");
      } else {
        setError("Registration failed.");
      }
    } catch (err) { setError("Server connection failed."); }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); setError(""); setMessage("");
    try {
      const response = await fetch("http://localhost:8081/api/users/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      if (response.ok) {
        localStorage.setItem("token", response.headers.get("Authorization"));
        localStorage.setItem("email", formData.email);
        navigate("/"); 
      } else if (response.status === 403) {
        setError("Account not verified. Please check your email.");
        setCurrentView("otp"); 
      } else {
        setError("Invalid credentials.");
      }
    } catch (err) { setError("Server connection failed."); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault(); setError(""); setMessage("");
    try {
      const response = await fetch("http://localhost:8081/api/users/verifyOtp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token || response.headers.get("Authorization"));
        navigate("/");
      } else { setError("Invalid or expired OTP."); }
    } catch (err) { setError("Server connection failed."); }
  };

  const handleResendOtp = async () => {
    setError(""); setMessage("");
    try {
      const response = await fetch("http://localhost:8081/api/users/resendOtp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      if (response.ok) {
        setMessage("A new OTP has been sent."); setTimer(60);
      } else { setError("Please wait before requesting another OTP."); }
    } catch (err) { setError("Server connection failed."); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#141532]">
      <div className="max-w-md w-full space-y-4 mt-16 mb-4 p-10 rounded-2xl bg-white border-2 border-black shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        
        <div className="text-center">
          <h2 className="text-4xl font-black text-black italic tracking-tighter uppercase">
            {currentView === "login" && "Welcome Back !!"}
            {currentView === "signup" && "Sign Up !!"}
            {currentView === "otp" && "Verify Email"}
          </h2>
        </div>

        {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200"><p className="text-[12px] text-red-600 font-bold text-center uppercase">{error}</p></div>}
        {message && <div className="p-3 rounded-lg bg-green-50 border border-green-200"><p className="text-[12px] text-green-600 font-bold text-center uppercase">{message}</p></div>}

        {currentView === "login" && (
          <form onSubmit={handleLogin} className="mt-8 space-y-4 text-black">
            <input name="email" type="email" placeholder="EMAIL" required value={formData.email} onChange={handleChange} className="w-full px-4 py-4 rounded-xl border border-zinc-200 focus:border-black outline-none font-semibold bg-zinc-50" />
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} placeholder="PASSWORD" required value={formData.password} onChange={handleChange} className="w-full px-4 py-4 rounded-xl border border-zinc-200 focus:border-black outline-none font-semibold bg-zinc-50" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
            <button type="submit" className="w-full bg-black text-white py-4 font-black rounded-xl uppercase tracking-widest mt-4">Enter the Void</button>
            <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest mt-4">New here? <button type="button" onClick={() => setCurrentView("signup")} className="text-black underline">Sign Up</button></p>
          </form>
        )}

        {currentView === "signup" && (
          <form onSubmit={handleSignup} className="mt-8 space-y-4 text-black">
            <input name="username" type="text" placeholder="USERNAME" required value={formData.username} onChange={handleChange} className="w-full px-4 py-4 rounded-xl border border-zinc-200 focus:border-black outline-none font-semibold bg-zinc-50" />
            <input name="email" type="email" placeholder="EMAIL" required value={formData.email} onChange={handleChange} className="w-full px-4 py-4 rounded-xl border border-zinc-200 focus:border-black outline-none font-semibold bg-zinc-50" />
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} placeholder="PASSWORD" required value={formData.password} onChange={handleChange} className="w-full px-4 py-4 rounded-xl border border-zinc-200 focus:border-black outline-none font-semibold bg-zinc-50" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
            <button type="submit" className="w-full bg-black text-white py-4 font-black rounded-xl uppercase tracking-widest mt-4">Begin Journey</button>
            <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest mt-4">Already a member? <button type="button" onClick={() => setCurrentView("login")} className="text-black underline">Log In</button></p>
          </form>
        )}

        {currentView === "otp" && (
          <form onSubmit={handleVerifyOtp} className="mt-8 space-y-4 text-black">
            <input name="otp" type="text" maxLength="6" placeholder="ENTER 6-DIGIT CODE" required value={formData.otp} onChange={handleChange} className="w-full px-4 py-4 rounded-xl border border-zinc-200 focus:border-black text-center text-2xl tracking-[0.5em] outline-none font-black bg-zinc-50" />
            <button type="submit" className="w-full bg-black text-white py-4 font-black rounded-xl uppercase tracking-widest mt-4">Verify</button>
            <button type="button" onClick={handleResendOtp} disabled={timer > 0} className={`w-full py-4 font-black rounded-xl uppercase tracking-widest mt-2 ${timer > 0 ? "bg-zinc-100 text-zinc-400" : "bg-white text-black border-2 border-black hover:bg-zinc-100"}`}>
              {timer > 0 ? `Resend available in ${timer}s` : "Resend OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default AuthContainer;