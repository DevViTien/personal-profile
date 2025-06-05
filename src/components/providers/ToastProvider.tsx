"use client";

import { ToastContainer } from "react-toastify";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMounted } from "usehooks-ts";
import "react-toastify/dist/ReactToastify.css";

/**
 * ToastProvider Component - Cung cấp toast notification cho toàn bộ ứng dụng
 * Tự động detect dark/light mode và áp dụng theme tương ứng
 */
export default function ToastProvider() {
  const isMounted = useIsMounted();
  const { theme } = useTheme();

  // Kiểm tra nếu component chưa được mount, không render gì cả
  if (!isMounted()) {
    return null;
  }

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme === "dark" ? "dark" : "light"}
      className="toast-container"
      style={{
        fontSize: "14px",
      }}
    />
  );
}
