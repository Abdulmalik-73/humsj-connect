# Deploy HUMSJ Connect to Render

## 🚀 Quick Deployment Guide

### Prerequisites
- GitHub account with your repository
- Render account (free tier available)
- Firebase project configured

---

## Method 1: Deploy via Render Dashboard (Recommended)

### Step 1: Sign Up / Login to Render
1. Go to [https://render.com](https://render.com)
2. Click **"Get Started"** or **"Sign In"**
3. Sign up with GitHub (recommended for easy integration)

### Step 2: Create New Static Site
1. Click **"New +"** button in the top right
2. Select **"Static Site"**

### Step 3: Connect Your Repository
1. Click **"Connect a repository"**
2. If first time, authorize Render to access your GitHub
3. Find and select: **`Abdulmalik-73/humsj-connect`**
4. Click **"Connect"**

### Step 4: Configure Build Settings

Fill in the following details:

| Field | Value |
|-------|-------|
| **Name** | `humsj-connect` (or any name you prefer) |
| **Branch** | `main` |
| **Root Directory** | Leave empty |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### Step 5: Advanced Settings (Optional)

Click **"Advanced"** and add environment variables if needed:
- Currently, your Firebase config is in the code, so no env vars needed
- For production, consider moving Firebase config to environment variables

### Step 6: Deploy
1. Click **"Create Static Site"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build your project
   - Deploy to a live URL

### Step 7: Wait for Deployment
- First deployment takes 2-5 minutes
- You'll see build logs in real-time
- Once complete, you'll get a URL like: `https://humsj-connect.onrender.com`

---

## Method 2: Deploy via render.yaml (Blueprint)

Your project already has a `render.yaml` file configured!

### Step 1: Go to Render Dashboard
1. Visit [https://dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**

### Step 2: Connect Repository
1. Select your GitHub repository: `Abdulmalik-73/humsj-connect`
2. Render will automatically detect the `render.yaml` file

### Step 3: Review Configuration
The `render.yaml` contains:
```yaml
services:
  - type: web
    name: humsj-external-affairs
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### Step 4: Deploy
1. Click **"Apply"**
2. Render will deploy using the blueprint configuration
3. Your site will be live at: `https://humsj-external-affairs.onrender.com`

---

## 🔥 Deploy Firebase Rules (CRITICAL)

After deploying to Render, you MUST deploy Firebase rules:

### Option 1: Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **humsj-external-affairs**
3. Click **Firestore Database** → **Rules**
4. Copy content from `firestore.rules` file
5. Paste and click **Publish**

### Option 2: Firebase CLI
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy rules
firebase deploy --only firestore:rules
```

---

## 🔧 Post-Deployment Configuration

### 1. Custom Domain (Optional)
1. In Render dashboard, go to your site
2. Click **"Settings"** → **"Custom Domain"**
3. Add your domain (e.g., `humsj.edu.et`)
4. Follow DNS configuration instructions

### 2. Environment Variables (For Production)
Consider moving Firebase config to environment variables:

In Render Dashboard:
1. Go to your site → **"Environment"**
2. Add these variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

Then update `src/lib/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

### 3. Auto-Deploy on Git Push
Render automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```
Render will detect the push and redeploy automatically!

---

## 📊 Monitoring Your Deployment

### View Build Logs
1. Go to Render Dashboard
2. Click on your site
3. Click **"Logs"** tab
4. See real-time build and deployment logs

### Check Deployment Status
- **Building**: Yellow indicator
- **Live**: Green indicator
- **Failed**: Red indicator (check logs)

---

## 🐛 Troubleshooting

### Build Fails
**Error**: `npm install failed`
- **Solution**: Check `package.json` is committed to GitHub
- Run locally: `npm install && npm run build`

**Error**: `Build command failed`
- **Solution**: Verify build command in Render settings
- Should be: `npm install && npm run build`

### Site Shows 404 on Refresh
- **Solution**: Already configured in `render.yaml`
- The rewrite rule handles React Router

### Firebase Connection Issues
- **Solution**: Deploy Firebase rules (see above)
- Check Firebase config in `src/lib/firebase.ts`

### CRUD Operations Not Working
- **Solution**: Deploy Firestore rules
- Go to Firebase Console → Firestore → Rules → Publish

---

## 💰 Render Pricing

### Free Tier (Perfect for this project)
- ✅ Static sites are FREE
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Unlimited bandwidth
- ✅ Auto-deploy from GitHub

### Paid Plans (Optional)
- **Starter**: $7/month - Custom domains, more resources
- **Pro**: $25/month - Priority support, advanced features

---

## 🎯 Deployment Checklist

Before deploying:
- [ ] Code pushed to GitHub
- [ ] `render.yaml` file present
- [ ] Firebase project configured
- [ ] Build tested locally (`npm run build`)

After deploying:
- [ ] Site is live and accessible
- [ ] Deploy Firebase rules
- [ ] Test all features (registration, admin panel)
- [ ] Test CRUD operations
- [ ] Verify form submissions work

---

## 🔗 Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Render Docs**: https://render.com/docs/static-sites
- **Your Repository**: https://github.com/Abdulmalik-73/humsj-connect
- **Firebase Console**: https://console.firebase.google.com

---

## 📞 Support

If you encounter issues:
1. Check Render build logs
2. Verify Firebase rules are deployed
3. Test locally first: `npm run dev`
4. Check browser console for errors

---

## 🎉 Success!

Once deployed, your site will be live at:
- **Render URL**: `https://humsj-external-affairs.onrender.com`
- Or your custom domain if configured

**Deployment time**: 2-5 minutes
**Auto-redeploy**: On every GitHub push
**Cost**: FREE (static site)

---

**Last Updated**: December 24, 2025
**Status**: Ready to Deploy ✅
