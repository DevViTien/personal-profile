"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import { LanguageCode, Language, Translation } from "@/types/language";
import { getDictionary } from "@/utils/getDictionary";
import { useToast } from "@/hooks/useToast";

// Supported languages
export const LANGUAGES: Language[] = [
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
  },
];

const defaultTranslations: Translation = {
  navigation: {
    home: "Trang chủ",
    about: "Giới thiệu",
    projects: "Dự án",
    contact: "Liên hệ",
  },
  theme: {
    light: "Chế độ sáng",
    dark: "Chế độ tối",
    toggleToLight: "Chuyển sang chế độ sáng",
    toggleToDark: "Chuyển sang chế độ tối",
  },
  language: {
    selectLanguage: "Chọn ngôn ngữ",
    currentLanguage: "Ngôn ngữ hiện tại",
  },
  sidebar: {
    expand: "Mở sidebar",
    collapse: "Thu gọn sidebar",
    quickNavigation: "Điều hướng nhanh",
    skills: "Kỹ năng",
    education: "Học vấn",
    experience: "Kinh nghiệm",
    projects: "Dự án",
  },
  common: {
    loading: "Đang tải...",
    error: "Lỗi",
    success: "Thành công",
    portfolio: "Portfolio",
    readMore: "Đọc thêm",
    readLess: "Thu gọn",
    viewAll: "Xem tất cả",
    viewDetails: "Xem chi tiết",
    backToTop: "Về đầu trang",
    close: "Đóng",
    open: "Mở",
    menu: "Menu",
    search: "Tìm kiếm",
    filter: "Lọc",
    sort: "Sắp xếp",
    previous: "Trước",
    next: "Tiếp",
    submit: "Gửi",
    reset: "Đặt lại",
    cancel: "Hủy",
    save: "Lưu",
    edit: "Chỉnh sửa",
    delete: "Xóa",
    confirm: "Xác nhận",
    yes: "Có",
    no: "Không",
  },
  profile: {
    welcome: "Chào mừng",
    downloadCV: "Tải CV",
    skills: "Kỹ năng",
    experience: "Kinh nghiệm",
    education: "Học vấn",
    contact: "Liên hệ",
    aboutMe: "Về tôi",
    biography: "Tiểu sử",
    expertise: "Chuyên môn",
    achievements: "Thành tựu",
    certifications: "Chứng chỉ",
    languages: "Ngôn ngữ",
    interests: "Sở thích",
    projects: "Dự án",
    socialMedia: "Mạng xã hội",
    professionalSummary: "Tóm tắt chuyên nghiệp",
    careerObjective: "Mục tiêu nghề nghiệp",
    currentPosition: "Vị trí hiện tại",
    yearsOfExperience: "Năm kinh nghiệm",
    location: "Địa điểm",
    availability: "Sẵn sàng làm việc",
    workingHours: "Giờ làm việc",
    timezone: "Múi giờ",
  },
  pages: {
    home: {
      title: "Trang chủ",
      hero: {
        greeting: "Xin chào, tôi là",
        tagline: "Full Stack Developer",
        description:
          "Chuyên tạo ra những trải nghiệm số với công nghệ web hiện đại",
        cta: "Xem công việc của tôi",
      },
      featuredProjects: "Dự án nổi bật",
      recentWork: "Công việc gần đây",
      testimonials: "Lời chứng thực",
      getInTouch: "Liên hệ",
    },
    about: {
      title: "Giới thiệu",
      introduction: "Giới thiệu",
      story: "Câu chuyện của tôi",
      mission: "Sứ mệnh",
      vision: "Tầm nhìn",
      values: "Giá trị",
      journey: "Hành trình",
      philosophy: "Triết lý",
      approach: "Phương pháp",
      personalLife: "Cuộc sống cá nhân",
      funFacts: "Sự thật thú vị",
    },
    projects: {
      title: "Dự án & Kinh nghiệm",
      workExperience: "Kinh nghiệm làm việc",
      projectTimeline:
        "Timeline dự án và kinh nghiệm phát triển phần mềm của tôi",
      currentPosition: "Vị trí hiện tại",
      experienceYears: "năm kinh nghiệm",
      allProjects: "Tất cả dự án",
      featuredWork: "Công việc nổi bật",
      categories: "Danh mục",
      technologies: "Công nghệ đã sử dụng",
      liveDemo: "Demo trực tiếp",
      sourceCode: "Mã nguồn",
      projectDetails: "Chi tiết dự án",
      challenges: "Thách thức",
      solutions: "Giải pháp",
      results: "Kết quả",
    },
    contact: {
      title: "Liên hệ",
      getInTouch: "Liên hệ",
      responseTime:
        "Phản hồi nhanh chóng trong vòng 24 giờ với các giải pháp sáng tạo và hỗ trợ cá nhân hóa.",
      fastResponse: "Phản hồi nhanh",
      fastResponseDesc: "Trong 24h",
      personalSupport: "Hỗ trợ cá nhân",
      personalSupportDesc: "Tư vấn 1:1",
      creativeIdeas: "Ý tưởng sáng tạo",
      creativeIdeasDesc: "Giải pháp tối ưu",
      contactForm: "Form liên hệ",
      contactInfo: "Thông tin liên hệ",
      socialLinks: "Liên kết xã hội",
      sendMessage: "Gửi tin nhắn",
      name: "Họ và tên",
      namePlaceholder: "Nhập họ và tên của bạn",
      email: "Email",
      emailPlaceholder: "Nhập email của bạn",
      phone: "Điện thoại",
      subject: "Chủ đề",
      subjectPlaceholder: "Chủ đề tin nhắn",
      message: "Tin nhắn",
      messagePlaceholder: "Nội dung tin nhắn của bạn...",
      send: "Gửi tin nhắn",
      sending: "Đang gửi...",
      messageSent: "Tin nhắn đã được gửi thành công!",
      messageError: "Có lỗi xảy ra khi gửi tin nhắn",
      rateLimit:
        "Bạn đã gửi quá nhiều tin nhắn. Vui lòng đợi {timeLeft} phút trước khi gửi lại.",
      unexpectedError: "Có lỗi không mong muốn xảy ra. Vui lòng thử lại sau.",
      address: "Địa chỉ",
      fullAddress: "Địa chỉ đầy đủ:",
      location: "Vị trí",
      mapTitle: "Bản đồ vị trí",
      requiredField: "*",
      businessHours: "Giờ làm việc",
    },
  },
  errors: {
    pageNotFound: "Không tìm thấy trang",
    serverError: "Lỗi máy chủ",
    networkError: "Lỗi mạng",
    loadingFailed: "Tải thất bại",
    somethingWentWrong: "Có lỗi xảy ra",
    tryAgain: "Thử lại",
    goHome: "Về trang chủ",
    contactSupport: "Liên hệ hỗ trợ",
  },
  actions: {
    learnMore: "Tìm hiểu thêm",
    getStarted: "Bắt đầu",
    download: "Tải xuống",
    share: "Chia sẻ",
    copy: "Sao chép",
    print: "In",
    export: "Xuất",
    import: "Nhập",
    refresh: "Làm mới",
    retry: "Thử lại",
    undo: "Hoàn tác",
    redo: "Làm lại",
  },
};

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: Translation;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Default language
const DEFAULT_LANGUAGE: LanguageCode = "vi";
const STORAGE_KEY = "preferred-language";

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useLocalStorage<LanguageCode>(
    STORAGE_KEY,
    DEFAULT_LANGUAGE
  );
  const [translations, setTranslations] = useState<Translation | null>(null);
  const toast = useToast();

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await getDictionary(currentLanguage);
        setTranslations(translationModule as Translation);
      } catch (error) {
        console.error(
          `Failed to load translations for ${currentLanguage}:`,
          error
        );
        // Fallback to Vietnamese if translation fails
        if (currentLanguage !== "vi") {
          try {
            const fallbackModule = await getDictionary("vi");
            setTranslations(fallbackModule as Translation);
          } catch (fallbackError) {
            console.error(
              "Failed to load fallback translations:",
              fallbackError
            );
            // Use default translations if everything fails
            setTranslations(null);
          }
        }
      }
    };

    loadTranslations();
  }, [currentLanguage]);
  const setLanguage = (language: LanguageCode) => {
    const previousLanguage = currentLanguage;
    setCurrentLanguage(language); // useLocalStorage sẽ tự động lưu vào localStorage

    const languageInfo = LANGUAGES.find((lang) => lang.code === language);
    if (languageInfo && previousLanguage !== language) {
      toast.language.changed(languageInfo.nativeName);
    }
  };

  const value = {
    currentLanguage,
    setLanguage,
    t: translations || defaultTranslations,
    languages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
