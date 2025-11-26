"""
Serializers for onboarding options
"""
from rest_framework import serializers
from .models_onboarding import (
    ValueCategory, Value, Intent, Industry, Skill, ExperienceLevel
)


class ValueSerializer(serializers.ModelSerializer):
    """Serializer for Value model"""
    
    class Meta:
        model = Value
        fields = ['id', 'value_id', 'name']


class ValueCategorySerializer(serializers.ModelSerializer):
    """Serializer for ValueCategory with nested values"""
    values = ValueSerializer(many=True, read_only=True)
    
    class Meta:
        model = ValueCategory
        fields = ['id', 'name', 'values']


class IntentSerializer(serializers.ModelSerializer):
    """Serializer for Intent model"""
    
    class Meta:
        model = Intent
        fields = ['id', 'intent_id', 'title', 'description', 'icon', 'color']


class IndustrySerializer(serializers.ModelSerializer):
    """Serializer for Industry model"""
    
    class Meta:
        model = Industry
        fields = ['id', 'name']


class SkillSerializer(serializers.ModelSerializer):
    """Serializer for Skill model"""
    
    class Meta:
        model = Skill
        fields = ['id', 'name']


class ExperienceLevelSerializer(serializers.ModelSerializer):
    """Serializer for ExperienceLevel model"""
    
    class Meta:
        model = ExperienceLevel
        fields = ['id', 'level_id', 'name', 'description']


class OnboardingOptionsSerializer(serializers.Serializer):
    """Combined serializer for all onboarding options"""
    value_groups = ValueCategorySerializer(many=True)
    intents = IntentSerializer(many=True)
    industries = IndustrySerializer(many=True)
    skills = SkillSerializer(many=True)
    experience_levels = ExperienceLevelSerializer(many=True)
