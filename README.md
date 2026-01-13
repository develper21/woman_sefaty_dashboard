<div align="center">

# 🛡️ Women Safety & Health Dashboard

A comprehensive web application dedicated to women's safety and health monitoring with AI-powered analytics and real-time emergency response features.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

</div>

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📱 Pages & Components](#-pages--components)
- [🔐 Authentication](#-authentication)
- [📊 Admin Dashboard](#-admin-dashboard)
- [🚀 Deployment](#-deployment)

## 🌟 Features

### 🛡️ Safety Features
- **Emergency Alert System** - One-click SOS alerts to emergency contacts
- **Real-time Location Tracking** - GPS-based location sharing
- **Safe Route Navigation** - AI-powered safest route recommendations
- **Panic Button Integration** - Quick emergency response activation

### 🏥 Health Monitoring
- **Health Metrics Dashboard** - Track vital signs and health data
- **Menstrual Cycle Tracking** - Personalized health insights
- **Medication Reminders** - Smart notification system
- **Health Analytics** - AI-driven health predictions and insights

### 🤖 AI-Powered Features
- **Smart Chat Assistant** - 24/7 AI health and safety advisor
- **Predictive Analytics** - Risk assessment and prevention
- **Personalized Recommendations** - Customized safety and health tips
- **Voice Recognition** - Hands-free emergency activation

### 👥 Admin Dashboard
- **User Management** - Complete user profile management
- **Analytics & Reports** - Comprehensive data visualization
- **Message Center** - Real-time communication system
- **System Monitoring** - Performance and usage analytics

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/women-safety-dashboard.git

# Navigate to the project directory
cd women-safety-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible component library
- **Lucide React** - Consistent icon system
- **Framer Motion** - Smooth animations and transitions

### State Management & Data
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Form handling with validation
- **Zod** - TypeScript-first schema validation
- **Recharts** - Data visualization and charts

### Backend & Database
- **Supabase** - Backend as a Service with PostgreSQL
- **Supabase Auth** - Secure authentication system
- **Real-time Subscriptions** - Live data updates

### Routing & Navigation
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form state management

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS transformation
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── admin/          # Admin-specific components
│   ├── home/           # Landing page components
│   └── layout/         # Layout components
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   └── [page].tsx      # Public pages
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # Third-party integrations
└── assets/             # Static assets
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup
1. Create a new Supabase project
2. Run the provided migration script
3. Configure authentication settings
4. Set up storage buckets for file uploads

## 📱 Pages & Components

### Public Pages
- **Home (/)** - Landing page with hero section and features
- **Safety (/safety)** - Safety features and emergency tools
- **Health (/health)** - Health monitoring and insights
- **About (/about)** - Project information and team
- **Contact (/contact)** - Contact form and support

### Admin Pages
- **Admin Dashboard** - Overview and analytics
- **Users Management** - User profiles and permissions
- **AI Analytics** - AI-powered insights and reports
- **Messages** - Communication center
- **Settings** - System configuration

### Key Components
- **Navbar** - Responsive navigation with theme toggle
- **HeroSection** - compelling landing page introduction
- **SafetyFeatures** - Interactive safety tools showcase
- **HealthFeatures** - Health monitoring dashboard
- **AIAgentDemo** - AI assistant demonstration
- **Testimonials** - User reviews and feedback
- **CTASection** - Call-to-action and signup forms

## 🔐 Authentication

The application uses Supabase Auth for secure authentication:

- **Email/Password Authentication** - Traditional login method
- **Password Recovery** - Secure password reset flow
- **Session Management** - Automatic token refresh
- **Protected Routes** - Role-based access control

### Admin Authentication
- Separate admin authentication system
- Role-based permissions
- Secure session management
- Multi-factor authentication support

## 📊 Admin Dashboard Features

### User Management
- View and manage user profiles
- Monitor user activity and engagement
- Handle user requests and support tickets
- Export user data for analysis

### Analytics & Reports
- Real-time usage statistics
- Health and safety metrics
- AI performance analytics
- Custom report generation

### Communication
- In-app messaging system
- Email notifications
- Push notification management
- Emergency alert coordination

## 🚀 Deployment

### Build Process
```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

### Deployment Options
- **Vercel** - Recommended for React applications
- **Netlify** - Static site hosting with CI/CD
- **AWS Amplify** - Full-stack hosting solution
- **Docker** - Containerized deployment

### Environment Setup
Ensure all environment variables are properly configured in your hosting platform:
- Supabase URL and anonymous key
- Any third-party API keys
- Analytics and tracking IDs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
---
<div align="center">
  Made with ❤️ for Women's Safety & Health
</div>
