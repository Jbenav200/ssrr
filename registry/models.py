from django.db import models


# Create your models here.
class Meteorite(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    rec_class = models.CharField(max_length=50)
    mass_in_kg = models.FloatField()
    fall = models.CharField(max_length=20)
    year = models.DateTimeField()
    rec_latitude = models.CharField(max_length=200)
    rec_longitude = models.CharField(max_length=200)
    geolocation = models.CharField(max_length=250)

