from django.db import transaction
from rest_framework import serializers

from .models import User, Post, FollowingRecords, Comments, Retweet, Reaction, Notification

class FollowingRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowingRecords
        fields = [
            'id', 
            'userId', 
            'following',
            'date_followed'
        ]

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = [
            'id',
            'userId',
            'postId',
            'commentId',
            'retweetId',
            'text',
            'media',
            'date_posted',
            'time_posted',
        ]

class RetweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retweet
        fields = [
            'id',
            'userId',
            'postId', 
            'commentId', 
            'retweetId',
            'thread',
            'text',
            'media',
            'date_posted',
            'time_posted',
        ]

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = [
            'id',
            'userId', 
            'postId', 
            'commentId', 
            'retweetId', 
            'liked'
        ]

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            'id', 
            'userId', 
            'followerId',
            'postId',
            'commentId', 
            'reactionId', 
            'date_notified',
            'time_notified',
            'sent',
        ]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username', 
            'email',
            'name', 
            'bio', 
            'deactivated',
            'profile_picture',
            'cover_photo',
            'date_of_birth', 
            'date_joined'
        ]

class PostSerializer(serializers.ModelSerializer):
    userId = UserSerializer(read_only=True)
    comments = CommentsSerializer("comments", many=True)
    reactions = ReactionSerializer("reactions", many=True)
    retweets = RetweetSerializer("retweets", many=True)
    
    class Meta:
        model = Post
        fields = [
            'id',
            'userId',
            'thread',
            'threadHead',
            'comments',
            'retweets',
            'reactions',
            'text',
            'media',
            'date_posted',
            'time_posted',
        ]
    
    def to_representation(self, value):
        rep = super().to_representation(value)
        
        rep['comments'] = value.comments.count()
        rep['retweets'] = value.retweets.count()
        
        return rep