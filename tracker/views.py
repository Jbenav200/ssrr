from django.shortcuts import render
from django.http import HttpResponse


# index view
def index(request):
    return HttpResponse("<h1 style='text-align:center'>Scottish Space Rock Registry</h1> <h3>You're at the tracker "
                        "index.</h3>")


def tracker(request):
    return HttpResponse('<h1 style="text-align:center">Track Meteorite Landings</h1>')

