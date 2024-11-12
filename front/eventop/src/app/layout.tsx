import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBarUsers from "../components/Navbar";
import Footer from "../components/Footer";
// import SideBar from "@/components/SideBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Eventop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-900 flex flex-col justify-between h-screen w-screen`}
      >
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
