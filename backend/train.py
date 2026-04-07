"""
train.py — Train the fake news model using LinearSVC (with calibration)
"""

import os
import re
import string
import pickle

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, ENGLISH_STOP_WORDS
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV

DATA_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(DATA_DIR, "model.pkl")
VECTORIZER_PATH = os.path.join(DATA_DIR, "vectorizer.pkl")

STOPWORDS = ENGLISH_STOP_WORDS


# 🔹 CLEAN TEXT FUNCTION
def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"https?://\S+|www\.\S+", " ", text)
    text = re.sub(f"[{re.escape(string.punctuation)}]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    tokens = [t for t in text.split() if t not in STOPWORDS]
    return " ".join(tokens)


print("📂 Loading datasets...")

fake = pd.read_csv(os.path.join(DATA_DIR, "Fake.csv"))
real = pd.read_csv(os.path.join(DATA_DIR, "True.csv"))

fake["label"] = 1   # Fake
real["label"] = 0   # Real

# 🔹 MERGE + SHUFFLE
data = pd.concat([fake, real])
data = data.sample(frac=1, random_state=42).reset_index(drop=True)

# 🔹 CHECK BALANCE
print("Class distribution:")
print(data["label"].value_counts())

# 🔹 SELECT TEXT COLUMN
text_col = "text" if "text" in data.columns else (
    "title" if "title" in data.columns else data.columns[0]
)

print(f"Using column: '{text_col}'")

# 🔹 CLEAN DATA
data = data.dropna(subset=[text_col])
data[text_col] = data[text_col].astype(str).apply(clean_text)

X = data[text_col]
y = data["label"]

print(f"Total samples: {len(data)}")

# 🔹 TRAIN TEST SPLIT
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

# 🔹 TF-IDF (IMPROVED)
print("🔍 Vectorizing...")
vectorizer = TfidfVectorizer(
    max_features=50000,
    ngram_range=(1, 2),
    stop_words="english"
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# 🔹 MODEL (CALIBRATED SVM with balanced class weights)
print("🤖 Training model...")

base_model = LinearSVC(dual=False, max_iter=10000, random_state=42, class_weight='balanced')
model = CalibratedClassifierCV(base_model)

model.fit(X_train_vec, y_train)

# 🔹 EVALUATION
print("📊 Evaluating...")
y_pred = model.predict(X_test_vec)

acc = accuracy_score(y_test, y_pred)
print(f"Accuracy: {acc * 100:.2f}%")

print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=["Real", "Fake"]))

# 🔹 CONFIDENCE ANALYSIS
print("\n📈 Confidence Analysis (for debugging bias):")
y_proba = model.predict_proba(X_test_vec)
confidences = [max(proba) * 100 for proba in y_proba]

print(f"Average confidence: {sum(confidences) / len(confidences):.2f}%")
print(f"Min confidence: {min(confidences):.2f}%")
print(f"Max confidence: {max(confidences):.2f}%")

# Count predictions by class
real_preds = sum(1 for p in y_pred if p == 0)
fake_preds = sum(1 for p in y_pred if p == 1)
print(f"\nPrediction distribution:")
print(f"  Real predictions: {real_preds} ({real_preds/len(y_pred)*100:.1f}%)")
print(f"  Fake predictions: {fake_preds} ({fake_preds/len(y_pred)*100:.1f}%)")

# 🔹 SAVE
print("💾 Saving model...")
with open(MODEL_PATH, "wb") as f:
    pickle.dump(model, f)

with open(VECTORIZER_PATH, "wb") as f:
    pickle.dump(vectorizer, f)

print("✅ Training complete. Model saved!")