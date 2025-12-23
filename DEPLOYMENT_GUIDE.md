# Deployment Guide - Render.com

## Complete Step-by-Step Guide to Deploy HUMSJ External Affairs Website

### Prerequisites
- GitHub account with your repository: https://github.com/Abdulmalik-73/humsj-connect.git
- Render.com account (free tier available)
- Firebase project already configured

---

## Step 1: Create Render Account

1. Go to: **https://render.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"** (recommended)
4. Authorize Render to access your GitHub account

---

## Step 2: Create New Static Site

1. After logging in, click **"New +"** button (top right)
2. Select **"Static Site"**
3. Connect your GitHub repository:
   - If not connected, click **"Connect GitHub"**
   - Search for: `humsj-connect`
   - Click **"Connect"** next to your repository

---

## Step 3: Configure Your Static Site

Fill in the following settings:

### Basic Settings:
- **Name**: `humsj-external-affairs` (or any name you prefer)
- **Branch**: `main`
- **Root Directory**: Leave empty (or type `.` if required)

### Build Settings:
- **Build Command**: 
  ```
  npm install && npm run build
  ```

- **Publish Directory**: 
  ```
  dist
  ```

### Advanced Settings (Click "Advanced"):
- **Auto-Deploy**: Yes (enabled by default)
- **Node Version**: Leave default or set to `18` or higher

---

## Step 4: Deploy

1. Click **"Create Static Site"** button at the bottom
2. Render will start building your site automatically
3. Wait 3-5 minutes for the build to complete
4. You'll see build logs in real-time

---

## Step 5: Get Your Live URL

Once deployment is complete:
1. You'll see a green **"Live"** status
2. Your site URL will be shown at the top (e.g., `https://humsj-external-affairs.onrender.com`)
3. Click the URL to view your live website!

---

## Step 6: Configure Custom Domain (Optional)

If you have a custom domain:

1. Go to your site's **Settings** tab
2. Scroll to **"Custom Domain"** section
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `humsj.edu.et`)
5. Follow DNS configuration instructions provided by Render

---

## Step 7: Verify Firebase Connection

1. Open your deployed website
2. Go to the Dashboard page
3. Try submitting a test registration
4. Check Firebase Console to verify data is saved
5. Go to Admin panel (password: `humsj2024`) to view submissions

---

## Important Notes

### ⚠️ Before Going Live:

1. **Change Admin Password**:
   - Edit `src/pages/Admin.tsx`
   - Change the password from `humsj2024` to something secure
   - Commit and push changes

2. **Update Firebase Rules** (if not done):
   - Go to: https://console.firebase.google.com/project/humsj-external-affairs/firestore/rules
   - Copy rules from `firestore.rules` file
   - Click "Publish"

3. **Test Everything**:
   - Test all pages load correctly
   - Test registration forms
   - Test admin panel
   - Test on mobile devices

---

## Troubleshooting

### Build Failed?
- Check build logs in Render dashboard
- Verify `package.json` has correct scripts
- Ensure all dependencies are listed

### Site Shows 404 Error?
- Verify publish directory is set to `dist`
- Check that `render.yaml` is in repository root
- Ensure routes are configured for SPA

### Forms Not Working?
- Verify Firebase rules are published
- Check browser console for errors
- Verify Firebase config in `src/lib/firebase.ts`

### Blank Page After Deployment?
- Check browser console for errors
- Verify build completed successfully
- Check that all assets are loading (no 404s)

---

## Automatic Deployments

Every time you push to GitHub:
1. Render automatically detects changes
2. Rebuilds your site
3. Deploys the new version
4. Usually takes 3-5 minutes

To disable auto-deploy:
- Go to Settings → Build & Deploy
- Toggle off "Auto-Deploy"

---

## Free Tier Limitations

Render's free tier includes:
- ✅ Unlimited static sites
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Automatic deployments
- ⚠️ Sites may spin down after inactivity (static sites stay active)

---

## Alternative: Deploy with Vercel or Netlify

If you prefer other platforms:

### Vercel:
1. Go to: https://vercel.com
2. Import your GitHub repository
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

### Netlify:
1. Go to: https://netlify.com
2. Import your GitHub repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

---

## Your Deployment Checklist

- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Deploy site
- [ ] Test live URL
- [ ] Verify Firebase connection
- [ ] Test registration forms
- [ ] Test admin panel
- [ ] Change admin password
- [ ] Share live URL with team

---

## Support

For deployment issues:
- **Render Docs**: https://render.com/docs/static-sites
- **Render Community**: https://community.render.com

For project issues:
- **External Affairs Amir**: Mehadi Jemal - +251 938 979 492
- **General Amir**: Musab Abdurahman - +251 925 237 453

---

## Your Live URL

After deployment, your website will be available at:
```
https://humsj-external-affairs.onrender.com
```
(or your custom domain if configured)

---

Good luck with your deployment! 🚀
