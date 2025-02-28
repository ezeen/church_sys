from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from datetime import date

class CustomUserAdmin(UserAdmin):
    model = User
    
    # Order users by email
    ordering = ('email',)
    
    # Fields to display in the list view
    list_display = (
        'email', 
        'first_name', 
        'last_name', 
        'is_adult_or_child',  # Custom method to display adult/child
        'family_rank', 
        'phone_number', 
        'is_staff', 
        'is_superuser', 
        'is_super_admin',
        'is_primary'
    )
    
    # Fields to filter by in the list view
    list_filter = (
        'is_staff', 
        'is_superuser', 
        'is_super_admin', 
        'is_primary',
        'family_rank',  # Add family_rank to filters
        'district'      # Add district to filters
    )
    
    # Fields to display in the edit form
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {
            'fields': (
                'first_name', 
                'last_name', 
                'dob', 
                'id_number', 
                'district',
                'family_rank',  # Add family_rank
                'phone_number'  # Add phone_number
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
        ('Important dates', {'fields': ('last_login',)}),  # Removed date_joined
    )
    
    # Fields to display in the add form
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
                'id_number', 
                'district',
                'family_rank',  # Add family_rank
                'phone_number'  # Add phone_number
            ),
        }),
    )
    
    # Fields to search by in the list view
    search_fields = ('email', 'first_name', 'last_name', 'phone_number', 'district')
    
    # Enable horizontal filtering for groups and permissions
    filter_horizontal = ('groups', 'user_permissions',)
    
    # Custom method to display whether a user is an adult or a child
    def is_adult_or_child(self, obj):
        if obj.dob:
            age = (date.today() - obj.dob).days // 365
            return 'Child' if age < 18 else 'Adult'
        return 'Unknown'
    is_adult_or_child.short_description = 'Adult/Child'

# Register the User model with the custom admin class
admin.site.register(User, CustomUserAdmin)