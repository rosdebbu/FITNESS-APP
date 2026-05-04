"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";

export default function ActivityPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Default state matching the design mockups
  const [hours, setHours] = useState(1.5);
  const [selectedDays, setSelectedDays] = useState<string[]>(['M', 'T_1', 'T_2']); 

  const days = [
    { id: 'M', label: 'M' },
    { id: 'T_1', label: 'T' },
    { id: 'W', label: 'W' },
    { id: 'T_2', label: 'T' },
    { id: 'F', label: 'F' },
    { id: 'S_1', label: 'S' },
    { id: 'S_2', label: 'S' },
  ];

  const toggleDay = (id: string) => {
    setSelectedDays(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
        "-=0.1"
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

      <div className="flex-1 flex flex-col px-6 pt-24 pb-8 h-full relative z-10 overflow-y-auto overflow-x-hidden">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-[26px] font-bold tracking-tight mb-2">let's start your journey</h1>
          <p className="text-[#8e8e93] text-[15px] leading-relaxed">
            Tell us about your current activity level
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="flex flex-col gap-[47px] w-full items-center pt-8">
          
          {/* Card 1: Hours / Day */}
          <div className="bg-[#333333] w-[342px] h-[207px] rounded-[15px] p-5 shadow-lg flex flex-col relative">
            <h2 className="text-white text-[18px] font-bold tracking-wide mb-6">Hours / Day</h2>
            
            <div className="flex items-center justify-between mb-8 px-2">
              {/* + Button */}
              <button 
                onClick={() => setHours(prev => prev + 0.5)}
                className="w-[48px] h-[48px] rounded-full border border-[#C2E03A] flex items-center justify-center active:scale-90 transition-transform"
              >
                <Plus className="w-6 h-6 text-[#C2E03A]" />
              </button>

              {/* Value */}
              <div className="text-white text-[32px] font-medium tracking-tight">
                {hours} Hour
              </div>

              {/* - Button */}
              <button 
                onClick={() => setHours(prev => Math.max(0, prev - 0.5))}
                className="w-[48px] h-[48px] rounded-full border border-[#8e8e93] flex items-center justify-center active:scale-90 transition-transform"
              >
                <Minus className="w-6 h-6 text-[#C2E03A]" />
              </button>
            </div>

            {/* Range Slider */}
            <div className="relative w-[calc(100%-16px)] mx-auto h-[4px] bg-[#666] rounded-full mt-auto mb-2">
              {/* Fill */}
              <div 
                className="absolute left-0 top-0 bottom-0 bg-[#C2E03A] rounded-full"
                style={{ width: `${Math.min(100, (hours / 5) * 100)}%` }}
              />
              {/* Thumb */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-[16px] h-[16px] bg-[#C2E03A] rounded-full shadow-[0_0_12px_rgba(194,224,58,0.5)] transition-all"
                style={{ left: `calc(${Math.min(100, (hours / 5) * 100)}% - 8px)` }}
              />
            </div>
          </div>

          {/* Card 2: Days / Week */}
          <div className="bg-[#333333] w-[342px] h-[207px] rounded-[15px] p-5 shadow-lg flex flex-col relative overflow-hidden">
            <h2 className="text-white text-[18px] font-bold tracking-wide mb-5">Hours / Day</h2>
            
            {/* Horizontal Scroll Days Container */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {days.map((day) => {
                const isSelected = selectedDays.includes(day.id);
                return (
                  <button
                    key={day.id}
                    onClick={() => toggleDay(day.id)}
                    className={`flex-shrink-0 w-[54px] h-[54px] rounded-full flex items-center justify-center text-[18px] font-bold transition-all duration-300 active:scale-95 ${
                      isSelected 
                        ? 'bg-[#C2E03A] text-black shadow-[0_0_15px_rgba(194,224,58,0.25)]' 
                        : 'bg-[#E5E5E5] text-black hover:bg-white'
                    }`}
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>

            <p className="text-center text-[#8e8e93] text-[13px] mt-auto mb-2">
              Typically {selectedDays.length} days per week
            </p>
          </div>

        </div>

        <div className="flex-1 min-h-[40px]"></div>

        {/* Bottom Nav */}
        <div className="flex justify-between items-center mt-auto">
          <button
            onClick={() => router.back()}
            className="w-[52px] h-[52px] rounded-full bg-[#2A2A2A] hover:bg-[#333] flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 text-[#e5e5e5]" strokeWidth={2} />
          </button>

          <button 
            onClick={() => router.push('/onboarding/goal')}
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
      
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
}
