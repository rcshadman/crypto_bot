from django.db import models
from crypto_bot import settings
from django.utils import timezone

# The Alert Model
class Alert(models.Model):

    # Set avaible choices of operators for the alert
    # Didn't find a programatic way yet,
    # so let's make it clear at least
    # CAREFULL - I use the value in some string
    # main_app.tasks.mail_taks
    # main_app.tasks.aler_tasks
    # .__str__
    ABOVE = 'above'
    UNDER = "under"
    OPERATOR_CHOICES = (
        (ABOVE, 'above'),
        (UNDER, 'under'),
    )

    # The avaible exchange currency
    # TODO - Fethc avaible exchange currency from coinbase api
    # https://developers.coinbase.com/api/v2?python#get-currencies
    USD = 'USD'
    EUR = 'EUR'
    VDN = 'VDN'
    EXCHANGE_CURRENCY_CHOICES = (
        # First let make this work with dollars
        (USD, 'dollars'),
        # (EUR, 'euros'),
        # (VDN, 'vietnamese dong'),
    )

    # The avaible crypto currency
    # TODO - Fethc avaible crypto currency from coinbase api
    # https://developers.coinbase.com/api/v2
    BTC = 'BTC'
    LTC = 'LTC'
    ETH = 'ETH'
    CRYPTO_CURRENCY_CHOICES = (
        # First let make this work with Bitcoin
        (BTC, 'Bitcoin'),
        # (LTC, 'ethereum'),
        # (ETH, 'Litecoin'),
    )

    # Who did set the alert
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=False,
    )

    # The crypto currency to watch,
    # exemple : BTC ( Bitcoin )
    crypto_currency = models.CharField(
        max_length=3,
        choices=CRYPTO_CURRENCY_CHOICES,
        blank=False,
        null=False,
    )

    # The currency in which the price is translated,
    # exemple : USD ( american dollars )
    exchange_currency = models.CharField(
        max_length=3,
        choices=EXCHANGE_CURRENCY_CHOICES,
        blank=False,
        null=False,
    )

    # The operator for the alert
    # > or < than ... ( price )
    operator = models.CharField(
        max_length=10,
        choices=OPERATOR_CHOICES,
        blank=False,
        null=False,
    )

    # The limit that will trigger the alert
    # exemple : 5000.00
    limit = models.FloatField(
        blank=False,
        null=False,
    )

    # Did this alert already have been called ?
    done = models.BooleanField(default=False)

    # Maybe we don't want the alert to be active
    is_active = models.BooleanField(default=True)

    # Time at which the alert was emited
    executed_at = models.DateField(null=True)

    
    def __str__(self):
        return "%s watch %s when it is %s %.2f %s" % (
            self.owner.__str__(),
            self.crypto_currency,
            self.operator,
            self.limit,
            self.exchange_currency,
        )

    def trigger(self):
        self.done = True
        self.executed_at = timezone.now()
        print("%s triggered !" % (self.__str__))
        self.save()
