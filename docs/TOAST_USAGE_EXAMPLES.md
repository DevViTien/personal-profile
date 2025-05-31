# React-Toastify Usage Examples

## 🎯 Cách sử dụng Toast Notifications trong dự án

### 1. Basic Toast Usage

```typescript
import { useToast } from "@/hooks/useToast";

function MyComponent() {
  const toast = useToast();

  // Basic notifications
  const handleSuccess = () => {
    toast.success("Thao tác thành công!");
  };

  const handleError = () => {
    toast.error("Có lỗi xảy ra!");
  };

  const handleWarning = () => {
    toast.warning("Cảnh báo!");
  };

  const handleInfo = () => {
    toast.info("Thông tin mới!");
  };
}
```

### 2. Contact Form Toast

```typescript
import { useToast } from "@/hooks/useToast";

function ContactForm() {
  const toast = useToast();

  const handleSubmit = async (formData) => {
    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        toast.contact.messageSent();
      } else if (result.error === "RATE_LIMIT") {
        toast.contact.rateLimit(5); // 5 minutes
      } else {
        toast.contact.messageError();
      }
    } catch (error) {
      toast.contact.unexpectedError();
    }
  };
}
```

### 3. Download with Toast

```typescript
import { useDownload } from "@/hooks/useDownload";

function ProfileCard() {
  const { downloadCV } = useDownload();

  const handleDownloadCV = () => {
    // Automatically shows toast notifications for start, success, error
    downloadCV("/path/to/cv.pdf", "John Doe");
  };
}
```

### 4. Theme Switching

```typescript
import { useTheme } from "@/contexts/ThemeContext";

function ThemeToggle() {
  const { toggleTheme } = useTheme();

  // toggleTheme() automatically shows toast notification
  const handleToggle = () => {
    toggleTheme(); // Shows "Đã chuyển sang chế độ tối/sáng"
  };
}
```

### 5. Language Switching

```typescript
import { useLanguage } from "@/contexts/LanguageContext";

function LanguageSelector() {
  const { setLanguage } = useLanguage();

  const handleLanguageChange = (lang) => {
    // setLanguage() automatically shows toast notification
    setLanguage(lang); // Shows "Ngôn ngữ đã được thay đổi sang English"
  };
}
```

### 6. Copy to Clipboard

```typescript
import { copyToClipboard } from "@/utils/toastUtils";

function ContactInfo() {
  const handleCopyEmail = () => {
    copyToClipboard("email@example.com", "Email");
    // Shows "Email đã được sao chép thành công!"
  };

  const handleCopyPhone = () => {
    copyToClipboard("+84123456789", "Số điện thoại");
    // Shows "Số điện thoại đã được sao chép thành công!"
  };
}
```

### 7. Custom Toast Options

```typescript
import { useToast } from "@/hooks/useToast";

function CustomToast() {
  const toast = useToast();

  // Custom toast với options
  const showCustomToast = () => {
    toast.success("Custom message!", {
      autoClose: 3000,
      position: "bottom-right",
      hideProgressBar: true,
    });
  };
}
```

## 🎨 Available Toast Types

1. **success**: Green background, success icon
2. **error**: Red background, error icon
3. **warning**: Orange background, warning icon
4. **info**: Blue background, info icon

## 🌍 Multi-language Support

Toast messages sử dụng fallback Vietnamese text, nhưng có thể được enhanced để support multi-language với useLanguage hook.

## 🎭 Theme Support

Toast notifications tự động thay đổi appearance theo dark/light mode:

- **Light mode**: Light backgrounds với dark text
- **Dark mode**: Dark backgrounds với light text

## 📱 Responsive Design

Toast notifications được optimize cho tất cả screen sizes và devices.

## ♿ Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatible
- Focus management
