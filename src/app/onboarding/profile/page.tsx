"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Edit2 } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
      .fromTo(
        formRef.current?.children ? Array.from(formRef.current.children) : [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
        "-=0.2"
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="mobile-screen bg-[#0A0A0A] flex flex-col relative overflow-hidden"
      style={{ height: "100dvh", opacity: 0 }}
    >
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 pt-3 pb-2">
        <span className="text-white text-sm font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
            <rect x="0" y="6" width="3" height="6" rx="0.5" opacity="0.4" />
            <rect x="4.5" y="4" width="3" height="8" rx="0.5" opacity="0.6" />
            <rect x="9" y="2" width="3" height="10" rx="0.5" opacity="0.8" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white" className="ml-1">
            <path d="M8 3C10.7 3 13.1 4.1 14.8 5.9L16 4.7C14 2.6 11.2 1.3 8 1.3S2 2.6 0 4.7L1.2 5.9C2.9 4.1 5.3 3 8 3Z" opacity="0.3" />
            <path d="M8 6.5C9.8 6.5 11.4 7.2 12.5 8.4L13.7 7.2C12.3 5.7 10.3 4.8 8 4.8S3.7 5.7 2.3 7.2L3.5 8.4C4.6 7.2 6.2 6.5 8 6.5Z" opacity="0.6" />
            <path d="M8 10C8.9 10 9.7 10.4 10.3 10.9L8 13.5L5.7 10.9C6.3 10.4 7.1 10 8 10Z" />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="white" className="ml-1">
            <rect x="0" y="1" width="21" height="10" rx="2" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
            <rect x="1.5" y="2.5" width="16" height="7" rx="1" fill="white" />
            <rect x="22" y="4" width="2" height="4" rx="0.5" fill="white" opacity="0.4" />
          </svg>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-20 pb-8 h-full relative z-10">
        
        {/* Header */}
        <div ref={contentRef} className="text-center mb-8">
          <h1 className="text-white text-[26px] font-bold tracking-tight mb-2">Fill Your Profile</h1>
          <p className="text-[#8e8e93] text-[15px] leading-relaxed">
            Don't worry. you can always change it later
          </p>
          
          {/* Profile Picture */}
          <div className="relative w-[140px] h-[140px] mx-auto mt-10 mb-6">
            <div className="w-full h-full rounded-full overflow-hidden relative border border-[#333]">
              <Image 
                src="/images/profile_avatar.png" 
                alt="Profile" 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Edit Icon Badge */}
            <button className="absolute bottom-2 right-0 w-[30px] h-[30px] bg-[#C2E03A] rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.5)] active:scale-90 transition-transform">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div ref={formRef} className="flex flex-col gap-4">
          <div className="w-full h-[56px] bg-[#1C1C1E] rounded-[16px] px-5 flex items-center focus-within:ring-1 focus-within:ring-[#C2E03A] transition-shadow">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-transparent text-white text-[15px] outline-none placeholder:text-[#666666]"
            />
          </div>
          
          <div className="w-full h-[56px] bg-[#1C1C1E] rounded-[16px] px-5 flex items-center focus-within:ring-1 focus-within:ring-[#C2E03A] transition-shadow">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent text-white text-[15px] outline-none placeholder:text-[#666666]"
            />
          </div>

          <div className="w-full h-[56px] bg-[#1C1C1E] rounded-[16px] px-5 flex items-center focus-within:ring-1 focus-within:ring-[#C2E03A] transition-shadow">
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="w-full bg-transparent text-white text-[15px] outline-none placeholder:text-[#666666]"
            />
          </div>
        </div>

        <div className="flex-1"></div>

        {/* Bottom Nav */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => router.back()}
            className="w-[52px] h-[52px] rounded-full bg-[#2A2A2A] hover:bg-[#333] flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 text-[#e5e5e5]" strokeWidth={2} />
          </button>

          <button 
            onClick={() => router.push('/onboarding/activity')}
            className="h-[52px] pl-8 pr-6 bg-[#C2E03A] text-black font-semibold text-[17px] rounded-full flex items-center justify-center gap-1 active:scale-[0.96] transition-transform shadow-[0_0_15px_rgba(194,224,58,0.2)]"
          >
            Next
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
