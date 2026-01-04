import { getTemplate } from './templates';

export interface FormData {
    assignmentType: string;
    subject: string;
    topic: string;
    templateStyle: 'standard' | 'detailed';
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

            // Informatika / CS / Engineering
            if (/informatika|sistem informasi|pemrograman|database|jaringan|software|ai|machine learning|data science|algoritma|basis data|teknik|engineering|elektro|mesin|sibil|arsitektur/.test(s)) {
                return '\n**Konteks Disiplin:** Sertakan diagram teknis (flowchart/UML/ERD/Blueprints) jika relevan. Referensikan standar industri (IEEE/ACM/ISO/SNI) dan teknologi spesifik.';
            }
            // --- HYBRID / SPECIALIZED BUSINESS COURSES ---

            // Business Cloud Computing
            if (/cloud|komputasi awan|aws|azure|gcp|saas|paas|iaas|serverless/.test(s)) {
                return '\n**Konteks Disiplin (Business Cloud):** Fokus pada Cost Benefit Analysis (CBA), model layanan (SaaS/PaaS), dan strategi skalabilitas bisnis. Jangan terlalu teknis pada konfigurasi server/coding.';
            }

            // Metodologi Penelitian Bisnis
            if (/metodologi|metpen|riset|penelitian|skripsi|tugas akhir|metode survei|sem|spss|pls/.test(s)) {
                return '\n**Konteks Disiplin (Riset Bisnis):** Tentukan jenis data (Primer/Sekunder). Gunakan metode analisis yang relevan (Statistik/Kualitatif) sesuai pertanyaan riset. Validasi hipotesis (jika ada) adalah kunci.';
            }

            // 1. Digital Marketing & Branding
            if (/marketing|pemasaran|branding|seo|social media|konten|copywriting|ads|iklan|perilaku konsumen/.test(s)) {
                return '\n**Konteks Disiplin (Digital Marketing):** Gunakan framework AIDA/AISAS, analisis STP (Segmenting, Targeting, Positioning), dan metrics digital (CTR, Conversion Rate, CAC/LTV).';
            }

            // 2. Fintech & Keuangan
            if (/fintech|keuangan|akuntansi|crypto|blockchain|saham|investasi|bank|moneter|fiskal|paylater|pinjol/.test(s)) {
                return '\n**Konteks Disiplin (Fintech/Finance):** Sertakan analisis risiko finansial, regulasi OJK/BI, dan data laporan keuangan. Gunakan rasio keuangan (ROI, ROE) sebagai bukti.';
            }

            // 3. Startup & Manajemen Produk
            if (/startup|produk|product management|agile|scrum|mvp|inovasi|bisnis model|business model|kewirausahaan|entrepreneur/.test(s)) {
                return '\n**Konteks Disiplin (Startup/Product):** Gunakan metodologi Lean Startup, Business Model Canvas (BMC), dan Value Proposition Canvas. Fokus pada validasi pasar dan User Persona.';
            }

            // 4. Hukum Bisnis & Etika Digital
            if (/hukum|law|legal|etika|cyber|ite|privasi|data protection|hak cipta|haki|regulasi/.test(s)) {
                return '\n**Konteks Disiplin (Hukum & Etika):** Referensikan UU ITE, PP Perdagangan Elektronik (PMSE), dan etika bisnis digital. Analisis dari sudut pandang kepatuhan (compliance).';
            }

            // 5. E-Commerce & Platform Strategy
            if (/e-commerce|marketplace|platform|logistik|supply chain|omnichannel|ritel|toko online/.test(s)) {
                return '\n**Konteks Disiplin (E-Commerce):** Fokus pada ekosistem platform, Customer Journey Map, dan strategi logistik/operasional. Sertakan tren pasar e-commerce terkini.';
            }

            // 6. General Business/Management (Fallback)
            if (/manajemen|bisnis|administrasi|organisasi|kepemimpinan|leadership|strategi|operasional/.test(s)) {
                return '\n**Konteks Disiplin (Manajemen Umum):** Gunakan analisis SWOT, PESTLE, atau Porter\'s Five Forces. Fokus pada implikasi manajerial dan pengambilan keputusan strategis.';
            }
            // Hukum / Law
            if (/hukum|pidana|perdata|tata negara|law|legal|advokasi/.test(s)) {
                return '\n**Konteks Disiplin:** Wajib menyertakan dasar hukum positif (UU, PERPU, Putusan Pengadilan) yang relevan. Gunakan interpretasi yuridis yang ketat.';
            }
            // Psikologi / Kesehatan / Kedokteran
            if (/psikologi|kesehatan|kedokteran|keperawatan|farmasi|gizi|konseling|klinis/.test(s)) {
                return '\n**Konteks Disiplin:** Gunakan pedoman etika medis/psikologis. Referensikan panduan klinis terbaru (WHO/Kemenkes) atau manual diagnostik (DSM/ICD) jika relevan.';
            }
            // Komunikasi / Soshum / Politik
            if (/komunikasi|sosiologi|politik|hubungan internasional|antropologi|jurnalistik|humas|public relation/.test(s)) {
                return '\n**Konteks Disiplin:** Fokus pada analisis wacana, teori sosial, atau dinamika geopolitik. Gunakan perspektif kritis dan multidisipliner.';
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

        // --- Specifications Generation Logic ---
        let specificationsSection = '';
        const specs: string[] = [];

        // Determine if we should include Citation Style
        const showCitation = citationStyle && citationStyle !== 'None';
        const showConcepts = keyConcepts && keyConcepts.trim().length > 0;

        // Standard/Detailed Format: **Spesifikasi:** header + bullet points
        if (showCitation) specs.push(`- Gaya sitasi: ${citationStyle}`);
        if (showConcepts) specs.push(`- Konsep kunci: ${formattedConcepts}`);

        // Build section only if there are items
        if (specs.length > 0) {
            specificationsSection = `\n**Spesifikasi:**\n${specs.join('\n')}\n`;
        }

        // Replace placeholders
        let prompt = template
            .replace(/{assignmentType}/g, assignmentType)
            .replace(/{subject}/g, subject || '*[Mata Kuliah]*')
            .replace(/{topic}/g, topic || '*[Topik]*')
            .replace(/{difficultyInstruction}/g, difficultyInstruction)
            .replace(/{disciplineHint}/g, disciplineHint)
            .replace(/{specifications}/g, specificationsSection) // Replaces unified placeholder
            .replace(/{specificRequirements}/g, requirementsContent)
            .replace(/{memberCount}/g, memberCount?.toString() || '0')
            .replace(/{additionalInstructions}/g, instructionsContent)
            .replace(/{teamChallenges}/g, challengesContent);

        // Clean up remaining placeholders (just in case)
        prompt = prompt.replace(/{citationStyle}/g, '')
            .replace(/{keyConcepts}/g, '');

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
