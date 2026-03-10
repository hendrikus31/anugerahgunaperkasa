import { MapPin, Phone, EnvelopeSimple, InstagramLogo } from "@phosphor-icons/react";

const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#produk", label: "Produk" },
  { href: "#lokasi", label: "Lokasi" }
];

export default function Footer({ company }) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300" data-testid="footer">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              {company?.logo_url && (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="h-10 w-auto"
                />
              )}
              <span className="font-outfit font-bold text-xl text-white">
                PT Anugerah Guna Perkasa
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
              {company?.tagline}. Partner terpercaya untuk kebutuhan kebersihan laundry, hotel, rumah sakit, dan rumah tangga.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/pt.anugerah_guna_perkasa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-sky-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramLogo size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-semibold text-white text-lg mb-6">
              Menu
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-outfit font-semibold text-white text-lg mb-6">
              Kontak
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-sky-400 flex-shrink-0 mt-1" />
                <span className="text-slate-400 text-sm">
                  {company?.address || "Kutawaringin Industrial Park no.113, Bandung"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-emerald-400" />
                <a
                  href={`https://wa.me/${company?.whatsapp || "6281122445593"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  +{company?.whatsapp || "62 811 2244 5593"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeSimple size={20} className="text-amber-400" />
                <a
                  href="mailto:sales@anugerahgunaperkasa.com"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  sales@anugerahgunaperkasa.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              &copy; {currentYear} {company?.name}. Hak Cipta Dilindungi.
            </p>
            <p className="text-slate-500 text-sm">
              Produk Terdaftar di Dinas Kesehatan & Dilindungi HAKI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
