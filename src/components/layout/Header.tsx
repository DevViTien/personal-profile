"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { ProfileContext } from "@/contexts/ProfileContext";
import { useTranslations } from "next-intl";
import LanguageSelector from "@/components/layout/LanguageSelector";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";

const navigationItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const profileContext = useContext(ProfileContext);
  const t = useTranslations();
  const { profileData, loading } = profileContext || {};
  const { avatarUrl, slug } = profileData || {};

  const showAvatarLoading = loading && !profileData;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus-ring rounded-lg"
            onClick={closeMobileMenu}
          >
            {showAvatarLoading && (
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            )}
            {!showAvatarLoading && avatarUrl && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-sm">
                <Image
                  src={avatarUrl}
                  alt={slug || "User Avatar"}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            )}
            <span className="hidden sm:inline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {slug || t("common.portfolio")}
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-ring ${
                  isActiveLink(item.href)
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {t(`navigation.${item.key}`)}
              </Link>
            ))}
            <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 flex items-center space-x-2">
              <LanguageSelector />
              <ThemeSwitcher />
            </div>
          </div>{" "}
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <ThemeSwitcher />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus-ring"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-64 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-2 pb-2 space-y-1 border-t border-gray-200 dark:border-gray-700">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 focus-ring ${
                  isActiveLink(item.href)
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {t(`navigation.${item.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
