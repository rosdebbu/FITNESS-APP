"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5 }
    )
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        checkRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      )
      .fromTo(
        buttonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );

    // Subtle floating animation on the image
    gsap.to(imageRef.current, {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Pulsing glow on the button
    gsap.to(buttonRef.current, {
      boxShadow: "0 0 30px rgba(194, 224, 58, 0.4)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const handleGetStarted = () => {
    const tl = gsap.timeline({
      onComplete: () => router.push("/onboarding"),
    });

    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={containerRef}
      className="mobile-screen bg-black flex flex-col items-center justify-end"
      style={{ height: "100dvh" }}
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

      {/* Hero Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <Image
          src="/hero-bg.png"
          alt="Fitness Hero"
          fill
          className="object-cover object-center"
          priority
          sizes="430px"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 30%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.98) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full px-6 pb-10 flex flex-col items-center">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-white text-center text-[32px] leading-[1.2] font-bold mb-10 tracking-tight"
          style={{ opacity: 0 }}
        >
          Your Path to{" "}
          <br />
          <span className="text-[#C2E03A]">Success</span> Starts with
          <br />
          Daily Tracking
        </h1>

        {/* Get Started Button Area */}
        <div className="w-full flex items-center gap-3">
          {/* Checkmark Circle */}
          <div
            ref={checkRef}
            className="w-[52px] h-[52px] rounded-full border-2 border-[#C2E03A]/60 flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
            style={{ opacity: 0, background: "rgba(194, 224, 58, 0.08)" }}
          >
            <Check className="w-5 h-5 text-[#C2E03A]" strokeWidth={2.5} />
          </div>

          {/* Get Started Button */}
          <button
            ref={buttonRef}
            onClick={handleGetStarted}
            className="flex-1 h-[52px] rounded-full flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-300"
            style={{
              opacity: 0,
              background:
                "linear-gradient(135deg, rgba(194, 224, 58, 0.15) 0%, rgba(194, 224, 58, 0.08) 100%)",
              border: "1.5px solid rgba(194, 224, 58, 0.5)",
            }}
          >
            {/* Shimmer Effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(194, 224, 58, 0.1) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s ease-in-out infinite",
              }}
            />

            <span className="text-[#C2E03A] font-semibold text-[15px] tracking-wide relative z-10">
              Get Started
            </span>

            {/* Arrow Icon */}
            <div className="absolute right-4 w-8 h-8 rounded-full bg-[#C2E03A]/10 flex items-center justify-center group-hover:bg-[#C2E03A]/20 transition-all duration-300">
              <ChevronRight className="w-4 h-4 text-[#C2E03A] group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </button>
        </div>

        {/* Bottom Home Indicator */}
        <div className="w-[134px] h-[5px] bg-white/20 rounded-full mt-6" />
      </div>
    </div>
  );
}
