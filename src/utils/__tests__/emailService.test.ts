/**
 * Test cho logic thuần trong emailService: validateFormData, sanitizeFormData, checkRateLimit.
 * Không test sendContactEmail (gọi EmailJS thật) — chỉ test phần logic xác thực & bảo mật.
 */
import {
  validateFormData,
  sanitizeFormData,
  checkRateLimit,
  type ContactFormData,
} from "../emailService";

const validData: ContactFormData = {
  name: "Nguyen Van A",
  email: "a@example.com",
  subject: "Hợp tác dự án",
  message: "Xin chào, tôi muốn trao đổi về cơ hội hợp tác lâu dài.",
};

describe("validateFormData", () => {
  it("trả về null khi dữ liệu hợp lệ", () => {
    expect(validateFormData(validData)).toBeNull();
  });

  it("báo lỗi khi thiếu tên", () => {
    expect(validateFormData({ ...validData, name: "  " })).toMatch(/họ và tên/i);
  });

  it("báo lỗi khi tên chứa ký tự không hợp lệ", () => {
    expect(validateFormData({ ...validData, name: "<script>" })).toMatch(/chữ cái/i);
  });

  it("chấp nhận tên tiếng Việt có dấu", () => {
    expect(validateFormData({ ...validData, name: "Nguyễn Bùi Nam Trường" })).toBeNull();
  });

  it("báo lỗi email sai định dạng", () => {
    expect(validateFormData({ ...validData, email: "not-an-email" })).toMatch(/định dạng/i);
  });

  it("báo lỗi khi subject chứa spam keyword", () => {
    expect(validateFormData({ ...validData, subject: "You are the lottery winner" })).toMatch(
      /không được phép/i
    );
  });

  it("báo lỗi khi message quá ngắn", () => {
    expect(validateFormData({ ...validData, message: "ngắn" })).toMatch(/quá ngắn/i);
  });

  it("báo lỗi khi message quá dài (>2000)", () => {
    expect(validateFormData({ ...validData, message: "a".repeat(2001) })).toMatch(/quá dài/i);
  });

  it("báo lỗi khi message chứa quá 2 URL", () => {
    const msg = "Xem http://a.com và http://b.com và http://c.com nhé bạn ơi";
    expect(validateFormData({ ...validData, message: msg })).toMatch(/đường dẫn/i);
  });
});

describe("sanitizeFormData", () => {
  it("loại bỏ ký tự nguy hiểm khỏi name", () => {
    const out = sanitizeFormData({ ...validData, name: 'A<b>"&x' });
    expect(out.name).not.toMatch(/[<>"'&]/);
  });

  it("loại bỏ thẻ <script> khỏi message", () => {
    const out = sanitizeFormData({
      ...validData,
      message: 'Hello <script>alert("xss")</script> world này nhé',
    });
    expect(out.message).not.toMatch(/<script>/i);
  });

  it("đưa email về lowercase và cắt khoảng trắng", () => {
    const out = sanitizeFormData({ ...validData, email: "  A@Example.COM  " });
    expect(out.email).toBe("a@example.com");
  });

  it("giới hạn độ dài message tối đa 2000 ký tự", () => {
    const out = sanitizeFormData({ ...validData, message: "a".repeat(5000) });
    expect(out.message.length).toBeLessThanOrEqual(2000);
  });
});

describe("checkRateLimit", () => {
  beforeEach(() => localStorage.clear());

  it("cho phép 3 lần đầu, chặn lần thứ 4", () => {
    expect(checkRateLimit().allowed).toBe(true);
    expect(checkRateLimit().allowed).toBe(true);
    expect(checkRateLimit().allowed).toBe(true);
    const fourth = checkRateLimit();
    expect(fourth.allowed).toBe(false);
    expect(fourth.timeLeft).toBeGreaterThan(0);
  });

  it("fail-safe: cho phép gửi khi localStorage chứa dữ liệu hỏng", () => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // nuốt log lỗi chủ ý
    localStorage.setItem("contact_form_attempts", "{invalid json");
    expect(checkRateLimit().allowed).toBe(true);
    jest.restoreAllMocks();
  });
});
