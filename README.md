<<<<<<< HEAD
# 🌿 Mood-to-Move

> **"Check your mood. Move for 2 minutes. Feel the difference."**

Mood-to-Move is a complete full-stack wellness web application designed specifically for students taking marathon study sessions, attending online lectures, or coding at desks. It provides rapid, targeted 2-minute physical and mental interventions based on real-time mood assessments, guides users through an interactive full-screen timer, quantifies before/after mood improvements, and tracks daily streaks.

---

## ✨ Features

- 🧠 **Mood-Based Interventions**: 5-point validated scale (😫 Very Low to 😄 Great) paired with study strain contexts (e.g. *"Studying too long"*, *"Feeling stressed"*, *"Can't focus"*).
- 🎯 **Deterministic Recommendation Engine**: Smart rule-based selection ensuring appropriate biomechanical & mental relief (e.g., *Low + Studying too long* yields *2-Minute Desk Stretch*).
- ⏱️ **2-Minute Interactive Timer**: Circular SVG countdown with dynamic timed step-by-step guidance (0–30s, 30–60s, 60–90s, 90–120s) and synthesized ambient Web Audio chime upon completion.
- ⚡ **Hackathon Demo Mode**: An instant toggle switch (accessible right in the header) that scales the timer to **10 seconds** for rapid live judge demonstrations.
- 🎉 **Before vs. After Quantified Improvement**: Post-activity mood check calculating exact improvement (e.g. `😕 2 → 🙂 4 = +2 Mood Improvement`) with supportive non-medical feedback.
- 🔥 **Daily Streak & Activity Counter**: Automatic consecutive-day streak calculation and resets-today tally powered by MongoDB sessions.
- 📈 **My Journey (History) & Mood Trend**: Filterable session timeline across all 7 categories (Breathing, Stretch, Mobility, Posture, Focus, Energy, Movement) with an SVG Before/After mood trend chart.
- 👤 **Student Profile**: Name customization, joined date, all-time reset counters, and focus preference management.
- 🔐 **Full Authentication**: Secure registration and login with bcryptjs password hashing, JWT token verification, and protected routes.

---

## 🛠️ Tech Stack (MERN in JavaScript)

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Canvas Confetti
- **Backend**: Node.js, Express.js (ES Modules, JavaScript)
- **Database**: MongoDB (via Mongoose ODM)
- **Auth**: JSON Web Tokens (JWT) + bcryptjs password hashing

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **MongoDB** running locally on port `27017` (`mongodb://127.0.0.1:27017/mood_to_move`)

### 2. Backend Setup
```bash
cd Backend
npm install
npm run seed     # Seeds 10 activities & default demo user
npm start        # Starts Express server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev      # Starts Vite dev server on http://localhost:5173
```

---

## 🔑 Demo Credentials

For quick evaluation during the hackathon, you can click the **"Use Demo Account"** button on the Login/Register page or manually enter:

- **Email**: `demo@example.com`
- **Password**: `Demo123!`

---

## 📋 Hackathon Judge Demo Walkthrough

1. **Landing Page (`http://localhost:5173`)**: Observe the hero concept flow: *Mood → Movement → Better Mood*.
2. **Start Your Reset**: Click **"Start Your Reset"** and register a new account (or click **"Instant Demo Account"**).
3. **Onboarding**: Select focus areas (*"Better focus"*, *"Stress relief"*) and 2-minute break preference.
4. **Dashboard**: Note initial daily stats, streak, and click the primary CTA: **"Check My Mood"**.
5. **Mood Check**:
   - Step 1: Select **😕 Low** (Score 2) → Click **Continue**.
   - Step 2: Select **📚 Studying too long** → Click **Find My Reset**.
6. **Recommendation**: Observe the deterministic engine recommending the **2-Minute Desk Stretch** with personalized rationale. Click **"Start 2-Minute Reset"**.
7. **2-Minute Timer & Demo Mode**:
   - Turn on **"Demo Mode (10s)"** via the badge toggle in the top bar.
   - Watch the timer count down smoothly while dynamic step instructions update across all 4 stages.
8. **Completion Screen**:
   - Confetti bursts!
   - Post-Activity Check: Select **🙂 Good** (Score 4).
   - See **+2 Mood Improvement** with positive wellness feedback.
9. **Persistence**:
   - Return to **Dashboard**: Verify resets counter shows **1 Reset Today** and streak shows **1 Day**.
   - Open **History**: Inspect the completed session card and SVG mood trend graph.
   - Open **Profile**: View all-time statistics and test editing the profile name.

---

## ⚠️ Wellness Disclaimer

*Mood-to-Move provides general wellness and physical mobility activities and is not a medical or mental-health diagnostic tool.*
=======
# MoodToMove
# 🌱 Mood-to-Move

AI-powered personalized 2-minute wellness breaks
for students.

## Problem

Students often spend long hours studying without
taking meaningful breaks.

## Solution

Mood-to-Move understands the student's mood and
personal context, then recommends a personalized
2-minute activity.

## Features

- Mood selection
- Mood story
- AI recommendations
- 2-minute activities
- Before/after mood
- Activity history
- Personalized insights
- Study mode
- Analytics
- Streaks and badges

## Tech Stack

Frontend:
React

Backend:
Node.js
Express.js

Database:
MongoDB

AI:
[Your AI API]

## Architecture

React → Express → AI + MongoDB

## Team

| Name | Department | Role |
|------|------------|------|
| Vulli Thraigambica | CSE | Frontend |
| Neelarapu Anirudh | CSE | Backend |
| Dharavath Venkatesh | CSE | Database |
| Jashvitha Korabandi | IT | Activities & Analytics |
>>>>>>> d52b5181bb0475740eacc6bac096a8d24e9002b7
