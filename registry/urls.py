from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='registry-index'),
    path('<int:meteorite_id>/', views.detail, name='detail'),
]