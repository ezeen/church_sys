from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

class CustomAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=username)
        except UserModel.DoesNotExist:
            return None
        
        if user.check_password(password):
            return user
        
        if user.primary_user and not user.has_usable_password():
            primary = user.primary_user
            if primary.check_password(password):
                return user
        
        return None
    