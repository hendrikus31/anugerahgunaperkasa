import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import LocationSection from "@/components/sections/LocationSection";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Static fallback data
const staticCompany = {
  id: 1,
  name: "PT. Anugerah Guna Perkasa",
  tagline: "Produsen produk kebersihan sejak 2016",
  description: "PT. Anugerah Guna Perkasa adalah produsen produk kebersihan sejak 2016 yang melayani kebutuhan laundry, hotel, rumah sakit, dan rumah tangga dengan kualitas terjamin dan legalitas resmi. Seluruh proses produksi dilakukan di kawasan industri dengan izin produksi dan izin edar resmi dari Dinas Kesehatan. Merek kami juga telah terdaftar dan memiliki perlindungan HAKI sebagai bentuk komitmen terhadap profesionalisme dan kepatuhan hukum.",
  founded_year: 2016,
  address: "Kutawaringin Industrial Park no.113 Kelurahan Jelegong, Kecamatan Kutawaringin, Kabupaten Bandung, Jawa Barat 40911",
  whatsapp: "6281234567890",
  map_coordinates: "-6.9175,107.5019",
  logo_url: "https://anugerahgunaperkasa.odoo.com/web/image/website/1/logo/AnugerahGunaPerkasa?unique=c3a5160"
};

const staticProducts = [
  {
    id: 1,
    name: "Hand Wash",
    description: "Sabun cuci tangan dengan berbagai pilihan aroma, efektif membersihkan dan menjaga kesegaran tangan.",
    category: "Personal Care",
    image_url: "https://anugerahgunaperkasa.odoo.com/web/image/895-7f29bc79/Hand_Wash-removebg-preview.webp",
    sizes: "5 Ltr, 20 Ltr"
  },
  {
    id: 2,
    name: "Dish Soap",
    description: "Sabun cuci piring yang efektif mengangkat lemak dan sisa makanan, menghasilkan peralatan makan bersih dan higienis.",
    category: "Household",
    image_url: "https://anugerahgunaperkasa.odoo.com/web/image/892-b6ac34d7/Dish_Soap-removebg-preview.webp",
    sizes: "5 Ltr, 20 Ltr"
  },
  {
    id: 3,
    name: "Blue Liquid Detergent",
    description: "Deterjen cair konsentrat dengan formula low foam yang efektif mengangkat noda membandel dan menjadikan hasil cucian menjadi bersih dan cerah.",
    category: "Laundry",
    image_url: "https://anugerahgunaperkasa.odoo.com/web/image/935-3f361f0c/Blue_Liquid_Detergent-removebg-preview.webp",
    sizes: "5 Ltr, 20 Ltr"
  },
  {
    id: 4,
    name: "Green Liquid Detergent",
    description: "Deterjen cair low foam yang efektif membersihkan noda dengan hasil bersih dan cerah.",
    category: "Laundry",
    image_url: "https://anugerahgunaperkasa.odoo.com/web/image/891-13e8b5ec/Green_Liquid_Detergent-removebg-preview.webp",
    sizes: "5 Ltr, 20 Ltr"
  },
  {
    id: 5,
    name: "Perfume",
    description: "Parfum laundry konsentrat tinggi dengan beragam varian aroma yang memberikan keharuman tahan lama. Digunakan setelah proses setrika untuk hasil akhir yang lebih segar dan profesional.",
    category: "Laundry",
    image_url: "https://anugerahgunaperkasa.odoo.com/web/image/890-91966dac/Perfume-removebg-preview.webp",
    sizes: "5 Ltr, 20 Ltr"
  },
  {
    id: 6,
    name: "Softener",
    description: "Pelembut pakaian yang memberikan kelembutan maksimal dan keharuman segar tahan lama.",
    category: "Laundry",
    image_url: "https://anugerahgunaperkasa.odoo.com/web/image/893-cf4adbd5/Softener-removebg-preview.webp",
    sizes: "5 Ltr, 20 Ltr"
  },
  {
    id: 7,
    name: "Powder Detergent",
    description: "Deterjen bubuk low foam dengan daya bersih optimal untuk mengangkat noda secara efektif tanpa merusak serat kain.",
    category: "Laundry",
    image_url: "https://anugerahgunaperkasa.odoo.com/web/image/961-9f820b5e/Powder%20Detergent.webp",
    sizes: "25 Kg"
  }
];

const staticAdvantages = [
  {
    id: 1,
    title: "Berpengalaman Sejak 2016",
    description: "Konsisten menghadirkan solusi kebersihan berkualitas selama lebih dari satu dekade.",
    icon: "Calendar"
  },
  {
    id: 2,
    title: "Produksi Terstandarisasi",
    description: "Diproduksi di kawasan industri dengan sistem kerja higienis dan terkontrol.",
    icon: "Factory"
  },
  {
    id: 3,
    title: "Legalitas Lengkap & Resmi",
    description: "Memiliki izin produksi dan izin edar Dinas Kesehatan.",
    icon: "Certificate"
  },
  {
    id: 4,
    title: "Merek Terlindungi HAKI",
    description: "Terdaftar resmi dan memiliki perlindungan Hak Kekayaan Intelektual.",
    icon: "ShieldCheck"
  },
  {
    id: 5,
    title: "Kualitas Andal & Efisien",
    description: "Performa optimal, aman digunakan, dan ekonomis.",
    icon: "Sparkle"
  },
  {
    id: 6,
    title: "Mitra Terpercaya Berbagai Sektor",
    description: "Dipercaya oleh laundry, hotel, rumah sakit, dan rumah tangga.",
    icon: "Handshake"
  }
];

export default function HomePage() {
  const [company, setCompany] = useState(staticCompany);
  const [products, setProducts] = useState(staticProducts);
  const [advantages, setAdvantages] = useState(staticAdvantages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, productsRes, advantagesRes] = await Promise.all([
          axios.get(`${API}/company`).catch(() => ({ data: null })),
          axios.get(`${API}/products`).catch(() => ({ data: null })),
          axios.get(`${API}/advantages`).catch(() => ({ data: null }))
        ]);

        if (companyRes.data) setCompany(companyRes.data);
        if (productsRes.data) setProducts(productsRes.data);
        if (advantagesRes.data) setAdvantages(advantagesRes.data);
      } catch (error) {
        console.log("Using static data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen" data-testid="home-page">
      <Navbar company={company} />
      <main>
        <HeroSection company={company} />
        <AboutSection company={company} />
        <AdvantagesSection advantages={advantages} />
        <ProductsSection products={products} />
        <LocationSection company={company} />
      </main>
      <Footer company={company} />
      <WhatsAppButton whatsapp={company.whatsapp} />
    </div>
  );
}
