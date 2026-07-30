import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://brain-backend-3.onrender.com";

const AuthContainer = ({ initialView = "login" }) => {
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView]);

  // Clean error and message states when switching views
  useEffect(() => {
    setError("");
    setMessage("");
    setShowPassword(false);
    setFormData((prev) => ({
      ...prev,
      confirmPassword: "",
      otp: "",
    }));
  }, [currentView]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const getUsernameFromToken = (token) => {
    if (!token) return null;
    try {
      const jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      return payload.username || payload.sub || payload.email || null;
    } catch (e) {
      console.error("Failed to parse JWT token:", e);
      return null;
    }
  };

  const handleSwitchToSignup = () => {
    navigate("/signup");
  };

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  // --- 1. SIGNUP LOGIC ---
  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.username.trim().length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      if (response.ok) {
        setMessage(
          "Account created! Check your email for the verification code.",
        );
        setCurrentView("otp");
        setTimer(60);
      } else if (response.status === 409) {
        setError("Email or Name is already taken.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(
        "Server connection failed. Please check your internet connection.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. LOGIN LOGIC ---
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      if (response.ok) {
        const token = response.headers.get("Authorization");
        localStorage.setItem("token", token);
        localStorage.setItem("email", formData.email.trim());

        let username = null;
        try {
          const data = await response.json();
          username = data?.username || data?.user?.username;
        } catch (err) {
          // Response body is empty or not JSON
        }

        if (!username) {
          username = getUsernameFromToken(token);
        }

        if (!username) {
          username = formData.email.split("@")[0];
        }

        localStorage.setItem("username", username);
        navigate("/");
      } else if (response.status === 403) {
        setError("Account not verified. Please check your email.");
        setCurrentView("otp");
      } else {
        setError("Invalid credentials. Please verify your email and password.");
      }
    } catch (err) {
      setError(
        "Server connection failed. Please check your internet connection.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. VERIFY OTP LOGIC ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (formData.otp.trim().length !== 6 || !/^\d+$/.test(formData.otp)) {
      setError("Please enter a valid 6-digit numeric verification code.");
      return;
    }

    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/verifyOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          otp: formData.otp.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token || response.headers.get("Authorization");
        localStorage.setItem("token", token);
        localStorage.setItem("email", formData.email.trim());

        let username = data?.username || data?.user?.username;
        if (!username) {
          username = getUsernameFromToken(token);
        }
        if (!username && formData.username) {
          username = formData.username.trim();
        }
        if (!username) {
          username = formData.email.split("@")[0];
        }

        localStorage.setItem("username", username);
        navigate("/");
      } else {
        setError("Invalid or expired verification code.");
      }
    } catch (err) {
      setError(
        "Server connection failed. Please check your internet connection.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- 4. RESEND OTP LOGIC ---
  const handleResendOtp = async () => {
    if (timer > 0 || isLoading) return;
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/resendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email.trim() }),
      });

      if (response.ok) {
        setMessage("A new verification code has been sent to your email.");
        setTimer(60);
      } else {
        setError("Failed to resend code. Please wait before trying again.");
      }
    } catch (err) {
      setError(
        "Server connection failed. Please check your internet connection.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 relative overflow-hidden bg-linear-to-tr from-orange-50/20 via-slate-50 to-indigo-50/20 dark:from-[#090a15] dark:via-[#0e1026] dark:to-[#120a1f]">
      {/* Warm calming blobs inspired by Headspace */}
      <div className="absolute top-1/6 left-1/5 w-80 h-80 bg-orange-300/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/6 right-1/5 w-96 h-96 bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Centered Auth Card */}
        <div className="bg-white/90 dark:bg-[#0c0d21]/80 backdrop-blur-md rounded-4xl p-8 md:p-12 border border-slate-100/50 dark:border-zinc-900/60 shadow-[0_25px_60px_rgba(0,0,0,0.03)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.25)] transition-all duration-300">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
              {currentView === "login" && "Welcome back"}
              {currentView === "signup" && "Create your account"}
              {currentView === "otp" && "Verify email"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 font-medium">
              {currentView === "login" && "Let's take a deep breath and log in"}
              {currentView === "signup" &&
                "Join us in stepping out of the loop"}
              {currentView === "otp" && "Check your inbox for the code"}
            </p>
          </div>

          {/* Feedback alerts styled gently */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-center">
              <p className="text-xs font-semibold">{error}</p>
            </div>
          )}
          {message && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-center">
              <p className="text-xs font-semibold">{message}</p>
            </div>
          )}

          {/* Calming transition forms */}
          <div key={currentView} className="animate-auth-fade-in space-y-6">
            {currentView === "login" && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-650 dark:text-zinc-300 pl-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@email.com"
                    required
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-cyan-400/10 bg-slate-50/30 dark:bg-slate-950/20 text-slate-900 dark:text-white outline-none font-medium placeholder-slate-400 dark:placeholder-slate-600 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-650 dark:text-zinc-300 pl-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-cyan-400/10 bg-slate-50/30 dark:bg-slate-955/20 text-slate-900 dark:text-white outline-none font-medium placeholder-slate-400 dark:placeholder-slate-600 transition-all disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#1b1c3a] dark:bg-white text-white dark:text-slate-955 py-3.5 font-bold rounded-full text-sm cursor-pointer hover:bg-indigo-600 dark:hover:bg-cyan-400 hover:text-white dark:text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <span>Log In</span>
                  )}
                </button>

                <p className="text-center text-sm font-semibold text-slate-500 dark:text-zinc-400 mt-6">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={handleSwitchToSignup}
                    disabled={isLoading}
                    className="text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer font-bold disabled:opacity-50"
                  >
                    Sign Up Now
                  </button>
                </p>
              </form>
            )}

            {currentView === "signup" && (
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-1">
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-slate-650 dark:text-zinc-300 pl-1"
                  >
                    Name
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Your name"
                    required
                    disabled={isLoading}
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-cyan-400/10 bg-slate-50/30 dark:bg-slate-955/20 text-slate-900 dark:text-white outline-none font-medium placeholder-slate-400 dark:placeholder-slate-600 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-655 dark:text-zinc-300 pl-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@email.com"
                    required
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-cyan-400/10 bg-slate-50/30 dark:bg-slate-955/20 text-slate-900 dark:text-white outline-none font-medium placeholder-slate-400 dark:placeholder-slate-650 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-650 dark:text-zinc-300 pl-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-cyan-400/10 bg-slate-50/30 dark:bg-slate-955/20 text-slate-900 dark:text-white outline-none font-medium placeholder-slate-400 dark:placeholder-slate-600 transition-all disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-slate-650 dark:text-zinc-300 pl-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 focus:border-indigo-500 dark:focus:border-cyan-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-cyan-400/10 bg-slate-50/30 dark:bg-slate-955/20 text-slate-900 dark:text-white outline-none font-medium placeholder-slate-400 dark:placeholder-slate-600 transition-all disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#1b1c3a] dark:bg-white text-white dark:text-slate-955 py-3.5 font-bold rounded-full text-sm cursor-pointer hover:bg-indigo-600 dark:hover:bg-cyan-400 hover:text-white dark:text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>

                <p className="text-center text-sm font-semibold text-slate-500 dark:text-zinc-400 mt-6">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={handleSwitchToLogin}
                    disabled={isLoading}
                    className="text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer font-bold disabled:opacity-50"
                  >
                    Log In
                  </button>
                </p>
              </form>
            )}

            {currentView === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="space-y-2 text-center">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-semibold text-slate-655 dark:text-zinc-300"
                  >
                    6-Digit Verification Code
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    maxLength="6"
                    placeholder="000000"
                    required
                    disabled={isLoading}
                    value={formData.otp}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800/80 focus:border-indigo-650 dark:focus:border-cyan-400 focus:ring-4 focus:ring-indigo-650/10 dark:focus:ring-cyan-400/10 bg-slate-50/30 dark:bg-slate-955/20 text-slate-900 dark:text-white outline-none font-bold text-center text-2xl tracking-[0.25em] placeholder-slate-400 dark:placeholder-slate-600 transition-all disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#1b1c3a] dark:bg-white text-white dark:text-slate-950 py-3.5 font-bold rounded-full text-sm cursor-pointer hover:bg-indigo-600 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-slate-955 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Verify Code</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0 || isLoading}
                  className={`w-full py-3.5 font-semibold rounded-full text-sm transition-all duration-300 border ${
                    timer > 0
                      ? "bg-slate-50/50 dark:bg-slate-900/30 text-slate-400 dark:text-zinc-650 border-slate-100 dark:border-zinc-900/50 cursor-not-allowed"
                      : "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80 border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 cursor-pointer active:scale-[0.98] shadow-xs"
                  }`}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
                </button>

                <p className="text-center text-sm font-semibold text-slate-500 dark:text-zinc-400 mt-6">
                  Want to change email?{" "}
                  <button
                    type="button"
                    onClick={handleSwitchToSignup}
                    disabled={isLoading}
                    className="text-indigo-650 dark:text-cyan-400 hover:underline cursor-pointer font-bold disabled:opacity-50"
                  >
                    Edit Registration
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
