"""
ai_model.py — Loads a pre-trained model and predicts fake/real for a given text.
Run train.py first to generate model.pkl and vectorizer.pkl.
If pickle files are missing, this script will auto-train from CSV (slower first run).

Usage: py ai_model.py "your news text here"
Output: "Fake,87" or "Real,92"
"""

import sys
import os
import pickle

MODEL_PATH      = os.path.join(os.path.dirname(__file__), "model.pkl")
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), "vectorizer.pkl")


def load_or_train():
    """Load model from pickle. If not found, train and save."""
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        with open(VECTORIZER_PATH, "rb") as f:
            vectorizer = pickle.load(f)
        return model, vectorizer

    # Pickle files missing — train from CSV (fallback)
    import pandas as pd
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.linear_model import LogisticRegression
    csv_dir = os.path.dirname(__file__)
    fake = pd.read_csv(os.path.join(csv_dir, "Fake.csv"))
    real = pd.read_csv(os.path.join(csv_dir, "True.csv"))

    fake["label"] = 1
    real["label"] = 0
    data = pd.concat([fake, real]).reset_index(drop=True)

    text_col = "text" if "text" in data.columns else ("title" if "title" in data.columns else data.columns[0])
    data = data.dropna(subset=[text_col])

    X = data[text_col].astype(str)
    y = data["label"]

    vectorizer = TfidfVectorizer(stop_words='english', max_features=50000)
    X_vec = vectorizer.fit_transform(X)

    model = LogisticRegression(max_iter=1000)    
    model.fit(X_vec, y)

    # Save for future runs
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)
    with open(VECTORIZER_PATH, "wb") as f:
        pickle.dump(vectorizer, f)

    return model, vectorizer


def predict(text: str) -> str:
    model, vectorizer = load_or_train()
    input_vec = vectorizer.transform([text])
    prediction = model.predict(input_vec)[0]
    prob = model.predict_proba(input_vec)[0].max()
    label = "Fake" if prediction == 1 else "Real"
    return f"{label},{int(prob * 100)}"


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Real,50")
        sys.exit(0)

    input_text = sys.argv[1]
    print(predict(input_text))
