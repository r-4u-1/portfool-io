import React, { useRef, useEffect, useState } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [text, setText] = useState('');
  const fullText = "Welcome to My Universe. Let's Build Something Amazing.";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }

    const particles: Particle[] = [];
    const maxParticles = 150;
    const neonColors = ['#ff007f', '#7f00ff', '#00fff7', '#00ff7f', '#ff7f00'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getRandomColor = () => neonColors[Math.floor(Math.random() * neonColors.length)];

    const createParticle = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: getRandomColor(),
      });
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
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

    resizeCanvas();
    addStars();
    animateParticles();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <div className="hero-container">
      <canvas ref={canvasRef} className="hero-canvas" />
      {/*<h1 className="glass-effect-text" style={{ filter: 'url(#glass-effect)' }}>{text}</h1>*/}
    </div>
  );
};

export default Hero;
