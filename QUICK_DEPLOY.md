# Quick Deploy Guide - 5 Minutes to Live! 🚀

## Option 1: Render.com (Easiest - Recommended)

### Step 1: Sign Up
Go to: **https://render.com/register**
- Click "Sign up with GitHub"
- Authorize Render

### Step 2: Create Static Site
1. Click **"New +"** → **"Static Site"**
2. Find and select: `humsj-connect`
3. Click **"Connect"**

### Step 3: Configure
```
Name: humsj-external-affairs
Branch: main
Build Command: npm install && npm run build
Publish Directory: dist
```

### Step 4: Deploy
- Click **"Create Static Site"**
- Wait 3-5 minutes
- Done! Your site is live! 🎉

**Your URL**: `https://humsj-external-affairs.onrender.com`

---

## Option 2: Vercel (Alternative)

### Step 1: Sign Up
Go to: **https://vercel.com/signup**
- Sign up with GitHub

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import `humsj-connect` repository
3. Click **"Import"**

### Step 3: Configure
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

### Step 4: Deploy
- Click **"Deploy"**
- Wait 2-3 minutes
- Done! 🎉

**Your URL**: `https://humsj-connect.vercel.app`

---

## Option 3: Netlify (Alternative)

### Step 1: Sign Up
Go to: **https://app.netlify.com/signup**
- Sign up with GitHub

### Step 2: Import Project
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select `humsj-connect` repository

### Step 3: Configure
```
Build command: npm run build
Publish directory: dist
```

### Step 4: Deploy
- Click **"Deploy site"**
- Wait 2-3 minutes
- Done! 🎉

**Your URL**: `https://humsj-connect.netlify.app`

---

## After Deployment Checklist

✅ Visit your live URL  
✅ Test all pages (Home, Qirat, Charity, Da'wah, Dashboard, Admin)  
✅ Test registration form  
✅ Check Firebase data is saving  
✅ Test admin panel (password: `humsj2024`)  
✅ Test on mobile device  
✅ Share URL with team!  

---

## Need Help?

**Full Guide**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Contact**:
- Mehadi Jemal - +251 938 979 492
- Musab Abdurahman - +251 925 237 453

---

## 🎯 Recommended: Use Render

Why Render?
- ✅ Free forever for static sites
- ✅ Automatic SSL (HTTPS)
- ✅ Global CDN
- ✅ Auto-deploy on git push
- ✅ Easy custom domain setup
- ✅ Great for React/Vite apps

**Start here**: https://render.com/register
