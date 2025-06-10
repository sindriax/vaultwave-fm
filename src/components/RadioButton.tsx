"use client";

import { motion } from "framer-motion";

interface RadioButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant?: "power" | "function" | "emergency";
}

export default function RadioButton({
  label,
  isActive,
  onClick,
  variant = "function",
}: RadioButtonProps) {
  const variants = {
    power: {
      bg: isActive ? "bg-vault-green" : "bg-vault-dark",
      border: "border-vault-green",
      text: isActive ? "text-vault-dark" : "text-vault-green",
      glow: isActive ? "shadow-green-glow" : "shadow-none",
    },
    function: {
      bg: isActive ? "bg-primary" : "bg-vault-dark",
      border: "border-primary",
      text: isActive ? "text-vault-dark" : "text-primary",
      glow: isActive ? "shadow-amber-glow" : "shadow-none",
    },
    emergency: {
      bg: isActive ? "bg-tertiary" : "bg-vault-dark",
      border: "border-tertiary",
      text: isActive ? "text-white" : "text-tertiary",
      glow: isActive ? "shadow-red-glow" : "shadow-none",
    },
  };

  const style = variants[variant];

  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg border-2 font-fallout text-xs font-bold
        transition-all duration-200 transform glow-text
        ${style.bg} ${style.border} ${style.text} ${style.glow}
        hover:scale-105 active:scale-95
        shadow-lg retro-button
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isActive
          ? {
              boxShadow: [
                "0 0 0.5rem rgba(0,0,0,0.5)",
                `0 0 1rem ${
                  variant === "power"
                    ? "rgba(0,255,0,0.5)"
                    : variant === "emergency"
                    ? "rgba(199,45,4,0.5)"
                    : "rgba(255,213,44,0.5)"
                }`,
                "0 0 0.5rem rgba(0,0,0,0.5)",
              ],
            }
          : {}
      }
      transition={{ duration: 2, repeat: Infinity }}
    >
      {label}
    </motion.button>
  );
}
