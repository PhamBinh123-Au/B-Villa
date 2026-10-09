# Serene Da Nang Villa Collection 🌴

An ultra-smooth, luxury villa showcase and booking inquiry web application built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

Includes a dedicated **Host Admin Dashboard** (`/admin`) to manage booking inquiries and contact guests directly via WhatsApp or phone.

---

## 🚀 Quick Start (Local Development)

1. **Install dependencies** (already installed in this directory):
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   - **Public Website:** [http://localhost:3000](http://localhost:3000)
   - **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin) *(Default passcode: `admin123`)*

---

## ⚙️ Easy Customization (Single File)

You can customize the brand name, contact numbers, email, WhatsApp link, social media, and admin passcode in one single file:

📁 **`src/config/siteConfig.ts`**

```typescript
export const siteConfig = {
  name: "Serene Da Nang Villa Collection",
  tagline: "Curated Coastal Sanctuaries in Da Nang",
  contact: {
    phone: "+84 905 123 456",
    whatsapp: "https://wa.me/84905123456",
    email: "reservations@serenedanangvillas.com",
    address: "Son Tra & Ngu Hanh Son Districts, Da Nang City, Vietnam",
  },
  admin: {
    passcode: "admin123", // Set your preferred secret passcode
  },
  // ...
};
```

---

## 📸 The 4 Featured Villas Included

- **B1 Villa • 4 Bedrooms** — Thanh Vinh 3, Son Tra District, Da Nang
- **B2 Villa • 4 Bedrooms** — Nuoc Man 3, Ngu Hanh Son District, Da Nang
- **B3 Villa • 2 Bedrooms** — Nuoc Man 7, Ngu Hanh Son District, Da Nang
- **B4 Villa • 4 Bedrooms** — Thanh Vinh 2, Son Tra District, Da Nang

All photos are stored in `public/images/villas/`.

---

## 🌐 Deploy to GitHub & Vercel (Free & Live in 2 Minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Luxury villa showcase & admin portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Import your GitHub repository.
4. Click **"Deploy"**. Vercel will automatically build and assign you a live domain (e.g. `https://your-villa-site.vercel.app`).
