from django.shortcuts import render, get_object_or_404
from django.template import loader
from .models import Meteorite


# Create your views here.
def index(request):
    meteorite_list = Meteorite.objects.all()
    template = loader.get_template('registry/index.html')
    context = {
        'meteorite_list': meteorite_list,
    }
    return render(request, 'registry/index.html', context)


def detail(request, meteorite_id):
    meteorite = get_object_or_404(Meteorite, pk=meteorite_id)
    return render(request, 'registry/detail.html', {'meteorite': meteorite})
