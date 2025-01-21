"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  ["JavaScript", "ReactJS", "Node.js", "Python"],
  ["SQL", "C Programming", "Data Structures", "Express.js"],
  ["MongoDB", "Bootstrap", "Next.js", "Tailwind CSS"],
  ["MySQL", "Java", "Svelte", "WXT"],
  ["Electron.js", "OpenGL", "Solidity", "Three.js"]
];

export default function Skills() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse",
      }
    });

    // Initial state
    gsap.set(".skill-item", { 
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
    });

    // Create a modern reveal animation
    tl.to(".skill-item", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: {
        each: 0.1,
        from: "center",
        grid: "auto",
      },
      ease: "power3.out",
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="skills" className="py-20 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-accent bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {skills.flat().map((skill, index) => (
            <div
              key={index}
              className="skill-item group bg-secondary/50 backdrop-blur-sm p-4 rounded-xl text-center hover:bg-gradient-main transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <span className="text-lg font-medium group-hover:text-primary-muted transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
