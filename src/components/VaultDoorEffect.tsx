"use client";

import { motion, AnimatePresence } from "framer-motion";

interface VaultDoorEffectProps {
  isOpen: boolean;
  children: React.ReactNode;
  powerButton?: React.ReactNode;
}

export default function VaultDoorEffect({
  isOpen,
  children,
  powerButton,
}: VaultDoorEffectProps) {
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="open"
            initial={{
              clipPath: "circle(0% at 50% 50%)",
              opacity: 0,
            }}
            animate={{
              clipPath: "circle(100% at 50% 50%)",
              opacity: 1,
            }}
            exit={{
              clipPath: "circle(0% at 50% 50%)",
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              clipPath: { duration: 2 },
            }}
            className="vault-door-animation"
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full min-h-[500px]"
          >
            <div className="text-center font-fallout text-primary/70">
              <div className="text-6xl mb-6">🚪</div>
              <div className="text-2xl mb-4 glow-text text-vault-green">
                VAULT SEALED
              </div>
              <div className="text-lg mb-2 text-primary">
                VAULT-TEC MODEL VT-2077
              </div>
              <div className="text-sm opacity-60 mb-6">
                SECURITY PROTOCOL ACTIVE
              </div>
            </div>
            {powerButton && <div className="mt-4">{powerButton}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
