from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import json
import random

app = Flask(__name__)
CORS(app)

# Charger modèle et vectorizer
try:
    model = pickle.load(open("model.pkl", "rb"))
    vectorizer = pickle.load(open("vectorizer.pkl", "rb"))
except Exception as e:
    print("Erreur de chargement du modèle:", e)
    model = None
    vectorizer = None

# Charger intents
try:
    with open("intents.json", "r", encoding="utf-8") as file:
        data = json.load(file)
except FileNotFoundError:
    data = {"intents": []}

@app.route("/chat", methods=["POST"])
def chat():
    if not model or not vectorizer:
        return jsonify({"response": "Le modèle du chatbot n'est pas chargé."}), 500

    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    X = vectorizer.transform([user_input])
    prediction = model.predict(X)
    tag = prediction[0]

    for intent in data["intents"]:
        if intent["tag"] == tag:
            response = random.choice(intent["responses"])
            return jsonify({"response": response})

    return jsonify({"response": "Désolé, je n'ai pas compris."})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
