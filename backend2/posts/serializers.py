from rest_framework import serializers
from .models import Posts


class PostsSerializer(serializers.ModelSerializer):
    # postAuthor = serializers.CharField(source='postAuthor__user', read_only=True)
    class Meta:
        model = Posts
        fields = '__all__'