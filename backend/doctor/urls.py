from django.urls import path
from .views import incoming_patients
from .views import search_medicine
from .views import autocomplete_medicine_api  
from .views import save_prescription

urlpatterns = [
    path("incoming-patients/", incoming_patients, name="incoming-patients"),
    path("medicines/", search_medicine, name="search_medicine"),
    path("medicines/autocomplete/", autocomplete_medicine_api),
    path('save-prescription/', save_prescription, name='save-prescription'),

]
