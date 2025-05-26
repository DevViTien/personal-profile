"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import profileDataJson from "@/constants/profileData.json";

interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  sourceUrl?: string;
}

interface ProfileData {
  name?: string;
  slug?: string;
  title?: string;
  email?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  socialLinks?: SocialLinks;
  skills?: string[];
  experience?: Experience[];
  projects?: Project[];
}

interface ProfileContextType {
  profileData: ProfileData | null;
  loading: boolean;
  error: string | null;
  // fetchProfileData: () => Promise<void>; // We will implement this later
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = () => {
      try {
        setProfileData(profileDataJson as ProfileData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile data.");
        setLoading(false);
        console.error(err);
      }
    };

    loadProfileData();
  }, []);

  const value = {
    profileData,
    loading,
    error,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
