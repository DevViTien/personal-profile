# EmailJS Configuration Guide

## 📧 Hướng dẫn cấu hình EmailJS cho tính năng Contact Form

### 1. Tạo tài khoản EmailJS
1. Truy cập https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí
3. Xác thực email

### 2. Tạo Email Service
1. Vào Dashboard > Email Services
2. Thêm service mới (Gmail, Outlook, v.v.)
3. Lấy **Service ID** (dạng: `service_xxxxxxx`)

### 3. Tạo Email Template
1. Vào Dashboard > Email Templates  
2. Tạo template mới với ID: `template_pw_feedback`
3. Cấu hình template với các biến:

```html
Subject: {{subject}} - Liên hệ từ {{from_name}}

Xin chào TruongNBN,

Bạn có tin nhắn mới từ website:

**Người gửi:** {{from_name}}
**Email:** {{from_email}}
**Chủ đề:** {{subject}}

**Nội dung:**
{{message}}

---
Email này được gửi từ form liên hệ trên website cá nhân.
Reply-to: {{reply_to}}
```

### 4. Lấy Public Key
1. Vào Dashboard > Account > General
2. Copy **Public Key** (dạng: `user_xxxxxxxxxxxxxxxx`)

### 5. Cấu hình Environment Variables
Cập nhật file `.env.local`:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_pw_feedback
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_CONTACT_EMAIL=your_email@gmail.com
```

### 6. Bảo mật
- ✅ Giới hạn domain trong EmailJS dashboard
- ✅ Rate limiting đã được implement
- ✅ Input validation và sanitization
- ✅ Không expose private keys

### 7. Testing
1. `npm run dev`
2. Truy cập `/contact`
3. Điền form và gửi test
4. Kiểm tra email nhận

### 8. Các biến template có thể sử dụng:
- `{{from_name}}` - Tên người gửi
- `{{from_email}}` - Email người gửi  
- `{{subject}}` - Chủ đề
- `{{message}}` - Nội dung tin nhắn
- `{{to_email}}` - Email nhận
- `{{reply_to}}` - Email để reply

### 9. Troubleshooting
- Kiểm tra Network tab trong DevTools
- Xem Console để debug lỗi
- Đảm bảo template variables match
- Kiểm tra domain whitelist trong EmailJS

---

**Lưu ý:** EmailJS free plan có giới hạn 200 emails/tháng. Nâng cấp plan nếu cần thêm.
