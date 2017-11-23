from django.forms import ModelForm
from main_app.models import Alert

class AlertForm(ModelForm):

    class Meta:
        model = Alert
        fields = ['crypto_currency','exchange_currency', 'operator', 'limit']