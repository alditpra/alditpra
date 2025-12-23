/**
 * localStorage utility for SLOT application
 * Handles persistence of student data and fair mode state
 */

const STORAGE_KEYS = {
    STUDENTS: 'slot-students',
    EXCLUDED: 'slot-excluded',
    FAIR_MODE: 'slot-fair-mode',
    LAST_UPLOAD: 'slot-last-upload',
} as const;

export interface StoredStudentData {
    students: string[];
    uploadedAt: string;
    fileName?: string;
}

export interface StoredFairModeState {
    excludedStudents: string[];
    fairModeEnabled: boolean;
}

/**
 * Save student list to localStorage
 */
export function saveStudents(students: string[], fileName?: string): void {
    try {
        const data: StoredStudentData = {
            students,
            uploadedAt: new Date().toISOString(),
            fileName,
        };
        localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save students to localStorage:', error);
    }
}

/**
 * Load student list from localStorage
 */
export function loadStudents(): StoredStudentData | null {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
        if (!data) return null;
        return JSON.parse(data) as StoredStudentData;
    } catch (error) {
        console.error('Failed to load students from localStorage:', error);
        return null;
    }
}

/**
 * Save fair mode state to localStorage
 */
export function saveFairModeState(excludedStudents: string[], fairModeEnabled: boolean): void {
    try {
        const data: StoredFairModeState = {
            excludedStudents,
            fairModeEnabled,
        };
        localStorage.setItem(STORAGE_KEYS.EXCLUDED, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save fair mode state:', error);
    }
}

/**
 * Load fair mode state from localStorage
 */
export function loadFairModeState(): StoredFairModeState | null {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.EXCLUDED);
        if (!data) return null;
        return JSON.parse(data) as StoredFairModeState;
    } catch (error) {
        console.error('Failed to load fair mode state:', error);
        return null;
    }
}

/**
 * Clear all SLOT data from localStorage
 */
export function clearAllData(): void {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    } catch (error) {
        console.error('Failed to clear localStorage:', error);
    }
}

/**
 * Check if there is saved data
 */
export function hasSavedData(): boolean {
    return localStorage.getItem(STORAGE_KEYS.STUDENTS) !== null;
}
