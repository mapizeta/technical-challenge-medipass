from rest_framework import serializers
from datetime import date, timedelta

class PacienteSerializer(serializers.Serializer):
    rut = serializers.CharField(required=True)
    nombres = serializers.CharField(required=True)
    apellidos = serializers.CharField(required=True)
    fechaNacimiento = serializers.DateField(required=True)
    email = serializers.EmailField(required=True)

    def validate_rut(self, value):
        '''
        Valida Rut Serializer
        '''
        rut = value.replace(".", "").replace("-", "").upper()

        cuerpo, dv = rut[:-1], rut[-1]

        reversed_digits = map(int, reversed(cuerpo))
        factors = [2, 3, 4, 5, 6, 7]

        total = sum(
            digit * factors[i % len(factors)]
            for i, digit in enumerate(reversed_digits)
        )

        result = 11 - (total % 11)

        if result == 11:
            expected_dv = "0"
        elif result == 10:
            expected_dv = "K"
        else:
            expected_dv = str(result)

        if dv != expected_dv:
            raise serializers.ValidationError("El RUT ingresado no es válido.")

        return rut


class LicenciaSerializer(serializers.Serializer):
    tipo = serializers.CharField(required=True)
    fechaInicioReposo = serializers.DateField(required=True)
    diasReposo = serializers.IntegerField(required=True, min_value=1, max_value=30)
    diagnostico = serializers.CharField(required=True)
    reposo = serializers.ChoiceField(
        choices=["Total", "Parcial"],
        required=True
    )

    def validate_fechaInicioReposo(self, value):
        fecha_minima = date.today() - timedelta(days=7)

        if value < fecha_minima:
            raise serializers.ValidationError(
                "La fecha de inicio del reposo no puede ser anterior a 7 días."
            )

        return value