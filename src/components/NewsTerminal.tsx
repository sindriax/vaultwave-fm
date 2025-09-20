'use client';

interface NewsTerminalProps {
  currentNews: string;
  newsType: 'normal' | 'emergency' | 'special';
}

export default function NewsTerminal({ currentNews, newsType }: NewsTerminalProps) {
  return (
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
  );
}