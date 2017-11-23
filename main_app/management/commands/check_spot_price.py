from django.core.management.base import BaseCommand, CommandError
from celery.schedules import crontab
from main_app.managers.coinbase_manager import CoinbaseManager
from crypto_bot.celery import app

class Command(BaseCommand):
    help = 'Get the spot price of a crypto currency by a exchange currency'

    def add_arguments(self, parser):
        parser.add_argument('crypto_currency', type=str)
        parser.add_argument('exchange_currency', type=str)
    
    def handle(self, *args, **options):
        # We initiate our manager to create the client with our keys
        coinbasemanager = CoinbaseManager()

        crypto = options['crypto_currency']
        exchange = options['exchange_currency']
        price = coinbasemanager.get_spot_price(crypto, exchange)
        return price