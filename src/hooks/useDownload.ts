"use client";

import { useToast } from "./useToast";
import { downloadFile, downloadCV } from "@/utils/downloadUtils";

/**
 * Custom hook kết hợp download utilities với toast notifications
 * Cung cấp feedback cho user khi download files
 */
export const useDownload = () => {
  const toast = useToast();

  /**
   * Download file với toast notifications
   */
  const downloadFileWithToast = (url: string, filename?: string) => {
    downloadFile(
      url,
      filename,
      () => toast.download.started(),
      () => toast.download.success(),
      (error) => {
        console.error("Download error:", error);
        toast.download.error();
      }
    );
  };

  /**
   * Download CV với toast notifications
   */
  const downloadCVWithToast = (cvUrl: string, userName?: string) => {
    downloadCV(cvUrl, userName);
  };

  return {
    downloadFile: downloadFileWithToast,
    downloadCV: downloadCVWithToast,
  };
};
