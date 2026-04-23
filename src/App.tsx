import React from 'react';
import { RainBackground } from './components/canvas/RainBackground';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Stats } from './components/sections/Stats';
import { Footer } from './components/layout/Footer';

// Import global styles
import './styles/global.css';

const App: React.FC = () => {
  return (
    <>
      <RainBackground />
      <div className="app-content">
        <Header />
        <main>
          <Hero />
          <Features />
          <Stats />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
