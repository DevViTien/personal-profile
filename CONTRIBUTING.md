# Đóng góp cho Personal Profile Website

Cảm ơn bạn đã quan tâm! Tài liệu này mô tả quy trình và convention khi đóng góp.

## 🚀 Bắt đầu

```bash
git clone https://github.com/truongnbn/personal-profile.git
cd personal-profile
npm install
cp .env.example .env.local   # PowerShell: Copy-Item .env.example .env.local
npm run dev
```

## 🔄 Quy trình đóng góp

1. Fork & tạo branch theo format: `feature/<tên>`, `bugfix/<tên>`, `hotfix/<tên>`.
2. Code theo [convention](#-convention) bên dưới.
3. Chạy **quality gate cục bộ** trước khi commit (xem dưới).
4. Commit theo [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
5. Mở Pull Request vào `main`, điền PR template. CI sẽ tự chạy.

## ✅ Quality gate (chạy trước khi PR)

```bash
npm run lint          # ESLint
npm run check:i18n    # 6 ngôn ngữ đồng bộ key
npm test              # Unit tests (Jest)
npm run build         # Build production
```

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) chạy đúng 4 bước này — PR phải xanh mới merge.

## 📐 Convention

- **TypeScript** strict — không dùng `any` ẩn.
- **`"use client"`** ở đầu mọi client component.
- **Tailwind**: mọi class màu phải có biến thể `dark:`; layout mobile-first responsive.
- **Accessibility (a11y)**: semantic HTML, ARIA labels, keyboard navigable.
- **i18n**: không hard-code chuỗi hiển thị — dùng `next-intl`; text mới phải đồng bộ đủ 6 ngôn ngữ (`npm run check:i18n`).
- **Naming**: Component `PascalCase`, hàm/biến `camelCase`, CSS class `kebab-case`.
- **Lệnh trên Windows/PowerShell**: dùng `;` thay vì `&&`.

> Chi tiết kiến trúc & convention: [.github/copilot-instructions.md](.github/copilot-instructions.md).

## 🤖 Phát triển có AI hỗ trợ

Dự án có sẵn hệ thống AI agent (Claude Code). Xem **[agents/playbooks.md](agents/playbooks.md)** để biết flow dùng AI cho từng task (thêm profile, fix bug, responsive, thêm ngôn ngữ...).

## 🧪 Test

- Test đặt trong `__tests__/` cạnh file nguồn (`*.test.ts`).
- Ưu tiên test logic thuần (`utils/`, hooks). Mỗi bug fix nên kèm 1 test hồi quy.
- Chi tiết: [agents/playbooks.md](agents/playbooks.md) → Playbook "Fix bug" / "Viết test".

## 🔒 Báo lỗi bảo mật

KHÔNG mở issue công khai cho lỗ hổng bảo mật — xem [SECURITY.md](SECURITY.md).
