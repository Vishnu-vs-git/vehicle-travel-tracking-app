import { useState } from "react";
// import { AuthService } from "../services/auth.service";
// import { registerSchema } from "../validation/auth.schema";
import { ZodError } from "zod";
import { registerSchema } from "../validation/schemas/authSchema";
import { AuthService } from "../services/authService";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setErrors({});

    try {
      registerSchema.parse(form);

      await AuthService.register(form);
      window.location.href = "/upload";
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: FormErrors = {};

        error.issues.forEach((err) => {
          const field = err.path[0] as keyof FormErrors;
          fieldErrors[field] = err.message;
        });

        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {/* Name */}
      <div>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password}</p>
        )}
      </div>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
