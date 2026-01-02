# predictor/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PredictionSerializer
from .ml.model import decision_tree_model, linear_model, scaler, FEATURES
import numpy as np

class PredictView(APIView):
    def post(self, request):
        serializer = PredictionSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            
            # Extract features in the correct order
            X = np.array([[data[feature] for feature in FEATURES]])
            
            # Scale features
            X_scaled = scaler.transform(X)
            
            # Select model
            if data["model_type"] == "decision_tree":
                prediction = decision_tree_model.predict(X_scaled)[0]
            else:
                prediction = linear_model.predict(X_scaled)[0]

            return Response({"predicted_G3": round(float(prediction), 2)})
        
        return Response(serializer.errors, status=400)
