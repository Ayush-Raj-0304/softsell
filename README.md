# SoftSell - Software License Marketplace

A modern web application built with Next.js that showcases a platform for buying and selling software licenses. This project demonstrates strong frontend development skills, responsive UI/UX design, and integration with AI services.

## 🚀 Live Demo

[View the live site on Vercel](https://softsell-ayush-raj-0304s-projects.vercel.app/)

## 🛠️ Technical Stack

### Frontend
- **Framework**: Next.js 15.3 with React 19
- **Styling**: Tailwind CSS with custom utility classes
- **State Management**: React Hooks for component-level state
- **Form Handling**: React Hook Form with validation
- **Animations**: Framer Motion for smooth transitions and animations
- **Icons**: React Icons library
- **Markdown**: React Markdown with remark-gfm for rich text formatting

### AI Integration
- **Chat Interface**: Custom-built interactive chat widget
- **AI Service**: Google's Generative AI (Gemini)
- **Context Management**: Custom context handling for domain-specific responses

### Development Tools
- **Build Tool**: Next.js with Turbopack
- **Deployment**: Vercel platform
- **Version Control**: Git

## ✨ Key Features

### 1. Intelligent Chat Widget
- Domain-specific AI responses
- Example question suggestions
- Real-time response streaming with loaders
- Markdown formatting support
- Smooth animations and hover interactions

### 2. Modern UI/UX
- Responsive across all devices
- Light/Dark mode toggle
- Glassmorphism and minimalistic design
- Smooth micro-interactions and hover effects
- Professional typography with `font-extralight`

### 3. Landing Page Sections
- **Navigation**: Smooth scroll and mobile menu
- **Hero Section**: CTA with strong visual hierarchy
- **How It Works**: Clear step-by-step guide
- **Why Choose Us**: Highlights of key features
- **Testimonials**: Client feedback with avatars
- **Contact Form**: Validated input form
- **Footer**: Site links + social icons

### 4. Performance & Accessibility
- Optimized image loading with `next/image`
- Accessible contrast and semantics
- Minimal layout shift on load
- Semantic HTML5 + ARIA considerations

## 🏗️ Application Structure

```
src/
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   │   └── chat/        # Chat API endpoint
│   ├── globals.css      # Global styles
│   ├── layout.js        # Root layout
│   └── page.js          # Homepage
├── components/          # UI components
│   ├── Button.js        # Reusable button component
│   ├── ChatWidget.js    # AI chat interface
│   ├── ContactForm.js   # Contact form with validation
│   ├── Container.js     # Layout container
│   ├── Footer.js        # Site footer
│   ├── HeroSection.js   # Landing page hero
│   ├── HowItWorks.js    # Process explanation
│   ├── Navbar.js        # Navigation bar
│   ├── Testimonials.js  # Customer reviews
│   └── WhyChooseUs.js   # Benefits section
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/softsell.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local`:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🎯 Technical Highlights

- Context-aware AI integration with Gemini
- Animated, responsive chat widget with Markdown
- Glassmorphism + dark/light theme
- Optimized performance, accessibility, and structure

## 📝 License

This project is open to contributions! Feel free to fork, raise issues, or submit improvements.

## 👨‍💻 Developer Notes

This project demonstrates:
- Modern frontend architecture using Next.js 15
- Rich UI interactions with Framer Motion
- AI integration using Gemini APIs
- Production-ready styling and layout


## Time Spent
From Mind To Live in 8 hrs
