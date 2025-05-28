"use client";

import { useContext } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";
import {
  CalendarIcon,
  BuildingOfficeIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

interface ExperienceItem {
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  projects: string[];
}

export default function ProjectsPage() {
  const profileContext = useContext(ProfileContext);
  const { profileData, loading } = profileContext || {};

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const { experience = [] } = profileData || {}; // Calculate total experience in months
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
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Kinh nghiệm làm việc
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hành trình phát triển sự nghiệp và các dự án tôi đã tham gia
          </p>
          <div className="flex justify-center items-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {experience.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Vị trí công việc
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {totalYears}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Năm kinh nghiệm
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>{" "}
        <div className="space-y-12">
          {experience.map((exp: ExperienceItem, index: number) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>

              {/* Content */}
              <div className="ml-20">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                        <BuildingOfficeIcon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
                      <CalendarIcon className="w-4 h-4" />
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>{" "}
                  {/* Projects */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <CodeBracketIcon className="w-5 h-5 text-green-500" />
                      Dự án tham gia
                    </h4>
                    <div className="space-y-4">
                      {exp.projects.map(
                        (project: string, projectIndex: number) => (
                          <div
                            key={projectIndex}
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-green-500"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <p className="text-gray-800 dark:text-white leading-relaxed">
                                  {project}
                                </p>
                              </div>
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
      <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Công nghệ đã sử dụng
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-3 text-center"
            >
              <span className="text-gray-800 dark:text-white font-medium">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Quan tâm đến hợp tác?</h2>
        <p className="text-xl mb-6 opacity-90">
          Tôi luôn sẵn sàng thảo luận về các cơ hội mới và dự án thú vị
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Liên hệ với tôi
          </a>
          <a
            href="mailto:truongnbn.main@gmail.com"
            className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Gửi email ngay
          </a>
        </div>
      </section>
    </div>
  );
}
