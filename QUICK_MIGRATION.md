# 🚀 Quick Content Migration

## Option 1: Automated Migration (Recommended)

### Step 1: Get Your Sanity Token
1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API → Tokens**
4. Click **Add API token**
5. Name it "Content Migration"
6. Select **Editor** permissions
7. Copy the token

### Step 2: Run the Migration
```bash
npm run migrate:content
```

The script will:
- ✅ Create Home Page content
- ✅ Create About Page content  
- ✅ Create Site Settings
- ✅ Handle errors gracefully
- ✅ Guide you through the process

## Option 2: Manual Migration

If you prefer to add content manually:

1. **Visit your Sanity Studio**: `http://localhost:3000/studio`
2. **Follow the detailed guide**: Open `CONTENT_MIGRATION_GUIDE.md`
3. **Copy and paste content** from the guide into the appropriate fields

## What Gets Migrated

### ✅ Home Page
- Hero section with headline and CTA
- Statistics (3x Leads, 200% Revenue, 20+ Years)
- Services overview
- Final call-to-action

### ✅ About Page  
- Personal story and background
- Experience and expertise areas
- Philosophy and approach
- Contact information

### ✅ Site Settings
- Basic site information
- Contact details
- Social media links
- Global CTAs
- Footer content
- SEO defaults

## After Migration

1. **Visit the Studio**: `http://localhost:3000/studio`
2. **Add remaining pages**: Services, Pricing, Case Studies, Contact
3. **Create testimonials**: Add client testimonials
4. **Update contact info**: Replace placeholder info with real details
5. **Add images**: Upload your logo and photos

## Troubleshooting

**If the migration fails:**
- Check your Sanity token is correct
- Ensure you have Editor permissions
- Verify your project ID and dataset are correct
- Try the manual migration option

**Need help?**
- Check the detailed guide in `CONTENT_MIGRATION_GUIDE.md`
- The Sanity Studio will show you exactly what fields to fill

---

**Ready to migrate? Run: `npm run migrate:content`** 🚀
