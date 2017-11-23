from rest_framework import serializers
from crypto_bot import settings


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL