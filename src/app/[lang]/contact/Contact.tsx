"use client";

import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { MessageService } from "@/services/SendMessage";

const messageService = new MessageService();

const ContactPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
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

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const messageData = {
      name: formData.firstName.trim(),
      surname: formData.lastName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      body: formData.message.trim(),
    };

    try {
      await messageService.sendMessage(messageData);
      setSuccess(true);
      setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Xəta baş verdi. Zəhmət olmasa, bütün sahələri düzgün doldurun."
      );
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased">
      
      {/* 1. Üst Məlumat Kartları */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Address */}
          <div className="bg-[#F8F9FF] rounded-[35px] p-8 shadow-sm border border-white/50">
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-5 mb-5">
              <h2 className="text-[24px] font-bold text-[#1e1e30]">Address</h2>
              <div className="bg-[#635BFF] w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
            </div>
            <p className="text-[#6b6b84] text-[16px] leading-[1.6] font-medium">
              44 Jafar Jabbarly Ave. Baku,<br />Azerbaijan, AZ1065, Caspian Plaza
            </p>
          </div>

          {/* Phone */}
          <div className="bg-[#F8F9FF] rounded-[35px] p-8 shadow-sm border border-white/50">
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-5 mb-5">
              <h2 className="text-[24px] font-bold text-[#1e1e30]">Call Now</h2>
              <div className="bg-[#635BFF] w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
            </div>
            <p className="text-[#6b6b84] text-[16px] font-medium">+994508683623</p>
          </div>

          {/* Email */}
          <div className="bg-[#F8F9FF] rounded-[35px] p-8 shadow-sm border border-white/50">
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-5 mb-5">
              <h2 className="text-[24px] font-bold text-[#1e1e30]">Email Us</h2>
              <div className="bg-[#635BFF] w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
                <svg className="w-5 h-5 text-white -rotate-45" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              </div>
            </div>
            <p className="text-[#6b6b84] text-[16px] font-medium">info@burncode.org</p>
          </div>

        </div>
      </section>

      {/* 2. Form Section */}
      <section className="py-12 px-6">
        <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-start gap-12">
          <div className="w-full lg:w-[45%] lg:pt-10">
            <span className="text-[#635BFF] font-semibold text-[15px] block mb-2">Contact Us</span>
            <h2 className="text-[48px] lg:text-[56px] font-extrabold text-[#1a1a2e] leading-[1.1] mb-12">
              Get in touch with us today
            </h2>
            <h3 className="text-[32px] font-bold text-[#1a1a2e] mb-6">Follow Us:</h3>
            <div className="flex gap-3">
              {[
                { icon: <FacebookIcon />, color: "#635BFF" },
                { icon: <InstagramIcon />, color: "#635BFF" },
                { icon: <LinkedInIcon />, color: "#635BFF" },
                { icon: <TwitterIcon />, color: "#635BFF" }
              ].map((item, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-full bg-[#635BFF] flex items-center justify-center text-white hover:opacity-90 transition-all text-lg shadow-md">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[55%] bg-[#F8F9FF] rounded-[45px] p-8 lg:p-14 border border-white/50 shadow-sm">
            <form onSubmit={submitForm} className="space-y-4">
              {success && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="mb-4 rounded-xl">
                  Message sent!
                </Alert>
              )}
              {error && (
                <Alert severity="error" className="mb-4 rounded-xl">
                  {error}
                </Alert>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" name="firstName" placeholder="First Name" required 
                  onChange={handleChange}
                  value={formData.firstName}
                  className="bg-white p-4 h-14 rounded-[12px] border-none outline-none focus:ring-1 focus:ring-[#635BFF] text-[#6b6b84] placeholder:text-gray-400 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" 
                />
                <input 
                  type="text" name="lastName" placeholder="Last Name" required 
                  onChange={handleChange}
                  value={formData.lastName}
                  className="bg-white p-4 h-14 rounded-[12px] border-none outline-none focus:ring-1 focus:ring-[#635BFF] text-[#6b6b84] placeholder:text-gray-400 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" 
                />
              </div>
              <input 
                type="tel" name="phone" placeholder="Phone" required 
                onChange={handleChange}
                value={formData.phone}
                className="w-full bg-white p-4 h-14 rounded-[12px] border-none outline-none focus:ring-1 focus:ring-[#635BFF] text-[#6b6b84] placeholder:text-gray-400 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" 
              />
              <input 
                type="email" name="email" placeholder="Email" required 
                onChange={handleChange}
                value={formData.email}
                className="w-full bg-white p-4 h-14 rounded-[12px] border-none outline-none focus:ring-1 focus:ring-[#635BFF] text-[#6b6b84] placeholder:text-gray-400 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" 
              />
              <textarea 
                name="message" rows={5} placeholder="Message" required 
                onChange={handleChange}
                value={formData.message}
                className="w-full bg-white p-4 rounded-[12px] border-none outline-none focus:ring-1 focus:ring-[#635BFF] text-[#6b6b84] placeholder:text-gray-400 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] resize-none"
              ></textarea>
              
              <button type="submit" className="mt-2 bg-[#635BFF] text-white px-8 py-4 rounded-[15px] font-bold flex items-center gap-2 hover:bg-[#5249e6] transition-all shadow-lg shadow-indigo-100 uppercase text-[13px] tracking-wide">
                Send A Message 
                <svg className="w-4 h-4 rotate-[-45deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-[100px] px-6">
        <div className="max-w-[1320px] mx-auto rounded-[40px] overflow-hidden">
          <iframe
           src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1118.2971876552724!2d49.85965320218423!3d40.38275021439456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2saz!4v1771497777498!5m2!1str!2saz" width="100%"
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