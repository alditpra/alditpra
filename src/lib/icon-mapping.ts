/**
 * Icon Mapping Utility
 * Maps legacy FontAwesome and custom icon names to Lucide icon names
 * Used throughout the application for consistent icon rendering
 */

export const ICON_MAP: Record<string, string> = {
    // FontAwesome to Lucide mappings
    'object-group': 'layout-grid',
    'book': 'book-open',
    'video': 'play-circle',
    'file-alt': 'file-text',
    'cog': 'settings',
    'certificate': 'award',
    'tools': 'wrench',
    'book-code': 'notebook-pen', // book-code doesn't exist in lucide
    'search': 'search',
    'alert-triangle': 'alert-triangle',
    'layout-grid': 'layout-grid',
    'folder-open': 'folder-open',
    'sparkles': 'sparkles',
    'terminal': 'terminal',
    'github': 'github',
    'skull': 'skull',
};

/**
 * Get the mapped icon name, or return the original if no mapping exists
 */
export function getMappedIconName(iconName: string | undefined): string | undefined {
    if (!iconName || iconName.trim().length === 0) {
        return undefined;
    }

    const normalizedIcon = iconName.trim().toLowerCase();
    return ICON_MAP[normalizedIcon] || normalizedIcon;
}
