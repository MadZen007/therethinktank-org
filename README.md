# RethinkTank.org

A responsive landing page for RethinkTank.org, featuring books and a contact form.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Hero Section**: Eye-catching header with placeholder image
- **About Section**: Brief introduction to RethinkTank
- **Books Section**: 3 book cards with Amazon purchase links
- **Contact Form**: Functional contact form that POSTs to `/api/contact`
- **Responsive Design**: Works on mobile, tablet, and desktop
- **SEO Optimized**: Proper metadata and semantic HTML structure

## Customization

### Images
Replace the placeholder images in `app/page.tsx`:
- Hero image: Update the `src` attribute in the hero section
- Book images: Update the `src` attributes in each book card

### Amazon Links
Update the `href` attributes in the book cards to point to your actual Amazon product pages.

### Contact Form
The contact form API endpoint is at `app/api/contact/route.ts`. Currently, it logs submissions to the console. You'll need to integrate with an email service (SendGrid, Resend, Nodemailer, etc.) to send emails.

## Building for Production

```bash
npm run build
npm start
```
