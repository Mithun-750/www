"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import timeline from "@/data/timeline.json";

export default function Log() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".log-entry", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Animate the cursor for ongoing items
      gsap.to(".status-cursor", {
        opacity: 0,
        duration: 0.75,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="min-h-screen py-20 px-4 md:px-8 w-full relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-accent bg-clip-text text-transparent">
          $ timeline
        </h2>
        <div className="font-mono space-y-8 relative">
          {/* Connecting Line */}
          <div className="absolute left-[27px] md:left-[120px] top-8 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />

          {timeline.logs.map((log, index) => (
            <div
              key={index}
              className="log-entry group relative bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-slate-800 hover:border-primary/50 transition-colors"
            >
              {/* Dot on the timeline */}
              <div
                className={`absolute left-[-35px] md:left-[-42px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-colors ${
                  log.status === "ongoing"
                    ? "bg-green-500/50 group-hover:bg-green-500"
                    : "bg-primary/50 group-hover:bg-primary"
                }`}
                style={{
                  boxShadow:
                    log.status === "ongoing"
                      ? "0 0 10px rgba(34, 197, 94, 0.3)"
                      : "0 0 10px rgba(147, 51, 234, 0.3)",
                }}
              />

              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                <div className="text-slate-400 whitespace-nowrap md:w-36">
                  {`[${log.period}]`}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">❯</span>
                    <span className="text-accent">{log.title}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-slate-500 mr-2">❯</span>
                    <span className="text-slate-300">{log.organization}</span>
                    {log.link && (
                      <a
                        href={log.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-primary/80 hover:text-primary transition-colors"
                      >
                        {`{ visit }`}
                      </a>
                    )}
                  </div>
                  {log.status === "ongoing" && (
                    <div className="flex items-start text-green-400 opacity-90">
                      <span className="text-slate-500 mr-2">❯</span>
                      <span>
                        status:{" "}
                        <span className="text-green-400">
                          &quot;active&quot;
                        </span>
                        <span className="status-cursor ml-1">█</span>
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className={`px-4 py-1.5 rounded text-xs uppercase tracking-wider whitespace-nowrap ${
                    log.type === "internship"
                      ? "bg-blue-500/10 text-blue-400"
                      : log.type === "club-activity"
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >
                  {log.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
