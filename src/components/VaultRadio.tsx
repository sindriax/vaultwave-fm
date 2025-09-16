'use client';

import { useState, useRef, useEffect } from 'react';
import { radioStations, type RadioStation } from '@/data/stations';
import { newsItems } from '@/data/news';

export default function VaultRadio() {
  const [currentStation, setCurrentStation] = useState<RadioStation>(radioStations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [selectedTab, setSelectedTab] = useState('RADIO');
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-cycle through news items
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate random waveform data
  useEffect(() => {
    const generateWaveform = () => {
      const data = Array.from({ length: 40 }, () => Math.random() * 80 + 10);
      setWaveformData(data);
    };
    
    const interval = setInterval(generateWaveform, 150);
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

  const tabs = ['STAT', 'INV', 'DATA', 'MAP', 'RADIO'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black flex items-center justify-center p-4">
      {/* Pip-Boy Device Container */}
      <div className="relative pipboy-device">
        
        {/* Device Frame */}
        <div className="pipboy-frame">
          
          {/* Main Screen */}
          <div className="pipboy-screen">
            {/* Radioactive Scanline */}
            <div className="radioactive-scanline"></div>
            
            {/* Screen Content */}
            <div className="screen-content">
              
              {/* Top Navigation */}
              <div className="top-nav">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`nav-tab ${selectedTab === tab ? 'active' : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Subtitle */}
              <div className="subtitle">
                WEAPONS APPAREL
              </div>

              {/* Main Content Grid */}
              <div className="content-grid">
                
                {/* Left Panel - Station List */}
                <div className="station-list">
                  {radioStations.map((station) => (
                    <div
                      key={station.id}
                      onClick={() => handleStationChange(station)}
                      className={`station-item ${
                        currentStation.id === station.id ? 'selected' : ''
                      }`}
                    >
                      <span className="station-bullet">■</span>
                      {station.name}
                    </div>
                  ))}
                </div>

                {/* Right Panel - Station Details */}
                <div className="station-details">
                  <div className="detail-row">
                    <span className="detail-label">Frequency</span>
                    <span className="detail-value">{currentStation.frequency} MHz</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Genre</span>
                    <span className="detail-value">{currentStation.genre}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status</span>
                    <span className="detail-value">{isPlaying ? 'PLAYING' : 'STANDBY'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Signal</span>
                    <span className="detail-value">STRONG</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Volume</span>
                    <span className="detail-value">{volume}%</span>
                  </div>
                </div>
              </div>

              {/* Waveform Display */}
              <div className="waveform-container">
                <div className="waveform">
                  {waveformData.map((height, index) => (
                    <div
                      key={index}
                      className="waveform-bar"
                      style={{
                        height: `${isPlaying ? height : 15}%`,
                        opacity: isPlaying ? 1 : 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* News Ticker */}
              <div className="news-ticker">
                <div className="news-label">EMERGENCY BROADCAST:</div>
                <div className="news-content">
                  {newsItems[currentNewsIndex]}
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="bottom-stats">
                <div className="stat-item">
                  <span className="stat-icon">🔒</span>
                  <span>SECURED</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">⚡</span>
                  <span>98%</span>
                </div>
                <div className="stat-item frequency-display">
                  <span className="frequency-number">{currentStation.frequency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Controls */}
          <div className="physical-controls">
            {/* Left Side Controls */}
            <div className="left-controls">
              <div className="control-button" onClick={handlePlayPause}>
                <div className="button-label">POWER</div>
                <div className={`button-led ${isPlaying ? 'active' : ''}`}></div>
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="right-controls">
              <div className="volume-control">
                <div className="control-label">VOLUME</div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="volume-slider"
                />
              </div>
              
              <div className="tuning-knob">
                <div className="knob-dial"></div>
                <div className="control-label">TUNE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn">INSPECT</button>
          <button className="action-btn">DROP</button>
          <button className="action-btn">FAV</button>
          <button className="action-btn">SORT</button>
          <button className="action-btn">PERK CHART</button>
        </div>
      </div>

      {/* Audio Element */}
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