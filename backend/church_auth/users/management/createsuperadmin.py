from django.core.management.base import BaseCommand
from users.models import User

class Command(BaseCommand):
    help = 'Creates a super admin user'

    def add_arguments(self, parser):
        parser.add_argument('--email', required=True)
        parser.add_argument('--password', required=True)

    def handle(self, *args, **options):
        user = User.objects.create_user(
            email=options['elviskiberi'],
            password=options['BugattiSC57'],
            first_name='Admin',
            last_name='User',
            dob='2000-01-01',
            district='Admin District',
            is_super_admin=True
        )
        self.stdout.write(self.style.SUCCESS('Super admin created successfully'))