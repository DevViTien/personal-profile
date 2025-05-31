import { toast, ToastOptions } from "react-toastify";

/**
 * Custom hook for toast notifications với fallback messages
 * Cung cấp các method tiện ích để hiển thị toast
 */
export const useToast = () => {
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

  // Specialized toast methods với pre-defined messages
  const contact = {
    messageSent: () => success("Tin nhắn đã được gửi thành công!"),
    messageError: () => error("Có lỗi xảy ra khi gửi tin nhắn"),
    rateLimit: (timeLeft: number) =>
      warning(
        `Bạn đã gửi quá nhiều tin nhắn. Vui lòng đợi ${timeLeft} phút trước khi gửi lại.`
      ),
    unexpectedError: () =>
      error("Có lỗi không mong muốn xảy ra. Vui lòng thử lại sau."),
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
