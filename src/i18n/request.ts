import { getRequestConfig } from "next-intl/server";

export type SupportedLocale = "vi" | "en" | "zh" | "hi";

export default getRequestConfig(async ({ locale }) => {
  // Make sure locale is always a valid one
  const validLocale = (locale || "vi") as SupportedLocale;

  // Define timezone mapping for each locale
  const timezoneMap: Record<SupportedLocale, string> = {
    vi: 'Asia/Ho_Chi_Minh',     // Vietnam
    en: 'America/New_York',     // US Eastern (common for international)
    zh: 'Asia/Shanghai',        // China
    hi: 'Asia/Kolkata',         // India
  };

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
    // Add global timezone configuration to prevent markup mismatches
    timeZone: timezoneMap[validLocale],
  };
});
