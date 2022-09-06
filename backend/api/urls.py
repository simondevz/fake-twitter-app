from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path("users/", views.ListUsers.as_view()),
    path("users/<int: key>", views.UpdateUser.as_view()),
]

urlpatterns = format_suffix_partterns(urlpatterns)