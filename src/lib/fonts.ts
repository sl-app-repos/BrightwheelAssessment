import { Inter } from "next/font/google";

/**
 * Inter is fetched from Google Fonts at build time via `next/font/google`.
 * Next.js downloads and self-hosts the files under `/_next/static/media/` —
 * no font files are bundled from this repo's directory.
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: true,
});
