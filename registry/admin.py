import json
from django.http import JsonResponse
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
            print(m)


admin.site.site_header = 'Scottish Space Rock Register - Admin Dashboard'
admin.site.register(Meteorite, MeteoriteImportAdmin)
