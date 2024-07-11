import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import {  Html, Head} from "next/document";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Image to text",
  description: "Convert images to text using OCR",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://my-image-to-text.vercel.app/',
    siteName: 'Image to text',
    title: 'Image to text',
    description: 'Convert images to text using OCR',
    images: [
      {
        url: 'https://my-image-to-text.vercel.app/itt.gif',
        width: 1200,
        height: 630,
        alt: 'Image to text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SophieHasindrae',  
    title: 'Image to text',
    description: 'Convert images to text using OCR',
    images: 'https://my-image-to-text.vercel.app/itt.gif',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Convert images to text using OCR" />
        <meta name="keywords" content="OCR, Image to Text, Online OCR" />
        <meta name="author" content="Sophie Hasindrae" />
        <meta property="og:title" content="Image to text" />
        <meta property="og:description" content="Convert images to text using OCR" />
        <meta property="og:image" content="https://my-image-to-text.vercel.app/itt.gif" />
        <meta property="og:url" content="https://my-image-to-text.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SophieHasindrae" />
        <meta name="twitter:title" content="Image to text" />
        <meta name="twitter:description" content="Convert images to text using OCR" />
        <meta name="twitter:image" content="https://my-image-to-text.vercel.app/itt.gif" />
        <meta name="google-adsense-account" content="ca-pub-4219691541903798"/>
      </Head>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>{children}
        <Toaster />
      </body>
    </Html>
  );
}
