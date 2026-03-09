import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Package, Tag, CaretRight } from "@phosphor-icons/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5 } 
  }
};

const categories = ["Semua", "Laundry", "Household", "Personal Care"];

export default function ProductsSection({ products }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredProducts = activeCategory === "Semua"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section
      id="produk"
      ref={ref}
      className="section-spacing bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
      data-testid="products-section"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-sm font-semibold text-sky-600 uppercase tracking-widest">
            Produk Kami
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mt-4 mb-6">
            Solusi <span className="text-gradient">Kebersihan</span> Berkualitas
          </h2>
          <p className="text-slate-600 text-lg">
            Produk cair tersedia dengan ukuran 5 Ltr dan 20 Ltr. Produk bubuk tersedia dengan ukuran 25 Kg.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-sky-600 text-white shadow-lg shadow-sky-200"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
              data-testid={`filter-${category.toLowerCase().replace(" ", "-")}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              layout
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-sky-200 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              data-testid={`product-card-${product.id}`}
            >
              {/* Product Image */}
              <div className="relative p-6 bg-gradient-to-br from-slate-50 to-sky-50/50 aspect-square flex items-center justify-center overflow-hidden">
                <motion.img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-contain max-h-48 drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                  style={{ objectFit: "contain" }}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium text-sky-700">
                    <Tag size={12} weight="fill" />
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-outfit text-xl font-semibold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {product.description}
                </p>
                
                {/* Sizes */}
                <div className="flex items-center gap-2 text-sm">
                  <Package size={16} className="text-emerald-500" />
                  <span className="text-slate-600">
                    Ukuran: <strong className="text-emerald-600">{product.sizes}</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 mb-4">
            Tertarik dengan produk kami? Hubungi kami untuk informasi lebih lanjut
          </p>
          <a
            href="#lokasi"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#lokasi")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors group"
          >
            Lihat Lokasi Kami
            <CaretRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
