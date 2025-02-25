from django.shortcuts import render

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import User
from .serializers import (
    PrimaryUserRegistrationSerializer,
    FamilyMemberSerializer,
    PasswordResetSerializer
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView

class PrimaryUserRegistrationView(generics.CreateAPIView):
    serializer_class = PrimaryUserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class FamilyMemberCreateView(generics.ListCreateAPIView):
    serializer_class = FamilyMemberSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        # Return only family members for the current user
        return User.objects.filter(primary_user=self.request.user)

    def perform_create(self, serializer):
        # Set the primary user automatically
        serializer.save(primary_user=self.request.user)

class PasswordResetView(generics.GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Password reset successfully"})


class CurrentUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = PrimaryUserRegistrationSerializer(request.user)
        return Response(serializer.data)
    