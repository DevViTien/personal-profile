"use client";

import { useEffect } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useLocale } from 'next-intl';

/**
 * Hook to sync ProfileContext with next-intl
 * This hook automatically loads profile data when language changes
 */
export const useProfileLanguageSync = () => {
  const currentLanguage = useLocale();
  const { loadProfileData } = useProfile();

  useEffect(() => {
    if (currentLanguage && loadProfileData) {
      // Map current locale to language code supported in profile data
      const languageCode = currentLanguage as "vi" | "en" | "zh" | "hi";
      loadProfileData(languageCode);
    }
  }, [currentLanguage, loadProfileData]);

  return null; // This hook doesn't return any value, just handles side effects
};
