import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="text-gradient-primary logo-text">AEGIS</span>
          <p className="footer-desc">Simulação Climática Avançada para Web.</p>
        </div>
        <div className="footer-links">
          <a href="#">Github</a>
          <a href="#">Documentação</a>
          <a href="#">Termos</a>
        </div>
      </div>
    </footer>
  );
};
