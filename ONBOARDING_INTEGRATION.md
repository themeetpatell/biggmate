# Onboarding API Integration Guide

## Overview
The onboarding API now saves **ALL** data collected during the user registration flow. This includes data from all onboarding components.

## Backend Changes

### 1. New Model: `OnboardingData`
Located in `backend_django/apps/users/models.py`

Stores all onboarding data:
- Mission statement & core values
- Industries, skills, experience, background
- Pitch text/format, voice notes, pitch deck info
- Cofounder preferences
- Offer skills data
- Idea sprint details

### 2. Updated `User` Model
Added fields:
- `user_stage` - e.g., 'idea-stage', 'mvp-stage'
- `user_mask` - User's selected avatar/mask
- `user_role` - e.g., 'founder', 'cofounder', 'advisor'

### 3. API Endpoint: `/api/auth/onboarding/`

**POST**: Save onboarding data
**GET**: Retrieve onboarding data

## Frontend Integration

### Step 1: Import the API service
```javascript
import { authAPI } from '../services/api';
```

### Step 2: Collect all localStorage data
Each onboarding component saves data to localStorage. Before completing onboarding, collect all of it:

```javascript
// In your final onboarding step (IdeaSprint or AnonymousProfileFixed)
const collectOnboardingData = () => {
  return {
    // User role & stage (from RoleSelection)
    user_role: localStorage.getItem('userRole'),
    user_stage: localStorage.getItem('userStage'),
    user_mask: localStorage.getItem('userMask'),
    user_intent: localStorage.getItem('selectedIntent'),
    
    // Mission & Values (from QuickSetup)
    mission_statement: localStorage.getItem('whyHere'),
    selected_values: JSON.parse(localStorage.getItem('selectedValues') || '[]'),
    
    // Background (from QuickSetup)
    industries: JSON.parse(localStorage.getItem('yourIndustries') || '[]'),
    skills: JSON.parse(localStorage.getItem('yourSkills') || '[]'),
    experience: localStorage.getItem('yourExperience'),
    background: localStorage.getItem('yourBackground'),
    about_self: localStorage.getItem('yourSelf'),
    birth_place: localStorage.getItem('birthPlace'),
    
    // Pitch & Media (from QuickSetup & AnonymousProfileFixed)
    pitch_text: localStorage.getItem('pitchText'),
    pitch_format: localStorage.getItem('pitchFormat') || 'text',
    has_voice_note: localStorage.getItem('hasVoiceNote') === 'true',
    pitch_deck_file_name: localStorage.getItem('pitchDeckFileName'),
    pitch_deck_file_size: localStorage.getItem('pitchDeckFileSize'),
    
    // Cofounder Preferences (from AnonymousProfileFixed)
    cofounder_preferences: JSON.parse(localStorage.getItem('cofounderPreferences') || '{}'),
    
    // Offer Skills (from OfferSkills)
    offer_skills_data: JSON.parse(localStorage.getItem('offerSkillsPreferences') || '{}'),
    
    // Idea Sprint (from IdeaSprint)
    idea_sprint_data: JSON.parse(localStorage.getItem('ideaSprintDetails') || '{}'),
    
    // Mark as complete
    onboarding_complete: true
  };
};
```

### Step 3: Save to backend
```javascript
const handleCompleteOnboarding = async () => {
  try {
    const onboardingData = collectOnboardingData();
    
    const response = await authAPI.completeOnboarding(onboardingData);
    
    if (response.data.success) {
      console.log('Onboarding completed!');
      
      // Clear localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('user') || 
            key.startsWith('selected') || 
            key.startsWith('your') ||
            key.startsWith('pitch') ||
            key.startsWith('cofounder') ||
            key.startsWith('offer') ||
            key.startsWith('idea')) {
          localStorage.removeItem(key);
        }
      });
      
      // Navigate to home
      navigate('/home');
    }
  } catch (error) {
    console.error('Failed to save onboarding data:', error);
  }
};
```

### Step 4: Call at the right time

**Option A: Save progressively** (recommended)
Call `authAPI.completeOnboarding()` after each step with partial data:

```javascript
// In RoleSelection.jsx
const handleContinue = async () => {
  await authAPI.completeOnboarding({
    user_role: localStorage.getItem('userRole'),
    user_stage: selectedStage,
    user_mask: selectedMask,
    birth_place: birthPlace
  });
  navigate('/onboarding/mission');
};

// In QuickSetup.jsx
const handleContinue = async () => {
  await authAPI.completeOnboarding({
    user_intent: selectedIntent,
    mission_statement: missionStatement,
    selected_values: selectedValues,
    industries: yourIndustries,
    skills: yourSkills,
    experience: yourExperience,
    background: yourBackground,
    about_self: yourSelf,
    has_voice_note: hasVoiceNote,
    pitch_deck_file_name: pitchDeckFile?.name
  });
  
  if (selectedIntent === 'offer-skills') {
    navigate('/onboarding/offer-skills');
  } else if (selectedIntent === 'idea-sprint') {
    navigate('/onboarding/idea-sprint');
  } else {
    navigate('/onboarding/pitch');
  }
};

// In AnonymousProfileFixed.jsx (final step for find-cofounder)
const handleContinue = async () => {
  await authAPI.completeOnboarding({
    pitch_text: pitchText,
    pitch_format: pitchFormat,
    cofounder_preferences: cofounderPreferences,
    onboarding_complete: true  // Mark as complete
  });
  navigate('/home');
};

// In OfferSkills.jsx (final step for offer-skills)
const handleContinue = async () => {
  await authAPI.completeOnboarding({
    offer_skills_data: preferences,
    onboarding_complete: true
  });
  navigate('/home');
};

// In IdeaSprint.jsx (final step for idea-sprint)
const handleContinue = async () => {
  await authAPI.completeOnboarding({
    idea_sprint_data: sprintDetails,
    onboarding_complete: true
  });
  navigate('/home');
};
```

**Option B: Save all at once** (simpler)
Only call at the very end:

```javascript
// Only in the final component (AnonymousProfileFixed, OfferSkills, or IdeaSprint)
const handleContinue = async () => {
  const allData = collectOnboardingData(); // Use the function from Step 2
  await authAPI.completeOnboarding(allData);
  navigate('/home');
};
```

## Data Mapping

The backend accepts both snake_case (Python) and camelCase (JavaScript) field names:

| Frontend (localStorage) | Backend Field | Model |
|------------------------|---------------|-------|
| userRole | user_role | User |
| userStage | user_stage | User |
| userMask | user_mask | User |
| selectedIntent | user_intent | User |
| whyHere | mission_statement | OnboardingData |
| selectedValues | selected_values | OnboardingData |
| yourIndustries | industries | OnboardingData |
| yourSkills | skills | OnboardingData |
| yourExperience | experience | OnboardingData |
| yourBackground | background | OnboardingData |
| yourSelf | about_self | OnboardingData |
| birthPlace | birth_place | OnboardingData |
| pitchText | pitch_text | OnboardingData |
| pitchFormat | pitch_format | OnboardingData |
| hasVoiceNote | has_voice_note | OnboardingData |
| pitchDeckFileName | pitch_deck_file_name | OnboardingData |
| pitchDeckFileSize | pitch_deck_file_size | OnboardingData |
| cofounderPreferences | cofounder_preferences | OnboardingData |
| offerSkillsPreferences | offer_skills_data | OnboardingData |
| ideaSprintDetails | idea_sprint_data | OnboardingData |

## Profile Sync

When onboarding is saved, a **Profile** is automatically created/updated with:
- `role` ← user_role
- `bio` ← about_self
- `skills` ← skills
- `experience` ← experience
- `industries` ← industries
- `location` ← birth_place

## Next Steps

1. **Run migrations** (after drf-spectacular is installed):
   ```bash
   cd backend_django
   python manage.py makemigrations users
   python manage.py migrate
   ```

2. **Update each onboarding component** to call `authAPI.completeOnboarding()` with the data it collects

3. **Test the flow**:
   - Register a new user
   - Go through each onboarding step
   - Verify data is saved in Django admin
   - Check that Profile is created automatically

## Checking Saved Data

After registration, you can retrieve the saved onboarding data:

```javascript
const response = await authAPI.getOnboardingStatus();
console.log(response.data);
// {
//   onboarding_complete: true,
//   user_intent: 'idea-sprint',
//   user_stage: 'idea-stage',
//   user_mask: 'rocket',
//   user_role: 'founder',
//   onboarding_data: { ... all saved data ... }
// }
```
