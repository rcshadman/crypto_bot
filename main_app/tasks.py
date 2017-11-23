from __future__ import absolute_import, unicode_literals
from celery import shared_task, task
from crypto_bot import settings
from django.core.mail import send_mail
from crypto_bot.celery import app
from main_app.managers.coinbase_manager import CoinbaseManager
from main_app.models import Alert

# TODO 
# - Store our alerts in redis for better performances
# - Dynamicly add new alerts to redis
# - Seperate in multiples files but celery doesn't find my tasks, issue still not solved


# We initiate our manager to create the client with our keys
coinbasemanager = CoinbaseManager()

# For now we will only check the spot price
# TODO - Add Buy and Sell price
@task
def check_spot_price(crypto_currency, exchange_currency):
    # We get an object with the price, the crypto currency and the exchange currency
    # TODO - Put last value of price in Cache or redis, this way we don't rerun unecessary code
    amount = coinbasemanager.get_spot_price(crypto_currency, exchange_currency)
    # We will check the alerts and trigger the one needed
    check_alerts_and_trigger(crypto_currency, exchange_currency, amount)
    return





# Get all alerts that match our query and trigger them
@task
def check_alerts_and_trigger(crypto_currency, exchange_currency, amount):
    alerts = check_alerts(crypto_currency, exchange_currency, amount)
    for alert in alerts:
        alert.trigger()
        send_mail_alert.delay(alert.user, alert)
    return 

# Same as the one upper, but it doesn't trigger, for test purpose
# CAREFULL - Remove it in production
@task
def fake_check_alerts_and_trigger(crypto_currency, exchange_currency, amount):
    alerts = check_alerts(crypto_currency, exchange_currency, amount)
    for alert in alerts:
        # alert.trigger()
        print("fake trigger")
        send_mail_alert(alert.user, alert)
    return

# Get the alerts under and above the price
def check_alerts(crypto_currency, exchange_currency, amount):
    alerts_under = get_alerts_under(
      crypto_currency,
      exchange_currency,
      amount
    )
    alerts_above = get_alerts_above(
      crypto_currency,
      exchange_currency,
      amount
    )
    all_alerts = alerts_upper | alerts_under
    return all_alerts

# Get the alerts watching when the price goes under
def get_alerts_under(crypto_currency, exchange_currency, amount):
    return Alert.objects.filter(
        # Use constant, more reliable than strings
        operator=Alert.UNDER,
        limit__lte=amount,
        crypto_currency=crypto_currency,
        exchange_currency=exchange_currency,
        is_active=True,
        done=False,
    )

# Get the alerts watching when the price goes above
def get_alerts_above(crypto_currency, exchange_currency, amount):
    return Alert.objects.filter(
        # Use constant, more reliable than strings
        operator=Alert.ABOVE,
        limit__gte=amount,
        crypto_currency=crypto_currency,
        exchange_currency=exchange_currency,
        is_active=True,
        done=False,
    )


# We send a mail to the owner of the alert
@task
def send_mail_alert(user, alert):

    crypto_currency = alert.crypto_currency
    exchange_currency = alert.exchange_currency
    operator = alert.operator
    limit = alert.limit

    # We great the subject based on what happend
    subject = 'The %s is %s %.2f %s' % (
        crypto_currency,
        operator,
        limit,
        exchange_currency,
    )

    # Yeah I know
    # TODO - write and write...
    message = subject

    send_mail(
      subject,
      message,
      settings.EMAIL_HOST_USER,
      [user.email],
      fail_silently=False,
    )

    return "Mail sent to %s about %s " % (user.email, subject)