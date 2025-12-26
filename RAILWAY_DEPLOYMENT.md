# Railway Deployment Guide for Physio At Your Doorstep

This guide will help you deploy your physiotherapy website to Railway.app, a platform designed for full-stack applications with databases.

## Prerequisites

1. A Railway.app account (sign up at https://railway.app)
2. Your GitHub repository connected to Railway
3. A MySQL database (Railway provides this)

## Step-by-Step Deployment

### 1. Create a New Project on Railway

1. Go to https://railway.app and log in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository: `adonisarun123/physioatyourdoorstep`
5. Railway will automatically detect the configuration from `railway.json`

### 2. Add MySQL Database

1. In your Railway project dashboard, click "+ New"
2. Select "Database" → "Add MySQL"
3. Railway will create a MySQL database and provide connection details
4. The `DATABASE_URL` environment variable will be automatically set

### 3. Configure Environment Variables

Click on your service → "Variables" tab and add the following:

#### Required Environment Variables

```
NODE_ENV=production
PORT=3000

# Database (automatically set by Railway MySQL service)
DATABASE_URL=mysql://user:password@host:port/database

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-here-change-this

# Manus OAuth (if using Manus authentication)
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
OWNER_OPEN_ID=your-owner-open-id
OWNER_NAME=Your Name

# Manus Built-in APIs (optional, for advanced features)
BUILT_IN_FORGE_API_URL=your-forge-api-url
BUILT_IN_FORGE_API_KEY=your-forge-api-key
VITE_FRONTEND_FORGE_API_KEY=your-frontend-forge-key
VITE_FRONTEND_FORGE_API_URL=your-frontend-forge-url

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=your-analytics-endpoint
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# Google Analytics (optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Website Branding
VITE_APP_TITLE=Physio At Your Doorstep
VITE_APP_LOGO=/logo.webp
```

#### How to Generate JWT_SECRET

Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Run Database Migrations

After deployment, you need to push your database schema:

1. In Railway dashboard, click on your service
2. Go to "Settings" → "Deploy Triggers"
3. Or use Railway CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Run migrations
railway run pnpm db:push
```

### 5. Seed Initial Data

After migrations, seed your database with initial content:

```bash
railway run node seed-db.mjs
```

This will populate:
- 10 physiotherapy services
- 23 location pages
- 9 categories
- Initial blog structure

### 6. Configure Custom Domain (Optional)

1. In Railway dashboard, go to your service
2. Click "Settings" → "Domains"
3. Click "Generate Domain" for a free Railway domain
4. Or add your custom domain (physioatyourdoorstep.com):
   - Click "Custom Domain"
   - Enter your domain
   - Add the provided CNAME record to your DNS settings

### 7. Monitor Deployment

1. Click on "Deployments" tab to see build logs
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, click on the generated URL to view your site

## Troubleshooting

### Build Fails

**Issue:** Build command fails
**Solution:** Check the build logs in Railway dashboard. Common issues:
- Missing environment variables
- Database connection errors
- Node version mismatch

### Database Connection Errors

**Issue:** Cannot connect to database
**Solution:**
- Ensure MySQL service is running in Railway
- Check that `DATABASE_URL` is set correctly
- Verify database migrations have been run

### Application Won't Start

**Issue:** Deployment succeeds but site doesn't load
**Solution:**
- Check application logs in Railway dashboard
- Ensure `PORT` environment variable is set to 3000
- Verify all required environment variables are configured

### Static Assets Not Loading

**Issue:** Images, CSS, or JS files return 404
**Solution:**
- Check that build completed successfully
- Verify `client/public` directory contains all assets
- Check browser console for specific missing files

## Post-Deployment Tasks

### 1. Test All Features

- ✅ Homepage loads correctly
- ✅ All service pages accessible
- ✅ All location pages accessible
- ✅ Blog pages working
- ✅ Booking form submits successfully
- ✅ Contact form submits successfully
- ✅ Navigation works on all pages

### 2. SEO Configuration

- Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- Verify robots.txt is accessible: `https://yourdomain.com/robots.txt`
- Test structured data with Google Rich Results Test

### 3. Analytics Setup

- Add your Google Analytics Measurement ID to environment variables
- Verify tracking is working in Google Analytics dashboard
- Set up conversion goals for booking and contact forms

### 4. Performance Optimization

- Enable Railway's CDN for static assets
- Monitor application performance in Railway dashboard
- Set up health checks and alerts

## Updating Your Deployment

When you push changes to your GitHub repository:

1. Railway automatically detects the changes
2. Triggers a new build
3. Deploys the updated version
4. Zero-downtime deployment

Or manually trigger a deployment:
```bash
railway up
```

## Cost Estimation

Railway pricing (as of 2024):
- **Hobby Plan**: $5/month
  - 500 hours of usage
  - Perfect for small websites
  
- **Pro Plan**: $20/month
  - Unlimited usage
  - Better for production sites

MySQL database is included in both plans.

## Support

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/adonisarun123/physioatyourdoorstep/issues

## Alternative: Manus Built-in Hosting

If Railway doesn't meet your needs, remember that Manus provides built-in hosting:
- Already configured and tested
- Includes database and domain support
- No additional configuration needed
- Just click "Publish" in the Management UI

---

**Need Help?** If you encounter any issues during deployment, check the Railway logs first, then refer to the troubleshooting section above.
