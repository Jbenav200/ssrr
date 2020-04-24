from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('map/', views.tracker_map, name='tracker-map'),
    path('download/', views.tracker_download, name='tracker-download'),
    path('features.geojson', views.geojson, name='geojson'),
]

