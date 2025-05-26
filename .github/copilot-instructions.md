# Giới thiệu dự án Website Profile Cá Nhân

Đây là dự án xây dựng một trang web profile cá nhân sử dụng Next.js và Tailwind CSS. Mục tiêu của dự án là tạo ra một CV trực tuyến, hiện đại và tương tác để giới thiệu bản thân, các kỹ năng, kinh nghiệm làm việc và các dự án đã thực hiện.

## Công nghệ sử dụng

- **Next.js:** Framework React cho phép xây dựng các ứng dụng web nhanh chóng và tối ưu SEO.
- **Tailwind CSS:** Framework CSS tiện ích giúp xây dựng giao diện người dùng một cách linh hoạt và hiệu quả.
- **TypeScript:** Ngôn ngữ lập trình giúp tăng cường tính chặt chẽ và dễ bảo trì cho mã nguồn.

## Mục tiêu

- Thay thế CV truyền thống bằng một trang web profile cá nhân.
- Trình bày thông tin cá nhân một cách rõ ràng, chuyên nghiệp và hấp dẫn.
- Thể hiện các kỹ năng và kinh nghiệm làm việc.
- Giới thiệu các dự án đã tham gia hoặc tự phát triển.
- Cung cấp thông tin liên hệ.

## Kiến trúc dự án

- **`src/app`**: Chứa các trang chính của ứng dụng (ví dụ: `page.tsx`, `layout.tsx`).
- **`src/components`**: Chứa các UI component tái sử dụng (ví dụ: Header, Footer, ProjectCard).
- **`src/constants`**: Chứa các hằng số, dữ liệu tĩnh (ví dụ: thông tin cá nhân, danh sách dự án).
- **`src/ui`**: Chứa các thành phần giao diện người dùng (UI) như button, input, modal.
- **`src/contexts`**: Chứa các context để quản lý trạng thái toàn cục (ví dụ: ThemeContext, AuthContext).
- **`src/utils`**: Chứa các hàm tiện ích, helper functions (ví dụ: format date, validate email).
- **`public`**: Chứa các tài sản tĩnh như hình ảnh, icon.

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
