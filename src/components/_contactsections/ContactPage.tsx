"use client";

import { getContactInfo } from "@/services/Contact";
import { useEffect, useState } from "react";
// MUI İkonları import edildi
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import SendIcon from '@mui/icons-material/Send';

interface ContactInfo {
  location: string; 
  phone: string;
  email: string;
}

export default function ContactCards() {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContactInfo();
        setContact(data);
      } catch (error) {
        console.error("Contact məlumatı alınmadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Yüklənir...</p>;
  }

  return (
    <section className="pt-12 pb-12 px-4 md:px-6">
      <div className="max-w-full md:max-w-[70%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Address */}
        <div className="bg-[#F8F9FF] rounded-[35px] p-8 md:p-10 border-none flex flex-col">
          <div className="flex items-center justify-between border-b border-gray-200/60 pb-5 mb-5">
            <h2 className="text-[24px] font-[500] text-[#1e1e30]">Address</h2>
            <div className="bg-[#635BFF] w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
              <LocationOnIcon sx={{ color: 'white', fontSize: 26 }} />
            </div>
          </div>
          <p className="text-[#6b6b84] text-[16px] leading-[1.6] font-medium">
            {contact?.location}
          </p>
        </div>

        {/* Phone */}
        <div className="bg-[#F8F9FF] rounded-[35px] p-8 md:p-9 border-none flex flex-col">
          <div className="flex items-center justify-between border-b border-gray-200/60 pb-5 mb-5">
            <h2 className="text-[24px] font-[500] text-[#1e1e30]">Call Now</h2>
            <div className="bg-[#635BFF] w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
              <PhoneInTalkIcon sx={{ color: 'white', fontSize: 26 }} />
            </div>
          </div>
          <p className="text-[#6b6b84] text-[16px] font-medium">
            {contact?.phone}
          </p>
        </div>

        {/* Email */}
        <div className="bg-[#F8F9FF] rounded-[35px] p-8 md:p-9 border-none flex flex-col">
          <div className="flex items-center justify-between border-b border-gray-200/60 pb-5 mb-5">
            <h2 className="text-[24px] font-[500] text-[#1e1e30]">Email Us</h2>
            <div className="bg-[#635BFF] w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
              <SendIcon sx={{ color: 'white', fontSize: 26, transform: 'rotate(-45deg)', mb: 0.5, ml: 0.7 }} />
            </div>
          </div>
          <p className="text-[#6b6b84] text-[16px] font-medium">
            {contact?.email}
          </p>
        </div>

      </div>
    </section>
  );
}