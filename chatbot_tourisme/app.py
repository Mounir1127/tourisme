import os
from openai import OpenAI

# Initialize the client with the provided API key from env
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY", "your-key-here")
)

try:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo", # Using 3.5-turbo as fallback since 4o-mini might be restricted
        messages=[
            {"role": "system", "content": "Tu es un assistant utile."},
            {"role": "user", "content": "Bonjour, explique-moi l’API ChatGPT."}
        ]
    )

    print(response.choices[0].message.content)
except Exception as e:
    print(f"Erreur API: {e}")
