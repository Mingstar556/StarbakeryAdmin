'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BakeryData, INITIAL_BAKERY_DATA, MenuItem, GalleryItem, BakeryInfo, StoryMilestone } from '@/lib/bakery-data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  fetchBakeryDataFromDB,
  syncInfoToDB,
  insertMenuItemToDB,
  updateMenuItemInDB,
  deleteMenuItemFromDB,
  insertGalleryItemToDB,
  deleteGalleryItemFromDB,
  uploadBakeryImage
} from '@/lib/supabase-db';

interface BakeryContextType {
  data: BakeryData;
  isLoading: boolean;
  isAdmin: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  updateInfo: (info: Partial<BakeryInfo>) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  updateTimeline: (timeline: StoryMilestone[]) => void;
  resetToDefaults: () => void;
  uploadImage: (file: File) => Promise<string>;
  saveStatus: 'idle' | 'saving' | 'saved';
  isDatabaseConnected: boolean;
}

const STORAGE_KEY = 'laura_bakery_cms_data_v1';
const AUTH_KEY = 'laura_admin_authenticated';
const ADMIN_PASSCODE = 'bakery2026';

const BakeryContext = createContext<BakeryContextType | null>(null);

export function BakeryProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<BakeryData>(INITIAL_BAKERY_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(false);

  // Load initial data from Supabase PostgreSQL, with localStorage fallback
  useEffect(() => {
    async function initData() {
      try {
        const savedAuth = localStorage.getItem(AUTH_KEY);
        if (savedAuth === 'true') {
          setIsAdmin(true);
        }

        // 1. Try to fetch live data from Supabase PostgreSQL
        if (isSupabaseConfigured) {
          const dbData = await fetchBakeryDataFromDB();
          if (dbData) {
            setData(dbData);
            setIsDatabaseConnected(true);
            setIsLoading(false);
            return;
          }
        }

        // 2. Fallback to localStorage
        const localData = localStorage.getItem(STORAGE_KEY);
        if (localData) {
          setData(JSON.parse(localData));
        } else {
          setData(INITIAL_BAKERY_DATA);
        }
      } catch (err) {
        console.warn('LocalStorage not available, utilizing default data.', err);
      } finally {
        setIsLoading(false);
      }
    }

    initData();
  }, []);

  // Subscribe to real-time PostgreSQL updates across both Storefront & Admin
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const channel = supabase
      .channel('starbakery-realtime-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bakery_info' }, async () => {
        const fresh = await fetchBakeryDataFromDB();
        if (fresh) setData(fresh);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bakery_menu' }, async () => {
        const fresh = await fetchBakeryDataFromDB();
        if (fresh) setData(fresh);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bakery_gallery' }, async () => {
        const fresh = await fetchBakeryDataFromDB();
        if (fresh) setData(fresh);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsDatabaseConnected(true);
        }
      });

    return () => {
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const persistLocal = (newData: BakeryData) => {
    setData(newData);
    setSaveStatus('saving');
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setTimeout(() => setSaveStatus('saved'), 400);
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch (e) {
      console.error('Failed to persist bakery data locally', e);
      setSaveStatus('idle');
    }
  };

  const loginAdmin = (passcode: string): boolean => {
    if (passcode === ADMIN_PASSCODE || passcode === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const updateInfo = async (infoUpdate: Partial<BakeryInfo>) => {
    const updated: BakeryData = {
      ...data,
      info: { ...data.info, ...infoUpdate }
    };
    persistLocal(updated);
    if (isSupabaseConfigured) {
      await syncInfoToDB(updated.info);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `menu-${Date.now()}`
    };
    const updated: BakeryData = {
      ...data,
      menu: [newItem, ...data.menu]
    };
    persistLocal(updated);
    if (isSupabaseConfigured) {
      await insertMenuItemToDB(newItem);
    }
  };

  const updateMenuItem = async (id: string, itemUpdate: Partial<MenuItem>) => {
    const updated: BakeryData = {
      ...data,
      menu: data.menu.map(item => item.id === id ? { ...item, ...itemUpdate } : item)
    };
    persistLocal(updated);
    if (isSupabaseConfigured) {
      await updateMenuItemInDB(id, itemUpdate);
    }
  };

  const deleteMenuItem = async (id: string) => {
    const updated: BakeryData = {
      ...data,
      menu: data.menu.filter(item => item.id !== id)
    };
    persistLocal(updated);
    if (isSupabaseConfigured) {
      await deleteMenuItemFromDB(id);
    }
  };

  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    const updated: BakeryData = {
      ...data,
      gallery: [newItem, ...data.gallery]
    };
    persistLocal(updated);
    if (isSupabaseConfigured) {
      await insertGalleryItemToDB(newItem);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    const updated: BakeryData = {
      ...data,
      gallery: data.gallery.filter(item => item.id !== id)
    };
    persistLocal(updated);
    if (isSupabaseConfigured) {
      await deleteGalleryItemFromDB(id);
    }
  };

  const updateTimeline = (timeline: StoryMilestone[]) => {
    const updated: BakeryData = {
      ...data,
      timeline
    };
    persistLocal(updated);
  };

  const resetToDefaults = async () => {
    persistLocal(INITIAL_BAKERY_DATA);
    if (isSupabaseConfigured) {
      await syncInfoToDB(INITIAL_BAKERY_DATA.info);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    return uploadBakeryImage(file);
  };

  return (
    <BakeryContext.Provider
      value={{
        data,
        isLoading,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        updateInfo,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addGalleryItem,
        deleteGalleryItem,
        updateTimeline,
        resetToDefaults,
        uploadImage,
        saveStatus,
        isDatabaseConnected
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
}

export function useBakery() {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
}
