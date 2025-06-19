"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ProfileData } from "@/types/profile";
import { getProfileData } from "@/utils/getProfileData";
import { LanguageCode } from "@/types/language";

interface ProfileContextType {
  profileData: ProfileData | null;
  loading: boolean;
  languageLoading: boolean;
  error: string | null;
  loadProfileData: (language: LanguageCode) => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [languageLoading, setLanguageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfileData = async (language: LanguageCode) => {
    try {
      // Use languageLoading for language switches, loading for initial load
      if (profileData) {
        setLanguageLoading(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const data = await getProfileData(language);
      setProfileData(data as ProfileData);
      setLoading(false);
      setLanguageLoading(false);
    } catch (err) {
      setError("Failed to load profile data.");
      setLoading(false);
      console.error("Profile data loading error:", err);
    }
  };
  // Load default Vietnamese data on mount
  useEffect(() => {
    loadProfileData("vi");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value = {
    profileData,
    loading,
    languageLoading,
    error,
    loadProfileData,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
