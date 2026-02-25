"use client";

import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { MessageService } from "@/services/SendMessage";
import { getContactInfo } from "@/services/Contact";

const messageService = new MessageService();

interface ContactInfo {
  facebook_page: string;
  instagram_page: string;
  linkedin_page: string;
  twitter_page: string;
}

const socialIcons = [
  { name: "facebook_page", Icon: FacebookIcon },
  { name: "instagram_page", Icon: InstagramIcon },
  { name: "linkedin_page", Icon: LinkedInIcon },
  { name: "twitter_page", Icon: TwitterIcon },
];

const ContactFormSection = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContactInfo();
        setContact(data);
      } catch (err) {
        console.error("Contact məlumatı alınmadı:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Xəta baş verdi. Zəhmət olmasa, bütün sahələri düzgün doldurun."
      );
    }
  };

  if (loading) {
    return (
      <section className="py-12 ">
        <div className="max-w-[80%] mx-auto">
          <p className="text-center text-gray-400 py-20">Yüklənir...</p>
        </div>
      </section>
    );
  }

  return (
  <section className="pt-19 pb-3 px-4">
  <div className="max-w-full md:max-w-[70%] mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-12">
    
    {/* Left Side */}
    <div className="w-full flex flex-col justify-center items-center md:items-start md:w-[49%] pt-8 md:pt-16 lg:pt-40">
      <span className="text-[#635BFF] font-[600] text-[15px] block mb-2">
        Contact Us
      </span>

      <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-[600] text-[#1a1a2e] leading-[1.1] mb-12 text-center md:text-left">
        Get in touch with us today
      </h2>

      <h3 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#1a1a2e] mb-6 text-center md:text-left">
        Follow Us:
      </h3>

      <div className="flex gap-3 justify-center md:justify-start">
        {socialIcons.map(({ name, Icon }, idx) => {
          const url = contact?.[name as keyof ContactInfo];
          if (!url || url === "#") return null;
          return (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#635BFF] flex items-center justify-center text-white hover:opacity-90 transition-all shadow-md hover:scale-110"
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </div>

    {/* Right Side - Form */}
    <div className="w-full md:w-[55%] bg-[#F8F9FF] rounded-[45px] p-6 sm:p-8 lg:p-14 border border-white/50 shadow-sm">
      <form onSubmit={submitForm} className="space-y-4">
        {success && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            className="mb-4 rounded-xl"
          >
            Message sent!
          </Alert>
        )}

        {error && (
          <Alert severity="error" className="mb-4 rounded-xl">
            {error}
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            onChange={handleChange}
            value={formData.firstName}
            className="bg-white p-4 h-14 rounded-[12px] outline-none focus:ring-1 focus:ring-[#635BFF]"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            onChange={handleChange}
            value={formData.lastName}
            className="bg-white p-4 h-14 rounded-[12px] outline-none focus:ring-1 focus:ring-[#635BFF]"
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          required
          onChange={handleChange}
          value={formData.phone}
          className="w-full bg-white p-4 h-14 rounded-[12px] outline-none focus:ring-1 focus:ring-[#635BFF]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={formData.email}
          className="w-full bg-white p-4 h-14 rounded-[12px] outline-none focus:ring-1 focus:ring-[#635BFF]"
        />

        <textarea
          name="message"
          rows={5}
          placeholder="Message"
          required
          onChange={handleChange}
          value={formData.message}
          className="w-full bg-white p-4 rounded-[12px] outline-none focus:ring-1 focus:ring-[#635BFF] resize-none"
        />

        <button
          type="submit"
          className="mt-2 bg-[#635BFF] text-white px-8 py-4 rounded-[15px] font-bold hover:bg-[#5249e6] transition-all uppercase text-[13px]"
        >
          Send A Message
        </button>
      </form>
    </div>
  </div>
</section>
  );
};

export default ContactFormSection;