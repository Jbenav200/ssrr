from django.urls import path, include
from django.conf.urls import url
from . import views

urlpatterns = [
    path('', views.index, name='registry-index'),
    path('<int:meteorite_id>/', views.detail, name='detail'),
    path('search/<str:meteorite_name>/', views.search_return, name='search-by-name'),
    url(r'^results/$', views.search, name='search'),
]