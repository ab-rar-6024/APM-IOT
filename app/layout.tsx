import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PageLoader from "@/components/PageLoader";
import BackToTopButton from "@/components/BackToTopButton";

export const metadata: Metadata = {
  title: "APM Group | Certified Automotive & IoT Safety Solutions",
  description:
    "APM delivers certified speed governors, GPS tracking, and safety systems built for fleets, schools, and transport operators across India.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className="bg-white overflow-x-hidden">
        <PageLoader />
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}
