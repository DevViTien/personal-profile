# 🛡️ Security Guidelines - EmailJS Integration

## Tổng quan Bảo mật

Dự án này sử dụng EmailJS để xử lý form liên hệ với nhiều lớp bảo mật để đảm bảo an toàn.

## 🔒 Các Biện pháp Bảo mật Đã triển khai

### 1. **Input Validation & Sanitization**
- ✅ Kiểm tra định dạng email với regex mạnh
- ✅ Validation độ dài fields (name: 2-100, subject: 1-200, message: 10-2000)
- ✅ Loại bỏ script tags và ký tự đặc biệt có thể gây hại
- ✅ Kiểm tra spam keywords trong subject
- ✅ Giới hạn số lượng URLs trong message (tối đa 2)

### 2. **Rate Limiting**
- ✅ Giới hạn 3 attempts trong 5 phút per user
- ✅ Sử dụng localStorage để track attempts
- ✅ Hiển thị thời gian còn lại khi bị rate limit

### 3. **Environment Variables**
- ✅ Sử dụng `NEXT_PUBLIC_*` cho client-side config
- ✅ Kiểm tra tồn tại của tất cả required env variables
- ✅ Fail-safe khi config bị thiếu

### 4. **Error Handling**
- ✅ Không expose sensitive information trong error messages
- ✅ Catch và handle tất cả types of errors
- ✅ Graceful degradation khi có lỗi

### 5. **Data Protection**
- ✅ Không lưu trữ sensitive data trên client
- ✅ Sanitize tất cả user inputs
- ✅ Thêm timestamp và user agent vào email template

## ⚠️ Lưu ý Bảo mật quan trọng

### EmailJS Template Configuration
Đảm bảo EmailJS template được cấu hình đúng:

```handlebars
Subject: {{subject}} - Liên hệ từ {{from_name}}

Từ: {{from_name}} ({{from_email}})
Thời gian: {{timestamp}}
User Agent: {{user_agent}}

Nội dung:
{{message}}

---
Reply to: {{reply_to}}
```

### Environment Variables Required
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_CONTACT_EMAIL=your_email@domain.com
```

## 🚨 Potential Security Risks & Mitigations

### 1. **Client-side Exposure** 
- **Risk**: EmailJS credentials được expose trên client
- **Mitigation**: Sử dụng EmailJS domain restrictions, rate limiting

### 2. **Spam/Abuse**
- **Risk**: Form có thể bị spam hoặc abuse
- **Mitigation**: Rate limiting, input validation, spam keyword detection

### 3. **XSS Attacks**
- **Risk**: Malicious scripts trong form inputs
- **Mitigation**: Input sanitization, script tag removal

### 4. **Email Bombing**
- **Risk**: Gửi quá nhiều emails
- **Mitigation**: Rate limiting 3 attempts/5 minutes

## 🔧 Maintenance Checklist

### Hàng tháng:
- [ ] Kiểm tra EmailJS logs cho suspicious activities
- [ ] Review rate limiting effectiveness
- [ ] Update spam keywords list nếu cần

### Hàng quý:
- [ ] Review và update validation rules
- [ ] Test error handling scenarios
- [ ] Kiểm tra env variables configuration

### Khi có incident:
- [ ] Analyze logs để identify attack pattern
- [ ] Update validation/rate limiting rules
- [ ] Document lessons learned

## 📞 Security Contact

Nếu phát hiện security vulnerability:
- Email: truongnbn.main@gmail.com
- Subject: [SECURITY] Portfolio Contact Form Issue

## 🔄 Updates

- **v1.0** (2025-05-31): Initial security implementation
  - Basic validation và rate limiting
  - EmailJS integration với env variables
  - Input sanitization và error handling
