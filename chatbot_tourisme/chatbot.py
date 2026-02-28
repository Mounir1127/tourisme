import pickle
import json
import random

# Charger modèle et vectorizer
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

# Charger intents
with open("intents.json", "r", encoding="utf-8") as file:
    data = json.load(file)

def get_response(user_input):
    X = vectorizer.transform([user_input])
    prediction = model.predict(X)
    tag = prediction[0]

    for intent in data["intents"]:
        if intent["tag"] == tag:
            return random.choice(intent["responses"])

    return "Désolé, je n'ai pas compris."

print("🤖 Chatbot Tourisme (tapez 'quit' pour quitter)")

while True:
    message = input("Vous : ")
    if message.lower() == "quit":
        print("Bot : Au revoir 👋")
        break

    response = get_response(message)
    print("Bot :", response)
