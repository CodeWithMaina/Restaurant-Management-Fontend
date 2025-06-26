import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-yellow-400 rounded-lg shadow-lg overflow-hidden border border-yellow-500">
        <div className="p-6 text-center">
          <AlertTriangle className="mx-auto h-16 w-16 text-black mb-4" />
          <h1 className="text-3xl font-bold text-black mb-2">Oops! Something went wrong</h1>
          <p className="text-gray-800 mb-6">
            We couldn't find the page you're looking for. Please check the URL or navigate back to safety.
          </p>
          <Link
            to="/"
            className="btn bg-black text-yellow-400 hover:bg-gray-900 font-medium"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};