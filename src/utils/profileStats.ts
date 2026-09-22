import type { Experience } from "@/types/profile";

const parseMonth = (value: string): { year: number; month: number } | null => {
  const normalized = value.trim().toLowerCase();
  const numericMatch = normalized.match(/^(\d{1,2})\/(\d{4})$/);
  if (numericMatch) {
    return { year: Number(numericMatch[2]), month: Number(numericMatch[1]) };
  }

  const japaneseMatch = normalized.match(/^(\d{4})年\s*(\d{1,2})月$/);
  if (japaneseMatch) {
    return { year: Number(japaneseMatch[1]), month: Number(japaneseMatch[2]) };
  }

  const koreanMatch = normalized.match(/^(\d{4})년\s*(\d{1,2})월$/);
  if (koreanMatch) {
    return { year: Number(koreanMatch[1]), month: Number(koreanMatch[2]) };
  }

  return null;
};

const monthIndex = ({ year, month }: { year: number; month: number }) =>
  year * 12 + month - 1;

export const countProjects = (experience: Experience[]): number =>
  experience.reduce((total, item) => total + item.projects.length, 0);

export const calculateExperienceYears = (
  experience: Experience[],
  now = new Date()
): number => {
  const startMonths = experience
    .map((item) => parseMonth(item.startDate))
    .filter((date): date is { year: number; month: number } => date !== null)
    .map(monthIndex);

  if (startMonths.length === 0) {
    return 0;
  }

  const earliestStart = Math.min(...startMonths);
  const currentMonth = monthIndex({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  return Math.max(0, Math.floor((currentMonth - earliestStart) / 12));
};
