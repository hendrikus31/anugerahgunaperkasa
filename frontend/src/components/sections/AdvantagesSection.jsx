import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Calendar,
  Factory,
  Certificate,
  ShieldCheck,
  Sparkle,
  Handshake
} from "@phosphor-icons/react";

const iconMap = {
  Calendar: Calendar,
  Factory: Factory,
  Certificate: Certificate,
  ShieldCheck: ShieldCheck,
  Sparkle: Sparkle,
  Handshake: Handshake
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function AdvantagesSection({ advantages }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-white relative overflow-hidden"
      data-testid="advantages-section"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
            Keunggulan Kami
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mt-4 mb-6">
            Mengapa Memilih{" "}
            <span className="text-gradient">Kami?</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Kami berkomitmen memberikan produk dan layanan terbaik untuk memenuhi kebutuhan kebersihan Anda
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {advantages.map((advantage, index) => {
            const IconComponent = iconMap[advantage.icon] || Sparkle;
            const colors = [
              { bg: "bg-sky-50", icon: "text-sky-500", border: "hover:border-sky-200" },
              { bg: "bg-emerald-50", icon: "text-emerald-500", border: "hover:border-emerald-200" },
              { bg: "bg-amber-50", icon: "text-amber-500", border: "hover:border-amber-200" },
              { bg: "bg-violet-50", icon: "text-violet-500", border: "hover:border-violet-200" },
              { bg: "bg-rose-50", icon: "text-rose-500", border: "hover:border-rose-200" },
              { bg: "bg-cyan-50", icon: "text-cyan-500", border: "hover:border-cyan-200" }
            ];
            const color = colors[index % colors.length];

            return (
              <motion.div
                key={advantage.id}
                variants={itemVariants}
                className={`bg-white rounded-2xl p-8 border border-slate-100 ${color.border} shadow-sm hover:shadow-xl transition-all duration-300 group`}
                data-testid={`advantage-${index + 1}`}
              >
                <div className={`w-14 h-14 ${color.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent size={28} weight="duotone" className={color.icon} />
                </div>
                <h3 className="font-outfit text-xl font-semibold text-slate-800 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
