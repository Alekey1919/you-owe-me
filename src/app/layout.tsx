import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import StoreProvider from "./redux/StoreProvider";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "You owe me",
  description: "Split your tickets evenly between participants",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <StoreProvider>
      <html lang={locale} className="min-h-screen w-screen bg-background">
        <body className="text-accent">
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <div className={outfit.className}>{children}</div>
            <div id="portal" />

            <Toaster />
          </NextIntlClientProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
