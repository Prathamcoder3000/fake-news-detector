import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import sys



fake = pd.read_csv("Fake.csv")
real = pd.read_csv("True.csv")

fake["label"] = 1
real["label"] = 0

data = pd.concat([fake, real])



X = data["text"]
y = data["label"]


vectorizer = TfidfVectorizer(stop_words='english')
X_vec = vectorizer.fit_transform(X)



model = MultinomialNB()
model.fit(X_vec, y)



def predict(text):
 input_vec = vectorizer.transform([text]) # ← THIS is important
 prediction = model.predict(input_vec)[0]
 prob = model.predict_proba(input_vec)[0].max()

 if prediction == 1:
  return f"Fake,{int(prob*100)}"
 else:
    return f"Real,{int(prob*100)}"


input_text = sys.argv[1]

print(predict(input_text))