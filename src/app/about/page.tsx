"use client";

import { useContext } from "react";
import Link from "next/link";
import { ProfileContext } from "@/contexts/ProfileContext";
import { downloadCV } from "@/utils/downloadUtils";
import Image from "next/image";
import {
  AcademicCapIcon,
  TrophyIcon,
  HeartIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  SparklesIcon,
  CodeBracketIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  const profileContext = useContext(ProfileContext);
  const { profileData, loading } = profileContext || {};

  const handleDownloadCV = () => {
    if (profileData?.cvUrl) {
      downloadCV(profileData.cvUrl, profileData.name);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-48 h-48 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto lg:mx-0"></div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
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
    email,
    phone,
    gender,
    birthDate,
    address,
    avatarUrl,
    skills = [],
    education = [],
    awards = [],
    hobbies = [],
  } = profileData || {};
  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Giới thiệu
                </span>
                <span className="block mt-2">về tôi</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                Tìm hiểu thêm về hành trình và đam mê của tôi
              </p>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {bio || "Mô tả chi tiết về bản thân sẽ xuất hiện tại đây."}
            </p>
          </div>

          {avatarUrl && (
            <div className="flex justify-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-8 border-white dark:border-gray-700 shadow-2xl ring-4 ring-blue-100 dark:ring-blue-900/20">
                <Image
                  src={avatarUrl}
                  alt={name || "Profile"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Personal Information */}
          <section className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Thông tin cá nhân
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-6">
                <div className="group">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Họ và tên
                  </label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                    {name || "Chưa cập nhật"}
                  </p>
                </div>
                <div className="group">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Chức danh
                  </label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                    {title || "Chưa cập nhật"}
                  </p>
                </div>
                <div className="group">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Giới tính
                  </label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                    {gender || "Chưa cập nhật"}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Ngày sinh
                  </label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                    {birthDate || "Chưa cập nhật"}
                  </p>
                </div>
                <div className="group">
                  <div className="flex items-center space-x-2 mb-1">
                    <EnvelopeIcon className="w-4 h-4 text-blue-500" />
                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Email
                    </label>
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {email || "Chưa cập nhật"}
                  </a>
                </div>
                <div className="group">
                  <div className="flex items-center space-x-2 mb-1">
                    <PhoneIcon className="w-4 h-4 text-blue-500" />
                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Điện thoại
                    </label>
                  </div>
                  <a
                    href={`tel:${phone}`}
                    className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {phone || "Chưa cập nhật"}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <MapPinIcon className="w-4 h-4 text-blue-500" />
                <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Địa chỉ
                </label>
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {address?.short || "Chưa cập nhật"}
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Kỹ năng chuyên môn
              </h2>
            </div>

            <div className="space-y-8">
              {skills.map((skillCategory, index) => (
                <div key={index} className="group">
                  <div className="flex items-center space-x-3 mb-4">
                    <CodeBracketIcon className="w-5 h-5 text-purple-500" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {skillCategory.type}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {skillCategory.data.map((skill, skillIndex) => {
                      const [skillName, skillDesc] = skill.split(":");
                      return (
                        <div
                          key={skillIndex}
                          className="bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800 rounded-lg p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
                        >
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            <span>{skillName}</span>
                          </h4>
                          {skillDesc && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed ml-4">
                              {skillDesc.trim()}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Học vấn
              </h2>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="group">
                  <div className="bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-800 rounded-lg p-6 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                        <AcademicCapIcon className="w-5 h-5 text-green-500" />
                        <span>{edu.major}</span>
                      </h3>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-full">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      {edu.school}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* Awards Section */}
          {awards && awards.length > 0 && (
            <section className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-6 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Giải thưởng
                </h2>
              </div>

              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div key={index} className="group">
                    <div className="bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrophyIcon className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40 px-2 py-1 rounded-full">
                          {award.year}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hobbies Section */}
          {hobbies && hobbies.length > 0 && (
            <section className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Sở thích
                </h2>
              </div>

              <div className="space-y-3">
                {hobbies.map((hobby, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <HeartIcon className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {hobby}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quick Actions */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl lg:rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <SparklesIcon className="w-5 h-5 text-blue-500" />
              <span>Hành động nhanh</span>
            </h3>{" "}
            <div className="space-y-3">
              <button
                onClick={handleDownloadCV}
                disabled={!profileData?.cvUrl}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-lg focus-ring flex items-center justify-center space-x-2"
                title={profileData?.cvUrl ? "Tải xuống CV" : "CV chưa có sẵn"}
                aria-label={
                  profileData?.cvUrl ? "Tải xuống CV" : "CV chưa có sẵn"
                }
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Tải CV</span>
              </button>{" "}
              <Link
                href="/contact"
                className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 focus-ring flex items-center justify-center space-x-2"
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                <span>Liên hệ</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
