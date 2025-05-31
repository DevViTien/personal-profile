import { toast } from "react-toastify";

/**
 * Enhanced copy to clipboard function với toast notification
 */
export const copyToClipboardWithToast = async (
  text: string,
  type: string = "thông tin"
): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${type} đã được sao chép vào clipboard!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    // Fallback for older browsers
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      toast.success(`${type} đã được sao chép vào clipboard!`, {
        position: "top-right",
        autoClose: 3000,
      });
      return true;
    } catch (fallbackError) {
      console.error("Fallback copy failed:", fallbackError);
      toast.error("Không thể sao chép. Vui lòng thử lại.", {
        position: "top-right",
        autoClose: 5000,
      });
      return false;
    }
  }
};

/**
 * Enhanced contact actions with toast notifications
 */
export const contactActionsWithToast = {
  email: (email: string, subject?: string) => {
    const mailtoUrl = `mailto:${email}${
      subject ? `?subject=${encodeURIComponent(subject)}` : ""
    }`;
    window.location.href = mailtoUrl;
    toast.info("Đang mở ứng dụng email...", {
      position: "top-right",
      autoClose: 3000,
    });
  },

  phone: (phone: string) => {
    window.location.href = `tel:${phone}`;
    toast.info("Đang thực hiện cuộc gọi...", {
      position: "top-right",
      autoClose: 3000,
    });
  },

  whatsapp: (phone: string, message?: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanPhone}${
      message ? `?text=${encodeURIComponent(message)}` : ""
    }`;
    window.open(whatsappUrl, "_blank");
    toast.info("Đang mở WhatsApp...", {
      position: "top-right",
      autoClose: 3000,
    });
  },

  telegram: (username: string, message?: string) => {
    const telegramUrl = `https://t.me/${username}${
      message ? `?text=${encodeURIComponent(message)}` : ""
    }`;
    window.open(telegramUrl, "_blank");
    toast.info("Đang mở Telegram...", {
      position: "top-right",
      autoClose: 3000,
    });
  },
};
