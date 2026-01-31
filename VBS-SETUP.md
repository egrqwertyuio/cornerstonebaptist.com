# VBS Gallery Setup Guide

## Problem
The VBS2025 folder contains 114 media files (1.4GB total) which exceeds GitHub's limits:
- Individual file limit: 100MB
- Recommended repo size: <1GB
- Your videos: 30-36MB each
- Your photos: 500KB-2.5MB each

## Solution: Git LFS (Large File Storage)

### Step 1: Install Git LFS
```bash
# Windows (using Chocolatey)
choco install git-lfs

# Windows (using Scoop)
scoop install git-lfs

# Or download from: https://git-lfs.github.com/
```

### Step 2: Initialize LFS in Your Repo
```bash
cd c:\Users\egorl\OneDrive\Documents\GitHub\cornerstonebaptist.com

# Initialize Git LFS
git lfs install

# The .gitattributes file is already configured!
# It tells Git LFS to handle:
# - All .mp4 and .mov video files
# - All images in assets/VBS2025/
```

### Step 3: Add and Commit Files
```bash
# Check LFS status
git lfs track

# Add the VBS files
git add assets/VBS2025/
git add .gitattributes

# Commit
git commit -m "Add VBS 2025 gallery with Git LFS"

# Push to GitHub
git push origin main
```

### Step 4: Verify LFS is Working
```bash
# Check which files are tracked by LFS
git lfs ls-files

# You should see your VBS media files listed
```

## Alternative Solution: External Hosting

If you prefer not to use Git LFS, you can host media externally:

### Option A: Cloudinary (Free tier: 25GB storage, 25GB bandwidth/month)
1. Sign up at https://cloudinary.com
2. Upload VBS2025 folder
3. Update `script.js` to use Cloudinary URLs

### Option B: Google Drive/Dropbox
1. Upload to cloud storage
2. Make folder publicly accessible
3. Update gallery.json with public links

## Current Setup

The website is already configured to load VBS media automatically!

**How it works:**
1. `script.js` looks for media files in `assets/VBS2025/`
2. It automatically detects images (.jpg, .png) and videos (.mp4)
3. Creates an interactive carousel with all media
4. Supports touch/swipe on mobile

**No code changes needed** - just get the files into GitHub using one of the methods above!

## Quick Start (Recommended)

```bash
# Install Git LFS
git lfs install

# Add and push (files already configured in .gitattributes)
git add .gitattributes assets/VBS2025/
git commit -m "Add VBS 2025 gallery using Git LFS

- 114 media files from VBS 2025
- Photos and videos from church event
- Configured for Git LFS to handle large files"

git push origin main
```

## GitHub LFS Limits

**Free tier includes:**
- 1GB LFS storage
- 1GB bandwidth per month
- Your VBS folder: 1.4GB (slightly over)

**If you exceed limits:**
- Upgrade to GitHub Pro ($4/month) for 50GB storage
- OR use external hosting for videos only
- OR compress media files (see below)

## Optional: Compress Media

To reduce file sizes before upload:

### For Images:
```bash
# Using ImageMagick (install first)
magick mogrify -resize 1920x1080\> -quality 85 assets/VBS2025/*.jpg
```

### For Videos:
```bash
# Using FFmpeg (install first)
for file in assets/VBS2025/*.mp4; do
  ffmpeg -i "$file" -vcodec h264 -crf 28 "compressed_$(basename $file)"
done
```

This could reduce your total size to ~500MB, fitting easily in the free tier!

## Questions?

- **Can I still use the website without LFS?** Yes! The carousel will show a "no media" message
- **Will visitors download all 1.4GB?** No, images/videos load on-demand as users browse
- **Do I need to update any code?** No, everything is already configured

---

**Recommended**: Use Git LFS - it's the simplest solution and integrates perfectly with your existing workflow.
