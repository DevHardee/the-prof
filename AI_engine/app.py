from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import TechPathAgent
import os
from dotenv import load_dotenv
import uvicorn

load_dotenv()

app = FastAPI(
    title="TechPath AI Engine",
    description="AI-powered career path generator",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the AI agent
tech_path_agent = TechPathAgent()

# Request/Response models
class SubjectRequest(BaseModel):
    subject: str

class CareerPathData(BaseModel):
    title: str
    description: str
    roles: list[str]
    skills: list[str]
    why: str

class CareerPathResponse(BaseModel):
    success: bool
    data: CareerPathData | None = None
    subject: str
    error: str | None = None

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "TechPath AI Engine"
    }

@app.post("/api/generate-path", response_model=CareerPathResponse)
async def generate_path(request: SubjectRequest):
    """
    Generate a tech career path based on user's subject/discipline
    
    Expected JSON payload:
    {
        "subject": "Microbiology"
    }
    
    Returns:
    {
        "success": true,
        "data": {
            "title": "Career Path Title",
            "description": "Description...",
            "roles": [...],
            "skills": [...],
            "why": "Explanation..."
        },
        "subject": "Microbiology"
    }
    """
    try:
        subject = request.subject.strip()
        
        if not subject:
            raise HTTPException(
                status_code=400,
                detail="Subject cannot be empty"
            )
        
        # Generate the tech path using the AI agent
        result = tech_path_agent.generate_tech_path(subject)
        
        if result['success']:
            return result
        else:
            raise HTTPException(
                status_code=500,
                detail=result.get('error', 'Failed to generate path')
            )
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in generate_path endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.get("/api/test")
async def test():
    """Simple test endpoint"""
    return {
        "message": "TechPath AI Engine is running!",
        "status": "operational"
    }

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🚀 Starting TechPath AI Engine on port {port}")
    print(f"📡 CORS enabled for frontend communication")
    uvicorn.run(app, host="0.0.0.0", port=port)
