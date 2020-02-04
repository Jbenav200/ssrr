import json
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.contrib import admin
from django.contrib.auth.models import Group, User
from pip._vendor import requests

from .models import Meteorite
from django.urls import path


class MeteoriteImportAdmin(admin.ModelAdmin):
    search_fields = ('name', 'rec_class', 'mass', 'fall', 'year', 'rec_latitude', 'rec_longitude', 'geolocation')
    list_display = ('id', 'name', 'rec_class', 'mass', 'fall', 'year', 'rec_latitude', 'rec_longitude', 'geolocation')
    list_display_links = (
        'id', 'name', 'rec_class', 'mass', 'fall', 'year', 'rec_latitude', 'rec_longitude', 'geolocation')
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
            if 'mass' in m:
                mass = m['mass']
            else:
                mass = 0
            fall = m['fall']
            if 'year' in m:
                year = m['year']
            else:
                year = '0001-01-01T00:00:00.000'
            if 'reclat' in m:
                rec_latitude = m['reclat']
            else:
                rec_latitude = '00.00'
            if 'reclong' in m:
                rec_longitude = m['reclong']
            else:
                rec_longitude = '00.00'
            if 'geolocation' in m:
                geolocation = m['geolocation']
            else:
                geolocation = "{'latitude': '00.00000', 'longitude': '00.00000'}"
            m = Meteorite(id, name, rec_c, mass, fall, year, rec_latitude, rec_longitude, geolocation)
            m.save()
            next = request.POST.get('next', '/')
        return HttpResponseRedirect(next)


admin.site.site_header = 'Scottish Space Rock Register - Admin Dashboard'
admin.site.index_title = 'S.S.R.R Administration'
admin.site.register(Meteorite, MeteoriteImportAdmin)
admin.site.unregister(Group)
admin.site.unregister(User)
