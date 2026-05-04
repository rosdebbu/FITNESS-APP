"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";

export default function GenderPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const maleBtnRef = useRef<HTMLButtonElement>(null);
  const femaleBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  // Default to female selected to match the 8th design image perfectly
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | null>("female");

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      )
      .fromTo(
        [maleBtnRef.current, femaleBtnRef.current],
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
        "-=0.2"
      )
      .fromTo(
        nextBtnRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4 },
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

      <div className="flex-1 flex flex-col px-6 pt-24 pb-8 h-full relative">
        
        {/* Header */}
        <div ref={contentRef} className="text-center mb-10 px-2 mt-4">
          <h1 className="text-white text-[26px] font-bold tracking-tight mb-3">Tell us about yourself !</h1>
          <p className="text-[#8e8e93] text-[15px] leading-relaxed px-4">
            To give you a better experience we need to know your gender
          </p>
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col items-center justify-center gap-10 flex-1 pb-16">
          
          {/* Male Button */}
          <button
            ref={maleBtnRef}
            onClick={() => setSelectedGender("male")}
            className={`w-[190px] h-[190px] rounded-full flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
              selectedGender === "male" 
                ? "bg-[#C2E03A] shadow-[0_0_30px_rgba(194,224,58,0.2)]" 
                : "bg-[#2A2A2A] hover:bg-[#333]"
            }`}
          >
            <svg 
              width="65" 
              height="65" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={selectedGender === "male" ? "black" : "white"} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mt-2"
            >
              <circle cx="10" cy="14" r="7"></circle>
              <line x1="21" y1="3" x2="15" y2="9"></line>
              <polyline points="16 3 21 3 21 8"></polyline>
            </svg>
            <span className={`text-[18px] font-medium ${selectedGender === "male" ? "text-black" : "text-white"}`}>
              Male
            </span>
          </button>

          {/* Female Button */}
          <button
            ref={femaleBtnRef}
            onClick={() => setSelectedGender("female")}
            className={`w-[190px] h-[190px] rounded-full flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
              selectedGender === "female" 
                ? "bg-[#C2E03A] shadow-[0_0_30px_rgba(194,224,58,0.2)]" 
                : "bg-[#2A2A2A] hover:bg-[#333]"
            }`}
          >
            <svg 
              width="65" 
              height="65" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={selectedGender === "female" ? "black" : "white"} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mt-2"
            >
              <circle cx="12" cy="10" r="7"></circle>
              <line x1="12" y1="17" x2="12" y2="23"></line>
              <line x1="9" y1="20" x2="15" y2="20"></line>
            </svg>
            <span className={`text-[18px] font-medium ${selectedGender === "female" ? "text-black" : "text-white"}`}>
              Female
            </span>
          </button>

        </div>

        {/* Next Button */}
        <div className="absolute bottom-12 right-6 flex justify-end">
          <button 
            ref={nextBtnRef}
            onClick={() => router.push('/onboarding/height')}
            className="h-[52px] pl-6 pr-5 bg-[#C2E03A] text-black font-semibold text-[17px] rounded-full flex items-center justify-center gap-1 active:scale-[0.96] transition-transform shadow-[0_0_15px_rgba(194,224,58,0.2)]"
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
