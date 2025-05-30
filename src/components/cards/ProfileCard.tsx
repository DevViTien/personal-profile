"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProfileContext } from "@/contexts/ProfileContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { downloadCV } from "@/utils/downloadUtils";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function ProfileCard() {
  const profileContext = useContext(ProfileContext);
  const { t } = useLanguage();

  if (profileContext?.loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-sm mx-auto animate-pulse">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-full space-y-2">
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (profileContext?.error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 shadow-lg rounded-xl p-6 w-full max-w-sm mx-auto">
        {" "}
        <div className="text-center">
          <UserIcon className="w-12 h-12 mx-auto mb-2 text-red-400" />
          <p className="text-sm">{t.errors.loadingFailed}</p>
        </div>
      </div>
    );
  }
  const { profileData } = profileContext || {};
  const {
    name,
    avatarUrl,
    title,
    email,
    phone,
    address,
    birthDate,
    gender,
    cvUrl,
  } = profileData || {};

  const handleDownloadCV = () => {
    if (cvUrl) {
      downloadCV(cvUrl, name);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-sm mx-auto border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        {avatarUrl ? (
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-gray-700 shadow-lg ring-2 ring-blue-100 dark:ring-blue-900/20">
            <Image
              src={avatarUrl}
              alt={name || "User Avatar"}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 mb-4 shadow-lg">
            <UserIcon className="w-16 h-16" />
          </div>
        )}
        {/* Name & Title */}{" "}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {name || "Your Name"}
          </h2>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
            {title || t.profile.currentPosition}
          </p>
        </div>
        {/* Contact Information */}
        <div className="w-full space-y-3">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group focus-ring rounded-lg p-2"
            >
              <EnvelopeIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="truncate">{email}</span>
            </a>
          )}

          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group focus-ring rounded-lg p-2"
            >
              <PhoneIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span>{phone}</span>
            </a>
          )}

          {address?.short && (
            <div className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-300 p-2">
              <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{address.short}</span>
            </div>
          )}

          {birthDate && (
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300 p-2">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <span>{birthDate}</span>
              {gender && <span className="text-gray-400">•</span>}
              {gender && <span>{gender}</span>}
            </div>
          )}
        </div>{" "}
        {/* Action Buttons */}
        <div className="w-full mt-6 space-y-2">
          <button
            onClick={handleDownloadCV}
            disabled={!cvUrl}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 focus-ring shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-lg flex items-center justify-center space-x-2"
            title={cvUrl ? t.profile.downloadCV : "CV chưa có sẵn"}
            aria-label={cvUrl ? t.profile.downloadCV : "CV chưa có sẵn"}
          >
            {" "}
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>{t.actions.download}</span>
          </button>{" "}
          <Link
            href="/contact"
            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:border-blue-400 dark:text-blue-400 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 focus-ring flex items-center justify-center space-x-2 hover:border-blue-700 dark:hover:border-blue-300"
          >
            {" "}
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            <span>{t.profile.contact}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
