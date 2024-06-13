import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  className = 'w-full md:w-1/2 px-2 mb-4 md:mb-0',
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-blue-500 peer  ${value ? 'border-green-500' : 'border-red-500'}`}
        required={required}
        id={name}
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={`absolute font-medium left-3 text-gray-500 transition-all duration-300 transform bg-white px-1 -translate-y-1/2
                    peer-placeholder-shown:opacity-0 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:opacity-100 peer-focus:text-xs
                    ${value ? 'opacity-100 top-0 text-xs' : 'opacity-0 top-1/2 text-sm'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
