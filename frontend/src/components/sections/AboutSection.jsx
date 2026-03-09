import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection({ company }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="tentang"
      ref={ref}
      className="section-spacing bg-gradient-section"
      data-testid="about-section"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://anugerahgunaperkasa.odoo.com/web/image/957-99ebc2ee/Gatherd%20product.webp"
                alt="Produk PT. Anugerah Guna Perkasa"
                className="w-full h-auto object-contain"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="text-center">
                <span className="block text-4xl font-bold text-sky-600 font-outfit">
                  {company?.founded_year ? new Date().getFullYear() - company.founded_year : 8}+
                </span>
                <span className="text-sm text-slate-500">Tahun Pengalaman</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-widest">
              Tentang Kami
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mt-4 mb-6">
              Partner Produsen{" "}
              <span className="text-gradient">Kebersihan</span> Anda
            </h2>
            
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Berdiri sejak tahun {company?.founded_year || 2016}, <strong className="text-slate-800">{company?.name}</strong> berkomitmen menghadirkan solusi produk kebersihan yang berkualitas dan terpercaya.
              </p>
              <p>
                Kami memproduksi deterjen, softener, parfum laundry, sabun cuci tangan, dan sabun cuci piring yang dirancang untuk memenuhi standar kebersihan sektor laundry, perhotelan, rumah sakit, serta rumah tangga.
              </p>
              <p>
                Seluruh proses produksi dilakukan di kawasan industri dengan izin produksi dan izin edar resmi dari <strong className="text-emerald-600">Dinas Kesehatan</strong>. Merek kami juga telah terdaftar dan memiliki perlindungan <strong className="text-sky-600">HAKI</strong> sebagai bentuk komitmen terhadap profesionalisme dan kepatuhan hukum.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-sky-50/50 rounded-2xl p-6 text-center">
                <span className="block text-3xl font-bold text-sky-600 font-outfit">7+</span>
                <span className="text-sm text-slate-500">Produk Berkualitas</span>
              </div>
              <div className="bg-emerald-50/50 rounded-2xl p-6 text-center">
                <span className="block text-3xl font-bold text-emerald-600 font-outfit">1000+</span>
                <span className="text-sm text-slate-500">Pelanggan Puas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
