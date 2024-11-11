import React, { useState, useEffect } from "react";

interface ToastProps {
  severity: "success" | "error" | "warning" | "info";
  message: string;
}

const Toast: React.FC<ToastProps> = ({ severity, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000); // Hide toast after 3 seconds
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  const getToastStyles = () => {
    switch (severity) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <>
      {visible && (
        <div
          className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg ${getToastStyles()} transition-all duration-300`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="flex items-center">
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
