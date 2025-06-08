"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Station {
  id: number;
  name: string;
  frequency: string;
  genre: string;
}

interface RadioDisplayProps {
  isOn: boolean;
  station: Station;
  staticLevel: number;
}

export default function RadioDisplay({
  isOn,
  station,
  staticLevel,
}: RadioDisplayProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
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
    }, 100);

    return () => clearInterval(typeInterval);
  }, [isOn, station.name]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const generateStatic = () => {
    const chars = "▓▒░█▌▐│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌";
    return Array.from(
      { length: 20 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const staticOpacity = staticLevel / 100;

  return (
    <div className="relative bg-vault-dark border-2 border-primary p-8 rounded-lg shadow-crt font-fallout h-full">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary/5 to-primary/20 rounded-lg pointer-events-none" />

      <AnimatePresence>
        {isOn && staticLevel > 20 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: staticOpacity }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 text-primary font-fallout text-xs overflow-hidden rounded-lg"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ x: [0, -100, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="whitespace-nowrap"
              >
                {generateStatic()}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 space-y-6 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              className={`w-3 h-3 rounded-full ${
                isOn ? "bg-vault-green shadow-green-glow" : "bg-gray-600"
              }`}
              animate={isOn ? { opacity: [1, 0.5, 1] } : { opacity: 0.3 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className={`text-xs font-fallout glow-text ${
                isOn ? "text-vault-green" : "text-gray-600"
              }`}
            >
              PWR
            </span>
          </div>

          {/* Current Time */}
          <div
            className={`text-xs font-fallout glow-text ${
              isOn ? "text-primary" : "text-gray-600"
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

        <div className="h-20 flex items-center justify-center bg-vault-dark/50 border border-primary/30 rounded p-4">
          <AnimatePresence mode="wait">
            {isOn ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <div className="text-primary font-fallout text-2xl font-bold glow-text">
                  {displayText}
                  {showCursor && displayText.length < station.name.length && (
                    <span className="text-secondary animate-pulse">█</span>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 font-fallout text-2xl text-center"
              >
                SYSTEM OFFLINE
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-vault-dark/30 border border-primary/20 rounded p-4">
            <div className="text-sm font-fallout text-primary/60 mb-2">
              FREQUENCY
            </div>
            <div
              className={`text-lg font-fallout font-bold glow-text ${
                isOn ? "text-primary" : "text-gray-600"
              }`}
            >
              {isOn ? station.frequency : "---.-"} FM
            </div>
          </div>
          <div className="bg-vault-dark/30 border border-primary/20 rounded p-4">
            <div className="text-sm font-fallout text-primary/60 mb-2">
              GENRE
            </div>
            <div
              className={`text-lg font-fallout glow-text ${
                isOn ? "text-vault-green" : "text-gray-600"
              }`}
            >
              {isOn ? station.genre : "N/A"}
            </div>
          </div>
        </div>

        <div className="bg-vault-dark/30 border border-primary/20 rounded p-4 flex-1">
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
          <div className="flex justify-between items-center">
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
              className={`text-sm font-fallout glow-text ${
                isOn ? "text-primary/60" : "text-gray-600"
              }`}
            >
              {isOn
                ? `VAULT TIME: ${currentTime.toLocaleDateString("en-US")}`
                : "DATE: UNKNOWN"}
            </div>
          </div>

          {isOn && (
            <div className="flex space-x-6 mt-4 text-sm font-fallout">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
