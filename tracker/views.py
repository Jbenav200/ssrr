from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
import csv
from pip._vendor import requests
from registry.models import Meteorite


# index view
def index(request):
    context = {
        'title': 'Index',
    }
    return render(request, 'tracker/index.html', context)

# docs
def tracker_docs(request):
    context = {
        'title': 'Docs',
    }
    return render(request, 'tracker/docs.html', context)


def tracker(request):
    return HttpResponse('<h1 style="text-align:center">Track Meteorite Landings</h1>')


def tracker_map(request):
    meteorites = Meteorite.objects.all()[:50]
    context = {
        'meteorites': meteorites
    }
    return render(request, 'tracker/map.html', context)


def tracker_download(request):
    meteorites = Meteorite.objects.all()
    meteorites_csv = None
    meteorites_json = None
    context = {
        'meteorites': meteorites,
        'meteorites_csv': meteorites_csv,
        'meteorites_JSON': meteorites_json,
    }
    return render(request, 'tracker/download.html', context)


def geojson(request):
    return render(request, 'tracker/package.json')


def tracker_globe(request):
    meteorites = Meteorite.objects.all()
    context = {
       'meteorites': meteorites
    }
    return render(request, 'tracker/globe.html', context)


def tracker_json(request):
    r = requests.get('https://data.nasa.gov/resource/gh4g-9sfh.json')
    new_data = r.json()
    return JsonResponse(new_data, safe=False)


def tracker_csv(request):
    response = HttpResponse(content_type='text/csv')
    writer = csv.writer(response)
    writer.writerow(['id', 'name', 'class', 'mass', 'fall', 'year', 'latitude', 'longitude', 'geolocation'])
    for meteorite in Meteorite.objects.all().values_list('id', 'name', 'rec_class', 'mass', 'fall', 'year', 'rec_latitude', 'rec_longitude', 'geolocation'):
        writer.writerow(meteorite)

    response['Content-Disposition'] = 'attachment; filename="meteorites.csv"'
    return response
