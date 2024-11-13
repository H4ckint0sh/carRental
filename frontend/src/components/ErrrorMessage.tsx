import React from "react";

interface ErrorMessageProps {
  message: string;
  severity: "error" | "warning" | "info" | "success";
  id?: string;
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
  id,
}) => {
  return (
    <div className={`flex items-center mb-4 ${severityStyles[severity]}`}>
      <p id={id} className="text-sm">
        {message}
      </p>
    </div>
  );
};
