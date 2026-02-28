import json
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Charger les données
with open("intents.json", "r", encoding="utf-8") as file:
    data = json.load(file)

texts = []
labels = []

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        texts.append(pattern)
        labels.append(intent["tag"])

# Vectorisation NLP
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

# Modèle Machine Learning
model = LogisticRegression()
model.fit(X, labels)

# Sauvegarder le modèle
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

print("✅ Modèle entraîné et sauvegardé avec succès !")
