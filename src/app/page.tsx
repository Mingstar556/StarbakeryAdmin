'use client';

import React, { useState } from 'react';
import { useBakery } from '@/context/BakeryContext';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminInfoTab from '@/components/admin/AdminInfoTab';
import AdminMenuTab from '@/components/admin/AdminMenuTab';
import AdminGalleryTab from '@/components/admin/AdminGalleryTab';
import AdminPreviewFrame from '@/components/admin/AdminPreviewFrame';

export default function AdminPage() {
  const {
    data,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    updateInfo,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
    saveStatus
  } = useBakery();

  const [activeTab, setActiveTab] = useState<'info' | 'menu' | 'gallery'>('info');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // If not authenticated, render the dedicated luxury AdminLogin portal
  if (!isAdmin) {
    return <AdminLogin onLogin={loginAdmin} bakeryName={data.info.name} />;
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 flex flex-col">
      {/* Admin Top Command Bar */}
      <AdminHeader
        bakeryName={data.info.name}
        saveStatus={saveStatus}
        previewDevice={previewDevice}
        setPreviewDevice={setPreviewDevice}
        onLogout={logoutAdmin}
      />

      {/* Main Admin Workspace: 2-Column Split Interface */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 min-h-0">
        
        {/* LEFT COLUMN: Controls & Content Management (5 Cols) */}
        <div className="xl:col-span-5 border-r border-stone-200 bg-[#fafaf9] p-5 sm:p-7 overflow-y-auto max-h-[calc(100vh-57px)]">
          
          {/* Tab Selector */}
          <div className="grid grid-cols-3 gap-1.5 bg-stone-100 p-1 rounded-2xl border border-stone-200 mb-6">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-3 py-2 rounded-xl text-xs uppercase tracking-wider font-mono transition-all text-center cursor-pointer ${
                activeTab === 'info'
                  ? 'bg-[#18181b] text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 font-medium'
              }`}
            >
              I. Atelier
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-3 py-2 rounded-xl text-xs uppercase tracking-wider font-mono transition-all text-center cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-[#18181b] text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 font-medium'
              }`}
            >
              II. Menu ({data.menu.length})
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-2 rounded-xl text-xs uppercase tracking-wider font-mono transition-all text-center cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#18181b] text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 font-medium'
              }`}
            >
              III. Gallery ({data.gallery.length})
            </button>
          </div>

          {/* Tab Panels */}
          {activeTab === 'info' && (
            <AdminInfoTab
              info={data.info}
              onUpdateInfo={updateInfo}
              onResetDefaults={resetToDefaults}
            />
          )}

          {activeTab === 'menu' && (
            <AdminMenuTab
              menu={data.menu}
              onAddMenuItem={addMenuItem}
              onUpdateMenuItem={updateMenuItem}
              onDeleteMenuItem={deleteMenuItem}
            />
          )}

          {activeTab === 'gallery' && (
            <AdminGalleryTab
              gallery={data.gallery}
              onAddGalleryItem={addGalleryItem}
              onDeleteGalleryItem={deleteGalleryItem}
            />
          )}

        </div>

        {/* RIGHT COLUMN: Real-Time Live Preview Frame (7 Cols) */}
        <AdminPreviewFrame previewDevice={previewDevice} />

      </div>
    </div>
  );
}
