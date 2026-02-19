import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PrimaryButton from '@/components/Button/Button';

const ChooseUsSection = () => {
  const features = [
    { id: 1, text: "Easy scalability" },
    { id: 4, text: "Immediate impact" },
    { id: 2, text: "Knowledge and expertise" },
    { id: 5, text: "Time-zone alignment" },
    { id: 3, text: "Full flexibility" },
    { id: 6, text: "Proactive support" },
  ];

  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 max-w-[1400px] mx-auto font-sans bg-white">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mb-10 md:mb-14 md:ml-[30px] text-center md:text-left">
        <h2 className="text-[26px] sm:text-[32px] md:text-[42px] font-bold text-[#1a1a2e] tracking-tight leading-tight">
          🚀 Why choose us for software development?
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-34 items-start relative">
        
        {/* Image Block */}
        <div className="relative w-full lg:w-[41%]">
          
          {/* Image */}
          <div className="rounded-[3rem] md:ml-[30px] overflow-hidden shadow-sm">
            <Image 
              src="/page-about-1.jpg" 
              alt="Team working" 
              width={700} 
              height={600}
              className="object-cover w-full h-[380px] sm:h-[450px] lg:h-[560px]"
            />
          </div>

          {/* Mobile Circle - şəkilin üstünə bir az çıxır */}
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-28 h-28 lg:hidden">
            <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
              <Image 
                src="/about-circle.png" 
                alt="Free Consultation Text" 
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Desktop Circle - əvvəlki kimi sağda */}
          <div className="absolute top-1/2 -right-24 xl:-right-30 -translate-y-1/2 hidden lg:flex items-center justify-center">
            <div className="relative w-34 h-34 xl:w-39 xl:h-39 flex items-center justify-center">
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                <Image 
                  src="/about-circle.png" 
                  alt="Free Consultation Text" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Content */}
        <div className="w-full lg:w-[46%] py-8 md:py-[60px]">
          
          <div className="space-y-6 text-[#4a4a68] leading-[1.6] text-[15px] md:text-[16px] mb-6">
            <p>
              At <span className="font-semibold text-[#1a1a2e]">Burncode</span>, we don&apos;t just build software — we create powerful digital solutions 
              that deliver results. From startups seeking to develop a Minimum Viable Product (MVP) 
              to large enterprises modernizing legacy systems, we are your trusted innovation partner.
            </p>
            <p>
              We combine cutting-edge technologies, top security standards, and a deep understanding 
              of user behavior to deliver solutions that are functional, scalable, and user-friendly. 
              From idea to execution, we bring together strategy, talent, and passion to turn your 
              vision into a market-ready product. 🚀 Let&apos;s build the future together — one line 
              of code at a time.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-8 md:mb-10">
            {features.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="bg-[#5e5ce6] rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                  <ChevronRightIcon className="text-white !text-[16px]" />
                </div>
                <span className="font-bold text-[#1a1a2e] text-[16px] md:text-[18px]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div className="inline-block">
            <PrimaryButton text="Free Consultation" path="/consultation" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
