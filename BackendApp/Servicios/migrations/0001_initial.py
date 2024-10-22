# Generated by Django 4.2 on 2024-09-27 23:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PrestadorServicio',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('rut', models.CharField(max_length=10)),
                ('nombre', models.CharField(max_length=50)),
                ('apellido', models.CharField(max_length=50)),
                ('trabajo', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('nacimiento', models.DateField()),
                ('telefono', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('rut', models.CharField(max_length=12)),
                ('nombre', models.CharField(max_length=50)),
                ('apellido', models.CharField(max_length=50)),
                ('sector', models.CharField(max_length=50)),
                ('direccion', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('telefono', models.IntegerField()),
                ('nacionalidad', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Servicio',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('tipo', models.CharField(max_length=50)),
                ('direccion', models.CharField(max_length=50)),
                ('descripcion', models.TextField()),
                ('disponibilidad', models.DateField()),
                ('prestadorID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Servicios.prestadorservicio')),
            ],
        ),
        migrations.CreateModel(
            name='Atencion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('fecha', models.DateField()),
                ('sector', models.CharField(max_length=50)),
                ('hora', models.TimeField()),
                ('atencionAsistencia', models.BooleanField()),
                ('atencionTipo', models.CharField(max_length=50)),
                ('observacion', models.TextField()),
                ('clienteID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Servicios.usuario')),
                ('servicioID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Servicios.servicio')),
            ],
        ),
    ]
