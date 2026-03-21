# Sunshine Sprouts Child Care Center Website

A modern, responsive, fully-functional childcare services website built with **HTML5, CSS3, and Vanilla JavaScript**—no frameworks, no build tools required.

## 🌟 Features

- **8 Complete Pages**: Homepage, About, Programs, Enrollment, Gallery, Resources, FAQ, Contact
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Modern UI/UX**: Professional design with smooth animations and transitions
- **Form Validation**: Real-time validation with helpful error messages
- **Photo Gallery**: Lightbox functionality with filtering and keyboard support
- **Interactive Elements**: Carousels, accordions, tabs, counters with Intersection Observer
- **Accessibility**: WCAG 2.1 AA compliance with semantic HTML and ARIA labels
- **SEO Optimized**: JSON-LD schema markup, meta descriptions, Open Graph tags
- **No Dependencies**: Pure HTML, CSS, and JavaScript—run directly in any browser

## 📁 Project Structure

```
├── index.html              # Homepage
├── about.html              # About Us page
├── programs.html           # Programs & Curriculum
├── enrollment.html         # Enrollment Application
├── gallery.html            # Photo Gallery
├── resources.html          # Parent Resources & Downloads
├── faq.html                # Frequently Asked Questions
├── contact.html            # Contact & Tour Booking
├── css/
│   ├── style.css           # Global styles & components (1200+ lines)
│   └── responsive.css      # Media queries for all breakpoints (500+ lines)
├── js/
│   ├── main.js             # Shared functionality (navigation, scrolling, etc.)
│   ├── gallery.js          # Gallery filtering & lightbox
│   └── form.js             # Form validation & submission (400+ lines)
└── images/                 # Image placeholder directory
```

## 🚀 Quick Start

### Option 1: Local Development
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. Start using—no build process needed!

### Option 2: Live Server (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Browser automatically refreshes on file changes

## 🎨 Design System

### Colors
- **Primary**: #2E86AB (Blue)
- **Secondary**: #F6AE2D (Gold)
- **Accent**: #F26419 (Orange)
- **Success**: #43AA8B (Green)
- **Error**: #E63946 (Red)
- **Background**: #F7F9FC (Off-white)
- **Text**: #1A1A2E (Navy)

### Typography
- **Headings**: Nunito (400, 600, 700)
- **Body**: Open Sans (400, 600, 700)
- Both via Google Fonts CDN

### Spacing
- Consistent spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- CSS variables for easy customization

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Screens**: 1440px+

## 🔧 Technology Stack

- **HTML5**: Semantic markup with accessibility best practices
- **CSS3**: Custom properties (variables), Flexbox, CSS Grid
- **Vanilla JavaScript**: Intersection Observer API, Event delegation, Form APIs
- **Icons**: Font Awesome 6.4.0 (CDN)
- **Fonts**: Google Fonts CDN

## 📋 Page Details

### index.html - Homepage
- Hero section with CTA buttons
- Trust badges
- "Why Choose Us" feature cards
- Programs overview
- Animated stats counters
- Testimonials carousel
- Blog preview section
- Newsletter signup

### about.html - About Us
- Company story (2-column layout)
- Mission & vision statements
- 6 core values icon grid
- 4-member team profiles
- Accreditations section
- Parent testimonial banner

### programs.html - Our Programs
- 5 tabbed program descriptions (Infant, Toddler, Preschool, After School, Summer)
- Daily schedule timeline for each program
- Curriculum highlights
- Pricing information
- Staff ratios
- Programs comparison table

### enrollment.html - Enrollment
- 4-step enrollment process visualization
- Complete enrollment application form
- Parent & child information sections
- Required documents checklist
- Tuition & fees accordion
- Financial assistance information
- CCAP & FSA details

### gallery.html - Photo Gallery
- 20 image tiles with masonry grid layout
- Filter buttons (All, Classrooms, Outdoor, Activities, Events, Meals)
- Lightbox with prev/next navigation
- Keyboard support (Escape, arrow keys)
- Swipe support for mobile
- Video placeholder tiles

### resources.html - Parent Resources
- Parent portal login CTA
- 6 downloadable forms (PDF & Word)
- 6 center policies accordion
- Parenting resources with external links
- Monthly newsletter previews
- Helpful external resource links (CDC, USDA, etc.)

### faq.html - FAQ
- Live search functionality
- 35+ FAQ items organized by category:
  - Enrollment & Admission
  - Programs & Curriculum
  - Health & Safety
  - Billing & Payment
  - Daily Operations
  - Transitions & Special Support
- "Still have questions?" CTA

### contact.html - Contact
- 2-column layout (Contact Info + Tour Booking Form)
- Address, phone, email, hours
- Embedded Google Maps
- Tour booking form with validation
- Social media links
- Newsletter signup
- Emergency closure banner

## 🎯 Key Features Explained

### Real-Time Form Validation
- Email, phone, date, required field validation
- Phone number auto-formatting to (XXX) XXX-XXXX
- Character counters for textareas
- Visual error messages below fields

### Scroll Animations
- Stats counters animate from 0 upward when scrolled into view
- Testimonial carousel auto-rotates on mobile
- Fade-in effects on element scroll
- Intersection Observer for performance

### Gallery & Lightbox
- Filter images by category in real-time
- Click image to open fullscreen lightbox
- Navigate with prev/next buttons or keyboard arrows
- Escape key closes lightbox
- Swipe support for touch devices

### Responsive Navigation
- Fixed header with hamburger menu on mobile
- Desktop menu automatically shows/hides on small screens
- Mobile menu closes on link click or outside click
- Active page indicator in navigation

## ⚙️ Customization

### Change Brand Name
Replace "Sunshine Sprouts" throughout HTML files with your center's name.

### Update Colors
Edit CSS variables in `css/style.css` `:root` block:
```css
:root {
  --primary: #2E86AB;      /* Change to your primary color */
  --secondary: #F6AE2D;    /* Change to your secondary color */
  /* ... other variables ... */
}
```

### Update Contact Info
Search for these values and update:
- "123 Sunshine Lane, Springfield, IL 62701" → Your address
- "(555) 123-4567" → Your phone
- "info@sunshinesprouts.com" → Your email

### Modify Content
All content is in HTML files. Simply edit text, add/remove sections, or update pricing.

## 📊 Performance

- **No Build Tools**: Instant load—no compilation needed
- **CSS Variables**: Smaller CSS size through reuse
- **GPU-Accelerated Animations**: Uses transform/opacity only
- **Lazy Loading Ready**: img tags support data-src for lazy loading
- **Intersection Observer**: Efficient scroll animations (only runs when visible)

## ♿ Accessibility

- ✅ WCAG 2.1 AA contrast ratios (4.5:1 text, 3:1 UI)
- ✅ Semantic HTML (header, nav, main, section, footer, article)
- ✅ ARIA labels on form fields and interactive elements
- ✅ Keyboard navigation support
- ✅ Skip-to-content link
- ✅ Focus indicators on all interactive elements
- ✅ Prefers-reduced-motion support (disables animations for users who request it)

## 🔍 SEO

- ✅ JSON-LD schema markup (Organization, ChildCare business type)
- ✅ Meta descriptions on all pages
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Semantic HTML structure
- ✅ Mobile-friendly viewport

## 🌐 Browser Support

- ✅ Chrome/Edge (all modern versions)
- ✅ Firefox (all modern versions)
- ✅ Safari (iOS 12.2+, macOS 10.14+)
- ✅ Mobile browsers (all modern versions)

## 📝 License

This website is designed for Sunshine Sprouts Child Care Center. Feel free to customize it for your childcare business.

## 🤝 Support

For issues or questions about the website:
1. Check the FAQ page (faq.html)
2. Review the code comments in js/ and css/ files
3. Ensure all files are in the correct directory structure
4. Test in multiple browsers to isolate issues

## 🚀 Deployment

### GitHub Pages (Free)
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select main branch as source
4. Site publishes automatically

### Netlify (Free)
1. Connect GitHub repository
2. Set build command to empty (static site)
3. Set publish directory to root (/)
4. Deploy with one click

### Vercel (Free)
1. Connect GitHub repository
2. Import project
3. Configure project settings
4. Deploy automatically

All options provide free HTTPS, custom domains, and automatic deployments on git push.

---

**Made with ❤️ for Sunshine Sprouts Child Care Center**

Version 1.0 | Built with HTML5, CSS3 & Vanilla JavaScript | No frameworks, no build tools
