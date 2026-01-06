import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(text: string): string {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Sleep/delay utility
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// groupByCategory moved to category-utils.ts

/**
 * Sanitize URL to prevent XSS (javascript: links)
 */
export function sanitizeUrl(url: string): string {
    if (!url) return '#';

    // Trim whitespace
    const content = url.trim();

    // Check for javascript: protocol
    if (content.toLowerCase().startsWith('javascript:')) {
        return '#';
    }

    // Don't modify internal paths, anchors, or existing protocols
    if (
        content.startsWith("/") ||
        content.startsWith("#") ||
        content.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:/) // Matches http:, https:, mailto:, etc.
    ) {
        return content;
    }

    // Assume missing protocol for external links (e.g., "google.com")
    return `https://${content}`;
}
