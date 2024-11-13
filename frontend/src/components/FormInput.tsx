import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "./ErrrorMessage";
import clsx from "clsx";

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  className?: string;
  disabled?: boolean;
  min?: string | number;
  onBlur?: () => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  error,
  register,
  className = "",
  disabled = false,
  min,
}) => (
  <>
    <div
      className={clsx(
        "flex text-sm flex-col",
        error ? "mb-2" : label === "Price" ? "mb-0" : "mb-6",
      )}
    >
      <label
        htmlFor={id}
        className={clsx(
          "text-sm font-medium text-gray-900 cursor-pointer",
          label === "Price" ? "mb-0" : "mb-2",
        )}
      >
        {label} {label !== "Price" && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        aria-required="true"
        aria-describedby={error ? `${id}Error` : undefined}
        type={type}
        className={`bg-gray-100 text-gray-900 border rounded-lg p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-400 border-1"} ${className}`}
        {...register}
        disabled={disabled}
        min={min}
      />
    </div>
    {error && (
      <ErrorMessage
        id={`${id}Error`}
        message={error.message!}
        severity="error"
      />
    )}
  </>
);

export default Input;
