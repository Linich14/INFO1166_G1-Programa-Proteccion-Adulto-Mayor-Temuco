# Generated by Django 4.2 on 2024-10-14 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Municipales', '0002_alter_municipales_privilegios_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='municipales',
            name='contraseña',
            field=models.CharField(default='', max_length=128),
        ),
        migrations.AlterField(
            model_name='municipales',
            name='id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
    ]
