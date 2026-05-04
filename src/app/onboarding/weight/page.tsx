"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WeightPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [weight, setWeight] = useState(54); // Default to 54kg as in image

  const minWeight = 30;
  const maxWeight = 150;
  const tickSpacing = 16; // pixels between each tick

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    const startX = e.clientX;
    const startWeight = weight;

    const onMove = (eMove: PointerEvent) => {
      const deltaX = eMove.clientX - startX;
      // 1 tick = 1 kg. Moving left (negative deltaX) means increasing weight.
      const ticksMoved = Math.round(-deltaX / tickSpacing);
      let newWeight = startWeight + ticksMoved;
      
      // Clamp values
      newWeight = Math.max(minWeight, Math.min(maxWeight, newWeight));
      setWeight(newWeight);
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  // Generate ticks for the dial
  const ticks = [];
  // Generate a wide range to allow scrolling
  for (let i = minWeight; i <= maxWeight; i++) {
    ticks.push(i);
  }

  return (
    <div
      ref={containerRef}
      className="mobile-screen bg-[#0A0A0A] flex flex-col relative overflow-hidden select-none"
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

      <div className="flex-1 flex flex-col pt-24 pb-8 h-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <h1 className="text-white text-[26px] font-bold tracking-tight mb-3">What's your weight ?</h1>
          <p className="text-[#8e8e93] text-[15px] leading-relaxed mx-auto">
            You can always change this later
          </p>
        </div>

        {/* Center Display */}
        <div className="flex justify-center items-baseline mb-16 relative">
          <span className="text-white text-[72px] font-medium leading-none tracking-tighter">{weight}</span>
          <span className="text-[#8e8e93] text-[20px] font-medium ml-2 absolute -right-8 bottom-2">kg</span>
        </div>

        {/* Custom Horizontal Dial/Ruler */}
        <div className="relative w-full h-[120px] flex items-center justify-center overflow-hidden">
          
          {/* Draggable Area */}
          <div 
            ref={trackRef}
            onPointerDown={handlePointerDown}
            className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing touch-none"
          />

          {/* Fade Mask on Edges */}
          <div className="absolute inset-0 z-10 pointer-events-none" style={{
            background: 'linear-gradient(90deg, #0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)'
          }} />

          {/* Center Fixed Pointer (Long Neon Line) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[90px] bg-[#C2E03A] z-10 rounded-full" />

          {/* Translating Ticks */}
          <div 
            className="flex items-center absolute left-1/2 transition-transform duration-75 ease-out"
            style={{ transform: `translateX(calc(-50% - ${(weight - minWeight) * tickSpacing}px))` }}
          >
            {ticks.map((tick) => {
              const isMajor = tick % 5 === 0;
              // Calculate distance from center to fade out color
              const distance = Math.abs(tick - weight);
              const opacity = Math.max(0.2, 1 - (distance / 30));
              
              return (
                <div 
                  key={tick} 
                  className="flex flex-col justify-center items-center"
                  style={{ width: tickSpacing }}
                >
                  <div 
                    className={`rounded-full ${isMajor ? 'h-[50px] w-[2px]' : 'h-[30px] w-[1.5px]'}`}
                    style={{ 
                      backgroundColor: `#C2E03A`, 
                      opacity: opacity 
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Space filler */}
        <div className="flex-1"></div>

        {/* Bottom Nav */}
        <div className="flex justify-between items-center px-6">
          <button
            onClick={() => router.back()}
            className="w-[52px] h-[52px] rounded-full bg-[#333] hover:bg-[#444] flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 text-[#e5e5e5]" strokeWidth={2} />
          </button>

          <button 
            onClick={() => router.push('/onboarding/profile')}
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
