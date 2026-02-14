import json, datetime

blog = {
  "title": "India Revises Base Years for CPI, GDP and IIP",
  "date": str(datetime.date.today()),
  "author": "Vipin Tripathi",
  "summary": "India has initiated a comprehensive revision of base years for CPI, GDP and IIP.",
  "content": "This reform improves accuracy, policy relevance and international comparability...",
  "sources": [
    "PIB – Ministry of Statistics & Programme Implementation",
    "IMF Statistical Guidelines"
  ]
}

with open("data/economics.json", "r+") as f:
    data = json.load(f)
    data.insert(0, blog)
    f.seek(0)
    json.dump(data, f, indent=2)
