"use client";

import { useContext } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";
import {useTranslations} from 'next-intl';
import ProfileCard from "@/components/cards/ProfileCard";
import Image from "next/image";
import Link from "next/link";
import { downloadCV } from "@/utils/downloadUtils";
import {
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

/**
 * HomePage Component - Trang chủ hiển thị thông tin tổng quan
 * Hiển thị: Hero section, Skills overview, Education overview, Quick stats
 */
export default function HomePage() {
  const profileContext = useContext(ProfileContext);
  const t = useTranslations();
  const { profileData, loading } = profileContext || {};

  const handleDownloadCV = () => {
    if (profileData?.cvUrl) {
      downloadCV(profileData.cvUrl, profileData.name);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    name,
    title,
    bio,
    skills = [],
    education = [],
    avatarUrl,
  } = profileData || {};

  return (
    <div className="space-y-8 sm:space-y-12 lg:space-y-16">
      {/* Mobile Profile Card - Only visible on mobile */}
      <div className="lg:hidden">
        <ProfileCard />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/20 dark:bg-purple-400/10 rounded-full blur-2xl"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {" "}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block">{t("pages.home.hero.greeting")}</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {name || "Tên của bạn"}
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                {title || t("pages.home.hero.tagline")}
              </p>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {bio || t("pages.home.hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleDownloadCV}
                disabled={!profileData?.cvUrl}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none disabled:shadow-lg focus-ring"
                title={
                  profileData?.cvUrl ? t("profile.downloadCV") : "CV chưa có sẵn"
                }
                aria-label={
                  profileData?.cvUrl ? t("profile.downloadCV") : "CV chưa có sẵn"
                }
              >
                {" "}
                <span className="flex items-center justify-center space-x-2">
                  <span>{t("pages.home.hero.cta")}</span>
                  <ArrowDownTrayIcon className="w-4 h-4" />
                </span>
              </button>{" "}
              <Link
                href="/contact"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 focus-ring flex items-center justify-center space-x-2"
              >
                <span>{t("profile.contact")}</span>
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {avatarUrl && (
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-700 shadow-2xl ring-4 ring-blue-100 dark:ring-blue-900/20">
                <Image
                  src={avatarUrl}
                  alt={name || "Profile"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Skills Overview */}
        <section
          id="skills"
          className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>{" "}
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {t("profile.skills")}
            </h3>
          </div>

          <div className="space-y-6">
            {skills.slice(0, 3).map((skillCategory, index) => (
              <div key={index} className="group">
                <div className="flex items-start space-x-4 p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                      {skillCategory.type}
                    </h4>
                    <div className="space-y-2">
                      {skillCategory.data
                        .slice(0, 2)
                        .map((skill, skillIndex) => (
                          <p
                            key={skillIndex}
                            className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                          >
                            • {skill.split(":")[0]}
                          </p>
                        ))}{" "}
                      {skillCategory.data.length > 2 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                          +{skillCategory.data.length - 2} {t("common.readMore")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            {" "}
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 focus-ring rounded-lg p-2"
            >
              <span>{t("common.viewAll")}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* Education Overview */}
        <section
          id="education"
          className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>{" "}
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {t("profile.education")}
            </h3>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="group">
                <div className="p-4 rounded-lg border-l-4 border-green-500 bg-green-50/50 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-1 sm:space-y-0">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {edu.major}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-medium">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {edu.school}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            {" "}
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors duration-200 focus-ring rounded-lg p-2"
            >
              <span>{t("common.viewDetails")}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      </div>

      {/* Quick Stats */}
      <section className="bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
        {" "}
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {t("profile.professionalSummary")}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {skills.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {t("profile.skills")}
            </div>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              4+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {t("profile.yearsOfExperience")}
            </div>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {education.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {t("profile.education")}
            </div>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              10+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {t("profile.projects")}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
