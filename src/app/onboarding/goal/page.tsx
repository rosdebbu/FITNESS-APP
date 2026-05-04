"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";

const goalsData = [
  {
    id: "calories",
    title: "Calories to Burn",
    unit: "kcal",
    recommended: "10,000 steps", // Exactly matching the typo in the mockup
    max: 5000,
    step: 100,
    defaultValue: 1200,
  },
  {
    id: "steps",
    title: "Daily Steps",
    unit: "steps",
    recommended: "10,000 steps",
    max: 20000,
    step: 500,
    defaultValue: 4800,
  },
  {
    id: "water",
    title: "Water Intake",
    unit: "liters",
    recommended: "3.5 liters",
    max: 6,
    step: 0.5,
    defaultValue: 1.5,
  }
];

export default function GoalPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [values, setValues] = useState({
    calories: 1200, // 24% of 5000 is 1200
    steps: 4800,    // 24% of 20000 is 4800
    water: 1.44     // 24% of 6 is 1.44
  });

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = 300 + 16; // card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    if (index !== activeIndex && index >= 0 && index < goalsData.length) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        carouselRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.1"
      );
  }, []);

  const updateValue = (id: string, delta: number) => {
    setValues(prev => {
      const goal = goalsData.find(g => g.id === id);
      if (!goal) return prev;
      const newVal = Math.max(0, Math.min(goal.max, prev[id as keyof typeof prev] + delta));
      return { ...prev, [id]: newVal };
    });
  };

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

      <div className="flex-1 flex flex-col pt-24 pb-8 h-full relative z-10 overflow-y-auto overflow-x-hidden">
        
        {/* Header */}
        <div className="text-center mb-8 px-6">
          <h1 className="text-white text-[28px] font-bold tracking-tight mb-2">define your daily goals</h1>
          <p className="text-[#8e8e93] text-[15px] leading-relaxed">
            Tell us about your current activity level
          </p>
        </div>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 items-center"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            paddingLeft: 'calc(50% - 160px)',
            paddingRight: 'calc(50% - 160px)'
          }}
        >
          {goalsData.map((goal, index) => {
            const val = values[goal.id as keyof typeof values];
            const percentage = Math.min(100, Math.round((val / goal.max) * 100));
            const isCenter = index === activeIndex;

            return (
              <div 
                key={goal.id} 
                className={`snap-center flex-shrink-0 w-[320px] h-[340px] bg-[#333333] rounded-[24px] p-6 shadow-xl flex flex-col items-center justify-between transition-all duration-300 ease-out ${
                  isCenter ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-50'
                }`}
              >
                <h2 className="text-white text-[20px] font-bold tracking-wide mt-2">{goal.title}</h2>
                
                <div className="flex items-center justify-between w-full px-2 mt-4">
                  {/* + Button */}
                  <button 
                    onClick={() => updateValue(goal.id, goal.step)}
                    className="flex-shrink-0 w-[44px] h-[44px] rounded-full border border-white flex items-center justify-center active:scale-90 transition-transform hover:bg-white/10"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>

                  {/* Circular Progress */}
                  <div className="relative w-[130px] h-[130px] flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Track */}
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#666" strokeWidth="6" />
                      {/* Fill */}
                      <circle 
                        cx="50" cy="50" r="42" fill="none" stroke="#C2E03A" strokeWidth="6"
                        strokeDasharray="264"
                        strokeDashoffset={264 - (264 * percentage) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-[32px] font-medium tracking-tight">{percentage}%</span>
                    </div>
                  </div>

                  {/* - Button */}
                  <button 
                    onClick={() => updateValue(goal.id, -goal.step)}
                    className="flex-shrink-0 w-[44px] h-[44px] rounded-full border border-white flex items-center justify-center active:scale-90 transition-transform hover:bg-white/10"
                  >
                    <Minus className="w-5 h-5 text-white" />
                  </button>
                </div>

                <p className="text-[#8e8e93] text-[13px] mb-2 mt-4 text-center">
                  Recommended: {goal.recommended}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mb-4">
          {goalsData.map((_, i) => (
            <div 
              key={i} 
              className={`w-[6px] h-[6px] rounded-full transition-colors duration-300 ${i === activeIndex ? 'bg-white' : 'bg-[#444]'}`} 
            />
          ))}
        </div>

        <div className="flex-1 min-h-[20px]"></div>

        {/* Bottom Nav */}
        <div className="flex justify-between items-center mt-auto px-6">
          <button
            onClick={() => router.back()}
            className="w-[52px] h-[52px] rounded-full bg-[#2A2A2A] hover:bg-[#333] flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 text-[#e5e5e5]" strokeWidth={2} />
          </button>

          <button 
            onClick={() => router.push('/dashboard')} // Final destination
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
