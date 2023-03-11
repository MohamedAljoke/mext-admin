import React, { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmit?: boolean;
  color?: string;
  hoverColor?: string;
  customCss?: string;
}

export default function CustomButton({
  children,
  isSubmit,
  color,
  hoverColor,
  customCss,
  ...rest
}: IButtonProps) {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className={` ${
        color ? `${color} ${hoverColor}` : 'bg-darkBlue hover:bg-blue'
      } text-white py-2 px-4 rounded-full flex items-center ${customCss} `}
      {...rest}
    >
      {children}
    </button>
  );
}
