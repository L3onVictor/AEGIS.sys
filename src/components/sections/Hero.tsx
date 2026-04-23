import React from 'react';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge glass-panel">V 2.0 BETA ONLINE</div>
          <h1 className="hero-title">
            O Futuro da <br/>
            <span className="text-gradient-primary">Simulação Climática</span>
          </h1>
          <p className="hero-subtitle">
            Experimente um motor de física de partículas de alta performance, 
            rodando a 60 FPS direto no seu navegador. Interaja com a chuva 
            utilizando o nosso campo de força magnético.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Começar Agora</button>
            <button className="btn glass-panel btn-secondary">Ver Documentação</button>
          </div>
        </div>
      </div>
    </section>
  );
};
