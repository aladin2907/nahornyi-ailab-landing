# 🚀 Quick Deploy to DigitalOcean App Platform

## 3-Step Deploy Process

### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: ready for DigitalOcean App Platform deploy"
git push origin main
```

### Step 2: Create App on DigitalOcean
1. Go to https://cloud.digitalocean.com/apps
2. Click **"Create App"**
3. Choose **GitHub** as source
4. Select repository: `nahornyi-ailab-landing`
5. Branch: `main`

### Step 3: Configure Static Site
- **Type**: Static Site ✅
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Environment**: Node.js

### ✨ That's it!

Your site will be live at: `https://your-app-name.ondigitalocean.app`

## Custom Domain (Optional)
1. In App → Settings → Domains
2. Add `nahornyi.ai`
3. Update DNS records as shown in DigitalOcean

## Features Ready 🎯
✅ Static Next.js export  
✅ Neural network animations  
✅ Multi-language support (EN/RU/ES/UK)  
✅ Responsive design  
✅ Optimized for production  
✅ Auto-deploy from GitHub  

## Build Details
- Output: Static files in `/out`
- Size: ~144KB first load
- Performance: Optimized with Three.js
- SEO: Meta tags and OG configured

Made with ❤️ by Nahornyi AILab
