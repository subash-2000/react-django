from rest_framework import serializers
from ReactApp.models import book

class bookserializer(serializers.ModelSerializer):
    class Meta:
        model = book
        fields= '__all__'