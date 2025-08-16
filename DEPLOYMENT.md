# 🚀 Deployment Guide - Nahornyi AILab

## DigitalOcean App Platform - Static Site Deployment

### Prerequisites

1. **DigitalOcean Account** 
2. **GitHub Repository** with your code
3. **Custom Domain** (optional) - e.g., nahornyi.ai

### DigitalOcean App Platform Setup

1. **Create Static Site:**
   - Login to DigitalOcean
   - Go to Apps → Create App
   - Choose "GitHub" as source
   - Select your repository `nahornyi-ailab-landing`
   - Select branch: `main`

2. **Configure Build Settings:**
   - Type: **Static Site**
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Environment: Node.js

3. **Add Custom Domain (optional):**
   - In App settings → Domains
   - Add `nahornyi.ai` and `www.nahornyi.ai`
   - Follow DNS configuration instructions

4. **DNS Configuration for Custom Domain:**
   ```
   # Point to DigitalOcean App Platform
   A record: @ → [App Platform IP will be provided]
   CNAME record: www → [App Platform domain will be provided]
   ```

### Local Development

```bash
# Build and test locally
npm run build
docker build -t nahornyi-ailab .
docker run -p 3000:3000 nahornyi-ailab

# Or use the deployment script
./deploy.sh
```

### SSL Setup with Let's Encrypt

```bash
# On your server
apt install certbot
certbot certonly --standalone -d nahornyi.ai -d www.nahornyi.ai

# Copy certificates to SSL directory
mkdir -p ssl
cp /etc/letsencrypt/live/nahornyi.ai/fullchain.pem ssl/
cp /etc/letsencrypt/live/nahornyi.ai/privkey.pem ssl/

# Setup auto-renewal
crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Production Deployment

1. **Push to main branch** - triggers automatic deployment
2. **Monitor deployment** in GitHub Actions
3. **Check application** at https://nahornyi.ai

### Environment Variables

Add to your server or Docker container:

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Monitoring

```bash
# Check container status
docker ps

# View logs
docker logs nahornyi-ailab

# Monitor resources
docker stats

# Update application
git pull origin main
./deploy.sh
```

### Troubleshooting

#### Container won't start
```bash
docker logs nahornyi-ailab
```

#### SSL issues
```bash
certbot certificates
certbot renew --dry-run
```

#### Performance issues
```bash
# Check server resources
htop
df -h
docker system df
```

### Manual Deployment

If automatic deployment fails:

```bash
# On your server
git clone https://github.com/your-username/nahornyi-ailab-landing.git
cd nahornyi-ailab-landing
./deploy.sh
```

---

## 🎯 Quick Commands

```bash
# Build only
docker build -t nahornyi-ailab .

# Run with custom port
docker run -p 8080:3000 nahornyi-ailab

# Run with environment variables
docker run -e NODE_ENV=production -p 3000:3000 nahornyi-ailab

# Stop all
docker stop $(docker ps -q)

# Clean everything
docker system prune -a
```

Made with ❤️ by Nahornyi AILab
