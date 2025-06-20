# 🌟 Personal Profile Website - TruongNBN

> Trang web profile cá nhân hiện đại, tương tác và đa ngôn ngữ thay thế CV truyền thống

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt](#-cài-đặt)
- [Cấu hình](#-cấu-hình)
- [Sử dụng](#-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Tài liệu](#-tài-liệu)
- [Đóng góp](#-đóng-góp)
- [Giấy phép](#-giấy-phép)

## 🎯 Giới thiệu

**Personal Profile Website** là một trang web profile cá nhân hiện đại được xây dựng bằng **Next.js 15**, **React 19**, **TypeScript** và **Tailwind CSS**. Website này thay thế CV truyền thống bằng một trải nghiệm tương tác, chuyên nghiệp và hỗ trợ đa ngôn ngữ.

### 🚀 Demo

- **Live Demo**: [https://profile.truongnbn.com](https://profile.truongnbn.com)
- **Repository**: [GitHub](https://github.com/truongnbn/personal-profile)

## ✨ Tính năng

### 🌍 Đa ngôn ngữ (i18n)
- Hỗ trợ 4 ngôn ngữ: **Tiếng Việt**, **English**, **中文**, **हिन्दी**
- Tự động phát hiện ngôn ngữ từ trình duyệt
- URL routing thân thiện với SEO

### 🎨 Theme System
- **3 chế độ**: Light, Dark, System (auto)
- Smooth transitions và animations
- Responsive design cho mọi thiết bị

### 📧 Contact System
- Form liên hệ tích hợp EmailJS
- Validation chi tiết và bảo mật
- Rate limiting (3 email/5 phút)
- Toast notifications phản hồi

### 📱 Giao diện hiện đại
- Mobile-first responsive design
- Smooth animations và micro-interactions
- Accessibility (a11y) compliant
- SEO optimized

### 🔧 Tính năng khác
- Download CV với multiple formats
- Social media integration
- Performance optimized
- Security headers

## 🛠 Công nghệ sử dụng

### Core Technologies
- **[Next.js 15.3.2](https://nextjs.org/)** - React framework với App Router
- **[React 19](https://reactjs.org/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework

### Internationalization & Theming
- **[next-intl 4.1.0](https://next-intl-docs.vercel.app/)** - Internationalization cho Next.js
- **[next-themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Theme management

### UI & Notifications
- **[@heroicons/react 2.2.0](https://heroicons.com/)** - SVG icons
- **[react-icons 5.5.0](https://react-icons.github.io/react-icons/)** - Icon library
- **[react-toastify 11.0.5](https://fkhadra.github.io/react-toastify/)** - Toast notifications

### Communication & Utils
- **[@emailjs/browser 4.4.1](https://www.emailjs.com/)** - Client-side email service
- **[usehooks-ts 3.1.1](https://usehooks-ts.com/)** - TypeScript React hooks

## 🚀 Cài đặt

### Yêu cầu hệ thống
- **Node.js**: >= 20.0.0
- **npm/yarn/pnpm**: Latest version

### 1. Clone repository

```bash
git clone https://github.com/truongnbn/personal-profile.git
cd personal-profile
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### 3. Cấu hình environment variables

Tạo file `.env.local` và cấu hình:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_CONTACT_EMAIL=your_email@gmail.com

# Site Configuration (Optional)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 4. Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## ⚙️ Cấu hình

### EmailJS Setup

1. Tạo tài khoản tại [EmailJS](https://www.emailjs.com/)
2. Tạo email service và template
3. Cấu hình environment variables
4. Xem chi tiết tại [docs/EMAILJS_SETUP.md](docs/EMAILJS_SETUP.md)

### Profile Data Customization

Chỉnh sửa dữ liệu profile tại:
- `src/constants/profileData/vi.json` - Tiếng Việt
- `src/constants/profileData/en.json` - English
- `src/constants/profileData/zh.json` - 中文
- `src/constants/profileData/hi.json` - हिन्दी

### Theme Customization

Tùy chỉnh theme tại `tailwind.config.ts`:

```typescript
// Custom colors, fonts, animations...
theme: {
  extend: {
    fontFamily: {
      sans: ["Open Sans", "system-ui", "sans-serif"],
    },
    // More customizations...
  }
}
```

## 📖 Sử dụng

### Development Commands

```bash
# Development server với Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint check
npm run lint
```

### Customization Guide

1. **Cập nhật thông tin cá nhân**: Chỉnh sửa files JSON trong `src/constants/profileData/`
2. **Thay đổi theme**: Tùy chỉnh `tailwind.config.ts`
3. **Thêm trang mới**: Tạo page trong `src/app/[locale]/`
4. **Thêm component**: Tạo component trong `src/components/`

### Deployment

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify

```bash
# Build command
npm run build

# Publish directory
out/
```

## 📁 Cấu trúc dự án

```
src/
├── app/[locale]/              # Next.js App Router với i18n
├── components/                # React components
│   ├── layout/               # Layout components
│   ├── pages/                # Page-specific components
│   ├── cards/                # Card components
│   └── providers/            # Context providers
├── contexts/                  # React Context
├── hooks/                     # Custom React hooks
├── utils/                     # Utility functions
├── types/                     # TypeScript type definitions
├── constants/                 # Constants và data
├── config/                    # Configuration files
└── i18n/                     # Internationalization
```

Xem chi tiết tại [.github/copilot-instructions.md](.github/copilot-instructions.md)

## 📚 Tài liệu

- **[EmailJS Setup Guide](docs/EMAILJS_SETUP.md)** - Hướng dẫn cấu hình EmailJS
- **[Toast Usage Examples](docs/TOAST_USAGE_EXAMPLES.md)** - Examples sử dụng toast notifications  
- **[Security Guidelines](docs/SECURITY.md)** - Security best practices
- **[Copilot Instructions](.github/copilot-instructions.md)** - Hướng dẫn chi tiết cho AI development

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Development Guidelines

- Sử dụng **TypeScript** cho type safety
- Tuân thủ **ESLint** và **Prettier** config
- Viết **commit message** theo conventional commits
- Đảm bảo **responsive design** và **accessibility**
- Test trước khi submit PR

## 📝 To-Do List

- [ ] Unit tests với Jest
- [ ] E2E tests với Playwright
- [ ] PWA support
- [ ] Analytics integration
- [ ] Blog section
- [ ] Project portfolio với CMS
- [ ] Performance monitoring

## 👤 Tác giả

**TruongNBN**
- Email: [truongnbn.main@gmail.com](mailto:truongnbn.main@gmail.com)
- GitHub: [@truongnbn](https://github.com/truongnbn)
- LinkedIn: [TruongNBN](https://linkedin.com/in/truongnbn)

## 📄 Giấy phép

Dự án này được phân phối dưới giấy phép **MIT License**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - Amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework  
- [Vercel](https://vercel.com/) - Deployment platform
- [EmailJS](https://www.emailjs.com/) - Client-side email service
- [Heroicons](https://heroicons.com/) - Beautiful SVG icons

---

⭐ **Nếu dự án này hữu ích, hãy cho một star nhé!** ⭐

*Cập nhật lần cuối: 21 tháng 6, 2025*
