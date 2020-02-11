from django.shortcuts import render
from django.http import HttpResponse


# index view
def index(request):
    return render(request, 'tracker/index.html')


def tracker(request):
    return HttpResponse('<h1 style="text-align:center">Track Meteorite Landings</h1>')

