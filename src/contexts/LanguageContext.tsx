"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LanguageCode, Language, Translation } from "@/types/language";

// Supported languages
export const LANGUAGES: Language[] = [
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳'
  }
];

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: Translation;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Default language
const DEFAULT_LANGUAGE: LanguageCode = 'vi';
const STORAGE_KEY = 'preferred-language';

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<Translation | null>(null);

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY) as LanguageCode;
    if (savedLanguage && LANGUAGES.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`@/constants/translations/${currentLanguage}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${currentLanguage}:`, error);
        // Fallback to Vietnamese if translation fails
        if (currentLanguage !== 'vi') {
          try {
            const fallbackModule = await import(`@/constants/translations/vi.json`);
            setTranslations(fallbackModule.default);
          } catch (fallbackError) {
            console.error('Failed to load fallback translations:', fallbackError);
            // Use default translations if everything fails
            setTranslations(null);
          }
        }
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  const setLanguage = (language: LanguageCode) => {
    setCurrentLanguage(language);
    localStorage.setItem(STORAGE_KEY, language);
  };

  // Provide default translations if not loaded yet
  const defaultTranslations: Translation = {
    navigation: {
      home: "Trang chủ",
      about: "Giới thiệu", 
      projects: "Dự án",
      contact: "Liên hệ"
    },
    theme: {
      light: "Chế độ sáng",
      dark: "Chế độ tối",
      toggleToLight: "Chuyển sang chế độ sáng",
      toggleToDark: "Chuyển sang chế độ tối"
    },
    language: {
      selectLanguage: "Chọn ngôn ngữ",
      currentLanguage: "Ngôn ngữ hiện tại"
    },
    common: {
      loading: "Đang tải...",
      error: "Lỗi",
      success: "Thành công",
      portfolio: "Portfolio"
    },
    profile: {
      welcome: "Chào mừng",
      downloadCV: "Tải CV",
      skills: "Kỹ năng",
      experience: "Kinh nghiệm",
      education: "Học vấn",
      contact: "Liên hệ"
    }
  };

  const value = {
    currentLanguage,
    setLanguage,
    t: translations || defaultTranslations,
    languages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
