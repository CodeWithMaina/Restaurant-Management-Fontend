import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Mail, User, Phone, UserCheck, Facebook, Twitter, Github } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { authApi } from '../features/api/authApi';
import { toast } from 'sonner';

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contactPhone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^\d+$/, 'Phone number must contain only digits'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  userType: z.enum(['admin', 'user'], { required_error: 'User type is required' }),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms')
}).refine((data) => data.password === data.confirmPassword, {
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

  const [registerUser] = authApi.useRegisterUserMutation({})

  const onSubmit = async (data: SignUpFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const transformedData = {
      name: data.name,
      contactPhone: data.contactPhone,
      email: data.email,
      password: data.password,
      userType: data.userType
    };

    const loadingToast = toast.loading('Creating your account...');
    
    try {
      const res = await registerUser(transformedData).unwrap();
      console.log(res);
      
      toast.dismiss(loadingToast);
      toast.success('Account created successfully!', {
        description: 'You can now log in with your credentials.',
        duration: 5000,
      });
      
      navigate('/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Failed to register", error);
      
      toast.dismiss(loadingToast);
      
      if (error?.data?.error === "User with this email already exists") {
        toast.error('Registration failed', {
          description: 'A user with this email already exists.',
          duration: 5000,
        });
      } else {
        toast.error('Registration failed', {
          description: error?.data?.error || 'An unexpected error occurred. Please try again.',
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-black text-yellow-400 p-10">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-300 text-sm">
            Start your journey with us. Create your account and unlock new opportunities with our platform.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10 bg-white">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Create an Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Peter"
                  className="input w-full pl-10 border-gray-300 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            {/* Phone Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Contact Phone</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register('contactPhone')}
                  type="tel"
                  placeholder="1234567890"
                  className="input w-full pl-10 border-gray-300 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>}
            </div>
            
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="chegep734@gmail.com"
                  className="input w-full pl-10 border-gray-300 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input w-full pl-10 pr-10 border-gray-300 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input w-full pl-10 pr-10 border-gray-300 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            
            {/* User Type Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">User Type</span>
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select
                  {...register('userType')}
                  className="select w-full pl-10 border-gray-300 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  defaultValue=""
                >
                  <option value="" disabled>Select user type</option>
                  <option value="admin">Admin</option>
                  <option value="restaurant_owner">Restaurant Owner</option>
                  <option value="driver">Driver</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType.message}</p>}
            </div>
            
            {/* Terms Checkbox */}
            <div className="form-control">
              <label className="cursor-pointer label gap-2 items-start">
                <input
                  {...register('agreeToTerms')}
                  type="checkbox"
                  className="checkbox border-gray-300 checked:border-yellow-400 [--chkbg:theme(colors.yellow.400)] [--chkfg:black]"
                />
                <span className="label-text text-sm text-gray-600">
                  I agree to the <a href="#" className="text-yellow-400 hover:underline font-medium">Terms and Conditions</a>
                </span>
              </label>
              {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>}
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn w-full bg-black text-yellow-400 hover:bg-gray-900 font-medium"
            >
              {isSubmitting ? 'Processing...' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-sm text-gray-500 before:bg-gray-300 after:bg-gray-300">or sign up with</div>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button type="button" className="btn bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 hover:border-gray-400">
              <Facebook className="h-5 w-5 text-blue-600" />
            </button>
            <button type="button" className="btn bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 hover:border-gray-400">
              <Twitter className="h-5 w-5 text-blue-400" />
            </button>
            <button type="button" className="btn bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 hover:border-gray-400">
              <Github className="h-5 w-5 text-gray-800" />
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to='/login' className="text-yellow-400 hover:underline font-medium">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;