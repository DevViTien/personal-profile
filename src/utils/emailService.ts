import emailjs from "@emailjs/browser";

/**
 * EmailJS Configuration
 * Cấu hình dịch vụ gửi email qua EmailJS sử dụng Environment Variables
 */
const EMAIL_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL as string,
} as const;

/**
 * Kiểm tra cấu hình EmailJS
 */
const validateEmailConfig = (): string | null => {
  if (!EMAIL_CONFIG.SERVICE_ID) {
    return "Thiếu NEXT_PUBLIC_EMAILJS_SERVICE_ID trong environment variables";
  }
  if (!EMAIL_CONFIG.TEMPLATE_ID) {
    return "Thiếu NEXT_PUBLIC_EMAILJS_TEMPLATE_ID trong environment variables";
  }
  if (!EMAIL_CONFIG.PUBLIC_KEY) {
    return "Thiếu NEXT_PUBLIC_EMAILJS_PUBLIC_KEY trong environment variables";
  }
  if (!EMAIL_CONFIG.CONTACT_EMAIL) {
    return "Thiếu NEXT_PUBLIC_CONTACT_EMAIL trong environment variables";
  }
  return null;
};

/**
 * Interface cho dữ liệu form liên hệ
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Interface cho kết quả gửi email
 */
export interface EmailResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Validate dữ liệu form trước khi gửi
 */
export const validateFormData = (data: ContactFormData): string | null => {
  if (!data.name.trim()) {
    return "Vui lòng nhập họ và tên";
  }

  // Kiểm tra name chỉ chứa chữ cái, số và ký tự cơ bản
  const nameRegex = /^[a-zA-ZÀ-ỹ\s\d\.\-\_]{2,100}$/;
  if (!nameRegex.test(data.name.trim())) {
    return "Họ tên chỉ được chứa chữ cái, số và ký tự cơ bản (2-100 ký tự)";
  }

  if (!data.email.trim()) {
    return "Vui lòng nhập email";
  }

  // Kiểm tra định dạng email mạnh hơn
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(data.email)) {
    return "Email không đúng định dạng";
  }

  if (!data.subject.trim()) {
    return "Vui lòng nhập chủ đề";
  }

  // Kiểm tra subject không chứa spam keywords
  const spamKeywords = [
    "viagra",
    "casino",
    "lottery",
    "winner",
    "congratulations",
    "million",
    "inheritance",
  ];
  const subjectLower = data.subject.toLowerCase();
  if (spamKeywords.some((keyword) => subjectLower.includes(keyword))) {
    return "Chủ đề chứa từ khóa không được phép";
  }

  if (!data.message.trim()) {
    return "Vui lòng nhập nội dung tin nhắn";
  }

  // Kiểm tra độ dài tối thiểu
  if (data.message.trim().length < 10) {
    return "Tin nhắn quá ngắn (tối thiểu 10 ký tự)";
  }

  // Kiểm tra độ dài tối đa
  if (data.message.trim().length > 2000) {
    return "Tin nhắn quá dài (tối đa 2000 ký tự)";
  }

  // Kiểm tra không phải spam (quá nhiều link)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = data.message.match(urlRegex) || [];
  if (urls.length > 2) {
    return "Tin nhắn chứa quá nhiều đường dẫn (tối đa 2)";
  }

  return null;
};

/**
 * Sanitize dữ liệu đầu vào để đảm bảo bảo mật
 */
export const sanitizeFormData = (data: ContactFormData): ContactFormData => {
  // Regex để loại bỏ các ký tự đặc biệt có thể gây hại
  const removeSpecialChars = (str: string) => str.replace(/[<>\"'&]/g, "");
  const removeScriptTags = (str: string) =>
    str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  return {
    name: removeSpecialChars(data.name.trim()).substring(0, 100),
    email: data.email.trim().toLowerCase().substring(0, 100),
    subject: removeSpecialChars(data.subject.trim()).substring(0, 200),
    message: removeScriptTags(
      removeSpecialChars(data.message.trim())
    ).substring(0, 2000),
  };
};

/**
 * Gửi email qua EmailJS
 */
export const sendContactEmail = async (
  formData: ContactFormData
): Promise<EmailResult> => {
  try {
    // Kiểm tra cấu hình EmailJS
    const configError = validateEmailConfig();
    if (configError) {
      console.error("EmailJS config error:", configError);
      return {
        success: false,
        message:
          "Dịch vụ email chưa được cấu hình đúng. Vui lòng liên hệ quản trị viên.",
      };
    }

    // Validate dữ liệu
    const validationError = validateFormData(formData);
    if (validationError) {
      return {
        success: false,
        message: validationError,
      };
    }

    // Sanitize dữ liệu
    const sanitizedData = sanitizeFormData(formData);

    // Chuẩn bị template parameters cho EmailJS với timestamp
    const templateParams = {
      from_name: sanitizedData.name,
      from_email: sanitizedData.email,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      to_email: EMAIL_CONFIG.CONTACT_EMAIL,
      reply_to: sanitizedData.email,
      timestamp: new Date().toLocaleString("vi-VN"),
      user_agent: navigator.userAgent.substring(0, 200), // Giới hạn user agent
    };

    // Gửi email qua EmailJS
    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAIL_CONFIG.PUBLIC_KEY
    );

    // Kiểm tra response
    if (response.status === 200) {
      return {
        success: true,
        message:
          "Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi sớm nhất có thể.",
      };
    } else {
      throw new Error(`EmailJS returned status: ${response.status}`);
    }
  } catch (error: unknown) {
    console.error("Error sending email:", error);

    // Xử lý các loại lỗi khác nhau
    let errorMessage = "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.";

    if (error && typeof error === "object" && "message" in error) {
      const errorObj = error as { message?: string; status?: number };

      if (errorObj.message?.includes("network")) {
        errorMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.";
      } else if (errorObj.status === 400) {
        errorMessage = "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.";
      } else if (errorObj.status === 403) {
        errorMessage =
          "Không có quyền gửi email. Vui lòng liên hệ quản trị viên.";
      } else if (errorObj.status === 429) {
        errorMessage =
          "Đã gửi quá nhiều tin nhắn. Vui lòng thử lại sau ít phút.";
      }
    }

    return {
      success: false,
      message: errorMessage,
      error:
        error && typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : "Unknown error",
    };
  }
};

/**
 * Rate limiting - Kiểm tra xem user có gửi quá nhiều email không
 */
export const checkRateLimit = (): { allowed: boolean; timeLeft?: number } => {
  const RATE_LIMIT_KEY = "contact_form_attempts";
  const RATE_LIMIT_DURATION = 300000; // 5 phút
  const MAX_ATTEMPTS = 3; // Tối đa 3 lần trong 5 phút

  try {
    const storedData = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();

    if (!storedData) {
      // Lần đầu gửi
      localStorage.setItem(
        RATE_LIMIT_KEY,
        JSON.stringify({
          attempts: 1,
          firstAttempt: now,
          lastAttempt: now,
        })
      );
      return { allowed: true };
    }

    const data = JSON.parse(storedData);

    // Reset nếu đã quá thời gian rate limit
    if (now - data.firstAttempt > RATE_LIMIT_DURATION) {
      localStorage.setItem(
        RATE_LIMIT_KEY,
        JSON.stringify({
          attempts: 1,
          firstAttempt: now,
          lastAttempt: now,
        })
      );
      return { allowed: true };
    }

    // Kiểm tra số lần attempt
    if (data.attempts >= MAX_ATTEMPTS) {
      const timeLeft = Math.ceil(
        (RATE_LIMIT_DURATION - (now - data.firstAttempt)) / 1000 / 60
      );
      return { allowed: false, timeLeft };
    }

    // Cập nhật attempt
    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({
        ...data,
        attempts: data.attempts + 1,
        lastAttempt: now,
      })
    );

    return { allowed: true };
  } catch (error) {
    console.error("Rate limit check error:", error);
    // Nếu có lỗi localStorage, vẫn cho phép gửi (fail-safe)
    return { allowed: true };
  }
};
