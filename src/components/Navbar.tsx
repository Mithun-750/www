"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isMenuOpen) setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  useGSAP(() => {
    gsap.from(".nav-link", {
      y: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      if (menuRef.current) {
        gsap.fromTo(
          menuRef.current,
          {
            opacity: 0,
            y: -10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".mobile-nav-link",
          {
            opacity: 0,
            y: -5,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            stagger: 0.05,
          }
        );
      }
    } else {
      if (menuRef.current) {
        gsap.to(menuRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setIsMenuOpen(false),
        });
      }
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href) {
      toggleMenu();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-secondary-deep/80 backdrop-blur-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="nav-link text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent"
          >
            Mithun U
          </Link>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8">
              {["Skills", "Projects", "Timeline"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              onClick={toggleMenu}
              className="md:hidden text-accent-light hover:text-primary transition-colors relative"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          ref={menuRef}
          className={`md:hidden absolute right-4 top-full mt-2 py-2 px-4 bg-secondary-deep/95 backdrop-blur-sm rounded-lg shadow-lg ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-3">
            {["Skills", "Projects", "Timeline"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={handleMobileNavClick}
                className="mobile-nav-link text-sm font-medium text-accent-light hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
