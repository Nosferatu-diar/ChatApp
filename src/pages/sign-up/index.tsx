import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  Loader2,
  User,
} from "lucide-react";
import AuthImagePattern from "../../components/auth-image-pattern";
import { useState } from "react";
import type { FormDataType } from "../../@types";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { signup, isRegisterLoading } = useAuthStore();
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    fullName: "",
  });

  const validateForm = () => {
    if (!formData.fullName?.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email format");
    }
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    return true;
  };

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateForm();
    if (validation === true) {
      await signup(formData);
    }
  };

  return (
    <section className="h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center flex-col p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
        </div>
        <form onSubmit={loginSubmit} className="w-[70%] mx-auto">
          {/* Full name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                type="text"
                className="pl-10 py-2 w-full border rounded-md bg-base-200 text-base-content/80 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="John Doe"
              />
            </div>
          </div>
          {/* Email */}
          <div className="form-control mt-5">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                className="pl-10 py-2 w-full border rounded-md bg-base-200 text-base-content/80 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
          </div>
          {/* Password*/}
          <div className="form-control mt-5">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type={showPassword ? "text" : "password"}
                className="pl-10 py-2 w-full border rounded-md bg-base-200 text-base-content/80 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="password.com"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          <button
            disabled={isRegisterLoading}
            className="btn btn-primary w-full mt-8"
          >
            {isRegisterLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Sign up</span>
            )}
          </button>
        </form>
        <div className="text-center mt-5">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/sign-in" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </section>
  );
};

export default SignUp;
