"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";

export default function WelcomePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(titleRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo(bodyRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.3")
      .fromTo(
        badgeRefs.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.7)" },
        "-=0.5"
      )
      .fromTo(bottomRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.3");

    // Floating animation on badges
    badgeRefs.current.filter(Boolean).forEach((badge, i) => {
      gsap.to(badge, {
        y: i % 2 === 0 ? -6 : 6,
        duration: 2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
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

      {/* Title Section */}
      <div ref={titleRef} className="px-6 pt-16 pb-2 z-10" style={{ opacity: 0 }}>
        <h1 className="text-white text-[34px] font-bold leading-tight">Welcome</h1>
        <p className="text-[#999] text-[15px] mt-1">Login or signup to continue</p>
      </div>

      {/* Anatomical Body - Center Section */}
      <div className="flex-1 relative flex items-center justify-center">
        <div ref={bodyRef} className="relative w-full h-full flex items-center justify-center" style={{ opacity: 0 }}>
          <Image
            src="/anatomy-body.png"
            alt="Anatomical Body"
            width={320}
            height={480}
            className="object-contain z-10 relative"
            style={{ maxHeight: "55vh" }}
            priority
          />

          {/* Floating Badge - Blood Test / Brain MRI (top right) */}
          <div
            ref={(el) => { badgeRefs.current[0] = el; }}
            className="absolute z-20 flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              top: "8%",
              right: "8%",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              opacity: 0,
            }}
          >
            <div className="w-8 h-8 rounded-full bg-[#0a0a0a] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C2E03A" strokeWidth="2" strokeLinecap="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <p className="text-[#333] text-[11px] font-semibold leading-tight">Blood test</p>
              <p className="text-[#333] text-[12px] font-bold leading-tight">Brain MRI</p>
            </div>
            {/* Mini heart rate line */}
            <svg width="40" height="20" viewBox="0 0 40 20" className="ml-1">
              <polyline
                points="0,10 6,10 10,3 14,17 18,6 22,14 26,10 40,10"
                fill="none"
                stroke="#FF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Floating Badge - Brain Icon (top of head) */}
          <div
            ref={(el) => { badgeRefs.current[1] = el; }}
            className="absolute z-20 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              top: "5%",
              left: "42%",
              background: "rgba(255,200,200,0.9)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
              opacity: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a7 7 0 0 1 4 12.9" />
            </svg>
          </div>

          {/* Floating Badge - Heart Icon (chest area) */}
          <div
            ref={(el) => { badgeRefs.current[2] = el; }}
            className="absolute z-20 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              top: "35%",
              left: "35%",
              background: "rgba(255,220,220,0.9)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
              opacity: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF4444" stroke="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>

          {/* Floating Badge - Stomach/Digestion Icon (lower center) */}
          <div
            ref={(el) => { badgeRefs.current[3] = el; }}
            className="absolute z-20 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              top: "55%",
              left: "40%",
              background: "rgba(194, 224, 58, 0.2)",
              border: "1.5px solid rgba(194, 224, 58, 0.4)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
              opacity: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C2E03A" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="12" r="8" opacity="0.4" />
            </svg>
          </div>

          {/* Floating Badge - Side indicator (right arm area) */}
          <div
            ref={(el) => { badgeRefs.current[4] = el; }}
            className="absolute z-20 w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              top: "45%",
              right: "18%",
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
              opacity: 0,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#C2E03A]" />
          </div>
        </div>
      </div>

      {/* Bottom Card */}
      <div
        ref={bottomRef}
        className="relative z-30 mx-4 mb-8 rounded-3xl overflow-hidden px-5 py-6"
        style={{
          background: "rgba(60, 60, 60, 0.5)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          opacity: 0,
        }}
      >
        {/* Create Account Button */}
        <button
          onClick={() => router.push("/auth/signup")}
          className="w-full h-[52px] rounded-full flex items-center justify-center font-semibold text-[15px] cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mb-3"
          style={{
            background: "linear-gradient(135deg, #C2E03A 0%, #B5D435 100%)",
            color: "#0a0a0a",
          }}
        >
          Create account
        </button>

        {/* Already Have Account Button */}
        <button
          onClick={() => router.push("/auth/signin")}
          className="w-full h-[52px] rounded-full flex items-center justify-center font-semibold text-[15px] cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mb-4"
          style={{
            background: "rgba(255,255,255,0.9)",
            color: "#0a0a0a",
          }}
        >
          Already have an account
        </button>

        {/* FaceID Option */}
        <button 
          onClick={() => router.push("/auth/face-id")}
          className="w-full text-center text-[#C2E03A] text-[13px] font-medium cursor-pointer hover:underline"
        >
          Or continue with FaceID ?
        </button>
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center pb-3">
        <div className="w-[134px] h-[5px] bg-white/20 rounded-full" />
      </div>
    </div>
  );
}
