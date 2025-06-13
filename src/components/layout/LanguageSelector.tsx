"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/navigation";

const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    direction: "ltr",
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    direction: "ltr",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    direction: "ltr",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    direction: "ltr",
  },
];

export default function LanguageSelector() {
  const t = useTranslations("language");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLanguage =
    languages.find((lang) => lang.code === locale) ||
    languages.find((lang) => lang.code === "vi") ||
    languages[0];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        aria-label={t("selectLanguage")}
        title={t("selectLanguage")}
        className="flex items-center p-1.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-ring"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="language-menu"
      >
        <span className="text-xl" aria-hidden="true">
          {currentLanguage.flag}
        </span>
        <ChevronDownIcon className="w-4 h-4 ml-1" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id="language-menu"
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-50 ring-1 ring-gray-200 dark:ring-gray-700"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            {t("selectLanguage")}
          </div>
          <div className="py-1">
            {languages.map((language) => (
              <Link
                key={language.code}
                href={language.code}
                locale={language.code}
                className={`flex items-center px-4 py-2 text-sm ${
                  locale === language.code
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <span className="mr-2 text-lg">{language.flag}</span>
                <span>{language.nativeName}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
