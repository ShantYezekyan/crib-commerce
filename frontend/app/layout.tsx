import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/providers";
import { Navbar } from "@/components";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crib Commerce",
  description: "Sell your crib",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
