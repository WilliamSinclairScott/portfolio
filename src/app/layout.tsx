import type { Metadata } from "next";
import localFont from "next/font/local";
import {Theme, Container } from "@radix-ui/themes"

import "./globals.css";

import "@radix-ui/themes/styles.css"

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
  title: "WSinScott Portfolio",
  description: "Hi welcome to my portfolio, I also use this to make fun small projects for friends and family so if the website is down it's probably because I'm working on something new.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black m-0`}
      >
      <Theme>
        <Container className="p-0 bg-black -z-10">
        {children}
        </Container>
        {/* <ThemePanel /> */}
      </Theme>
      </body>
    </html>
  );
}
