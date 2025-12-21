# 📋 Panduan Memperbaiki Google Sheets

## Masalah yang Ditemukan

### 1. **Category Tidak Match**
Kolom `category` di sheet **Home** harus PERSIS SAMA dengan kolom `id` di sheet **Category**.

❌ **Salah:**
- Category ID: `devtools`
- Link category: `dev tools` (ada spasi)

✅ **Benar:**
- Category ID: `devtools`
- Link category: `devtools` (sama persis)

### 2. **ID Link Tidak Unik**
Setiap link harus punya `id` yang unik. Jangan gunakan nama category sebagai ID.

❌ **Salah:**
```
id: devtools (dipakai 4x)
id: aicodingagents (dipakai 5x)
```

✅ **Benar:**
```
id: vscode
id: github
id: firebase-studio
id: aider
id: cline
```

---

## 🔧 Data yang Sudah Diperbaiki

### Sheet "Home" (Links) - Copy paste ini ke spreadsheet:

**Format:** `id | name | description | icon | category | link | level | active | order`

```
id	name	description	icon	category	link	level	active	order
pti	PTI	Semester 1	cpu	kuliah	https://drive.google.com/drive/folders/1ai3tZZ0pD_xVeIsYmkOldMnrIEcOWO5P?usp=sharing	1	1	1
ai-bisnis	AI Untuk  BIsnis	Semester 3	brain-circuit	kuliah	https://drive.google.com/drive/folders/1VSOpcKyxn7aAeew210oXSJcVJa2d7P44?usp=sharing	1	1	2
cloud-computing	Cloud Computing	Semester 5	cloud-cog	kuliah	https://drive.google.com/drive/folders/145qy5vGKp-bxNhSfONoBO3IlpLFZK031?usp=sharing	1	1	3
ui-ux	UI/UX Design	Semester 5	palette	kuliah	https://drive.google.com/drive/folders/1pkEmyBG6j9BWoSfDeiBfN_WCumRvs2zD?usp=sharing	1	1	4
vscode	VS Code	Editor kode standar industri, ekstensi luas.	terminal-square	devtools	code.visualstudio.com	1	1	5
github	GitHub	Hosting repository Git & kolaborasi versi.	github	devtools	github.com	1	1	6
firebase-studio	Firebase Studio	IDE browser, emulator Android, agen AI.	flame	devtools	firebase.google.com	1	1	7
antigravity	Antigravity	VS Code versi agen & verifikasi browser.	rocket	devtools	antigravity.google	1	1	8
aider	Aider	CLI edit kode repo lokal (API sendiri).	message-square-code	aicodingagents	aider.chat	1	1	9
cline	Cline	Agen koding otonom VS Code (BYOK).	bot	aicodingagents	github.com/cline/cline	1	1	10
opendevin	OpenDevin	Framework agen otonom container Docker.	container	aicodingagents	github.com/OpenDevin	1	1	11
manus	Manus.im	Agen riset web & task browser otonom.	bot	aicodingagents	manus.im	1	1	12
minimax-m2	MiniMax M2	Agen koding/reasoning otonom cepat.	bot	aicodingagents	minimax.io	1	1	13
google-ai-studio	Google AI Studio	Prototyping cepat API Gemini gratis.	flask-conical	aidev&data	aistudio.google.com	1	1	14
z-ai	Z.ai (GLM-4)	Backend coding assistant API GLM-4.	cpu	aidev&data	z.ai	1	1	15
google-colab	Google Colab	Notebook Python cloud, akses GPU T4 gratis.	book-code	aidev&data	colab.google	1	1	16
teachable-machine	Teachable Machine	Latih ML visual tanpa koding (TF.js).	brain	aidev&data	teachablemachine.withgoogle.com	1	1	17
ollama	Ollama	Run LLM lokal (Llama/DeepSeek) offline.	cloud-off	aidev&data	ollama.com	1	1	18
vercel	Vercel	Deploy frontend Next.js/React serverless.	triangle	deployment	vercel.com	1	1	19
netlify	Netlify	Hosting situs statis/Jamstack via Git.	cloud-lightning	deployment	netlify.com	1	1	20
cloudflare-pages	Cloudflare Pages	Hosting statis edge global performa tinggi.	shield-check	deployment	pages.cloudflare.com	1	1	21
chatgpt	ChatGPT	LLM multimodal teks, kode, analisis.	message-square	generalai	chatgpt.com	1	1	22
huggingchat	HuggingChat	Chat model open-source unlimited gratis.	message-circle	generalai	huggingface.co/chat	1	1	23
claude	Claude	LLM reasoning logika tinggi, konteks besar.	brain-circuit	generalai	claude.ai	1	1	24
gemini	Gemini	AI multimodal integrasi Workspace.	sparkles	generalai	gemini.google.com	1	1	25
poe	Poe	Agregator multi-model AI (GPT-4/Claude).	layers	generalai	poe.com	1	1	26
anythingllm	AnythingLLM	Install Ai sendiri di komputer mirip ollama.	shield	generalai	useanything.com	1	1	27
grok	Grok	AI real-time akses pipeline data X.	radio	generalai	x.com/i/grok	1	1	28
orange-datamining	Orange Data Mining	Data mining visual node-link tanpa koding.	network	analytics&bi	orangedatamining.com	1	1	29
looker-studio	Looker Studio	Dashboard & laporan visual interaktif web.	chart-column	analytics&bi	lookerstudio.google.com	1	1	30
powerbi	Power BI Desktop	Analisis bisnis desktop model data kompleks.	bar-chart-big	analytics&bi	powerbi.microsoft.com	1	1	31
notebooklm	NotebookLM	RAG dokumen pribadi basis knowledge Q&A.	book-open-text	smartresearch	notebooklm.google.com	1	1	32
google-trends	Google Trends	Analisis volume search & tren topik.	trending-up	smartresearch	trends.google.com	1	1	33
khoj	Khoj	Search semantik knowledge management.	search-code	smartresearch	khoj.dev	1	1	34
canva	Canva	Desain grafis template lengkap & AI Magic.	brush	design&creative	canva.com	1	1	35
penpot	Penpot	Desain UI/UX open-source standar web.	pen-tool	design&creative	penpot.app	1	1	36
ms-clarity	MS Clarity	Heatmaps & rekaman sesi user web.	eye	design&creative	clarity.microsoft.com	1	1	37
v0	v0 (Vercel)	Generator UI React/Tailwind dari prompt.	code-xml	design&creative	v0.dev	1	1	38
google-stitch	Google Stitch	Buat prototipe website atau aplikasi mobile. Bisa convert ke Figma.	scissors	design&creative	stitch.withgoogle.com	1	1	39
gamma	Gamma	Generator slide presentasi & dokumen otomatis.	presentation	design&creative	gamma.app	1	1	40
ms-designer	MS Designer	Desain grafis pemasaran via DALL-E 3.	palette	design&creative	designer.microsoft.com	1	1	41
drawio	Draw.io	Diagram flowchart/UML/ERD web & lokal.	workflow	design&creative	app.diagrams.net	1	1	42
n8n	n8n	Otomasi workflow node-based (self-host).	webhook	productivity&ops	n8n.io	1	1	43
ms-loop	MS Loop	Wiki tim kolaboratif sinkron real-time.	repeat	productivity&ops	loop.microsoft.com	1	1	44
```

---

## 📝 Cara Paste ke Google Sheets

1. **Buka Google Sheets** Anda
2. **Pilih sheet "Home"**
3. **Klik cell A1**
4. **Paste data di atas** (Ctrl+V atau Cmd+V)
5. Data akan otomatis terpisah ke kolom-kolom yang sesuai
6. **Publish ke web** (File → Share → Publish to web)

---

## ✅ Cek Header Kolom

Pastikan header di **baris pertama** adalah:
```
id | name | description | icon | category | link | level | active | order
```

Semuanya harus **lowercase** dan **tanpa spasi**.

---

## 🎯 Yang Sudah Diperbaiki:

### ID Unik untuk Setiap Link:
- ✅ `vscode`, `github`, `firebase-studio`, `antigravity` (bukan semua "devtools")
- ✅ `aider`, `cline`, `opendevin`, `manus`, `minimax-m2` (bukan semua "aicodingagents")
- ✅ dll.

### Category Match dengan Category ID:
- ✅ `devtools` (bukan "dev tools")
- ✅ `aicodingagents` (bukan "ai coding agents")
- ✅ `aidev&data` (bukan "ai dev & data")
- ✅ `generalai` (bukan "general ai")
- ✅ `analytics&bi` (bukan "analytics & bi")
- ✅ `smartresearch` (bukan "smart research")
- ✅ `design&creative` (bukan "design & creative")
- ✅ `productivity&ops` (bukan "productivity & ops")

---

## 🚀 Setelah Diperbaiki

1. **Refresh** halaman di browser (Ctrl+R / Cmd+R)
2. Tunggu beberapa detik (cache 5 menit)
3. Atau **hard refresh** (Ctrl+Shift+R / Cmd+Shift+R)
4. Semua data akan muncul dengan sempurna! 🎉
