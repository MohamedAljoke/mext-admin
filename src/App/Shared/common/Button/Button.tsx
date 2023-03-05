import React, { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmit?: boolean;
}

export default function CustomButton({
  children,
  isSubmit,
  ...rest
}: IButtonProps) {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      {...rest}
      className="bg-darkBlue text-white py-2 px-4 rounded-full hover:bg-blue"
    >
      {children}
    </button>
  );
}
