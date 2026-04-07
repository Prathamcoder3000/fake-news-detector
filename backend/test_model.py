import pandas as pd
import os
import re
import string
import pickle

MODEL_PATH = "model.pkl"
VECTORIZER_PATH = "vectorizer.pkl"

def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r'https?:\/\/\S+|www\.\S+', ' ', text)
    text = re.sub(f'[{re.escape(string.punctuation)}]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    
    stopwords = {
        'the', 'a', 'an', 'and', 'or', 'is', 'are', 'be', 'to', 'of', 'in', 'on', 'at', 'for', 'with',
        'by', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'do', 'does', 'did', 'will',
        'would', 'should', 'could', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
        'i', 'you', 'he', 'she', 'it', 'we', 'they', 'am'
    }
    tokens = [t for t in text.split() if t not in stopwords]
    return ' '.join(tokens)

# Load model/vectorizer
with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)
with open(VECTORIZER_PATH, 'rb') as f:
    vectorizer = pickle.load(f)

# Load Real and Fake samples
real_df = pd.read_csv('True.csv')
fake_df = pd.read_csv('Fake.csv')

# Get text column
text_col = 'text' if 'text' in real_df.columns else real_df.columns[0]

# Test 2 real samples
print("REAL NEWS SAMPLES FROM TRAINING DATA:")
print("=" * 80)
for i in range(2):
    text = str(real_df[text_col].iloc[i])[:100]
    vec = vectorizer.transform([clean_text(str(real_df[text_col].iloc[i]))])
    pred = model.predict(vec)[0]
    proba = model.predict_proba(vec)[0]
    pred_label = 'Real' if pred == 0 else 'Fake'
    confidence = max(proba) * 100
    print(f"\nSample {i+1}: '{text}...'")
    print(f"Prediction: {pred_label}, {confidence:.2f}% confidence")
    print(f"Probabilities: [Real: {proba[0]*100:.2f}%, Fake: {proba[1]*100:.2f}%]")

# Test 2 fake samples
print("\n\nFAKE NEWS SAMPLES FROM TRAINING DATA:")
print("=" * 80)
for i in range(2):
    text = str(fake_df[text_col].iloc[i])[:100]
    vec = vectorizer.transform([clean_text(str(fake_df[text_col].iloc[i]))])
    pred = model.predict(vec)[0]
    proba = model.predict_proba(vec)[0]
    pred_label = 'Real' if pred == 0 else 'Fake'
    confidence = max(proba) * 100
    print(f"\nSample {i+1}: '{text}...'")
    print(f"Prediction: {pred_label}, {confidence:.2f}% confidence")
    print(f"Probabilities: [Real: {proba[0]*100:.2f}%, Fake: {proba[1]*100:.2f}%]")
