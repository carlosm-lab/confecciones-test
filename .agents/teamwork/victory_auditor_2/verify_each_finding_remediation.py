import os
import re

WORKSPACE = r"c:\Users\usuar\Desktop\confecciones liss"
PATH = os.path.join(WORKSPACE, r".agents\teamwork\orchestrator_2\AUDIT_REPORT.md")

with open(PATH, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find finding header lines
finding_indices = []
for i, line in enumerate(lines):
    m = re.match(r"^###\s+([A-Z0-9\-_]+):\s*(.*)", line.strip())
    if m:
        # Check if it's before Section 4
        finding_indices.append((i, m.group(1), m.group(2)))

sec4_line = None
for i, line in enumerate(lines):
    if "4. PLAN DE ACCIÓN" in line:
        sec4_line = i
        break

findings_sec3 = [fi for fi in finding_indices if fi[0] < sec4_line]

print(f"Total findings in Section 3: {len(findings_sec3)}")

missing_remediation = []
remediation_stats = []

for idx, (line_no, fid, title) in enumerate(findings_sec3):
    next_line = findings_sec3[idx + 1][0] if idx + 1 < len(findings_sec3) else sec4_line
    finding_lines = lines[line_no:next_line]
    finding_text = "".join(finding_lines)
    
    # Locate "- **Código de Remediación Exacto:**"
    rem_header = None
    for li, fl in enumerate(finding_lines):
        if "**Código de Remediación" in fl:
            rem_header = li
            break
            
    if rem_header is None:
        missing_remediation.append((fid, "No remediation header found"))
        continue
        
    rem_lines = finding_lines[rem_header:]
    # Count code blocks in rem_lines
    fences = [l for l in rem_lines if l.strip().startswith("```")]
    code_block_count = len(fences) // 2
    
    if code_block_count == 0:
        missing_remediation.append((fid, "Zero code blocks in remediation"))
    else:
        # Calculate lines of code
        loc = 0
        in_c = False
        for l in rem_lines:
            if l.strip().startswith("```"):
                in_c = not in_c
            elif in_c:
                loc += 1
        remediation_stats.append((fid, code_block_count, loc))

print(f"Findings with missing remediation: {len(missing_remediation)}")
if missing_remediation:
    for mr in missing_remediation:
        print(f"  {mr}")
else:
    print("All 62 findings have verified remediation code blocks!")
    print(f"Min lines of remediation code: {min(s[2] for s in remediation_stats)}")
    print(f"Max lines of remediation code: {max(s[2] for s in remediation_stats)}")
    print(f"Avg lines of remediation code: {sum(s[2] for s in remediation_stats) / len(remediation_stats):.1f}")
