from rest_framework import serializers

from .models import User, Post, FollowingRecords, Comments, Retweet, Reaction, Notification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'bio', 'deactivated', 'profile_picture', 'cover_photo', 'date_of_birth', 'date_joined']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'userId', 'thread', 'text', 'media', 'date_posted']

class FollowingRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowingRecords
        fields = ['id', 'userId', 'following', 'date_followed']

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'userId', 'postId', 'commentId', 'retweetId', 'text', 'media', 'date_posted']

class RetweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retweet
        fields = ['id', 'userId', 'postId', 'commentId', 'retweetId', 'thread', 'text', 'media', 'date_posted']

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ['id', 'userId', 'postId', 'commentId', 'retweetId', 'liked']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'userId', 'followerId', 'postId', 'commentId', 'reactionId', 'date_notified']