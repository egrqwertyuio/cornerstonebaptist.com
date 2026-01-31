# Cornerstone Baptist Church Website

A modern, professional, and responsive website for Cornerstone Baptist Church in Butler, KY.

## 🌟 Features

### Multi-Page Structure
- **Home** - Welcoming landing page with pastor's message and quick links
- **About Us** - Mission, beliefs, pastor bio, and church history
- **Ministries** - Youth, VBS, Children's, Operation Christmas Child, and Prison Ministry
- **Sermons** - Video sermons, teaching series, and online worship options
- **Events** - Upcoming events, VBS gallery, and church life photos
- **Contact** - Location map, contact form, and visitor information

### Design Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern animations using AOS (Animate On Scroll)
- ✅ Interactive carousel for VBS photos
- ✅ Smooth scrolling navigation
- ✅ Professional color scheme (blue & gold)
- ✅ Clean typography with EB Garamond and Inter fonts
- ✅ Accessibility features included
- ✅ Fast loading with optimized images

### Interactive Elements
- Mobile-friendly hamburger menu
- Scroll-to-top button
- Active page highlighting in navigation
- Hover effects on cards and buttons
- Touch/swipe support for image carousel
- Parallax scrolling effects
- Form validation

## 📁 File Structure

```
cornerstonebaptist.com/
├── index.html              # Homepage
├── about.html              # About Us page
├── ministries.html         # Ministries page
├── sermons.html            # Sermons page
├── events.html             # Events & Gallery page
├── contact.html            # Contact page
├── style.css               # Main stylesheet
├── script.js               # JavaScript functionality
├── build-gallery.js        # Gallery builder utility
├── assets/
│   ├── images/
│   │   ├── logo.png        # Church logo
│   │   ├── logo2.png       # Alternate logo
│   │   ├── chapel.png      # Chapel interior
│   │   └── parking.png     # Church exterior
│   ├── gallery.js
│   ├── gallery.json
│   └── vbs.js
└── README                  # Original README
```

## 🚀 Getting Started

### 1. Local Development
Simply open `index.html` in a web browser to view the site locally.

For a better development experience with live reload:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (install http-server globally first)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### 2. Customization Guide

#### Update Church Information
Edit the following in all HTML files:
- Church name and address
- Service times
- Phone number and email
- Social media links

#### Add Your Logo
- Replace `assets/images/logo.png` with your church logo (recommended size: 200x200px)
- Ensure the logo is transparent PNG for best results

#### Update Images
- Replace placeholder images in `assets/images/` with your own photos
- Recommended image formats: JPG, PNG, WebP
- Optimize images before upload (use tools like TinyPNG or ImageOptim)

#### Add VBS Photos/Videos
1. Create folder: `assets/images/VBS2025/`
2. Add your photos and videos to this folder
3. Update `script.js` - find the `vbsFiles` array around line 91:
   ```javascript
   const vbsFiles = [
     '20250624_184154.jpg',
     '20250624_200214.mp4',
     // Add more files...
   ];
   ```

#### Connect YouTube Channel
Replace placeholder links in:
- [index.html](index.html#L222)
- [sermons.html](sermons.html)
Search for `youtube.com/@yourchannel` and replace with your channel URL

#### Connect Zoom Meetings
Update Zoom link in:
- [index.html](index.html#L222)
- [sermons.html](sermons.html)
Search for `zoom.us/j/your-zoom-id` and replace with your meeting link

#### Setup Contact Form
The contact form is currently a demo. To make it functional:

**Option 1: Formspree (Easiest)**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update [contact.html](contact.html) - uncomment and update the fetch code in script.js

**Option 2: Netlify Forms**
If hosting on Netlify, add `netlify` attribute to form:
```html
<form class="contact-form" id="contactForm" netlify>
```

**Option 3: Custom Backend**
Implement your own backend API endpoint to handle form submissions

### 3. Color Scheme Customization

Edit the CSS variables in [style.css](style.css:2-43):
```css
:root {
  --primary: #00558c;        /* Deep blue */
  --accent: #f2b428;         /* Gold */
  /* Modify these to match your brand */
}
```

## 🌐 Deployment

### Deploy to Netlify (Recommended - Free)
1. Push your code to GitHub
2. Sign up at [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Click "Deploy site"

Your site will be live at `https://your-site-name.netlify.app`

### Deploy to GitHub Pages (Free)
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select branch (usually `main`) and root directory
4. Click Save

Site will be available at `https://yourusername.github.io/repository-name`

### Deploy to Custom Domain
1. Purchase domain from registrar (Namecheap, GoDaddy, etc.)
2. Update DNS settings to point to your hosting provider
3. Configure SSL certificate (usually automatic with Netlify/GitHub Pages)

## 🔧 Maintenance & Updates

### Adding New Pages
1. Copy an existing HTML file as template
2. Update the `<title>` and meta description
3. Add navigation link to all pages
4. Update footer links
5. Add to sitemap if using SEO

### Updating Service Times
Edit the service times in these sections:
- Homepage: Service Times section
- Footer: All pages
- Contact page: Service Times section

### Adding Events
Update [events.html](events.html) - add new event items following the existing structure

### SEO Optimization
- Each page has unique meta description
- Use descriptive page titles
- Add alt text to all images
- Submit sitemap.xml to Google Search Console
- Set up Google Analytics (add tracking code to all pages)

## 📱 Browser Compatibility

Tested and works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive features
- **AOS Library** - Scroll animations
- **Font Awesome 6** - Icons
- **Google Fonts** - Typography (EB Garamond, Inter)

## 📞 Support & Issues

For questions or issues:
1. Check this README first
2. Review commented code in files for guidance
3. Consult online resources (W3Schools, MDN Web Docs)

## 📝 License

This website is created for Cornerstone Baptist Church. Modify and use as needed for your church website.

## ✨ Future Enhancements

Consider adding:
- [ ] Blog or sermon notes section
- [ ] Member login portal
- [ ] Online giving integration
- [ ] Calendar with Google Calendar sync
- [ ] Prayer request submission form
- [ ] Newsletter signup
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Sermon podcast feed

---

**Built with ❤️ for Cornerstone Baptist Church**

Last Updated: January 2025
