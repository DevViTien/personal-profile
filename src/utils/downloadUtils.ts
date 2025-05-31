/**
 * Utility functions for handling file downloads
 */

/**
 * Downloads a file from the given URL
 * @param url - The URL of the file to download
 * @param filename - Optional custom filename for the download
 * @param onStart - Callback when download starts
 * @param onSuccess - Callback when download succeeds
 * @param onError - Callback when download fails
 */
export const downloadFile = (
  url: string,
  filename?: string,
  onStart?: () => void,
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  try {
    // Notify download start
    onStart?.();

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;

    // Set download attribute with filename if provided
    if (filename) {
      link.download = filename;
    } else {
      // Extract filename from URL or use default
      const urlParts = url.split("/");
      const defaultFilename = urlParts[urlParts.length - 1] || "cv.pdf";
      link.download = defaultFilename;
    }

    // Append to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Notify success after a short delay to ensure download has started
    setTimeout(() => {
      onSuccess?.();
    }, 1000);
  } catch (error) {
    console.error("Error downloading file:", error);

    // Notify error
    onError?.(error as Error);

    // Fallback: open in new tab
    try {
      window.open(url, "_blank");
    } catch (fallbackError) {
      console.error("Failed to open file in new tab:", fallbackError);
    }
  }
};

/**
 * Downloads CV with proper filename formatting
 * @param cvUrl - The URL of the CV file
 * @param userName - User's name for filename generation
 * @param onStart - Callback when download starts
 * @param onSuccess - Callback when download succeeds
 * @param onError - Callback when download fails
 */
export const downloadCV = (
  cvUrl: string,
  userName?: string,
  onStart?: () => void,
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  const filename = userName
    ? `CV-${userName.replace(/\s+/g, "-")}.pdf`
    : "CV.pdf";

  downloadFile(cvUrl, filename, onStart, onSuccess, onError);
};
