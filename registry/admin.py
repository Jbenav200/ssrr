import json
from django.http import JsonResponse, HttpResponse
from django.contrib import admin
from django.contrib.auth.models import Group
from pip._vendor import requests

from .models import Meteorite
from django.urls import path


class MeteoriteImportAdmin(admin.ModelAdmin):
    search_fields = ('name', 'rec_class', 'mass', 'fall', 'year', 'rec_latitude', 'rec_longitude', 'geolocation')
    list_display = ('name', 'rec_class', 'mass', 'fall', 'year', 'rec_latitude', 'rec_longitude', 'geolocation')
    list_display_links = ('name', 'rec_class', 'mass', 'fall', 'year', 'rec_latitude', 'rec_longitude', 'geolocation')
    change_list_template = 'admin/meteorites/meteorites_change_list.html'

    class Meta:
        model = Meteorite

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('import/', self.populate)
        ]
        return custom_urls + urls

    def populate(self, request):
        r = requests.get('https://data.nasa.gov/resource/gh4g-9sfh.json')
        new_data = r.json()
        for m in new_data:
            id = m['id']
            name = m['name']
            rec_c = m['recclass']
            mass = m['mass']
            fall = m['fall']
            year = m['year']
            rec_latitude = m['reclat']
            rec_longitude = m['reclong']
            geolocation = m['geolocation']
            m = Meteorite(id, name, rec_c, mass, fall, year, rec_latitude, rec_longitude, geolocation)
            m.save()
        return HttpResponse("saved.")


admin.site.site_header = 'Scottish Space Rock Register - Admin Dashboard'
admin.site.register(Meteorite, MeteoriteImportAdmin)
