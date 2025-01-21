"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Typewriter from "typewriter-effect";

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <>
      <section
        ref={containerRef}
        id="about"
        className="min-h-[100vh] flex flex-col justify-center items-center text-center px-4 pt-20"
      >
        <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
          Hi, I&apos;m Mithun U
        </h1>
        <div className="hero-text text-xl md:text-2xl lg:text-3xl text-primary-muted mb-8">
          <Typewriter
            options={{
              strings: [
                "Application Developer",
                "React Enthusiast",
                "Next.js Expert",
                "Avg. BTech Student",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </div>
        <p className="hero-text max-w-2xl text-accent-light text-lg md:text-xl mb-8">
          A passionate developer from Bengaluru, India, specializing in creating
          modern and performant web applications
        </p>
        <div className="hero-text flex gap-6">
          <a
            href="https://linkedin.com/in/mithun-u750"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-main rounded-lg hover:opacity-90 transition-opacity"
          >
            Connect with me
          </a>
          <a
            href="mailto:mail4mithun.u@gmail.com"
            className="px-6 py-3 border border-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            Contact me
          </a>
        </div>
      </section>
    </>
  );
}
