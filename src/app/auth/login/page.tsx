"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Dumbbell } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    )
      .fromTo(
        logoRef.current,
        { y: -40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" }
      )
      .fromTo(
        formRef.current?.children ? Array.from(formRef.current.children) : [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        "-=0.3"
      )
      .fromTo(
        socialRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.2"
      );
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1200));

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      onComplete: () => router.push("/dashboard"),
    });
  };

  return (
    <div
      ref={containerRef}
      className="mobile-screen bg-[#0a0a0a] flex flex-col"
      style={{ height: "100dvh", opacity: 0 }}
    >
      {/* Background Accent Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #C2E03A 0%, transparent 70%)",
        }}
      />

      {/* Logo Area */}
      <div
        ref={logoRef}
        className="flex flex-col items-center pt-16 pb-8"
        style={{ opacity: 0 }}
      >
        <div
          className="w-[72px] h-[72px] rounded-[20px] flex items-center justify-center mb-4"
          style={{
            background: "linear-gradient(135deg, #C2E03A20 0%, #C2E03A08 100%)",
            border: "1.5px solid #C2E03A40",
            boxShadow: "0 0 40px #C2E03A10",
          }}
        >
          <Dumbbell className="w-9 h-9 text-[#C2E03A]" strokeWidth={1.5} />
        </div>
        <h1 className="text-white text-[28px] font-bold tracking-tight">
          Welcome Back
        </h1>
        <p className="text-[#666] text-[14px] mt-1">
          Sign in to continue your journey
        </p>
      </div>

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className="flex-1 flex flex-col px-6 gap-4"
      >
        {/* Email Input */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555]" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-[56px] bg-[#141414] border border-[#222] rounded-2xl pl-12 pr-4 text-white text-[15px] placeholder:text-[#444] focus:outline-none focus:border-[#C2E03A]/50 transition-colors"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555]" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-[56px] bg-[#141414] border border-[#222] rounded-2xl pl-12 pr-12 text-white text-[15px] placeholder:text-[#444] focus:outline-none focus:border-[#C2E03A]/50 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#888] transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-[#C2E03A] text-[13px] font-medium hover:underline cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[56px] rounded-full flex items-center justify-center font-semibold text-[15px] tracking-wide cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 mt-2"
          style={{
            background: "linear-gradient(135deg, #C2E03A 0%, #A5C02E 100%)",
            color: "#0a0a0a",
            boxShadow: "0 4px 30px #C2E03A40",
          }}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-[1px] bg-[#222]" />
          <span className="text-[#555] text-[12px] font-medium uppercase tracking-wider">
            or continue with
          </span>
          <div className="flex-1 h-[1px] bg-[#222]" />
        </div>

        {/* Social Login */}
        <div ref={socialRef} className="flex gap-3" style={{ opacity: 0 }}>
          {/* Google */}
          <button
            type="button"
            className="flex-1 h-[52px] bg-[#141414] border border-[#222] rounded-2xl flex items-center justify-center gap-2 hover:border-[#333] transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-[#999] text-[13px] font-medium">Google</span>
          </button>

          {/* Apple */}
          <button
            type="button"
            className="flex-1 h-[52px] bg-[#141414] border border-[#222] rounded-2xl flex items-center justify-center gap-2 hover:border-[#333] transition-colors cursor-pointer"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="white">
              <path d="M14.94 10.47c-.02-2.32 1.89-3.43 1.98-3.49-1.08-1.58-2.76-1.8-3.36-1.82-1.43-.14-2.79.84-3.52.84-.73 0-1.85-.82-3.04-.8-1.56.02-3 .91-3.81 2.31-1.62 2.82-.42 6.99 1.17 9.28.77 1.12 1.69 2.38 2.9 2.33 1.16-.05 1.6-.75 3.01-.75 1.4 0 1.8.75 3.02.73 1.25-.02 2.05-1.14 2.82-2.27.89-1.3 1.25-2.55 1.27-2.62-.03-.01-2.44-.94-2.44-3.74zM12.63 3.42C13.27 2.65 13.7 1.59 13.58.52c-.91.04-2.02.61-2.67 1.37-.58.68-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.68-1.27z" />
            </svg>
            <span className="text-[#999] text-[13px] font-medium">Apple</span>
          </button>
        </div>
      </form>

      {/* Sign Up Link */}
      <div className="px-6 pb-10 pt-4 text-center">
        <p className="text-[#666] text-[14px]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#C2E03A] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Home Indicator */}
        <div className="w-[134px] h-[5px] bg-white/20 rounded-full mt-6 mx-auto" />
      </div>
    </div>
  );
}
