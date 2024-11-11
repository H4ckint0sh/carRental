import React from "react";

interface CustomInputProps {
  label: string;
  name: string;
  value?: number | string;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "number" | "email" | "password" | "date";
}

const useCustomInput = ({
  label,
  name,
  value = "",
  placeholder = "",
  disabled = false,
  type = "text",
}: CustomInputProps) => {
  return (
    <div className="flex flex-col">
      <label
        className="text-sm mb-2 text-gray-900 cursor-pointer"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export const CustomInputField: React.FC<CustomInputProps> = (props) => {
  return <>{useCustomInput(props)}</>;
};
