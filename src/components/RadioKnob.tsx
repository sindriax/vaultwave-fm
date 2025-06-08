"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface RadioKnobProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: number;
  color?: "amber" | "green" | "red";
  onDirectionChange?: (direction: "up" | "down") => void;
  showValue?: boolean;
}

export default function RadioKnob({
  value,
  onChange,
  min = 0,
  max = 100,
  size = 60,
  color = "amber",
  onDirectionChange,
  showValue = true,
}: RadioKnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [lastY, setLastY] = useState(0);
  const knobRef = useRef<HTMLDivElement>(null);

  const colorClasses = {
    amber: {
      bg: "bg-gradient-to-b from-primary to-secondary",
      border: "border-primary",
      shadow: "shadow-amber-glow",
      indicator: "bg-primary",
      glow: "shadow-amber-glow",
    },
    green: {
      bg: "bg-gradient-to-b from-vault-green to-terminal-green",
      border: "border-vault-green",
      shadow: "shadow-green-glow",
      indicator: "bg-vault-green",
      glow: "shadow-green-glow",
    },
    red: {
      bg: "bg-gradient-to-b from-tertiary to-vault-red",
      border: "border-tertiary",
      shadow: "shadow-red-glow",
      indicator: "bg-tertiary",
      glow: "shadow-red-glow",
    },
  };

  const colors = colorClasses[color];

  const rotation = ((value - min) / (max - min)) * 270 - 135;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastY(e.clientY);
    e.preventDefault();
  };

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = lastY - e.clientY;
      const sensitivity = 2;
      const deltaValue = deltaY * sensitivity;

      const newValue = Math.max(min, Math.min(max, value + deltaValue));
      onChange(newValue);

      if (onDirectionChange && Math.abs(deltaY) > 5) {
        onDirectionChange(deltaY > 0 ? "up" : "down");
      }

      setLastY(e.clientY);
    },
    [isDragging, lastY, min, max, value, onChange, onDirectionChange]
  );

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative">
      <motion.div
        ref={knobRef}
        className={`
          relative cursor-pointer select-none
          bg-gradient-to-b from-vault-rust to-vault-dark
          ${colors.border} ${colors.glow}
          border-2 rounded-full shadow-lg
          transition-shadow duration-200
          ${isDragging ? "shadow-xl" : `hover:${colors.glow}`}
        `}
        style={{ width: size, height: size }}
        onMouseDown={handleMouseDown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-1 bg-gradient-to-b from-vault-dark to-black rounded-full border border-primary/30">
          {/* Grip Lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-0.5 h-3 ${colors.indicator}/60`}
              style={{
                left: "50%",
                top: "10%",
                transformOrigin: "50% 200%",
                transform: `translateX(-50%) rotate(${i * 45}deg)`,
              }}
            />
          ))}

          <div className="absolute inset-3 bg-gradient-to-b from-vault-dark to-black rounded-full border border-primary/50">
            {/* Position Indicator */}
            <motion.div
              className={`absolute w-1 h-4 ${colors.indicator} rounded-full glow-text`}
              style={{
                left: "50%",
                top: "10%",
                transformOrigin: "50% 250%",
              }}
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {showValue && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div
              className={`text-xs font-fallout px-2 py-1 rounded bg-vault-dark ${colors.border} border ${colors.indicator} glow-text`}
            >
              {Math.round(value)}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
