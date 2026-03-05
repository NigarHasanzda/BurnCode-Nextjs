"use client";

export default function ContactFormLoading() {
  return (
    <section className="pt-19 pb-3 px-4">
      <div className="max-w-full md:max-w-[70%] mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-12">

        <div className="w-full flex flex-col justify-center items-center md:items-start md:w-[40%] pt-8 md:pt-16 lg:pt-40 animate-pulse">
          <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="h-8 w-64 bg-gray-300 rounded mb-6"></div>
          <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-12 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[55%] bg-[#F8F9FF] rounded-[45px] p-6 sm:p-8 lg:p-14 border border-white/50 shadow-sm animate-pulse">
          <div className="space-y-4">
           
            <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>

       
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-14 bg-gray-300 rounded-[12px]"></div>
              <div className="h-14 bg-gray-300 rounded-[12px]"></div>
            </div>

            <div className="h-14 bg-gray-300 rounded-[12px] w-full"></div>
            <div className="h-14 bg-gray-300 rounded-[12px] w-full"></div>
            <div className="h-28 bg-gray-300 rounded-[12px] w-full"></div>
            <div className="h-12 bg-[#635BFF] rounded-[15px] w-32 mt-2"></div>
          </div>
        </div>

      </div>
    </section>
  );
}