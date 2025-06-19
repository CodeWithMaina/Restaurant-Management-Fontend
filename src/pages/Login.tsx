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
    
    // Transform data to match your required structure
    const loginData = {
      email: data.email,
      password: data.password
    };

    try {
      const res = await loginUser(loginData);
      // console.log(res)
      dispatch(setCredantials(res));
      navigate('/dashboard')
    } catch (error) {
      console.log("Failed to Login",error)
    }
    
    console.log('Login submitted:', loginData);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-gray-900 to-black text-white p-10">
          <h2 className="text-4xl font-bold mb-4">Design with us</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lobortis maximus nunc, ac rhoncus odio congue quis. Sed ac semper
            orci, eu porttitor lacus.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">
          <div className="text-sm text-right">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-4 text-neutral">
            Welcome Back 👋
          </h2>

          <div className="space-y-3 mb-6 text-black">
            <button className="btn btn-outline w-full gap-3">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="Google"
              />
              Sign in with Google
            </button>
            <button className="btn btn-outline w-full gap-3">
              <img
                src="https://www.svgrepo.com/show/475689/twitter-color.svg"
                className="w-5 h-5"
                alt="Twitter"
              />
              Sign in with Twitter
            </button>
          </div>

          <div className="divider text-sm text-neutral">OR</div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base-content font-medium">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="chegep734@gmail.com"
                  {...register("email")}
                  className="input input-bordered w-full pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base-content font-medium">
                  Password
                </span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register("password")}
                  className="input input-bordered w-full pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <label className="cursor-pointer label gap-2">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-text text-sm">Remember me</span>
              </label>
              <Link to="/forgot-password" className="label-text-alt text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full text-white tracking-wide"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-center text-sm mt-6 text-neutral">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}