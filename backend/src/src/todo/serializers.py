from rest_framework import serializers
from todo.models.Todo import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('bucket', 'user_id', 'message', 'created')