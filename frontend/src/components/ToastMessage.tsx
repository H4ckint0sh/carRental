import React, { useState, useEffect } from "react";

interface ToastProps {
  severity: "success" | "error" | "warning" | "info";
  message: string;
}

const Toast: React.FC<ToastProps> = ({ severity, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    console.log("here", visible);
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
            className="size-6"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );

      case "error":
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
            d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.293 13.707a1 1 0 001.414-1.414L11 12.586l1.293-1.293a1 1 0 10-1.414-1.414L10 11.172l-1.293-1.293a1 1 0 10-1.414 1.414L8.586 12l-1.293 1.293a1 1 0 001.414 1.414L10 13.414l1.293 1.293z"
          />
        </svg>;
    }
  };

  return (
    <div className="fixed bottom-0 right-12 top-12 z-50 m-4">
      {visible && (
        <div
          role="alert"
          className="rounded-xl border border-gray-100 bg-white p-4"
        >
          <div className="flex items-start gap-4">
            <span className="text-green-600">{getIcon()}</span>

            <div className="flex-1">
              <strong className="block font-medium capitalize text-gray-900">
                {severity}
              </strong>

              <p className="mt-1 text-sm text-gray-700">{message}</p>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="text-gray-500 transition hover:text-gray-600"
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
