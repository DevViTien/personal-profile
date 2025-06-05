import createMiddleware from 'next-intl/middleware';
import { siteConfig } from './src/config/site';

// Extract locale codes from site configuration
const locales = siteConfig.languages.map(lang => lang.code);
 
export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'vi',
  
  // Storing the preferred locale in a cookie
  localeDetection: true,
  
  // The default locale will be used when visiting non-existent locales
  localePrefix: 'as-needed'
});
 
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
