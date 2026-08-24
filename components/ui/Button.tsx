import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "outline",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const variantClass = variant === "primary" ? "submit-btn" : "form-toggle-btn";

  return (
    <button
      className={`${variantClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
};
