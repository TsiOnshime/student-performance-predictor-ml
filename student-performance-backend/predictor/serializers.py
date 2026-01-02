# predictor/serializers.py
from rest_framework import serializers

class PredictionSerializer(serializers.Serializer):
    model_type = serializers.ChoiceField(choices=['decision_tree','linear_regression'])
    studytime = serializers.FloatField()
    absences = serializers.FloatField()
    G1 = serializers.FloatField()
    G2 = serializers.FloatField()
    failures = serializers.FloatField()
    Medu = serializers.FloatField()
    Fedu = serializers.FloatField()
    freetime = serializers.FloatField()
    goout = serializers.FloatField()
    health = serializers.FloatField()
