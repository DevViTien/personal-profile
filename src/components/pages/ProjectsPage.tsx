"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { ProfileContext } from "@/contexts/ProfileContext";
import { useTranslations } from "next-intl";
import { Experience, Project } from "@/types/profile";
import {
  CalendarIcon,
  BuildingOfficeIcon,
  CodeBracketIcon,
  SparklesIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

/**
 * ProjectsPage Component - Trang dự án và kinh nghiệm làm việc
 * Hiển thị: Timeline kinh nghiệm, dự án đã tham gia, công nghệ sử dụng
 */
export default function ProjectsPage() {
  const profileContext = useContext(ProfileContext);
  const t = useTranslations();
  const { profileData, loading } = profileContext || {};

  // State cho collapse/expand projects
  const [expandedProjects, setExpandedProjects] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedExperiences, setExpandedExperiences] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleProject = (expIndex: number, projectIndex: number) => {
    const key = `${expIndex}-${projectIndex}`;
    setExpandedProjects((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleExperience = (expIndex: number) => {
    setExpandedExperiences((prev) => ({
      ...prev,
      [expIndex]: !prev[expIndex],
    }));
  };

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
    experience.forEach((exp: Experience) => {
      const startDate = new Date(exp.startDate.split("/").reverse().join("-"));
      const endDate = ["hiện nay", "present", "वर्तमान", "至今"].includes(
        exp.endDate
      )
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
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/20 dark:bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

        {/* Floating particles effect */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-indigo-400/35 rounded-full animate-bounce delay-300"></div>

        <div className="relative text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                {t("pages.projects.title")}
              </span>
              <span className="block mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300">
                {t("pages.projects.workExperience")}
              </span>
            </h1>

            <div className="max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("pages.projects.projectTimeline")}
              </p>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mt-12">
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-lg border border-white/40 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <BriefcaseIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400">
                  {experience.length}
                </div>
              </div>
              <div className="text-sm lg:text-base font-semibold text-gray-600 dark:text-gray-400 text-center">
                {t("pages.projects.currentPosition")}
              </div>
            </div>

            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-lg border border-white/40 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <ChartBarIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-green-600 dark:text-green-400">
                  {totalYears}+
                </div>
              </div>
              <div className="text-sm lg:text-base font-semibold text-gray-600 dark:text-gray-400 text-center">
                {t("pages.projects.experienceYears")}
              </div>
            </div>

            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-lg border border-white/40 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300 sm:col-span-1">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <SparklesIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-purple-600 dark:text-purple-400">
                  {experience.reduce(
                    (total: number, exp: Experience) =>
                      total + exp.projects.length,
                    0
                  )}
                </div>
              </div>
              <div className="text-sm lg:text-base font-semibold text-gray-600 dark:text-gray-400 text-center">
                {t("pages.projects.projectDetails")}
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
          {experience.map((exp: Experience, expIndex: number) => {
            const isExpanded = expandedExperiences[expIndex];

            return (
              <div key={expIndex} className="relative group">
                {/* Timeline dot - hidden on mobile */}
                <div className="hidden lg:block absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg group-hover:scale-110 transition-transform duration-200"></div>

                {/* Content */}
                <div className="lg:ml-20">
                  <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Experience Header - Always Visible */}
                    <div
                      className="p-6 lg:p-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                      onClick={() => toggleExperience(expIndex)}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                              {exp.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {isExpanded ? (
                                <ChevronDownIcon className="w-5 h-5 text-blue-500 transform transition-transform duration-200" />
                              ) : (
                                <ChevronRightIcon className="w-5 h-5 text-blue-500 transform transition-transform duration-200" />
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                            <BuildingOfficeIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span className="font-medium">{exp.company}</span>
                          </div>

                          {/* Quick Stats */}
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                              <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium">
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                              <CodeBracketIcon className="w-4 h-4" />
                              <span className="font-medium">
                                {exp.projects.length}{" "}
                                {exp.projects.length === 1
                                  ? "project"
                                  : "projects"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Expand/Collapse Button */}
                        <div className="flex items-center space-x-2">
                          <button
                            className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg font-medium transition-all duration-200 group"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExperience(expIndex);
                            }}
                          >
                            <EyeIcon className="w-4 h-4" />
                            <span>
                              {isExpanded
                                ? t("pages.projects.hideDetails")
                                : t("pages.projects.viewDetails")}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Projects Section */}
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isExpanded
                          ? "max-h-none opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-gray-100 dark:border-gray-700">
                        <div className="p-6 lg:p-8 space-y-6">
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
                            <CodeBracketIcon className="w-5 h-5 text-green-500" />
                            <span>{t("pages.projects.projectDetails")}</span>
                          </h4>

                          <div className="space-y-6">
                            {exp.projects.map(
                              (project: Project, projectIndex: number) => {
                                const projectKey = `${expIndex}-${projectIndex}`;
                                const isProjectExpanded =
                                  expandedProjects[projectKey];

                                return (
                                  <div
                                    key={projectIndex}
                                    className="bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10 border border-green-100/50 dark:border-green-800/50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
                                  >
                                    {/* Project Header */}
                                    <div
                                      className="p-5 cursor-pointer hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                                      onClick={() =>
                                        toggleProject(expIndex, projectIndex)
                                      }
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-start space-x-3 flex-1">
                                          <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                                          <div className="flex-1">
                                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                              {project.name}
                                            </h5>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                                              {project.description}
                                            </p>

                                            {/* Technology Preview */}
                                            <div className="flex flex-wrap gap-1 mt-3">
                                              {project.technologies
                                                .slice(0, 3)
                                                .map(
                                                  (
                                                    tech: string,
                                                    techIndex: number
                                                  ) => (
                                                    <span
                                                      key={techIndex}
                                                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-medium"
                                                    >
                                                      {tech}
                                                    </span>
                                                  )
                                                )}
                                              {project.technologies.length >
                                                3 && (
                                                <span className="text-gray-500 dark:text-gray-400 text-xs px-2 py-1">
                                                  +
                                                  {project.technologies.length -
                                                    3}{" "}
                                                  more
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                          {isProjectExpanded ? (
                                            <ChevronDownIcon className="w-5 h-5 text-gray-400 transform transition-transform duration-200" />
                                          ) : (
                                            <ChevronRightIcon className="w-5 h-5 text-gray-400 transform transition-transform duration-200" />
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Project Details - Collapsible */}
                                    <div
                                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                        isProjectExpanded
                                          ? "max-h-none opacity-100"
                                          : "max-h-0 opacity-0"
                                      }`}
                                    >
                                      <div className="border-t border-green-200/50 dark:border-green-800/50 bg-white/30 dark:bg-gray-800/30">
                                        <div className="p-5 space-y-5">
                                          {/* Main Responsibilities */}
                                          <div>
                                            <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3 flex items-center space-x-2">
                                              <DocumentTextIcon className="w-4 h-4 text-purple-500" />
                                              <span>
                                                {t(
                                                  "pages.projects.responsibilities"
                                                )}
                                              </span>
                                            </h6>
                                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {project.mainResponsibilities}
                                              </p>
                                            </div>
                                          </div>

                                          {/* All Technologies */}
                                          <div>
                                            <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3 flex items-center space-x-2">
                                              <CodeBracketIcon className="w-4 h-4 text-blue-500" />
                                              <span>
                                                {t(
                                                  "pages.projects.technologies"
                                                )}
                                              </span>
                                            </h6>
                                            <div className="flex flex-wrap gap-2">
                                              {project.technologies.map(
                                                (
                                                  tech: string,
                                                  techIndex: number
                                                ) => (
                                                  <span
                                                    key={techIndex}
                                                    className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800 hover:shadow-sm transition-shadow duration-200"
                                                  >
                                                    {tech}
                                                  </span>
                                                )
                                              )}
                                            </div>
                                          </div>

                                          {/* Team Size */}
                                          <div>
                                            <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3 flex items-center space-x-2">
                                              <UserGroupIcon className="w-4 h-4 text-orange-500" />
                                              <span>
                                                {t("pages.projects.teamSize")}
                                              </span>
                                            </h6>
                                            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                                              <p className="text-gray-700 dark:text-gray-300 font-medium">
                                                {Array.isArray(project.teamSize)
                                                  ? `${project.teamSize[0]} - ${
                                                      project.teamSize[1]
                                                    } ${t(
                                                      "pages.projects.people"
                                                    )}`
                                                  : `${project.teamSize} ${
                                                      project.teamSize === 1
                                                        ? t(
                                                            "pages.projects.person"
                                                          )
                                                        : t(
                                                            "pages.projects.people"
                                                          )
                                                    }`}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills Summary from Experience */}
      <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl lg:rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/20 to-purple-200/20 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 dark:from-purple-600/10 dark:to-pink-600/10 rounded-full blur-2xl"></div>

        <div className="relative">
          <div className="flex items-center space-x-4 mb-8 lg:mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-10 bg-gradient-to-b from-purple-500 via-blue-500 to-indigo-500 rounded-full"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {t("pages.projects.technologies")}
              </h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-300 to-transparent dark:from-purple-600 dark:to-transparent"></div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Các công nghệ tôi đã sử dụng qua các dự án
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
            {/* Extract unique technologies from all projects */}
            {Array.from(
              new Set(
                experience.flatMap((exp: Experience) =>
                  exp.projects.flatMap(
                    (project: Project) => project.technologies
                  )
                )
              )
            ).map((tech: string, index: number) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-700 rounded-xl lg:rounded-2xl p-4 lg:p-5 text-center border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-lg hover:shadow-purple-100 dark:hover:shadow-purple-900/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <span className="text-sm lg:text-base text-gray-800 dark:text-white font-semibold group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                    {tech}
                  </span>

                  {/* Small indicator dot */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Technology count indicator */}
          <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <CodeBracketIcon className="w-4 h-4" />
            <span>
              {
                Array.from(
                  new Set(
                    experience.flatMap((exp: Experience) =>
                      exp.projects.flatMap(
                        (project: Project) => project.technologies
                      )
                    )
                  )
                ).length
              }{" "}
              công nghệ đã sử dụng
            </span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl"></div>

        <div className="relative space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            {t("pages.contact.getInTouch")}
          </h2>
          <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
            {t("pages.contact.responseTime")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 rounded-lg lg:rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus-ring"
            >
              {t("pages.contact.title")}
            </Link>
            <Link
              href="mailto:truongnbn.main@gmail.com"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 lg:px-8 py-3 lg:py-4 rounded-lg lg:rounded-xl font-medium transition-all duration-200 transform hover:-translate-y-0.5 focus-ring"
            >
              {t("pages.contact.send")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
