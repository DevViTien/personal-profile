// Language system types
export type LanguageCode = "en" | "vi" | "zh" | "hi" | "ja" | "ko";

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

  // Sidebar
  sidebar: {
    expand: string;
    collapse: string;
    quickNavigation: string;
    skills: string;
    education: string;
    experience: string;
    projects: string;
  };

  // Common UI
  common: {
    loading: string;
    error: string;
    success: string;
    portfolio: string;
    readMore: string;
    readLess: string;
    viewAll: string;
    viewDetails: string;
    backToTop: string;
    close: string;
    open: string;
    menu: string;
    search: string;
    filter: string;
    sort: string;
    previous: string;
    next: string;
    submit: string;
    reset: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    confirm: string;
    yes: string;
    no: string;
  };

  // Profile sections
  profile: {
    welcome: string;
    downloadCV: string;
    skills: string;
    experience: string;
    education: string;
    contact: string;
    aboutMe: string;
    biography: string;
    expertise: string;
    achievements: string;
    certifications: string;
    languages: string;
    interests: string;
    projects: string;
    socialMedia: string;
    professionalSummary: string;
    careerObjective: string;
    currentPosition: string;
    yearsOfExperience: string;
    location: string;
    availability: string;
    workingHours: string;
    timezone: string;
  };

  // Pages
  pages: {
    home: {
      title: string;
      hero: {
        greeting: string;
        tagline: string;
        description: string;
        cta: string;
      };
      featuredProjects: string;
      recentWork: string;
      testimonials: string;
      getInTouch: string;
    };
    about: {
      title: string;
      introduction: string;
      story: string;
      mission: string;
      vision: string;
      values: string;
      journey: string;
      philosophy: string;
      approach: string;
      personalLife: string;
      funFacts: string;
    };
    projects: {
      title: string;
      workExperience: string;
      projectTimeline: string;
      currentPosition: string;
      experienceYears: string;
      allProjects: string;
      featuredWork: string;
      categories: string;
      technologies: string;
      liveDemo: string;
      sourceCode: string;
      projectDetails: string;
      challenges: string;
      solutions: string;
      results: string;
    };
    contact: {
      title: string;
      getInTouch: string;
      responseTime: string;
      fastResponse: string;
      fastResponseDesc: string;
      personalSupport: string;
      personalSupportDesc: string;
      creativeIdeas: string;
      creativeIdeasDesc: string;
      contactForm: string;
      contactInfo: string;
      socialLinks: string;
      sendMessage: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      messageSent: string;
      messageError: string;
      rateLimit: string;
      unexpectedError: string;
      address: string;
      fullAddress: string;
      location: string;
      mapTitle: string;
      requiredField: string;
      businessHours: string;
    };
  };

  // Error messages
  errors: {
    pageNotFound: string;
    serverError: string;
    networkError: string;
    loadingFailed: string;
    somethingWentWrong: string;
    tryAgain: string;
    goHome: string;
    contactSupport: string;
  };

  // Actions
  actions: {
    learnMore: string;
    getStarted: string;
    download: string;
    share: string;
    copy: string;
    print: string;
    export: string;
    import: string;
    refresh: string;
    retry: string;
    undo: string;
    redo: string;
  };
}
