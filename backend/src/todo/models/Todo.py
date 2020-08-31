from django.db import models

class Todo(models.Model):

    bucket = models.CharField(max_length=30)
    user_id = models.IntegerField()
    message = models.CharField(max_length=100)
    created = models.DateField()