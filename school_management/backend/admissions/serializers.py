from rest_framework import serializers
from .models import AdmissionSession, Application, MeritList

class AdmissionSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdmissionSession
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class MeritListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeritList
        fields = '__all__' 