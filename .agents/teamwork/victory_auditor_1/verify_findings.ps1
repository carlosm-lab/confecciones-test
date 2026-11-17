$lines = Get-Content -Path ".agents\teamwork\orchestrator_1\AUDIT_REPORT.md"

$findings = @()
$current = $null

for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match '^###\s+([A-Z0-9]+-\d+):\s+(.*)$') {
        if ($current) { $findings += $current }
        $current = [PSCustomObject]@{
            Id = $matches[1]
            Title = $matches[2]
            Category = ""
            Severity = ""
            Location = ""
            LineNum = $i + 1
        }
    } elseif ($current) {
        if ($line -match '^-\s+\*\*Category:\*\*\s*(.*)$') {
            $current.Category = $matches[1].Trim()
        } elseif ($line -match '^-\s+\*\*Severity:\*\*\s*(.*)$') {
            $current.Severity = $matches[1].Trim()
        } elseif ($line -match '^-\s+\*\*Exact Location:\*\*\s*(.*)$') {
            $current.Location = $matches[1].Trim()
        }
    }
}
if ($current) { $findings += $current }

Write-Host "Total findings identified: $($findings.Count)"

$byPrefix = @{}
$bySev = @{}
$matrix = @{}

foreach ($f in $findings) {
    $prefix = $f.Id.Split('-')[0]
    $sev = $f.Severity
    
    if (-not $byPrefix.ContainsKey($prefix)) { $byPrefix[$prefix] = 0 }
    $byPrefix[$prefix]++
    
    if (-not $bySev.ContainsKey($sev)) { $bySev[$sev] = 0 }
    $bySev[$sev]++
    
    $key = "$prefix | $sev"
    if (-not $matrix.ContainsKey($key)) { $matrix[$key] = 0 }
    $matrix[$key]++
}

Write-Host "`n=== By Domain Prefix ==="
$byPrefix.GetEnumerator() | Sort-Object Name | ForEach-Object { Write-Host "$($_.Key): $($_.Value)" }

Write-Host "`n=== By Severity ==="
$bySev.GetEnumerator() | Sort-Object Name | ForEach-Object { Write-Host "$($_.Key): $($_.Value)" }

Write-Host "`n=== Domain x Severity Matrix ==="
$matrix.GetEnumerator() | Sort-Object Name | ForEach-Object { Write-Host "$($_.Key): $($_.Value)" }

Write-Host "`n=== Severity Sequence Order Check ==="
$orderValid = $true
$sevRank = @{ 'Critical' = 1; 'High' = 2; 'Medium' = 3; 'Low' = 4 }
$prevRank = 1

foreach ($f in $findings) {
    $rank = $sevRank[$f.Severity]
    if ($rank -lt $prevRank) {
        Write-Host "ORDER ERROR: $($f.Id) has severity $($f.Severity) (rank $rank) after rank $prevRank"
        $orderValid = $false
    }
    $prevRank = $rank
}

Write-Host "`n=== Structure & Content Verification per Finding ==="
$hasDiagnosis = 0
$hasRemediation = 0
$missingFiles = @()
$verifiedFiles = @{}

for ($idx = 0; $idx -lt $findings.Count; $idx++) {
    $f = $findings[$idx]
    $startLine = $f.LineNum
    $endLine = if ($idx + 1 -lt $findings.Count) { $findings[$idx + 1].LineNum - 1 } else { $lines.Length }
    
    $block = ($lines[($startLine - 1)..($endLine - 1)]) -join "`n"
    
    if ($block -match 'Diagnosis and Failure Scenario') { $hasDiagnosis++ }
    else { Write-Host "MISSING DIAGNOSIS: $($f.Id)" }
    
    if ($block -match 'Exact Remediation Code') { $hasRemediation++ }
    else { Write-Host "MISSING REMEDIATION: $($f.Id)" }

    # Parse file path(s) from Exact Location
    $locStr = $f.Location
    # Match backticked file paths or words
    $fileMatches = [regex]::Matches($locStr, '`([^`:]+)(?::\d+(?:-\d+)?)?`')
    foreach ($fm in $fileMatches) {
        $filePath = $fm.Groups[1].Value.Trim()
        if ($filePath.EndsWith('.ts') -or $filePath.EndsWith('.tsx') -or $filePath.EndsWith('.sql') -or $filePath.EndsWith('.json') -or $filePath.EndsWith('.mjs') -or $filePath.EndsWith('.env') -or $filePath.EndsWith('.css')) {
            # Check if file exists on disk (use -LiteralPath to handle [param] Next.js route brackets)
            $exists = Test-Path -LiteralPath $filePath
            if ($exists) {
                $verifiedFiles[$filePath] = $true
            } else {
                $missingFiles += [PSCustomObject]@{
                    Id = $f.Id
                    File = $filePath
                    Location = $locStr
                }
            }
        }
    }
}

Write-Host "Findings with Diagnosis & Failure Scenario: $hasDiagnosis / $($findings.Count)"
Write-Host "Findings with Exact Remediation Code: $hasRemediation / $($findings.Count)"
Write-Host "Unique repository files cited and verified existing: $($verifiedFiles.Keys.Count)"
if ($missingFiles.Count -eq 0) {
    Write-Host "All cited file paths exist in the repository!"
} else {
    Write-Host "WARNING: Found $($missingFiles.Count) missing file references:"
    $missingFiles | ForEach-Object { Write-Host "  $($_.Id): $($_.File)" }
}



