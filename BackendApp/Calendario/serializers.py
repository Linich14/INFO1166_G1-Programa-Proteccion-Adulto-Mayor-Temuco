from rest_framework import serializers

class CalendarioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Calendario
        exclude = ['is_removed', 'created', 'modified']

    