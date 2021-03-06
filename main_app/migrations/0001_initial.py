# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-23 14:07
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Alert',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('crypto_currency', models.CharField(choices=[('BTC', 'Bitcoin')], max_length=3)),
                ('exchange_currency', models.CharField(choices=[('USD', 'dollars')], max_length=3)),
                ('operator', models.CharField(choices=[('above', 'above'), ('under', 'under')], max_length=10)),
                ('limit', models.FloatField()),
                ('done', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('executed_at', models.DateField(null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
