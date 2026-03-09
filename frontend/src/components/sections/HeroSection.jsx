import { motion } from "framer-motion";
import { Sparkle, ArrowDown } from "@phosphor-icons/react";

export default function HeroSection({ company }) {
  const scrollToProducts = () => {
    const element = document.querySelector("#produk");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden"
      data-testid="hero-section"
    >
      {/* Decorative bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sky-500/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-sky-700 mb-6 shadow-sm"
            >
              <Sparkle weight="fill" className="text-emerald-500" />
              <span>Produsen Produk Kebersihan Terpercaya</span>
            </motion.div>

            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Selamat Datang di
              <br />
              <span className="text-gradient">{company?.name}</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {company?.tagline}. Partner terpercaya untuk kebutuhan kebersihan laundry, hotel, rumah sakit, dan rumah tangga Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProducts}
                className="bg-gradient-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                data-testid="hero-cta-btn"
              >
                Lihat Produk Kami
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#tentang"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#tentang")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-sky-700 border-2 border-sky-200 hover:border-sky-400 px-8 py-4 rounded-full font-semibold transition-colors"
                data-testid="hero-about-btn"
              >
                Pelajari Lebih Lanjut
              </motion.a>
            </div>
          </motion.div>

          {/* Hero Image - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main product image */}
              <motion.img
                src="https://anugerahgunaperkasa.odoo.com/web/image/971-0c2f7bfd/Gatherd_product-removebg-preview%20%281%29_Nero_AI_Image_Upscaler_Photo_Face%20%281%29.webp"
                alt="Produk PT. Anugerah Guna Perkasa"
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 bg-sky-400/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-slate-400"
          >
            <span className="text-sm mb-2">Scroll</span>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
