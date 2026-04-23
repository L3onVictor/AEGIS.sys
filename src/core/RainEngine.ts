import { RainParticle } from './RainParticle';

export class RainEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: RainParticle[] = [];
  private width: number = 0;
  private height: number = 0;
  private animationFrameId: number = 0;
  
  // Settings
  private particleCount: number = 300;
  private color: string = '150, 200, 255'; // RGB format for RGBA
  private wind: number = 0;
  private targetWind: number = 0;
  
  // Interaction
  private mouseX: number = -1000;
  private mouseY: number = -1000;
  private forceRadius: number = 150;
  private forceStrength: number = 10;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas 2D context not available");
    this.ctx = ctx;

    this.resize();
    this.initParticles();
    
    // Start wind modulation
    setInterval(() => {
      this.targetWind = (Math.random() - 0.5) * 5; // Wind between -2.5 and 2.5
    }, 5000);
  }

  public resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    // Adjust particle count based on screen size to maintain density
    const area = this.width * this.height;
    this.particleCount = Math.floor(area / 4000); // approx 300 particles on 1080p
    
    // Reinitialize if difference is large
    if (Math.abs(this.particles.length - this.particleCount) > 50) {
       this.initParticles();
    }
  }

  private initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new RainParticle(this.width, this.height));
    }
  }

  public setMousePosition(x: number, y: number) {
    this.mouseX = x;
    this.mouseY = y;
  }

  public start() {
    const loop = () => {
      this.update();
      this.draw();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  public stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private update() {
    // Smooth wind transition
    this.wind += (this.targetWind - this.wind) * 0.01;

    for (const particle of this.particles) {
      particle.update(this.wind, this.mouseX, this.mouseY, this.forceRadius, this.forceStrength);
    }
  }

  private draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw force field subtle glow
    if (this.mouseX > 0 && this.mouseY > 0) {
      const gradient = this.ctx.createRadialGradient(
        this.mouseX, this.mouseY, 0,
        this.mouseX, this.mouseY, this.forceRadius
      );
      gradient.addColorStop(0, 'rgba(50, 150, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(50, 150, 255, 0)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(this.mouseX, this.mouseY, this.forceRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Draw particles
    for (const particle of this.particles) {
      particle.draw(this.ctx, this.color);
    }
  }
}
