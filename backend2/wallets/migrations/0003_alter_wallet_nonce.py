# Generated by Django 3.2.9 on 2021-11-10 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wallets', '0002_alter_wallet_nonce'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wallet',
            name='nonce',
            field=models.CharField(default='5p4KGmhVpUOWSrSAzNPCWuYvI7K0ryCMI6m6vaOrnbx4HzBh7t', max_length=50),
        ),
    ]