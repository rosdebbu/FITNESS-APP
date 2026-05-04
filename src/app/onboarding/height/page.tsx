"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function HeightPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(180);
  const [unit, setUnit] = useState<"cm" | "in">("cm");

  const minHeight = 145;
  const maxHeight = 190;

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent | PointerEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = 1 - Math.max(0, Math.min(1, y / rect.height));
    const newHeight = Math.round(minHeight + percentage * (maxHeight - minHeight));
    setHeight(newHeight);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    handlePointerMove(e);
    const onMove = (e: PointerEvent) => handlePointerMove(e);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const percentage = (height - minHeight) / (maxHeight - minHeight);

  // Generate ruler ticks correctly from max to min
  const ticks = [];
  for (let i = maxHeight; i >= minHeight; i--) {
    ticks.push(i);
  }

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

      <div className="flex-1 flex flex-col pt-16 pb-8 h-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-6 px-6">
          <h1 className="text-white text-[24px] font-bold tracking-tight mb-2">What is Your Height?</h1>
          <p className="text-[#8e8e93] text-[13px] leading-relaxed max-w-[260px] mx-auto">
            Height in cm. Don't worry, you can always change it later
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="px-6 mb-6">
          <div className="flex items-center w-[160px] h-[40px] bg-transparent border border-white/30 rounded-full p-1">
            <button 
              onClick={() => setUnit("in")}
              className={`flex-1 h-full rounded-full text-[14px] font-medium transition-colors ${unit === "in" ? "bg-[#C2E03A] text-black" : "text-white"}`}
            >
              Inches
            </button>
            <button 
              onClick={() => setUnit("cm")}
              className={`flex-1 h-full rounded-full text-[14px] font-medium transition-colors ${unit === "cm" ? "bg-[#C2E03A] text-black" : "text-white"}`}
            >
              cm
            </button>
          </div>
        </div>

        {/* Main Interactive Area */}
        <div className="flex-1 relative flex overflow-hidden">
          
          {/* Avatar and Line Area */}
          <div className="flex-1 relative flex justify-center items-end">
            {/* Avatar Platform */}
            <div className="w-[200px] h-[36px] bg-[#E5E5E5] rounded-[50%] absolute bottom-4 shadow-inner"></div>
            
            {/* Avatar Image */}
            <div className="absolute bottom-6 w-[200px] h-[360px] pointer-events-none">
              <Image src="/images/height_avatar.png" alt="Avatar" fill style={{ objectFit: 'contain', objectPosition: 'bottom center' }} />
            </div>

            {/* Track overlay mapping to ruler exactly */}
            <div 
              ref={trackRef}
              onPointerDown={handlePointerDown}
              className="absolute top-4 bottom-4 left-0 right-[-100px] z-20 touch-none cursor-pointer"
            >
              {/* Dynamic Line Container */}
              <div 
                className="absolute left-6 right-[-12px] z-10 pointer-events-none flex flex-col justify-end"
                style={{ top: `${(1 - percentage) * 100}%`, transform: "translateY(-50%)" }}
              >
                {/* T-Square Ruler going up from line */}
                <div className="absolute left-[55%] -translate-x-1/2 bottom-[2px] w-[50px] flex flex-col items-center">
                  <div className="w-[18px] h-[60px] bg-[#D19A6A] border-[1.5px] border-[#8B5A2B] border-b-0 rounded-t-sm flex justify-center pt-2 pb-1 relative overflow-hidden">
                    {/* Fake wooden marks */}
                    <div className="absolute left-[3px] right-[10px] top-2 bottom-2 border-r border-[#8B5A2B]/40"></div>
                  </div>
                  <div className="w-[60px] h-[6px] bg-[#8B5A2B] rounded-sm" />
                </div>

                <div className="w-full relative flex items-center">
                  {/* Floating Number */}
                  <div className="absolute left-0 -translate-x-[110%] flex items-baseline">
                    <span className="text-white text-[32px] font-bold tracking-tight drop-shadow-md">{height}</span>
                    <span className="text-white text-[16px] ml-1 font-medium">cm</span>
                  </div>

                  {/* Neon Line */}
                  <div className="flex-1 h-[2px] bg-[#C2E03A] relative shadow-[0_0_8px_#C2E03A]" />

                  {/* Glowing Dot on right end */}
                  <div className="absolute right-0 translate-x-1/2 w-[28px] h-[28px] bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                    <div className="w-[14px] h-[14px] bg-[#C2E03A] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Ruler Area */}
          <div className="w-[100px] py-4 flex flex-col justify-between relative pointer-events-none z-0 pr-4">
            {ticks.map((tick) => {
              const isMajor = tick % 5 === 0;
              return (
                <div key={tick} className="flex-1 flex flex-col justify-center relative w-full">
                  {isMajor ? (
                    <div className="flex items-center justify-end w-full relative">
                      <span className="text-white text-[15px] absolute right-[50px]">{tick}</span>
                      <div className="w-[40px] h-[2px] bg-[#8e8e93]" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-end w-full">
                      <div className="w-[20px] h-[1.5px] bg-[#4a4a4a]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Nav */}
        <div className="flex justify-between items-center mt-6 px-6">
          <button
            onClick={() => router.back()}
            className="w-[52px] h-[52px] rounded-full bg-[#2A2A2A] hover:bg-[#333] flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
          </button>

          <button 
            onClick={() => router.push('/onboarding/weight')}
            className="h-[52px] pl-8 pr-6 bg-[#C2E03A] text-black font-semibold text-[17px] rounded-full flex items-center justify-center gap-1 active:scale-[0.96] transition-transform shadow-[0_0_15px_rgba(194,224,58,0.2)]"
          >
            Next
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
}
