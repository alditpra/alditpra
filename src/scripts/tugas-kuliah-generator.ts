import { getTemplate } from './tugas-kuliah-templates';

export interface FormData {
    assignmentType: string;
    subject: string;
    topic: string;
    templateStyle: 'standard' | 'detailed' | 'concise';
    difficultyLevel: string;
    citationStyle: string;
    keyConcepts: string;
    specificRequirements: string;
    isGroup: boolean;
    memberCount?: number;
    teamChallenges?: string[];
    additionalInstructions?: string;
}

export class PromptGenerator {
    private formData: Partial<FormData> = {};

    constructor(initialData: Partial<FormData> = {}) {
        this.formData = {
            templateStyle: 'standard',
            difficultyLevel: 'Medium',
            citationStyle: 'None',
            isGroup: false,
            ...initialData
        };
    }

    // Update form data
    updateField(field: keyof FormData, value: any) {
        this.formData[field] = value;
    }

    // Update multiple fields at once
    updateMultipleFields(data: Partial<FormData>) {
        this.formData = { ...this.formData, ...data };
    }

    // Generate prompt from current form data
    generatePrompt(): string {
        const {
            assignmentType = 'Essay',
            subject = '',
            topic = '',
            templateStyle = 'standard',
            difficultyLevel = 'Medium',
            citationStyle = 'None',
            keyConcepts = '',
            specificRequirements = '',
            isGroup = false,
            memberCount = 0,
            teamChallenges = [],
            additionalInstructions = ''
        } = this.formData;

        // Get appropriate template
        const template = getTemplate(assignmentType, isGroup, templateStyle);

        // Smart Formatting: Key Concepts (Auto-bullet points)
        let formattedConcepts = keyConcepts;
        if (keyConcepts.includes(',')) {
            const concepts = keyConcepts.split(',').map(c => c.trim()).filter(c => c.length > 0);
            if (concepts.length > 1) {
                formattedConcepts = '\n' + concepts.map(c => `- ${c}`).join('\n');
            }
        }

        // Conditional Formatting: Headers for optional sections
        const requirementsContent = specificRequirements
            ? `\n**Requirements khusus:**\n${specificRequirements}`
            : '';

        const instructionsContent = additionalInstructions
            ? `\n**Instruksi Tambahan:**\n${additionalInstructions}`
            : '';

        // Conditional Formatting: Team Challenges for group assignments
        let challengesContent = '';
        if (isGroup && teamChallenges && teamChallenges.length > 0) {
            const list = teamChallenges.map(c => `- ${c}`).join('\n');
            challengesContent = `**Tantangan yang Dihadapi:**\n${list}`;
        }

        // Difficulty Level Mapping
        const difficultyMap: Record<string, string> = {
            'Very Easy': "Level: Sekolah Menengah Atas (SMA). Gunakan bahasa yang mudah dipahami, jelaskan konsep dasar secara eksplisit, hindari jargon akademik berat.",
            'Easy': "Level: Mahasiswa Tahun Pertama (D3/S1 Awal). Fokus pada pengantar materi dan pemahaman konsep.",
            'Medium': "Level: Mahasiswa Tingkat Akhir (S1). Standar akademik skripsi, analitis, dan argumentatif.",
            'Hard': "Level: Magister (S2). Analisis kritis, sintesis teori kompleks, dan orisinalitas ide.",
            'Very Hard': "Level: Doktoral (S3). Kontribusi kebaruan (novelty), filosofis, metodologi sangat ketat, dan standar publikasi jurnal Q1."
        };
        const difficultyInstruction = difficultyMap[difficultyLevel] || difficultyMap['Medium'];

        // Replace placeholders
        let prompt = template
            .replace(/{assignmentType}/g, assignmentType)
            .replace(/{subject}/g, subject || '*[Mata Kuliah]*')
            .replace(/{topic}/g, topic || '*[Topik]*')
            .replace(/{difficultyInstruction}/g, difficultyInstruction)
            .replace(/{citationStyle}/g, citationStyle)
            .replace(/{keyConcepts}/g, formattedConcepts)
            .replace(/{specificRequirements}/g, requirementsContent)
            .replace(/{memberCount}/g, memberCount?.toString() || '0')
            .replace(/{additionalInstructions}/g, instructionsContent)
            .replace(/{teamChallenges}/g, challengesContent);

        // Clean up any remaining empty placeholders
        prompt = prompt.replace(/\{\w+\}/g, '');

        return prompt.trim();
    }

    // Calculate prompt quality score (0-100)
    calculateQuality(): number {
        let score = 0;

        // Required fields (60 points total)
        if (this.formData.assignmentType) score += 15;
        if (this.formData.subject && this.formData.subject.length > 2) score += 15;
        if (this.formData.topic && this.formData.topic.length > 10) score += 30;

        // Optional fields (30 points total)
        if (this.formData.citationStyle && this.formData.citationStyle !== 'None') score += 7;
        // Tone removed, redistributed points
        if (this.formData.keyConcepts && this.formData.keyConcepts.length > 5) score += 15; // Increased weight for concepts
        if (this.formData.specificRequirements && this.formData.specificRequirements.length > 10) score += 8;

        // Field richness (10 points total)
        const topicLength = this.formData.topic?.length || 0;
        if (topicLength > 50) score += 5;
        else if (topicLength > 20) score += 3;

        const conceptsLength = this.formData.keyConcepts?.length || 0;
        if (conceptsLength > 30) score += 5;
        else if (conceptsLength > 10) score += 3;

        return Math.min(100, Math.round(score));
    }

    // Get quality suggestion
    getQualitySuggestion(): string {
        const score = this.calculateQuality();

        if (score < 50) {
            return '⚠️ Isi lebih banyak kolom untuk meningkatkan kualitas prompt';
        } else if (score >= 50 && score < 80) {
            const missing = [];
            if (!this.formData.keyConcepts || this.formData.keyConcepts.length < 5) {
                missing.push('Konsep Kunci');
            }
            if (!this.formData.citationStyle || this.formData.citationStyle === 'None') {
                missing.push('Gaya Sitasi');
            }

            if (missing.length > 0) {
                return `💡 Coba tambahkan ${missing.join(', ')} untuk hasil lebih baik`;
            }
            return '💡 Tambahkan detail lebih banyak untuk hasil optimal';
        } else if (score >= 80 && score < 95) {
            if (!this.formData.specificRequirements || this.formData.specificRequirements.length < 10) {
                return '✨ Bagus! Tambahkan Requirements Khusus agar sempurna';
            }
            return '✨ Kualitas prompt sangat bagus!';
        } else {
            return '🎉 Kualitas prompt sempurna!';
        }
    }

    // Format prompt with markdown-like styling
    formatPromptForDisplay(prompt: string): string {
        // Bold section headers
        let formatted = prompt.replace(/\*\*([^*]+):\*\*/g, '<strong>$1:</strong>');

        // Italic for placeholders in brackets
        formatted = formatted.replace(/\*\[([^\]]+)\]\*/g, '<em>[$1]</em>');

        // Preserve line breaks
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    }

    // Reset to default state
    reset() {
        this.formData = {
            templateStyle: 'standard',
            citationStyle: 'None',
            isGroup: false
        };
    }

    // Get current form data
    getFormData(): Partial<FormData> {
        return { ...this.formData };
    }
}

// Debounce helper for performance
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
