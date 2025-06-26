from django.http import JsonResponse
from assistant.models import Patient_Data
from django.http import JsonResponse
from .models import Medicine, Prescription, PrescriptionItem
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MedicineNameSerializer
from uuid import uuid5, NAMESPACE_DNS
from rest_framework import status


def incoming_patients(request):
    patients = Patient_Data.objects.filter(status__in=["In Clinic", "Emergency"]).order_by("created_at")
    data = list(patients.values())  # convert queryset to list of dicts
    return JsonResponse(data, safe=False)


def search_medicine(request):
    query = request.GET.get('q', '')
    if query:
        meds = Medicine.objects.filter(name__istartswith=query).values('uid', 'name')[:15]
    else:
        meds = []
    return JsonResponse(list(meds), safe=False)



@api_view(['GET'])
def autocomplete_medicine_api(request):
    query = request.GET.get("q", "")
    results = []

    if query:
        results = Medicine.objects.filter(name__icontains=query).values("name")[:10]

    return Response(results)


@api_view(['POST'])
def save_prescription(request):
    try:
        data = request.data
        patient_id = data.get('patient_id')
        medicines = data.get('medicines', [])

        patient = Patient_Data.objects.get(pid=patient_id)
        prescription = Prescription.objects.create(patient=patient)

        for med in medicines:
            name = med['medName'].strip().lower()
            uid = uuid5(NAMESPACE_DNS, name)

            medicine, _ = Medicine.objects.get_or_create(uid=uid, defaults={'name': name})
            PrescriptionItem.objects.create(
                prescription=prescription,
                medicine=medicine,
                dose=med['dose'],
                frequency=med['freq'],
                time=med['time'],
                remarks=med['remarks'],
            )

        patient.status = 'Done'
        patient.save()



        return Response({'message': 'Prescription saved successfully.'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
