import React from 'react';
import './Stats.css';

export const Stats: React.FC = () => {
  return (
    <section id="stats" className="stats section">
      <div className="container">
        <div className="stats-wrapper glass-panel">
          <div className="stat-item">
            <h4 className="stat-value text-gradient-primary">60+</h4>
            <p className="stat-label">FPS Constante</p>
          </div>
          <div className="stat-item">
            <h4 className="stat-value text-gradient-primary">300</h4>
            <p className="stat-label">Partículas/Tela</p>
          </div>
          <div className="stat-item">
            <h4 className="stat-value text-gradient-primary">0ms</h4>
            <p className="stat-label">Lag de Entrada</p>
          </div>
        </div>
      </div>
    </section>
  );
};
