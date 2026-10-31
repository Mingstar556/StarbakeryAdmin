import type { Metadata } from 'next';
import { Pinyon_Script, Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { BakeryProvider } from '@/context/BakeryContext';

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-curvy-script',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Star Bakery Curator Suite • Private Editorial Control",
  description: "Curator Suite & Editorial Console for Star Bakery Atelier.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pinyonScript.variable} ${playfair.variable} ${inter.variable} antialiased`}>
      <body className="bg-[#fafaf9] text-stone-900 selection:bg-[#d6d3d1] selection:text-[#18181b]">
        <BakeryProvider>
          {children}
        </BakeryProvider>
      </body>
    </html>
  );
}
