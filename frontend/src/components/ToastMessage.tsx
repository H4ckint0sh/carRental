import React, { useState, useEffect } from "react";

interface ToastProps {
  severity: "success" | "error" | "warning" | "info";
  message: string;
}

const Toast: React.FC<ToastProps> = ({ severity, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 6000); // Hide toast after 3 seconds
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [visible]);

  const getIcon = () => {
    switch (severity) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-teal-700"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );

      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const getColor = () => {
    switch (severity) {
      case "success":
        return "text-teal-700";
      case "error":
        return " text-red-700";
    }
  };

  return (
    <div className="fixed right-12 top-12 z-50 m-4">
      {visible && (
        <div
          role="alert"
          className={`rounded-xl border animate-bounce border-gray-100 shadow-lg bg-white p-4 ${getColor()}`}
        >
          <div className="flex items-start gap-4">
            <span>{getIcon()}</span>

            <div className="flex-1">
              <strong className="block font-medium capitalize">
                {severity}
              </strong>

              <p className="mt-1 text-sm">{message}</p>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="text-black transition hover:text-gray-600"
            >
              <span className="sr-only">Dismiss popup</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toast;
