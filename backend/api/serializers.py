from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.db import transaction

from .models import (
    User,
    Post,
    FollowingRecords,
    Comments,
    Retweet,
    Reaction,
    Notification,
    Media,
)


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
            'text',
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


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = [
            'id',
            'gif',
            'media',
            'postId',
            'commentId',
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'name',
            'bio',
            'deactivated',
            'profile_picture',
            'cover_photo',
            'date_of_birth',
            'date_joined'
        ]


class CreatePostSerializer(serializers.ModelSerializer):
    media = MediaSerializer("media", many=True, read_only=True)
    userId = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'userId',
            'quoteId',
            'thread',
            'threadHead',
            'text',
            'media',
            'date_posted',
            'time_posted',
        ]


class PostSerializer(serializers.ModelSerializer):
    userId = UserSerializer(read_only=True)
    quoteId = CreatePostSerializer("quoteId")
    comments = CommentsSerializer("comments", many=True)
    media = MediaSerializer("media", many=True)
    reactions = ReactionSerializer("reactions", many=True)
    retweets = RetweetSerializer("retweets", many=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'userId',
            'quoteId',
            'comment_quoteId',
            'thread',
            'threadHead',
            'comments',
            'media',
            'retweets',
            'reactions',
            'text',
            'date_posted',
            'time_posted',
        ]

    # Only show the number of comments and retweets
    def to_representation(self, value):
        rep = super().to_representation(value)

        quote_tweets = Post.objects.filter(quoteId=rep["id"])
        comment_quoteId = Post.objects.filter(comment_quoteId=rep["id"])

        rep['comments'] = value.comments.count()
        rep['retweets'] = value.retweets.count() + comment_quoteId.count() + \
            quote_tweets.count()

        return rep


# My custom serializer to add the user's information to the access token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user'] = UserSerializer(user).data
        return token
