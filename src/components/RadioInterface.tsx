"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RadioKnob from "./RadioKnob";
import RadioDisplay from "./RadioDisplay";
import TerminalOutput from "./TerminalOutput";
import RadioButton from "./RadioButton";
import AudioManager from "./AudioManager";
import VaultDoorEffect from "./VaultDoorEffect";

const stations = [
  {
    id: 1,
    name: "VAULT-TEC RADIO",
    frequency: "101.5",
    genre: "Classical/Orchestral",
  },
  {
    id: 2,
    name: "DIAMOND CITY RADIO",
    frequency: "102.1",
    genre: "Jazz & Swing",
  },
  { id: 3, name: "RADIO NEW VEGAS", frequency: "103.7", genre: "50s Oldies" },
  {
    id: 4,
    name: "WASTELAND WAVES",
    frequency: "104.3",
    genre: "Lo-Fi Ambient",
  },
  { id: 5, name: "ATOMIC RADIO", frequency: "105.9", genre: "Post-War Blues" },
];

const newsItems = [
  "VAULT-TEC SYSTEMS OPERATIONAL... ALL GREEN",
  "RADIATION LEVELS NOMINAL IN SECTOR 7",
  "WATER PURIFICATION SYSTEM: 98% EFFICIENCY",
  "TEMPERATURE CONTROLS FUNCTIONING NORMALLY",
  "BROTHERHOOD PATROL SPOTTED NEAR SECTOR 12",
  "SUPPLY DROP SCHEDULED FOR 1400 HOURS",
  "PERIMETER DEFENSES ACTIVE AND MONITORING",
];

export default function RadioInterface() {
  const [isOn, setIsOn] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentStation, setCurrentStation] = useState(0);
  const [staticLevel, setStaticLevel] = useState(30);
  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    if (!isOn) return;

    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOn]);

  const handlePowerToggle = () => {
    setIsOn(!isOn);
    if (!isOn) {
      setStaticLevel(80);
      setTimeout(() => setStaticLevel(30), 2000);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleStationChange = (direction: "up" | "down") => {
    if (direction === "up") {
      setCurrentStation((prev) => (prev + 1) % stations.length);
    } else {
      setCurrentStation(
        (prev) => (prev - 1 + stations.length) % stations.length
      );
    }
    setStaticLevel(60);
    setTimeout(() => setStaticLevel(30), 1000);
  };
  return (
    <div className="h-screen w-screen overflow-hidden">
      <VaultDoorEffect
        isOpen={isOn}
        powerButton={
          <div className="flex justify-center">
            <RadioButton
              label="POWER"
              isActive={isOn}
              onClick={handlePowerToggle}
              variant="power"
            />
          </div>
        }
      >
        <div className="h-screen w-screen grid grid-rows-3 grid-cols-3 gap-4 p-4">
          <div className="col-span-3 bg-gradient-to-r from-vault-rust to-vault-dark border-2 border-primary rounded-lg p-4 flex items-center justify-between shadow-fallout-border">
            <div className="text-primary font-fallout text-2xl font-bold glow-text">
              VAULTWAVE FM RADIO TERMINAL
            </div>
            <div className="text-right">
              <div className="text-primary font-fallout text-sm glow-text">
                <div className="font-bold">VAULT-TEC MODEL VT-2077</div>
                <div className="text-xs opacity-80">OPERATIONAL</div>
              </div>
            </div>
          </div>

          <div className="bg-vault-dark rounded-lg border-2 border-primary/60 shadow-amber-glow p-4">
            <div className="h-full flex flex-col">
              <div className="text-primary font-fallout text-xs mb-2 glow-text text-center">
                SPEAKER
              </div>
              <div className="flex-1 space-y-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3 bg-primary/20 rounded-sm opacity-60"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-vault-rust to-vault-dark border-2 border-primary rounded-lg p-6 shadow-fallout-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-20 animate-crt-flicker pointer-events-none" />
            <RadioDisplay
              isOn={isOn}
              station={stations[currentStation]}
              staticLevel={staticLevel}
            />
          </div>

          {/* Middle Right - Control Knobs */}
          <div className="bg-gradient-to-b from-vault-rust to-vault-dark border-2 border-primary rounded-lg p-6 shadow-fallout-border">
            <div className="h-full flex flex-col justify-center space-y-8">
              <div className="text-center">
                <RadioKnob
                  value={volume}
                  onChange={handleVolumeChange}
                  min={0}
                  max={100}
                  size={70}
                  color="amber"
                />
                <p className="text-primary text-xs mt-2 font-fallout glow-text">
                  VOLUME
                </p>
              </div>

              <div className="text-center">
                <RadioKnob
                  value={currentStation * 20}
                  onChange={() => {}}
                  min={0}
                  max={100}
                  size={70}
                  color="green"
                  onDirectionChange={handleStationChange}
                />
                <p className="text-vault-green text-xs mt-2 font-fallout glow-text">
                  TUNING
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-vault-rust to-vault-dark border-2 border-primary rounded-lg p-4 shadow-fallout-border flex items-center justify-center">
            <div className="space-y-4">
              <RadioButton
                label="SCAN"
                isActive={false}
                onClick={() => {}}
                variant="function"
              />
              <RadioButton
                label="EMERGENCY"
                isActive={false}
                onClick={() => {}}
                variant="emergency"
              />
            </div>
          </div>

          <div className="col-span-2">
            <TerminalOutput isOn={isOn} currentNews={newsItems[newsIndex]} />
          </div>
        </div>

        {isOn && staticLevel > 60 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 bg-tertiary/20 border-2 border-tertiary rounded-lg p-4 radiation-warning z-10"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-tertiary rounded-full flex items-center justify-center">
                <div className="text-tertiary font-fallout text-xs font-bold">
                  ⚠
                </div>
              </div>
              <div className="font-fallout text-tertiary font-bold">
                RADIATION INTERFERENCE
              </div>
            </div>
          </motion.div>
        )}

        <AudioManager
          isOn={isOn}
          volume={volume}
          currentStation={currentStation}
          staticLevel={staticLevel}
        />
      </VaultDoorEffect>
    </div>
  );
}
