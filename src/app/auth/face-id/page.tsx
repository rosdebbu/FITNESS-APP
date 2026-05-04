"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronLeft, ScanFace } from "lucide-react";

export default function FaceRecognitionPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial fade in
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(backBtnRef.current, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5 })
      .fromTo(
        [ring3Ref.current, ring2Ref.current, ring1Ref.current],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)" },
        "-=0.2"
      )
      .fromTo(iconRef.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.4")
      .fromTo(textRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2")
      .fromTo(buttonRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

    // Continuous pulsing animation for the rings
    gsap.to(ring3Ref.current, {
      scale: 1.15,
      opacity: 0.4,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(ring2Ref.current, {
      scale: 1.08,
      opacity: 0.7,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.2,
    });
    
    // Slight float for the icon inside
    gsap.to(iconRef.current, {
      y: -3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="mobile-screen bg-[#0a0a0a] flex flex-col relative"
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

      {/* Top Navigation */}
      <div className="px-6 pt-16 z-20">
        <button
          ref={backBtnRef}
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#1c1c1e] flex items-center justify-center transition-transform active:scale-90"
        >
          <ChevronLeft className="w-6 h-6 text-[#8e8e93]" strokeWidth={2} />
        </button>
      </div>

      {/* Main Content - Center Aligned */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-10 px-6">
        
        {/* Animated Face ID Graphic */}
        <div className="relative w-[180px] h-[180px] flex items-center justify-center mb-10">
          {/* Outer Ring */}
          <div
            ref={ring3Ref}
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(194,224,58,0) 40%, rgba(194,224,58,0.15) 70%, rgba(194,224,58,0) 100%)",
              border: "1px solid rgba(194,224,58,0.2)"
            }}
          />
          {/* Middle Ring */}
          <div
            ref={ring2Ref}
            className="absolute inset-[15px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(194,224,58,0) 30%, rgba(194,224,58,0.3) 80%, rgba(194,224,58,0) 100%)",
              border: "1px solid rgba(194,224,58,0.4)"
            }}
          />
          {/* Inner Glowing Circle */}
          <div
            ref={ring1Ref}
            className="absolute inset-[30px] rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle at 30% 30%, #E8FA70 0%, #C2E03A 50%, #8A9F24 100%)",
              boxShadow: "0 0 30px rgba(194, 224, 58, 0.4), inset 0 0 15px rgba(255,255,255,0.5)",
            }}
          >
            <div ref={iconRef}>
              <ScanFace className="w-[42px] h-[42px] text-black" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div ref={textRef} className="text-center flex flex-col gap-2">
          <h1 className="text-white text-[24px] font-bold tracking-tight">Face recognition</h1>
          <p className="text-[#8e8e93] text-[15px]">Scan your face to verify your identity</p>
        </div>
      </div>

      {/* Bottom Button Area */}
      <div className="px-6 pb-12 z-20">
        <button
          ref={buttonRef}
          onClick={() => router.push("/auth/face-scan")}
          className="w-full h-[54px] rounded-full flex items-center justify-center font-semibold text-[16px] transition-transform active:scale-95"
          style={{
            backgroundColor: "#C2E03A",
            color: "#0a0a0a",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
