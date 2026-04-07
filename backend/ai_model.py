import sys
import os
import re
import string
import pickle
import pandas as pd

import pytesseract
from PIL import Image

# 🔥 TESSERACT PATH
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), "vectorizer.pkl")

UNCERTAINTY_THRESHOLD = 55

# 🔥 LOAD DATASET FOR EXACT MATCH
fake_df = pd.read_csv(os.path.join(os.path.dirname(__file__), "Fake.csv"))
true_df = pd.read_csv(os.path.join(os.path.dirname(__file__), "True.csv"))

fake_texts = set(fake_df["text"].str.lower())
true_texts = set(true_df["text"].str.lower())


# 🔥 TEXT CLEANING
def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r'https?:\/\/\S+|www\.\S+', ' ', text)
    text = re.sub(f'[{re.escape(string.punctuation)}]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()

    stopwords = {
        'the','a','an','and','or','is','are','be','to','of','in','on','at','for','with',
        'by','was','were','been','being','has','have','had','do','does','did','will',
        'would','should','could','may','might','can','this','that','these','those',
        'i','you','he','she','it','we','they','am'
    }

    tokens = [t for t in text.split() if t not in stopwords]
    return ' '.join(tokens)


# 🔥 LOAD MODEL
def load_or_train():
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        with open(VECTORIZER_PATH, 'rb') as f:
            vectorizer = pickle.load(f)
        return model, vectorizer

    raise Exception("Model not found. Run train.py first.")


model, vectorizer = load_or_train()


# 🔥 MAIN PREDICT FUNCTION
def predict(text: str) -> str:
    text_lower = text.lower().strip()

    # ✅ EXACT MATCH (100%)
    if text_lower in fake_texts:
        return "Fake,100"

    if text_lower in true_texts:
        return "Real,100"

    # ✅ ML MODEL
    cleaned_text = clean_text(text)

    if not cleaned_text or len(cleaned_text.split()) < 3:
        return "Uncertain,50"

    input_vec = vectorizer.transform([cleaned_text])

    prediction = model.predict(input_vec)[0]
    proba = model.predict_proba(input_vec)[0]

    confidence = max(proba) * 100

    if confidence < UNCERTAINTY_THRESHOLD:
        return f"Uncertain,{int(confidence)}"

    result = "Fake" if prediction == 1 else "Real"

    return f"{result},{int(confidence)}"


# 🔥 OCR FUNCTION (IMPROVED)
def extract_text_from_image(image_path: str) -> str:
    try:
        img = Image.open(image_path).resize((800, 800))
        img = img.convert("L")  # grayscale
        img = img.point(lambda x: 0 if x < 140 else 255)  # threshold

        # 🔥 improve OCR
        img = img.convert("L")

        text = pytesseract.image_to_string(
            img,
            config='--oem 3 --psm 6'
        )

       # print("OCR TEXT:", text[:200])  # debug

        return text.strip()

    except Exception as e:
        print("OCR ERROR:", e)
        return ""


# 🔥 IMAGE PREDICTION
def predict_from_image(image_path: str) -> str:
    try:
        text = extract_text_from_image(image_path)

        if not text or len(text.split()) < 3:
            return "Uncertain,50"

        return predict(text)

    except Exception as e:
        print("IMAGE ERROR:", e)
        return "Uncertain,0"


# 🔥 MAIN ENTRY
if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Real,50")
        sys.exit(0)

    if sys.argv[1] == '--image' and len(sys.argv) > 2:
        print(predict_from_image(sys.argv[2]))
    else:
        print(predict(sys.argv[1]))