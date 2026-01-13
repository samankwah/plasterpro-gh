# PlasterPro Ghana - Official Website

Professional ceiling and wall finishing services website for PlasterPro Ghana, based in East Legon Hills, Accra.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see your site.

## ✨ Features

- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Modern UI** - Built with React 19 + TailwindCSS 4
- ✅ **Smooth Animations** - Framer Motion for elegant transitions
- ✅ **Contact Forms** - Integrated with Formspree for form submissions
- ✅ **Blog System** - Built-in blog with rich content support
- ✅ **WhatsApp Integration** - Direct customer communication
- ✅ **Google Maps** - Embedded location map
- ✅ **SEO Optimized** - Meta tags and semantic HTML
- ✅ **Fast Loading** - Optimized with Vite bundler

## 📋 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section with services overview |
| Services | `/services` | Detailed service offerings |
| About Us | `/about-us` | Company history and team |
| Projects | `/projects` | Portfolio showcase |
| Blog | `/blogpage` | Articles and updates |
| Contact | `/contact` | Contact form and information |
| Installation Info | `/installation` | Service details and pricing |

## 🔧 Configuration

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
# Formspree Form IDs (required for forms to work)
VITE_FORMSPREE_CONTACT_FORM_ID=your_id_here
VITE_FORMSPREE_MEETING_FORM_ID=your_id_here

# Google Analytics (optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Get Formspree IDs

1. Sign up at [https://formspree.io](https://formspree.io) (free)
2. Create two forms: "Contact Form" and "Meeting Request"
3. Copy the form IDs to your `.env` file

**See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed setup instructions.**

## 📦 Tech Stack

- **Framework**: React 19.0.0
- **Build Tool**: Vite 6.1.0
- **Styling**: TailwindCSS 4.0.6
- **Animations**: Framer Motion 12.4.3
- **Routing**: React Router DOM 7.2.0
- **Icons**: Lucide React, React Icons, Heroicons
- **Forms**: Formspree Integration
- **Maps**: Google Maps React

## 🚀 Deployment

### Netlify (Recommended)

1. Push code to GitHub
2. Connect repository to Netlify
3. Add environment variables
4. Deploy!

### Vercel

```bash
npm i -g vercel
vercel
```

**Full deployment instructions**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📞 Contact Information

- **Phone**: +233 249 718 356 / +233 244 493 6551
- **Email**: plasterproent@gmail.com
- **Location**: East Legon Hills, Accra, Ghana
- **WhatsApp**: [+233 249 718 356](https://wa.me/233249718356)

## 📁 Project Structure

```
plasterpro-main/
├── src/
│   ├── assets/          # Images, videos, media files
│   ├── components/      # Reusable React components
│   ├── pages/           # Page components
│   │   └── home/
│   │       └── sections/  # Homepage sections
│   ├── layouts/         # Layout wrappers
│   ├── App.jsx          # Main app with routes
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── .env                 # Environment variables (not in git)
├── .env.example         # Example environment file
├── netlify.toml         # Netlify configuration
├── vercel.json          # Vercel configuration
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Available Scripts

- `npm run dev` - Start development server at http://localhost:5173
- `npm run build` - Build for production (outputs to `/dist`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🐛 Troubleshooting

### Forms not working?
- Check that `.env` file has correct Formspree IDs
- Verify Formspree forms are active
- Check browser console for errors

### Build failing?
- Run `npm install` to update dependencies
- Clear `node_modules` and reinstall
- Check Node.js version (requires v18+)

### Styles not loading?
- Run `npm run dev` to restart dev server
- Clear browser cache
- Check Tailwind config

## 📄 License

© 2024 PlasterPro Ghana. All rights reserved.

## 🤝 Support

For technical issues or questions:
1. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Review browser console for errors (F12)
3. Contact development team

---

**Built with ❤️ for PlasterPro Ghana**

For deployment help, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
