import { ResetPasswordForm } from "../components/password/ResetPasswordForm";
import { Key } from "lucide-react";

export const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-yellow-400 p-6 text-center">
          <div className="flex justify-center mb-4">
            <Key className="h-10 w-10 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-black">
            Reset Your Password
          </h2>
          <p className="mt-2 text-gray-800">
            Enter your new password below
          </p>
        </div>
        
        <div className="p-6">
          <ResetPasswordForm />
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a href="/contact" className="font-medium text-yellow-600 hover:text-yellow-500">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};