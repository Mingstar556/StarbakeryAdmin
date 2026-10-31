'use client';

import React from 'react';

interface AdminPreviewFrameProps {
  previewDevice: 'desktop' | 'tablet' | 'mobile';
}

export default function AdminPreviewFrame({ previewDevice }: AdminPreviewFrameProps) {
  // Preview container width helper
  const getPreviewWidth = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'max-w-[390px] h-[780px]';
      case 'tablet':
        return 'max-w-[768px] h-[850px]';
      default:
        return 'w-full h-[850px]';
    }
  };

  return (
    <div className="xl:col-span-7 bg-stone-100/90 border-l border-stone-200 p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full flex items-center justify-between text-xs text-stone-700 mb-3 px-2 font-medium">
        <span className="flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Interactive Live Storefront Preview
        </span>
        <span className="font-mono text-[11px] bg-white px-2.5 py-0.5 rounded-full border border-stone-300 text-stone-600">
          MODE: {previewDevice.toUpperCase()}
        </span>
      </div>

      {/* Device Mockup Shell */}
      <div
        className={`transition-all duration-300 w-full rounded-2xl overflow-hidden border border-stone-300 shadow-[0_20px_50px_rgba(24,24,27,0.12)] bg-white ${getPreviewWidth()}`}
      >
        <iframe
          src={process.env.NEXT_PUBLIC_STOREFRONT_URL || 'http://localhost:3000'}
          className="w-full h-full border-none"
          title="Public Storefront Live Preview"
        />
      </div>
    </div>
  );
}
