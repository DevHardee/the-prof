import os
import json
import re
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# ---------------------------------------------------------------------------
# APPROVED ROLES — single source of truth for validation
# ---------------------------------------------------------------------------
APPROVED_ROLES = {
    "Data Analyst", "Business Intelligence Analyst", "Data Scientist",
    "Data Engineer", "Machine Learning Engineer", "AI Engineer",
    "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "Mobile App Developer", "Software Engineer",
    "Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer (SRE)",
    "Platform Engineer",
    "Cybersecurity Analyst", "Security Engineer", "Penetration Tester",
    "Security Operations Center (SOC) Analyst", "GRC Analyst",
    "Product Manager", "Technical Product Manager", "Product Marketing Manager",
    "Product Designer", "UI Designer", "UX Designer", "UX Researcher",
    "QA Engineer", "Test Automation Engineer",
    "Business Analyst", "Technical Support Engineer", "Solutions Engineer",
    "Customer Success Engineer",
}

# Roles the model tends to default to. Not banned outright — just gated
# behind an explicit justification requirement in the prompt below.
DATA_CLUSTER = {"Data Analyst", "Data Scientist", "Data Engineer",
                 "Machine Learning Engineer", "AI Engineer"}

TITLE_CATEGORIES = [
    "Data Analytics", "Data Science", "Machine Learning & AI",
    "Software Engineering", "Cloud Infrastructure", "Cybersecurity",
    "Product Management", "Product Design", "Quality Assurance",
    "Business & Technical Operations",
]

ROLE_TO_CATEGORY = {
    "Data Analyst": "Data Analytics", "Business Intelligence Analyst": "Data Analytics",
    "Data Scientist": "Data Science", "Data Engineer": "Data Science",
    "Machine Learning Engineer": "Machine Learning & AI", "AI Engineer": "Machine Learning & AI",
    "Frontend Developer": "Software Engineering", "Backend Developer": "Software Engineering",
    "Full Stack Developer": "Software Engineering", "Mobile App Developer": "Software Engineering",
    "Software Engineer": "Software Engineering",
    "Cloud Engineer": "Cloud Infrastructure", "DevOps Engineer": "Cloud Infrastructure",
    "Site Reliability Engineer (SRE)": "Cloud Infrastructure", "Platform Engineer": "Cloud Infrastructure",
    "Cybersecurity Analyst": "Cybersecurity", "Security Engineer": "Cybersecurity",
    "Penetration Tester": "Cybersecurity", "Security Operations Center (SOC) Analyst": "Cybersecurity",
    "GRC Analyst": "Cybersecurity",
    "Product Manager": "Product Management", "Technical Product Manager": "Product Management",
    "Product Marketing Manager": "Product Management",
    "Product Designer": "Product Design", "UI Designer": "Product Design",
    "UX Designer": "Product Design", "UX Researcher": "Product Design",
    "QA Engineer": "Quality Assurance", "Test Automation Engineer": "Quality Assurance",
    "Business Analyst": "Business & Technical Operations",
    "Technical Support Engineer": "Business & Technical Operations",
    "Solutions Engineer": "Business & Technical Operations",
    "Customer Success Engineer": "Business & Technical Operations",
}


class TechPathAgent:
    def __init__(self):
        self.client = OpenAI(
            base_url=os.environ.get("OPENAI_BASE_URL"),
            api_key=os.environ.get("OPENAI_API_KEY"),
        )
        self.model = os.environ.get("OPENAI_MODEL", "google/gemma-4-E4B-it")

        self.system_prompt = f"""You are an expert career advisor who helps people transition into tech and digital careers based on their ACTUAL field of study.

You are self-aware of a common mistake weaker advisors make: defaulting to "Data Analyst / Data Scientist / Data Engineer / Machine Learning Engineer" for almost every background, regardless of whether that background is actually quantitative. You must actively avoid this failure mode.

Approved Career Roles (you may ONLY choose from this exact list — never invent titles):
{json.dumps(sorted(APPROVED_ROLES), indent=2)}

---

MANDATORY REASONING PROCESS (you must do this internally before answering, and show your work in the "skills_taught" and "reasoning" fields of your JSON response):

Step 1 — Identify what the degree ACTUALLY teaches.
List the 4-6 core skills/knowledge areas someone genuinely gains from this specific field of study. Be concrete and specific to THIS degree, not generic "problem solving" filler.

Step 2 — Match those specific skills to roles, not the degree name to a stereotype.
Ask: of the approved roles, which ones would someone with EXACTLY these skills be a credible entry-level candidate for? A role only qualifies if at least one of the skills from Step 1 directly transfers to it.

Step 3 — Apply the Data Cluster Gate.
Data Analyst, Data Scientist, Data Engineer, Machine Learning Engineer, and AI Engineer may ONLY be selected if the degree's core curriculum is inherently quantitative, statistical, computational, or data-centric — e.g. Mathematics, Statistics, Physics, Computer Science, Engineering disciplines, or quantitative Economics.
For non-quantitative fields (Law, Arts, Humanities, Design, Psychology, Communications, Medicine/Health sciences, Business, etc.) these roles are NOT allowed UNLESS the reasoning field explicitly and specifically justifies the data/statistics component of that exact degree — a vague justification like "all fields involve some data" is NOT acceptable and must be rejected.
If you catch yourself about to select 2 or more Data Cluster roles for a non-quantitative field, STOP and re-derive the roles from Step 1 skills instead.

Step 4 — Select and order the 4 best roles, most to least suitable, from Step 2's candidates.

---

Examples of correct reasoning (study these carefully):

Degree: Anatomy
skills_taught: human body systems, clinical/medical research methods, lab data recording, evidence-based analysis
→ Data Analyst (HealthTech), Data Scientist (Clinical data), Product Manager (HealthTech), Data Engineer (Health data pipelines)
NOT UI/UX Designer — nothing in this degree touches visual design.

Degree: Law
skills_taught: regulatory interpretation, contract analysis, risk assessment, structured argumentation, compliance frameworks
→ GRC Analyst, Business Analyst, Product Manager, Product Marketing Manager
NOT Frontend Developer, NOT Data Scientist — no coding or statistics in this curriculum.

Degree: Fine Arts
skills_taught: visual composition, design critique, aesthetics, conceptual storytelling
→ Product Designer, UI Designer, UX Designer, UX Researcher
NOT Data Engineer — this degree has zero data/engineering content.

Degree: Sociology
skills_taught: human behavior research, qualitative/survey methods, social systems analysis, interviewing
→ UX Researcher, Product Designer, Product Manager, Business Analyst
NOT Data Scientist as the LEAD role — sociology teaches qualitative research, not statistical modeling; Data Analyst could appear third/fourth at most, only if justified by survey-data methods.

Degree: Mechanical Engineering
skills_taught: systems design, applied physics, CAD modeling, process optimization
→ Cloud Engineer, Data Engineer, DevOps Engineer, QA Engineer
(Here Data Engineer IS allowed — the degree is quantitative/engineering-based.)

---

You must respond ONLY with valid JSON, no preamble, no markdown fences, in exactly this structure:
{{
  "skills_taught": ["skill 1", "skill 2", "skill 3", "skill 4"],
  "reasoning": "2-3 sentences following Steps 1-3 above, explicitly justifying why each selected role fits and, if any Data Cluster role is included, why it's specifically justified for THIS degree",
  "title": "<Category> Career Path",
  "description": "3-4 sentences explaining how their specific background translates to tech opportunities",
  "roles": ["Role 1", "Role 2", "Role 3", "Role 4"],
  "skills": ["Skill to learn 1", "Skill to learn 2", "Skill to learn 3", "Skill to learn 4"],
  "why": "3-4 sentences explaining why this path is a natural fit for their background"
}}

TITLE RULES:
- "<Category>" must be exactly one of: {", ".join(TITLE_CATEGORIES)}
- Pick the category matching the FIRST role in your "roles" array.
"""

        self.retry_feedback_template = """Your previous answer for this background was rejected because it defaulted to generic Data Analyst/Data Scientist/Data Engineer/Machine Learning Engineer roles without a curriculum-specific justification, which is exactly the failure mode you were told to avoid.

Background: {subject}
Your rejected roles: {roles}

Re-do the full reasoning process from scratch. Go back to Step 1: list what this SPECIFIC degree actually teaches, then derive roles ONLY from those skills. Do not include more than 1 Data Cluster role unless the degree is genuinely quantitative/statistical/computational. Respond with the same JSON structure as before."""

    # -- helpers -----------------------------------------------------------

    @staticmethod
    def _strip_code_fences(text: str) -> str:
        text = text.strip()
        if text.startswith("```"):
            text = re.sub(r"^```(json)?", "", text).strip()
            text = re.sub(r"```$", "", text).strip()
        return text

    @staticmethod
    def _validate_roles(roles):
        cleaned = [r for r in roles if r in APPROVED_ROLES]
        if len(cleaned) < len(roles):
            print(f"Warning: dropped invalid role(s): {set(roles) - set(cleaned)}")
        return cleaned

    def _build_title(self, roles):
        category = ROLE_TO_CATEGORY.get(roles[0], "Business & Technical Operations")
        return f"{category} Career Path"

    def _looks_quantitative(self, subject: str) -> bool:
        """Loose heuristic used only to decide whether to trigger a retry —
        does NOT decide the roles themselves, the AI still does that."""
        quant_keywords = ["math", "statistics", "physics", "computer science",
                          "engineering", "data science", "actuarial", "software"]
        return any(kw in subject.lower() for kw in quant_keywords)

    def _call_llm(self, messages) -> dict:
        chat_completion = self.client.chat.completions.create(
            messages=messages,
            model=self.model,
            temperature=0.4,  # lower temperature = more consistent instruction-following
            max_tokens=1200,
        )
        response_text = self._strip_code_fences(chat_completion.choices[0].message.content)
        return json.loads(response_text)

    # -- main entry point ----------------------------------------------------

    def generate_tech_path(self, subject: str) -> dict:
        """
        Fully AI-driven role recommendation. The model reasons about what the
        degree teaches BEFORE naming roles (both fields are required in the
        same JSON response), and is explicitly gated on when it's allowed to
        pick Data Analyst/Scientist/Engineer/ML/AI Engineer roles.

        If the model still defaults to generic data roles for a clearly
        non-quantitative subject, it gets ONE retry with direct feedback
        pointing out the mistake, and re-answers itself. No roles are ever
        hardcoded — this is purely a "try again, here's what you did wrong"
        correction loop.
        """
        user_message = f"""Create a personalized tech career path for someone with a background in: {subject}

Follow the mandatory reasoning process exactly. Respond ONLY with valid JSON."""

        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": user_message},
        ]

        try:
            career_path = self._call_llm(messages)

            required_keys = ["title", "description", "roles", "skills", "why", "reasoning", "skills_taught"]
            if not all(k in career_path for k in required_keys):
                raise ValueError("Response missing required keys")

            roles = self._validate_roles(career_path["roles"])
            if not roles:
                raise ValueError("No valid roles returned")

            data_role_count = sum(1 for r in roles if r in DATA_CLUSTER)

            # Retry once if it visibly defaulted: 2+ data-cluster roles on a
            # subject that has no quantitative signal at all.
            if data_role_count >= 2 and not self._looks_quantitative(subject):
                print(f"Retry triggered for '{subject}': {data_role_count} data-cluster roles returned, no quantitative signal.")
                retry_msg = self.retry_feedback_template.format(subject=subject, roles=roles)
                messages.append({"role": "assistant", "content": json.dumps(career_path)})
                messages.append({"role": "user", "content": retry_msg})
                career_path = self._call_llm(messages)
                roles = self._validate_roles(career_path.get("roles", []))
                if not roles:
                    raise ValueError("No valid roles returned after retry")

            career_path["roles"] = roles[:4]
            career_path["title"] = self._build_title(career_path["roles"])

            return {"success": True, "data": career_path, "subject": subject}

        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            return {"success": False, "error": "Failed to parse AI response", "subject": subject}
        except Exception as e:
            print(f"Error generating tech path: {e}")
            return {"success": False, "error": str(e), "subject": subject}


if __name__ == "__main__":
    agent = TechPathAgent()
    for test_subject in ["Law", "Fine Arts", "Anatomy", "Sociology", "Accounting", "Mechanical Engineering"]:
        result = agent.generate_tech_path(test_subject)
        print(f"\n=== {test_subject} ===")
        print(json.dumps(result, indent=2))