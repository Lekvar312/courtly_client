import React, { ReactNode } from "react";

type Input = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
  icon?: ReactNode;
  label: string;
  value?: string;
  error?: string;
  [key: string]: any;
};

const InputForm: React.FC<Input> = ({ onChange, type = "text", placeholder, label, value, icon, error, ...rest }) => {
  return (
    <span className="flex flex-col w-full">
      <label htmlFor="email-input" className="text-lg flex items-center gap-2">
        <i>{icon}</i>
        <p>{label}</p>
      </label>
      <input
        className={`border ${
          error ? "border-red-500" : "border-slate-400 focus:ring-1 focus:ring-sky-500"
        } rounded p-1.5 text-base  focus:outline-none transition-all ${
          type === "file" && "h-20 border-dotted bg-gray-50 cursor-pointer hover:bg-gray-100"
        }`}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <span className="text-red-500">{error}</span>}
    </span>
  );
};

export default InputForm;
