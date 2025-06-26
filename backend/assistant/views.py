from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import PatientSerializer
from .models import Patient_Data  
from rest_framework import status as http_status
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .models import Patient_Data



# Add new patient (POST)
@api_view(['POST'])
def add_patient(request):
    serializer = PatientSerializer(data=request.data)
    if serializer.is_valid():
        patient = serializer.save()
        return Response(PatientSerializer(patient).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all patients (GET)
@api_view(['GET'])
def get_patients(request):
    patients = Patient_Data.objects.all().order_by('created_at')
    serializer = PatientSerializer(patients, many=True)
    return Response(serializer.data)


# Add a view for status update
@api_view(['POST'])
def update_patient_status(request, pid):
    try:
        patient = Patient_Data.objects.get(pid=pid)
        new_status = request.data.get('status')
        if new_status:
            patient.status = new_status
            patient.save()
            return Response({'message': 'Status updated'}, status=http_status.HTTP_200_OK)
        return Response({'error': 'No status provided'}, status=http_status.HTTP_400_BAD_REQUEST)
    except Patient_Data.DoesNotExist:
        return Response({'error': 'Patient not found'}, status=http_status.HTTP_404_NOT_FOUND)

# Delete patient (DELETE)
@api_view(['DELETE'])
def delete_patient(request, pid):
    try:
        patient = Patient_Data.objects.get(pid=pid)
        patient.delete()
        return Response({'message': 'Patient deleted successfully'}, status=http_status.HTTP_204_NO_CONTENT)
    except Patient_Data.DoesNotExist:
        return Response({'error': 'Patient not found'}, status=http_status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def edit_patient(request, pid):
    try:
        patient = Patient_Data.objects.get(pid=pid)
        serializer = PatientSerializer(patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Patient_Data.DoesNotExist:
        return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)



