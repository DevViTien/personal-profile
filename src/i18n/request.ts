import { getRequestConfig } from "next-intl/server";

export type SupportedLocale = "vi" | "en" | "zh" | "hi";

export default getRequestConfig(async ({ locale }) => {
  // Make sure locale is always a valid one
  const validLocale = (locale || "vi") as SupportedLocale;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
