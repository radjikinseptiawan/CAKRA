# CAKRA

CAKRA merupakan singkatan dari Cepat, Akurat, Kordinasi Respon Aman. CAKRA adalah sistem Sigap Lapor dimana CAKRA dapat terhubung ke _Internet of Things_ untuk terhubung ke perangkat kamera pengawas DVR (_Digital Video Recorder_)
dan _Artificial Intellegence_

# Folder Structured

CAKRA/
├── client/
│ ├── app/
│ ├── @types/
│ ├── lib/
│ ├── components/
│ ├── context/
│ ├── features/
│ ├── public/
│ ├── services/
│ ├── .env
│ ├── .gitignore
│ ├── AGENTS.md
│ ├── CLAUDE.md
│ ├── eslint.config.mjs
│ ├── next-config.ts
│ ├── package-log.json
│ └── package.json
└── api/
├── prisma/
├── router/
├── lib/
├── app.py
├── .env
├── prisma.config.ts
├── package.json
└── package.-ock.json

## Acknowledgements

Sistem **CAKRA** dibangun dengan arsitektur terpisah antara antarmuka pengguna (`client`) dan layanan backend/API (`api`).

### 1. Client Directory (`client/`)

Folder `client` berisi konfigurasi dan kode sumber antarmuka pengguna berbasis Next.js (App Router).

- **`app/`** — Inti dari Next.js App Router. Berisi _route_, halaman (`page.tsx`), layout (`layout.tsx`), penanganan _error_, dan _API routes_. Seluruh struktur navigasi ditentukan oleh hierarki folder di dalamnya.
- **`@types/`** — Tempat menyimpan deklarasi dan tipe data TypeScript (`.d.ts` / `.ts`) untuk menjaga _type safety_ di seluruh aplikasi frontend.
- **`lib/`** — Berisi fungsi _helper_, utilitas umum, dan konfigurasi pustaka pihak ketiga.
- **`components/`** — Berisi komponen UI modular yang dapat digunakan kembali (_reusable_) seperti tombol, _modal_, atau _card_.
- **`context/`** — Berisi _React Context Provider_ untuk pengelolaan _global state_ (seperti status autentikasi atau tema).
- **`features/`** — Komponen, _hooks_, dan logika yang dikelompokkan berdasarkan fitur spesifik (_Feature-Driven Architecture_), seperti modul streaming CCTV atau analitik.
- **`public/`** — Berkas statis yang diakses langsung oleh _browser_, seperti logo, ikon, dan aset gambar.
- **`services/`** — Lapisan penanganan komunikasi API (_data fetching_) yang berinteraksi dengan layanan backend.
- **`.env`** — Berkas variabel lingkungan (_environment variables_) untuk konfigurasi rahasia client (misal: URL API Backend).
- **`.gitignore`** — Daftar berkas atau folder yang diabaikan oleh Git agar tidak terikut ke dalam _repository_.
- **`AGENTS.md` & `CLAUDE.md`** — Berkas instruksi dan konteks arsitektur proyek untuk AI Agent / Coding Assistant.
- **`eslint.config.mjs`** — Konfigurasi _linter_ untuk menjaga standar kualitas penulisan kode.
- **`next-config.ts`** — Berkas konfigurasi utama untuk optimasi, _redirect_, dan alur kerja Next.js.
- **`package.json` & `package-lock.json`** — Manifes dependensi, pustaka (_packages_), dan skrip perintah untuk ekosistem Node.js pada client.
- **`node_modules/`** — Folder tempat terisntalnya seluruh pustaka/dependensi Node.js untuk client.

---

### 2. API Directory (`api/`)

Folder ini berisi layanan backend utama berbasis FastAPI untuk pemrosesan data, validasi skema, endpoint REST API, dan integrasi database/AI.

- `app.py` — Entry point utama aplikasi FastAPI. Berisi inisialisasi server, middleware (CORS, dsb.), dan pendaftaran router.

- `router/` — Penanganan routing/endpoint REST API FastAPI (mengelompokkan APIRouter per modul atau fitur).

- `schema/` — Model validasi data request & response menggunakan Pydantic untuk menjamin data integrity dan dokumentasi Swagger/OpenAPI otomatis.

- `services/` — Business logic utama backend, pemrosesan aliran video (CCTV/RTSP), integrasi model AI, dan kueri database.

- `lib/` — Utilitas backend, helper functions, serta konfigurasi integrasi library atau koneksi luar.

- `prisma/` — Berkas skema Prisma ORM (schema.prisma) dan migrasi database.

- `prisma.config.ts` — Konfigurasi tambahan untuk kebutuhan ORM/generator Prisma.

- `node_modules/` — Dependensi Node.js / toolchain Prisma.

- `.env & .gitignore` — Berkas variabel lingkungan (seperti DATABASE_URL, secret keys) dan pengecualian Git.`

## Authors

- [@radjikinseptiawan](https://www.github.com/radjikinseptiawan)
- [@AjiThomthom](https://github.com/AjiThomthom)
- [@ekoapriliyani](https://github.com/ekoapriliyani)
