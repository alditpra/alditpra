import type { Link, Category } from "../types";

/**
 * Groups links by category for display
 * @param links - Array of links to group
 * @param categories - Array of categories for grouping
 * @returns Map with category IDs as keys and arrays of links as values
 */
export function groupByCategory(links: Link[], categories: Category[]): Map<string, Link[]> {
    const groups = new Map<string, Link[]>();

    for (const cat of categories) {
        if (cat.active === 1) groups.set(cat.id, []);
    }

    for (const link of links) {
        const categoryId = link.category || "kuliah";
        if (!groups.has(categoryId)) {
            if (groups.has("lainnya")) {
                groups.get("lainnya")!.push(link);
            } else {
                groups.set(categoryId, [link]);
            }
        } else {
            groups.get(categoryId)!.push(link);
        }
    }
    return groups;
}

/**
 * Get the color index for a specific link based on its position in the home page layout.
 * This mirrors the globalIndex calculation used in HomePage.astro.
 * @param linkId - The ID of the link to find
 * @param links - All links
 * @param categories - All categories
 * @returns The color index for the link, or 0 if not found
 */
export function getLinkColorIndex(linkId: string, links: Link[], categories: Category[]): number {
    const groupedLinks = groupByCategory(links, categories);

    let globalIndex = 0;

    for (const category of categories) {
        if (category.active !== 1) continue;

        const categoryLinks = groupedLinks.get(category.id) || [];
        if (categoryLinks.length === 0) continue;

        // Category header consumes one index
        globalIndex++;

        // Check each link in this category
        for (const link of categoryLinks) {
            if (link.id === linkId) {
                return globalIndex;
            }
            globalIndex++;
        }
    }

    return 0; // fallback
}
