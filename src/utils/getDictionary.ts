import { LanguageCode } from "@/types/language";

const dictionaries = {
  vi: () =>
    import("../constants/translations/vi.json").then(
      (module) => module.default
    ),
  en: () =>
    import("../constants/translations/en.json").then(
      (module) => module.default
    ),
  zh: () =>
    import("../constants/translations/zh.json").then(
      (module) => module.default
    ),
  hi: () =>
    import("../constants/translations/hi.json").then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale: LanguageCode) =>
  dictionaries[locale]();
