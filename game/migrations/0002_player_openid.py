# Generated by Django 4.1.1 on 2022-10-11 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("game", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="player",
            name="openid",
            field=models.CharField(blank=True, default="", max_length=64, null=True),
        ),
    ]