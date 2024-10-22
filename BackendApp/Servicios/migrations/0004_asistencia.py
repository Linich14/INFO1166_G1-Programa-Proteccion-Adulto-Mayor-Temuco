# Generated by Django 4.2 on 2024-10-17 23:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Servicios', '0003_alter_prestadorservicio_estado'),
    ]

    operations = [
        migrations.CreateModel(
            name='Asistencia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hora_entrada', models.DateTimeField(blank=True, null=True)),
                ('hora_salida', models.DateTimeField(blank=True, null=True)),
                ('estado', models.BooleanField()),
                ('creado_en', models.DateTimeField(auto_now_add=True)),
                ('prestador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Servicios.prestadorservicio')),
            ],
        ),
    ]