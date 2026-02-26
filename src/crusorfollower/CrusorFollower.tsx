"use client";
import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  // Next.js-də SSR xətası almamaları üçün mounted yoxlaması
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const moveHandler = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Əgər hover olunan element kliklənə biləndirsə (pointer), dot-u gizlət və ya kiçilt
      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === "pointer";
      setVisible(!isPointer);
    };

    const animate = () => {
      // 0.15 rəqəmi dotun mousu nə qədər "gecikmə ilə" izləyəcəyini təyin edir (smooth effect)
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX - 6}px, ${currentY - 6}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveHandler);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      cancelAnimationFrame(animationFrame);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-[#5D56F1] rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        willChange: "transform", // Performans üçün
      }}
    />
  );
}