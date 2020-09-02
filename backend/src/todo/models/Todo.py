from django.db import models

class Bucket(models.Model):
    bucket = models.CharField(max_length=30)

class Todo(models.Model):
    bucket = models.CharField(max_length=30)
    user_id = models.IntegerField()
    bucket_id = models.ForeignKey(Bucket, on_delete=models.CASCADE)
    message = models.CharField(max_length=100)
    done = models.BooleanField()
    created = models.DateField()