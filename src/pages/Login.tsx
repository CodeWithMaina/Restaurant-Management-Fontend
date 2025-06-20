import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { userApi } from "../features/api/userApi";
import { useDispatch } from "react-redux";
import { setCredantials } from "../features/auth/authSlice";
import { useNavigate } from "react-router";
import { toast, Toaster } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loginUser] = userApi.useLoginUserMutation({});
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    
    const loginData = {
      email: data.email,
      password: data.password
    };

    try {
      const res = await loginUser(loginData).unwrap();
      dispatch(setCredantials(res));
      navigate('/dashboard');
      toast.success("Login successful!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Failed to Login", error);
      if (error.status === 401) {
        toast.error(error.data?.error || "Invalid email or password");
      } else {
        toast.error("An error occurred during login. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-black text-yellow-400 p-10">
          <h2 className="text-4xl font-bold mb-4">Design with us</h2>
          <p className="text-gray-300 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lobortis maximus nunc, ac rhoncus odio congue quis. Sed ac semper
            orci, eu porttitor lacus.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10 bg-white">

          <h2 className="text-3xl font-bold mb-8 mt-4 text-gray-800">
            Welcome Back 👋
          </h2>

          <div className="space-y-3 mb-6">
            <button className="btn w-full gap-3 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 hover:border-gray-400">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="Google"
              />
              Sign in with Google
            </button>
            <button className="btn w-full gap-3 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 hover:border-gray-400">
              <img
                src="https://www.svgrepo.com/show/475689/twitter-color.svg"
                className="w-5 h-5"
                alt="Twitter"
              />
              Sign in with Twitter
            </button>
          </div>

          <div className="divider text-sm text-gray-500 before:bg-gray-300 after:bg-gray-300">OR</div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  placeholder="chegep734@gmail.com"
                  {...register("email")}
                  className="input w-full pl-10 border-gray-300 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">
                  Password
                </span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register("password")}
                  className="input w-full pl-10 pr-10 border-gray-300 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <label className="cursor-pointer label gap-2">
                <input type="checkbox" className="checkbox checkbox-sm border-gray-300 checked:border-yellow-400 [--chkbg:theme(colors.yellow.400)] [--chkfg:black]" />
                <span className="label-text text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="label-text-alt text-yellow-400 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn w-full bg-black text-yellow-400 hover:bg-gray-900 tracking-wide font-medium"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-center text-sm mt-6 text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-yellow-400 hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}