# Chính sách Bảo mật

## Phiên bản được hỗ trợ

Dự án triển khai liên tục (rolling release) — chỉ nhánh `main` (bản deploy hiện tại) được hỗ trợ bảo mật.

| Phiên bản | Hỗ trợ |
|-----------|--------|
| `main` (latest) | ✅ |
| Cũ hơn | ❌ |

## Báo cáo lỗ hổng

**KHÔNG** tạo GitHub Issue công khai cho lỗ hổng bảo mật.

Vui lòng báo cáo riêng tư qua:

- **Email:** truongnbn.main@gmail.com
- **Tiêu đề:** `[SECURITY] <mô tả ngắn>`

Khi báo cáo, nếu có thể hãy kèm: mô tả lỗ hổng, bước tái hiện, ảnh hưởng tiềm tàng, và đề xuất khắc phục (nếu có).

**Thời gian phản hồi dự kiến:** trong vòng 7 ngày làm việc.

## Phạm vi

Đây là một website tĩnh client-side (không backend/DB). Bề mặt tấn công chính:

- **Form liên hệ (EmailJS)** — đã có input validation, sanitization, rate limiting.
- **Environment variables** — chỉ `NEXT_PUBLIC_*` (public-by-design); không chứa secret server.
- **Security headers** — cấu hình tại [`next.config.ts`](next.config.ts).

Chi tiết kỹ thuật các biện pháp bảo mật đã triển khai: **[docs/SECURITY.md](docs/SECURITY.md)**.
