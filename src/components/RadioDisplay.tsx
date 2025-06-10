"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { RadioStation } from "../data/stations";

interface RadioDisplayProps {
  isOn: boolean;
  station: RadioStation;
  staticLevel: number;
}

export default function RadioDisplay({
  isOn,
  station,
  staticLevel,
}: RadioDisplayProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!isOn) return;

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [isOn]);

  useEffect(() => {
    if (!isOn) {
      setDisplayText("");
      return;
    }

    const text = station.name;
    let index = 0;
    setDisplayText("");

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [isOn, station.name]);

  const generateStatic = () => {
    const chars = "▓▒░█▌▐│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌";
    return Array.from(
      { length: 15 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const staticOpacity = Math.min(staticLevel / 100, 0.6);

  return (
    <div className="relative bg-vault-dark/20 font-fallout h-full overflow-hidden">
      {/* CRT Screen Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary/5 to-primary/20 pointer-events-none" />

      {/* Scanlines */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30 animate-crt-flicker pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 176, 0, 0.03) 2px, rgba(255, 176, 0, 0.03) 4px)",
        }}
      />

      {/* Static Interference */}
      <AnimatePresence>
        {isOn && staticLevel > 25 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: staticOpacity }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 text-primary/60 font-fallout text-xs overflow-hidden z-10"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ x: [0, -200, 0] }}
                transition={{
                  duration: 0.3 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
                className="whitespace-nowrap opacity-40"
              >
                {generateStatic()}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 p-8 h-full flex flex-col justify-between space-y-4">
        <div className="text-center space-y-4">
          <AnimatePresence mode="wait">
            {isOn ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <div className="text-primary font-fallout text-2xl font-bold glow-text tracking-wider">
                  {displayText}
                  {displayText.length < station.name.length && (
                    <motion.span
                      className="text-vault-green"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      █
                    </motion.span>
                  )}
                </div>

                <div className="text-vault-green font-fallout text-5xl font-bold glow-text">
                  {station.frequency}
                </div>

                <div className="text-secondary font-fallout text-lg tracking-wide">
                  {station.genre}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="text-gray-600 font-fallout text-3xl font-bold">
                  VAULTWAVE FM
                </div>
                <div className="text-gray-500 font-fallout text-lg">
                  SYSTEM OFFLINE
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-vault-dark/30 border border-primary/20 rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-fallout text-primary/60">
              SIGNAL STRENGTH
            </span>
            <span
              className={`text-sm font-fallout glow-text ${
                isOn
                  ? staticLevel > 50
                    ? "text-tertiary"
                    : "text-vault-green"
                  : "text-gray-600"
              }`}
            >
              {isOn
                ? staticLevel > 50
                  ? "INTERFERENCE"
                  : "LOCKED"
                : "OFFLINE"}
            </span>
          </div>

          <div className="flex space-x-2 mb-4">
            {Array.from({ length: 10 }).map((_, i) => {
              const isActive = isOn && i < 10 - staticLevel / 10;
              const barColor =
                i < 3
                  ? "bg-tertiary"
                  : i < 7
                  ? "bg-secondary"
                  : "bg-vault-green";
              return (
                <motion.div
                  key={i}
                  className={`w-3 ${
                    isActive ? `${barColor} shadow-glow` : "bg-gray-700"
                  }`}
                  style={{ height: `${16 + i * 4}px` }}
                  animate={
                    isActive ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.3 }
                  }
                  transition={{ duration: 1 + i * 0.1, repeat: Infinity }}
                />
              );
            })}
          </div>

          <div className="text-center">
            <span
              className={`text-lg font-fallout glow-text ${
                isOn ? "text-primary/80" : "text-gray-600"
              }`}
            >
              {isOn ? `${Math.max(0, 100 - staticLevel)}%` : "0%"}
            </span>
          </div>
        </div>

        <div className="bg-vault-dark/50 border border-primary/30 rounded p-4">
          <div className="flex justify-between items-center mb-3">
            <div
              className={`text-sm font-fallout glow-text ${
                isOn ? "text-primary/70" : "text-gray-600"
              }`}
            >
              {isOn
                ? staticLevel > 50
                  ? "ADJUSTING FREQUENCY..."
                  : "RECEIVING TRANSMISSION"
                : "AWAITING SIGNAL"}
            </div>

            <div
              className={`text-xs font-fallout glow-text ${
                isOn ? "text-primary/60" : "text-gray-600"
              }`}
            >
              {isOn
                ? currentTime.toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "--:--"}
            </div>
          </div>

          {isOn && (
            <div className="flex space-x-6 text-sm font-fallout">
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-3 h-3 bg-vault-green rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-vault-green glow-text">ONLINE</span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-3 h-3 bg-primary rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-primary glow-text">BROADCASTING</span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  className={`w-3 h-3 rounded-full ${
                    staticLevel > 50 ? "bg-tertiary" : "bg-vault-green"
                  }`}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span
                  className={`glow-text ${
                    staticLevel > 50 ? "text-tertiary" : "text-vault-green"
                  }`}
                >
                  {staticLevel > 50 ? "STATIC" : "CLEAR"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
