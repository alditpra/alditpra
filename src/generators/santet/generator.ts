import { getTemplate } from './templates';

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
        (this.formData as any)[field] = value;
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

        // Conditional Spesifikasi Section - only include filled fields
        const specItems: string[] = [];
        if (citationStyle && citationStyle !== 'None') {
            specItems.push(`- Gaya sitasi: ${citationStyle}`);
        }
        if (keyConcepts && keyConcepts.trim().length > 0) {
            specItems.push(`- Konsep kunci: ${formattedConcepts}`);
        }

        // Build specifications section only if there are items
        const specificationsSection = specItems.length > 0
            ? `\n**Spesifikasi:**\n${specItems.join('\n')}\n`
            : '';

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

        // Discipline-Specific Hints (based on subject/mata kuliah)
        const getDisciplineHint = (subjectText: string): string => {
            const s = subjectText.toLowerCase();

            // Informatika / Sistem Informasi
            if (/informatika|sistem informasi|pemrograman|database|jaringan|software|ai|machine learning|data science|algoritma|basis data/.test(s)) {
                return '\n**Konteks Disiplin:** Sertakan diagram teknis (flowchart/UML/ERD) jika relevan. Referensikan standar IEEE/ACM dan teknologi spesifik yang digunakan.';
            }
            // Bisnis Digital / E-Commerce
            if (/bisnis digital|e-commerce|digital marketing|startup|platform digital|fintech|marketplace/.test(s)) {
                return '\n**Konteks Disiplin:** Gunakan framework bisnis (Business Model Canvas, Value Proposition) dan metrics digital (CAC, LTV, conversion rate) jika applicable.';
            }
            // Manajemen
            if (/manajemen|sdm|hrm|human resource|operasional|strategis|organisasi|leadership|msdm|pemasaran|marketing/.test(s)) {
                return '\n**Konteks Disiplin:** Gunakan framework analisis (SWOT, Porter\'s Five Forces, PESTLE) dan sertakan implikasi manajerial yang actionable.';
            }
            // Ekonomi
            if (/ekonomi|makroekonomi|mikroekonomi|fiskal|moneter|perdagangan|keuangan|akuntansi|perbankan/.test(s)) {
                return '\n**Konteks Disiplin:** Sertakan data dari sumber resmi (BPS, World Bank, Bank Indonesia) dan grafik ekonomi jika relevan untuk memperkuat argumen.';
            }

            return ''; // No specific hint for unknown disciplines
        };
        const disciplineHint = getDisciplineHint(subject);

        // Difficulty Level Mapping
        const difficultyMap: Record<string, string> = {
            'Very Easy': "Level: Sekolah Menengah Atas (SMA). Gunakan bahasa yang mudah dipahami, jelaskan konsep dasar secara eksplisit, hindari jargon akademik berat.",
            'Easy': "Level: Mahasiswa Tahun Pertama (Semester 1-2). Fokus pada pengantar materi dan pemahaman konsep dasar.",
            'Medium': "Level: Mahasiswa Menengah (Semester 3-5). Standar akademik umum, mulai analitis, gunakan referensi jurnal.",
            'Hard': "Level: Mahasiswa Tingkat Akhir (Semester 6+). Standar skripsi/tugas akhir, analitis dan argumentatif, metodologi jelas.",
            'Very Hard': "Level: Cari Tantangan. Gunakan metode/tools GUI yang advanced (misal: framework analysis, software visualization, methodology tools canggih). Fokus pada kedalaman analisis dan pendekatan inovatif.",
            'Extreme': "Level: Penasaran & Eksploratif. WAJIB melibatkan: (1) Layanan/API cloud (AWS, GCP, Azure, atau API publik), (2) Implementasi coding/scripting, (3) Automasi atau integrasi sistem. Cocok untuk proyek eksperimen teknis."
        };
        const difficultyInstruction = difficultyMap[difficultyLevel] || difficultyMap['Medium'];

        // Replace placeholders
        let prompt = template
            .replace(/{assignmentType}/g, assignmentType)
            .replace(/{subject}/g, subject || '*[Mata Kuliah]*')
            .replace(/{topic}/g, topic || '*[Topik]*')
            .replace(/{difficultyInstruction}/g, difficultyInstruction)
            .replace(/{disciplineHint}/g, disciplineHint)
            .replace(/{citationStyle}/g, citationStyle)
            .replace(/{keyConcepts}/g, formattedConcepts)
            .replace(/{specificRequirements}/g, requirementsContent)
            .replace(/{memberCount}/g, memberCount?.toString() || '0')
            .replace(/{additionalInstructions}/g, instructionsContent)
            .replace(/{teamChallenges}/g, challengesContent);

        // Remove hardcoded Spesifikasi section and replace with conditional one
        // Match pattern: **Spesifikasi:** followed by lines starting with - until next section or empty line
        prompt = prompt.replace(/\*\*Spesifikasi:\*\*\n(- [^\n]+\n?)+/g, specificationsSection);

        // Clean up any remaining empty placeholders
        prompt = prompt.replace(/\{\w+\}/g, '');

        // Clean up multiple consecutive empty lines
        prompt = prompt.replace(/\n{3,}/g, '\n\n');

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
            difficultyLevel: 'Medium',
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
