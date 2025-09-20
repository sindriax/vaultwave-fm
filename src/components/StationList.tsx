'use client';

import { RadioStation } from '@/data/stations';

interface StationListProps {
  stations: RadioStation[];
  currentStation: RadioStation;
  onStationChange: (station: RadioStation) => void;
}

export default function StationList({ stations, currentStation, onStationChange }: StationListProps) {
  return (
    <div className="pip-boy-section">
      <div className="section-title">&gt; AVAILABLE FREQUENCIES</div>
      <div className="station-list">
        {stations.map((station) => (
          <div
            key={station.id}
            className={`station-row ${currentStation.id === station.id ? 'selected' : ''}`}
            onClick={() => onStationChange(station)}
          >
            <span className="station-bullet">■</span>
            <span className="station-name">{station.name}</span>
            <span className="station-freq">{station.frequency} MHz</span>
          </div>
        ))}
      </div>
    </div>
  );
}