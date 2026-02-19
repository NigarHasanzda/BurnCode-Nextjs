"use client";

import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const ContactPage = () => {
  const [hovered, setHovered] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
    setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="bg-white">
      {/* 1. Üst Məlumat Kartları */}
      <section className="py-[100px] px-6">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Address */}
          <div className="bg-[#f3f4f6] rounded-[40px] p-10">
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-[26px] font-bold text-[#1a1a2e]">Address</h2>
              <div className="bg-[#5e5ce6] w-[60px] h-[60px] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
            </div>
            <p className="text-[#555] text-lg leading-relaxed max-w-[280px]">
              Baku, Azerbaijan, Nizami str. 123
            </p>
          </div>

          {/* Phone */}
          <div className="bg-[#f3f4f6] rounded-[40px] p-10">
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-[26px] font-bold text-[#1a1a2e]">Call Now</h2>
              <a href="tel:+994500000000" className="bg-[#5e5ce6] w-[60px] h-[60px] rounded-full flex items-center justify-center hover:bg-[#4a48c9] transition-colors">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </a>
            </div>
            <p className="text-[#1a1a2e] text-lg font-semibold">+994 50 000 00 00</p>
          </div>

          {/* Email */}
          <div className="bg-[#f3f4f6] rounded-[40px] p-10">
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-[26px] font-bold text-[#1a1a2e]">Email Us</h2>
              <a href="mailto:info@burncode.org" className="bg-[#5e5ce6] w-[60px] h-[60px] rounded-full flex items-center justify-center hover:bg-[#4a48c9] transition-colors">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            </div>
            <p className="text-[#1a1a2e] text-lg font-semibold">info@burncode.org</p>
          </div>
        </div>
      </section>

      {/* 2. Form Section */}
      <section className="py-[50px] px-6">
        <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2">
            <span className="text-[#5e5ce6] font-bold uppercase text-sm block mb-3 tracking-widest">Contact Us</span>
            <h2 className="text-[52px] font-bold text-[#1a1a2e] leading-tight mb-10">Get in touch with us today</h2>
            
            <h3 className="text-[38px] font-bold text-[#1a1a2e] mb-6">Follow us:</h3>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'linkedin', 'twitter'].map((item) => (
                <a key={item} href="#" className="w-12 h-12 rounded-full bg-[#5e5ce6] flex items-center justify-center text-white hover:bg-white hover:text-[#5e5ce6] border-2 border-[#5e5ce6] transition-all">
                  <span className="capitalize text-xs">{item[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-[#f3f4f6] rounded-[40px] p-8 lg:p-12">
            <form onSubmit={submitForm} className="space-y-5">
              {success && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="rounded-2xl">
                  Your message has been sent successfully!
                </Alert>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#5e5ce6]" required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#5e5ce6]" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#5e5ce6]" required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#5e5ce6]" required />
              </div>
              <textarea name="message" rows={5} placeholder="Message" value={formData.message} onChange={handleChange} className="p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#5e5ce6] w-full resize-none" required></textarea>
              <button type="submit" className="bg-[#5e5ce6] text-white px-10 py-4 rounded-full font-bold hover:bg-[#4a48c9] transition-all shadow-lg shadow-indigo-100">
                Send A Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. Map Section */}
      <section className="py-[100px] px-6">
        <div className="max-w-[1320px] mx-auto rounded-[40px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.18445330314!2d49.854958!3d40.409262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d40a03531f9%3A0x759fd35191218301!2sBaku!5e0!3m2!1sen!2saz!4v1710000000000!5m2!1sen!2saz"
            width="100%"
            height="450"
            style={{ border: 0, filter: hovered ? "grayscale(0%)" : "grayscale(100%)", transition: "filter 0.5s" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;