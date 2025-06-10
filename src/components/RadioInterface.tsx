"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RadioKnob from "./RadioKnob";
import RadioDisplay from "./RadioDisplay";
import TerminalOutput from "./TerminalOutput";
import RadioButton from "./RadioButton";
import AudioManager from "./AudioManager";
import VaultDoorEffect from "./VaultDoorEffect";
import { radioStations } from "../data/stations";
import { newsItems } from "../data/news";

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
      setCurrentStation((prev) => (prev + 1) % radioStations.length);
    } else {
      setCurrentStation(
        (prev) => (prev - 1 + radioStations.length) % radioStations.length
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
        <div className="h-screen w-screen grid grid-rows-[auto_3fr_auto] gap-6 p-4">
          <div className="bg-gradient-to-r from-vault-rust to-vault-dark border-2 border-primary rounded-lg p-4 flex items-center justify-between shadow-fallout-border">
            <div className="texts-primary font-fallout text-2xl font-bold glow-text">
              VAULTWAVE FM RADIO TERMINAL
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="flex items-center space-x-3 mb-1">
                  <RadioKnob
                    value={volume}
                    onChange={handleVolumeChange}
                    min={0}
                    max={100}
                    size={60}
                    color="amber"
                    showValue={false}
                  />
                  <span className="text-primary text-lg font-fallout font-bold glow-text min-w-[3ch]">
                    {volume}
                  </span>
                </div>
                <p className="text-primary text-xs font-fallout glow-text">
                  VOL
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center space-x-3 mb-1">
                  <RadioKnob
                    value={currentStation * 20}
                    onChange={() => {}}
                    min={0}
                    max={100}
                    size={60}
                    color="green"
                    onDirectionChange={handleStationChange}
                    showValue={false}
                  />
                  <span className="text-vault-green text-lg font-fallout font-bold glow-text min-w-[4ch]">
                    {radioStations[currentStation].frequency}
                  </span>
                </div>
                <p className="text-vault-green text-xs font-fallout glow-text">
                  TUNE
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-vault-rust to-vault-dark border-2 border-primary rounded-lg p-8 shadow-fallout-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-20 animate-crt-flicker pointer-events-none" />
            <div className="relative z-10 h-full">
              <RadioDisplay
                isOn={isOn}
                station={radioStations[currentStation]}
                staticLevel={staticLevel}
              />
            </div>
          </div>

          <div>
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
          stations={radioStations}
        />
      </VaultDoorEffect>
    </div>
  );
}
