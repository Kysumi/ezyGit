import { FC, ButtonHTMLAttributes, PropsWithChildren } from "react";

const Variants = {
  danger:
    "bg-gradient-to-r from-red-400 via-red-500 to-red-600 focus:bg-red-500 active:bg-red-600",
  primary:
    "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-600",
};

const base =
  "inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-sm hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out active:shadow-lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof Variants;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  variant = "primary",
  ...props
}) => {
  const appliedVariant = Variants[variant];
  return (
    <button {...props} className={`${base} ${appliedVariant}`}>
      {props.children}
    </button>
  );
};
