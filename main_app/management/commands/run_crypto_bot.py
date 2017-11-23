from django.core.management.base import BaseCommand, CommandError
from django_celery_beat.models import PeriodicTask, IntervalSchedule
import json
from main_app.tasks import check_spot_price
from crypto_bot.celery import app

class Command(BaseCommand):
    help = 'Start celery worker beat to check price every 5 seconds'

    def add_arguments(self, parser):
        parser.add_argument('crypto_currency', type=str)
        parser.add_argument('exchange_currency', type=str)
    
    def handle(self, *args, **options):

        crypto = options['crypto_currency']
        exchange = options['exchange_currency']

        # Say we want our task to be run every 5 seconds
        schedule, created = IntervalSchedule.objects.get_or_create(
            every=5,
            period=IntervalSchedule.SECONDS,
        )
        periodic_task = PeriodicTask.objects.create(
            # Each time it repeats.
            interval=schedule,                
            # simply describes this periodic task.  
            name='Check price and trigger alerts related',       
            # name of task.   
            task='check_spot_price',  
            args=json.dumps([crypto, exchange]),
        )
        return periodic_task