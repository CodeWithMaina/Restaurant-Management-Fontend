import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  UserCheck,
  Facebook,
  Twitter,
  Github,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Changed from "react-router"
import { userApi } from "../features/api/userApi";
import { toast, Toaster } from "sonner";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    contactPhone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    userType: z.enum(["admin", "user", "restaurant_owner", "driver", "customer"], { // Updated enum values
      required_error: "User type is required",
    }),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const [registerUser] = userApi.useRegisterUserMutation();

  const onSubmit = async (data: SignUpFormData) => {
    const loadingToast = toast.loading("Creating your account...");

    try {
      const transformedData = {
        name: data.name,
        contactPhone: data.contactPhone,
        email: data.email,
        password: data.password,
        userType: data.userType,
      };

      await registerUser(transformedData).unwrap();
      
      toast.dismiss(loadingToast);
      toast.success("Account created successfully!", {
        description: "You can now log in with your credentials.",
        duration: 5000,
      });

      navigate("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.dismiss(loadingToast);

      if (error?.data?.error === "User with this email already exists") {
        toast.error("Registration failed", {
          description: "A user with this email already exists.",
          duration: 5000,
        });
      } else if (error?.status === 400) {
        toast.error("Registration failed", {
          description: error?.data?.message || "Invalid registration data.",
          duration: 5000,
        });
      } else {
        toast.error("Registration failed", {
          description: "An unexpected error occurred. Please try again.",
          duration: 5000,
        });
      }
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-indigo-900 to-black text-white p-10">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-sm">
            Start your journey with us. Create your account and unlock new
            opportunities with our platform.
          </p>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6 text-neutral">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-medium">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Peter"
                  className="input input-bordered w-full pl-10"
                />
              </div>
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-medium">
                  Contact Phone
                </span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("contactPhone")}
                  type="tel"
                  placeholder="1234567890"
                  className="input input-bordered w-full pl-10"
                />
              </div>
              {errors.contactPhone && (
                <p className="text-error text-sm mt-1">
                  {errors.contactPhone.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-medium">
                  Email
                </span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="chegep734@gmail.com"
                  className="input input-bordered w-full pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-medium">
                  Password
                </span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-medium">
                  Confirm Password
                </span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content font-medium">
                  User Type
                </span>
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  {...register("userType")}
                  className="select select-bordered w-full pl-10"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select user type
                  </option>
                  <option value="admin">Admin</option>
                  <option value="restaurant_owner">Restaurant Owner</option>
                  <option value="driver">Driver</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              {errors.userType && (
                <p className="text-error text-sm mt-1">
                  {errors.userType.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="cursor-pointer label gap-2 items-start">
                <input
                  {...register("agreeToTerms")}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                <span className="label-text text-sm">
                  I agree to the{" "}
                  <a href="#" className="link link-primary">
                    Terms and Conditions
                  </a>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-error text-sm mt-1">
                  {errors.agreeToTerms.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full text-white"
            >
              {isSubmitting ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <div className="divider text-sm text-neutral">or sign up with</div>

          <div className="grid grid-cols-3 gap-3">
            <button type="button" className="btn btn-outline w-full">
              <Facebook className="h-5 w-5 text-blue-600" />
            </button>
            <button type="button" className="btn btn-outline w-full">
              <Twitter className="h-5 w-5 text-blue-400" />
            </button>
            <button type="button" className="btn btn-outline w-full">
              <Github className="h-5 w-5 text-gray-800" />
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-neutral">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
