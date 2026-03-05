"use client";

export default function ContactThreeLoading() {
  return (
    <section className="pt-6 md:pt-22 pb-12 md:pb-22 px-4 md:px-6">
      <div className="max-w-full md:max-w-[70%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className="bg-[#F8F9FF] rounded-[35px] p-8 md:p-10 flex flex-col animate-pulse"
          >
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-5 mb-5">
              <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
              <div className="bg-[#635BFF] w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
                <div className="h-6 w-6 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-300 rounded-md w-full mt-2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-5/6 mt-2"></div>
          </div>
        ))}

      </div>
    </section>
  );
}