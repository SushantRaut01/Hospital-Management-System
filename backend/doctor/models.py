from django.db import models
from assistant.models import Patient_Data
from django.utils.text import slugify
import uuid


class Medicine(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False)
    name = models.CharField(max_length=255, unique=True)

    def save(self, *args, **kwargs):
        # Normalize name and generate UUIDv5 based on name
        self.name = self.name.strip().title()
        if not self.uid:
            self.uid = uuid.uuid5(uuid.NAMESPACE_DNS, slugify(self.name))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

# Stores each prescription issued by doctor
class Prescription(models.Model):
    patient = models.ForeignKey(Patient_Data, on_delete=models.CASCADE, related_name='prescriptions')
    date = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.patient.name} - {self.date.date()}"

# Stores each medicine entry for a prescription
class PrescriptionItem(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE, related_name='items')
    medicine = models.ForeignKey(Medicine, on_delete=models.PROTECT)
    dose = models.CharField(max_length=50)           # e.g., 1 tab, 5 ml
    frequency = models.CharField(max_length=100)     # e.g., Twice a day
    time = models.CharField(max_length=100)          # e.g., Morning, Night
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.medicine.name} ({self.dose})"
