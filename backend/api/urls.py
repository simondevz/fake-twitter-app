from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import include, path
from . import views

urlpatterns = [
    path("users/", views.ListUsers.as_view()),
    path("users/<int:pk>/", views.UpdateUser.as_view()),
    path("users/<str:username>/", views.UpdateUser.as_view()),
    path("users/<int:pk>/posts/", views.PostsView.as_view()),
    path("posts/", views.PostsView.as_view()),
    path("posts/<int:pk>/", views.CreatePostView.as_view()),
    path("posts/<int:pk>/thread/", views.ThreadView.as_view()),
    path("posts/<int:pk>/media/", views.CreateMediaView.as_view()),
    path("comments/<int:pk>/", views.CommentsView.as_view()),
    path("retweet/", views.RetweetView.as_view()),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)