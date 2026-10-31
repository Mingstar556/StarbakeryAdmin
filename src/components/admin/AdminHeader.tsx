'use client';

import React from 'react';
import Link from 'next/link';
import {
  Crown,
  RefreshCw,
  CheckCircle,
  Save,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  LogOut
} from 'lucide-react';

interface AdminHeaderProps {
  bakeryName: string;
  saveStatus: 'idle' | 'saving' | 'saved';
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  onLogout: () => void;
}

export default function AdminHeader({
  bakeryName,
  saveStatus,
  previewDevice,
  setPreviewDevice,
  onLogout
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <Link href="/" className="font-editorial text-lg sm:text-xl font-bold text-stone-900 hover:text-stone-700 transition-colors flex items-center gap-2">
          <Crown className="w-5 h-5 text-stone-900" />
          <span>{bakeryName}</span>
          <span className="text-[10px] font-mono tracking-wider text-stone-800 font-semibold border border-stone-300 px-2 py-0.5 rounded-full bg-stone-100">
            CURATOR
          </span>
        </Link>

        {/* Auto-save notification pill */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-stone-100 border border-stone-200 text-stone-700">
          {saveStatus === 'saving' && <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" />}
          {saveStatus === 'saved' && <CheckCircle className="w-3 h-3 text-emerald-600" />}
          {saveStatus === 'idle' && <Save className="w-3 h-3 text-stone-500" />}
          <span>{saveStatus === 'saving' ? 'Publishing...' : saveStatus === 'saved' ? 'Synchronized' : 'Ready'}</span>
        </span>
      </div>

      {/* Viewport switchers for live preview */}
      <div className="hidden md:flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
        <button
          onClick={() => setPreviewDevice('desktop')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
            previewDevice === 'desktop'
              ? 'bg-[#18181b] text-white font-medium shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
          }`}
          title="Desktop 1440px View"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Desktop</span>
        </button>
        <button
          onClick={() => setPreviewDevice('tablet')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
            previewDevice === 'tablet'
              ? 'bg-[#18181b] text-white font-medium shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
          }`}
          title="Tablet 768px View"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Tablet</span>
        </button>
        <button
          onClick={() => setPreviewDevice('mobile')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
            previewDevice === 'mobile'
              ? 'bg-[#18181b] text-white font-medium shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
          }`}
          title="Mobile 390px View"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Mobile</span>
        </button>
      </div>

      {/* Exit & Actions */}
      <div className="flex items-center gap-2.5">
        <a
          href={process.env.NEXT_PUBLIC_STOREFRONT_URL || 'http://localhost:3000'}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-800 hover:text-black bg-white hover:bg-stone-50 border border-stone-300 px-3.5 py-1.5 rounded-xl font-medium shadow-xs transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          <span>Open Public Site</span>
        </a>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-600 transition-colors shadow-xs cursor-pointer text-xs font-medium"
          title="Lock & Log out"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
