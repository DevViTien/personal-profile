"use client";

import React, { ReactNode } from "react";
import { useProfileLanguageSync } from "@/hooks/useProfileLanguageSync";

interface ProfileLanguageSyncComponentProps {
  children: ReactNode;
}

/**
 * Component wrapper to handle profile data synchronization with language changes
 * This component uses the useProfileLanguageSync hook to automatically load profile data
 * when the current language changes
 */
export const ProfileLanguageSyncComponent: React.FC<
  ProfileLanguageSyncComponentProps
> = ({ children }) => {
  // This hook handles the synchronization between language and profile data
  useProfileLanguageSync();

  return <>{children}</>;
};
