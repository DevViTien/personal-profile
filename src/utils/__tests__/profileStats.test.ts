import type { Experience } from "@/types/profile";
import {
  calculateExperienceYears,
  countProjects,
} from "@/utils/profileStats";
import vi from "@/constants/profileData/vi.json";

const experience = vi.experience as Experience[];

describe("profileStats", () => {
  it("tính số năm từ mốc bắt đầu nghề nghiệp sớm nhất đến hiện tại", () => {
    expect(
      calculateExperienceYears(experience, new Date("2026-09-22T00:00:00Z"))
    ).toBe(5);
  });

  it("đếm tổng số dự án từ toàn bộ kinh nghiệm", () => {
    expect(countProjects(experience)).toBe(6);
  });

  it("hỗ trợ định dạng tháng của tiếng Nhật và tiếng Hàn", () => {
    const localizedExperience = [
      {
        ...experience[0],
        startDate: "2025年8月",
        endDate: "現在",
      },
      {
        ...experience[1],
        startDate: "2024년 10월",
        endDate: "2025년 7월",
      },
    ];

    expect(
      calculateExperienceYears(
        localizedExperience,
        new Date("2026-09-22T00:00:00Z")
      )
    ).toBe(1);
  });
});
