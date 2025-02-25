from django.urls import path
from .views import (
    PrimaryUserRegistrationView,
    FamilyMemberCreateView,
    PasswordResetView,
    CurrentUserView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CustomTokenObtainPairSerializer

app_name = 'users'

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

urlpatterns = [
    path('register/primary/', PrimaryUserRegistrationView.as_view(), name='primary-register'),
    path('family-members/', FamilyMemberCreateView.as_view(), name='family-members'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/me/', CurrentUserView.as_view(), name='current-user'),
]
