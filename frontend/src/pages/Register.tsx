import { useState } from "react";
import { ZodError } from "zod";
import { registerSchema } from "../validation/schemas/authSchema";
import { AuthService } from "../services/authService";
import { useNavigate } from "react-router-dom";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setErrors({});

    try {
      registerSchema.parse(form);

      setLoading(true);
      await AuthService.register(form);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: FormErrors = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof FormErrors;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
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
            Create your account
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Name
            </label>
            <input
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-slate-900 text-white border ${
                errors.name ? "border-red-500" : "border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 transition`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-slate-900 text-white border ${
                errors.email ? "border-red-500" : "border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 transition`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-slate-900 text-white border ${
                errors.password ? "border-red-500" : "border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 transition`}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-linear-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
