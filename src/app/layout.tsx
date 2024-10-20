import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


import Providers from "./providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find your dream job",
  description: "A job portal next.js application",
};

export default function RootLayout({

  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <body className={inter.className}>

        <Providers>
          {children}
          <Toaster />
        </Providers>

      </body>
    </html>

  );
}
