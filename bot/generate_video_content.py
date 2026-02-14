import json
import subprocess
from datetime import date

# ---------- CONFIG ----------
VOICE = "en-IN-NeerjaNeural"
SCRIPT_FILE = "script.txt"
OUTPUT_AUDIO = "output/voice.mp3"
POSTS_FILE = "../data/posts.json"

# ---------- TEXT TO SPEECH ----------
subprocess.run([
    "edge-tts",
    "--voice", VOICE,
    "--text-file", SCRIPT_FILE,
    "--write-media", OUTPUT_AUDIO
])

print("Voice generated")

# ---------- UPDATE POSTS.JSON ----------
with open(POSTS_FILE, "r", encoding="utf-8") as f:
    posts = json.load(f)

new_post = {
    "title": "Why India Revises Base Years for CPI, GDP and IIP",
    "date": str(date.today()),
    "source": "PIB (MoSPI), RBI",
    "summary": "India periodically revises the base years of CPI, GDP and IIP to reflect structural changes in consumption, production and industrial activity, improving accuracy and policy relevance.",
    "link": "https://pib.gov.in",
    "category": "economics"
}

posts.insert(0, new_post)

with open(POSTS_FILE, "w", encoding="utf-8") as f:
    json.dump(posts, f, indent=2)

print("posts.json updated")
