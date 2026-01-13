# PlasterPro Ghana - Deployment Guide

This guide will help you deploy your PlasterPro Ghana website and set up all integrations.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Formspree Setup (Forms)](#formspree-setup)
4. [Google Analytics Setup (Optional)](#google-analytics-setup)
5. [Deployment Options](#deployment-options)
6. [Post-Deployment](#post-deployment)

---

## Prerequisites

Before you begin, ensure you have:
- Node.js installed (v18 or higher)
- Git installed
- A GitHub account
- Your website files ready

---

## Environment Setup

### 1. Install Dependencies

```bash
cd plasterpro-main
npm install
```

### 2. Test Locally

```bash
npm run dev
```

Your site should open at `http://localhost:5173`

---

## Formspree Setup

Formspree is a free service that handles form submissions and sends them to your email.

### Step 1: Create Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Click "Sign Up" (Free account allows 50 submissions/month)
3. Verify your email address

### Step 2: Create Forms

#### Contact Form:
1. In Formspree dashboard, click "+ New Form"
2. Name it: **"PlasterPro Contact Form"**
3. Set email destination: `plasterproent@gmail.com`
4. Copy the Form ID (looks like: `xyzabc123`)

#### Meeting Request Form:
1. Click "+ New Form" again
2. Name it: **"PlasterPro Meeting Requests"**
3. Set email destination: `plasterproent@gmail.com`
4. Copy the Form ID

### Step 3: Add Form IDs to Your Project

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_FORMSPREE_CONTACT_FORM_ID=your_contact_form_id_here
VITE_FORMSPREE_MEETING_FORM_ID=your_meeting_form_id_here
```

Example:
```env
VITE_FORMSPREE_CONTACT_FORM_ID=xyzabc123
VITE_FORMSPREE_MEETING_FORM_ID=def456ghi
```

3. Save the file
4. Test your forms locally with `npm run dev`

---

## Google Analytics Setup (Optional)

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Admin" → "Create Property"
3. Fill in:
   - Property name: **PlasterPro Ghana**
   - Time zone: **Ghana**
4. Click "Create" and accept terms

### Step 2: Get Measurement ID

1. In your property, click "Data Streams"
2. Click "+ Add stream" → "Web"
3. Enter website URL (you'll get this after deployment)
4. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### Step 3: Add to Environment

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 4: Install Analytics Script (We'll add this for you)

Create `src/utils/analytics.js`:

```javascript
// Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (measurementId) {
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', measurementId);
  }
};

// Track page views
export const trackPageView = (url) => {
  if (window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};
```

---

## Deployment Options

Choose one platform for deployment. Both are free for static sites!

### Option A: Netlify (Recommended - Easier)

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/plasterpro-ghana.git
git push -u origin main
```

#### Step 2: Deploy on Netlify

1. Go to [https://netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select your repository
5. Build settings (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Advanced" → "New variable" and add:
   - `VITE_FORMSPREE_CONTACT_FORM_ID` = your_contact_form_id
   - `VITE_FORMSPREE_MEETING_FORM_ID` = your_meeting_form_id
   - `VITE_GA_MEASUREMENT_ID` = your_ga_id (if using)
7. Click "Deploy site"

#### Step 3: Configure Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow instructions to point your domain to Netlify

---

### Option B: Vercel

#### Step 1: Push to GitHub (Same as above)

#### Step 2: Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   - `VITE_FORMSPREE_CONTACT_FORM_ID`
   - `VITE_FORMSPREE_MEETING_FORM_ID`
   - `VITE_GA_MEASUREMENT_ID` (optional)
6. Click "Deploy"

---

## Post-Deployment

### 1. Test Your Forms

1. Visit your deployed website
2. Go to the Contact page
3. Fill out and submit the form
4. Check your email (`plasterproent@gmail.com`) for the submission
5. Test the Meeting Request form the same way

### 2. Update Formspree Settings

In Formspree dashboard for each form:
1. Go to "Settings" → "Redirect"
2. Enable "Use custom redirect URL"
3. Leave blank (will stay on same page)
4. Go to "Spam" → Enable spam filter

### 3. Monitor Forms

- Check Formspree dashboard for submissions
- Set up email notifications
- Review spam filter weekly

### 4. Update Google Analytics (if used)

1. Add your live URL to GA4 Data Stream
2. Test tracking by visiting your site
3. Check Real-time reports in GA

---

## Troubleshooting

### Forms Not Submitting

**Error: "Form service not configured"**
- Check that `.env` variables are set correctly
- For Netlify/Vercel: Check environment variables in dashboard
- Make sure form IDs don't have quotes or spaces

**Forms submit but no email received**
- Verify email in Formspree dashboard
- Check spam folder
- Ensure Formspree account is verified

### Build Failures

**"Module not found" errors**
- Run `npm install` to ensure all dependencies are installed
- Check that all import paths are correct

**Environment variables not working**
- In Netlify/Vercel: Redeploy after adding environment variables
- Ensure variable names start with `VITE_` (required for Vite)

---

## Maintenance

### Updating Content

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub:
```bash
git add .
git commit -m "Update content"
git push
```
4. Site will auto-deploy (Netlify/Vercel)

### Monitoring

- **Forms**: Check Formspree dashboard weekly
- **Analytics**: Review Google Analytics monthly
- **Uptime**: Both Netlify and Vercel have 99.9% uptime

---

## Cost Summary

| Service | Free Tier | Upgrade Cost |
|---------|-----------|--------------|
| **Netlify** | 100GB bandwidth/month | $19/month |
| **Vercel** | 100GB bandwidth/month | $20/month |
| **Formspree** | 50 submissions/month | $10/month (1000 submissions) |
| **Google Analytics** | Unlimited | Free |
| **Custom Domain** | N/A | $10-15/year |

**Total Monthly Cost: $0** (Free tier is sufficient for most small businesses)

---

## Support

If you encounter issues:

1. **Formspree**: [formspree.io/support](https://formspree.io/support)
2. **Netlify**: [docs.netlify.com](https://docs.netlify.com)
3. **Vercel**: [vercel.com/docs](https://vercel.com/docs)
4. **General**: Check browser console for errors (F12)

---

## Quick Links

- [Formspree Dashboard](https://formspree.io/forms)
- [Netlify Dashboard](https://app.netlify.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Google Analytics](https://analytics.google.com)

---

## Next Steps

After successful deployment:

1. ✅ Test all forms thoroughly
2. ✅ Share website URL with team
3. ✅ Update social media with new link
4. ✅ Submit sitemap to Google Search Console
5. ✅ Set up regular content updates

**Congratulations! Your PlasterPro Ghana website is live! 🎉**
