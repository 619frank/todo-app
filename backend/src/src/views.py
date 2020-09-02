from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from todo.models.Todo import Todo
from todo.serializers import TodoSerializer
from todo.models.Todo import Bucket
from todo.serializers import BucketSerializer
from rest_framework import status

@api_view(['GET'])
def todo_collection(request):
    if request.method == 'GET':
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def create_todo(request):
    if request.method == 'POST':
        data = {'bucket': request.data.get('bucket'), 'message': request.data.get('message'), 'user_id': 1}
        serializer = TodoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def todo_element(request, id):
    try:
        todo = Todo.objects.get(id=id)
    except Todo.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def buckets(request):
    if request.method == 'GET':
        buckets = Bucket.objects.all()
        serializer = BucketSerializer(buckets, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def create_bucket(request):
    if request.method == 'POST':
        data = {'id': 2, 'bucket': request.data.get('bucket')}
        serializer = BucketSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
