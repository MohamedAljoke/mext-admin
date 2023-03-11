import React, { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmit?: boolean;
  color?: string;
  hoverColor?: string;
}

export default function CustomButton({
  children,
  isSubmit,
  color,
  hoverColor,
  ...rest
}: IButtonProps) {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className={` ${
        color ? `${color} ${hoverColor}` : 'bg-darkBlue hover:bg-blue'
      } text-white py-2 px-4 rounded-full `}
      {...rest}
    >
      {children}
    </button>
  );
}
