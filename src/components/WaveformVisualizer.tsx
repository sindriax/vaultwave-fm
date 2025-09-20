'use client';

import { useEffect, useState } from 'react';

interface WaveformVisualizerProps {
  isPlaying: boolean;
}

export default function WaveformVisualizer({ isPlaying }: WaveformVisualizerProps) {
  const [waveformData, setWaveformData] = useState<number[]>(
    Array.from({ length: 26 }, () => Math.random() * 20 + 5)
  );

  useEffect(() => {
    const generateWaveform = () => {
      const data = Array.from({ length: 26 }, () =>
        isPlaying ? Math.random() * 80 + 10 : Math.random() * 20 + 5
      );
      setWaveformData(data);
    };

    generateWaveform();
    const interval = setInterval(generateWaveform, isPlaying ? 100 : 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="pip-boy-section">
      <div className="section-title">&gt; SIGNAL ANALYSIS</div>
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
  );
}