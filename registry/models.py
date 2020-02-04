from django.db import models


# Create your models here.
class Meteorite(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    rec_class = models.CharField(max_length=50)
    mass = models.FloatField()
    fall = models.CharField(max_length=20)
    year = models.DateTimeField()
    rec_latitude = models.CharField(max_length=200)
    rec_longitude = models.CharField(max_length=200)
    geolocation = models.CharField(max_length=250)

    def __str__(self):
        return self.name

    @classmethod
    def create(cls, id, name, rec_class, mass, fall, year, rec_latitude, rec_longitude, geolocation):
        meteorite = Meteorite(id=id, name=name, rec_class=rec_class, mass=mass, fall=fall, year=year,
                              rec_latitude=rec_latitude, rec_longitude=rec_longitude, geolocation=geolocation)
        return meteorite
