import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AppProvider } from "@/context/AppContext";
import QueryProvider from "@/providers/QueryProvider";
import BProgress from "@/providers/BProgress";
import { FilterProvider } from "@/context/FilterContext";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReelTone",
  description: "A platform for film enthusiasts to connect and share",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='theme-color' content='#000000' />
      <meta property='og:title' content='ReelTone' />
      <meta
        property='og:description'
        content='A platform for film enthusiasts to connect and share'
      />
      <meta
        property='og:image'
        content='https://reeltone.streamgrid.site/images/reel_logo_bg.png'
      />
      <meta
        name='google-site-verification'
        content='gmAlnfW2LzlhdOVNgnUYZYfbuooRuQVNgNAeekIGeiY'
      />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='icon' href='/images/favicon.ico' type='image/x-icon' />
      <ClerkProvider dynamic>
        <QueryProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <AppProvider>
              <Toaster position='bottom-right' richColors />
              <div className='app-full-bleed'>
                <FilterProvider>
                  <BProgress>{children}</BProgress>
                </FilterProvider>
              </div>
            </AppProvider>
            <div id='modals' />
          </body>
        </QueryProvider>
      </ClerkProvider>
    </html>
  );
}
