import { supabase, isSupabaseConfigured } from './supabase';
import { BakeryData, BakeryInfo, MenuItem, GalleryItem, INITIAL_BAKERY_DATA } from './bakery-data';

const STORAGE_BUCKET = 'bakery-images';

/**
 * Uploads an image file to Supabase Storage and returns the public URL.
 * Falls back to a local Base64 Data URL if Supabase is not configured or in offline preview mode.
 */
export async function uploadBakeryImage(file: File): Promise<string> {
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
      const filePath = `${Date.now()}-${cleanName}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.warn('Supabase storage upload error, falling back to base64:', error.message);
      } else if (data) {
        const { data: publicData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(data.path);
        if (publicData?.publicUrl) {
          return publicData.publicUrl;
        }
      }
    } catch (err) {
      console.warn('Failed to upload image to Supabase:', err);
    }
  }

  // Fallback: convert file to Base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Fetches the complete bakery data from Supabase PostgreSQL tables.
 */
export async function fetchBakeryDataFromDB(): Promise<BakeryData | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const [infoRes, menuRes, galleryRes] = await Promise.all([
      supabase.from('bakery_info').select('*').eq('id', 'main').single(),
      supabase.from('bakery_menu').select('*').order('created_at', { ascending: false }),
      supabase.from('bakery_gallery').select('*').order('created_at', { ascending: false })
    ]);

    if (infoRes.error && menuRes.error && galleryRes.error) {
      console.warn('Could not query Supabase tables, using local fallback:', infoRes.error);
      return null;
    }

    const info: BakeryInfo = infoRes.data ? {
      ...INITIAL_BAKERY_DATA.info,
      name: infoRes.data.name || INITIAL_BAKERY_DATA.info.name,
      tagline: infoRes.data.tagline || INITIAL_BAKERY_DATA.info.tagline,
      announcement: infoRes.data.announcement || INITIAL_BAKERY_DATA.info.announcement,
      heroHeadline: infoRes.data.hero_headline || INITIAL_BAKERY_DATA.info.heroHeadline,
      heroSubheadline: infoRes.data.hero_subheadline || INITIAL_BAKERY_DATA.info.heroSubheadline,
      starterAgeYears: infoRes.data.starter_age_years ?? INITIAL_BAKERY_DATA.info.starterAgeYears,
      fermentationHours: infoRes.data.fermentation_hours ?? INITIAL_BAKERY_DATA.info.fermentationHours,
      address: infoRes.data.address || INITIAL_BAKERY_DATA.info.address,
      phone: infoRes.data.phone || INITIAL_BAKERY_DATA.info.phone,
      email: infoRes.data.email || INITIAL_BAKERY_DATA.info.email,
    } : INITIAL_BAKERY_DATA.info;

    const menu: MenuItem[] = (menuRes.data && menuRes.data.length > 0)
      ? menuRes.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          frenchName: item.french_name,
          category: item.category,
          price: item.price,
          description: item.description,
          allergens: item.allergens || [],
          image: item.image,
          badge: item.badge,
          isSoldOut: item.is_sold_out ?? false
        }))
      : INITIAL_BAKERY_DATA.menu;

    const gallery: GalleryItem[] = (galleryRes.data && galleryRes.data.length > 0)
      ? galleryRes.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          description: item.description,
          image: item.image,
          aspect: item.aspect || 'square'
        }))
      : INITIAL_BAKERY_DATA.gallery;

    return {
      info,
      menu,
      gallery,
      timeline: INITIAL_BAKERY_DATA.timeline
    };
  } catch (err) {
    console.error('Error fetching data from Supabase:', err);
    return null;
  }
}

/**
 * Persists updated bakery info to Supabase PostgreSQL table.
 */
export async function syncInfoToDB(info: BakeryInfo): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase.from('bakery_info').upsert({
      id: 'main',
      name: info.name,
      tagline: info.tagline,
      announcement: info.announcement,
      hero_headline: info.heroHeadline,
      hero_subheadline: info.heroSubheadline,
      starter_age_years: info.starterAgeYears,
      fermentation_hours: info.fermentationHours,
      address: info.address,
      phone: info.phone,
      email: info.email,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch (err) {
    console.error('Failed to sync info to DB:', err);
    return false;
  }
}

/**
 * Persists a new menu item to Supabase PostgreSQL table.
 */
export async function insertMenuItemToDB(item: MenuItem): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase.from('bakery_menu').insert({
      id: item.id,
      name: item.name,
      french_name: item.frenchName,
      category: item.category,
      price: item.price,
      description: item.description,
      allergens: item.allergens,
      image: item.image,
      badge: item.badge,
      is_sold_out: item.isSoldOut ?? false
    });
    return !error;
  } catch (err) {
    console.error('Failed to insert menu item to DB:', err);
    return false;
  }
}

/**
 * Updates a menu item in Supabase PostgreSQL table.
 */
export async function updateMenuItemInDB(id: string, updates: Partial<MenuItem>): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.frenchName !== undefined) dbUpdates.french_name = updates.frenchName;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.price !== undefined) dbUpdates.price = updates.price;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.allergens !== undefined) dbUpdates.allergens = updates.allergens;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
    if (updates.isSoldOut !== undefined) dbUpdates.is_sold_out = updates.isSoldOut;

    const { error } = await supabase.from('bakery_menu').update(dbUpdates).eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to update menu item in DB:', err);
    return false;
  }
}

/**
 * Deletes a menu item from Supabase PostgreSQL table.
 */
export async function deleteMenuItemFromDB(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase.from('bakery_menu').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to delete menu item from DB:', err);
    return false;
  }
}

/**
 * Persists a new gallery item to Supabase PostgreSQL table.
 */
export async function insertGalleryItemToDB(item: GalleryItem): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase.from('bakery_gallery').insert({
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
      aspect: item.aspect || 'square'
    });
    return !error;
  } catch (err) {
    console.error('Failed to insert gallery item to DB:', err);
    return false;
  }
}

/**
 * Deletes a gallery item from Supabase PostgreSQL table.
 */
export async function deleteGalleryItemFromDB(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase.from('bakery_gallery').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('Failed to delete gallery item from DB:', err);
    return false;
  }
}
