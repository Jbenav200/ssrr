from django.shortcuts import render, get_object_or_404
from django.template import loader
from .models import Meteorite
from .forms import ExampleForm


# Create your views here.
def index(request):
    meteorite_list = Meteorite.objects.all()
    example_form = ExampleForm()
    context = {
        'meteorite_list': meteorite_list,
        'example_form': example_form,
    }
    return render(request, 'registry/index.html', context)


def detail(request, meteorite_id):
    meteorite = get_object_or_404(Meteorite, pk=meteorite_id)
    return render(request, 'registry/detail.html', {'meteorite': meteorite})
