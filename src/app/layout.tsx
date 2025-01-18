import { Metadata } from 'next'
import "./globals.css";

export const metadata: Metadata = {
  title: 'AI Wellness Coach',
  description: 'Your personal AI dietitian and wellness coach for a healthier lifestyle',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  openGraph: {
    title: 'AI Wellness Coach',
    description: 'Transform your health journey with personalized nutrition and wellness guidance',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: '#111827', // matches our gray-900 header
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
