import sys

text = sys.argv[1].lower()

fake_words = ["shocking", "viral", "breaking", "secret", "exposed"]

score = 0

for word in fake_words:
    if word in text:
        score += 1

if score > 1:
    print("Fake,85")
else:
    print("Real,70")