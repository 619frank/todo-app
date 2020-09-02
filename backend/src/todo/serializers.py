from rest_framework import serializers
from todo.models.Todo import Todo
from todo.models.Todo import Bucket

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('bucket', 'user_id', 'message', 'created')

class BucketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bucket
        fields = ['bucket']    

# class BucketWithTodosSerializer(serializers.ModelSerializer):
#     todos = serializers.StringRelatedField(many=True)

#     class Meta:
#         model = Bucket
#         fields = ['album_name', 'artist', 'tracks']        