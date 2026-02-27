"use client";
import React, { useRef, useState, useEffect } from "react";

const FadeInFromBottom = ({ children, className = "", style = {} }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const combinedStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    display: "inline-block", 
    ...style,
  };

  return (
    <span ref={ref} className={className} style={combinedStyle}>
      {children}
    </span>
  );
};

export default FadeInFromBottom;
