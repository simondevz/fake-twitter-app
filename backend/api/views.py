import io
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import generics

from .models import (
    User, Post, Media,
    FollowingRecords, 
    Comments, Retweet,
    Reaction, Notification
)
from .serializers import (
    CommentsSerializer, RetweetSerializer,
    MediaSerializer,CreatePostSerializer, 
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

class PostsView(generics.ListAPIView):
    # Remove this later
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    # Override queryset to get data from posts
    def get_queryset(self, pk=None):
        path = self.request.META['PATH_INFO']
        
        # Get posts in general when pk is none
        if pk == None and path == '/api/posts/':
            posts = Post.objects.all()
            return posts
        
        # Get posts from a specific user when pk is given
        posts = Post.objects.filter(userId=pk)
        return posts
    
    def get(self, request, pk=None):
        # Add error handling for bad request
        
        queryset = self.get_queryset(pk)
        serializePost = PostSerializer(queryset, many=True)
        return Response(serializePost.data)

class CreatePostView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = CreatePostSerializer

class CreateMediaView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Media.objects.all()
    serializer_class = MediaSerializer

class CommentsView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    
    def get_queryset(self, pk):
        # Get comments for a specific post when pk is given
        comments = Comments.objects.filter(postId=pk)
        return comments
    
    def get(self, request, pk=None):
        # Add error handling for bad request
        
        queryset = self.get_queryset(pk)
        serializeComments = CommentsSerializer(queryset, many=True)
        return Response(serializeComments.data)

# A view that retrieves a thread, 
# by recursively get the post with thread id of the previous one
class ThreadView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    # Override queryset to get threads from posts
    def get_queryset(self, pk):
        posts = []
        while True:
            try:
                post = Post.objects.get(thread=pk)
                posts= [*posts, post]
                pk = post.id
            except Post.DoesNotExist:
                break
        
        return posts
    
    def get(self, request, pk):
        # Add error handling for bad request
        
        queryset = self.get_queryset(pk)
        serializePost = PostSerializer(queryset, many=True)
        return Response(serializePost.data)

class RetweetView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Retweet.objects.all()
    serializer_class = RetweetSerializer