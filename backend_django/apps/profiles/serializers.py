from rest_framework import serializers
from .models import Profile, PortfolioItem, Testimonial
from django.contrib.auth import get_user_model

User = get_user_model()


class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = ['id', 'title', 'description', 'image_url', 'project_url', 'technologies', 'order', 'created_at']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'author_name', 'author_role', 'author_avatar', 'content', 'rating', 'created_at']


class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)
    portfolio_items = PortfolioItemSerializer(many=True, read_only=True)
    testimonials = TestimonialSerializer(many=True, read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            'id', 'user_id', 'username', 'email', 'full_name',
            'role', 'bio', 'tagline', 'avatar', 'cover_image',
            'skills', 'experience', 'previous_startups', 'location',
            'looking_for', 'industries', 'archetype', 'availability',
            'stage_preference', 'linkedin_url', 'twitter_url', 'github_url', 'website_url',
            'profile_views', 'pitch_responses', 'successful_matches',
            'is_public', 'accepting_pitches',
            'portfolio_items', 'testimonials',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'profile_views', 'pitch_responses', 'successful_matches', 'created_at', 'updated_at']


class ProfileCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'role', 'bio', 'tagline', 'avatar', 'cover_image',
            'skills', 'experience', 'previous_startups', 'location',
            'looking_for', 'industries', 'archetype', 'availability',
            'stage_preference', 'linkedin_url', 'twitter_url', 'github_url', 'website_url',
            'is_public', 'accepting_pitches'
        ]


class ComprehensiveProfileSerializer(serializers.ModelSerializer):
    """
    Comprehensive profile serializer that includes all user data,
    onboarding data, profile info, portfolio items, and testimonials.
    This is used for the EntrepreneurProfile component.
    """
    # Basic user info
    basic = serializers.SerializerMethodField()
    
    # Professional info
    professional = serializers.SerializerMethodField()
    
    # Startup info
    startup = serializers.SerializerMethodField()
    
    # Personal info
    personal = serializers.SerializerMethodField()
    
    # Portfolio items
    portfolio = serializers.SerializerMethodField()
    
    # Stats
    stats = serializers.SerializerMethodField()
    
    # Achievements
    achievements = serializers.SerializerMethodField()
    
    # Projects (from portfolio items)
    projects = serializers.SerializerMethodField()
    
    # Certifications
    certifications = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = [
            'basic', 'professional', 'startup', 'personal',
            'portfolio', 'stats', 'achievements', 'projects', 'certifications'
        ]
    
    def get_basic(self, obj):
        """Get basic profile info"""
        user = obj.user
        
        # Calculate last active time
        from django.utils import timezone
        from datetime import timedelta
        
        last_active = "Just now"
        if user.last_active:
            diff = timezone.now() - user.last_active
            if diff < timedelta(hours=1):
                minutes = int(diff.total_seconds() / 60)
                last_active = f"{minutes} minutes ago" if minutes > 1 else "Just now"
            elif diff < timedelta(days=1):
                hours = int(diff.total_seconds() / 3600)
                last_active = f"{hours} hours ago"
            else:
                days = diff.days
                last_active = f"{days} days ago"
        
        return {
            'name': user.full_name or user.username,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'username': user.username,
            'email': user.email,
            'role': obj.role or user.user_role or 'Entrepreneur',
            'bio': obj.bio or '',
            'tagline': obj.tagline or '',
            'avatar': obj.avatar or (user.profile_image.url if user.profile_image else ''),
            'coverPhoto': obj.cover_image or '',
            'location': obj.location or '',
            'experience': obj.experience or '',
            'isVerified': user.is_verified,
            'isPremium': user.premium_tier in ['silver', 'gold', 'platinum'],
            'premiumTier': user.premium_tier,
            'joinDate': user.created_at.strftime('%Y-%m-%d') if user.created_at else '',
            'lastActive': last_active,
            'whatsappNumber': str(user.whatsapp_number) if user.whatsapp_number else '',
            'countryCode': user.country_code or '',
            'onboardingComplete': user.onboarding_complete,
            'userIntent': user.user_intent,
            'userStage': user.user_stage,
            'userMask': user.user_mask,
            'socialLinks': {
                'linkedin': obj.linkedin_url or '',
                'twitter': obj.twitter_url or '',
                'github': obj.github_url or '',
                'website': obj.website_url or '',
            }
        }
    
    def get_professional(self, obj):
        """Get professional info including skills and experience"""
        user = obj.user
        onboarding_data = self._get_onboarding_data(user)
        
        # Parse skills into technical and business categories
        skills = obj.skills or onboarding_data.get('skills', [])
        technical_skills = []
        business_skills = []
        
        # Categorize skills (you can customize this logic)
        tech_keywords = ['react', 'python', 'javascript', 'node', 'aws', 'docker', 'kubernetes', 
                        'machine learning', 'ai', 'database', 'sql', 'api', 'frontend', 'backend',
                        'devops', 'cloud', 'mobile', 'ios', 'android', 'flutter', 'typescript']
        
        for skill in skills:
            skill_name = skill.get('name', skill) if isinstance(skill, dict) else str(skill)
            skill_level = skill.get('level', 80) if isinstance(skill, dict) else 80
            
            if any(tech in skill_name.lower() for tech in tech_keywords):
                technical_skills.append({
                    'name': skill_name,
                    'level': skill_level,
                    'category': 'Technical'
                })
            else:
                business_skills.append({
                    'name': skill_name,
                    'level': skill_level
                })
        
        # Work experience from onboarding data or defaults
        work_experience = onboarding_data.get('work_experience', [])
        if not work_experience and onboarding_data.get('background'):
            work_experience = [{
                'id': 1,
                'company': 'Previous Experience',
                'position': obj.role or 'Founder',
                'duration': obj.experience or '',
                'description': onboarding_data.get('background', ''),
                'achievements': []
            }]
        
        # Education from onboarding data
        education = onboarding_data.get('education', [])
        
        return {
            'skills': {
                'technical': technical_skills[:10],  # Limit to 10
                'business': business_skills[:10]
            },
            'workExperience': work_experience,
            'education': education,
            'background': onboarding_data.get('background', ''),
            'aboutSelf': onboarding_data.get('about_self', ''),
        }
    
    def get_startup(self, obj):
        """Get startup-related info"""
        user = obj.user
        onboarding_data = self._get_onboarding_data(user)
        cofounder_prefs = onboarding_data.get('cofounder_preferences', {})
        idea_sprint = onboarding_data.get('idea_sprint_data', {})
        
        return {
            'currentStage': user.user_stage or cofounder_prefs.get('stage', 'Idea'),
            'lookingFor': obj.looking_for or cofounder_prefs.get('looking_for', []),
            'industries': obj.industries or onboarding_data.get('industries', []),
            'previousStartups': obj.previous_startups or [],
            'stagePreference': obj.stage_preference or [],
            'accepting_pitches': obj.accepting_pitches,
            'availability': obj.availability or cofounder_prefs.get('availability', 'flexible'),
            'ideaSprint': idea_sprint,
            'pitch': {
                'text': onboarding_data.get('pitch_text', ''),
                'format': onboarding_data.get('pitch_format', 'text'),
                'hasVoiceNote': onboarding_data.get('has_voice_note', False),
                'pitchDeck': {
                    'fileName': onboarding_data.get('pitch_deck_file_name', ''),
                    'fileSize': onboarding_data.get('pitch_deck_file_size', ''),
                }
            },
            'cofounderPreferences': cofounder_prefs,
        }
    
    def get_personal(self, obj):
        """Get personal info including interests and personality"""
        user = obj.user
        onboarding_data = self._get_onboarding_data(user)
        
        return {
            'interests': onboarding_data.get('interests', []),
            'values': onboarding_data.get('selected_values', []),
            'missionStatement': onboarding_data.get('mission_statement', ''),
            'birthPlace': onboarding_data.get('birth_place', ''),
            'personality': {
                'type': obj.archetype or '',
                'traits': onboarding_data.get('traits', []),
                'values': onboarding_data.get('selected_values', [])
            }
        }
    
    def get_portfolio(self, obj):
        """Get portfolio items with additional details"""
        portfolio_items = obj.portfolio_items.all()
        return PortfolioItemSerializer(portfolio_items, many=True).data
    
    def get_stats(self, obj):
        """Get user statistics"""
        user = obj.user
        
        # Calculate level based on activity (simple algorithm)
        base_level = 1
        xp_per_view = 10
        xp_per_match = 100
        xp_per_pitch = 50
        
        total_xp = (
            obj.profile_views * xp_per_view +
            obj.successful_matches * xp_per_match +
            obj.pitch_responses * xp_per_pitch
        )
        
        level = min(base_level + (total_xp // 500), 100)  # Cap at level 100
        next_level_xp = (level) * 500
        current_level_xp = total_xp % 500
        
        return {
            'level': level,
            'xp': total_xp,
            'currentLevelXp': current_level_xp,
            'nextLevelXp': 500,  # XP needed for next level
            'cofounderMatches': obj.successful_matches,
            'pitches': obj.pitch_responses,
            'events': 0,  # TODO: Implement events count
            'totalConnections': obj.successful_matches,
            'profileViews': obj.profile_views,
        }
    
    def get_achievements(self, obj):
        """Get user achievements (can be expanded with actual achievement system)"""
        achievements = []
        
        # Auto-generate achievements based on profile data
        if obj.profile_views >= 100:
            achievements.append({
                'id': 1,
                'title': 'Profile Star',
                'description': 'Your profile has been viewed over 100 times',
                'date': obj.updated_at.strftime('%Y-%m-%d') if obj.updated_at else '',
                'type': 'platform',
                'icon': '⭐'
            })
        
        if obj.successful_matches >= 5:
            achievements.append({
                'id': 2,
                'title': 'Matchmaker',
                'description': 'Successfully matched with 5 or more cofounders',
                'date': obj.updated_at.strftime('%Y-%m-%d') if obj.updated_at else '',
                'type': 'matching',
                'icon': '🤝'
            })
        
        if obj.user.is_verified:
            achievements.append({
                'id': 3,
                'title': 'Verified Founder',
                'description': 'Your profile has been verified',
                'date': obj.created_at.strftime('%Y-%m-%d') if obj.created_at else '',
                'type': 'verification',
                'icon': '✓'
            })
        
        if obj.user.premium_tier != 'free':
            achievements.append({
                'id': 4,
                'title': f'{obj.user.premium_tier.title()} Member',
                'description': f'You are a {obj.user.premium_tier.title()} tier member',
                'date': obj.updated_at.strftime('%Y-%m-%d') if obj.updated_at else '',
                'type': 'premium',
                'icon': '👑'
            })
        
        if obj.user.onboarding_complete:
            achievements.append({
                'id': 5,
                'title': 'Profile Complete',
                'description': 'Completed the onboarding process',
                'date': obj.created_at.strftime('%Y-%m-%d') if obj.created_at else '',
                'type': 'onboarding',
                'icon': '🎯'
            })
        
        return achievements
    
    def get_projects(self, obj):
        """Get projects from portfolio items formatted for display"""
        portfolio_items = obj.portfolio_items.all()
        projects = []
        
        for item in portfolio_items:
            projects.append({
                'id': item.id,
                'title': item.title,
                'description': item.description,
                'image': item.image_url,
                'technologies': item.technologies or [],
                'status': 'Live',  # Can be enhanced with actual status
                'url': item.project_url,
                'metrics': {
                    'users': 'N/A',
                    'revenue': 'N/A',
                    'rating': 'N/A',
                    'downloads': 'N/A'
                },
                'features': [],
            })
        
        return projects
    
    def get_certifications(self, obj):
        """Get certifications (can be enhanced with actual certification model)"""
        # Placeholder - can be expanded with actual certification data
        return []
    
    def _get_onboarding_data(self, user):
        """Helper method to get onboarding data"""
        try:
            onboarding = user.onboarding_data
            return {
                'mission_statement': onboarding.mission_statement or '',
                'selected_values': onboarding.selected_values or [],
                'industries': onboarding.industries or [],
                'skills': onboarding.skills or [],
                'experience': onboarding.experience or '',
                'background': onboarding.background or '',
                'about_self': onboarding.about_self or '',
                'birth_place': onboarding.birth_place or '',
                'pitch_text': onboarding.pitch_text or '',
                'pitch_format': onboarding.pitch_format or 'text',
                'has_voice_note': onboarding.has_voice_note,
                'pitch_deck_file_name': onboarding.pitch_deck_file_name or '',
                'pitch_deck_file_size': onboarding.pitch_deck_file_size or '',
                'cofounder_preferences': onboarding.cofounder_preferences or {},
                'offer_skills_data': onboarding.offer_skills_data or {},
                'idea_sprint_data': onboarding.idea_sprint_data or {},
            }
        except:
            return {}
