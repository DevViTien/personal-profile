"use client";

import { useContext } from "react";
import Link from "next/link";
import { ProfileContext } from "@/contexts/ProfileContext";
import {
  CalendarIcon,
  BuildingOfficeIcon,
  CodeBracketIcon,
  SparklesIcon,
  BriefcaseIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

interface ExperienceItem {
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  projects: string[];
}

/**
 * ProjectsPage Component - Trang dự án và kinh nghiệm làm việc
 * Hiển thị: Timeline kinh nghiệm, dự án đã tham gia, công nghệ sử dụng
 */
export default function ProjectsPage() {
  const profileContext = useContext(ProfileContext);
  const { profileData, loading } = profileContext || {};

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Header Loading */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-300 dark:bg-gray-700 rounded-xl p-6"
              >
                <div className="h-8 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Loading */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-lg"
            >
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { experience = [] } = profileData || {};

  // Calculate total experience in months
  const calculateExperience = () => {
    let totalMonths = 0;
    experience.forEach((exp: ExperienceItem) => {
      const startDate = new Date(exp.startDate.split("/").reverse().join("-"));
      const endDate =
        exp.endDate === "hiện nay"
          ? new Date()
          : new Date(exp.endDate.split("/").reverse().join("-"));
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      totalMonths += diffMonths;
    });
    return Math.floor(totalMonths / 12);
  };

  const totalYears = calculateExperience();

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>

        <div className="relative text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Kinh nghiệm
              </span>
              <span className="block mt-2">làm việc</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hành trình phát triển sự nghiệp và các dự án tôi đã tham gia
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mt-8">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <BriefcaseIcon className="w-8 h-8 text-blue-500" />
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {experience.length}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
                Vị trí công việc
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <ChartBarIcon className="w-8 h-8 text-green-500" />
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {totalYears}+
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
                Năm kinh nghiệm
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 sm:col-span-1">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <SparklesIcon className="w-8 h-8 text-purple-500" />
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {experience.reduce(
                    (total: number, exp: ExperienceItem) =>
                      total + exp.projects.length,
                    0
                  )}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
                Dự án tham gia
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="relative">
        {/* Timeline line - hidden on mobile */}
        <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

        <div className="space-y-8 lg:space-y-12">
          {experience.map((exp: ExperienceItem, index: number) => (
            <div key={index} className="relative">
              {/* Timeline dot - hidden on mobile */}
              <div className="hidden lg:block absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>

              {/* Content */}
              <div className="lg:ml-20">
                <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
                    <div className="space-y-3">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                        <BuildingOfficeIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg w-fit">
                      <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center space-x-2">
                      <CodeBracketIcon className="w-5 h-5 text-green-500" />
                      <span>Dự án tham gia</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {exp.projects.map(
                        (project: string, projectIndex: number) => (
                          <div
                            key={projectIndex}
                            className="bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-800 rounded-lg p-4 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-800 dark:text-white leading-relaxed flex-1">
                                {project}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Summary from Experience */}
      <section className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6 lg:mb-8">
          <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Công nghệ đã sử dụng
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "Node.js",
            "C++",
            "HTML/CSS",
            "Git",
            "Chromium",
            "React Native",
            "CMS",
            "TTS",
          ].map((tech, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg lg:rounded-xl p-3 lg:p-4 text-center hover:from-purple-100 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="text-sm lg:text-base text-gray-800 dark:text-white font-medium">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl"></div>

        <div className="relative space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Quan tâm đến hợp tác?
          </h2>
          <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
            Tôi luôn sẵn sàng thảo luận về các cơ hội mới và dự án thú vị
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 rounded-lg lg:rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus-ring"
            >
              Liên hệ với tôi
            </Link>
            <a
              href="mailto:truongnbn.main@gmail.com"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 lg:px-8 py-3 lg:py-4 rounded-lg lg:rounded-xl font-medium transition-all duration-200 transform hover:-translate-y-0.5 focus-ring"
            >
              Gửi email ngay
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
