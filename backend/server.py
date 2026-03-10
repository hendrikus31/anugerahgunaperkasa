from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone
import os
import logging
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create FastAPI app
app = FastAPI(title="PT. Anugerah Guna Perkasa API")

# Create router with /api prefix
api_router = APIRouter(prefix="/api")

# Pydantic Schemas
class CompanyResponse(BaseModel):
    id: int
    name: str
    tagline: Optional[str] = None
    description: Optional[str] = None
    founded_year: Optional[int] = None
    address: Optional[str] = None
    whatsapp: Optional[str] = None
    map_coordinates: Optional[str] = None
    logo_url: Optional[str] = None

class ProductResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    sizes: Optional[str] = None
    is_active: bool = True
    sort_order: int = 0

class AdvantageResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None
    sort_order: int = 0

# Static data
company_data = CompanyResponse(
    id=1,
    name="PT. Anugerah Guna Perkasa",
    tagline="Produsen produk kebersihan sejak 2016",
    description="PT. Anugerah Guna Perkasa adalah produsen produk kebersihan sejak 2016 yang melayani kebutuhan laundry, hotel, rumah sakit, dan rumah tangga dengan kualitas terjamin dan legalitas resmi. Seluruh proses produksi dilakukan di kawasan industri dengan izin produksi dan izin edar resmi dari Dinas Kesehatan. Merek kami juga telah terdaftar dan memiliki perlindungan HAKI sebagai bentuk komitmen terhadap profesionalisme dan kepatuhan hukum.",
    founded_year=2016,
    address="Kutawaringin Industrial Park no.113 Kelurahan Jelegong, Kecamatan Kutawaringin, Kabupaten Bandung, Jawa Barat 40911",
    whatsapp="6281122445593",
    map_coordinates="-6.9175,107.5019",
    logo_url="https://anugerahgunaperkasa.odoo.com/web/image/website/1/logo/AnugerahGunaPerkasa?unique=c3a5160"
)

products_data = [
    ProductResponse(
        id=1,
        name="Hand Wash",
        description="Sabun cuci tangan dengan berbagai pilihan aroma, efektif membersihkan dan menjaga kesegaran tangan.",
        category="Personal Care",
        image_url="https://anugerahgunaperkasa.odoo.com/web/image/895-7f29bc79/Hand_Wash-removebg-preview.webp",
        sizes="5 Ltr, 20 Ltr",
        sort_order=1
    ),
    ProductResponse(
        id=2,
        name="Dish Soap",
        description="Sabun cuci piring yang efektif mengangkat lemak dan sisa makanan, menghasilkan peralatan makan bersih dan higienis.",
        category="Household",
        image_url="https://anugerahgunaperkasa.odoo.com/web/image/892-b6ac34d7/Dish_Soap-removebg-preview.webp",
        sizes="5 Ltr, 20 Ltr",
        sort_order=2
    ),
    ProductResponse(
        id=3,
        name="Blue Liquid Detergent",
        description="Deterjen cair konsentrat dengan formula low foam yang efektif mengangkat noda membandel dan menjadikan hasil cucian menjadi bersih dan cerah.",
        category="Laundry",
        image_url="https://anugerahgunaperkasa.odoo.com/web/image/935-3f361f0c/Blue_Liquid_Detergent-removebg-preview.webp",
        sizes="5 Ltr, 20 Ltr",
        sort_order=3
    ),
    ProductResponse(
        id=4,
        name="Green Liquid Detergent",
        description="Deterjen cair low foam yang efektif membersihkan noda dengan hasil bersih dan cerah.",
        category="Laundry",
        image_url="https://anugerahgunaperkasa.odoo.com/web/image/891-13e8b5ec/Green_Liquid_Detergent-removebg-preview.webp",
        sizes="5 Ltr, 20 Ltr",
        sort_order=4
    ),
    ProductResponse(
        id=5,
        name="Perfume",
        description="Parfum laundry konsentrat tinggi dengan beragam varian aroma yang memberikan keharuman tahan lama. Digunakan setelah proses setrika untuk hasil akhir yang lebih segar dan profesional.",
        category="Laundry",
        image_url="https://anugerahgunaperkasa.odoo.com/web/image/890-91966dac/Perfume-removebg-preview.webp",
        sizes="5 Ltr, 20 Ltr",
        sort_order=5
    ),
    ProductResponse(
        id=6,
        name="Softener",
        description="Pelembut pakaian yang memberikan kelembutan maksimal dan keharuman segar tahan lama.",
        category="Laundry",
        image_url="https://anugerahgunaperkasa.odoo.com/web/image/893-cf4adbd5/Softener-removebg-preview.webp",
        sizes="5 Ltr, 20 Ltr",
        sort_order=6
    ),
    ProductResponse(
        id=7,
        name="Powder Detergent",
        description="Deterjen bubuk low foam dengan daya bersih optimal untuk mengangkat noda secara efektif tanpa merusak serat kain.",
        category="Laundry",
        image_url="https://anugerahgunaperkasa.odoo.com/web/image/961-9f820b5e/Powder%20Detergent.webp",
        sizes="25 Kg",
        sort_order=7
    )
]

advantages_data = [
    AdvantageResponse(
        id=1,
        title="Berpengalaman Sejak 2016",
        description="Konsisten menghadirkan solusi kebersihan berkualitas selama lebih dari satu dekade.",
        icon="Calendar",
        sort_order=1
    ),
    AdvantageResponse(
        id=2,
        title="Produksi Terstandarisasi",
        description="Diproduksi di kawasan industri dengan sistem kerja higienis dan terkontrol.",
        icon="Factory",
        sort_order=2
    ),
    AdvantageResponse(
        id=3,
        title="Legalitas Lengkap & Resmi",
        description="Memiliki izin produksi dan izin edar Dinas Kesehatan.",
        icon="Certificate",
        sort_order=3
    ),
    AdvantageResponse(
        id=4,
        title="Merek Terlindungi HAKI",
        description="Terdaftar resmi dan memiliki perlindungan Hak Kekayaan Intelektual.",
        icon="ShieldCheck",
        sort_order=4
    ),
    AdvantageResponse(
        id=5,
        title="Kualitas Andal & Efisien",
        description="Performa optimal, aman digunakan, dan ekonomis.",
        icon="Sparkle",
        sort_order=5
    ),
    AdvantageResponse(
        id=6,
        title="Mitra Terpercaya Berbagai Sektor",
        description="Dipercaya oleh laundry, hotel, rumah sakit, dan rumah tangga.",
        icon="Handshake",
        sort_order=6
    )
]

# API Routes
@api_router.get("/")
async def root():
    return {"message": "PT. Anugerah Guna Perkasa API", "status": "online"}

@api_router.get("/company", response_model=CompanyResponse)
async def get_company():
    return company_data

@api_router.get("/products", response_model=List[ProductResponse])
async def get_products():
    return products_data

@api_router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int):
    from fastapi import HTTPException
    for product in products_data:
        if product.id == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found")

@api_router.get("/advantages", response_model=List[AdvantageResponse])
async def get_advantages():
    return advantages_data

# Include router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("PT. Anugerah Guna Perkasa API started successfully")
    logger.info("Note: Using static data (MariaDB not available in this environment)")
