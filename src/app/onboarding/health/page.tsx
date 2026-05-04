"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronLeft, ChevronDown, ChevronRight, Heart, Plus, Activity } from "lucide-react";
import Image from "next/image";

const healthIssues = [
  { id: 1, icon: Heart, text: "Heart Condition", color: "#FF4B4B" },
  { id: 2, icon: Activity, text: "Broken Ankle", color: "#FFB039" },
  { id: 3, icon: Plus, text: "ACL Surgery", color: "#3BA4FF" },
  { id: 4, icon: Plus, text: "Asthma", color: "#3BA4FF" },
];

export default function HealthPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        ".health-card",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.12, ease: "power2.out", delay: 0.15 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="mobile-screen bg-[#0A0A0A] flex flex-col relative overflow-hidden"
      style={{ height: "100dvh", opacity: 0 }}
    >
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2 flex-shrink-0">
        <span className="text-white text-sm font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
            <rect x="0" y="6" width="3" height="6" rx="0.5" opacity="0.4" />
            <rect x="4.5" y="4" width="3" height="8" rx="0.5" opacity="0.6" />
            <rect x="9" y="2" width="3" height="10" rx="0.5" opacity="0.8" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white" className="ml-1">
            <path d="M8 3C10.7 3 13.1 4.1 14.8 5.9L16 4.7C14 2.6 11.2 1.3 8 1.3S2 2.6 0 4.7L1.2 5.9C2.9 4.1 5.3 3 8 3Z" opacity="0.3"/>
            <path d="M8 6.5C9.8 6.5 11.4 7.2 12.5 8.4L13.7 7.2C12.3 5.7 10.3 4.8 8 4.8S3.7 5.7 2.3 7.2L3.5 8.4C4.6 7.2 6.2 6.5 8 6.5Z" opacity="0.6"/>
            <path d="M8 10C8.9 10 9.7 10.4 10.3 10.9L8 13.5L5.7 10.9C6.3 10.4 7.1 10 8 10Z"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="white" className="ml-1">
            <rect x="0" y="1" width="21" height="10" rx="2" stroke="white" strokeWidth="1" fill="none" opacity="0.4"/>
            <rect x="1.5" y="2.5" width="16" height="7" rx="1" fill="white"/>
            <rect x="22" y="4" width="2" height="4" rx="0.5" fill="white" opacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Header Row */}
      <div className="flex items-center px-4 pb-4 flex-shrink-0 relative">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#2A2A2A] hover:bg-[#333] flex items-center justify-center transition-transform active:scale-90 z-10"
        >
          <ChevronLeft className="w-5 h-5 text-[#e5e5e5]" strokeWidth={2.5} />
        </button>
        <h1 className="text-white text-[22px] font-bold tracking-tight absolute left-0 right-0 text-center pointer-events-none">
          Health Details
        </h1>
      </div>

      {/* Scrollable Content — use padding to position cards at left:16px */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-8">

        {/* Card 1: Health & Medical History — 338×120, radius 5 */}
        <div
          className="health-card overflow-hidden relative"
          style={{
            width: 338,
            height: 120,
            borderRadius: 5,
            marginBottom: 17,
            marginTop: 8,
            background: "#2D2D2D",
          }}
        >
          <div style={{ position: "absolute", left: 0, top: 0, width: 208, height: 120, padding: "16px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 className="text-white text-[15px] font-semibold leading-tight" style={{ marginBottom: 4 }}>
              Health & Medical History
            </h2>
            <p className="text-[#a0a0a0] text-[11px]" style={{ lineHeight: 1.5 }}>
              Add past injuries, health issues, or surgeries for safer, personalized care.
            </p>
          </div>
          <div style={{ position: "absolute", right: 0, top: 0, width: 130, height: 120 }}>
            <Image
              src="/medical_illustration.png"
              alt="Medical"
              fill
              className="object-cover"
              style={{ borderRadius: "0 5px 5px 0" }}
              priority
            />
          </div>
        </div>

        {/* Card 2: Any Past Surgeries? — 342×142, radius 5 */}
        <div
          className="health-card"
          style={{
            width: 342,
            height: 142,
            borderRadius: 5,
            marginBottom: 17,
            background: "#2D2D2D",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h3 className="text-white text-[15px] font-medium" style={{ marginBottom: 12 }}>Any Past Surgeries?</h3>
          <div style={{ position: "relative", marginBottom: 8 }}>
            <select
              className="text-white outline-none"
              style={{
                width: "100%",
                height: 44,
                background: "#383838",
                border: "1px solid #444",
                borderRadius: 8,
                paddingLeft: 16,
                paddingRight: 40,
                fontSize: 14,
                appearance: "none" as const,
                WebkitAppearance: "none" as const,
              }}
              defaultValue="ACL Surgery"
            >
              <option>ACL Surgery</option>
              <option>Appendectomy</option>
              <option>None</option>
            </select>
            <ChevronDown
              className="text-[#888] pointer-events-none"
              style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 16, height: 16 }}
            />
          </div>
          <p className="text-[#a0a0a0] text-[12px]" style={{ paddingLeft: 2 }}>
            Date : <span className="text-[#888]">October 09, 2025</span>
          </p>
        </div>

        {/* Card 3: Past Injuries & Health Issues — 342×344, radius 5 */}
        <div
          className="health-card"
          style={{
            width: 342,
            height: 344,
            borderRadius: 5,
            background: "#2D2D2D",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 className="text-white text-[15px] font-medium" style={{ marginBottom: 16 }}>Past Injunes & Health Issues</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {healthIssues.map((issue) => (
              <button
                key={issue.id}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "transparent",
                  border: "1px solid #555",
                  borderRadius: 9999,
                  padding: "8px 16px 8px 8px",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#777")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#555")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <issue.icon style={{ width: 18, height: 18, color: issue.color }} strokeWidth={2.5} />
                  </div>
                  <span className="text-white text-[14px] font-medium">{issue.text}</span>
                </div>
                <ChevronRight style={{ width: 16, height: 16, color: "#666", flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
