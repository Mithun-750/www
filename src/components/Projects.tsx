"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import projectsData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const elements = gsap.utils.toArray<HTMLElement>(".project-card");
      elements.forEach((element) => {
        gsap.from(element, {
          y: 100,
          opacity: 0,
          duration: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="projects" className="py-20 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-accent bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.projects.map((project, index) => (
            <div
              key={index}
              className="project-card group bg-secondary p-4 rounded-xl overflow-hidden transition-transform hover:scale-105 flex flex-col"
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-primary-muted mb-4">{project.description}</p>
              <div className="flex gap-4 mt-auto justify-end">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-main rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    View Live
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-primary rounded-lg hover:bg-primary/10 transition-colors text-sm"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
