# assistant/urls.py
from django.urls import path
from .views import add_patient, get_patients, update_patient_status, delete_patient, edit_patient

urlpatterns = [
    path('add-patient/', add_patient, name='add-patient'),
    path('patients/', get_patients, name='patient-data'),  # use get_patients here
    path('update-status/<str:pid>/', update_patient_status, name='update-status'),
    path('delete-patient/<str:pid>/', delete_patient, name='delete-patient'),  
    path('edit-patient/<str:pid>/', edit_patient, name='edit-patient'),
    


]
