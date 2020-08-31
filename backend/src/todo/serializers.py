from rest_framework import serializers
from todo.models import Todo

class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ('id', 'bucket', 'user_id', 'message', 'created')