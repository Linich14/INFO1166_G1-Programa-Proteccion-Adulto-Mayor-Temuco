# Generated by Django 4.2 on 2024-10-08 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notificaciones',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('rut', models.CharField(max_length=12)),
                ('nombre', models.CharField(max_length=50)),
                ('apellido', models.CharField(max_length=50)),
                ('privilegios', models.IntegerField()),
                ('cargo', models.CharField(max_length=50)),
                ('telefono', models.PositiveIntegerField()),
            ],
        ),
    ]
