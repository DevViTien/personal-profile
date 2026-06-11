/**
 * Test cho downloadFile & downloadCV — kiểm tra hành vi DOM (tạo <a>, click, filename).
 */
import { downloadFile, downloadCV } from "../downloadUtils";

describe("downloadFile", () => {
  let clickSpy: jest.SpyInstance;

  beforeEach(() => {
    clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("tạo link với filename được truyền vào và click", () => {
    let captured = "";
    jest.spyOn(document.body, "appendChild").mockImplementation((node) => {
      captured = (node as HTMLAnchorElement).download;
      return node;
    });
    jest.spyOn(document.body, "removeChild").mockImplementation((node) => node);

    downloadFile("https://x.com/file.pdf", "my-cv.pdf");

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(captured).toBe("my-cv.pdf");
  });

  it("suy ra filename từ URL khi không truyền filename", () => {
    let captured = "";
    jest.spyOn(document.body, "appendChild").mockImplementation((node) => {
      captured = (node as HTMLAnchorElement).download;
      return node;
    });
    jest.spyOn(document.body, "removeChild").mockImplementation((node) => node);

    downloadFile("https://x.com/path/resume.pdf");

    expect(captured).toBe("resume.pdf");
  });

  it("gọi onStart rồi onSuccess (sau timeout)", () => {
    jest.useFakeTimers();
    const onStart = jest.fn();
    const onSuccess = jest.fn();

    downloadFile("https://x.com/a.pdf", "a.pdf", onStart, onSuccess);

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onSuccess).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});

describe("downloadCV", () => {
  beforeEach(() => {
    jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
  });
  afterEach(() => jest.restoreAllMocks());

  it("tạo filename thay khoảng trắng bằng dấu gạch ngang", () => {
    let captured = "";
    jest.spyOn(document.body, "appendChild").mockImplementation((node) => {
      captured = (node as HTMLAnchorElement).download;
      return node;
    });
    jest.spyOn(document.body, "removeChild").mockImplementation((node) => node);

    downloadCV("https://x.com/cv.pdf", "Nguyen Van A");

    expect(captured).toBe("CV-Nguyen-Van-A.pdf");
  });

  it("dùng tên mặc định CV.pdf khi không có userName", () => {
    let captured = "";
    jest.spyOn(document.body, "appendChild").mockImplementation((node) => {
      captured = (node as HTMLAnchorElement).download;
      return node;
    });
    jest.spyOn(document.body, "removeChild").mockImplementation((node) => node);

    downloadCV("https://x.com/cv.pdf");

    expect(captured).toBe("CV.pdf");
  });
});
