"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronLeft, Mail, Lock, Eye, EyeOff, Check } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        formRef.current?.children ? Array.from(formRef.current.children) : [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 }
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

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full px-4 pt-16 pb-8 custom-scrollbar">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#1c1c1e] flex items-center justify-center transition-transform active:scale-90 mb-6"
        >
          <ChevronLeft className="w-5 h-5 text-[#8e8e93]" strokeWidth={2} />
        </button>

        {/* Header */}
        <div className="mb-6 ml-2">
          <h1 className="text-white text-[24px] font-bold tracking-tight">Create account</h1>
          <p className="text-[#8e8e93] text-[15px] mt-1">Sign up to continue</p>
        </div>

        {/* Form Container */}
        <div ref={formRef} className="flex flex-col gap-[13px] w-[343px] max-w-full mx-auto">
          
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white text-[14px] font-medium ml-1">Email</label>
            <div className="relative flex items-center w-full h-[52px] bg-[#121212] border border-white/10 rounded-[14px] overflow-hidden focus-within:border-[#C2E03A] transition-colors">
              <div className="absolute left-4 text-[#8e8e93]">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                type="email"
                placeholder="example@gmail.com"
                className="w-full h-full bg-transparent text-white pl-12 pr-4 text-[15px] placeholder:text-[#4a4a4a] outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-white text-[14px] font-medium ml-1">Password</label>
            <div className="relative flex items-center w-full h-[52px] bg-[#121212] border border-white/10 rounded-[14px] overflow-hidden focus-within:border-[#C2E03A] transition-colors">
              <div className="absolute left-4 text-[#8e8e93]">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full h-full bg-transparent text-white pl-12 pr-12 text-[15px] placeholder:text-[#4a4a4a] outline-none"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-[#8e8e93] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-white text-[14px] font-medium ml-1">Confirm password</label>
            <div className="relative flex items-center w-full h-[52px] bg-[#121212] border border-white/10 rounded-[14px] overflow-hidden focus-within:border-[#C2E03A] transition-colors">
              <div className="absolute left-4 text-[#8e8e93]">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                className="w-full h-full bg-transparent text-white pl-12 pr-12 text-[15px] placeholder:text-[#4a4a4a] outline-none"
              />
              <button 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 text-[#8e8e93] hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Checkbox Area */}
          <div className="flex items-center gap-3 mt-3 px-1">
            <button 
              onClick={() => setAgreed(!agreed)}
              className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors flex-shrink-0 ${agreed ? 'bg-transparent border-[#C2E03A]' : 'bg-transparent border-[#4a4a4a]'}`}
            >
              {agreed && <Check className="w-3.5 h-3.5 text-[#C2E03A]" strokeWidth={3} />}
            </button>
            <p className="text-[#e5e5e5] text-[13px]">
              I agree to the <span className="text-[#C2E03A]">Terms</span> and <span className="text-[#C2E03A]">Conditions</span>
            </p>
          </div>

          {/* Submit Button */}
          <button 
            onClick={() => router.push('/auth/verify')}
            className="w-full h-[52px] bg-[#C2E03A] text-black font-semibold text-[16px] rounded-full mt-6 active:scale-[0.98] transition-transform shadow-[0_0_15px_rgba(194,224,58,0.2)]"
          >
            Create account
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center w-full gap-3 mt-8">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#333] relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4a4a4a]" />
            </div>
            <span className="text-white text-[14px]">or sign up with</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#333] relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4a4a4a]" />
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex w-full gap-4 mt-6 mb-4">
            <button className="flex-1 h-[52px] border border-white/20 rounded-[26px] flex items-center justify-center gap-2 text-white font-medium active:scale-[0.98] transition-transform hover:bg-white/5">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex-1 h-[52px] border border-white/20 rounded-[26px] flex items-center justify-center gap-2 text-white font-medium active:scale-[0.98] transition-transform hover:bg-white/5">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.365 7.143c-.02-.034-2.585-1.472-5.415-1.472-1.968 0-3.834.786-5.12 2.15C4.22 9.53 3.27 11.964 3.27 14.615c0 4.148 2.663 8.358 6.452 8.358 1.488 0 2.808-.667 4.156-1.353 1.18-.602 2.42-1.233 3.948-1.233 1.455 0 2.766.626 3.998 1.25.132.067.265.135.398.2.97.487 2.012.996 3.125.996.103 0 .208-.003.313-.01-1.026-1.503-2.28-3.047-3.414-4.46l-.167-.208c-1.127-1.408-2.128-2.66-2.502-4.04-.378-1.393-.112-2.825.814-4.008 1.082-1.385 2.765-2.138 4.41-2.298-.445-.635-1.008-1.198-1.636-1.688-1.478-1.155-3.328-1.785-5.267-1.785-.466 0-.94.045-1.423.136l-.105.02c-1.476.28-3.084.584-4.57.584z"/>
                <path d="M15.42 4.146c.39-1.39.06-2.822-.84-4-1.07 1.36-2.73 2.115-4.38 2.302-.383 1.383-.053 2.812.834 3.987 1.107-1.363 2.793-2.122 4.475-2.31z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Footer Login Link */}
          <div className="flex justify-center pb-6">
            <p className="text-white text-[14px]">
              Already have an account ? <Link href="/auth/login" className="text-[#C2E03A] hover:underline transition-colors font-medium">Login</Link>
            </p>
          </div>

        </div>
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
