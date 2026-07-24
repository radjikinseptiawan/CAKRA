"use client";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-32 bg-gradient-to-b from-green-50/50 to-white">
        <Container maxWidth="lg">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Sistem Tanggap Insiden{" "}
              <span className="text-green-600 block sm:inline">CAKRA</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium mb-4">
              Cepat, Akurat, Koordinasi dan Respon Aman
            </p>
            <p className="text-base text-slate-500 max-w-xl mx-auto mb-10">
              Platform terintegrasi untuk mempercepat manajemen insiden
              keamanan, memastikan koordinasi tim berjalan lancar, dan
              memitigasi risiko secara presisi.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={() => router.push("/maps")}
              >
                Lihat Peta
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={() => router.push("/docs")}
              >
                Dokumentasi
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Features Section (Pilar CAKRA) */}
      <section id="fitur" className="py-20 bg-white border-y border-slate-100">
        <Container maxWidth="lg">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Mengapa Memilih CAKRA?
            </h2>
            <p className="mt-4 text-slate-500">
              Dirancang untuk memberikan respons terbaik dalam menghadapi setiap
              insiden secara terstruktur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Cipat */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl mb-4">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Cepat</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Deteksi dini dan otomatisasi pelaporan insiden tanpa hambatan
                birokrasi yang memakan waktu.
              </p>
            </div>

            {/* Akurat */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl mb-4">
                🎯
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Akurat</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Validasi data insiden dengan analisis mendalam untuk menghindari
                *false alarm* pada sistem.
              </p>
            </div>

            {/* Koordinasi */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl mb-4">
                🤝
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Koordinasi
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Kolaborasi antar tim respons secara *real-time* melalui satu
                *command center* yang terpusat.
              </p>
            </div>

            {/* Respon Aman */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl mb-4">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Respon Aman
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Eksekusi mitigasi dan pemulihan (*recovery*) berdasarkan standar
                framework keamanan terbaik.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. About / Stats Section */}
      <section id="tentang" className="py-20 bg-slate-50">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-green-600 tracking-wider uppercase">
                Tentang Platform
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mt-2 mb-6">
                Membangun Ketahanan Sistem Melalui Respon Terpadu
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                CAKRA hadir sebagai solusi komprehensif untuk menjembatani celah
                komunikasi saat terjadi insiden kritis. Dengan pendekatan
                berbasis *workflow* yang efisien, sistem ini memastikan setiap
                langkah penanganan terdokumentasi dan terukur dengan baik.
              </p>
              <div className="border-l-4 border-green-500 pl-4 italic text-slate-600">
                "Keamanan bukan tentang tidak pernah diserang, melainkan
                seberapa tangguh dan cepat kita merespon serta pulih."
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 grid grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-xl text-center">
                <span className="block text-3xl font-extrabold text-slate-900">
                  &lt; 5m
                </span>
                <span className="text-xs text-slate-500 font-medium uppercase mt-1 block">
                  Waktu Deteksi
                </span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center">
                <span className="block text-3xl font-extrabold text-slate-900">
                  99.9%
                </span>
                <span className="text-xs text-slate-500 font-medium uppercase mt-1 block">
                  Akurasi Data
                </span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center">
                <span className="block text-3xl font-extrabold text-slate-900">
                  24/7
                </span>
                <span className="text-xs text-slate-500 font-medium uppercase mt-1 block">
                  Monitoring Aktif
                </span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center">
                <span className="block text-3xl font-extrabold text-slate-900">
                  100%
                </span>
                <span className="text-xs text-slate-500 font-medium uppercase mt-1 block">
                  Enkripsi Data
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Footer */}
      <footer
        id="kontak"
        className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800"
      >
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-xl font-black tracking-wider text-white">
                CAKRA
              </span>
              <p className="text-xs mt-1 text-slate-500">
                © {new Date().getFullYear()} CAKRA Platform. All rights
                reserved.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
