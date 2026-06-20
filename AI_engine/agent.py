import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

class TechPathAgent:
    def __init__(self):
        """Initialize the TechPath AI Agent with Groq API"""
        self.client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
        self.model = "llama-3.3-70b-versatile"
        
        self.system_prompt = """You are an expert career advisor specializing in helping people transition into tech and digital careers.

Your job is to analyze a user's background (their field of study or expertise) and create a personalized tech career path for them.

You must respond ONLY with valid JSON in this exact structure:
{
  "title": "Career Path Title (e.g., 'Bioinformatics & Data Science')",
  "description": "2-3 sentences explaining how their background translates to tech opportunities",
  "roles": ["Role 1", "Role 2", "Role 3", "Role 4"],
  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
  "why": "3-4 sentences explaining why this path is a natural fit for their background, connecting their existing skills to the tech career"
}

Guidelines:
- Be specific and practical
- Focus on realistic entry points into tech
- Highlight transferable skills
- Make roles concrete and searchable (real job titles)
- Keep skills focused on learnable technical abilities
- Be encouraging but honest
- Use their exact discipline/background in your reasoning
"""

    def generate_tech_path(self, subject: str) -> dict:
        """
        Generate a personalized tech career path based on the user's subject/discipline
        
        Args:
            subject: The user's field of study or expertise
            
        Returns:
            dict: Structured career path recommendation
        """
        try:
            user_message = f"""Create a personalized tech career path for someone with a background in: {subject}

Generate a comprehensive career path that includes:
1. A compelling career path title
2. How their background translates to tech
3. 4 specific job roles they could pursue
4. 4 key technical skills they should learn
5. Why this path makes sense for their background

Remember to respond ONLY with valid JSON."""

            chat_completion = self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": user_message}
                ],
                model=self.model,
                temperature=0.7,
                max_tokens=1500,
            )
            
            response_text = chat_completion.choices[0].message.content.strip()
            
            # Clean up the response to ensure it's valid JSON
            # Remove markdown code blocks if present
            if response_text.startswith("```json"):
                response_text = response_text.replace("```json", "").replace("```", "").strip()
            elif response_text.startswith("```"):
                response_text = response_text.replace("```", "").strip()
            
            # Parse the JSON response
            career_path = json.loads(response_text)
            
            # Validate the structure
            required_keys = ["title", "description", "roles", "skills", "why"]
            if not all(key in career_path for key in required_keys):
                raise ValueError("Response missing required keys")
            
            return {
                "success": True,
                "data": career_path,
                "subject": subject
            }
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            print(f"Response text: {response_text}")
            return {
                "success": False,
                "error": "Failed to parse AI response",
                "subject": subject
            }
        except Exception as e:
            print(f"Error generating tech path: {e}")
            return {
                "success": False,
                "error": str(e),
                "subject": subject
            }
