from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True, null=False, blank=False)
    email = models.EmailField(max_length=50, blank=False, null=True)
    name = models.CharField(max_length=20, default="", blank=True)
    bio = models.TextField(max_length=150, default="", blank=True)
    deactivated = models.BooleanField(null=False, default=False)
    profile_picture = models.ImageField(upload_to="media/profile_picture/%Y/%m/%d", default="/media/profile_picture/default.jpg", null=True, blank=True)
    cover_photo = models.ImageField(upload_to="media/cover_photo/%Y/%m/%d", default="/media/cover_photo/default.jpeg", null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    date_joined = models.DateField(auto_now_add=True)
    
    # Set user's name to the username if name not provided
    def save(self, *args, **kwargs):
        if not self.name:
            self.name = self.username
        
        # Set default cover photo
        if not self.cover_photo:
            self.cover_photo = "media/cover_photo/default.jpeg"
        
        # set default profile picture
        if not self.profile_picture:
            self.profile_picture = "media/profile_picture/default.jpg"
            
        super(User, self).save(*args, **kwargs)
    
    def __str__(self):
        return f"@{self.username}"

class FollowingRecords(models.Model):
    userId = models.ForeignKey("User", on_delete=models.CASCADE, related_name="following")
    following = models.ForeignKey("User", on_delete=models.CASCADE, related_name="follower")
    date_followed = models.DateField(auto_now_add=True)
    
    #make pair unique
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['userId', 'following'], name="unique_followers")
        ]
        
    def __str__(self):
        return f"{self.userId.username} is following {self.following.username}"

class Post(models.Model):
    userId = models.ForeignKey("User", on_delete=models.CASCADE, null=False, blank=False, related_name="posts")
    # Quote id for quote tweets and quoted comments
    quoteId = models.ForeignKey("self", on_delete=models.SET_NULL, null=True, blank=True, related_name="quote_tweet")
    comment_quoteId = models.ForeignKey("Comments", on_delete=models.SET_NULL, null=True, blank=True, related_name="comment_quote")
    # For tweets that make up threads
    thread = models.OneToOneField("self", on_delete=models.CASCADE, null=True, blank=True, related_name="tweet_thread")
    threadHead = models.BooleanField(default=False)
    text = models.TextField(max_length=300, default="", blank=True)
    date_posted = models.DateField(auto_now_add=True)
    time_posted = models.TimeField(auto_now_add=True)
    
    def __str__(self):
        return f"post {self.id} posted by {self.userId.username}"

class Reaction(models.Model):
    userId = models.ForeignKey("User", on_delete=models.CASCADE, related_name="reactions")
    postId = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="reactions", null=True, blank=True)
    commentId = models.ForeignKey("Comments", on_delete=models.CASCADE, related_name="reactions", null=True, blank=True)
    retweetId = models.ForeignKey("Retweet", on_delete=models.CASCADE, related_name="reactions", null=True, blank=True)
    liked = models.BooleanField(null=True)
    
    def __str__(self):
        postId = self.postId
        if not postId:
            postId = self.commentId
            if not postId:
                postId = self.retweetId
                
        return f"reaction {self.id}: {self.userId.username} reacted to {postId}"

class Comments(models.Model):
    userId = models.ForeignKey("User", on_delete=models.CASCADE, related_name="comments", null=False, blank=False)
    postId = models.ForeignKey("Post", on_delete=models.SET_NULL, related_name="comments", null=True, blank=True)
    commentId = models.ForeignKey("self", on_delete=models.SET_NULL, related_name="comments", null=True, blank=True)
    text = models.TextField(max_length=300, default="", blank=True)
    date_posted = models.DateField(auto_now_add=True)
    time_posted = models.TimeField(auto_now_add=True)
    
    def __str__(self):
        return f"comment {self.id}, by {self.userId.username}"

class Retweet(models.Model):
    userId = models.ForeignKey("User", on_delete=models.CASCADE, related_name="retweets", null=False, blank=False)
    postId = models.ForeignKey("Post", on_delete=models.SET_NULL, related_name="retweets", null=True, blank=True)
    commentId = models.ForeignKey("Comments", on_delete=models.SET_NULL, related_name="retweets", null=True, blank=True)
    date_posted = models.DateField(auto_now_add=True)
    time_posted = models.TimeField(auto_now_add=True)
    
    def __str__(self):
        return f"retweet {self.id}, by {self.userId.username}"

# Keep track if notifications
class Notification(models.Model):
    userId = models.ForeignKey("User", on_delete=models.CASCADE, related_name="notifications", null=True, blank=True)# The person being notified
    followerId = models.ForeignKey("FollowingRecords", on_delete=models.CASCADE, related_name="notifications", null=True, blank=True)# If it has to do with someone following the user
    postId = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="notifications", null=True, blank=True)# if its about a post
    commentId = models.ForeignKey("Comments", on_delete=models.CASCADE, related_name="notifications", null=True, blank=True)# if its about a coomment
    reactionId = models.ForeignKey("Reaction", on_delete=models.CASCADE, related_name="notifications", null=True, blank=True)# or like
    date_notified = models.DateField(auto_now_add=True)
    time_notified = models.TimeField(auto_now_add=True)
    sent = models.BooleanField(default=False)
    
    def __str__(self):
        return f"notification {self.id}, for {self.userId.username}"

class Media(models.Model):
    gif = models.CharField(max_length=25, null=True, blank=True)
    media = models.FileField(upload_to="media/posts/%Y/%m/%d", null=True, blank=True)
    postId = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="media", null=True, blank=True)
    commentId = models.ForeignKey("Comments", on_delete=models.CASCADE, related_name="media", null=True, blank=True)