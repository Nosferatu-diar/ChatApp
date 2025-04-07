import { Eye, EyeOff, Lock, Mail, MessageSquare, Loader2 } from "lucide-react";
import AuthImagePattern from "../../components/auth-image-pattern";
import { useState } from "react";
import type { FormDataType } from "../../@types";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { signin, isLoginLoading } = useAuthStore();
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formData", formData);

    await signin(formData);
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
          <div className="form-control">
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
          <div className="form-control mt-4">
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
            disabled={isLoginLoading}
            className="btn btn-primary w-full mt-8"
          >
            {isLoginLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>
        <div className="text-center mt-5">
          <p className="text-base-content/60">
            Don't have an account?{" "}
            <Link to="/sign-up" className="link link-primary">
              Create account
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

export default SignIn;
