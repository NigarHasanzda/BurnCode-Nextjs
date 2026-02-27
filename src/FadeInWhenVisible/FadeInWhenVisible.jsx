import React from "react";
import { motion } from "framer-motion";

export default function FadeInRightWhenVisible({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}         
      whileInView={{ opacity: 1, x: 0 }}   
      transition={{ duration: 1 }}           
      viewport={{ once: true, amount: 0.2 }}  
    >
      {children}
    </motion.div>
  );
}
