# 🧠 VeriNews AI – Fake News Detection Platform

> An AI-powered full-stack web application to detect fake news using Natural Language Processing (NLP).

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Frontend](https://img.shields.io/badge/Frontend-Completed-brightgreen)
![Backend](https://img.shields.io/badge/Backend-Working-brightgreen)
![AI Model](https://img.shields.io/badge/AI%20Model-Implemented-brightgreen)
![License](https://img.shields.io/badge/License-Academic-blue)

---

## 📌 Overview

**VeriNews AI** is a Full Stack Web Application designed to detect whether a news article, headline, or URL is **Real** or **Fake** using Artificial Intelligence and Natural Language Processing (NLP).

This project is developed as part of a **Full Stack Web Development (FSWD)** academic project and focuses on building a modern AI-powered web platform with a professional dashboard interface.

---

## 🎯 Objective

- Detect fake news using AI-based techniques
- Help users verify news authenticity easily
- Reduce the spread of misinformation

---

## 🚀 Features

### 🔍 Core Features
- Analyze news articles, headlines, or URLs
- Predict whether news is **Real** or **Fake**
- Display confidence score
- Highlight suspicious keywords
- AI-based explanation panel
- Analyze news from URLs (web scraping using axios + cheerio)
- Machine Learning model using TF-IDF + Logistic Regression
- Real-time prediction via Node.js + Python integration

### 📊 Dashboard Features
- Analytics dashboard with key statistics
- Fake vs Real news distribution
- Trending misinformation topics

### 🧾 History Management
- Stores previously analyzed news
- View prediction results
- Re-check previous entries

### 📢 Reporting System
- Report suspicious or fake news
- Upload URL, text, or screenshot
- Select report category (misinformation, satire, etc.)

### 👤 User Features
- User authentication (Login / Signup)
- Profile management
- Dark mode toggle

### 🛠️ Admin Features
- View total users, reports, and analyzed news
- Manage reported content
- Monitor system activity

---

## 🏗️ Project Structure

```
Fake-News-Detector/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   ├── signup/
│   └── (auth)/
│       ├── dashboard/
│       ├── check-news/
│       ├── results/
│       ├── history/
│       ├── insights/
│       ├── report-news/
│       ├── profile/
│       └── admin/
│
├── components/
│   ├── layout/
│   ├── dashboard/
│   └── ui/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── news.js
│   ├── ai_model.py
│   ├── train.py
│   ├── Fake.csv
│   ├── True.csv
│   ├── model.pkl
│   └── vectorizer.pkl
│
├── public/
├── styles/
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js / Next.js, HTML, CSS, JavaScript, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** *(Planned)* | MongoDB |
| **AI / ML** | Python, TF-IDF + Logistic Regression |

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fake-news-detector.git
cd fake-news-detector
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
npm run dev
```

### 4. Open in Browser

```
http://localhost:3000
```

---

## 🔄 Application Flow

```
Landing Page
     ↓
Login / Signup
     ↓
Dashboard
     ↓
Check News → Analyze → Result Page
     ↓
History / Insights / Report / Profile
```

---

## 📌 Pages Included

| Page | Description |
|------|-------------|
| 🏠 Landing Page | Introduction and entry point |
| 🔐 Login / Signup | User authentication |
| 📊 Dashboard | Overview with analytics |
| 🔍 Check News | Input news article for analysis |
| 📋 Result Page | Prediction output with confidence score |
| 🕓 History | Previously analyzed articles |
| 💡 AI Insights | Trends and misinformation data |
| 📢 Report News | Submit suspicious content |
| 👤 Profile | User account management |
| ⚙️ Admin Dashboard | Admin control panel |

---

## 🧪 Project Status

| Module | Status |
|--------|--------|
| Frontend UI | ✅ Completed |
| Backend Integration | ✅ Completed |
| AI Model Integration | ✅ Completed |
| Database Setup | 🔄 Pending |
| Deployment | 🔄 Pending |

---

## 📂 GitHub Setup Guide

Follow these steps to push this project to GitHub:

### Step 1 — Initialize Git
```bash
git init
```

### Step 2 — Create `.gitignore` File

Create a file named `.gitignore` in your project root and add:

```
node_modules/
.next/
.env
.env.local
.DS_Store
```

> ⚠️ The filename starts with a dot and has no extension — it must be exactly `.gitignore`

### Step 3 — Stage All Files
```bash
git add .
```

### Step 4 — First Commit
```bash
git commit -m "Initial commit - VeriNews AI Project"
```

### Step 5 — Connect to GitHub
```bash
git remote add origin https://github.com/your-username/fake-news-detector.git
```

### Step 6 — Push to GitHub
```bash
git branch -M main
git push -u origin main
```

> 💡 GitHub requires a **Personal Access Token (PAT)** instead of your password.
> Generate one at: **GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)** → select `repo` scope.

### 🔁 For Future Updates
```bash
git add .
git commit -m "Your update message"
git push
```

---

## 💡 Useful Git Commands

| Command | Description |
|---------|-------------|
| `git status` | Check status of files |
| `git log --oneline` | View commit history |
| `git reset --soft HEAD~1` | Undo last commit (keep files) |
| `git checkout -b branch-name` | Create a new branch |
| `git pull` | Pull latest changes from GitHub |
| `git remote -v` | Verify remote connection |

---

## ⚠️ Limitations

- Authentication system is not implemented (UI only)
- No database (history stored in browser localStorage)
- Image upload feature is not functional yet
- Model works best with English news content

---

## 🔮 Future Scope

- Improve ML model accuracy and performance
- Real-time fake news detection
- Mobile application development
- Multilingual support
- Social media integration
- Browser extension for instant verification

---

## 📸 Screenshots

### 🏠 Landing Page
![](public/screenshots/landing.png)

### 🔐 Login Page
![](public/screenshots/login.png)

### 📊 Dashboard
![](public/screenshots/dashboard.png)

### 🔍 Check News Page
![](public/screenshots/check.png)


### 📋 Result Page
![](public/screenshots/check_news1.png)
![](public/screenshots/news2.png)
![](public/screenshots/news3.png)

### 🕓 History Page
![](public/screenshots/history_page.png)

---

## 👨‍💻 Author

| Field | Details |
|-------|---------|
| **Name** | Your Name |
| **Course** | B.Tech Computer Engineering |
| **College** | Your College Name |
| **GitHub** | [@your-username](https://github.com/your-username) |

---

## 📄 License

This project is developed for **academic purposes only**.
Not intended for commercial use.

---

## 🙌 Acknowledgment

This project was developed as part of the **Full Stack Web Development (FSWD)** curriculum.
Special thanks to all open-source contributors and academic mentors who guided this project.

---

<div align="center">

**⭐ If you found this project helpful, please give it a star on GitHub! ⭐**

</div>