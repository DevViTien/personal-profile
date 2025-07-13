import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en", "zh", "hi", "ja", "ko"],

  defaultLocale: "vi",
});
