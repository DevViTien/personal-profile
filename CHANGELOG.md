# Changelog

Tất cả thay đổi đáng chú ý của dự án được ghi tại đây.

Định dạng theo [Keep a Changelog](https://keepachangelog.com/vi/1.1.0/),
và dự án tuân theo [Semantic Versioning](https://semver.org/lang/vi/).

## [Unreleased]

### Added
- Hạ tầng test: Jest + React Testing Library (`next/jest`), 27 unit test cho `utils/`.
- CI quality gate (GitHub Actions): `lint → check:i18n → test → build`.
- Script kiểm tra đồng bộ i18n: `npm run check:i18n`.
- Hệ thống AI Agent (Claude Code): skills + slash commands + playbooks trong `agents/` và `.claude/`.
- File chuẩn dự án: `LICENSE`, `.env.example`, `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, `.editorconfig`, `CLAUDE.md`, PR/Issue templates.

### Changed
- Bổ sung 2 ngôn ngữ: **Tiếng Nhật (ja)** và **Tiếng Hàn (ko)** → tổng 6 ngôn ngữ.
- Cập nhật tài liệu khớp thực tế (số ngôn ngữ, phiên bản Tailwind, hướng dẫn deploy).

### Security
- Nâng **Next.js 15.3.2 → 15.5.19** vá nhiều lỗ hổng **critical** (RCE React flight protocol, SSRF middleware, cache poisoning, DoS...).
- Nâng **next-intl → 4.13.0** vá open-redirect & prototype pollution.

### Fixed
- Bug crash `/ja`,`/ko` › Projects: `experience[].projects` chứa string thay vì object `Project` (ja/ko) → `.slice` of undefined.
- Bug data hiển thị sai ngôn ngữ: `ProfileContext` hardcode load `"vi"` khi mount, race với `useProfileLanguageSync` → trang `/ja` hiện tiếng Việt. Nay load theo `useLocale()`.
- Drift tài liệu trong `copilot-instructions.md` và `README.md` (4→6 ngôn ngữ, Tailwind v4→3.4.1).
- `.gitignore` không còn bỏ sót `agents/` và shared `.claude/` assets.

---

> Quy ước: thêm mục dưới `[Unreleased]` khi phát triển; khi release, đổi thành `[x.y.z] - YYYY-MM-DD`.
