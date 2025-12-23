/**
 * SlotAnimator - Core logic for student selection with Fair Mode and history tracking
 */

import { saveStudents, saveFairModeState, loadStudents, loadFairModeState } from './storage';

export interface HistoryEntry {
    name: string;
    timestamp: Date;
    selectionNumber: number;
    status: 'confirmed' | 'skipped';
}

export interface AnimatorOptions {
    speed?: 'fast' | 'normal' | 'slow';
    fairMode?: boolean;
}

export class SlotAnimator {
    private students: string[] = [];
    private animationSpeed: 'fast' | 'normal' | 'slow' = 'normal';
    private fairMode: boolean = false;
    private excludedStudents: Set<string> = new Set();
    private confirmedHistory: HistoryEntry[] = [];
    private currentSelection: string | null = null;

    constructor(students: string[], options?: AnimatorOptions) {
        this.students = students;
        if (options?.speed) this.animationSpeed = options.speed;
        if (options?.fairMode !== undefined) this.fairMode = options.fairMode;

        // Save students to localStorage
        if (students.length > 0) {
            saveStudents(students);
        }
    }

    // Static method to create animator from localStorage
    static fromStorage(options?: AnimatorOptions): SlotAnimator | null {
        const savedData = loadStudents();
        if (!savedData) return null;

        const animator = new SlotAnimator(savedData.students, options);

        // Restore fair mode state
        const fairModeState = loadFairModeState();
        if (fairModeState) {
            if (fairModeState.fairModeEnabled) {
                animator.enableFairMode();
            }
            fairModeState.excludedStudents.forEach(student => {
                animator.excludedStudents.add(student);
            });
        }

        return animator;
    }

    // Core selection with improved randomness
    selectRandom(): string {
        const available = this.getAvailableStudents();

        if (available.length === 0) {
            throw new Error('No students available for selection');
        }

        // Use crypto.getRandomValues for better entropy ifavailable, fallback to Math.random with timestamp
        let randomValue: number;

        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            // Add timestamp for extra entropy
            const timestamp = Date.now() % 1000;
            randomValue = (array[0] + timestamp) / (0xFFFFFFFF + 1);
        } else {
            // Fallback: Math.random with timestamp mixing
            const timestamp = Date.now();
            randomValue = (Math.random() * timestamp) % 1;
        }

        const randomIndex = Math.floor(randomValue * available.length);
        this.currentSelection = available[randomIndex];
        return this.currentSelection;
    }

    // Helper to add to history
    private addToHistory(name: string, status: 'confirmed' | 'skipped'): void {
        const selectionNumber = this.confirmedHistory.length + 1;
        this.confirmedHistory.push({
            name,
            timestamp: new Date(),
            selectionNumber,
            status
        });
    }

    // Confirmation management
    confirmSelection(): void {
        if (!this.currentSelection) return;

        this.addToHistory(this.currentSelection, 'confirmed');

        if (this.fairMode) {
            this.excludedStudents.add(this.currentSelection);
            this.saveState(); // Save state after excluding
        }

        this.currentSelection = null;
    }

    skipSelection(): void {
        if (!this.currentSelection) return;

        this.addToHistory(this.currentSelection, 'skipped');

        if (this.fairMode) {
            this.excludedStudents.add(this.currentSelection);
            this.saveState(); // Save state after excluding
            console.log(`[Fair Mode] Excluded: ${this.currentSelection}, Remaining: ${this.getRemainingCount()}`);
        } else {
            console.log(`[Skip] Fair Mode OFF - ${this.currentSelection} will be available again`);
        }

        this.currentSelection = null;
    }

    // Fair Mode management
    enableFairMode(): void {
        this.fairMode = true;
        this.saveState();
    }

    disableFairMode(): void {
        this.fairMode = false;
        this.saveState();
    }

    isFairModeActive(): boolean {
        return this.fairMode;
    }

    isFairModeEnabled(): boolean {
        return this.fairMode;
    }

    getAvailableStudents(): string[] {
        if (!this.fairMode) {
            return this.students;
        }
        return this.students.filter(student => !this.excludedStudents.has(student));
    }

    getRemainingCount(): number {
        return this.getAvailableStudents().length;
    }

    isPoolExhausted(): boolean {
        return this.fairMode && this.getRemainingCount() === 0;
    }

    resetFairMode(): void {
        this.excludedStudents.clear();
        this.saveState();
    }

    // Save current state to localStorage
    private saveState(): void {
        saveFairModeState(Array.from(this.excludedStudents), this.fairMode);
    }

    // History management
    getConfirmedHistory(): HistoryEntry[] {
        return [...this.confirmedHistory];
    }

    getHistoryCount(): number {
        return this.confirmedHistory.length;
    }

    clearHistory(): void {
        this.confirmedHistory = [];
        this.excludedStudents.clear();
    }

    // Utility
    setSpeed(speed: 'fast' | 'normal' | 'slow'): void {
        this.animationSpeed = speed;
    }

    getSpeedDuration(): number {
        switch (this.animationSpeed) {
            case 'fast': return 3000;
            case 'slow': return 7000;
            default: return 5000;
        }
    }

    updateStudents(students: string[]): void {
        this.students = students;
        // Clear excluded students that are no longer in the list
        this.excludedStudents = new Set(
            [...this.excludedStudents].filter(student => students.includes(student))
        );
    }

    getCurrentSelection(): string | null {
        return this.currentSelection;
    }

    getTotalStudents(): number {
        return this.students.length;
    }
}
