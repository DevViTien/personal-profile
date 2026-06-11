# CLAUDE.md

Hướng dẫn cho Claude Code (và AI assistant khác) khi làm việc trong repo này.

## Dự án
Personal Profile Website — CV trực tuyến. **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3.4.1 · next-intl (6 ngôn ngữ: vi/en/zh/hi/ja/ko)**. Website tĩnh client-side, không backend; form liên hệ qua EmailJS.

## Lệnh thường dùng
```bash
npm run dev          # dev server (Turbopack)
npm run build        # build production
npm run lint         # ESLint
npm test             # Jest unit tests
npm run check:i18n   # kiểm tra 6 ngôn ngữ đồng bộ key
```

## Quality gate (chạy trước khi commit)
`npm run lint` → `npm run check:i18n` → `npm test` → `npm run build`. CI chạy đúng 4 bước này.

## Convention (bắt buộc)
- TypeScript strict; `"use client"` ở client component.
- Tailwind: mọi màu có `dark:`; mobile-first responsive.
- a11y: semantic HTML + ARIA + keyboard.
- i18n: KHÔNG hard-code chuỗi hiển thị; text mới phải đồng bộ đủ 6 ngôn ngữ.
- PowerShell: dùng `;` thay `&&`.
- Giao tiếp: **tiếng Việt**.

> Chi tiết kiến trúc đầy đủ: [.github/copilot-instructions.md](.github/copilot-instructions.md)

## Hệ thống AI Agent
Repo có sẵn skills + slash commands. **Trước khi làm task, xem flow tương ứng trong [agents/playbooks.md](agents/playbooks.md).**

| Task | Command |
|---|---|
| Thêm/sửa profile | `/profile-update` |
| Kiểm tra UI responsive | `/responsive` |
| Fix bug | `/debug` |
| Đồng bộ ngôn ngữ | `/i18n-sync` |
| Thêm ngôn ngữ mới | `/add-language` |
| Sinh test | `/gen-tests` |
| Review trước commit | `/review` |

- Skills: [.claude/skills/](.claude/skills/) · Commands: [.claude/commands/](.claude/commands/)
- Tổng quan hệ thống agent: [agents/README.md](agents/README.md)

## Mắt xích dữ liệu quan trọng (dễ sót)
- **Thêm field profile** đi qua 3 nơi: `src/types/profile.ts` (schema) → `src/constants/profileData/*.json` (6 file) → component render.
- **Thêm ngôn ngữ** đi qua 8 nơi (xem skill `add-language`), gồm cả `scripts/check-i18n.mjs`.
