# WIC2025 Website

Official website for the World Investment Competition 2025 (WIC2025) - The Investment Olympics.

## 🚀 Quick Start

The development server is already running! Visit [http://localhost:3000](http://localhost:3000) to see your website.

## 📁 Project Structure

```
wic2025-website/
├── components/
│   ├── Header.tsx              # Fixed header with smooth scroll
│   ├── Footer.tsx              # Footer with quick links
│   └── sections/               # All page sections
│       ├── HeroSection.tsx     # Hero with CTA
│       ├── AboutSection.tsx    # What is WIC?
│       ├── ResultsSection.tsx  # WIC2024 results
│       ├── DetailsSection.tsx # Competition details & rules
│       ├── PrizesSection.tsx  # Prizes & awards
│       ├── SponsorsSection.tsx # Our partners
│       ├── CTASection.tsx      # Register CTA
│       └── ContactSection.tsx  # Contact form
├── src/app/
│   ├── layout.tsx              # Global layout & metadata
│   ├── page.tsx                # Main page (single-page design)
│   └── about-us/
│       └── page.tsx            # About JPSI (Coming Soon)
└── public/images/              # Image assets
    └── sponsors/               # Sponsor logos
```

## 🎨 Features Implemented

### ✅ Core Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Scrolling**: Native CSS smooth scroll between sections
- **Fixed Header**: Transparent header that becomes solid on scroll
- **Mobile Menu**: Hamburger menu for mobile devices
- **Contact Form**: Functional contact form (Phase 1: Google Forms integration)
- **SEO Optimized**: Proper metadata and semantic HTML

### ✅ Sections

1. **Hero**: Full-screen hero with CTA button
2. **About**: WIC overview with highlight cards
3. **Results**: WIC2024 achievements and statistics
4. **Details**: Competition timeline and rules
5. **Prizes**: Award categories and prize information
6. **Sponsors**: Partner logos and descriptions
7. **CTA**: Registration call-to-action
8. **Contact**: Contact form with validation

### ✅ Technical Stack

- **Next.js 15** with App Router
- **TypeScript** (strict mode)
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive design** for all devices

## 🖼️ Images Needed

To complete the website, you need to add these images to `public/images/`:

### Required Images

- `hero-background.jpg` - Hero section background (high quality, investment theme)
- `wic2024-champion.jpg` - WIC2024 champion team photo

### Sponsor Logos (in `public/images/sponsors/`)

- `tradingview-logo.png`
- `interactive-brokers-logo.png`
- `webull-logo.png`

## 🚀 Deployment

### GitHub Setup

1. Create a new repository on GitHub named `wic2025-website`
2. Push your code to the repository

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push to main branch
3. Your site will be available at `https://wic2025-website.vercel.app`

## 📝 Next Steps

### Phase 1 (Current)

- ✅ All core sections implemented
- ✅ Responsive design
- ✅ Basic animations
- ✅ Contact form (simulated)

### Phase 2 (Future Enhancements)

- [ ] Real contact form integration (Resend API)
- [ ] Image optimization
- [ ] Advanced animations
- [ ] Performance optimization
- [ ] Analytics integration

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:

- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🎯 Key Features

- **Single Page Design**: All content on one page with smooth scrolling
- **Modern UI**: Clean, professional design with finance theme
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Optimized images and fast loading
- **SEO Ready**: Proper meta tags and structure

## 📞 Contact

For questions about the website implementation, refer to the original requirements document.

---

**WIC2025** - The Investment Olympics 🏆
