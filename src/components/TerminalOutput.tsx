"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface TerminalOutputProps {
  isOn: boolean;
  currentNews: string;
}

export default function TerminalOutput({
  isOn,
  currentNews,
}: TerminalOutputProps) {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isOn) {
      setTerminalHistory([]);
      setCurrentLine("");
      return;
    }

    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const newEntry = `[${timestamp}] ${currentNews}`;

    setTerminalHistory((prev) => {
      const updated = [...prev, newEntry];
      return updated.slice(-10);
    });
  }, [currentNews, isOn]);

  useEffect(() => {
    if (isOn && terminalHistory.length === 0) {
      const bootSequence = [
        "VAULT-TEC TERMINAL INITIALIZING...",
        "LOADING KERNEL MODULES...",
        "STARTING SYSTEM SERVICES...",
        "RADIO INTERFACE ONLINE",
        "MONITORING WASTELAND FREQUENCIES...",
      ];

      bootSequence.forEach((line, index) => {
        setTimeout(() => {
          setTerminalHistory((prev) => [...prev, `[BOOT] ${line}`]);
        }, index * 1000);
      });
    }
  }, [isOn, terminalHistory.length]);

  if (!isOn) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: 0 }}
        className="bg-vault-dark border-2 border-gray-700 rounded-lg p-4 h-48 font-fallout text-sm"
      >
        <div className="text-gray-600 text-center mt-16">TERMINAL OFFLINE</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-vault-dark border-2 border-primary rounded-lg p-4 h-48 font-fallout text-sm overflow-hidden relative scanline-effect"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent animate-crt-flicker pointer-events-none" />

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="text-primary mb-2 glow-text">
          VAULT-TEC TERMINAL v2.1.7
        </div>
        <div className="text-primary/80 mb-4">
          ================================
        </div>

        <AnimatePresence>
          {terminalHistory.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-primary/80 mb-1 leading-tight glow-text"
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex items-center text-primary">
          <span className="text-secondary glow-text">$&gt;</span>
          <span className="ml-2">{currentLine}</span>
          {cursorVisible && (
            <span className="bg-primary text-vault-dark">█</span>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-primary/20 text-primary/80 text-xs p-2 border-t border-primary">
        <div className="flex justify-between font-fallout">
          <span>SYSTEM STATUS: OPERATIONAL</span>
          <span>UPTIME: {Math.floor(Date.now() / 1000) % 10000}s</span>
        </div>
      </div>
    </motion.div>
  );
}
