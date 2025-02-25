from rest_framework import serializers
from .models import User
from datetime import date
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import logging

logger = logging.getLogger(__name__)

class PrimaryUserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'dob', 'id_number', 'district', 'password', 'confirm_password', 'is_primary']

    def validate_dob(self, value):
        today = date.today()
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if age < 14:
            raise serializers.ValidationError("You must be at least 14 years old to register.")
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            is_primary=True,
            **validated_data
        )
        return user

class FamilyMemberSerializer(serializers.ModelSerializer):
    member_type = serializers.ChoiceField(
        choices=[('adult', 'Adult'), ('child', 'Child')], 
        write_only=True,
        required=True  # Explicitly require this field
    )
    dob = serializers.DateField(
        input_formats=['%Y-%m-%d', '%d/%m/%Y'],  # Allow multiple date formats
        required=True
    )

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'dob', 'id_number', 'district', 'member_type']
        extra_kwargs = {'id_number': {'required': False}, 'email': {'required': False}}

    def validate(self, data):
        member_type = data.get('member_type')
        dob = data.get('dob')
        today = date.today()
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))

        # Adult validation
        if member_type == 'adult':
            if age < 18:
                raise serializers.ValidationError("Adult must be at least 18 years old")
            if not data.get('id_number'):
                raise serializers.ValidationError("ID number is required for adults")
            if not data.get('email'):
                raise serializers.ValidationError("Email is required for adults")

        # Child validation
        elif member_type == 'child':
            if age >= 18:
                raise serializers.ValidationError("Child must be under 18 years old")
            data.pop('id_number', None)
            data.pop('email', None)  # Remove email for children

        return data
        

    def create(self, validated_data):
        member_type = validated_data.pop('member_type', None)
        validated_data['primary_user'] = self.context['request'].user
        validated_data['is_primary'] = False
        instance = User.objects.create(**validated_data)
        instance.set_unusable_password()  # For children/adults using primary user's password
        instance.save()
        return instance

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(min_length=8)
    confirm_password = serializers.CharField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
            if user.age < 14:
                raise serializers.ValidationError("You must be at least 14 years old to reset password")
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")
        return value

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def save(self):
        user = User.objects.get(email=self.validated_data['email'])
        user.set_password(self.validated_data['new_password'])
        user.save()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['is_primary'] = user.is_primary
        token['is_super_admin'] = user.is_super_admin
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_active:
            raise serializers.ValidationError("User account is not active.")
        data['email'] = self.user.email
        data['is_primary'] = self.user.is_primary
        return data
        