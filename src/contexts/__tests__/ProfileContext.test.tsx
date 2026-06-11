/**
 * Test hồi quy: ProfileProvider phải load data theo ĐÚNG locale hiện tại.
 *
 * Bug đã gặp: provider hardcode loadProfileData("vi") khi mount, chạy đua với
 * useProfileLanguageSync → bản "vi" ghi đè data của locale thật, khiến trang
 * /ja hiển thị nội dung tiếng Việt (flaky race condition).
 *
 * Fix: provider load theo useLocale(). Test này render với locale "ja" và
 * khẳng định nội dung là tiếng Nhật.
 */
import { render, screen, waitFor } from "@testing-library/react";
import { ProfileProvider, useProfile } from "../ProfileContext";

// Giả lập locale hiện tại = "ja"
jest.mock("next-intl", () => ({ useLocale: () => "ja" }));

function Consumer() {
  const { profileData, loading } = useProfile();
  if (loading || !profileData) return <div>loading</div>;
  return (
    <div data-testid="title">{profileData.experience[0].title}</div>
  );
}

describe("ProfileProvider — locale-aware loading", () => {
  it("load data tiếng Nhật khi locale là 'ja' (không phải vi hardcode)", async () => {
    render(
      <ProfileProvider>
        <Consumer />
      </ProfileProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("title")).toBeInTheDocument()
    );

    // ja title (フロントエンド...), KHÔNG phải vi ("Frontend Developer / Technical Leader")
    expect(screen.getByTestId("title").textContent).toContain("フロントエンド");
  });
});
