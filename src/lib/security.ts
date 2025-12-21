/**
 * Security utilities for the application
 */

/**
 * Sanitizes and validates external URLs
 * Only blocks dangerous protocols - all HTTPS/HTTP domains are allowed
 */
export function sanitizeUrl(url: string | undefined): string {
  if (!url || typeof url !== 'string') {
    return '#';
  }

  // Trim whitespace
  const trimmedUrl = url.trim();

  // Handle relative URLs
  if (trimmedUrl.startsWith('/') || trimmedUrl.startsWith('#')) {
    return trimmedUrl;
  }

  // Handle protocol-relative URLs
  if (trimmedUrl.startsWith('//')) {
    return `https:${trimmedUrl}`;
  }

  try {
    const urlObj = new URL(trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`);

    // Only allow http and https protocols (blocks javascript:, data:, file:, etc.)
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      console.warn('Blocked insecure protocol:', urlObj.protocol);
      return '#';
    }

    // Return the normalized URL - all HTTPS/HTTP domains are allowed
    return urlObj.toString();
  } catch (error) {
    console.warn('Invalid URL format:', trimmedUrl, error);
    return '#';
  }
}

/**
 * Creates safe external link attributes
 */
export function getExternalLinkProps(url: string): {
  target?: string;
  rel?: string;
  className?: string;
} {
  if (sanitizeUrl(url) === '#') {
    return {
      className: 'cursor-not-allowed opacity-50',
    };
  }

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

/**
 * Detects if a URL is a Google Drive folder
 */
export function isGoogleDriveFolder(url: string | undefined): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  return /drive\.google\.com\/drive\/folders\/[a-zA-Z0-9_-]+/.test(url);
}

/**
 * Detects if a URL is an external link (not a relative path)
 */
export function isExternalLink(url: string | undefined): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const trimmed = url.trim();

  // Relative URLs are not external
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return false;
  }

  // URLs with protocol or www are external
  return /^(https?:\/\/|www\.)/.test(trimmed);
}

