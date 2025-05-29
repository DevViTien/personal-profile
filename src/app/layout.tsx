import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { AppProvider } from "@/contexts/AppProvider";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Open_Sans({
  subsets: ["latin", "vietnamese", "latin-ext"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "TruongNBN Profile",
  description: "Personal Profile Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="vi" className={inter.className}>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#3b82f6" />
        </head>
        <body className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header />{" "}
          <div className="flex flex-1 relative">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
          <Footer />
        </body>
      </html>
    </AppProvider>
  );
}
