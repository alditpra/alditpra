/**
 * Simple utilities for Google Drive folders
 */

/**
 * Check if URL is a Google Drive folder
 */
export function isGoogleDriveFolder(url: string): boolean {
  return url.includes('drive.google.com') &&
    (url.includes('/folders/') || url.includes('/folder/') || url.includes('/open?'));
}
