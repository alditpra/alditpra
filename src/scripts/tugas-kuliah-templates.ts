// Prompt Template Interface
export interface PromptTemplate {
   id: string;
   name: string;
   variations: {
      standard: string;
      detailed: string;
      concise: string;
   };
}

// Helper: Common instructions across templates
const commonrefs = `\n**Referensi:**\nTuliskan 5-7 link referensi valid yang relevan dengan topik "{topic}" dalam bentuk URL saja (jurnal akademik, artikel ilmiah, atau sumber terpercaya).`;
const detailedRefs = `\n**Referensi:**\nTuliskan 7-10 link referensi valid yang relevan dengan topik "{topic}" dalam bentuk URL saja, prioritaskan:\n- Jurnal akademik peer-reviewed (minimal 5)\n- Artikel ilmiah dari universitas terkemuka\n- Data atau report dari institusi resmi`;

const baseContext = "Bertindaklah sebagai penulis akademik profesional dengan gaya bahasa Akademis & Formal. {difficultyInstruction}";

// Individual Assignment Templates
export const individualTemplates: Record<string, PromptTemplate> = {
   essay: {
      id: 'essay',
      name: 'Essay',
      variations: {
         standard: `${baseContext} Saya perlu bantuan menyusun Essay akademik tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan:**
1. Struktur outline yang jelas (pendahuluan, isi, kesimpulan)
2. Poin-poin argumen utama yang kuat dengan supporting evidence
3. Tips untuk membuat argumen yang kohesif dan logical flow
4. Saran metodologi penulisan yang efektif

{additionalInstructions}
${commonrefs}

Bantu saya membuat kerangka yang terstruktur dan komprehensif.`,

         detailed: `${baseContext} Saya perlu bantuan menyusun Essay akademik yang mendalam tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan dengan detail lengkap:**

1. **Struktur Outline Lengkap**:
   - Pendahuluan: Latar belakang (hook), rumusan masalah, thesis statement
   - Isi: 3-5 sub-bab dengan poin argumen spesifik
   - Kesimpulan: Sintesis argumen dan implikasi

2. **Argumen Utama & Analisis**:
   - Minimal 4-5 poin argumen dengan supporting evidence dari jurnal
   - Counter-argument dan rebuttal untuk memperkuat analisis
   - Integrasi data atau teori yang relevan

3. **Metodologi Penulisan**:
   - Framework analisis yang cocok (misal: SWOT, PESTLE, dll jika relevan)
   - Tips transisi antar paragraf (signposting)

4. **Kriteria Kualitas**:
   - Checklist koherensi dan kohesi
   - Common pitfalls dalam topik ini

{additionalInstructions}
${detailedRefs}

Bantu saya membuat kerangka yang sangat terstruktur, komprehensif, dan detail.`,

         concise: `Buat outline Essay tentang "{topic}" untuk {subject}.
Gaya Sitasi: {citationStyle}
Konsep Kunci: {keyConcepts}

{specificRequirements}

**Need:**
1. Outline struktur (intro, body, conclusion)
2. 3 Argumen utama dengan brief evidence
3. 5 referensi akademik valid

{additionalInstructions}`
      }
   },

   presentation: {
      id: 'presentation',
      name: 'Presentation',
      variations: {
         standard: `${baseContext} Saya perlu bantuan menyusun Presentasi akademik tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan:**
1. Struktur slide yang logis (Title, Agenda, Problem, Analysis, Solution, Conclusion)
2. Poin-poin kunci per slide (bullet points yang ringkas)
3. Speaker notes atau naskah presentasi singkat untuk setiap slide
4. Ide visualisasi data atau diagram untuk memperjelas poin

{additionalInstructions}
${commonrefs}

Bantu saya membuat materi presentasi yang menarik dan informatif.`,

         detailed: `${baseContext} Saya perlu bantuan menyusun Presentasi akademik yang komprehensif tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan dengan detail:**

1. **Slide Structure & Content**:
   - 10-15 slide outline dengan judul spesifik
   - Konten slide (maksimal 5 bullet point per slide)
   - Key visual elements recommendation (grafik, icon, gambar)

2. **Speaker Notes & Delivery**:
   - Script narasi detail untuk setiap slide
   - Patokan durasi per slide (asumsi total 15 menit)
   - Pertanyaan antisipasi dari audiens/dosen (Q&A prep)

3. **Engagement Strategy**:
   - Hook pembuka yang menarik
   - Call to action atau closing statement yang kuat

{additionalInstructions}
${detailedRefs}

Fokus pada kejelasan komunikasi visual dan verbal.`,

         concise: `Buat struktur Presentasi (Slide Deck) tentang "{topic}" ({subject}).
Konsep: {keyConcepts}

{specificRequirements}

**Need:**
1. Outline 7-10 slide
2. Poin utama per slide
3. Ide visual singkat
4. 5 referensi valid

{additionalInstructions}`
      }
   },

   case_study: {
      id: 'case_study',
      name: 'Case Study',
      variations: {
         standard: `${baseContext} Saya perlu bantuan menganalisis Studi Kasus tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan:**
1. Identifikasi masalah utama (Problem Statement)
2. Analisis situasi saat ini (menggunakan data/fakta)
3. Identifikasi alternatif solusi/strategi
4. Rekomendasi solusi terbaik dengan justifikasi
5. Rencana implementasi singkat

{additionalInstructions}
${commonrefs}

Gunakan pendekatan analitis dan berbasis bukti.`,

         detailed: `${baseContext} Saya membutuhkan analisis Studi Kasus mendalam tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan dengan detail:**

1. **Executive Summary**: Rangkuman masalah dan rekomendasi.
2. **Diagnosis Masalah**:
   - Root cause analysis (misal: 5 Whys, Fishbone)
   - Analisis dampak stakeholder
3. **Analisis Alternatif**:
   - Evaluasi pros/cons minimal 3 opsi solusi
   - Analisis risiko untuk setiap opsi
4. **Rekomendasi & Justifikasi**:
   - Solusi terpilih dengan landasan teori
   - Value proposition dari solusi tersebut
5. **Implementation Plan**:
   - Timeline jangka pendek & panjang
   - Kebutuhan sumber daya

{additionalInstructions}
${detailedRefs}

Berikan analisis yang tajam, kritis, dan solutif.`,

         concise: `Analisis Case Study: "{topic}" ({subject}).
Konsep: {keyConcepts}

{specificRequirements}

**Need:**
1. Problem Statement
2. Analisis 3 Alternatif Solusi
3. Rekomendasi Final
4. 5 Referensi pendukung

{additionalInstructions}`
      }
   },

   analysis: {
      id: 'analysis',
      name: 'Analysis',
      variations: {
         standard: `${baseContext} Saya perlu menyusun Paper Analisis tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan:**
1. Kerangka teoritis yang relevan untuk analisis
2. Analisis data/fenomena menggunakan teori tersebut
3. Interpretasi hasil (implikasi dan makna)
4. Diskusi kritis mengenai keterbatasan analisis

{additionalInstructions}
${commonrefs}

Fokus pada kedalaman analisis dan ketajaman argumen.`,

         detailed: `${baseContext} Saya perlu menyusun Paper Analisis Kritis (Critical Analysis) tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan dengan detail:**
1. **Critical Review**: Evaluasi literatur atau teori yang ada (gaps, contradictions).
2. **Methodology**: Pendekatan analisis yang digunakan (kualitatif/kuantitatif/komparatif).
3. **Deep Dive Analysis**:
   - Dekonstruksi argumen/fenomena
   - Evaluasi validitas dan bias
   - Sintesis perspektif berbeda
4. **Implikasi**: Dampak teoritis dan praktis dari temuan.

{additionalInstructions}
${detailedRefs}

Pastikan analisis bersifat objektif dan didukung bukti kuat.`,

         concise: `Outline Paper Analisis: "{topic}" ({subject}).
Konsep: {keyConcepts}

{specificRequirements}

**Need:**
1. Framework analisis
2. Poin-poin analisis utama
3. Kesimpulan kritis
4. 5 Referensi

{additionalInstructions}`
      }
   },

   review: {
      id: 'review',
      name: 'Review',
      variations: {
         standard: `${baseContext} Saya perlu membuat Review (Literature/Book/Article Review) tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan:**
1. Ringkasan objektif dari karya yang direview
2. Evaluasi kekuatan dan kelemahan
3. Perbandingan dengan karya lain yang sejenis
4. Kesimpulan mengenai kontribusi karya tersebut

{additionalInstructions}
${commonrefs}
`,
         detailed: `${baseContext} Saya perlu membuat Critical Review mendalam tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan dengan detail:**
1. **Context**: Penempatan karya dalam diskursus akademik yang lebih luas.
2. **Summary**: Sinopsis komprehensif argumen utama penulis.
3. **Critical Evaluation**:
   - Metodologi yang digunakan penulis
   - Koherensi argumen
   - Penggunaan bukti
4. **Synthesis**: Hubungan dengan teori/karya lain.
5. **Verdict**: Rekomendasi pembaca dan signifikansi karya.

{additionalInstructions}
${detailedRefs}
`,
         concise: `Outline Review: "{topic}" ({subject}).
Konsep: {keyConcepts}

{specificRequirements}

**Need:**
1. Summary singkat
2. 3 Poin Kekuatan & Kelemahan
3. Kesimpulan/Opini
4. 5 Referensi pembanding

{additionalInstructions}`
      }
   },

   report: {
      id: 'report',
      name: 'Report',
      variations: {
         standard: `${baseContext} Saya perlu bantuan menyusun Laporan (Report) tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan:**
1. Struktur report yang sistematis (executive summary, pendahuluan, temuan, rekomendasi)
2. Framework penyajian data/fakta
3. Kesimpulan yang ditarik dari fakta
4. Rekomendasi praktis (actionable)

{additionalInstructions}
${commonrefs}

Pastikan format profesional dan data-driven.`,

         detailed: `${baseContext} Saya perlu bantuan menyusun Laporan Formal (Formal Report) tentang "{topic}" untuk mata kuliah {subject}.

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{specificRequirements}

**Yang saya butuhkan dengan detail:**

1. **Front Matter**: Struktur Executive Summary yang efektif.
2. **Introduction**: Latar belakang, tujuan, scope laporan.
3. **Methodology**: Cara pengumpulan data/informasi.
4. **Findings**:
   - Pengelompokan temuan utama
   - Ide visualisasi data (tabel/grafik)
   - Analisis signifikansi temuan
5. **Recommendations**: Langkah konkret berdasarkan temuan.

{additionalInstructions}
${detailedRefs}

Gunakan gaya bahasa laporan bisnis/akademik yang lugas.`,

         concise: `Struktur Laporan: "{topic}" ({subject}).
Konsep: {keyConcepts}

{specificRequirements}

**Need:**
1. Executive Summary template
2. Key Findings list
3. Recommendations list
4. 5 Referensi/Sumber data

{additionalInstructions}`
      }
   }
};

// Group Assignment Templates
// Group Assignment Templates
export const groupTemplates: Record<string, PromptTemplate> = {
   essay: {
      id: 'group_essay',
      name: 'Group Essay',
      variations: {
         standard: `Saya adalah ketua kelompok untuk proyek Essay Akademik tentang "{topic}" di mata kuliah {subject}.
Konteks: Tim terdiri dari {memberCount} orang.
Gaya Bahasa: Akademis & Formal. {difficultyInstruction}

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{teamChallenges}

{specificRequirements}

**Yang saya butuhkan sebagai ketua kelompok:**
1. **Manajemen Tim**: Strategi pembagian tugas menulis dan riset yang adil untuk {memberCount} orang.
2. **Struktur Essay**: Outline yang jelas (Pendahuluan, Isi, Kesimpulan) untuk dipandu bersama.
3. **Integrasi**: Cara menyatukan berbagai gaya penulisan menjadi satu suara yang kohesif.
4. **Timeline**: Target mingguan untuk drafting dan editing.

{additionalInstructions}
${commonrefs}

Bantu saya memimpin tim ini agar menghasilkan essay yang solid dan terpadu.`,

         detailed: `Saya adalah ketua kelompok untuk proyek Essay Akademik mendalam tentang "{topic}" di mata kuliah {subject}.
Konteks: Tim terdiri dari {memberCount} orang.
Gaya Bahasa: Akademis & Formal. {difficultyInstruction}

**Spesifikasi:**
- Gaya sitasi: {citationStyle}
- Konsep kunci: {keyConcepts}

{teamChallenges}

{specificRequirements}

**Yang saya butuhkan dengan detail:**

1. **Role Allocation & Workflow**:
   - Pembagian peran (Researcher, Writer, Editor, Citation Manager)
   - Alur kerja dari riset hingga final draft
   - Mekanisme peer-review internal

2. **Struktur & Konten**:
   - Outline detail dengan assignment nama per bagian
   - Argumen utama yang harus dicakup masing-masing penulis
   - Counter-argument yang perlu didiskusikan tim

3. **Quality Control**:
   - Checklist konsistensi argumen
   - Strategi mengatasi writer's block anggota tim
   - Final formatting checklist

{additionalInstructions}
${detailedRefs}

Berikan panduan teknis dan manajerial yang komprehensif.`,

         concise: `Ketua Kelompok Essay: "{topic}" ({subject})
Tim: {memberCount} orang | Citation: {citationStyle}
{difficultyInstruction}

{teamChallenges}
{specificRequirements}

**Need:**
1. Job desc (Riset/Tulis/Edit)
2. Outline Essay Lengkap
3. Timeline pengerjaan
4. QC Checklist
5. 5 Referensi

{additionalInstructions}`
      }
   },

   presentation: {
      id: 'group_presentation',
      name: 'Group Presentation',
      variations: {
         standard: `Saya ketua kelompok Presentasi Akademik topik "{topic}" ({subject}).
Konteks: Tim {memberCount} orang.
Gaya: Akademis & Formal.

**Spesifikasi:**
- Konsep: {keyConcepts}

{teamChallenges}
{specificRequirements}

**Yang saya butuhkan:**
1. **Struktur Slide**: Outline presentasi (Intro > Analysis > Solution > Conclusion).
2. **Pembagian Peran**: Siapa bicara apa (Speaker roles) dan transisi antar pembicara.
3. **Desain**: Panduan visual agar slide terlihat seragam meski dikerjakan {memberCount} orang.
4. **Q&A Prep**: Prediksi pertanyaan dosen dan siapa yang menjawab.

{additionalInstructions}
${commonrefs}`,

         detailed: `Saya ketua kelompok Presentasi Akademik komprehensif topik "{topic}" ({subject}).
Konteks: Tim {memberCount} orang.

**Spesifikasi:**
- Konsep: {keyConcepts}

{teamChallenges}
{specificRequirements}

**Detail Kebutuhan:**
1. **Slide Masterplan**: 
   - Breakdown 10-15 slide dengan penanggung jawab (PIC) per slide.
   - Poin kunci per slide.
2. **Delivery Strategy**:
   - Script transisi antar pembicara agar mengalir (tidak kaku).
   - Rehearsal checklist (intonasi, body language).
3. **Visual Consistency**:
   - Palet warna dan font guide.
   - Aturan penggunaan grafik/gambar.
4. **Problem Solving**: Solusi untuk tantangan tim: {teamChallenges}.

{additionalInstructions}
${detailedRefs}`,

         concise: `Group Presentation Lead: "{topic}"
Tim: {memberCount} org.
{difficultyInstruction}

{teamChallenges}
{specificRequirements}

**Need:**
1. Slide outline & PIC
2. Speaker transition script
3. Visual guidelines
4. 5 Referensi

{additionalInstructions}`
      }
   },

   case_study: {
      id: 'group_case_study',
      name: 'Group Case Study',
      variations: {
         standard: `Saya ketua kelompok Analisis Case Study: "{topic}" ({subject}).
Tim: {memberCount} orang.

**Spesifikasi:**
- Konsep: {keyConcepts}

{teamChallenges}
{specificRequirements}

**Yang saya butuhkan:**
1. **Diskusi Tim**: Panduan memimpin brainstorming untuk identifikasi masalah.
2. **Analisis**: Pembagian sudut pandang analisis (misal: satu orang tinjau finansial, satu lagi operasional).
3. **Sintesis**: Cara menggabungkan analisis berbeda menjadi satu solusi rekomendasi.
4. **Laporan**: Struktur laporan case study final.

{additionalInstructions}
${commonrefs}`,

         detailed: `Saya ketua kelompok Analisis Case Study Mendalam: "{topic}" ({subject}).
Tim: {memberCount} orang.

**Spesifikasi:**
- Konsep: {keyConcepts}

{teamChallenges}
{specificRequirements}

**Detail Kebutuhan:**
1. **Collaborative Analysis Framework**:
   - Metode analisis bersama (SWOT/PESTLE secara tim).
   - Mekanisme voting/konsensus untuk memilih solusi terbaik.
2. **Task Division**:
   - Pembagian peran analis berdasarkan keahlian member.
   - Timeline analisis vs drafting rekomendasi.
3. **Report Structure**:
   - Executive Summary (Joint effort).
   - Detailed Findings (Individual contributions).
   - Recommendations (Consensus).
4. **Resolution**: Strategi jika ada beda pendapat tajam di tim.

{additionalInstructions}
${detailedRefs}`,

         concise: `Group Case Study Lead: "{topic}"
Tim: {memberCount} org.
{difficultyInstruction}

{teamChallenges}
{specificRequirements}

**Need:**
1. Brainstorming guide
2. Analisis role division
3. Konsensus solusi logic
4. Report structure
5. 5 Referensi

{additionalInstructions}`
      }
   },

   analysis: {
      id: 'group_analysis',
      name: 'Group Analysis',
      variations: {
         standard: `Saya ketua kelompok Paper Analisis: "{topic}" ({subject}).
Tim: {memberCount} orang.

**Spesifikasi:**
- Konsep: {keyConcepts}

{teamChallenges}
{specificRequirements}

**Kebutuhan:**
1. Pembagian sub-topik analisis ke {memberCount} anggota.
2. Framework teori bersama agar analisis tidak belang-belang.
3. Metode review silang (cross-check) argumen antar anggota.
4. Struktur paper final.

{additionalInstructions}
${commonrefs}`,

         detailed: `Saya ketua kelompok Critical Analysis Paper: "{topic}" ({subject}).
Tim: {memberCount} orang.

**Spesifikasi:**
- Konsep: {keyConcepts}

{teamChallenges}
{specificRequirements}

**Detail Kebutuhan:**
1. **Critical Framework**: Standar kritik yang disepakati tim di awal.
2. **Division of Labor**: 
   - Literatur review (1-2 orang)
   - Data gathering (1-2 orang)
   - Synthesis (berjalan bersama)
3. **Integrasi Argumen**: Cara menyambungkan bab-bab analisis individu menjadi satu narasi utuh.
4. **Reference Management**: Sistem sitasi terpusat (misal: Zotero/Mendeley workflow).

{additionalInstructions}
${detailedRefs}`,

         concise: `Group Analysis Lead: "{topic}"
Tim: {memberCount} org.
{difficultyInstruction}

{teamChallenges}
{specificRequirements}

**Need:**
1. Sub-topic division
2. Unified theory framework
3. Internal review process
4. 5 Referensi

{additionalInstructions}`
      }
   },

   report: {
      id: 'group_report',
      name: 'Group Report',
      variations: {
         standard: `Saya ketua kelompok Laporan (Report): "{topic}" ({subject}).
Tim: {memberCount} orang.

**Spesifikasi:**
- Konsep: {keyConcepts}

{teamChallenges}
{specificRequirements}

**Kebutuhan:**
1. Pembagian bab laporan (Intro, Metode, Data, Pembahasan).
2. Standar format data (tabel/grafik) agar seragam.
3. Timeline pengumpulan data vs penulisan.
4. Peran Editor untuk menyatukan tulisan (One Voice policy).

{additionalInstructions}
${commonrefs}`,

         detailed: `Saya ketua kelompok Formal Report: "{topic}" ({subject}).
Tim: {memberCount} orang.

**Spesifikasi:**
- Konsep: {keyConcepts}

{teamChallenges}
{specificRequirements}

**Detail Kebutuhan:**
1. **Section Ownership**:
   - Assign member spesifik untuk setiap bab utama.
   - Deadline bertahap (Draft 1, Review 1, Final).
2. **Data Standardization**:
   - Template tabel dan grafik untuk tim.
   - Naming convention file.
3. **Editing Process**:
   - Siapa yang bertanggung jawab sebagai Lead Editor?
   - Checklist format sebelum submit.
4. **Executive Summary**: Strategi menulis ini bersama-sama di akhir.

{additionalInstructions}
${detailedRefs}`,

         concise: `Group Report Lead: "{topic}"
Tim: {memberCount} org.
{difficultyInstruction}

{teamChallenges}
{specificRequirements}

**Need:**
1. Chapter division
2. Formatting standards
3. Editing workflow
4. 5 Referensi/Data

{additionalInstructions}`
      }
   },

   // Fallback for Review or other unmapped types
   review: {
      id: 'group_review',
      name: 'Group Review',
      variations: {
         standard: `Saya ketua kelompok Review Literatur/Buku: "{topic}" ({subject}).
Tim: {memberCount} orang.

**Spesifikasi:**
- Konsep: {keyConcepts}

{teamChallenges}
{specificRequirements}

**Kebutuhan:**
1. Pembagian bab/bagian buku untuk direview per anggota.
2. Sesi diskusi untuk menyamakan persepsi evaluasi (Positif/Negatif).
3. Penyatuan opini menjadi kesimpulan kelompok.
4. Struktur paper review.

{additionalInstructions}
${commonrefs}`,

         detailed: `Saya ketua kelompok Critical Review: "{topic}" ({subject}).
Tim: {memberCount} orang.

**Spesifikasi:**
- Konsep: {keyConcepts}

{teamChallenges}
{specificRequirements}

**Detail Kebutuhan:**
1. **Review Matrix**: Tabel perbandingan poin review tiap anggota.
2. **Consensus**: Cara menyepakati final stance kelompok (Recommend/Not Recommend).
3. **Writing**:
   - Siapa menulis Summary?
   - Siapa menulis Kritik?
   - Siapa menulis Kesimpulan?
4. **Timeline**: Baca vs Diskusi vs Tulis.

{additionalInstructions}
${detailedRefs}`,

         concise: `Group Review Lead: "{topic}"
Tim: {memberCount} org.
{difficultyInstruction}

{teamChallenges}
{specificRequirements}

**Need:**
1. Reading division
2. Discussion points
3. Writing assignments
4. 5 Referensi

{additionalInstructions}`
      }
   }
};

// Helper function to get appropriate template
export function getTemplate(
   assignmentType: string,
   isGroup: boolean,
   variation: 'standard' | 'detailed' | 'concise' = 'standard'
): string {
   // Both individual and group templates now share the same keys (essay, presentation, etc.)
   const templates = isGroup ? groupTemplates : individualTemplates;

   // Normalize key from Assignment Type (e.g. "Case Study" -> "case_study")
   let key = assignmentType.toLowerCase().replace(' ', '_');

   // Robust mapping for unknown types
   if (!templates[key]) {
      // Try standard fallbacks
      if (key === 'review') key = 'review';
      else if (key.includes('presentation')) key = 'presentation';
      else if (key.includes('case')) key = 'case_study';
      else if (key.includes('analy')) key = 'analysis';
      else if (key.includes('report')) key = 'report';
      else key = 'essay'; // Ultimate fallback is Essay (Group or Individual)
   }

   const template = templates[key];

   if (!template) {
      // Safety net if something goes really wrong
      return templates['essay']?.variations[variation] || "Error: Template not found";
   }

   return template.variations[variation];
}
