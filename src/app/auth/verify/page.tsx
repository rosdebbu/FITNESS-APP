"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronLeft } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const numpadRef = useRef<HTMLDivElement>(null);

  // Initialize with some code so it looks like the design image
  const [code, setCode] = useState<string[]>(["3", "6", "9", "0"]);
  
  // Animation on load
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        contentRef.current?.children ? Array.from(contentRef.current.children) : [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }
      )
      .fromTo(
        numpadRef.current?.children ? Array.from(numpadRef.current.children) : [],
        { scale: 0.9, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, stagger: 0.02 },
        "-=0.3"
      );
  }, []);

  const handleNumpadClick = (value: string) => {
    if (value === "del") {
      setCode(prev => {
        const newCode = [...prev];
        for (let i = 3; i >= 0; i--) {
          if (newCode[i] !== "") {
            newCode[i] = "";
            break;
          }
        }
        return newCode;
      });
    } else if (value !== "-") {
      setCode(prev => {
        const newCode = [...prev];
        for (let i = 0; i < 4; i++) {
          if (newCode[i] === "") {
            newCode[i] = value;
            break;
          }
        }
        return newCode;
      });
    }
  };

  const handleContinue = () => {
    // Placeholder for next screen routing
  };

  const numpadKeys = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "-", "0", "del"
  ];

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

      <div className="flex-1 flex flex-col px-6 pt-16 pb-8 h-full">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#1c1c1e] flex items-center justify-center transition-transform active:scale-90 mb-6 flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5 text-[#8e8e93]" strokeWidth={2} />
        </button>

        <div ref={contentRef} className="flex flex-col flex-shrink-0">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-white text-[28px] font-bold tracking-tight">Verification Email</h1>
            <p className="text-[#8e8e93] text-[15px] mt-2 leading-relaxed">
              Please enter the code we sent to your email address
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-4 mb-4 px-2">
            {[0, 1, 2, 3].map((index) => (
              <div 
                key={index}
                className={`w-[65px] h-[65px] rounded-[14px] flex items-center justify-center text-[28px] text-white font-medium transition-colors duration-300 ${code[index] ? 'border-[#C2E03A]/60 bg-[#121212]' : 'border-[#333] bg-[#121212]'} border-[1.5px]`}
              >
                {code[index]}
              </div>
            ))}
          </div>

          {/* Resend Timer */}
          <div className="flex justify-center mb-10">
            <p className="text-[#8e8e93] text-[13px]">
              Didn't receive code? Resend in <span className="text-[#C2E03A]">4:58</span>
            </p>
          </div>

          {/* Continue Button */}
          <button 
            onClick={() => router.push('/onboarding/gender')}
            className="w-full h-[52px] bg-[#C2E03A] text-black font-semibold text-[16px] rounded-full active:scale-[0.98] transition-transform shadow-[0_0_15px_rgba(194,224,58,0.2)]"
          >
            Continue
          </button>
        </div>

        {/* Space filler to push numpad down */}
        <div className="flex-1 min-h-[20px]"></div>

        {/* Numpad */}
        <div ref={numpadRef} className="grid grid-cols-3 gap-x-6 gap-y-4 px-4 pb-2">
          {numpadKeys.map((key, idx) => (
            <button
              key={idx}
              onClick={() => handleNumpadClick(key)}
              className="h-[60px] rounded-[14px] bg-[#333333]/60 hover:bg-[#444] active:bg-[#555] active:scale-[0.97] flex items-center justify-center text-white text-[24px] font-medium transition-all"
            >
              {key === "del" ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                  <line x1="18" y1="9" x2="12" y2="15"></line>
                  <line x1="12" y1="9" x2="18" y2="15"></line>
                </svg>
              ) : key === "-" ? (
                <span className="text-[#8e8e93]">-</span>
              ) : (
                key
              )}
            </button>
          ))}
        </div>

      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
