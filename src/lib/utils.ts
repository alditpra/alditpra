import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
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

    return content;
}
