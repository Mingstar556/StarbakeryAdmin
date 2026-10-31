# Star Bakery — Curator Suite & Admin Console

Private editorial control and vintage archive manager for Star Bakery. Designed in an Architectural Sketchbook aesthetic with high-contrast, effortless readability, photo uploading, and real-time database synchronization with the public storefront.

Controls the [Star Bakery Public Storefront](https://github.com/Mingstar556/Starbakery) through a shared Supabase PostgreSQL database and image storage bucket.

## Features
- **Passcode Authentication**: Master security passcode gate (default: `bakery2026`).
- **Brand & Announcements Editor**: Instantly update daily bakery release notes and headline content.
- **Reserve Menu Manager**: Add, edit, toggle availability (`Available` vs `Sold Out`), and delete menu items.
- **Archive Photograph Mount**: Direct device file/photo upload to Supabase Storage (`bakery-images`), with URL fallback.
- **Interactive Live Preview**: Split-screen live responsive preview of the public storefront across Desktop, Tablet, and Mobile viewports.
- **Real-Time PostgreSQL Sync**: All changes synchronize across both Admin and Storefront applications in real time.

## Tech Stack
- **Framework**: Next.js 16 (Turbopack, App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4 & Frosted Glass
- **Icons**: Lucide React
- **Database & Storage**: Supabase / PostgreSQL (`@supabase/supabase-js`)

## Getting Started

1. Clone repository:
   ```bash
   git clone https://github.com/Mingstar556/StarbakeryAdmin.git
   cd StarbakeryAdmin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy `.env.example` to `.env.local` and configure your credentials:
   ```bash
   cp .env.example .env.local
   ```

4. Database Setup:
   Execute `supabase-schema.sql` in your Supabase SQL Editor to create tables and the `bakery-images` storage bucket.

5. Run locally:
   ```bash
   npm run dev -- -p 3001
   ```
   Open [http://localhost:3001](http://localhost:3001) in your browser.
