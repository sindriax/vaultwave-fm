"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
  const bootSequenceTimeouts = useRef<NodeJS.Timeout[]>([]);

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
      bootSequenceTimeouts.current.forEach(clearTimeout);
      bootSequenceTimeouts.current = [];
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

      bootSequenceTimeouts.current.forEach(clearTimeout);
      bootSequenceTimeouts.current = [];

      bootSequence.forEach((line, index) => {
        const timeoutId = setTimeout(() => {
          setTerminalHistory((prev) => [...prev, `[BOOT] ${line}`]);
        }, index * 1000);
        bootSequenceTimeouts.current.push(timeoutId);
      });
    }
    return () => {
      bootSequenceTimeouts.current.forEach(clearTimeout);
      bootSequenceTimeouts.current = [];
    };
  }, [isOn, terminalHistory.length]);

  if (!isOn) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: 0 }}
        className="bg-vault-dark border-2 border-gray-700 rounded-lg p-2 sm:p-3 h-full font-fallout text-xs sm:text-sm flex items-center justify-center"
      >
        <div className="text-gray-600 text-center">TERMINAL OFFLINE</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-vault-dark border-2 border-primary rounded-lg p-2 sm:p-3 h-full font-fallout text-xs sm:text-sm overflow-hidden relative scanline-effect flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent animate-crt-flicker pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="text-primary mb-1 sm:mb-2 glow-text text-xs sm:text-sm">
          VAULT-TEC TERMINAL v2.1.7
        </div>
        <div className="text-primary/80 mb-2 sm:mb-4 text-xs">
          ==================
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {terminalHistory.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-primary/80 mb-0.5 leading-tight glow-text text-xs"
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center text-primary mt-4">
          <span className="text-secondary glow-text">$&gt;</span>
          <span className="ml-2">{currentLine}</span>
          {cursorVisible && (
            <span className="bg-primary text-vault-dark">█</span>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-primary/20 text-primary/80 text-xs p-1 border-t border-primary">
        <div className="flex justify-between font-fallout">
          <span>SYSTEM STATUS: OPERATIONAL</span>
          <span>UPTIME: {Math.floor(Date.now() / 1000) % 10000}s</span>
        </div>
      </div>
    </motion.div>
  );
}
