"use client";

import { useState, useEffect } from "react";
import ProfileCard from "@/components/cards/ProfileCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  if (isMobile) {
    return null; // Ẩn hoàn toàn trên mobile, thông tin sẽ hiển thị trong ProfileCard trên main content
  }

  return (
    <>
      {/* Backdrop for mobile when sidebar is open */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? "w-0 lg:w-16" : "w-80 lg:w-72 xl:w-80"
        }`}
      >
        {" "}
        {/* Toggle Button - positioned to be fully visible */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-6 z-50 p-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus-ring ${
            isCollapsed
              ? "right-4 lg:-right-3" // On mobile when collapsed, keep inside; on desktop, outside
              : "-right-3" // When expanded, always outside
          }`}
          aria-label={isCollapsed ? "Mở sidebar" : "Thu gọn sidebar"}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>
        {/* Sidebar Content */}
        <div
          className={`h-full overflow-y-auto p-4 space-y-6 transition-opacity duration-300 ${
            isCollapsed ? "opacity-0 lg:opacity-100" : "opacity-100"
          }`}
        >
          {!isCollapsed && (
            <div className="fade-in">
              <ProfileCard />

              {/* Quick Navigation */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Điều hướng nhanh
                </h3>
                <div className="space-y-2">
                  <a
                    href="#skills"
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Kỹ năng
                  </a>
                  <a
                    href="#education"
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Học vấn
                  </a>
                  <a
                    href="#experience"
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Kinh nghiệm
                  </a>
                  <a
                    href="#projects"
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Dự án
                  </a>
                </div>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="hidden lg:flex flex-col items-center space-y-4 pt-4">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
