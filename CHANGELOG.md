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

### Fixed
- Drift tài liệu trong `copilot-instructions.md` và `README.md` (4→6 ngôn ngữ, Tailwind v4→3.4.1).
- `.gitignore` không còn bỏ sót `agents/` và shared `.claude/` assets.

---

> Quy ước: thêm mục dưới `[Unreleased]` khi phát triển; khi release, đổi thành `[x.y.z] - YYYY-MM-DD`.
