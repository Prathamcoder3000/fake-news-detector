"""
train.py — Run this ONCE to train the model and save it as model.pkl
Usage: py train.py

After running, model.pkl and vectorizer.pkl will be created.
The news.js backend uses ai_model.py which loads these pickle files.
"""

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle
import os

print("Loading datasets...")

fake = pd.read_csv("Fake.csv")
real = pd.read_csv("True.csv")

# Label: 1 = Fake, 0 = Real
fake["label"] = 0
real["label"] = 1

data = pd.concat([fake, real]).reset_index(drop=True)

# Use 'text' column if it exists, else 'title', else first column
text_col = "text" if "text" in data.columns else ("title" if "title" in data.columns else data.columns[0])
print(f"Using column: '{text_col}' for training")

# Drop rows with missing text
data = data.dropna(subset=[text_col])

X = data[text_col].astype(str)
y = data["label"]

print(f"Total samples: {len(data)} ({fake.shape[0]} fake, {real.shape[0]} real)")

# Split for evaluation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Vectorizing text with TF-IDF...")
vectorizer = TfidfVectorizer(stop_words='english', max_features=50000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec  = vectorizer.transform(X_test)

print("Training Naive Bayes model...")
model = LogisticRegression(max_iter=1000)
model.fit(X_train_vec, y_train)

# Evaluate
acc = accuracy_score(y_test, model.predict(X_test_vec))
print(f"Model accuracy on test set: {acc * 100:.2f}%")

# Save model and vectorizer
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("Saved model.pkl and vectorizer.pkl")
print("Training complete! You can now run the backend server.")
