# 🧠 VeriNews AI – Fake News Detection Platform

> An AI-powered full-stack web application to detect fake news using Natural Language Processing (NLP) and Machine Learning.

![Project Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-Completed-brightgreen)
![Backend](https://img.shields.io/badge/Backend-Completed-brightgreen)
![AI Model](https://img.shields.io/badge/AI%20Model-Completed-brightgreen)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![License](https://img.shields.io/badge/License-Academic-blue)

---

## 📌 Overview

**VeriNews AI** is a comprehensive Full Stack Web Application designed to analyze whether a news article, headline, URL, or image is **Real**, **Fake**, or **Uncertain** using Artificial Intelligence, Natural Language Processing (NLP), and Machine Learning.

This project is developed as part of a **Full Stack Web Development (FSWD)** academic project and features a modern AI-powered web platform with a professional dashboard interface, secure user authentication, analysis history, analytics, reporting functionality, and administrative controls.

---

## 🎯 Objective

- Detect potentially fake news using AI-based techniques
- Help users analyze news through multiple input methods (text, URL, and image)
- Provide prediction confidence with uncertainty handling
- Reduce the risk of treating low-confidence predictions as definitive
- Maintain user analysis history using MongoDB
- Provide analytics and insights based on analyzed news
- Allow users to report suspicious content for administrative review
- Provide secure authentication and administrative functionality

---

## 🚀 Features

### 🔍 Core AI Features
- **Multi-Input Analysis**: Analyze news articles, headlines, URLs, or images
- **Machine Learning Model**: LinearSVC with TF-IDF vectorization and bigram features
- **Confidence Scoring**: Display prediction confidence with uncertainty handling
- **URL Extraction**: Automatically extract content from supported news websites
- **Image OCR**: Extract text from news screenshots using `pytesseract`
- **Real-Time Prediction**: Node.js + Python integration for prediction results
- **Uncertainty Detection**: Returns `Uncertain` for low-confidence predictions

### 📊 Dashboard Features
- **Analytics Dashboard**: Key statistics and visualizations
- **Fake vs Real Distribution**: Interactive charts showing analysis patterns
- **Trending Topics**: Insights into analyzed news trends
- **User Activity**: Personal analysis history and activity patterns

### 🧾 History Management
- **Persistent Storage**: MongoDB-backed analysis history
- **Detailed Records**: Store input type, prediction, confidence, and timestamp
- **Search & Filter**: Find previous analyses easily
- **Re-analysis**: Re-check previous entries

### 📢 Reporting System
- **Report Suspicious Content**: Submit URLs, text, or images for review
- **Category Classification**: Select report types such as misinformation, satire, bias, etc.
- **Admin Review**: Reported content is available in the admin dashboard for moderation

### 👤 User Features
- **JWT Authentication**: Secure login/signup with token-based sessions
- **Profile Management**: Update user information and preferences
- **Dark Mode Toggle**: Theme switching capability
- **Responsive Design**: Works across desktop and mobile devices

### 🛠️ Admin Features
- **User Management**: View and manage registered users
- **Content Moderation**: Review reported suspicious content
- **System Analytics**: Monitor platform usage and performance
- **Report Management**: Handle user-submitted reports

---

## 🏗️ Project Structure

```text
Fake-News-Detector/
│
├── app/                           # Next.js App Router
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Landing page
│   ├── login/
│   │   └── page.tsx               # Login form
│   ├── signup/
│   │   └── page.tsx               # Registration form
│   └── (auth)/                    # Protected routes
│       ├── layout.tsx             # Auth layout
│       ├── dashboard/
│       │   └── page.tsx           # User dashboard
│       ├── check-news/
│       │   └── page.tsx           # News analysis input
│       ├── results/
│       │   └── page.tsx           # Analysis results
│       ├── history/
│       │   └── page.tsx           # Analysis history
│       ├── insights/
│       │   └── page.tsx           # Analytics insights
│       ├── report-news/
│       │   └── page.tsx           # Report suspicious content
│       ├── profile/
│       │   └── page.tsx            # User profile
│       └── admin/
│           └── page.tsx             # Admin dashboard
│
├── backend/                       # Node.js Express Backend
│   ├── server.js                  # Main server file
│   ├── routes/
│   │   ├── auth.js                # Authentication routes
│   │   ├── news.js                # News analysis routes
│   │   └── history.js             # History management routes
│   ├── models/
│   │   ├── User.js                # User model
│   │   └── Analysis.js             # Analysis model
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT authentication
│   ├── ai_model.py                # ML prediction script
│   ├── train.py                   # Model training script
│   ├── clean_dataset.py           # Data preprocessing
│   ├── Fake.csv                   # Fake news training data
│   ├── True.csv                   # Real news training data
│   ├── model.pkl                  # Trained ML model
│   └── vectorizer.pkl             # TF-IDF vectorizer
│
├── components/                    # Reusable UI Components
│   ├── ui/                        # Shadcn/ui components
│   ├── layout/                    # Layout components
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopNav.tsx
│   │   └── ThemeToggle.tsx
│   └── dashboard/
│       └── AnalyticsCard.tsx
│
├── hooks/                         # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib/                           # Utility libraries
│   ├── utils.ts                   # General utilities
│   ├── mongodb.ts                 # Database connection
│   ├── api.ts                     # Axios API client
│   └── UserContext.tsx            # Global user state
│
├── public/                        # Static assets
│   └── screenshots/               # Project screenshots
│
├── styles/                        # Additional styles
├── .env.example                   # Environment variable template
├── .env.local                     # Local environment variables
├── package.json                   # Frontend dependencies
├── pnpm-lock.yaml                 # Package manager lock
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── next.config.mjs                # Next.js configuration
├── components.json                # UI components configuration
└── README.md                      # Project documentation
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14, React, TypeScript | Modern web framework with app router |
| **UI Framework** | Tailwind CSS, Shadcn/ui | Responsive design and component library |
| **Backend** | Node.js, Express.js | REST API server |
| **Database** | MongoDB | User data and analysis history |
| **Authentication** | JWT (jsonwebtoken) | Secure token-based authentication |
| **AI / ML** | Python, scikit-learn | Machine learning pipeline |
| **OCR** | pytesseract, Pillow | Image text extraction |
| **Web Scraping** | axios, cheerio | URL content extraction |
| **File Upload** | multer | Image upload handling |
| **State Management** | React Context | Global user state |

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher) with pip
- **MongoDB** (local installation or cloud instance)
- **Git** for version control

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Fake-News-Detector
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your MongoDB URI
```

### 3. Backend Setup

```bash
cd backend

# Install Python dependencies
pip install pandas scikit-learn pytesseract pillow

# Install Node.js dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
```

### 4. Database Setup

```bash
# Start MongoDB using your local MongoDB installation
mongod --dbpath /path/to/your/db
```

Or use **MongoDB Atlas** for a cloud database.

Update `MONGO_URI` in the appropriate environment file:

```env
MONGO_URI=your_mongodb_connection_string
```

> ⚠️ Never commit `.env`, `.env.local`, passwords, API keys, JWT secrets, or other sensitive credentials to GitHub.

### 5. Train ML Model (Optional - pre-trained model included)

```bash
cd backend
python train.py
```

### 6. Start the Application

```bash
# Terminal 1: Start Frontend
npm run dev

# Terminal 2: Start Backend
cd backend
node server.js
```

### 7. Open in Browser

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🔄 Application Flow

```text
Landing Page → Login/Signup → Dashboard
                              ↓
                     ┌────────┴────────┐
                     │                 │
               Check News          Insights
                     ↓
               Results Page
                     │
              ┌──────┴──────┐
              ↓             ↓
           History      Report News
                            ↓
                       Admin Review
                            ↓
                    Content Moderation

              Profile Management
```

---

## 📌 Pages & Features

| Page | Description | Key Features |
|------|-------------|--------------|
| 🏠 **Landing Page** | Introduction and entry point | Hero section, feature highlights |
| 🔐 **Login/Signup** | User authentication | JWT tokens, form validation |
| 📊 **Dashboard** | User overview | Analytics cards, recent activity |
| 🔍 **Check News** | News analysis input | Text/URL/Image upload, real-time analysis |
| 📋 **Results** | Prediction output | Confidence score, explanation, uncertainty handling |
| 🕓 **History** | Analysis history | Searchable records, re-analysis |
| 💡 **Insights** | Analytics & trends | Charts, fake news patterns |
| 📢 **Report News** | Report suspicious content | Category selection, admin queue |
| 👤 **Profile** | Account management | Update information and preferences |
| ⚙️ **Admin** | Admin control panel | User management, content moderation |

---

## 🤖 AI Model Details

### Training Data

- **Fake News**: 23,481 articles from `Fake.csv`
- **Real News**: 21,417 articles from `True.csv`
- **Total**: 44,898 training samples

### Model Architecture

- **Algorithm**: LinearSVC with `class_weight='balanced'`
- **Vectorization**: TF-IDF with 50,000 features, `ngram_range=(1,2)`
- **Calibration**: CalibratedClassifierCV for probability estimates
- **Preprocessing**: Lowercase, URL removal, punctuation removal, stopword filtering

### Performance Metrics

- **Accuracy**: 99.45%
- **Precision**: 0.99 (Real), 0.99 (Fake)
- **Recall**: 0.99 (Real), 0.99 (Fake)
- **F1-Score**: 0.99 (Real), 0.99 (Fake)

> ⚠️ These metrics represent the documented evaluation results of the project's model and dataset and should not be interpreted as a guarantee of real-world fake-news detection accuracy.

### Prediction Output

- **Format**: `"Label,Confidence"` (e.g., `"Fake,87"` or `"Uncertain,45"`)
- **Uncertainty Threshold**: ≤55% confidence returns `"Uncertain"`
- **Input Types**: Text, URL (auto-extracted), Image (OCR)

---

## 🧪 Project Status

| Module | Status | Details |
|--------|--------|---------|
| ✅ Frontend UI | Completed | All pages responsive with modern design |
| ✅ Backend API | Completed | RESTful endpoints and error handling |
| ✅ Authentication | Completed | JWT-based login/signup/logout |
| ✅ Database | Completed | MongoDB with user/analysis models |
| ✅ AI Model | Completed | LinearSVC with documented evaluation results |
| ✅ Image OCR | Completed | pytesseract integration |
| ✅ URL Extraction | Completed | axios + cheerio web scraping |
| ✅ History Tracking | Completed | Persistent analysis storage |
| ✅ Admin Panel | Completed | User/content management |
| ✅ Responsive Design | Completed | Desktop and mobile support |

---

## 📂 GitHub Setup Guide

### Step 1 — Initialize Git

```bash
git init
```

### Step 2 — Create `.gitignore` File

Create a file named `.gitignore` in your project root and add:

```gitignore
node_modules/
.next/
.env
.env.local
__pycache__/
*.pyc
backend/uploads/
.DS_Store
```

> ⚠️ The filename starts with a dot and has no extension — it must be exactly `.gitignore`

### Step 3 — Stage All Files

```bash
git add .
```

### Step 4 — First Commit

```bash
git commit -m "Initial commit - VeriNews AI Complete Implementation"
```

### Step 5 — Connect to GitHub

```bash
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
```

### Step 6 — Push to GitHub

```bash
git branch -M main
git push -u origin main
```

> 💡 GitHub authentication may require a **Personal Access Token (PAT)** or another supported authentication method instead of your account password.

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

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### News Analysis

- `POST /api/news/check-news` - Analyze text or URL
- `POST /api/news/check-news-image` - Analyze uploaded image

### History & Reports

- `GET /api/history` - Get user's analysis history
- `POST /api/report` - Submit suspicious content report

---

## ⚠️ Known Limitations

- Model trained primarily on English news content
- OCR accuracy depends on image quality
- URL extraction may fail on heavily JavaScript-dependent sites
- Large images (>10MB) are rejected for upload
- Model predictions depend on the quality and scope of the training dataset
- AI predictions should be treated as an analytical aid and not as absolute proof of whether news is true or false

---

## 🔮 Future Enhancements

- **Multilingual Support**: Extend model to other languages
- **Real-time Detection**: Browser extension for instant verification
- **Social Media Integration**: Direct analysis from Twitter/Facebook
- **Advanced Analytics**: Trend analysis and misinformation patterns
- **Mobile App**: React Native companion application
- **API Rate Limiting**: Prevent abuse and ensure fair usage
- **Improved Explainability**: Provide more detailed reasons behind predictions
- **Continuous Model Improvement**: Retrain the model using newer and more diverse datasets

---

## 📸 Screenshots

### 🏠 Landing Page

![Landing Page](public/screenshots/landing.png)

### 🔐 Login Page

![Login Page](public/screenshots/login.png)

### 📊 Dashboard

![Dashboard](public/screenshots/Dashboard.png)

### 🔍 Check News Page

![Check News](public/screenshots/check.png)

### 📋 Result Page

![Result Screen 1](public/screenshots/check_news1.png)

![Result Screen 2](public/screenshots/news2.png)

![Result Screen 3](public/screenshots/news3.png)

### 🕓 History Page

![History](public/screenshots/history_page.png)

---

## 📸 Demo Video

▶️ **[View VeriNews AI Demo](https://drive.google.com/file/d/1uzXg2YaPetlbNWcLmF_VmwfvD7GMeEg3/view?usp=sharing)**

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is developed for **academic purposes** as part of the Full Stack Web Development course.

Not intended for commercial use.

---

## 👥 Team

- **Developers**: Prathamesh Shelar, Swarangi Savekar, and Ketaki Patil
- **Project**: VeriNews AI - Fake News Detection Platform
- **Course**: Full Stack Web Development (FSWD)

---

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

## 🙌 Acknowledgment

This project was developed as part of the **Full Stack Web Development (FSWD)** curriculum.

Special thanks to all open-source contributors and academic mentors who guided this project.

---

<div align="center">

**⭐ If you found this project helpful, please give it a star on GitHub! ⭐**

</div>
