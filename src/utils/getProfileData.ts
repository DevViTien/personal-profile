import { LanguageCode } from "@/types/language";

const profileDataDictionaries = {
  vi: () =>
    import("../constants/profileData/vi.json").then((module) => module.default),
  en: () =>
    import("../constants/profileData/en.json").then((module) => module.default),
  zh: () =>
    import("../constants/profileData/zh.json").then((module) => module.default),
  hi: () =>
    import("../constants/profileData/hi.json").then((module) => module.default),
  ja: () =>
    import("../constants/profileData/ja.json").then((module) => module.default),
  ko: () =>
    import("../constants/profileData/ko.json").then((module) => module.default),
};

export const getProfileData = async (locale: LanguageCode) =>
  profileDataDictionaries[locale]();
