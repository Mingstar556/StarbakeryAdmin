'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';
import { BakeryInfo } from '@/lib/bakery-data';

interface AdminInfoTabProps {
  info: BakeryInfo;
  onUpdateInfo: (updates: Partial<BakeryInfo>) => void;
  onResetDefaults: () => void;
}

export default function AdminInfoTab({
  info,
  onUpdateInfo,
  onResetDefaults
}: AdminInfoTabProps) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
      <div>
        <h3 className="font-editorial text-xl font-bold text-stone-900 mb-1">Estate Brand & Announcements</h3>
        <p className="text-xs text-stone-500">Edit the prominent storefront banners and Atelier details instantly.</p>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-mono font-semibold">
          Bakery Estate Name
        </label>
        <input
          type="text"
          value={info.name}
          onChange={(e) => onUpdateInfo({ name: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-sm transition-all shadow-xs"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-mono font-semibold">
          Daily Oven Announcement
        </label>
        <input
          type="text"
          value={info.announcement}
          onChange={(e) => onUpdateInfo({ announcement: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-sm transition-all shadow-xs"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-mono font-semibold">
          Hero Main Headline
        </label>
        <input
          type="text"
          value={info.heroHeadline}
          onChange={(e) => onUpdateInfo({ heroHeadline: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-sm transition-all shadow-xs"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-mono font-semibold">
          Hero Subheadline / Tagline
        </label>
        <textarea
          rows={3}
          value={info.heroSubheadline}
          onChange={(e) => onUpdateInfo({ heroSubheadline: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-sm transition-all shadow-xs resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-mono font-semibold">
            Culture Age (Years)
          </label>
          <input
            type="number"
            value={info.starterAgeYears}
            onChange={(e) => onUpdateInfo({ starterAgeYears: Number(e.target.value) })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-sm transition-all shadow-xs"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-mono font-semibold">
            Fermentation Hours
          </label>
          <input
            type="number"
            value={info.fermentationHours}
            onChange={(e) => onUpdateInfo({ fermentationHours: Number(e.target.value) })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-sm transition-all shadow-xs"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-mono font-semibold">
          Atelier Physical Address
        </label>
        <input
          type="text"
          value={info.address}
          onChange={(e) => onUpdateInfo({ address: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-sm transition-all shadow-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-mono font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            value={info.phone}
            onChange={(e) => onUpdateInfo({ phone: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-sm transition-all shadow-xs"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1.5 font-mono font-semibold">
            Email Address
          </label>
          <input
            type="text"
            value={info.email}
            onChange={(e) => onUpdateInfo({ email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-sm transition-all shadow-xs"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
        <button
          type="button"
          onClick={onResetDefaults}
          className="text-xs text-stone-500 hover:text-rose-600 font-mono transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset all to factory defaults</span>
        </button>
      </div>
    </div>
  );
}
