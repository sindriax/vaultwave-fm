'use client';

import { useState, useRef, useEffect } from 'react';
import { radioStations, type RadioStation } from '@/data/stations';
import { newsItems, emergencyNews, specialAnnouncements, newsConfig } from '@/data/news';
import StationList from './StationList';
import WaveformVisualizer from './WaveformVisualizer';
import BroadcastInfo from './BroadcastInfo';
import AudioControls from './AudioControls';
import NewsTerminal from './NewsTerminal';

export default function VaultRadio() {
  const [currentStation, setCurrentStation] = useState<RadioStation>(radioStations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentNews, setCurrentNews] = useState<string>(newsItems[0]);
  const [newsType, setNewsType] = useState<'normal' | 'emergency' | 'special'>('normal');
  const audioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    const getRandomNews = () => {
      const emergencyChance = Math.random();
      const specialChance = Math.random();

      if (emergencyChance < newsConfig.emergencyChance) {
        const randomEmergency = emergencyNews[Math.floor(Math.random() * emergencyNews.length)];
        setCurrentNews(randomEmergency);
        setNewsType('emergency');
      } else if (specialChance < newsConfig.specialAnnouncementChance) {
        const randomSpecial = specialAnnouncements[Math.floor(Math.random() * specialAnnouncements.length)];
        setCurrentNews(randomSpecial);
        setNewsType('special');
      } else {
        const randomNormal = newsItems[Math.floor(Math.random() * newsItems.length)];
        setCurrentNews(randomNormal);
        setNewsType('normal');
      }
    };

    const interval = setInterval(getRandomNews, newsConfig.rotationInterval);
    return () => clearInterval(interval);
  }, []);


  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStationChange = (station: RadioStation) => {
    setCurrentStation(station);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  };

  return (
    <div className="pip-boy-container">
      <div className="pip-boy-screen">
        <div className="radioactive-scanline"></div>
        <div className="pip-boy-header">
          <div className="pip-boy-title">VAULTWAVE FM</div>
          <div className="pip-boy-status">[OPERATIONAL]</div>
        </div>

        <div className="pip-boy-content">
          <div className="radio-section">
            <div className="radio-grid">
              <StationList
                stations={radioStations}
                currentStation={currentStation}
                onStationChange={handleStationChange}
              />

              <WaveformVisualizer isPlaying={isPlaying} />

              <BroadcastInfo station={currentStation} isPlaying={isPlaying} />

              <AudioControls
                isPlaying={isPlaying}
                volume={volume}
                onPlayPause={handlePlayPause}
                onVolumeChange={setVolume}
              />
            </div>
          </div>

          <NewsTerminal currentNews={currentNews} newsType={newsType} />
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="none"
        crossOrigin="anonymous"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
        onVolumeChange={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume / 100;
          }
        }}
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume / 100;
          }
        }}
      >
        <source src={currentStation.audioUrl} type="audio/mpeg" />
        {currentStation.fallbackUrl && (
          <source src={currentStation.fallbackUrl} type="audio/mpeg" />
        )}
      </audio>
    </div>
  );
}