"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronRight, Dumbbell, Flame, Moon, Heart } from "lucide-react";

const slides = [
  {
    icon: Dumbbell,
    title: "Track Your Workouts",
    description: "Log exercises, sets, reps, and weights. Monitor your progress with detailed analytics and charts.",
    color: "#C2E03A",
  },
  {
    icon: Flame,
    title: "Monitor Calories",
    description: "Track your daily calorie intake and burn rate. Get personalized nutrition recommendations.",
    color: "#FF6B6B",
  },
  {
    icon: Moon,
    title: "Sleep Analysis",
    description: "Understand your sleep patterns. Get insights to improve your rest and recovery.",
    color: "#7B68EE",
  },
  {
    icon: Heart,
    title: "Holistic Health",
    description: "Connect all aspects of your wellness — body, mind, and nutrition in one powerful app.",
    color: "#C2E03A",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      iconRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.7)" }
    ).fromTo(
      slideRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3"
    );
  }, [currentSlide]);

  const handleNext = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide((prev) => prev + 1);
        } else {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            onComplete: () => router.push("/auth/login"),
          });
        }
      },
    });

    tl.to(slideRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    tl.to(
      iconRef.current,
      { scale: 0, rotation: 180, duration: 0.3, ease: "power2.in" },
      "<"
    );
  };

  const handleSkip = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      onComplete: () => router.push("/auth/login"),
    });
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div
      ref={containerRef}
      className="mobile-screen bg-[#0a0a0a] flex flex-col"
      style={{ height: "100dvh", opacity: 0 }}
    >
      {/* Skip button */}
      <div className="flex justify-end px-6 pt-14">
        <button
          onClick={handleSkip}
          className="text-[#888] text-sm font-medium hover:text-white transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Animated Icon */}
        <div
          ref={iconRef}
          className="w-[120px] h-[120px] rounded-[32px] flex items-center justify-center mb-12"
          style={{
            background: `linear-gradient(135deg, ${slide.color}20 0%, ${slide.color}08 100%)`,
            border: `2px solid ${slide.color}40`,
            boxShadow: `0 0 60px ${slide.color}15`,
          }}
        >
          <IconComponent
            className="w-14 h-14"
            style={{ color: slide.color }}
            strokeWidth={1.5}
          />
        </div>

        {/* Text Content */}
        <div ref={slideRef} className="text-center">
          <h2 className="text-white text-[28px] font-bold mb-4 leading-tight">
            {slide.title}
          </h2>
          <p className="text-[#888] text-[16px] leading-relaxed max-w-[280px] mx-auto">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-10">
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className="h-[6px] rounded-full transition-all duration-500"
              style={{
                width: index === currentSlide ? "28px" : "8px",
                background:
                  index === currentSlide
                    ? slide.color
                    : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full h-[56px] rounded-full flex items-center justify-center gap-2 font-semibold text-[15px] tracking-wide cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, ${slide.color} 0%, ${slide.color}CC 100%)`,
            color: "#0a0a0a",
            boxShadow: `0 4px 30px ${slide.color}40`,
          }}
        >
          {currentSlide < slides.length - 1 ? "Continue" : "Get Started"}
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Home Indicator */}
        <div className="w-[134px] h-[5px] bg-white/20 rounded-full mt-6 mx-auto" />
      </div>
    </div>
  );
}
