"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  Dumbbell,
  Flame,
  Moon,
  Footprints,
  TrendingUp,
  Bell,
  Search,
  ChevronRight,
  Play,
  Trophy,
  Target,
  Zap,
  Heart,
  User,
  Home,
  BarChart3,
  MessageCircle,
  Settings,
} from "lucide-react";

const quickStats = [
  {
    icon: Flame,
    label: "Calories",
    value: "1,847",
    target: "2,200",
    color: "#FF6B6B",
    progress: 84,
  },
  {
    icon: Footprints,
    label: "Steps",
    value: "8,432",
    target: "10,000",
    color: "#C2E03A",
    progress: 84,
  },
  {
    icon: Moon,
    label: "Sleep",
    value: "7.2h",
    target: "8h",
    color: "#7B68EE",
    progress: 90,
  },
  {
    icon: Heart,
    label: "Heart Rate",
    value: "72",
    target: "bpm",
    color: "#FF6B6B",
    progress: 72,
  },
];

const workouts = [
  {
    title: "Upper Body Power",
    duration: "45 min",
    calories: "320 kcal",
    difficulty: "Intermediate",
    color: "#C2E03A",
  },
  {
    title: "HIIT Cardio Blast",
    duration: "30 min",
    calories: "450 kcal",
    difficulty: "Advanced",
    color: "#FF6B6B",
  },
  {
    title: "Yoga & Recovery",
    duration: "25 min",
    calories: "150 kcal",
    difficulty: "Beginner",
    color: "#7B68EE",
  },
];

const navItems = [
  { icon: Home, label: "Home", active: true, href: "/dashboard" },
  { icon: Dumbbell, label: "Workouts", active: false, href: "/workouts" },
  { icon: BarChart3, label: "Progress", active: false, href: "/progress" },
  { icon: MessageCircle, label: "Social", active: false, href: "/social" },
  { icon: User, label: "Profile", active: false, href: "/profile" },
];

export default function DashboardPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const workoutsRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
      .fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(
        streakRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        statsRef.current?.children
          ? Array.from(statsRef.current.children)
          : [],
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 },
        "-=0.2"
      )
      .fromTo(
        workoutsRef.current?.children
          ? Array.from(workoutsRef.current.children)
          : [],
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.3"
      );

    // Animate progress circles
    document.querySelectorAll("[data-progress]").forEach((el) => {
      const progress = parseInt(el.getAttribute("data-progress") || "0");
      const circle = el as SVGCircleElement;
      const circumference = 2 * Math.PI * 20;
      const offset = circumference - (progress / 100) * circumference;

      gsap.fromTo(
        circle,
        { strokeDashoffset: circumference },
        { strokeDashoffset: offset, duration: 1.2, ease: "power2.out", delay: 0.8 }
      );
    });
  }, []);

  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    return {
      name: dayNames[d.getDay()],
      date: d.getDate(),
      isToday: d.toDateString() === today.toDateString(),
      isPast: d < today && d.toDateString() !== today.toDateString(),
    };
  });

  return (
    <div
      ref={containerRef}
      className="mobile-screen bg-[#0a0a0a] flex flex-col"
      style={{ height: "100dvh", opacity: 0 }}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <div
          ref={headerRef}
          className="px-5 pt-14 pb-4 flex items-center justify-between"
          style={{ opacity: 0 }}
        >
          <div>
            <p className="text-[#666] text-[13px]">Good Morning 👋</p>
            <h1 className="text-white text-[22px] font-bold">Debjit</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-[#141414] border border-[#222] flex items-center justify-center cursor-pointer hover:border-[#333] transition-colors">
              <Search className="w-[18px] h-[18px] text-[#888]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#141414] border border-[#222] flex items-center justify-center cursor-pointer hover:border-[#333] transition-colors relative">
              <Bell className="w-[18px] h-[18px] text-[#888]" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#C2E03A] rounded-full" />
            </button>
          </div>
        </div>

        {/* Streak Card */}
        <div ref={streakRef} className="px-5 mb-5" style={{ opacity: 0 }}>
          <div
            className="rounded-2xl p-4 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(135deg, #C2E03A12 0%, #C2E03A06 100%)",
              border: "1px solid #C2E03A20",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-[44px] h-[44px] rounded-xl bg-[#C2E03A]/15 flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#C2E03A]" />
              </div>
              <div>
                <p className="text-white text-[15px] font-semibold">
                  🔥 12 Day Streak!
                </p>
                <p className="text-[#888] text-[12px]">
                  Keep pushing, you&apos;re on fire
                </p>
              </div>
            </div>
            <Trophy className="w-6 h-6 text-[#C2E03A]/50" />
          </div>
        </div>

        {/* Week Calendar */}
        <div className="px-5 mb-5">
          <div className="flex gap-1.5">
            {weekDays.map((day) => (
              <button
                key={day.name + day.date}
                className="flex-1 flex flex-col items-center py-2.5 rounded-xl transition-all cursor-pointer"
                style={{
                  background: day.isToday
                    ? "linear-gradient(180deg, #C2E03A 0%, #A5C02E 100%)"
                    : "#141414",
                  border: day.isToday
                    ? "none"
                    : "1px solid #1a1a1a",
                }}
              >
                <span
                  className="text-[10px] font-medium mb-1"
                  style={{
                    color: day.isToday ? "#0a0a0a" : "#555",
                  }}
                >
                  {day.name}
                </span>
                <span
                  className="text-[14px] font-bold"
                  style={{
                    color: day.isToday ? "#0a0a0a" : day.isPast ? "#888" : "#fff",
                  }}
                >
                  {day.date}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white text-[16px] font-semibold">
              Today&apos;s Overview
            </h2>
            <button className="text-[#C2E03A] text-[12px] font-medium cursor-pointer">
              See All
            </button>
          </div>
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-3"
          >
            {quickStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-4 flex flex-col items-center relative overflow-hidden"
                  style={{ opacity: 0 }}
                >
                  {/* Background glow */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-[0.06] blur-2xl"
                    style={{ background: stat.color }}
                  />

                  {/* Progress Ring */}
                  <div className="relative w-[52px] h-[52px] mb-3">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
                      <circle
                        cx="22"
                        cy="22"
                        r="20"
                        fill="none"
                        stroke="#222"
                        strokeWidth="3"
                      />
                      <circle
                        cx="22"
                        cy="22"
                        r="20"
                        fill="none"
                        stroke={stat.color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 20}
                        strokeDashoffset={2 * Math.PI * 20}
                        data-progress={stat.progress}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon
                        className="w-5 h-5"
                        style={{ color: stat.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <span className="text-white text-[18px] font-bold">
                    {stat.value}
                  </span>
                  <span className="text-[#555] text-[11px]">
                    / {stat.target}
                  </span>
                  <span className="text-[#888] text-[11px] mt-1">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Workouts */}
        <div className="px-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white text-[16px] font-semibold">
              Recommended Workouts
            </h2>
            <button
              onClick={() => router.push("/workouts")}
              className="text-[#C2E03A] text-[12px] font-medium flex items-center gap-1 cursor-pointer"
            >
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div ref={workoutsRef} className="flex flex-col gap-3">
            {workouts.map((workout) => (
              <button
                key={workout.title}
                className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-4 flex items-center gap-4 hover:border-[#2a2a2a] transition-all cursor-pointer w-full text-left"
                style={{ opacity: 0 }}
              >
                {/* Play Icon */}
                <div
                  className="w-[48px] h-[48px] rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${workout.color}15`,
                    border: `1px solid ${workout.color}25`,
                  }}
                >
                  <Play
                    className="w-5 h-5 ml-0.5"
                    style={{ color: workout.color }}
                    fill={workout.color}
                    strokeWidth={0}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-[14px] font-semibold truncate">
                    {workout.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[#666] text-[12px]">
                      {workout.duration}
                    </span>
                    <span className="text-[#666] text-[12px]">•</span>
                    <span className="text-[#666] text-[12px]">
                      {workout.calories}
                    </span>
                  </div>
                </div>

                <span
                  className="text-[10px] font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: `${workout.color}15`,
                    color: workout.color,
                  }}
                >
                  {workout.difficulty}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Goal Card */}
        <div className="px-5 mb-5">
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1a1a2e 0%, #16162a 50%, #0f0f1a 100%)",
              border: "1px solid #2a2a4a",
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl"
              style={{ background: "#7B68EE" }}
            />
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-[#7B68EE]" />
              <span className="text-white text-[14px] font-semibold">
                Daily Goal Progress
              </span>
            </div>
            <div className="w-full h-[6px] bg-[#222] rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: "72%",
                  background:
                    "linear-gradient(90deg, #7B68EE 0%, #C2E03A 100%)",
                }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[#888] text-[11px]">72% Complete</span>
              <span className="text-[#888] text-[11px]">
                3 of 5 goals hit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div
        className="absolute bottom-0 left-0 right-0 z-50"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #0a0a0a 20%)",
          paddingTop: "20px",
        }}
      >
        <div className="bg-[#111] border-t border-[#1a1a1a] px-2 pb-6 pt-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className="flex flex-col items-center gap-1 py-1 px-3 cursor-pointer transition-all"
                >
                  <Icon
                    className="w-[22px] h-[22px] transition-colors"
                    style={{
                      color: item.active ? "#C2E03A" : "#555",
                    }}
                    strokeWidth={item.active ? 2 : 1.5}
                  />
                  <span
                    className="text-[10px] font-medium transition-colors"
                    style={{
                      color: item.active ? "#C2E03A" : "#555",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.active && (
                    <div className="w-1 h-1 rounded-full bg-[#C2E03A]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
