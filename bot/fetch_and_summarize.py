import feedparser
import json
import re
from collections import Counter
from datetime import date

SOURCES = [
    {
        "name": "PIB",
        "url": "https://pib.gov.in/RssMain.aspx?Mod=6&Lang=1"
    },
    {
        "name": "IMF",
        "url": "https://www.imf.org/en/Blogs/rss"
    }
]

def clean(text):
    text = re.sub(r"<.*?>", "", text)
    return re.sub(r"\s+", " ", text)

def summarize(text, max_sentences=5):
    sentences = re.split(r'(?<=[.!?]) +', text)
    words = Counter(re.findall(r'\w+', text.lower()))
    ranked = sorted(
        sentences,
        key=lambda s: sum(words[w] for w in re.findall(r'\w+', s.lower())),
        reverse=True
    )
    return " ".join(ranked[:max_sentences])

posts = []

for src in SOURCES:
    feed = feedparser.parse(src["url"])
    for entry in feed.entries[:1]:  # 1 from each source = 2 per day
        content = clean(entry.get("summary", ""))
        short_summary = summarize(content)

        posts.append({
            "title": entry.title,
            "date": str(date.today()),
            "source": src["name"],
            "summary": short_summary,
            "link": entry.link,
            "category": "economics"
        })

# Save
with open("data/posts.json", "r+", encoding="utf-8") as f:
    existing = json.load(f)
    posts.extend(existing)
    f.seek(0)
    json.dump(posts, f, indent=2, ensure_ascii=False)
