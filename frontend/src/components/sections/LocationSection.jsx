import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, NavigationArrow } from "@phosphor-icons/react";

export default function LocationSection({ company }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Google Maps embed URL for Kutawaringin Industrial Park
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0449147424686!2d107.4994!3d-6.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e12b1bae3c99%3A0x0!2sKutawaringin%20Industrial%20Park!5e0!3m2!1sen!2sid!4v1234567890";

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=Kutawaringin+Industrial+Park+no.113+Jelegong+Kutawaringin+Bandung`,
      "_blank"
    );
  };

  return (
    <section
      id="lokasi"
      ref={ref}
      className="section-spacing bg-white relative overflow-hidden"
      data-testid="location-section"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
            Lokasi Kami
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mt-4 mb-6">
            Temukan <span className="text-gradient">Kami</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Kunjungi pabrik kami di kawasan industri Kutawaringin, Bandung
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="map-container bg-slate-100 aspect-video lg:aspect-[4/3]">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi PT. Anugerah Guna Perkasa"
              />
            </div>
          </motion.div>

          {/* Address Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Address Card */}
            <div className="bg-gradient-to-br from-sky-50 to-emerald-50/50 rounded-2xl p-8 border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} weight="duotone" className="text-sky-600" />
                </div>
                <div>
                  <h3 className="font-outfit text-lg font-semibold text-slate-800 mb-2">
                    Alamat Pabrik
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {company?.address || "Kutawaringin Industrial Park no.113 Kelurahan Jelegong, Kecamatan Kutawaringin, Kabupaten Bandung, Jawa Barat 40911"}
                  </p>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openGoogleMaps}
              className="w-full bg-gradient-primary text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              data-testid="directions-btn"
            >
              <NavigationArrow size={20} weight="fill" />
              Petunjuk Arah
            </motion.button>

            {/* Info Note */}
            <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
              <p className="text-sm text-amber-800">
                <strong>Jam Operasional:</strong>
                <br />
                Senin - Jumat: 08.00 - 17.00 WIB
                <br />
                Sabtu - Minggu: Libur
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
