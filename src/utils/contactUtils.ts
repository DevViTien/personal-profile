/**
 * Utility functions for contact-related actions
 */

/**
 * Navigate to contact page with smooth scroll to top
 */
export const navigateToContact = () => {
  // Scroll to top smoothly when navigating to contact
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * Direct contact actions
 */
export const contactActions = {
  email: (email: string, subject?: string) => {
    const mailtoUrl = `mailto:${email}${
      subject ? `?subject=${encodeURIComponent(subject)}` : ""
    }`;
    window.location.href = mailtoUrl;
  },

  phone: (phone: string) => {
    window.location.href = `tel:${phone}`;
  },

  whatsapp: (phone: string, message?: string) => {
    const cleanPhone = phone.replace(/\D/g, ""); // Remove non-digits
    const whatsappUrl = `https://wa.me/${cleanPhone}${
      message ? `?text=${encodeURIComponent(message)}` : ""
    }`;
    window.open(whatsappUrl, "_blank");
  },

  telegram: (username: string, message?: string) => {
    const telegramUrl = `https://t.me/${username}${
      message ? `?text=${encodeURIComponent(message)}` : ""
    }`;
    window.open(telegramUrl, "_blank");
  },
};

/**
 * Copy contact information to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
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
      return true;
    } catch (fallbackError) {
      console.error("Fallback copy failed:", fallbackError);
      return false;
    }
  }
};
