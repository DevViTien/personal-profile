import { toast, ToastOptions } from "react-toastify";
import { useTranslations } from "next-intl";

/**
 * Custom hook for toast notifications với đa ngôn ngữ
 * Cung cấp các method tiện ích để hiển thị toast với i18n support
 */
export const useToast = () => {
  const t = useTranslations();
  // Default toast options
  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  // Success toast
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  };

  // Error toast
  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options });
  };

  // Warning toast
  const warning = (message: string, options?: ToastOptions) => {
    toast.warning(message, { ...defaultOptions, ...options });
  };
  // Info toast
  const info = (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options });
  };
  // Specialized toast methods với i18n support
  const contact = {
    messageSent: () =>
      success(
        t("pages.contact.messageSent") || "Tin nhắn đã được gửi thành công!"
      ),
    messageError: () =>
      error(
        t("pages.contact.messageError") || "Có lỗi xảy ra khi gửi tin nhắn"
      ),
    rateLimit: (timeLeft: number) =>
      warning(
        t("pages.contact.rateLimit") ||
          `Bạn đã gửi quá nhiều tin nhắn. Vui lòng đợi ${timeLeft} phút trước khi gửi lại.`
      ),
    unexpectedError: () =>
      error(
        t("pages.contact.unexpectedError") ||
          "Có lỗi không mong muốn xảy ra. Vui lòng thử lại sau."
      ),
    configError: () =>
      error(
        t("errors.emailConfigError") ||
          "Dịch vụ email chưa được cấu hình đúng. Vui lòng liên hệ quản trị viên."
      ),
    validationError: (message: string) => error(message),
    networkError: () =>
      error(
        t("errors.networkError") ||
          "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet."
      ),
  };

  const copy = {
    success: (type: string) => success(`${type} đã được sao chép thành công!`),
    error: () => error("Không thể sao chép. Vui lòng thử lại."),
  };

  const theme = {
    changed: (isDark: boolean) =>
      info(isDark ? "Đã chuyển sang chế độ tối" : "Đã chuyển sang chế độ sáng"),
  };

  const language = {
    changed: (langName: string) =>
      info(`Ngôn ngữ đã được thay đổi sang ${langName}`),
  };

  const download = {
    started: () => info("Đang tải xuống..."),
    success: () => success("Tải xuống thành công!"),
    error: () => error("Không thể tải xuống. Vui lòng thử lại."),
  };

  return {
    success,
    error,
    warning,
    info,
    contact,
    copy,
    theme,
    language,
    download,
  };
};
