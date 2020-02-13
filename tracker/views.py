from django.shortcuts import render
from django.http import HttpResponse

from registry.models import Meteorite


# index view
def index(request):
    return render(request, 'tracker/index.html')


def tracker(request):
    return HttpResponse('<h1 style="text-align:center">Track Meteorite Landings</h1>')


def tracker_map(request):
    meteorites = Meteorite.objects.all()[:50]
    context = {
        'meteorites': meteorites
    }
    return render(request, 'tracker/map.html', context)

