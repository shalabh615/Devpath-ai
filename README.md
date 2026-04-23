# DevpathAI — Full Stack Setup Guide

## Architecture Overview

```
Frontend (HTML/CSS/JS)  ──►  Backend (Node/Express)  ──►  MongoDB Atlas
                                     │
                                     ▼
                              Anthropic Claude API
                                     │
                              GitHub Public API
```

---

## STEP 1 — Get Your Free MongoDB Database

1. Go to **https://cloud.mongodb.com** → Sign up free
2. Create a **Free M0 cluster** (takes 2 mins)
3. Click **Connect** → **Connect your application**
4. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devpathai
   ```
5. Replace `username` and `password` with your credentials

---

## STEP 2 — Get Your Anthropic API Key

1. Go to **https://console.anthropic.com** → Sign up / Login
2. Go to **API Keys** → Create new key
3. Copy the key (starts with `sk-ant-api03-...`)

---

## STEP 3 — Setup the Backend

### Install Node.js first
Download from: https://nodejs.org (version 18 or higher)

### Install dependencies
```bash
cd devpathai-backend
npm install
```

### Create your .env file
```bash
cp .env.example .env
```
Then open `.env` and fill in your values:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/devpathai
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE
JWT_SECRET=any_long_random_string_here_change_this
FRONTEND_URL=http://localhost:5500
```

### Start the backend
```bash
# For development (auto-restarts on file changes):
npm run dev

# For production:
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
╔═══════════════════════════════════════╗
║   DevpathAI API running on :5000   ║
╚═══════════════════════════════════════╝
```

### Test it's working
Open browser: http://localhost:5000/api/health
You should see: `{ "success": true, "message": "DevpathAI API is running" }`

---

## STEP 4 — Open the Frontend

1. Open `public/index.html` in VS Code
2. Install the **Live Server** extension (right-click → Open with Live Server)
3. This opens at `http://localhost:5500`

OR simply double-click `index.html` in your browser.

> **Important:** In `index.html`, make sure this line at the top of the script is correct:
> ```javascript
> var API = 'http://localhost:5000/api';
> ```

---

## STEP 5 — Test Everything

1. **GitHub:** Enter a GitHub username → should fetch and show profile card
2. **Register:** Click "Sign Up Free" → create an account
3. **Fill the form:** Complete all 4 steps
4. **Generate:** Click "Generate My 6-Month Roadmap"
5. **Track:** Click week cards to mark them complete (saved to database!)

---

## API Endpoints Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Get current user |
| POST | `/api/github/analyze` | No | Fetch GitHub profile |
| POST | `/api/github/save` | Yes | Save GitHub to user profile |
| POST | `/api/ai/generate` | Yes | Generate AI roadmap |
| GET | `/api/ai/roadmaps` | Yes | Get all my roadmaps |
| GET | `/api/ai/roadmaps/:id` | Yes | Get specific roadmap |
| PATCH | `/api/ai/roadmaps/:id/week/:weekIndex` | Yes | Mark week complete |
| DELETE | `/api/ai/roadmaps/:id` | Yes | Delete roadmap |

---

## Deploy to Production (Free)

### Backend → Render.com (Free tier)
1. Push your code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your repo
4. Set environment variables (same as .env)
5. Build command: `npm install`
6. Start command: `node server.js`

### Frontend → Netlify or Vercel (Free)
1. Change `var API = 'http://localhost:5000/api'`  
   to `var API = 'https://your-app.onrender.com/api'`
2. Drag and drop the `public` folder to Netlify

---

## Folder Structure

```
devpathai-backend/
├── server.js              ← Main entry point
├── package.json           ← Dependencies
├── .env.example           ← Environment template
├── config/
│   └── db.js              ← MongoDB connection
├── models/
│   ├── User.js            ← User schema + password hashing
│   └── Roadmap.js         ← Roadmap + progress schema
├── controllers/
│   ├── authController.js  ← Register / Login / GetMe
│   ├── githubController.js← GitHub API fetcher
│   └── aiController.js    ← Claude AI + roadmap CRUD
├── routes/
│   ├── auth.js            ← /api/auth/*
│   ├── github.js          ← /api/github/*
│   └── ai.js              ← /api/ai/*
├── middleware/
│   └── auth.js            ← JWT protection middleware
└── public/
    └── index.html         ← Frontend (connects to backend)
```

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| `CORS error` | Add your frontend URL to `allowedOrigins` in `server.js` |
| `MongoDB connection failed` | Check MONGO_URI format and whitelist `0.0.0.0/0` in MongoDB Atlas Network Access |
| `API key invalid` | Make sure ANTHROPIC_API_KEY is correct in .env |
| `Cannot find module` | Run `npm install` again |
| `Port already in use` | Change `PORT=5001` in .env |
