import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header glass-nav">
      <div className="container header-container">
        <div className="logo">
          <span className="text-gradient-primary">AEGIS</span>.sys
        </div>
        <nav className="nav-links">
          <a href="#features">Tecnologia</a>
          <a href="#stats">Performance</a>
          <a href="#about">Sobre</a>
        </nav>
        <button className="btn btn-primary btn-sm">Iniciar Sistema</button>
      </div>
    </header>
  );
};
