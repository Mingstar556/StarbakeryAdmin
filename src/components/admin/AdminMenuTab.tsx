'use client';

import React, { useState, useRef } from 'react';
import { Plus, Trash2, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { MenuItem } from '@/lib/bakery-data';
import { useBakery } from '@/context/BakeryContext';

interface AdminMenuTabProps {
  menu: MenuItem[];
  onAddMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  onUpdateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  onDeleteMenuItem: (id: string) => void;
}

export default function AdminMenuTab({
  menu,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem
}: AdminMenuTabProps) {
  const { uploadImage } = useBakery();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [newMenu, setNewMenu] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    frenchName: '',
    category: 'sourdough',
    price: '$12.00',
    description: '',
    allergens: ['Gluten'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    badge: 'Private Reserve'
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      setNewMenu((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error('Failed to upload image', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdd = () => {
    if (!newMenu.name) return;
    onAddMenuItem(newMenu);
    setNewMenu({
      name: '',
      frenchName: '',
      category: 'sourdough',
      price: '$12.00',
      description: '',
      allergens: ['Gluten'],
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      badge: 'Private Reserve'
    });
  };

  return (
    <div className="space-y-6">
      {/* Add New Item Form */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs">
        <h4 className="text-sm font-semibold text-stone-900 flex items-center gap-2 mb-4">
          <span className="p-1.5 rounded-lg bg-stone-100 text-stone-800">
            <Plus className="w-4 h-4" />
          </span>
          <span>Add New Reserve Item</span>
        </h4>
        <div className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Item Name (e.g. Cardamom Brioche)"
              value={newMenu.name}
              onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-xs shadow-xs"
            />
            <input
              type="text"
              placeholder="Price (e.g. $12.00)"
              value={newMenu.price}
              onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-xs font-mono shadow-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select
              value={newMenu.category}
              onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value as any })}
              className="px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-xs shadow-xs cursor-pointer"
            >
              <option value="sourdough">Grand Reserve Sourdough</option>
              <option value="viennoiserie">Laminated Viennoiserie</option>
              <option value="patisserie">Haute Pâtisserie</option>
              <option value="coffee">Estate Espresso</option>
            </select>

            <input
              type="text"
              placeholder="Badge (e.g. Private Reserve)"
              value={newMenu.badge}
              onChange={(e) => setNewMenu({ ...newMenu, badge: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-xs shadow-xs"
            />
          </div>

          {/* Picture Upload & URL Field */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1.5 font-mono">
              Item Photograph
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Image URL or upload a file..."
                value={newMenu.image}
                onChange={(e) => setNewMenu({ ...newMenu, image: e.target.value })}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-xs font-mono shadow-xs"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-medium shadow-xs cursor-pointer transition-all shrink-0"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-stone-600" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5 text-stone-600" />
                    <span>Upload Photo</span>
                  </>
                )}
              </button>
            </div>
            {newMenu.image && (
              <div className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                <img
                  src={newMenu.image}
                  alt="Preview"
                  className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                />
                <span className="truncate text-[11px]">Preview loaded</span>
              </div>
            )}
          </div>

          <textarea
            rows={2}
            placeholder="Terroir notes and grain pedigree..."
            value={newMenu.description}
            onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-xs shadow-xs resize-none"
          />

          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-3 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] active:bg-black text-white font-medium text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Commit Item to Private Menu</span>
          </button>
        </div>
      </div>

      {/* Existing Items List */}
      <div className="space-y-3">
        {menu.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-stone-200 bg-white shadow-xs flex items-center justify-between gap-3.5 hover:border-stone-300 transition-all"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-13 h-13 rounded-xl object-cover shrink-0 border border-stone-200"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-semibold text-stone-900 truncate">{item.name}</h5>
                  <span className="text-xs font-mono text-stone-800 font-bold bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">{item.price}</span>
                </div>
                <p className="text-[11px] text-stone-500 truncate mt-0.5">{item.category} • {item.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onUpdateMenuItem(item.id, { isSoldOut: !item.isSoldOut })}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer font-semibold ${
                  item.isSoldOut
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
                title={item.isSoldOut ? "Click to set Available" : "Click to mark Sold Out"}
              >
                {item.isSoldOut ? '● Sold Out' : '✓ Available'}
              </button>

              <button
                onClick={() => onDeleteMenuItem(item.id)}
                className="p-2 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                title="Delete item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
