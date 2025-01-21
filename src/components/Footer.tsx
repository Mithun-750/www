"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { FaInstagram, FaDiscord, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".footer-content",
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  const handleDiscordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const discordId = "727781533498212392";
    navigator.clipboard.writeText(discordId);

    if (copyRef.current) {
      copyRef.current.style.left = `${e.clientX}px`;
      copyRef.current.style.top = `${e.clientY}px`;
      
      gsap.timeline()
        .fromTo(
          copyRef.current,
          { 
            opacity: 0,
            scale: 0.5,
            y: 0
          },
          { 
            opacity: 1,
            scale: 1,
            y: -20,
            duration: 0.2,
            ease: "back.out(2)"
          }
        )
        .to(copyRef.current, {
          y: -40,
          opacity: 0,
          duration: 0.3,
          delay: 0.3,
          ease: "power2.in"
        });
    }
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/Mithun-750",
      label: "GitHub",
      onClick: undefined,
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/mithun-u-b19110266",
      label: "LinkedIn",
      onClick: undefined,
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/mithun_0018",
      label: "Instagram",
      onClick: undefined,
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/MithunU750",
      label: "X (Twitter)",
      onClick: undefined,
    },
    {
      icon: FaDiscord,
      href: "#",
      label: "Discord",
      onClick: handleDiscordClick,
    },
  ];

  return (
    <>
      <div
        ref={copyRef}
        className="fixed pointer-events-none z-50 flex items-center gap-1.5 bg-secondary-deep text-accent-light px-3 py-1.5 rounded-full text-sm font-medium opacity-0 shadow-lg"
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      >
        <FaCheck className="w-3.5 h-3.5" />
        <span>Copied!</span>
      </div>
      <footer
        ref={containerRef}
        className="w-full bg-background/50 backdrop-blur-sm border-t border-border mt-20"
      >
        <div className="footer-content max-w-7xl mx-auto py-16 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <h3 className="text-xl font-semibold bg-gradient-accent bg-clip-text text-transparent">
                Connect & Collaborate
              </h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                Available for professional opportunities
              </p>
            </div>

            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={social.onClick}
                  className="group relative p-2"
                  aria-label={social.label}
                >
                  <div className="absolute -inset-2 rounded-lg bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>

            <div className="text-center md:text-right">
              <a
                href="mailto:mail4mithun.u@gmail.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                mail4mithun.u@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
