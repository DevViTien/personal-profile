"use client";

import { useContext } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";
import Image from "next/image";
import {
  CalendarIcon,
  AcademicCapIcon,
  TrophyIcon,
  HeartIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  const profileContext = useContext(ProfileContext);
  const { profileData, loading } = profileContext || {};

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Giới thiệu về tôi
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Tìm hiểu thêm về hành trình và đam mê của tôi
              </p>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {bio}
            </p>
          </div>
          {avatarUrl && (
            <div className="flex justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-white dark:border-gray-700 shadow-xl">
                <Image
                  src={avatarUrl}
                  alt={name || "Profile"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-blue-500" />
              Thông tin cá nhân
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Họ và tên
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Chức danh
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {title}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Giới tính
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {gender}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Ngày sinh
                  </label>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {birthDate}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <EnvelopeIcon className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </label>
                    <p className="text-lg text-gray-900 dark:text-white">
                      {email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <PhoneIcon className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Điện thoại
                    </label>
                    <p className="text-lg text-gray-900 dark:text-white">
                      {phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-2">
              <MapPinIcon className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Địa chỉ
                </label>
                <p className="text-lg text-gray-900 dark:text-white">
                  {address?.short}
                </p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Kỹ năng chuyên môn
            </h2>
            <div className="space-y-6">
              {skills.map((skillCategory, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    {skillCategory.type}
                  </h3>
                  <div className="space-y-3">
                    {skillCategory.data.map((skill, skillIndex) => {
                      const [skillName, skillDesc] = skill.split(":");
                      return (
                        <div
                          key={skillIndex}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                        >
                          <h4 className="font-medium text-gray-800 dark:text-white mb-1">
                            {skillName}
                          </h4>
                          {skillDesc && (
                            <p className="text-sm text-gray-600 dark:text-gray-300">
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
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AcademicCapIcon className="w-6 h-6 text-green-500" />
              Học vấn
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {edu.major}
                    </h3>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                    {edu.school}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Awards Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <TrophyIcon className="w-6 h-6 text-yellow-500" />
              Giải thưởng
            </h2>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
                      {award.year}
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-white">
                    {award.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Hobbies Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <HeartIcon className="w-6 h-6 text-red-500" />
              Sở thích
            </h2>
            <div className="space-y-3">
              {hobbies.map((hobby, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{hobby}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
