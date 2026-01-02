# predictor/ml/model.py
import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the improved models
decision_tree_model = joblib.load(os.path.join(BASE_DIR, "decision_tree_G3.pkl"))
linear_model = joblib.load(os.path.join(BASE_DIR, "linear_regression_G3.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "scaler.pkl"))

# List of features used in the model
FEATURES = ['studytime','absences','G1','G2','failures','Medu','Fedu','freetime','goout','health']
