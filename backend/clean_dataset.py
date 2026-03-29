import pandas as pd

# Load current datasets
fake = pd.read_csv("Fake.csv")
true = pd.read_csv("True.csv")

# Remove India rows
fake_clean = fake[fake["subject"] != "india"]
true_clean = true[true["subject"] != "india"]

# Save cleaned datasets
fake_clean.to_csv("Fake.csv", index=False)
true_clean.to_csv("True.csv", index=False)

print("✅ Indian data removed successfully!")