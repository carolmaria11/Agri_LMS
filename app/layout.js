"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { UserMemberContext } from "./_context/UserMemberContext";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };



export default function RootLayout({ children }) {
  const [isMember,setIsMember]=useState(false);
  return (
    <html lang="en">
      <head>
      <link rel="icon" type="image/x-icon" href="/fav.svg"></link>
      <title>Agri-Learn</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <UserMemberContext.Provider value={{isMember,setIsMember}}>
        {children}
        <Toaster />
        </UserMemberContext.Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
