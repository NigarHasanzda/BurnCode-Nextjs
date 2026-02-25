"use client";

import React, { useState } from "react";

const ContactMapSection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="py-[100px] px-6">
      <div className="max-w-[1320px] mx-auto rounded-[40px] overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3039.102777733126!2d49.8511237760094!3d40.38441467144485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDIzJzAzLjkiTiA0OcKwNTEnMTMuMyJF!5e0!3m2!1str!2saz!4v1772022049746!5m2!1str!2saz"
          width="100%"
          height="400"
          style={{
            border: 0,
            filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
            transition: "filter 0.5s",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default ContactMapSection;