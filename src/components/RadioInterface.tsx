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
    <div className="h-full flex items-center justify-center p-4">
      <VaultDoorEffect isOpen={isOn}>
        <div className="relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-b from-vault-rust to-vault-dark p-8 rounded-lg border-2 border-primary relative overflow-hidden shadow-fallout-border"
            style={{ width: "800px", height: "500px" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-20 animate-crt-flicker pointer-events-none" />

            <div className="absolute left-4 top-4 bottom-4 w-32 bg-vault-dark rounded-lg border-2 border-primary/60 shadow-amber-glow">
              <div className="p-2 h-full">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-primary/20 mb-1 rounded-sm opacity-60 glow-text"
                  />
                ))}
              </div>
            </div>

            <div className="ml-40 space-y-6">
              <RadioDisplay
                isOn={isOn}
                station={stations[currentStation]}
                staticLevel={staticLevel}
              />

              <div className="flex space-x-12 justify-center">
                <div className="text-center">
                  <RadioKnob
                    value={volume}
                    onChange={handleVolumeChange}
                    min={0}
                    max={100}
                    size={80}
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
                    size={80}
                    color="green"
                    onDirectionChange={handleStationChange}
                  />
                  <p className="text-vault-green text-xs mt-2 font-fallout glow-text">
                    TUNING
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <RadioButton
                  label="POWER"
                  isActive={isOn}
                  onClick={handlePowerToggle}
                  variant="power"
                />
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

            <div className="absolute bottom-4 right-4">
              <div className="text-primary font-fallout text-sm glow-text">
                <div className="font-bold">VAULT-TEC</div>
                <div className="text-xs opacity-80">Model VT-2077</div>
              </div>
            </div>
          </motion.div>
          <TerminalOutput isOn={isOn} currentNews={newsItems[newsIndex]} />
          {isOn && staticLevel > 60 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-4 bg-tertiary/20 border-2 border-tertiary rounded-lg p-4 radiation-warning"
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-tertiary rounded-full flex items-center justify-center">
                  <div className="text-tertiary font-fallout text-xs font-bold">
                    ⚠
                  </div>
                </div>
                <div className="font-fallout text-tertiary font-bold">
                  RADIATION INTERFERENCE DETECTED
                </div>
              </div>
              <div className="mt-2 text-xs font-fallout text-tertiary/80">
                Signal degradation in progress. Adjusting frequency...
              </div>
            </motion.div>
          )}{" "}
          <AudioManager
            isOn={isOn}
            volume={volume}
            currentStation={currentStation}
            staticLevel={staticLevel}
          />
        </div>
      </VaultDoorEffect>
    </div>
  );
}
