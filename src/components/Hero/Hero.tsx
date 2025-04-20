import { useRef, useEffect, forwardRef } from 'react';
import './Hero.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const Hero = forwardRef<HTMLDivElement>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const maxParticles = 150;
    const neonColors = ['#ff007f', '#7f00ff', '#00fff7', '#00ff7f', '#ff7f00'];

    const getRandomColor = () => neonColors[Math.floor(Math.random() * neonColors.length)];

    const createParticle = () => {
      if (particles.length < maxParticles) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: getRandomColor(),
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set shadow properties once per frame
      ctx.shadowBlur = 15;

      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.shadowColor = particle.color; // Set shadowColor per particle
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          particles.splice(index, 1);
          createParticle();
        }
      });

      requestAnimationFrame(animateParticles);
    };

    const addStars = () => {
      while (particles.length < maxParticles) createParticle();
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize canvas size and particles
    resizeCanvas();
    addStars();
    animateParticles();

    // Add resize event listener
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="hero-container" ref={ref}>
      <canvas ref={canvasRef} className="hero-canvas">
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
});

export default Hero;