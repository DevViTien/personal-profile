"use client";

import { useContext } from "react";
import Image from "next/image";
import { ProfileContext } from "@/contexts/ProfileContext";

export default function ProfileCard() {
  const profileContext = useContext(ProfileContext);

  if (profileContext?.loading) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (profileContext?.error) {
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 shadow-md rounded-lg">
        Error loading profile.
      </div>
    );
  }

  const { profileData } = profileContext || {};
  const { name, avatarUrl, title, email, phone } = profileData || {};

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-sm mx-auto">
      <div className="flex flex-col items-center">
        {" "}
        {avatarUrl ? (
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-200 dark:border-gray-700">
            <Image
              src={avatarUrl}
              alt={name || "User Avatar"}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 mb-4">
            No Avatar
          </div>
        )}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {name || "Your Name"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {title || "Your Title"}
        </p>
        {email && (
          <a
            href={`mailto:${email}`}
            className="mt-2 text-sm text-blue-500 dark:text-blue-400 hover:underline"
          >
            {email}
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="mt-1 text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            {phone}
          </a>
        )}
      </div>
    </div>
  );
}
