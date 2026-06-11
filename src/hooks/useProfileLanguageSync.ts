"use client";

import { useEffect, useRef } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useLocale } from "next-intl";
import { LanguageCode } from "@/types/language";

/**
 * Hook to sync ProfileContext with next-intl
 * This hook automatically loads profile data when language changes
 */
export const useProfileLanguageSync = () => {
  const currentLanguage = useLocale();
  const { loadProfileData } = useProfile();
  const previousLanguage = useRef<string | null>(null);

  useEffect(() => {
    if (
      currentLanguage &&
      loadProfileData &&
      currentLanguage !== previousLanguage.current
    ) {
      // Map current locale to language code supported in profile data (6 ngôn ngữ)
      const languageCode = currentLanguage as LanguageCode;
      loadProfileData(languageCode);
      previousLanguage.current = currentLanguage;
    }
  }, [currentLanguage, loadProfileData]);

  return null; // This hook doesn't return any value, just handles side effects
};
