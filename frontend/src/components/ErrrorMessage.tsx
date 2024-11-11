import React from "react";

interface ErrorMessageProps {
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

const severityStyles = {
  error: "text-red-700",
  warning: " text-yellow-700",
  info: "text-blue-700",
  success: " text-green-700",
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  severity,
}) => {
  return (
    <div className={`flex items-center mb-4 ${severityStyles[severity]}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
};
