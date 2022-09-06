from rest_framework import generics
from .models import User, Post, FollowingRecords, Comments, Retweet, Reaction, Notification
from .serializers import UserSerializer, PostSerializer, FollowingRecordsSerializer, CommentsSerializer, RetweetSerializer, ReactionSerializer, NotificationSerializer

# Create your views here.
class ListUsers(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UpdateUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer