import urllib.request
import json

api_key = "AIzaSyA136Fc90Ry6vpFieu3RZJkJhQ9zU-7z9E"
url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"

payload = {
    "contents": [{"parts": [{"text": "Bonjour, comment ca va?"}]}]
}

data = json.dumps(payload).encode("utf-8")
req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})

try:
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read())
        text = result["candidates"][0]["content"]["parts"][0]["text"]
        print("SUCCESS:", text[:200])
except Exception as e:
    print("ERROR:", e)
