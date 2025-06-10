"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { RadioStation } from "../data/stations";

interface AudioManagerProps {
  isOn: boolean;
  volume: number;
  currentStation: number;
  staticLevel: number;
  stations: RadioStation[];
}

export default function AudioManager({
  isOn,
  volume,
  currentStation,
  staticLevel,
  stations,
}: AudioManagerProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const staticNoiseRef = useRef<AudioBufferSourceNode | null>(null);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const staticGainRef = useRef<GainNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isOn && !isInitialized) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        audioContextRef.current = new AudioContextClass();

        gainNodeRef.current = audioContextRef.current.createGain();
        staticGainRef.current = audioContextRef.current.createGain();
        musicGainRef.current = audioContextRef.current.createGain();

        gainNodeRef.current.connect(audioContextRef.current.destination);
        staticGainRef.current.connect(audioContextRef.current.destination);
        musicGainRef.current.connect(audioContextRef.current.destination);

        setIsInitialized(true);
      } catch (error) {
        console.warn("Web Audio API not supported:", error);
      }
    }

    return () => {
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, [isOn, isInitialized]);

  const createStaticNoise = useCallback(() => {
    if (!audioContextRef.current || !staticGainRef.current) return;

    if (staticNoiseRef.current) {
      staticNoiseRef.current.stop();
    }

    const bufferSize = audioContextRef.current.sampleRate * 2;
    const buffer = audioContextRef.current.createBuffer(
      1,
      bufferSize,
      audioContextRef.current.sampleRate
    );
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(staticGainRef.current);
    source.start();

    staticNoiseRef.current = source;
  }, []);

  const loadAndPlayMusic = useCallback(
    async (stationIndex: number) => {
      if (!audioContextRef.current || !musicGainRef.current || !isOn) return;

      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
        musicAudioRef.current.currentTime = 0;
      }

      const station = stations[stationIndex];
      if (!station?.audioUrl) {
        console.log(`No audio URL for station: ${station?.name}`);
        return;
      }

      try {
        const audio = new Audio(station.audioUrl);
        audio.loop = true;
        audio.crossOrigin = "anonymous";

        await new Promise((resolve, reject) => {
          audio.addEventListener("canplaythrough", resolve);
          audio.addEventListener("error", reject);
          audio.load();
        });

        if (audioContextRef.current.state === "suspended") {
          await audioContextRef.current.resume();
        }

        if (!musicSourceRef.current) {
          musicSourceRef.current =
            audioContextRef.current.createMediaElementSource(audio);
          musicSourceRef.current.connect(musicGainRef.current);
        }

        musicAudioRef.current = audio;
        await audio.play();

        console.log(`Now playing: ${station.name}`);
      } catch (error) {
        console.warn(`Failed to load audio for ${station.name}:`, error);
      }
    },
    [stations, isOn]
  );

  useEffect(() => {
    if (staticGainRef.current && isOn) {
      const staticVolume = (staticLevel / 100) * (volume / 100) * 0.1; // Keep static quiet
      staticGainRef.current.gain.setValueAtTime(
        staticVolume,
        audioContextRef.current?.currentTime || 0
      );

      if (staticLevel > 20 && !staticNoiseRef.current) {
        createStaticNoise();
      } else if (staticLevel <= 20 && staticNoiseRef.current) {
        staticNoiseRef.current.stop();
        staticNoiseRef.current = null;
      }
    } else if (staticNoiseRef.current) {
      staticNoiseRef.current.stop();
      staticNoiseRef.current = null;
    }
  }, [staticLevel, volume, isOn, createStaticNoise]);

  useEffect(() => {
    if (gainNodeRef.current && musicGainRef.current) {
      const volumeLevel = isOn ? volume / 100 : 0;
      gainNodeRef.current.gain.setValueAtTime(
        volumeLevel,
        audioContextRef.current?.currentTime || 0
      );
      musicGainRef.current.gain.setValueAtTime(
        volumeLevel * 0.7,
        audioContextRef.current?.currentTime || 0
      );
    }
  }, [volume, isOn]);

  useEffect(() => {
    if (isOn && isInitialized) {
      loadAndPlayMusic(currentStation);
    } else if (!isOn && musicAudioRef.current) {
      musicAudioRef.current.pause();
    }
  }, [currentStation, isOn, isInitialized, loadAndPlayMusic]);

  useEffect(() => {
    if (isOn && staticLevel > 50) {
      setTimeout(() => {
        if (staticGainRef.current && audioContextRef.current) {
          staticGainRef.current.gain.setValueAtTime(
            0.3,
            audioContextRef.current.currentTime
          );
          staticGainRef.current.gain.exponentialRampToValueAtTime(
            0.05,
            audioContextRef.current.currentTime + 0.5
          );
        }
      }, 100);
    }
  }, [currentStation, isOn, staticLevel]);

  useEffect(() => {
    return () => {
      if (staticNoiseRef.current) {
        staticNoiseRef.current.stop();
      }
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
        musicAudioRef.current = null;
      }
      if (musicSourceRef.current) {
        musicSourceRef.current.disconnect();
        musicSourceRef.current = null;
      }
    };
  }, []);

  return null;
}
