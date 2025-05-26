import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { AppProvider } from "@/contexts/AppProvider";
import "./globals.css";

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
      <html lang="en" className="h-full">
        <body className="flex flex-col min-h-full">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-grow p-4 md:p-6">{children}</main>
          </div>
          <Footer />
        </body>
      </html>
    </AppProvider>
  );
}
