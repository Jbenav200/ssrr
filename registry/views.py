from django.shortcuts import render, get_object_or_404
from django.template import loader
from .models import Meteorite
from .forms import ExampleForm
from django.urls import reverse


# Create your views here.
def index(request):
    meteorite_list = Meteorite.objects.all()
    form = ExampleForm()

    context = {
        'meteorite_list': meteorite_list,
        'example_form': form,
    }
    return render(request, 'registry/index.html', context)


def detail(request, meteorite_id):
    meteorite = get_object_or_404(Meteorite, pk=meteorite_id)
    return render(request, 'registry/detail.html', {'meteorite': meteorite})


def search_return(request, meteorite_name):
    meteorite = get_object_or_404(Meteorite, meteorite_name=meteorite_name)
    return render(request, 'registry/detail.html', {'meteorite': meteorite})
