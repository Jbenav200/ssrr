from django.shortcuts import render
from django.http import HttpResponse


# index view
def index(request):
    return HttpResponse("<h1 style='text-align:center'>Hello, human.</h1> <h3>You're at the tracker index.</h3>")


def tracker(request):
    return HttpResponse('<h1 style="text-align:center">Track Near Earth Objects</h1>')

