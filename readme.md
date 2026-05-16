# AI News App

An AI-powered full-stack news web application built using React, Vite, Node.js, Express, PostgreSQL, and Groq AI.

Users can:
- browse latest news
- search articles
- explore categories
- bookmark articles
- generate AI summaries
- use dark mode
- manage profile/bookmarks

---

# Features

- Authentication (JWT + Cookies)
- Protected Routes
- NewsAPI Integration
- AI Article Summaries using Groq
- Search Functionality
- Category Filtering
- Pagination / Load More
- Bookmark System
- Profile Page
- Dark Mode
- Responsive UI
- PostgreSQL Database

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Cookie Parser

## APIs & AI
- NewsAPI
- Groq AI API

---

# Folder Structure

```txt
root/
│
├── client/
│
├── server/
│
├── .gitignore
│
└── README.md
```

---

# Environment Variables

## Server `.env`

```env
PORT=4000

DATABASE_URL=your_postgresql_url

JWT_SECRET=your_jwt_secret

NEWS_API_KEY=your_newsapi_key

GROQ_API_KEY=your_groq_api_key
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-news-app.git
```

---

# Backend Setup

```bash
cd server

npm install

npm run dev
```

---

# Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# API Routes

## Auth

```txt
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/logout
GET    /api/auth/me
```

---

## News

```txt
GET /api/news/top-headlines

GET /api/news/category/:category

GET /api/news/search?q=ai
```

---

## User

```txt
GET    /api/user/profile

GET    /api/user/bookmarks

POST   /api/user/bookmark

DELETE /api/user/bookmark/:id
```

---

## AI

```txt
POST /api/ai/summarize
```

---

# Future Improvements

- Infinite Scroll
- Personalized Feed
- Trending News
- AI Recommendations
- Reading History
- Skeleton Loaders
- Multi-language Support
- Voice Summaries

---

# Screenshots

Add screenshots here after deployment.

---

# Deployment

## Frontend
Deploy on:
- Vercel

## Backend
Deploy on:
- Railway
- Render

## Database
Use:
- Neon PostgreSQL

---

# Author

Abhinav Chaudhary

---

# License

This project is licensed under the MIT License.