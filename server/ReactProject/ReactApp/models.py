from django.db import models

# Create your models here.
class book(models.Model):
    title=models.CharField(max_length=100)
    release_date=models.IntegerField()

    def __str__(self):
        return self.title