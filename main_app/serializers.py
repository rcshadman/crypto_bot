from rest_framework import serializers
from main_app.models import Alert

class AlertSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')
    done = serializers.ReadOnlyField()
    executed_at = serializers.ReadOnlyField()

    class Meta:
        model = Alert
        fields = ('id', 'owner', 'crypto_currency','exchange_currency', 'operator', 'limit', 'done', 'executed_at')
