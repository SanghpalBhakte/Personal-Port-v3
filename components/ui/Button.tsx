import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "outline",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-mono transition-colors focus:outline-none cursor-pointer";
  
  const variantStyles = {
    primary: "bg-[var(--accent)] text-white hover:opacity-90 border border-transparent",
    outline: "border border-[#747b74] bg-transparent text-[#d4d7d0] hover:border-[var(--accent)] hover:text-white",
    ghost: "bg-transparent text-[var(--muted)] hover:text-[var(--ink)]",
  };

  const sizeStyles = {
    sm: "text-[10px] px-2 py-1",
    md: "text-[11px] px-3 py-1.5",
    lg: "text-sm px-4 py-2",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${
        disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
};
