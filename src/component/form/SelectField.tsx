import React from "react";

interface SelectFieldProps<T> {
  label: string;
  name: string;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ [key: string]: any }>;
  valueKey: string;
  labelKey: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const SelectField = <T extends string | number>({
  label,
  name,
  value,
  onChange,
  options,
  valueKey,
  labelKey,
  required = false,
  disabled = false,
  className = "w-full md:w-1/2 px-2 mb-4 md:mb-0",
}: SelectFieldProps<T>) => {
  return (
    <div className={`relative ${className}`}>
      <select
        name={name}
        value={value as string | number} 
        onChange={onChange}
        className={`block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-blue-500 peer ${
          value ? "border-green-500" : "border-red-500"
        } ${disabled ? "bg-gray-200" : ""}`}
        required={required}
        id={name}
        disabled={disabled}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className={`absolute font-medium left-3 text-gray-500 transition-all duration-300 transform px-1 -translate-y-1/2
                    peer-placeholder-shown:opacity-0 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:opacity-100 peer-focus:text-xs
                    ${value ? "opacity-100 top-0 text-xs" : "opacity-0 top-1/2 text-sm"} ${disabled ? "bg-gray-200" : "bg-white "}`}
      >
        {label}
      </label>
    </div>
  );
};

export default SelectField;
