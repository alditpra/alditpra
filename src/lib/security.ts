/**
 * Security utilities for the application
 */

// Allowed domains for external links
const ALLOWED_DOMAINS = [
  '*.google.com',
  '*.googleusercontent.com',
  'google.com',
  'docs.google.com',
  'drive.google.com',
  'meet.google.com',
  'facebook.com',
  'wa.me',
  'whatsapp.com',
  'instagram.com',
  'twitter.com',
  'linkedin.com',
  'youtube.com',
  'github.com',
  'stackoverflow.com',
  'medium.com',
];

// Trusted domains that can be linked without warnings
const TRUSTED_DOMAINS = [
  '*.google.com',
  '*.googleusercontent.com',
  'google.com',
  'docs.google.com',
  'drive.google.com',
  'meet.google.com',
  'wa.me',
];

/**
 * Sanitizes and validates external URLs
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

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      console.warn('Blocked insecure protocol:', urlObj.protocol);
      return '#';
    }

    // Check domain against allowlist
    const hostname = urlObj.hostname.toLowerCase();
    const isAllowed = ALLOWED_DOMAINS.some(domain =>
      hostname === domain || hostname.endsWith(`.${domain}`)
    );

    if (!isAllowed) {
      console.warn('Blocked external domain:', hostname);
      return '#';
    }

    // Return the normalized URL
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
