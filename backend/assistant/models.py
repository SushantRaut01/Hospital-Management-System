# from django.db import models
# from django.utils import timezone

# class Patient_Data(models.Model):
#     name = models.CharField(max_length=100)
#     surname = models.CharField(max_length=100)
#     age = models.IntegerField()
#     weight = models.FloatField()
#     phone = models.CharField(max_length=15)
#     address = models.TextField()
#     gender = models.CharField(max_length=10, blank=True, null=True)  
#     state = models.CharField(max_length=100, blank=True, null=True)  
#     city = models.CharField(max_length=100, blank=True, null=True)
#     status = models.CharField(max_length=20, default="Pending")
#     created_at = models.DateTimeField(default=timezone.now)

#     def __str__(self):
#         return f"{self.name} {self.surname}"


from django.db import models
import random

def generate_numeric_pid():
    digits = 6  # start with 6-digit numbers
    max_attempts = 10  # number of times to try before scaling

    while digits <= 12:  # scale up to 12 digits if needed
        for _ in range(max_attempts):
            number = random.randint(10**(digits - 1), 10**digits - 1)
            pid = f"PID{number}"
            if not Patient_Data.objects.filter(pid=pid).exists():
                return pid
        digits += 1  # all 6-digit PIDs exhausted? move to 7, 8...
    raise Exception("Too many patients! Couldn't generate a unique PID.")

class Patient_Data(models.Model):
    pid = models.CharField(
        max_length=20,
        primary_key=True,
        unique=True,
        editable=False,
        default=generate_numeric_pid
    )

    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    age = models.IntegerField()
    weight = models.FloatField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    gender = models.CharField(max_length=10, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pid} - {self.name} {self.surname}"
