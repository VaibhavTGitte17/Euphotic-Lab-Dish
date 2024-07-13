# Generated by Django 5.0.7 on 2024-07-12 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dish',
            fields=[
                ('dishId', models.AutoField(primary_key=True, serialize=False)),
                ('dishName', models.CharField(max_length=255)),
                ('imageUrl', models.URLField(max_length=255)),
                ('isPublished', models.BooleanField(default=False)),
            ],
        ),
    ]
