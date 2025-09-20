'use client';

interface AudioControlsProps {
  isPlaying: boolean;
  volume: number;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
}

export default function AudioControls({ isPlaying, volume, onPlayPause, onVolumeChange }: AudioControlsProps) {
  return (
    <div className="pip-boy-section">
      <div className="section-title">&gt; AUDIO CONTROLS</div>
      <div className="controls">
        <button className="pip-boy-button" onClick={onPlayPause}>
          [{isPlaying ? 'STOP BROADCAST' : 'START BROADCAST'}]
        </button>
        <div className="volume-control">
          <span className="label">VOLUME: {volume}%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(parseInt(e.target.value))}
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
  );
}