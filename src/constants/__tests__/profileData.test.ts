/**
 * Test hồi quy cho cấu trúc profileData (6 ngôn ngữ).
 *
 * Bug đã gặp: trong ja.json/ko.json, mảng `experience[].projects` chứa STRING
 * thay vì object Project → ProjectsPage gọi `project.technologies.slice()` crash
 * runtime ("Cannot read properties of undefined (reading 'slice')").
 *
 * `check:i18n` KHÔNG bắt được vì coi mảng là 1 lá (không kiểm cấu trúc phần tử).
 * Test này chốt: mọi project ở MỌI ngôn ngữ phải là object đúng schema Project.
 */
import type { ProfileData, Project } from "@/types/profile";
import vi from "../profileData/vi.json";
import en from "../profileData/en.json";
import zh from "../profileData/zh.json";
import hi from "../profileData/hi.json";
import ja from "../profileData/ja.json";
import ko from "../profileData/ko.json";

const FILES = { vi, en, zh, hi, ja, ko } as unknown as Record<string, ProfileData>;
const LOCALES = ["vi", "en", "zh", "hi", "ja", "ko"] as const;

const load = (locale: string): ProfileData => FILES[locale];

describe.each(LOCALES)("profileData/%s.json", (locale) => {
  const data = load(locale);

  it("có mảng experience không rỗng", () => {
    expect(Array.isArray(data.experience)).toBe(true);
    expect(data.experience.length).toBeGreaterThan(0);
  });

  it("mọi project là object Project hợp lệ (không phải string)", () => {
    data.experience.forEach((exp) => {
      expect(Array.isArray(exp.projects)).toBe(true);
      exp.projects.forEach((project: Project) => {
        // typeof null === "object" nên kiểm tra chặt hơn bằng các field bắt buộc
        expect(project).not.toBeNull();
        expect(typeof project).toBe("object");
        expect(typeof project.name).toBe("string");
        expect(typeof project.description).toBe("string");
        expect(typeof project.mainResponsibilities).toBe("string");
        expect(Array.isArray(project.technologies)).toBe(true);
        expect(project.teamSize).toBeDefined();
      });
    });
  });
});

describe("profileData — đồng bộ số lượng experience & projects giữa các ngôn ngữ", () => {
  const base = load("vi");

  it.each(LOCALES)("%s có cùng số experience và projects như vi", (locale) => {
    const data = load(locale);
    expect(data.experience.length).toBe(base.experience.length);
    data.experience.forEach((exp, i) => {
      expect(exp.projects.length).toBe(base.experience[i].projects.length);
    });
  });
});
