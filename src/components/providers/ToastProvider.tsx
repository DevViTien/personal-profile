"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * ToastProvider Component - Cung cấp toast notification cho toàn bộ ứng dụng
 * Tự động detect dark/light mode và áp dụng theme tương ứng
 */
export default function ToastProvider() {
  const { theme } = useTheme();

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
