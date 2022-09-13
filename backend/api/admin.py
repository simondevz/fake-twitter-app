from django.contrib import admin
from .models import User, Post, FollowingRecords, Comments, Retweet, Reaction, Notification

# Register your models here.
admin.site.register(User)
admin.site.register(Post)
admin.site.register(FollowingRecords)
admin.site.register(Reaction)
admin.site.register(Comments)
admin.site.register(Retweet)
admin.site.register(Notification)