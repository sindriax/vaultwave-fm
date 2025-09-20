'use client';

import { RadioStation } from '@/data/stations';

interface BroadcastInfoProps {
  station: RadioStation;
  isPlaying: boolean;
}

export default function BroadcastInfo({ station, isPlaying }: BroadcastInfoProps) {
  return (
    <div className="pip-boy-section">
      <div className="section-title">&gt; BROADCAST INFO</div>
      <div className="current-station">
        <div className="info-row">
          <span className="label">STATION:</span>
          <span className="value">{station.name}</span>
        </div>
        <div className="info-row">
          <span className="label">FREQUENCY:</span>
          <span className="value">{station.frequency} MHz</span>
        </div>
        <div className="info-row">
          <span className="label">GENRE:</span>
          <span className="value">{station.genre}</span>
        </div>
        <div className="info-row">
          <span className="label">STATUS:</span>
          <span className="value">{isPlaying ? 'BROADCASTING' : 'STANDBY'}</span>
        </div>
      </div>
    </div>
  );
}