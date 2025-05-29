/**
 * Utility functions for handling file downloads
 */

/**
 * Downloads a file from the given URL
 * @param url - The URL of the file to download
 * @param filename - Optional custom filename for the download
 */
export const downloadFile = (url: string, filename?: string) => {
  try {
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
  } catch (error) {
    console.error("Error downloading file:", error);
    // Fallback: open in new tab
    window.open(url, "_blank");
  }
};

/**
 * Downloads CV with proper filename formatting
 * @param cvUrl - The URL of the CV file
 * @param userName - User's name for filename generation
 */
export const downloadCV = (cvUrl: string, userName?: string) => {
  const filename = userName
    ? `CV-${userName.replace(/\s+/g, "-")}.pdf`
    : "CV.pdf";

  downloadFile(cvUrl, filename);
};
