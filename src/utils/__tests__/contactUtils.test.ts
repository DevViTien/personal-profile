/**
 * Test cho contactActions & copyToClipboard — build URL đúng, mở đúng tab, fallback clipboard.
 */
import { contactActions, copyToClipboard } from "../contactUtils";

describe("contactActions", () => {
  let openSpy: jest.SpyInstance;

  beforeEach(() => {
    openSpy = jest.spyOn(window, "open").mockImplementation(() => null);
    // window.location.href: jsdom cho phép gán
    Object.defineProperty(window, "location", {
      writable: true,
      value: { href: "" },
    });
  });
  afterEach(() => jest.restoreAllMocks());

  it("email: build mailto có subject đã encode", () => {
    contactActions.email("a@b.com", "Chào bạn & cộng sự");
    expect(window.location.href).toBe("mailto:a@b.com?subject=Ch%C3%A0o%20b%E1%BA%A1n%20%26%20c%E1%BB%99ng%20s%E1%BB%B1");
  });

  it("email: không có subject thì chỉ mailto", () => {
    contactActions.email("a@b.com");
    expect(window.location.href).toBe("mailto:a@b.com");
  });

  it("phone: build tel:", () => {
    contactActions.phone("+84901234567");
    expect(window.location.href).toBe("tel:+84901234567");
  });

  it("whatsapp: loại bỏ ký tự không phải số khỏi phone", () => {
    contactActions.whatsapp("+84 90-123 4567");
    expect(openSpy).toHaveBeenCalledWith("https://wa.me/84901234567", "_blank");
  });

  it("telegram: build link t.me với username", () => {
    contactActions.telegram("truongnbn");
    expect(openSpy).toHaveBeenCalledWith("https://t.me/truongnbn", "_blank");
  });
});

describe("copyToClipboard", () => {
  afterEach(() => jest.restoreAllMocks());

  it("trả về true khi navigator.clipboard thành công", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    await expect(copyToClipboard("hello")).resolves.toBe(true);
  });

  it("fallback execCommand khi clipboard API lỗi", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockRejectedValue(new Error("denied")) },
    });
    // @ts-expect-error - execCommand không có trong type jsdom hiện đại
    document.execCommand = jest.fn().mockReturnValue(true);
    jest.spyOn(console, "error").mockImplementation(() => {});

    await expect(copyToClipboard("hello")).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});
