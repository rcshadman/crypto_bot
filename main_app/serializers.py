from rest_framework import serializers
from main_app.models import Alert

class AlertSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')

    class Meta:
        model = Alert
        fields = ('id', 'owner', 'crypto_currency','exchange_currency', 'operator', 'limit')
