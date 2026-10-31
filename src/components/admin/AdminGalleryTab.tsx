'use client';

import React, { useState, useRef } from 'react';
import { Sparkles, Trash2, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { GalleryItem } from '@/lib/bakery-data';
import { useBakery } from '@/context/BakeryContext';

interface AdminGalleryTabProps {
  gallery: GalleryItem[];
  onAddGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  onDeleteGalleryItem: (id: string) => void;
}

export default function AdminGalleryTab({
  gallery,
  onAddGalleryItem,
  onDeleteGalleryItem
}: AdminGalleryTabProps) {
  const { uploadImage } = useBakery();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [newGallery, setNewGallery] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'pastry',
    description: '',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    aspect: 'square'
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      setNewGallery((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error('Failed to upload image', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdd = () => {
    if (!newGallery.title) return;
    onAddGalleryItem(newGallery);
    setNewGallery({
      title: '',
      category: 'pastry',
      description: '',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      aspect: 'square'
    });
  };

  return (
    <div className="space-y-6">
      {/* Add Gallery Photo */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs">
        <h4 className="text-sm font-semibold text-stone-900 flex items-center gap-2 mb-4">
          <span className="p-1.5 rounded-lg bg-stone-100 text-stone-800">
            <ImageIcon className="w-4 h-4" />
          </span>
          <span>Mount Photograph to Archives</span>
        </h4>

        <div className="space-y-3.5">
          <input
            type="text"
            placeholder="Plate Title (e.g. Flour Dusting at First Hearth)"
            value={newGallery.title}
            onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-xs shadow-xs"
          />

          {/* Image URL & File Upload */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1.5 font-mono">
              Archive Photograph
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="High-Resolution Image URL or upload a file..."
                value={newGallery.image}
                onChange={(e) => setNewGallery({ ...newGallery, image: e.target.value })}
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
            {newGallery.image && (
              <div className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                <img
                  src={newGallery.image}
                  alt="Preview"
                  className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                />
                <span className="truncate text-[11px]">Preview loaded</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select
              value={newGallery.category}
              onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value as any })}
              className="px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-xs shadow-xs cursor-pointer"
            >
              <option value="artisan-bread">Grand Reserve Bread</option>
              <option value="pastry">Laminated Pastry</option>
              <option value="craft">Estate Technique</option>
              <option value="space">Atelier Grounds</option>
            </select>

            <input
              type="text"
              placeholder="Catalogue Description"
              value={newGallery.description}
              onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl bg-stone-50/60 border border-stone-300 text-stone-900 focus:bg-white focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/10 text-xs shadow-xs"
            />
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-3 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] active:bg-black text-white font-medium text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Archive to Public Gallery</span>
          </button>
        </div>
      </div>

      {/* Gallery List */}
      <div className="grid grid-cols-2 gap-4">
        {gallery.map((photo) => (
          <div key={photo.id} className="relative rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xs group">
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-36 object-cover"
            />
            <div className="p-3 bg-white border-t border-stone-100 text-xs">
              <p className="font-semibold text-stone-900 truncate">{photo.title}</p>
              <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">{photo.category}</span>
            </div>

            <button
              onClick={() => onDeleteGalleryItem(photo.id)}
              className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-stone-900/80 hover:bg-rose-600 text-white transition-all cursor-pointer backdrop-blur-md shadow-md border border-white/20"
              title="Remove photo"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
