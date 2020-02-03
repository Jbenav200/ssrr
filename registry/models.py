from django.db import models


# Create your models here.
class NEO(models.Model):
    id = models.IntegerField()
    name = models.CharField(max_length=200)


class Asteroid(NEO):
    diameter = models.FloatField()
    orbit_circumference = models.FloatField()

