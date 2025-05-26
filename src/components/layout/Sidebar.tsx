"use client";

import ProfileCard from "@/components/cards/ProfileCard";

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 lg:w-72 xl:w-80 p-4 space-y-6 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
      <ProfileCard />
      {/* Other sidebar content can be added here */}
    </aside>
  );
}
