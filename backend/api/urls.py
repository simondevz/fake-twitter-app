from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path("users/", views.ListUsers.as_view()),
    path("users/<int:key>", views.UpdateUser.as_view()),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls'))
]

urlpatterns = format_suffix_patterns(urlpatterns)