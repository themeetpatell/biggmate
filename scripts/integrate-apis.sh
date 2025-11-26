#!/bin/bash
# API Integration Quick Update Script
# This script adds the API import statement to all component files

echo "Starting API integration updates..."

# Array of files to update
declare -a files=(
  "src/components/EntrepreneurProfile.jsx"
  "src/components/MyPitches.jsx"
  "src/components/PitchBackSystem.jsx"
  "src/components/CofounderMatching.jsx"
  "src/components/StartupWorkspace.jsx"
  "src/components/TeamWorkspace.jsx"
  "src/components/ProjectBoard.jsx"
  "src/components/SkillsDashboard.jsx"
  "src/components/Marketplace.jsx"
  "src/components/Events.jsx"
  "src/components/EquityFramework.jsx"
  "src/components/StakeholderCRM.jsx"
  "src/components/SprintDashboard.jsx"
  "src/components/MVPTracker.jsx"
  "src/components/ai-cofounder/CoCoach.jsx"
  "src/components/ai-cofounder/CoPlan.jsx"
  "src/components/ai-cofounder/CoDesign.jsx"
  "src/components/ai-cofounder/CoScript.jsx"
)

# Import statement to add
IMPORT_STATEMENT="import { profileAPI, pitchesAPI, pitchbacksAPI, matchingAPI, projectsAPI, skillsAPI, marketplaceAPI, eventsAPI, messagingAPI, equityAPI, aiCofounderAPI, stakeholdersAPI, sprintToolsAPI } from '../services/api';"

# For ai-cofounder components, use different path
AI_IMPORT_STATEMENT="import { aiCofounderAPI } from '../../services/api';"

# Function to add import if not exists
add_import() {
  local file=$1
  local import_stmt=$2
  
  if [ -f "$file" ]; then
    # Check if import already exists
    if ! grep -q "from.*services/api" "$file"; then
      # Find the first import statement
      first_import=$(grep -n "^import" "$file" | head -1 | cut -d: -f1)
      
      if [ ! -z "$first_import" ]; then
        # Insert after the first import
        sed -i "${first_import}a\\${import_stmt}" "$file"
        echo "✓ Added import to $file"
      else
        echo "✗ Could not find import location in $file"
      fi
    else
      echo "- Import already exists in $file"
    fi
  else
    echo "✗ File not found: $file"
  fi
}

# Update each file
for file in "${files[@]}"; do
  if [[ $file == *"ai-cofounder"* ]]; then
    add_import "$file" "$AI_IMPORT_STATEMENT"
  else
    add_import "$file" "$IMPORT_STATEMENT"
  fi
done

echo ""
echo "API integration imports complete!"
echo ""
echo "Next steps:"
echo "1. Review the API_INTEGRATION_GUIDE.md for detailed integration instructions"
echo "2. Replace mock API calls with real API calls using the imported methods"
echo "3. Test each component individually"
echo "4. Update error handling and loading states"
