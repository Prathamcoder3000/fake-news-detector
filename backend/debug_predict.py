"""
Debug version of prediction to understand what's happening
"""

import os
import re
import string
import pickle

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), "vectorizer.pkl")

def clean_text(text: str) -> str:
    """Apply same preprocessing as training."""
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

# Load model and vectorizer
with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

with open(VECTORIZER_PATH, 'rb') as f:
    vectorizer = pickle.load(f)

# Test texts
test_texts = [
    "Breaking news: Scientists discover cure for all diseases using ancient remedy",
    "The Federal Reserve announced interest rate decision after considering economic indicators",
    "Weather today is sunny with some clouds"
]

print("=" * 80)
print("DEBUG PREDICTIONS")
print("=" * 80)

for i, text in enumerate(test_texts, 1):
    print(f"\nTest {i}:")
    print(f"Original text: {text[:70]}...")
    
    cleaned = clean_text(text)
    print(f"Cleaned text:  {cleaned[:70]}...")
    
    # Transform with vectorizer
    vec = vectorizer.transform([cleaned])
    print(f"Vector shape:  {vec.shape}")
    print(f"Vector nnz:    {vec.nnz} (non-zero features)")
    
    # Get prediction
    pred = model.predict(vec)[0]
    
    # Get probabilities
    proba = model.predict_proba(vec)[0]
    
    # Get decision function if available
    try:
        decision = model.decision_function(vec)[0]
        print(f"Decision score: {decision:.4f}")
    except:
        print(f"Decision score: N/A (not available)")
    
    print(f"Probabilities: [Real: {proba[0]*100:.2f}%, Fake: {proba[1]*100:.2f}%]")
    
    pred_label = 'Real' if pred == 0 else 'Fake'
    confidence = max(proba) * 100
    print(f"Prediction: {pred_label}, {confidence:.2f}% confidence")
    print("-" * 80)

