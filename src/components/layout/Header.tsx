"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";
import ThemeToggleButton from "./ThemeToggleButton"; // Import component mới

export default function Header() {
  const profileContext = useContext(ProfileContext);
  const { profileData, loading } = profileContext || {};
  const { avatarUrl, slug } = profileData || {};

  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-3 shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xl font-bold text-gray-800 dark:text-white"
        >
          {loading && (
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
          )}
          {!loading && avatarUrl && (
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
              <Image
                src={avatarUrl}
                alt={slug || "User Avatar"}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          {slug && <span className="hidden sm:inline">{slug}</span>}
        </Link>
        <div className="space-x-4 flex items-center">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Trang chủ
          </Link>
          <Link
            href="/about"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Giới thiệu
          </Link>
          <Link
            href="/projects"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Dự án
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Liên hệ
          </Link>
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}
