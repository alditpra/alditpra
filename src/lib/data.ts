import type { Link, LevelOneItem, AppData, Category } from "../types";
import { SHEET_URLS, FETCH_TIMEOUT } from "./constants";
import {
    parseError,
    DataFetchError,
    ErrorType,
    getFallbackLinks,
    getFallbackCategories,
    retryOperation
} from "./error-handler";
import Papa from 'papaparse';

interface RawLinkRow {
    id?: string;
    name?: string;
    description?: string;
    icon?: string;
    category?: string;
    link?: string; // Direct Link
    level?: string; // 0 or 1
    active?: string;
    order?: string;
}

interface RawLevelOneRow {
    id?: string; // New priority
    link_id?: string;
    title?: string;
    description?: string;
    link?: string; // Generic link
    type?: string;
    icon?: string;
    urutan?: string;
    active?: string;
}

interface RawCategoryRow {
    id?: string;
    title?: string;
    description?: string;
    icon?: string;
    order?: string;
    active?: string;
}

async function fetchSheetData(url: string): Promise<string> {
    return retryOperation(async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'public, max-age=300, stale-while-revalidate=600', // 5 min cache, 10 min stale
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new DataFetchError(
                        ErrorType.NOT_FOUND_ERROR,
                        `Data not found: ${response.status}`,
                        { url, status: response.status }
                    );
                }
                throw new DataFetchError(
                    ErrorType.NETWORK_ERROR,
                    `Failed to fetch sheet: ${response.status}`,
                    { url, status: response.status }
                );
            }

            const text = await response.text();

            if (!text || text.trim().length === 0) {
                throw new DataFetchError(
                    ErrorType.PARSE_ERROR,
                    'Empty response received',
                    { url }
                );
            }

            return text;
        } catch (error) {
            if (error instanceof DataFetchError) {
                throw error;
            }
            throw parseError(error);
        } finally {
            clearTimeout(timeoutId);
        }
    }, 2, 1000); // 2 retries with 1 second base delay
}

function transformLink(row: RawLinkRow): Link | null {
    const id = row.id?.trim().toLowerCase();
    const name = row.name?.trim();

    if (!id || !name) {
        return null;
    }

    // Trim and validate icon - empty string should become undefined
    const iconValue = row.icon?.trim().toLowerCase();
    const validIcon = iconValue && iconValue.length > 0 ? iconValue : undefined;

    return {
        id,
        name,
        description: row.description?.trim() || "",
        icon: validIcon,
        category: row.category?.trim().toLowerCase() || "kuliah",
        link: row.link?.trim() || undefined,
        level: parseInt(row.level || "1", 10) || 1,
        active: parseInt(row.active || "0", 10) || 0,
        order: parseInt(row.order || "0", 10) || 0,
    };
}

function transformLevelOneItem(row: RawLevelOneRow): LevelOneItem | null {
    const link_id = row.id?.trim().toLowerCase() || row.link_id?.trim().toLowerCase();
    const title = row.title?.trim();
    const link = row.link?.trim() || "#";

    if (!link_id || !title) {
        return null;
    }

    // Trim and validate icon - empty string should become undefined
    const iconValue = row.icon?.trim().toLowerCase();
    const validIcon = iconValue && iconValue.length > 0 ? iconValue : undefined;

    return {
        link_id,
        title,
        description: row.description?.trim() || undefined,
        link,
        type: row.type?.trim().toLowerCase() || "materi",
        icon: validIcon,
        urutan: parseInt(row.urutan || "0", 10) || 0,
        active: parseInt(row.active || "0", 10) || 0,
    };
}

function transformCategory(row: RawCategoryRow): Category | null {
    const id = row.id?.trim().toLowerCase();
    const title = row.title?.trim();

    if (!id || !title) {
        return null;
    }

    // Trim and validate icon - empty string should become undefined
    const iconValue = row.icon?.trim().toLowerCase();
    const validIcon = iconValue && iconValue.length > 0 ? iconValue : undefined;

    return {
        id,
        title,
        description: row.description?.trim(),
        icon: validIcon,
        order: parseInt(row.order || "0", 10) || 0,
        active: parseInt(row.active || "0", 10) || 0,
    };
}

async function fetchAndParseLinks(): Promise<Link[]> {
    try {
        const csvText = await fetchSheetData(SHEET_URLS.links);

        if (!csvText.includes(',')) {
            console.warn('Invalid CSV format for links, using fallback');
            return getFallbackLinks() as Link[];
        }

        const parsed = Papa.parse<RawLinkRow>(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim().toLowerCase(),
        });

        if (parsed.errors.length > 0) {
            console.warn('CSV parsing warnings:', parsed.errors);
        }

        const links = parsed.data
            .map(transformLink)
            .filter((l): l is Link => l !== null && l.active === 1)
            .sort((a, b) => a.order - b.order);

        if (links.length === 0) {
            console.warn('No valid links found, using fallback');
            return getFallbackLinks() as Link[];
        }

        return links;
    } catch (error) {
        console.error("Error fetching links:", parseError(error));
        return getFallbackLinks() as Link[];
    }
}

async function fetchAndParseLevelOneItems(): Promise<LevelOneItem[]> {
    try {
        // Using SHEET_URLS.level1 as 'level 1' content source
        const csvText = await fetchSheetData(SHEET_URLS.level1);

        const parsed = Papa.parse<RawLevelOneRow>(csvText, {
            header: true,
            skipEmptyLines: true,
        });

        const items = parsed.data
            .map(transformLevelOneItem)
            .filter((item): item is LevelOneItem => item !== null && item.active === 1)
            .sort((a, b) => {
                if (a.urutan !== b.urutan) {
                    return a.urutan - b.urutan;
                }
                // Secondary sort by type (materi first, tugas last etc if needed, or just keep stable)
                return 0;
            });

        return items;
    } catch (error) {
        console.error("Error fetching level 1 items:", error);
        return [];
    }
}

async function fetchAndParseCategories(): Promise<Category[]> {
    try {
        const csvText = await fetchSheetData(SHEET_URLS.categories);

        if (!csvText.includes(',')) {
            console.warn('Invalid CSV format for categories, using fallback');
            return getFallbackCategories();
        }

        const parsed = Papa.parse<RawCategoryRow>(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim().toLowerCase(),
        });

        if (parsed.errors.length > 0) {
            console.warn('CSV parsing warnings:', parsed.errors);
        }

        const categories = parsed.data
            .map(transformCategory)
            .filter((c): c is Category => c !== null && c.active === 1)
            .sort((a, b) => a.order - b.order);

        if (categories.length === 0) {
            console.warn('No valid categories found, using fallback');
            return getFallbackCategories();
        }

        return categories;
    } catch (error) {
        console.error("Error fetching categories:", parseError(error));
        return getFallbackCategories();
    }
}

// Cache with expiration time
interface CachedData {
    data: Promise<AppData>;
    timestamp: number;
}

const appDataCache: { cached: CachedData | null } = { cached: null };

// Cache duration: 5 minutes (matches ISR expiration)
const CACHE_DURATION_MS = 5 * 60 * 1000; // 300,000ms = 5 minutes

export const getAppData = async (): Promise<AppData> => {
    const isDev = import.meta.env.DEV;
    const now = Date.now();

    // In development, skip cache for instant updates
    if (isDev) {
        return fetchFreshData();
    }

    // In production, use time-based cache
    if (appDataCache.cached) {
        const age = now - appDataCache.cached.timestamp;

        // Return cached data if still fresh (< 5 minutes old)
        if (age < CACHE_DURATION_MS) {
            return appDataCache.cached.data;
        }

        // Cache expired, log for debugging
        console.log(`[Data Cache] Expired (age: ${Math.round(age / 1000)}s), fetching fresh data`);
    }

    // Fetch fresh data and cache it
    const dataPromise = fetchFreshData();
    appDataCache.cached = {
        data: dataPromise,
        timestamp: now,
    };

    return dataPromise;
};

// Helper function to fetch fresh data
async function fetchFreshData(): Promise<AppData> {
    const [links, levelOneItems, categories] = await Promise.all([
        fetchAndParseLinks(),
        fetchAndParseLevelOneItems(),
        fetchAndParseCategories(),
    ]);

    return {
        links,
        levelOneItems,
        categories,
        lastUpdated: new Date().toISOString(),
    };
}

export async function getLinkById(id: string): Promise<Link | undefined> {
    const { links } = await getAppData();
    return links.find((l) => l.id === id.toLowerCase());
}

export async function getLevelOneItemsByLink(linkId: string): Promise<LevelOneItem[]> {
    const { levelOneItems } = await getAppData();
    return levelOneItems.filter((item) => item.link_id === linkId.toLowerCase());
}

export async function getAllLinks(): Promise<Link[]> {
    const { links } = await getAppData();
    return links;
}

export async function getCategories(): Promise<Category[]> {
    const { categories } = await getAppData();
    return categories;
}
