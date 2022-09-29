from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import (
    User, 
    Post,
    FollowingRecords, 
    Comments, Retweet,
    Reaction,
    Notification
)
from .serializers import (
    UserSerializer,
    PostSerializer, 
    FollowingRecordsSerializer,
    CommentsSerializer,
    RetweetSerializer,
    ReactionSerializer,
    NotificationSerializer
)

# Create your views here.
class ListUsers(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UpdateUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

class PostsView(generics.ListCreateAPIView):
    # Remove this later
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
# A view that retrieves a thread, 
# by recursively get the post with thread id of the previous one