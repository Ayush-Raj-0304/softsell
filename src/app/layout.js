import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SoftSell | Sell Your Unused Software Licenses",
  description: "SoftSell helps businesses monetize unused software licenses. Get instant valuations and quick payments for your surplus software.",
  keywords: "software resale, license reselling, software marketplace, unused licenses, software valuation",
  openGraph: {
    title: "SoftSell | Sell Your Unused Software Licenses",
    description: "Turn your unused software licenses into cash with SoftSell's quick and easy valuation process.",
    url: "https://softsell-ayush-raj-0304s-projects.vercel.app/",
    siteName: "SoftSell",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Ensure mobile responsive layout */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
