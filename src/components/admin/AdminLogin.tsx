'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Crown, Unlock, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (passcode: string) => boolean;
  bakeryName: string;
}

export default function AdminLogin({ onLogin, bakeryName }: AdminLoginProps) {
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(passcode)) {
      setAuthError('');
      setPasscode('');
    } else {
      setAuthError('Invalid master passcode. (Default demo pass: bakery2026)');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 flex items-center justify-center p-4 relative overflow-hidden sketch-dots-bg">
      {/* Soft atmospheric ambient wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] ambient-sketch-wash pointer-events-none" />

      <div className="relative max-w-md w-full rounded-3xl glass-panel-luxury border-stone-200/90 p-8 sm:p-10 shadow-[0_20px_50px_rgba(24,24,27,0.08)] z-10 bg-white/95">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-[#18181b] text-white mb-3.5 shadow-md">
            <Crown className="w-6 h-6" />
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">Curator Suite</h1>
          <p className="text-xs text-stone-600 mt-1.5 font-light tracking-wide">
            Private editorial control & vintage archive manager for {bakeryName}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-700 mb-2 font-mono font-semibold">
              Master Security Passcode
            </label>
            <input
              type="password"
              placeholder="Enter passcode..."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-stone-900 focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-sm font-mono tracking-widest text-center shadow-xs transition-all"
              autoFocus
            />
            <div className="mt-3 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 border border-stone-200 text-[11px] text-stone-600 font-mono">
                <span>Demo Passcode:</span>
                <strong className="text-stone-900 font-bold">bakery2026</strong>
              </span>
            </div>
          </div>

          {authError && (
            <p className="text-xs text-rose-700 text-center font-medium bg-rose-50 py-2.5 px-3 rounded-xl border border-rose-200">
              {authError}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#18181b] hover:bg-[#27272a] active:bg-black text-white font-medium text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            <Unlock className="w-4 h-4" />
            <span>Authenticate Curator Access</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-200 text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 transition-colors font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store Front</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
