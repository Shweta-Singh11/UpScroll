# UpScroll — Frontend

UpScroll is a web application designed to reduce doomscrolling by replacing endless scrolling with engaging brain-break activities that improve focus, creativity, and healthy digital habits.

This repository contains the frontend application, built with React and Vite, and integrates with a Spring Boot backend.

**Live Application:** https://upscroll-tau.vercel.app/
**Backend API:** https://brain-backend-3.onrender.com/

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Backend Integration](#backend-integration)
- [Deployment](#deployment)
- [Frontend Highlights](#frontend-highlights)
- [Frontend Development](#frontend-development)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Project Overview

UpScroll aims to counter the habit of doomscrolling by giving users short, engaging activities to redirect their attention when they open the app. Instead of an infinite feed, users are presented with structured brain-break exercises across memory, creativity, and awareness, along with curated learning resources.

The project is built and maintained by a two-person team:

| Role | Developer |
|------|-----------|
| Frontend Developer | Shweta Singh |
| Backend Developer | Tusharika |

---

## Features

### Authentication
- User registration
- Login
- Email OTP verification
- Session persistence using local storage

### Brain Break Activities
- Memory & Logic
- Creative Writing
- FactStation

### Learning Resources
- Research Compass

### UI Features
- Landing page
- Navbar
- Footer
- Emotion Calibration
- FAQ section
- Responsive design
- Light theme
- Dark theme
- Smooth animations

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React | UI library |
| Vite | Build tool and dev server |
| Tailwind CSS | Styling |
| React Router | Client-side routing |
| Framer Motion | Animations |
| Lucide React | Icon set |

### State & APIs

| Technology | Purpose |
|------------|---------|
| Fetch API | HTTP requests to backend |
| React Hooks | Component state and lifecycle |
| Context API | Global state management |
| Local Storage | Session persistence |

---

## Folder Structure
 
```
src/
├── assets/                     # Static assets (images, icons, etc.)
├── components/
│   ├── about/
│   │   ├── StorySection.jsx
│   │   └── TeamSection.jsx
│   ├── home/
│   │   ├── AuraPointsCounter.jsx
│   │   ├── EmotionalCalibration.jsx
│   │   └── ResearchCompass.jsx
│   ├── layout/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   └── ui/
│       ├── Activities.jsx
│       └── ImpactStats.jsx
├── context/
│   └── ThemeContext.jsx        # Light/dark theme state management
└── pages/
    ├── auth/
    ├── creativeStation/
    ├── games/
    ├── FactStation.jsx
    ├── Home.jsx
    ├── OurStory.jsx
    └── OurTeam.jsx
```
 
---

## Installation

Clone the repository:

```bash
git clone https://github.com/UpScroll-app/UpScroll-frontend.git
```

Navigate into the project directory and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the root of the project with the following variable:

```
VITE_API_BASE_URL=https://brain-backend-3.onrender.com
```

---

## Backend Integration

The frontend communicates with a Spring Boot backend for the following functionality:

- Authentication
- OTP verification
- AI caption evaluation
- Random facts

Backend repository: https://github.com/Tusharika725/brain-backend

---

## Deployment

| Service | URL |
|---------|-----|
| Frontend | https://upscroll-tau.vercel.app/ |
| Backend | https://brain-backend-3.onrender.com/ |

---

## Frontend Highlights

- Component-based architecture
- Global state management using Context API
- Modular, maintainable project structure
- Responsive layouts across devices
- Reusable UI components
- API integration with the backend
- Animations powered by Framer Motion

---

## Frontend Development

The frontend of UpScroll was developed independently, covering:

- Landing page
- Authentication flow
- Memory & Logic activity
- Creative Writing activity
- FactStation
- Emotion Calibration
- Research Compass
- Responsive design
- Light and dark theme support
- API integration with the backend
- Navigation and routing
- Overall user experience

---

## Future Improvements

- Achievements system
- Activity history
- Performance optimization
- Accessibility improvements

---

## License

This project is developed for educational and portfolio purposes.
