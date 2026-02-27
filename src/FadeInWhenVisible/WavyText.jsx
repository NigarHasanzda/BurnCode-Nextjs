"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function WavyText({ text, delay = 0, gradient = false }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span>{text}</span>;

  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.div
      style={{ display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={gradient ? "bg-gradient-to-r from-[#9A58D9] to-[#fefdff] bg-clip-text text-transparent" : ""}
    >
      {letters.map((char, index) =>
        gradient ? (
          <motion.div
            key={index}
            variants={child}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.div>
        ) : (
          <motion.span
            key={index}
            variants={child}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        )
      )}
    </motion.div>
  );
}
