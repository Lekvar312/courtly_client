import React from 'react';

type SelectProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]
};

const Select = ({ label, value, onChange, options}: SelectProps) => {
  return (
    <span className="flex flex-col">
      <label htmlFor="select" className="font-medium">{label}</label>
      <select
        id="select"
        className="border border-slate-400 rounded p-1.5 text-base focus:ring-1 focus:ring-purple-800 focus:outline-none transition-all"
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Select;
