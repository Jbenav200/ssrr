from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('map/', views.tracker_map, name='tracker-map'),
    path('globe/', views.tracker_globe, name='tracker-globe'),
    path('download/', views.tracker_download, name='tracker-download'),
    path('docs/', views.tracker_docs, name='tracker-download'),
    path('download/json', views.tracker_json, name='download-json'),
    path('download/csv', views.tracker_csv, name='download-csv'),
    path('features.geojson', views.geojson, name='geojson'),
]

