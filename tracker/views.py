from django.shortcuts import render
from django.http import HttpResponse

from registry.models import Meteorite


# index view
def index(request):
    context = {
        'title': 'Index',
    }
    return render(request, 'tracker/index.html', context)


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


def tracker_globe(request):
    meteorites = Meteorite.objects.all()
    context = {
        meteorites: 'meteorites',
    }
    return render(request, 'tracker/globe.html', context)
