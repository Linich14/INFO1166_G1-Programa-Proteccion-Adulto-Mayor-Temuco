# Generated by Django 4.2 on 2024-09-27 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Municipales',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('rut', models.CharField(max_length=12)),
                ('nombre', models.CharField(max_length=50)),
                ('apellido', models.CharField(max_length=50)),
                ('privilegios', models.IntegerField(max_length=10)),
                ('cargo', models.CharField(max_length=50)),
                ('telefono', models.PositiveIntegerField(max_length=9)),
            ],
        ),
    ]
