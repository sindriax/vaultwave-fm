'use client';

import { useState, useRef, useEffect } from 'react';
import { radioStations, type RadioStation } from '@/data/stations';
import { newsItems, emergencyNews, specialAnnouncements, newsConfig } from '@/data/news';

export default function VaultRadio() {
  const [currentStation, setCurrentStation] = useState<RadioStation>(radioStations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentNews, setCurrentNews] = useState<string>(newsItems[0]);
  const [newsType, setNewsType] = useState<'normal' | 'emergency' | 'special'>('normal');
  const [waveformData, setWaveformData] = useState<number[]>([]);
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

  useEffect(() => {
    const generateWaveform = () => {
      const data = Array.from({ length: 32 }, () =>
        isPlaying ? Math.random() * 80 + 10 : Math.random() * 20 + 5
      );
      setWaveformData(data);
    };

    const interval = setInterval(generateWaveform, isPlaying ? 100 : 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

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
        <div className="pip-boy-header">
          <div className="pip-boy-title">VAULTWAVE FM - RADIO</div>
          <div className="pip-boy-status">[OPERATIONAL]</div>
        </div>

        <div className="pip-boy-content">
          <div className="radio-section">
            <div className="radio-grid">
              <div className="pip-boy-section">
                <div className="section-title">&gt; AVAILABLE FREQUENCIES</div>
                <div className="station-list">
                  {radioStations.map((station) => (
                    <div
                      key={station.id}
                      className={`station-row ${currentStation.id === station.id ? 'selected' : ''}`}
                      onClick={() => handleStationChange(station)}
                    >
                      <span className="station-bullet">■</span>
                      <span className="station-name">{station.name}</span>
                      <span className="station-freq">{station.frequency} MHz</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pip-boy-section">
                <div className="section-title">&gt; SIGNAL ANALYSIS</div>
                <div className="waveform-container">
                  <div className="waveform-display">
                    {waveformData.map((height, index) => (
                      <div
                        key={index}
                        className="waveform-bar"
                        style={{
                          height: `${height}%`,
                          opacity: isPlaying ? 1 : 0.3,
                        }}
                      />
                    ))}
                  </div>
                  <div className="signal-info">
                    <div className="signal-row">
                      <span className="signal-label">SIGNAL STRENGTH:</span>
                      <span className="signal-value strong">STRONG</span>
                    </div>
                    <div className="signal-row">
                      <span className="signal-label">INTERFERENCE:</span>
                      <span className="signal-value minimal">MINIMAL</span>
                    </div>
                    <div className="signal-row">
                      <span className="signal-label">QUALITY:</span>
                      <span className="signal-value excellent">EXCELLENT</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pip-boy-section">
                <div className="section-title">&gt; BROADCAST INFO</div>
                <div className="current-station">
                  <div className="info-row">
                    <span className="label">STATION:</span>
                    <span className="value">{currentStation.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">FREQUENCY:</span>
                    <span className="value">{currentStation.frequency} MHz</span>
                  </div>
                  <div className="info-row">
                    <span className="label">GENRE:</span>
                    <span className="value">{currentStation.genre}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">STATUS:</span>
                    <span className="value">{isPlaying ? 'BROADCASTING' : 'STANDBY'}</span>
                  </div>
                </div>
              </div>

              <div className="pip-boy-section">
                <div className="section-title">&gt; AUDIO CONTROLS</div>
                <div className="controls">
                  <button className="pip-boy-button" onClick={handlePlayPause}>
                    [{isPlaying ? 'STOP BROADCAST' : 'START BROADCAST'}]
                  </button>
                  <div className="volume-control">
                    <span className="label">VOLUME: {volume}%</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="pip-boy-slider"
                    />
                  </div>
                  <div className="audio-stats">
                    <div className="stat-row">
                      <span className="stat-dot operational"></span>
                      <span>AUDIO DRIVER: ONLINE</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-dot optimal"></span>
                      <span>BUFFER: OPTIMAL</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="pip-boy-section news-terminal">
            <div className="section-title">&gt; VAULT-TEC NETWORK FEED</div>
            <div className="news-and-status">
              <div className="news-display">
                <div className="news-header">
                  <span className="news-timestamp">{new Date().toLocaleTimeString()}</span>
                  <span className={`news-priority ${newsType}`}>
                    {newsType === 'emergency' ? '⚠ ALERT' : newsType === 'special' ? '📻 SPECIAL' : '📊 INFO'}
                  </span>
                </div>
                <div className={`news-content ${newsType}`}>
                  {currentNews}
                </div>
                <div className="news-footer">
                  <div className="signal-indicator">
                    <span className="signal-dot"></span>
                    <span className="signal-dot"></span>
                    <span className="signal-dot"></span>
                    LIVE FEED
                  </div>
                </div>
              </div>
              <div className="vault-status">
                <div className="status-grid">
                  <div className="status-item">
                    <span className="status-label">VAULT STATUS:</span>
                    <span className="status-value operational">OPERATIONAL</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">POPULATION:</span>
                    <span className="status-value">847 DWELLERS</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">SECURITY LEVEL:</span>
                    <span className="status-value secure">SECURE</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">AIR QUALITY:</span>
                    <span className="status-value optimal">OPTIMAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      >
        <source src={currentStation.audioUrl} type="audio/mpeg" />
        {currentStation.fallbackUrl && (
          <source src={currentStation.fallbackUrl} type="audio/mpeg" />
        )}
      </audio>
    </div>
  );
}