# API Integration Quick Update Script for PowerShell
# This script adds API import statements to all component files

Write-Host "Starting API integration updates..." -ForegroundColor Green

# Files to update
$files = @(
  "src\components\EntrepreneurProfile.jsx",
  "src\components\MyPitches.jsx",
  "src\components\PitchBackSystem.jsx",
  "src\components\CofounderMatching.jsx",
  "src\components\StartupWorkspace.jsx",
  "src\components\TeamWorkspace.jsx",
  "src\components\ProjectBoard.jsx",
  "src\components\SkillsDashboard.jsx",
  "src\components\Marketplace.jsx",
  "src\components\Events.jsx",
  "src\components\EquityFramework.jsx",
  "src\components\StakeholderCRM.jsx",
  "src\components\SprintDashboard.jsx",
  "src\components\MVPTracker.jsx",
  "src\components\ai-cofounder\CoCoach.jsx",
  "src\components\ai-cofounder\CoPlan.jsx",
  "src\components\ai-cofounder\CoDesign.jsx",
  "src\components\ai-cofounder\CoScript.jsx"
)

# Import statements
$standardImport = "import { profileAPI, pitchesAPI, pitchbacksAPI, matchingAPI, projectsAPI, skillsAPI, marketplaceAPI, eventsAPI, messagingAPI, equityAPI, aiCofounderAPI, stakeholdersAPI, sprintToolsAPI } from '../services/api';"
$aiImport = "import { aiCofounderAPI } from '../../services/api';"

foreach ($file in $files) {
  if (Test-Path $file) {
    $content = Get-Content $file -Raw
    
    # Check if import already exists
    if ($content -notmatch "from\s+['\`"].*services/api") {
      # Determine which import to use
      $importToAdd = if ($file -match "ai-cofounder") { $aiImport } else { $standardImport }
      
      # Find first import line
      $lines = Get-Content $file
      $firstImportIndex = 0
      for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($lines[$i] -match "^import\s+") {
          $firstImportIndex = $i
          break
        }
      }
      
      if ($firstImportIndex -ge 0) {
        # Insert after first import
        $lines = @($lines[0..$firstImportIndex]) + $importToAdd + @($lines[($firstImportIndex + 1)..($lines.Length - 1)])
        $lines | Set-Content $file
        Write-Host "✓ Added import to $file" -ForegroundColor Green
      } else {
        Write-Host "✗ Could not find import location in $file" -ForegroundColor Red
      }
    } else {
      Write-Host "- Import already exists in $file" -ForegroundColor Yellow
    }
  } else {
    Write-Host "✗ File not found: $file" -ForegroundColor Red
  }
}

Write-Host ""
Write-Host "API integration imports complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review the API_INTEGRATION_GUIDE.md for detailed integration instructions"
Write-Host "2. Replace mock API calls with real API calls using the imported methods"
Write-Host "3. Test each component individually"
Write-Host "4. Update error handling and loading states"
