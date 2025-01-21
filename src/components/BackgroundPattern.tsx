"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface CodeElement {
  left: number;
  top: number;
  rotation: number;
  text: string;
}

const codeTexts = ["code", "dev", "build", "</>", "{ }", "run", "play"];

export default function BackgroundPattern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const [codeElements, setCodeElements] = useState<CodeElement[]>([]);

  // Generate code elements on client-side only with even distribution
  useEffect(() => {
    const numElements = 12;
    const gridSize = Math.ceil(Math.sqrt(numElements));
    const cellWidth = 100 / gridSize;
    const cellHeight = 100 / gridSize;

    const elements: CodeElement[] = [];

    // Create a grid and place elements with some randomness within each cell
    for (let i = 0; i < numElements; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;

      // Add random offset within the cell (but not too close to edges)
      const offsetX = Math.random() * (cellWidth * 0.6) + cellWidth * 0.2;
      const offsetY = Math.random() * (cellHeight * 0.6) + cellHeight * 0.2;

      elements.push({
        left: col * cellWidth + offsetX,
        top: row * cellHeight + offsetY,
        rotation: Math.random() * 360,
        text: codeTexts[Math.floor(Math.random() * codeTexts.length)],
      });
    }

    setCodeElements(elements);
  }, []);

  useEffect(() => {
    if (!patternRef.current) return;

    const updateMousePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 10;
      const y = (clientY / window.innerHeight - 0.5) * 10;

      gsap.to(patternRef.current, {
        duration: 1,
        x,
        y,
        rotateX: -y * 0.5,
        rotateY: x * 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useGSAP(() => {
    const elements = gsap.utils.toArray(".grid-line");

    gsap.set(elements, {
      opacity: 0,
      scale: 0.8,
    });

    gsap.to(elements, {
      opacity: 0.15,
      scale: 1,
      duration: 1.5,
      stagger: 0.02,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <div
        ref={patternRef}
        className="absolute inset-0 transform-gpu bg-grid-pattern"
        style={{
          perspective: "1000px",
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgb(71 85 105 / 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(71 85 105 / 0.2) 1px, transparent 1px)
          `,
        }}
      >
        {/* Vertical Lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line absolute top-0 bottom-0 w-px bg-slate-600/10"
            style={{
              left: `${(i + 1) * (100 / 12)}%`,
            }}
          />
        ))}

        {/* Horizontal Lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line absolute left-0 right-0 h-px bg-slate-600/10"
            style={{
              top: `${(i + 1) * (100 / 8)}%`,
            }}
          />
        ))}

        {/* Code-like Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {codeElements.map((element, i) => (
            <div
              key={`code-${i}`}
              className="absolute text-slate-600/20 font-mono text-lg"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                transform: `rotate(${element.rotation}deg)`,
              }}
            >
              {"{"}
              <span className="text-slate-500/20">{element.text}</span>
              {"}"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
