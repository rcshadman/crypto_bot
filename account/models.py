from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


# Strongly inspired by the example from django document
# https://docs.djangoproject.com/en/1.11/topics/auth/customizing/#a-full-example

# The only purpose is to set a custom User before migration
# Allow us later to modify it and avoid a problem :
# https://code.djangoproject.com/ticket/25313
# https://docs.djangoproject.com/en/dev/topics/auth/customizing/#changing-to-a-custom-user-model-mid-project

# Username have been removed
# Email is unique, mandatory and is now the identifier

# Manager for our custom user model
class UserManager(BaseUserManager):
    def create_user(self, email, last_name, first_name, password):
        
        # we check for email value
        if not email:
            raise ValueError('Users must have an email address')
        if not last_name:
            raise ValueError('Users must have a Last name')
        if not first_name:
            raise ValueError('Users must have a First name')

        # create the model
        user = self.model(
            email=self.normalize_email(email),
            last_name=last_name,
            first_name=first_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, last_name, first_name, password):

        # we check for email value
        if not email:
            raise ValueError('Users must have an email address')
        if not last_name:
            raise ValueError('Users must have a Last name')
        if not first_name:
            raise ValueError('Users must have a First name')

        # create the model
        user = self.model(
            email=self.normalize_email(email),
            last_name=last_name,
            first_name=first_name,
        )

        user.set_password(password)
        
        # required to set as ADMIN
        user.is_admin = True

        user.save(using=self._db)
        return user
        
# Create a user model to authentify through email and not username
class User(AbstractBaseUser):

    # We actually just want to make it unique
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    last_name = models.CharField(
        max_length=20,
        blank=False,
        null=False
    )
    first_name = models.CharField(
        max_length=20,
        blank=False,
        null=False
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # link with the new manager
    objects = UserManager()

    # indicate which field is being used for authentication
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['last_name', 'first_name']

    def get_full_name(self):
        return "%s %s" % ( self.last_name, self.first_name )

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.get_short_name()

    def has_perm(self, perm, obj=None):
        # We do not handle specific permissions for now
        return True

    def has_module_perms(self, app_label):
        # We do not handle specific permissions for now
        return True

    @property
    def is_staff(self):
        # we treat staff as admin
        # no need to make a difference for now
        return self.is_admin
