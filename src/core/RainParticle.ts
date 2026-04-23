export class RainParticle {
  x: number;
  y: number;
  z: number; // For parallax effect
  length: number;
  velocity: number;
  opacity: number;
  angle: number;
  canvasHeight: number;
  canvasWidth: number;
  baseX: number; // to keep track of the original column for wind

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    
    this.x = Math.random() * canvasWidth;
    this.baseX = this.x;
    this.y = Math.random() * canvasHeight;
    this.z = Math.random() * 0.8 + 0.2; // 0.2 to 1.0 (depth)
    
    // Closer particles (higher z) are larger and fall faster
    this.length = this.z * 25 + 10;
    this.velocity = this.z * 15 + 10;
    this.opacity = this.z * 0.5 + 0.1;
    this.angle = 0; // Wind angle
  }

  // Recycle the particle when it goes off screen
  reset() {
    this.x = Math.random() * this.canvasWidth;
    this.baseX = this.x;
    this.y = -this.length - (Math.random() * 100);
    this.z = Math.random() * 0.8 + 0.2;
    this.length = this.z * 25 + 10;
    this.velocity = this.z * 15 + 10;
    this.opacity = this.z * 0.5 + 0.1;
  }

  update(wind: number, mouseX: number, mouseY: number, forceRadius: number, forceStrength: number) {
    // Apply gravity and velocity
    this.y += this.velocity;
    
    // Apply wind (scaled by depth so closer particles are affected slightly differently, or equally)
    this.x += wind * this.z;

    // --- Interactive Force Field ---
    if (mouseX > 0 && mouseY > 0) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < forceRadius) {
        // Calculate the repulsive force
        // The closer to the mouse, the stronger the force
        const force = (forceRadius - distance) / forceRadius;
        
        // Direction vector normalized
        const nx = dx / distance;
        const ny = dy / distance;

        // Apply force
        this.x += nx * force * forceStrength * this.z;
        this.y += ny * force * forceStrength * this.z * 0.5; // less force vertically to simulate dropping
      }
    }

    // Wrap around screen
    if (this.y > this.canvasHeight + this.length) {
      this.reset();
    }
    if (this.x > this.canvasWidth + 50) {
      this.x = -50;
      this.baseX = this.x;
    } else if (this.x < -50) {
      this.x = this.canvasWidth + 50;
      this.baseX = this.x;
    }
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${color}, ${this.opacity})`;
    ctx.lineWidth = this.z * 1.5;
    ctx.lineCap = 'round';
    
    ctx.moveTo(this.x, this.y);
    
    // Wind tilt calculation for the tail
    // A simple approximation: tail leans back opposite to wind/velocity
    const tiltX = (this.x - this.baseX) * 0.1; 
    
    ctx.lineTo(this.x - tiltX, this.y - this.length);
    ctx.stroke();
  }
}
