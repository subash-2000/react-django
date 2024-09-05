from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import bookserializer
from .models import book


# Create your views here.
@api_view(["GET"])
def get_book(request):
    data=book.objects.all()
    serilizerData=bookserializer(data,many=True).data
    return Response(serilizerData)

@api_view(["POST"])
def create_book(request):
    data=request.data
    serializer=bookserializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view (["PUT","DELETE"])
def book_details(request,pk):
    try :
        books=book.objects.get(pk=pk)
    except book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method =="PUT":
        data=request.data
        serializer=bookserializer(books,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


    if request.method=="DELETE":
        books.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
