import React, { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: JSX.Element;
  placeholder?: string;
  isRequired?: boolean;
  inputOptions?: Object;
  register: UseFormRegister<FieldValues> | any;
  type: string;
  name: string;
}

export default function CustomInput({
  label,
  isRequired = false,
  icon,
  type,
  name,
  inputOptions,
  placeholder,
  register,
  ...rest
}: IInputProps) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
        <input
          {...register(name, {
            required: {
              value: isRequired,
              message: 'This field is required',
            },
            ...inputOptions,
          })}
          name={name}
          type={type}
          id={label}
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-darkBlue focus:ring-darkBlue sm:text-sm"
          placeholder={placeholder}
          {...rest}
        />
      </div>
    </div>
  );
}
