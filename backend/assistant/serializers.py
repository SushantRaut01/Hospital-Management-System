from rest_framework import serializers
from .models import Patient_Data

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient_Data
        fields = '__all__'
