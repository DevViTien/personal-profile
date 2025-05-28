# Giới thiệu dự án Website Profile Cá Nhân

Đây là dự án xây dựng một trang web profile cá nhân sử dụng Next.js và Tailwind CSS. Mục tiêu của dự án là tạo ra một CV trực tuyến, hiện đại và tương tác để giới thiệu bản thân, các kỹ năng, kinh nghiệm làm việc và các dự án đã thực hiện.

## Công nghệ sử dụng

- **Next.js 15.3.2:** Framework React với App Router cho phép xây dựng các ứng dụng web nhanh chóng và tối ưu SEO.
- **React 19:** Library JavaScript để xây dựng giao diện người dùng hiện đại.
- **Tailwind CSS v4:** Framework CSS tiện ích với PostCSS để xây dựng giao diện responsive và dark mode.
- **TypeScript:** Ngôn ngữ lập trình giúp tăng cường tính chặt chẽ và dễ bảo trì cho mã nguồn.
- **Heroicons:** Thư viện icon SVG đẹp và nhất quán cho React.
- **ESLint:** Tool kiểm tra chất lượng code với Next.js config.

## Mục tiêu

- Thay thế CV truyền thống bằng một trang web profile cá nhân.
- Trình bày thông tin cá nhân một cách rõ ràng, chuyên nghiệp và hấp dẫn.
- Thể hiện các kỹ năng và kinh nghiệm làm việc.
- Giới thiệu các dự án đã tham gia hoặc tự phát triển.
- Cung cấp thông tin liên hệ.

## Kiến trúc dự án

### Cấu trúc thư mục hiện tại

- **`src/app`**: Chứa các trang chính của ứng dụng sử dụng Next.js App Router
  - `layout.tsx`: Root layout với AppProvider, Header, Sidebar, Footer
  - `page.tsx`: Trang chủ (đang cơ bản)
  - `about/page.tsx`: Trang giới thiệu (placeholder)
  - `projects/page.tsx`: Trang dự án (placeholder)  
  - `contact/page.tsx`: Trang liên hệ (placeholder)
  - `globals.css`: CSS toàn cục với Tailwind imports

- **`src/components`**: Chứa các UI component tái sử dụng
  - `layout/`: Header, Footer, Sidebar, ThemeToggleButton
  - `cards/`: ProfileCard component

- **`src/constants`**: Chứa dữ liệu tĩnh
  - `profileData.json`: Thông tin cá nhân, skills, experience, projects

- **`src/contexts`**: Context management cho state toàn cục
  - `AppProvider.tsx`: Provider tổng hợp
  - `ThemeContext.tsx`: Quản lý dark/light mode
  - `ProfileContext.tsx`: Quản lý dữ liệu profile

- **`src/assets`**: Tài nguyên tĩnh (avatar.jpg)

- **`public`**: Tài sản tĩnh public (assets/avatar.jpg)

### Tính năng đã triển khai

## Thông tin Dev

- **Tên:** TruongNBN

## Yêu cầu khi giao tiếp

- **Ngôn ngữ:** Tiếng Việt
- **Phong cách:** Chuyên nghiệp, lịch sự, rõ ràng.
- **Vai vế:** Tôi là người phát triển dự án, bạn là trợ lý AI hỗ trợ tôi trong việc xây dựng và cải thiện dự án này.

## Conventions

- **Commit Message:** Sử dụng conventional commits (ví dụ: `feat: add new feature`, `fix: resolve a bug`, `docs: update documentation`).
- **Branch Naming:** Sử dụng format `feature/feature-name`, `bugfix/bug-name`, `hotfix/hotfix-name`.
- **Code Style:** Tuân thủ theo ESLint và Prettier đã cấu hình trong dự án.
- **Naming Conventions:**
  - Components: PascalCase (ví dụ: `MyComponent.tsx`)
  - Functions/Variables: camelCase (ví dụ: `myFunction`, `myVariable`)
  - CSS Classes: kebab-case (ví dụ: `my-class`)
- **File Structure:** Giữ cấu trúc thư mục gọn gàng và có tổ chức như đã mô tả ở phần Kiến trúc dự án.
- **Comments:** Viết comment giải thích cho các đoạn code phức tạp hoặc logic quan trọng.

## Yêu cầu bắt buộc

- Khi generate code, hãy đảm bảo rằng mã nguồn tuân thủ các conventions đã nêu ở trên.
- Khi generate code về giao diện, cần đảm bảo tailwind class có đáp ứng cả dark mode, light mode responsive
- Khi generate code về giao diện, cần đảm bảo đáp ứng các tiêu chuẩn về accessibility (a11y).
- Khi generate code, nếu file client-side, cần đảm bảo có sử dụng `use client` ở đầu file.
- Khi generate code về logic, cần đảm bảo sử dụng TypeScript để tăng cường tính an toàn và dễ bảo trì.
- Khi generate code về các component, cần đảm bảo rằng chúng có thể tái sử dụng và dễ dàng mở rộng.
