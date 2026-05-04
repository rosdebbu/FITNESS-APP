"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
import { ChevronLeft, Check } from "lucide-react";

export default function FaceScanPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const successCircleRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Initial entrance
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(
        bracketsRef.current?.children ? Array.from(bracketsRef.current.children) : [],
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.2"
      )
      .fromTo(
        dotsRef.current?.children ? Array.from(dotsRef.current.children) : [],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(2)" },
        "-=0.4"
      );

    // Subtle breathing animation for brackets
    gsap.to(bracketsRef.current, {
      scale: 1.03,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Twinkling animation for dots
    if (dotsRef.current) {
      Array.from(dotsRef.current.children).forEach((dot, i) => {
        gsap.to(dot, {
          opacity: 0.3,
          scale: 0.8,
          duration: 0.5 + Math.random() * 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });
    }

    // Progress animation
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 4,
      ease: "power1.inOut",
      delay: 0.5,
      onUpdate: () => {
        setProgress(Math.floor(progressObj.value));
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progressObj.value}%`;
        }
      },
      onComplete: () => {
        setIsSuccess(true);
        
        // Animate success elements
        gsap.to(dotsRef.current, { opacity: 0, duration: 0.5 });
        gsap.fromTo(successCircleRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }
        );
      }
    });

  }, [router]);

  // Dot positions relative to the center face area
  const dotPositions = [
    { top: "35%", left: "45%" }, { top: "38%", left: "55%" },
    { top: "45%", left: "38%" }, { top: "46%", left: "62%" },
    { top: "52%", left: "42%" }, { top: "53%", left: "58%" },
    { top: "60%", left: "40%" }, { top: "60%", left: "60%" },
    { top: "65%", left: "48%" }, { top: "65%", left: "52%" },
    { top: "42%", left: "50%" }, { top: "55%", left: "50%" },
    { top: "70%", left: "45%" }, { top: "70%", left: "55%" },
  ];

  return (
    <div
      ref={containerRef}
      className="mobile-screen bg-black flex flex-col relative"
      style={{ height: "100dvh", opacity: 0 }}
    >
      {/* Face Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/face-scan.png"
          alt="Face Scanning"
          fill
          className={`object-cover transition-all duration-1000 ${isSuccess ? "blur-sm opacity-40" : "opacity-80"}`}
          priority
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
      </div>

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

      {/* Top Header */}
      <div className="relative z-20 px-6 pt-12 flex flex-col gap-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#1c1c1e]/80 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90"
        >
          <ChevronLeft className="w-6 h-6 text-[#8e8e93]" strokeWidth={2} />
        </button>

        <div>
          <h1 className="text-white text-[24px] font-bold tracking-tight">Face recognition</h1>
          <p className="text-[#e5e5e5] text-[15px] mt-1">Please look into the camera and hold still</p>
        </div>
      </div>

      {/* Center Scanning Area */}
      <div className="flex-1 relative z-10 w-full flex items-center justify-center min-h-0 py-2">
        <div className="relative w-[65%] max-w-[280px] aspect-square">
          {/* Brackets */}
          <div ref={bracketsRef} className="absolute inset-0">
            {/* Top Left */}
            <svg className="absolute top-0 left-0" width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M40 2H8C4.68629 2 2 4.68629 2 8V40" />
            </svg>
            {/* Top Right */}
            <svg className="absolute top-0 right-0" width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M0 2H32C35.3137 2 38 4.68629 38 8V40" />
            </svg>
            {/* Bottom Left */}
            <svg className="absolute bottom-0 left-0" width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M40 38H8C4.68629 38 2 35.3137 2 32V0" />
            </svg>
            {/* Bottom Right */}
            <svg className="absolute bottom-0 right-0" width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M0 38H32C35.3137 38 38 35.3137 38 32V0" />
            </svg>
          </div>

          {/* Tracking Dots */}
          <div ref={dotsRef} className="absolute inset-0 transition-opacity duration-500">
            {dotPositions.map((pos, idx) => (
              <div
                key={idx}
                className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }}
              />
            ))}
          </div>

          {/* Success Checkmark Circle */}
          <div
            ref={successCircleRef}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ opacity: 0 }}
          >
            <div className="relative flex items-center justify-center w-[120px] h-[120px]">
              {/* Outer glow rings */}
              <div className="absolute inset-0 rounded-full bg-[#C2E03A]/20" style={{ transform: 'scale(1.3)' }} />
              <div className="absolute inset-0 rounded-full border-2 border-[#C2E03A]/30" style={{ transform: 'scale(1.15)' }} />
              
              {/* Inner Circle */}
              <div
                className="w-[90px] h-[90px] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(194,224,58,0.5)]"
                style={{
                  background: "radial-gradient(circle at center, #E5FF66 0%, #B5D435 80%, #90A92A 100%)",
                }}
              >
                <Check className="w-10 h-10 text-black" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Progress Area */}
      <div className="relative z-20 px-6 pb-8 flex flex-col items-center gap-3">
        <p className="text-white text-[16px] font-medium tracking-wide">
          {progress}% recognised
        </p>
        
        {/* Progress Bar Container */}
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full rounded-full transition-all duration-75 ease-linear"
            style={{ 
              width: "0%", 
              backgroundColor: "#C2E03A",
              boxShadow: "0 0 10px rgba(194, 224, 58, 0.5)"
            }}
          />
        </div>

        {/* Security Text (appears on success) */}
        <p 
          className={`text-[#8e8e93] text-[12px] text-center max-w-[200px] leading-tight mt-2 transition-all duration-1000 ${isSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          Protecting your fitness data with end-end encryption.
        </p>
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center z-50">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
