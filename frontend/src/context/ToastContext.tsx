import { createContext, useContext, useState } from "react";

interface ToastContextType {
  showToast: (
    severity: "success" | "error" | "warning" | "info",
    message: string,
  ) => void;
  toast: {
    severity: "success" | "error" | "warning" | "info";
    message: string;
  } | null;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  toast: null,
});

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastContextType["toast"] | null>(null);

  const showToast = (
    severity: "success" | "error" | "warning" | "info",
    message: string,
  ) => {
    setToast({ severity, message });
    setTimeout(() => {
      setToast(null);
    }, 6000); // Adjust timeout as needed
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
};
