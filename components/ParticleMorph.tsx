"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  friction: number;
  ease: number;
}

const ParticleMorph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMorphed, setIsMorphed] = useState(false);

  // Belarus Path Data (Simplified for sampling)
  const belarusPath = "M 218,32 L 248,20 L 290,12 L 340,8 L 385,7 L 428,10 L 468,14 L 505,22 L 538,34 L 562,52 L 580,76 L 592,106 L 598,140 L 596,168 L 590,185 L 585,178 L 545,182 L 502,186 L 460,194 L 420,204 L 382,216 L 342,228 L 348,262 L 355,298 L 360,330 L 366,362 L 395,368 L 415,375 L 432,386 L 465,405 L 492,422 L 520,440 L 542,460 L 560,482 L 572,502 L 575,518 L 568,524 L 548,528 L 520,528 L 490,525 L 460,520 L 428,515 L 395,512 L 360,510 L 325,514 L 295,518 L 268,524 L 240,528 L 240,500 L 240,462 L 240,415 L 240,378 L 220,365 L 200,352 L 178,338 L 120,338 L 90,338 L 68,340 L 55,345 L 42,358 L 38,382 L 40,408 L 44,435 L 60,458 L 82,478 L 105,495 L 130,510 L 160,520 L 200,526 L 240,528 L 240,500 L 240,462 L 240,415 L 240,378 L 220,365 L 200,352 L 178,338 L 176,305 L 180,272 L 185,242 L 100,242 L 104,228 L 108,212 L 110,192 L 112,162 L 110,130 L 106,98 L 104,68 L 108,46 L 120,30 L 140,20 L 165,18 L 192,24 L 218,32 Z";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, radius: 100 };

    const init = () => {
      canvas.width = 800;
      canvas.height = 600;
      
      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement.setAttribute("d", belarusPath);
      const pathLength = pathElement.getTotalLength();
      const numberOfParticles = 1200;

      particles = [];
      for (let i = 0; i < numberOfParticles; i++) {
        const point = pathElement.getPointAtLength((i / numberOfParticles) * pathLength);
        
        const targetX = point.x + 100;
        const targetY = point.y + 20;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          originX: targetX,
          originY: targetY,
          color: `rgba(0, 128, 128, ${0.4 + Math.random() * 0.6})`, // Teal particles
          size: Math.random() * 2 + 1,
          vx: 0,
          vy: 0,
          friction: 0.95,
          ease: 0.05 + Math.random() * 0.05,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        if (isMorphed) {
          const dx = p.originX - p.x;
          const dy = p.originY - p.y;
          p.vx += dx * p.ease;
          p.vy += dy * p.ease;
        } else {
          p.vx += (Math.random() - 0.5) * 0.5;
          p.vy += (Math.random() - 0.5) * 0.5;
        }

        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const distance = Math.sqrt(mdx * mdx + mdy * mdy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(mdy, mdx);
          p.vx -= Math.cos(angle) * force * 5;
          p.vy -= Math.sin(angle) * force * 5;
        }

        p.vx *= p.friction;
        p.vy *= p.friction;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    init();
    animate();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMorphed]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] bg-[#f0f9f9] p-12 rounded-3xl border border-[#e0f2f1] shadow-inner overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#008080] rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#00a3a3] rounded-full blur-[100px]" />
      </div>

      <div className="mb-8 text-center z-10">
        <h3 className="text-[#0a2533] text-3xl font-extrabold mb-2">Генеративная Карта</h3>
        <p className="text-[#00a3a3] text-sm uppercase tracking-widest font-bold">Particle Morphing System</p>
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl border border-white p-4 z-10">
        <canvas 
          ref={canvasRef} 
          className="cursor-crosshair w-full max-w-[800px] h-auto"
        />
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          <motion.button
            whileHover={{ backgroundColor: "#006666", scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMorphed(!isMorphed)}
            className="px-8 py-3 bg-[#008080] text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg transition-all"
          >
            {isMorphed ? "Рассеять частицы" : "Собрать карту РБ"}
          </motion.button>
        </div>
      </div>

      <div className="mt-8 flex gap-8 text-[#008080]/60 text-[10px] font-bold uppercase tracking-tighter z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#008080] rounded-full animate-pulse" />
          1,200 активных частиц
        </div>
        <div>60 FPS Rendering</div>
        <div>Canvas API v2</div>
      </div>
    </div>
  );
};

export default ParticleMorph;
