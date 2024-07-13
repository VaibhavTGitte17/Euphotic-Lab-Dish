from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Dish
from .serializers import DishSerializer

class DishViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    
    def list(self, request):
        queryset = Dish.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    def retrieve(self, request, pk=None):
        dish = self.get_object()
        serializer = self.serializer_class(dish)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        dish = self.get_object()
        serializer = self.serializer_class(dish, data=request.data, partial=True)  # Ensure partial=True for PATCH
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
