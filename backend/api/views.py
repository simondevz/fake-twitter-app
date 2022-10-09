from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import generics

from .models import (
    User, Post,
    FollowingRecords, 
    Comments, Retweet,
    Reaction, Notification
)
from .serializers import (
    CommentsSerializer, RetweetSerializer,
    UserSerializer, PostSerializer, 
    FollowingRecordsSerializer,
    NotificationSerializer,
    ReactionSerializer,
)

class ListUsers(generics.ListCreateAPIView):
    # Remove this later
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UpdateUser(generics.RetrieveUpdateDestroyAPIView):
    # Remove this later
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    # Get a user depending on what is passed in
    def get_queryset(self, pk=None, username=None):
        if pk:
            user = User.objects.get(pk=pk)
            return user
        
        user = User.objects.get(username=username)
        return user
    
    def get(self, request, pk=None, username=None):
        # Handle error
        if pk == None and username == None:
            pass
        
        queryset = self.get_queryset(pk, username)
        serializeUser = UserSerializer(queryset)
        return Response(serializeUser.data)

class PostsView(generics.ListCreateAPIView):
    # Remove this later
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    # Override queryset to get data from both posts and retweet models
    def get_queryset(self, pk=None):
        path = self.request.META['PATH_INFO']
        
        # Get posts in general when pk is none
        if pk == None and path == '/api/posts/':
            posts = Post.objects.all()
            retweet = Retweet.objects.all()
            return {
                "posts": posts,
                "retweet": retweet
            }
        
        # Get posts from a specific user when pk is given
        posts = Post.objects.filter(userId=pk)
        retweet = Retweet.objects.filter(userId=pk)
        return {
            "posts": posts,
            "retweet": retweet
        }
    
    def get(self, request, pk=None):
        # Add error handling for bad request
        
        queryset = self.get_queryset(pk)
        serializePost = PostSerializer(queryset['posts'], many=True)
        serializeRetweet = RetweetSerializer(queryset['retweet'], many=True)
        
        # Send both posts(tweets) and retweets in home feed
        data = serializePost.data + serializeRetweet.data
        return Response(data)
    
    def post(self, request, pk):
        print(request.data);
        return Response('yh')

# A view that retrieves a thread, 
# by recursively get the post with thread id of the previous one