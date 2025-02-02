"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "A" ||
        (e.target as HTMLElement).tagName === "BUTTON"
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />
      <div
        className={`cursor-ring ${isHovered ? "hover" : ""}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />
    </>
  );
}
