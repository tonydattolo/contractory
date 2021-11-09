# Generated by Django 3.2.7 on 2021-11-03 09:06

import accounts.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_useraccount_nonce'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='ens',
            field=models.CharField(blank=True, max_length=200, null=True, unique=True, validators=[accounts.utils.ensDomainValidator]),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='nonce',
            field=models.CharField(default='XmzKyviY2UrjgrVQQgX0zNXwu4xBEJ4oSyKQI5vHBSpS6FOkAa', max_length=50),
        ),
    ]