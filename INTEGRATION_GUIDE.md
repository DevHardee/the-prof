# TechPath AI Integration Guide

## 🎯 What Was Built

A complete AI-powered career path generator that:
1. Takes a user's subject/discipline as input
2. Uses AI (Groq's Llama 3.3 70B) to generate personalized tech career paths
3. Returns structured data that the frontend displays beautifully
4. Built with FastAPI for high performance and automatic API documentation

## 📁 Files Created/Modified

### Backend (AI_engine folder):
- ✅ `agent.py` - AI agent that generates career paths using Groq API
- ✅ `app.py` - FastAPI REST API server with endpoints
- ✅ `requirements.txt` - Python dependencies (FastAPI, uvicorn, etc.)
- ✅ `Dockerfile` - Docker configuration (optional)
- ✅ `docker-compose.yml` - Docker Compose configuration
- ✅ `.env` - Environment variables (API key already configured)
- ✅ `README.md` - Backend documentation
- ✅ `start.bat` - Easy startup script for Windows
- ✅ `test_agent.py` - Testing script

### Frontend:
- ✅ `src/pages/TechPath.tsx` - Integrated with AI backend
  - Added loading states
  - Added error handling
  - Connected to AI API
  - Displays AI-generated paths

## 🚀 How to Run

### Step 1: Start the AI Backend

Open a terminal in the `AI_engine` folder:

**Option A - Using the batch file (easiest):**
```bash
cd AI_engine
start.bat
```

**Option B - Manual:**
```bash
cd AI_engine
pip install -r requirements.txt
python app.py
```

You should see:
```
🚀 Starting TechPath AI Engine on port 5000
📡 CORS enabled for frontend communication
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:5000
```

**View API Documentation:**
- Swagger UI: http://localhost:5000/docs
- ReDoc: http://localhost:5000/redoc

### Step 2: Start the Frontend

In a separate terminal (keep the backend running):

```bash
npm run dev
```

### Step 3: Test It!

1. Open your browser to the frontend (usually `http://localhost:5173`)
2. Navigate to the **TECHPATH** page
3. Type any subject (e.g., "Marine Biology", "Psychology", "Nursing")
4. Click **"REVEAL MY PATH"** ⚡
5. Watch the AI generate a personalized career path!

## 🧪 Testing the AI Agent

Before running the full application, you can test the AI agent independently:

```bash
cd AI_engine
python test_agent.py
```

This will run 5 test cases and show you the AI-generated responses.

## 📡 API Endpoints

### Health Check
```bash
GET http://localhost:5000/health
```

### Generate Career Path
```bash
POST http://localhost:5000/api/generate-path
Content-Type: application/json

{
  "subject": "Your subject here"
}
```

## 🎨 What Happens When User Clicks "Reveal My Path"

1. **User Input**: User enters their subject (e.g., "Microbiology")
2. **Frontend Request**: TechPath.tsx sends POST request to backend
3. **AI Processing**: Agent generates personalized career path using Groq AI
4. **Response**: Backend returns structured JSON with:
   - Career path title
   - Description
   - 4 job roles
   - 4 skills to learn
   - Why this path fits
5. **Display**: Frontend beautifully renders the AI response

## 🔍 Response Structure

The AI returns this exact structure:

```json
{
  "success": true,
  "data": {
    "title": "Career Path Title",
    "description": "How your background translates to tech",
    "roles": [
      "Role 1",
      "Role 2",
      "Role 3",
      "Role 4"
    ],
    "skills": [
      "Skill 1",
      "Skill 2",
      "Skill 3",
      "Skill 4"
    ],
    "why": "Why this path is perfect for your background"
  },
  "subject": "User's subject"
}
```

## 🎯 Features Implemented

### Backend Features:
- ✅ AI-powered career path generation
- ✅ Structured JSON responses
- ✅ Error handling
- ✅ CORS enabled for frontend
- ✅ Health check endpoint
- ✅ Fast response times

### Frontend Features:
- ✅ Loading animations while AI generates
- ✅ Error handling with retry button
- ✅ Beautiful display of AI results
- ✅ Fallback to hardcoded paths if backend is offline
- ✅ Smooth transitions and animations

## 🐛 Troubleshooting

### Backend not starting:
```bash
# Make sure Python is installed
python --version

# Install dependencies
cd AI_engine
pip install -r requirements.txt

# Check if port 5000 is available
# On Windows, check with: netstat -ano | findstr :5000
```

### Frontend can't connect to backend:
1. Make sure backend is running on port 5000
2. Check browser console for errors
3. Verify the API URL in TechPath.tsx is `http://localhost:5000`

### AI returns errors:
1. Check that your `GROQ_API_KEY` in `.env` is valid
2. Check internet connection (Groq API requires internet)
3. Look at backend terminal logs for detailed errors

### CORS errors:
The CORS configuration is already set up in `app.py`. If you still see CORS errors:
1. Restart the backend
2. Clear browser cache
3. Try a different browser

## 🌟 Example Queries to Try

Once everything is running, try these subjects:
- Marine Biology
- Graphic Design
- Psychology
- Nursing
- History
- Philosophy
- Architecture
- Chemistry
- English Literature
- Business Administration

The AI will generate unique, personalized paths for each!

## 📊 Architecture Flow

```
User enters subject
       ↓
Frontend (TechPath.tsx)
       ↓
POST /api/generate-path
       ↓
FastAPI App (app.py)
       ↓
TechPathAgent (agent.py)
       ↓
Groq API (Llama 3.3 70B)
       ↓
Structured JSON Response
       ↓
Frontend displays beautifully
```

## 💡 FastAPI Advantages

- **Faster**: Built on Starlette and Pydantic for high performance
- **Auto Docs**: Swagger UI at `/docs` and ReDoc at `/redoc`
- **Type Safety**: Automatic request/response validation
- **Modern**: Async support and Python type hints
- **Easy Testing**: Built-in test client

## 🎉 You're All Set!

Your AI career path generator is ready to use. The integration is complete and working. Just:
1. Start the backend
2. Start the frontend
3. Go to the TechPath page
4. Enter a subject and click "Reveal My Path"

The AI will do the rest! 🚀
