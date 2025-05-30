// Language system types
export type LanguageCode = 'en' | 'vi' | 'zh' | 'hi';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Translation {
  // Navigation
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  
  // Theme
  theme: {
    light: string;
    dark: string;
    toggleToLight: string;
    toggleToDark: string;
  };
  
  // Language
  language: {
    selectLanguage: string;
    currentLanguage: string;
  };
  
  // Common UI
  common: {
    loading: string;
    error: string;
    success: string;
    portfolio: string;
  };
  
  // Profile sections (basic structure - can be extended)
  profile: {
    welcome: string;
    downloadCV: string;
    skills: string;
    experience: string;
    education: string;
    contact: string;
  };
}
