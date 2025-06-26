# serializers.py
from rest_framework import serializers
from .models import Medicine

class MedicineNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ["name"]
