import type { ButtonHTMLAttributes } from "react";

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
  ...rest
}: Props) {
  return (
    <button
      className={`inline-block px-4 py-2 font-medium text-center rounded-md text-md ${
        variant === "primary"
          ? "text-white bg-blue-800 hover:bg-blue-900"
          : "hover:bg-blue-100 text-blue-800 bg-gray-50"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
