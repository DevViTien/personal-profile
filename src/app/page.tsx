"use client";

import { useContext } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";
import Image from "next/image";

export default function Home() {
  const profileContext = useContext(ProfileContext);
  const { profileData, loading } = profileContext || {};

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
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/10 dark:to-purple-400/10"></div>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                Xin chào! Tôi là
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                {name || "Your Name"}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                {title || "Your Title"}
              </p>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {bio || "Your bio description will appear here."}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Xem CV của tôi
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 py-3 rounded-lg font-medium transition-colors">
                Liên hệ với tôi
              </button>
            </div>
          </div>
          {avatarUrl && (
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-700 shadow-xl">
                <Image
                  src={avatarUrl}
                  alt={name || "Profile"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills Overview */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Kỹ năng chuyên môn
          </h3>
          <div className="space-y-4">
            {skills.slice(0, 3).map((skillCategory, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {skillCategory.type}
                </h4>
                <div className="space-y-1">
                  {skillCategory.data.slice(0, 2).map((skill, skillIndex) => (
                    <p
                      key={skillIndex}
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      {skill.split(":")[0]}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="/about"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Xem tất cả kỹ năng →
            </a>
          </div>
        </section>

        {/* Education Overview */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Học vấn
          </h3>
          {education.map((edu, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {edu.major}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {edu.period}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                {edu.school}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {edu.description}
              </p>
            </div>
          ))}
          <div className="mt-6">
            <a
              href="/about"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Xem chi tiết →
            </a>
          </div>
        </section>
      </div>

      {/* Quick Stats */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Tóm tắt nhanh
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {skills.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Lĩnh vực kỹ năng
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              6+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Năm kinh nghiệm
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {education.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Bằng cấp
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              10+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Dự án hoàn thành
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
