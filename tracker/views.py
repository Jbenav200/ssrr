from django.shortcuts import render
from django.http import HttpResponse


# index view
def index(request):
    return HttpResponse("Hello, human. You're at the tracker index.")
