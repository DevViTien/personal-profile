# Copilot Instructions - Personal Profile Website

## 📌 Giới thiệu dự án

Đây là dự án xây dựng website profile cá nhân của **TruongNBN** sử dụng **Next.js 15**, **React 19**, **TypeScript** và **Tailwind CSS v4**. Website này thay thế CV truyền thống bằng một trang web hiện đại, tương tác và đa ngôn ngữ.

---

## 🏗️ Kiến trúc dự án

### Công nghệ chính

- **Next.js 15.3.2**: Framework React với App Router, SSR/SSG, middleware và tối ưu hóa performance
- **React 19**: Library JavaScript để xây dựng giao diện người dùng hiện đại  
- **TypeScript 5**: Ngôn ngữ lập trình tăng cường tính an toàn và dễ bảo trì
- **Tailwind CSS v4**: Framework CSS utility-first với PostCSS, hỗ trợ dark mode và responsive
- **next-intl 4.1.0**: Thư viện quốc tế hóa cho Next.js với 4 ngôn ngữ (vi, en, zh, hi)
- **next-themes 0.4.6**: Quản lý theme light/dark mode
- **react-toastify 11.0.5**: Hệ thống thông báo toast notifications
- **@emailjs/browser 4.4.1**: Dịch vụ gửi email từ client-side với rate limiting

### Thư viện bổ sung

- **@heroicons/react 2.2.0**: Icon library SVG cho React
- **react-icons 5.5.0**: Thư viện icon mở rộng (FontAwesome, etc.)
- **usehooks-ts 3.1.1**: Custom hooks tiện ích cho TypeScript

---

## 🎯 Mục tiêu dự án

- Thay thế CV truyền thống bằng một trang web profile cá nhân hiện đại
- Trình bày thông tin cá nhân một cách rõ ràng, chuyên nghiệp và hấp dẫn
- Thể hiện các kỹ năng và kinh nghiệm làm việc
- Giới thiệu các dự án đã tham gia hoặc tự phát triển
- Cung cấp thông tin liên hệ với form gửi email tích hợp
- Hỗ trợ đa ngôn ngữ cho khả năng tiếp cận quốc tế

---

## 📁 Cấu trúc dự án chi tiết

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout với providers
│   ├── page.tsx                 # Trang chủ
│   ├── globals.css              # CSS toàn cục với Tailwind imports
│   ├── about/page.tsx           # Trang giới thiệu
│   ├── projects/page.tsx        # Trang dự án
│   └── contact/page.tsx         # Trang liên hệ
├── components/
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx          # Navigation header với mobile menu
│   │   ├── Footer.tsx          # Footer với thông tin liên hệ
│   │   ├── Sidebar.tsx         # Sidebar với ProfileCard (desktop)
│   │   ├── LanguageSelector.tsx # Chuyển đổi ngôn ngữ
│   │   └── ThemeToggleButton.tsx # Chuyển đổi dark/light mode
│   ├── cards/
│   │   └── ProfileCard.tsx     # Card hiển thị thông tin cá nhân
│   ├── pages/                   # Page-specific components
│   │   ├── HomePage.tsx        # Hero section, skills overview
│   │   ├── AboutPage.tsx       # Chi tiết về cá nhân
│   │   ├── ContactPage.tsx     # Form liên hệ với EmailJS
│   │   └── ProjectsPage.tsx    # Danh sách dự án
│   └── providers/               # Provider components
│       ├── ToastProvider.tsx   # Toast notification provider
│       └── ProfileLanguageSyncComponent.tsx # Sync profile với ngôn ngữ
├── contexts/                    # React Context management
│   ├── AppProvider.tsx         # Provider tổng hợp cho app
│   ├── ThemeContext.tsx        # Quản lý theme state
│   └── ProfileContext.tsx      # Quản lý profile data theo ngôn ngữ
├── hooks/                       # Custom hooks
│   ├── useToast.ts            # Hook cho toast notifications
│   ├── useDownload.ts         # Hook cho download CV/files
│   └── useProfileLanguageSync.ts # Hook đồng bộ profile với ngôn ngữ
├── utils/                       # Utility functions
│   ├── emailService.ts         # EmailJS integration với validation
│   ├── downloadUtils.ts        # Utilities cho download files
│   ├── contactUtils.ts         # Utilities cho contact form
│   ├── toastUtils.ts          # Toast notification utilities
│   └── getProfileData.ts      # Load profile data theo ngôn ngữ
├── constants/
│   └── profileData/            # Dữ liệu profile đa ngôn ngữ
│       ├── vi.json            # Dữ liệu tiếng Việt
│       ├── en.json            # Dữ liệu tiếng Anh
│       ├── zh.json            # Dữ liệu tiếng Trung
│       └── hi.json            # Dữ liệu tiếng Hindi
├── types/                       # TypeScript type definitions
│   ├── profile.ts             # Profile data types
│   └── language.ts            # Language/locale types
├── config/
│   └── site.ts                # Site configuration với languages
└── i18n/
    └── request.ts             # next-intl configuration
```

---

## 🌐 Hệ thống đa ngôn ngữ (Internationalization)

### Cấu hình next-intl

- **Middleware**: `middleware.ts` - Xử lý routing đa ngôn ngữ
- **Default locale**: `vi` (tiếng Việt)
- **Supported locales**: `vi`, `en`, `zh`, `hi`
- **Locale detection**: Tự động detect từ browser
- **Locale prefix**: `as-needed` (default locale không có prefix)

### Cấu trúc messages

```
messages/
├── vi.json    # Tiếng Việt (default)
├── en.json    # English
├── zh.json    # 中文 (Chinese)
└── hi.json    # हिन्दी (Hindi)
```

### Profile data đa ngôn ngữ

- Mỗi ngôn ngữ có file JSON riêng trong `src/constants/profileData/`
- Tự động load profile data theo ngôn ngữ hiện tại
- Sync với `ProfileContext` qua `useProfileLanguageSync` hook

---

## 📧 Hệ thống liên hệ (EmailJS Integration)

### Tính năng

- **EmailJS service**: Gửi email từ client-side
- **Rate limiting**: Giới hạn 3 email/5 phút
- **Form validation**: Validation chi tiết với sanitization
- **Security**: Chống spam, XSS, và các lỗ hổng bảo mật
- **Toast feedback**: Thông báo trạng thái gửi email

### Environment Variables

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_pw_feedback  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_CONTACT_EMAIL=your_email@gmail.com
```

### Validation rules

- **Name**: 2-100 ký tự, chỉ chữ cái, số và ký tự cơ bản
- **Email**: Regex validation nghiêm ngặt
- **Subject**: Kiểm tra spam keywords
- **Message**: 10-2000 ký tự, tối đa 2 URLs

---

## 🎨 Hệ thống Theme và UI

### Theme Management

- **next-themes**: Provider cho dark/light mode
- **LocalStorage**: Lưu trữ preference
- **System detection**: Disabled (manual only)
- **Tailwind integration**: Class-based theme switching

### Design System

- **Typography**: Open Sans font family
- **Colors**: Blue-purple gradient scheme
- **Layout**: Flexbox với sidebar responsive
- **Animations**: Smooth transitions và hover effects
- **Responsive**: Mobile-first approach

### Accessibility (a11y)

- **ARIA labels**: Đầy đủ cho screen readers
- **Keyboard navigation**: Tab support
- **Focus management**: Focus rings và states
- **Color contrast**: WCAG compliant
- **Alt text**: Cho tất cả images

---

## 🔧 Custom Hooks và Utilities

### useToast Hook

```typescript
const toast = useToast();

// Basic notifications
toast.success("Thành công!");
toast.error("Lỗi!");
toast.warning("Cảnh báo!");
toast.info("Thông tin!");

// Specialized methods
toast.contact.messageSent();
toast.contact.rateLimit(5);
toast.download.success();
```

### useDownload Hook

```typescript
const { downloadFile, downloadCV } = useDownload();

// Download với toast feedback
downloadFile(url, filename);
downloadCV(cvUrl, userName);
```

### useProfileLanguageSync Hook

- Tự động sync ProfileContext với next-intl locale
- Load profile data khi ngôn ngữ thay đổi
- Integrated với ProfileLanguageSyncComponent

---

## 📁 Profile Data Structure

### ProfileData Interface

```typescript
interface ProfileData {
  name: string;
  slug: string;
  title: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
  address: {
    full: string;
    short: string;
    mapUrl: string;
  };
  bio: string;
  avatarUrl: string;
  cvUrl: string;
  socialLinks: {
    github?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
}
```

---

## 🚀 Performance Optimizations

### Next.js Features

- **App Router**: File-based routing với layouts
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts với display: auto
- **Bundle Analysis**: Package import optimization
- **Compression**: Gzip enabled

### Build Optimizations

- **Turbopack**: Fast refresh trong development
- **Tree Shaking**: Automatic unused code elimination
- **Code Splitting**: Automatic route-based splitting
- **Static Assets**: Optimized serving

---

## 🔒 Security Features

### Headers

```typescript
// next.config.ts
headers: [
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin'
]
```

### Input Sanitization

- XSS protection trong form inputs
- Script tag removal
- Special character filtering
- URL validation và limits

---

## 🎯 Main Features Overview

### ✅ Đã triển khai

1. **Layout System**: Header, Sidebar, Footer responsive
2. **Theme System**: Dark/Light mode với next-themes
3. **Internationalization**: 4 ngôn ngữ với next-intl
4. **Profile Management**: Dynamic loading theo ngôn ngữ
5. **Contact System**: EmailJS với validation và rate limiting
6. **Toast Notifications**: Comprehensive feedback system
7. **Download System**: CV download với feedback
8. **SEO Optimization**: Metadata và Open Graph tags

### 🔄 Cần cải thiện

1. **Testing**: Unit tests và E2E tests
2. **Performance**: Bundle size analysis
3. **Accessibility**: ARIA labels đầy đủ
4. **PWA**: Service worker và offline support
5. **Analytics**: Google Analytics hoặc tương tự

---

## 📚 Documentation

### Available Docs

- `docs/EMAILJS_SETUP.md`: Hướng dẫn cấu hình EmailJS
- `docs/TOAST_USAGE_EXAMPLES.md`: Examples sử dụng toast notifications
- `docs/SECURITY.md`: Security guidelines và best practices

---

## 👤 Developer Information

- **Developer**: TruongNBN
- **Email**: truongnbn.main@gmail.com
- **Role**: Frontend Developer & AI Integration Specialist
- **Experience**: 3+ năm với React/Next.js ecosystem

---

## 🤝 AI Assistant Guidelines

### Khi làm việc với codebase này:

1. **Luôn sử dụng TypeScript** với strict type checking
2. **"use client" directive** cho mọi client components
3. **Tailwind classes** phải hỗ trợ cả dark mode và responsive
4. **Accessibility standards** (ARIA labels, semantic HTML)
5. **Performance optimization** (lazy loading, code splitting)
6. **Error handling** với proper try/catch và fallbacks
7. **Consistent naming conventions** (PascalCase, camelCase)
8. **Documentation** cho complex functions và components

### Coding Principles

- **DRY**: Don't Repeat Yourself
- **SOLID**: Single Responsibility, Open/Closed, etc.
- **Composition over Inheritance**
- **Explicit over Implicit**
- **Progressive Enhancement**
- **Mobile-First Design**

---

## 📝 Development Guidelines

### Code Style

- **ESLint**: Next.js config với custom rules
- **TypeScript**: Strict mode enabled
- **Prettier**: Code formatting (cần cấu hình)
- **File naming**: PascalCase cho components, camelCase cho functions

### Component Patterns

- **"use client"**: Bắt buộc cho client components
- **Server Components**: Default cho components không có state
- **Error Boundaries**: Proper error handling
- **Loading States**: Skeleton screens và spinners

### State Management

- **React Context**: Cho global state (Theme, Profile)
- **useState**: Cho local component state
- **Custom Hooks**: Cho shared logic
- **No external state library**: Sử dụng React built-ins

---

## 📋 Conventions

- **Commit Message:** Sử dụng conventional commits (ví dụ: `feat: add new feature`, `fix: resolve a bug`, `docs: update documentation`).
- **Branch Naming:** Sử dụng format `feature/feature-name`, `bugfix/bug-name`, `hotfix/hotfix-name`.
- **Code Style:** Tuân thủ theo ESLint và Prettier đã cấu hình trong dự án.
- **Naming Conventions:**
  - Components: PascalCase (ví dụ: `MyComponent.tsx`)
  - Functions/Variables: camelCase (ví dụ: `myFunction`, `myVariable`)
  - CSS Classes: kebab-case (ví dụ: `my-class`)
- **File Structure:** Giữ cấu trúc thư mục gọn gàng và có tổ chức như đã mô tả ở phần Kiến trúc dự án.
- **Comments:** Viết comment giải thích cho các đoạn code phức tạp hoặc logic quan trọng.

## 🎯 Yêu cầu bắt buộc

- Khi generate code, hãy đảm bảo rằng mã nguồn tuân thủ các conventions đã nêu ở trên.
- Khi generate code về giao diện, cần đảm bảo tailwind class có đáp ứng cả dark mode, light mode responsive
- Khi generate code về giao diện, cần đảm bảo đáp ứng các tiêu chuẩn về accessibility (a11y).
- Khi generate code, nếu file client-side, cần đảm bảo có sử dụng `use client` ở đầu file.
- Khi generate code về logic, cần đảm bảo sử dụng TypeScript để tăng cường tính an toàn và dễ bảo trì.
- Khi generate code về các component, cần đảm bảo rằng chúng có thể tái sử dụng và dễ dàng mở rộng.
- Khi generate về command lines, cần đảm bảo có thể chạy trên máy local của tôi. Ví dụ: `cd src; npm run dev` thay vì `cd src && npm run dev`.

## 🌐 Yêu cầu giao tiếp

- **Ngôn ngữ:** Tiếng Việt
- **Phong cách:** Chuyên nghiệp, lịch sự, rõ ràng.
- **Vai trò:** Tôi là người phát triển dự án, bạn là trợ lý AI hỗ trợ tôi trong việc xây dựng và cải thiện dự án này.

---

*Cập nhật lần cuối: June 6, 2025*
