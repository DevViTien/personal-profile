"use client";

import { useContext } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { profileData } = useContext(ProfileContext) || {};
  const profileName = profileData?.name || "";

  if (!profileName) {
    return null;
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-gray-600 dark:text-gray-300">
      <p>
        &copy; {currentYear} {profileName}. All rights reserved.
      </p>
      {/* Add social media links or other info here later */}
    </footer>
  );
}
