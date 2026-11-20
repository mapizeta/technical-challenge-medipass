from rest_framework import serializers


class PacienteSerializer(serializers.Serializer):
    rut = serializers.CharField(required=True)
    nombres = serializers.CharField(required=True)
    apellidos = serializers.CharField(required=True)
    fechaNacimiento = serializers.DateField(required=True)
    email = serializers.EmailField(required=True)