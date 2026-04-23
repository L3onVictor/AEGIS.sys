import React from 'react';
import './Features.css';

const featureData = [
  {
    title: 'Física Customizada',
    desc: 'Motor agnóstico de frameworks desenvolvido do zero para evitar sobrecarga de Garbage Collection e garantir 60 FPS fluidos.',
    icon: '⚡'
  },
  {
    title: 'Campo de Força',
    desc: 'Sistema de repulsão de partículas em tempo real integrado ao cursor, com refração visual magnética.',
    icon: '🧲'
  },
  {
    title: 'Clima Dinâmico',
    desc: 'Vento influenciado por IA, variando intensidade e direção ao longo do tempo, afetando a trajetória das partículas e o efeito Parallax.',
    icon: '🌪️'
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="features section">
      <div className="container">
        <h2 className="section-title text-gradient">Recursos da Engine</h2>
        <div className="features-grid">
          {featureData.map((feature, idx) => (
            <div key={idx} className="feature-card glass-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
