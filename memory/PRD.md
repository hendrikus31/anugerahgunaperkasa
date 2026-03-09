# PRD: PT. Anugerah Guna Perkasa - Company Profile Website

## Original Problem Statement
Build a company profile website for an Indonesian detergent company. Take all data and images from https://anugerahgunaperkasa.odoo.com. Use MariaDB database, no contact form, WhatsApp button only, product images without cropping.

## User Choices
- Language: Bahasa Indonesia
- Pages: Beranda, Tentang Kami, Produk, Lokasi
- Style: Colorful Clean and Fresh
- Contact: WhatsApp button only
- Database: MariaDB (using static data as MariaDB not available in environment)

## User Personas
1. **B2B Customers**: Laundry businesses, hotels, hospitals looking for bulk cleaning products
2. **Small Business Owners**: Local laundry operators seeking quality detergent suppliers
3. **Household Buyers**: End consumers looking for household cleaning products

## Core Requirements (Static)
- Professional company profile website
- Indonesian language content
- 7 product showcase with original images
- Company advantages section
- Location with Google Maps
- WhatsApp integration for inquiries

## What's Been Implemented (January 2026)
- [x] Hero section with company branding and animated product showcase
- [x] About Us section with company description and statistics
- [x] 6 company advantages with icons
- [x] 7 products showcase with category filtering (Laundry, Household, Personal Care)
- [x] Location section with Google Maps embed
- [x] WhatsApp floating button with pre-filled message
- [x] Responsive navigation with smooth scrolling
- [x] Footer with company info and links
- [x] Backend API with static data endpoints
- [x] Framer-motion animations throughout

## Architecture
- **Frontend**: React 19 with Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: FastAPI with static data (MariaDB integration ready but not active)
- **Fonts**: Outfit (headings), Inter (body)
- **Colors**: Ocean Blue (#0284c7), Emerald (#10b981)

## Prioritized Backlog
### P0 (Critical) - Completed
- Hero section ✓
- Products section ✓
- WhatsApp button ✓
- Location section ✓

### P1 (Important) - Future
- Actual MariaDB integration when database is available
- Admin panel for content management
- Product detail pages

### P2 (Nice to have)
- Multi-language support (English)
- Product catalog PDF download
- Testimonials section
- Partner/client logos section

## Next Tasks
1. Connect to actual MariaDB when available
2. Add admin dashboard for content management
3. Add product detail modal/pages
4. Add testimonials section
5. SEO optimization
