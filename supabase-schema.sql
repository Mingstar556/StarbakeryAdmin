-- ==========================================================
-- STAR BAKERY POSTGRESQL / SUPABASE DATABASE SCHEMA
-- ==========================================================

-- 1. SHOP INFO TABLE (Single record for bakery brand and announcements)
CREATE TABLE IF NOT EXISTS public.bakery_info (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  tagline TEXT,
  announcement TEXT,
  hero_headline TEXT,
  hero_subheadline TEXT,
  starter_age_years INTEGER DEFAULT 34,
  fermentation_hours INTEGER DEFAULT 72,
  address TEXT,
  phone TEXT,
  email TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.bakery_menu (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  french_name TEXT,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  allergens TEXT[] DEFAULT '{}',
  image TEXT NOT NULL,
  badge TEXT,
  is_sold_out BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. GALLERY ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.bakery_gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  aspect TEXT DEFAULT 'square',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.bakery_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bakery_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bakery_gallery ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access (Anyone can view the storefront)
CREATE POLICY "Public Read Info" ON public.bakery_info FOR SELECT USING (true);
CREATE POLICY "Public Read Menu" ON public.bakery_menu FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.bakery_gallery FOR SELECT USING (true);

-- Allow Public / Anon Insert, Update, Delete for Demo & Admin CMS
CREATE POLICY "Public Modify Info" ON public.bakery_info FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Modify Menu" ON public.bakery_menu FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Modify Gallery" ON public.bakery_gallery FOR ALL USING (true) WITH CHECK (true);

-- 5. ENABLE REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE public.bakery_info;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bakery_menu;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bakery_gallery;

-- 6. STORAGE BUCKET FOR PICTURE UPLOADS
INSERT INTO storage.buckets (id, name, public)
VALUES ('bakery-images', 'bakery-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public Read Images" ON storage.objects
FOR SELECT USING (bucket_id = 'bakery-images');

CREATE POLICY "Allow Image Uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'bakery-images');

CREATE POLICY "Allow Image Updates" ON storage.objects
FOR UPDATE USING (bucket_id = 'bakery-images');

CREATE POLICY "Allow Image Deletes" ON storage.objects
FOR DELETE USING (bucket_id = 'bakery-images');

-- 7. INITIAL SEED DATA
INSERT INTO public.bakery_info (
  id, name, tagline, announcement, hero_headline, hero_subheadline,
  starter_age_years, fermentation_hours, address, phone, email
) VALUES (
  'main',
  'Star Bakery',
  'Haute Fermentation & Patrimoine Hearth',
  'Limited release: Heritage Einkorn Miche fired fresh this dawn at 05:30',
  'Unhurried Patience. Terroir Grains. Living Wild Culture.',
  'An aristocratic lineage of slow stone-hearth fermentation. Fired daily on 300°C refractory volcanic stone with a 34-year levain culture.',
  34,
  72,
  '18 Rue des Artisans, Historic Quarter, Vienna',
  '+43 1 512 8890',
  'concierge@starbakeryatelier.com'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.bakery_menu (id, name, french_name, category, price, description, allergens, image, badge, is_sold_out)
VALUES
  ('menu-1', 'Heirloom Einkorn Miche', 'Miche de Seigle Sauvage', 'sourdough', '$16.00', 'Bronze-crusted round loaf milled from single-origin Alpine Einkorn with 72h cold fermentation.', ARRAY['Gluten'], 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', 'Signature Loaf', false),
  ('menu-2', 'Charentes Butter Croissant', 'Croissant Feuilleté au Beurre', 'viennoiserie', '$6.50', '81 laminated geometric layers of AOP Charentes-Poitou dry churned butter, brittle honeycomb crumb.', ARRAY['Gluten', 'Dairy'], 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80', 'Limited Morning', false),
  ('menu-3', 'Pain aux Raisins & Cardamom', 'Escargot Cardamome & Sucre Perlé', 'viennoiserie', '$7.50', 'Sultana raisins steeped in vintage rum syrup, hand-rolled with cracked green Malabar cardamom.', ARRAY['Gluten', 'Dairy', 'Eggs'], 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80', 'Atelier Favorite', false),
  ('menu-4', 'Pain de Campagne Bâtard', 'Bâtard Traditionnel au Levain', 'sourdough', '$14.00', 'Rustic stoneground T80 wheat and roasted malted barley. Blistered ear with airy custard crumb.', ARRAY['Gluten'], 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80', 'Private Reserve', false),
  ('menu-5', 'Guanaja Chocolate Kouign-Amann', 'Kouign-Amann au Chocolat Noir', 'patisserie', '$8.50', 'Caramelized Breton butter pastry folded with coarse Guerande sea salt and 70% Valrhona Guanaja.', ARRAY['Gluten', 'Dairy'], 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80', 'Single Hearth', false),
  ('menu-6', 'Valrhona Cocoa Nib Brioche', 'Brioche Tressée aux Grués de Cacao', 'patisserie', '$9.00', 'Featherlight braided egg brioche infused with roasted crushed Peruvian cocoa nibs.', ARRAY['Gluten', 'Dairy', 'Eggs'], 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80', 'Chef Selection', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.bakery_gallery (id, title, category, description, image, aspect)
VALUES
  ('gal-1', 'Dawn Flour Dusting on the Refractory Hearth', 'artisan-bread', 'Hand-scored bâtards entering the 280°C steam deck oven.', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80', 'wide'),
  ('gal-2', '81 Micro-Layers of French Butter Honeycomb', 'pastry', 'Cross-section of our morning viennoiserie pastry casing.', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80', 'square'),
  ('gal-3', 'Hand-Shaping Heritage Einkorn Boules', 'craft', 'A gentle stretch and fold preserving fragile gas cavities.', 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=80', 'tall'),
  ('gal-4', 'The Atelier Heritage Mill and Hearth Room', 'space', 'Natural daylight pouring over century-old French oak flour bins.', 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80', 'wide')
ON CONFLICT (id) DO NOTHING;
