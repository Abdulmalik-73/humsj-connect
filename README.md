# HUMSJ External Affairs Website

Official website for Haramaya University Muslim Student Jemea (HUMSJ) External Affairs sector.

## Features

- **Home Page**: Islamic-themed design with hero section and sector overview
- **Sector Pages**: Dedicated pages for Qirat, Charity, and Da'wah sectors
- **Registration System**: Public forms for student registration in each sector
- **Admin Panel**: Password-protected dashboard to view registrations
- **Firebase Integration**: Real-time data storage with Firestore

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Firebase Firestore
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Abdulmalik-73/humsj-connect123.git
cd humsj-connect123
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:8080 in your browser

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/project/humsj-external-affairs/firestore/rules)
2. Copy the rules from `firestore.rules` file
3. Paste and publish the rules

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── home/            # Homepage sections
│   ├── dashboard/       # Registration forms
│   ├── common/          # Reusable components
│   └── ui/              # shadcn/ui components
├── pages/
│   ├── Index.tsx        # Homepage
│   ├── Qirat.tsx        # Qirat sector
│   ├── Charity.tsx      # Charity sector
│   ├── Dawa.tsx         # Da'wah sector
│   ├── Dashboard.tsx    # Public registration
│   └── Admin.tsx        # Admin panel
├── lib/
│   ├── firebase.ts      # Firebase config
│   └── utils.ts         # Utility functions
└── index.css            # Global styles
```

## Contact Information

### Leadership

- **External Affairs Amir**: Mehadi Jemal - +251 938 979 492
- **General Amir**: Musab Abdurahman - +251 925 237 453

### Sector Amirs

- **Qirat Sector**: Mohammed Ahmadu - +251 929 230 120
- **Charity Sector**: Muhajir Mohammed - +251 964 544 620
- **Da'wah Sector**: Ramadan Aliyii - +251 975 309 779

## Admin Access

- **URL**: `/admin`
- **Password**: `humsj2024` (Change before production!)

## Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## Deployment

### Deploy to Render (Recommended)

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for complete step-by-step instructions.

**Quick Steps:**
1. Create account at https://render.com
2. Connect your GitHub repository
3. Configure:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Click "Create Static Site"
5. Your site will be live in 3-5 minutes!

### Deploy to Other Platforms

**Vercel**: https://vercel.com  
**Netlify**: https://netlify.com  
**GitHub Pages**: Requires additional configuration

## License

© 2024 HUMSJ External Affairs. All rights reserved.

## Location

Haramaya University, Ethiopia
