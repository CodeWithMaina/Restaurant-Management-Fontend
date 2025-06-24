import { Eraser } from "lucide-react";

type ErrorMessageProps = {
  message: string;
  variant?: "default" | "danger" | "warning" | "info";
  className?: string;
  onRetry?: () => void;
};

export const ErrorMessage = ({
  message,
  variant = "default",
  className = "",
  onRetry,
}: ErrorMessageProps) => {
  // Variant styles
  const variantStyles = {
    default: "bg-red-50 text-red-800 border-red-200",
    danger: "bg-red-100 text-red-800 border-red-300",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };

  // Button styles
  const buttonStyles = {
    default: "bg-red-100 hover:bg-red-200 text-red-800",
    danger: "bg-red-200 hover:bg-red-300 text-red-900",
    warning: "bg-yellow-100 hover:bg-yellow-200 text-yellow-900",
    info: "bg-blue-100 hover:bg-blue-200 text-blue-900",
  };

  return (
    <div
      className={`rounded-lg border p-4 ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <Eraser className="mr-3 mt-0.5 flex-shrink-0 text-lg" />
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className={`mt-2 rounded px-3 py-1 text-sm font-medium transition-colors ${buttonStyles[variant]}`}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
