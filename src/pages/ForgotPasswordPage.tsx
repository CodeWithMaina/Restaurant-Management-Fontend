import { ForgotPasswordForm } from "../components/password/ForgotPasswordForm";
import { Lock } from "lucide-react";

export const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-yellow-400 p-6 text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-10 w-10 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-black">
            Forgot your password?
          </h2>
          <p className="mt-2 text-gray-800">
            Enter your email and we'll send you a reset link
          </p>
        </div>
        
        <div className="p-6">
          <ForgotPasswordForm />
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <a href="/login" className="font-medium text-yellow-600 hover:text-yellow-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};