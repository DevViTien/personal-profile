"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProfile } from "@/contexts/ProfileContext";

/**
 * Hook to sync ProfileContext with LanguageContext
 * This hook automatically loads profile data when language changes
 */
export const useProfileLanguageSync = () => {
  const { currentLanguage } = useLanguage();
  const { loadProfileData } = useProfile();

  useEffect(() => {
    if (currentLanguage && loadProfileData) {
      loadProfileData(currentLanguage);
    }
  }, [currentLanguage, loadProfileData]);

  return null; // This hook doesn't return any value, just handles side effects
};
