import { useState } from "react";
import { AuthService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await AuthService.login({ email, password });
      console.log("res is", res);
      
      navigate("/dashboard");
    } catch {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-black px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            🚗 Speedo
          </h1>
          <p className="text-slate-300 mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-linear-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-sm text-slate-400 text-center mt-6">
          New to Speedo?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>

        {/* Footer */}
        <p className="text-xs text-slate-500 text-center mt-4">
          © 2026 Speedo. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
