from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    
    # Fix 1: Update ordering to use email instead of username
    ordering = ('email',)
    
    # Fix 2: Update list_display to match our model
    list_display = (
        'email', 
        'first_name', 
        'last_name', 
        'is_staff', 
        'is_superuser', 
        'is_super_admin'
    )
    
    # Fix 3: Update list_filter to match our model
    list_filter = (
        'is_staff', 
        'is_superuser', 
        'is_super_admin', 
        'is_primary'
    )
    
    # Fix 4: Update fieldsets to match our model
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {
            'fields': (
                'first_name', 
                'last_name', 
                'dob', 
                'id_number', 
                'district'
            )
        }),
        ('Permissions', {
            'fields': (
                'is_active', 
                'is_staff', 
                'is_superuser', 
                'is_super_admin', 
                'is_primary',
                'groups', 
                'user_permissions'
            ),
        }),
        ('Important dates', {'fields': ('last_login',)}),
    )
    
    # Fix 5: Update add_fieldsets for creating users
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 
                'password1', 
                'password2',
                'first_name', 
                'last_name', 
                'dob', 
                'district'
            ),
        }),
    )
    
    # Fix 6: Update search fields
    search_fields = ('email', 'first_name', 'last_name')
    
    # Fix 7: Update filter_horizontal for permissions
    filter_horizontal = ('groups', 'user_permissions',)

admin.site.register(User, CustomUserAdmin)