# Backend API Documentation

## Setup

### 1. Install Dependencies
```bash
npm install mongoose bcrypt jsonwebtoken dotenv
```

### 2. Configure Environment
Create `.env` file in the `backend/` folder:
```
MONGO_URI=mongodb://localhost:27017/fake_newsDB
JWT_SECRET=your_super_secret_key_change_this_in_production
NODE_ENV=development
PORT=5000
```

### 3. Start MongoDB
```bash
mongod
```

### 4. Start Backend Server
```bash
cd backend
node server.js
```

Backend will run at `http://localhost:5000`

---

## API Endpoints

### Authentication Routes (`/api/auth`)

#### 1. Register User
**POST** `/api/auth/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 2. Login User
**POST** `/api/auth/login`

Request Body:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### News Detection Routes (`/api`)

#### 3. Check News (Detect Fake/Real)
**POST** `/api/check-news` ⚠️ **PROTECTED - Requires JWT Token**

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Request Body (Text):
```json
{
  "news": "This is the text to check for fake news..."
}
```

Request Body (URL):
```json
{
  "url": "https://example.com/article"
}
```

Response:
```json
{
  "result": "Fake",
  "confidence": "87",
  "explanation": "The model detected patterns similar to fake news."
}
```

**Note:** This route automatically saves the analysis to the user's history in MongoDB.

---

### History Routes (`/api`)

#### 4. Get User's Analysis History
**GET** `/api/history` ⚠️ **PROTECTED - Requires JWT Token**

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Response:
```json
{
  "message": "History retrieved",
  "count": 5,
  "history": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "inputText": "Article text preview...",
      "source": "text",
      "result": "Fake",
      "confidence": 87,
      "explanation": "The model detected patterns similar to fake news.",
      "createdAt": "2026-04-07T10:30:00Z"
    }
  ]
}
```

#### 5. Get Single Analysis
**GET** `/api/history/:id` ⚠️ **PROTECTED - Requires JWT Token**

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Response:
```json
{
  "message": "Analysis retrieved",
  "analysis": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "inputText": "Full article text...",
    "source": "url",
    "result": "Real",
    "confidence": 92,
    "explanation": "The content matches patterns of real news.",
    "createdAt": "2026-04-07T10:30:00Z"
  }
}
```

#### 6. Delete Analysis
**DELETE** `/api/history/:id` ⚠️ **PROTECTED - Requires JWT Token**

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Response:
```json
{
  "message": "Analysis deleted successfully"
}
```

---

## Usage Flow

### 1. Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"password123"}'
```

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"password123"}'
```

### 3. Check News (with token received from login)
```bash
curl -X POST http://localhost:5000/api/check-news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"news":"Your news text here"}'
```

### 4. Get History
```bash
curl -X GET http://localhost:5000/api/history \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Database Models

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  password: String (hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

### Analysis Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  inputText: String,
  source: String (enum: 'text' or 'url'),
  result: String (enum: 'Real', 'Fake', 'Error'),
  confidence: Number (0-100),
  explanation: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Security Notes

✅ **Implemented:**
- JWT tokens expire in 7 days
- Passwords hashed with bcrypt (10 rounds)
- Route protection middleware
- Email uniqueness constraint

⚠️ **For Production:**
- Change JWT_SECRET to a long random string
- Use HTTPS
- Enable rate limiting
- Add input validation
- Add CORS whitelist
- Store sensitive keys in secure vault

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "No token provided" 
}
```

### 400 Bad Request
```json
{
  "message": "Please provide name, email, and password"
}
```

### 404 Not Found
```json
{
  "message": "Analysis not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/fake_newsDB` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key_...` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` |
