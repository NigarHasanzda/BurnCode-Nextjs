"use client";

import React, { useState } from "react";

import { MessageService } from "@/services/SendMessage";
import ContactCards from "@/components/_contactsections/ContactPage";
import ContactFormSection from "@/components/_contactsections/ContactFormSection";
import ContactMapSection from "@/components/_contactsections/ContactMap";

const ContactPage = () => {
  const [hovered, setHovered] = useState(false);


  return (
    <div className="min-h-screen font-sans antialiased">
   <ContactCards/>
<ContactFormSection/>
<ContactMapSection/>
    </div>
  );
};

export default ContactPage;