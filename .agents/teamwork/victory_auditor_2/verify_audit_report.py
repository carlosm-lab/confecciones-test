import os
import re
import hashlib
from collections import Counter

WORKSPACE = r"c:\Users\usuar\Desktop\confecciones liss"
PATH_1 = os.path.join(WORKSPACE, r".agents\teamwork\orchestrator_1\AUDIT_REPORT.md")
PATH_2 = os.path.join(WORKSPACE, r".agents\teamwork\orchestrator_2\AUDIT_REPORT.md")

print("=== STARTING INDEPENDENT VICTORY VERIFICATION SCRIPT (V2) ===")

with open(PATH_2, "r", encoding="utf-8") as f:
    content = f.read()

# Finding pattern: ### <ID>: <Title>
# Find all findings in Section 3
sec3_match = re.search(r"3\.\s+REGISTRO DETALLADO DE HALLAZGOS", content, re.IGNORECASE)
sec4_match = re.search(r"4\.\s+PLAN DE ACCI[OÓ]N PRIORIZADO", content, re.IGNORECASE)

assert sec3_match and sec4_match, "Sections 3 and 4 must exist"
sec3_start = sec3_match.start()
sec4_start = sec4_match.start()

sec3_content = content[sec3_start:sec4_start]

# Findings regex: ### ID: Title
finding_headers = list(re.finditer(r"^###\s+([A-Z0-9\-_]+):\s*([^\n]+)", sec3_content, re.MULTILINE))
print(f"Total findings found in Section 3: {len(finding_headers)}")

findings = []
for i, m in enumerate(finding_headers):
    fid = m.group(1).strip()
    title = m.group(2).strip()
    start_pos = m.start()
    end_pos = finding_headers[i+1].start() if i + 1 < len(finding_headers) else len(sec3_content)
    finding_text = sec3_content[start_pos:end_pos]
    findings.append({
        "id": fid,
        "title": title,
        "text": finding_text
    })

cat_counter = Counter()
sev_counter = Counter()
missing_code_blocks = []
missing_locations = []
files_checked = []
nonexistent_files = []
placeholders_found = []

for f in findings:
    fid = f["id"]
    txt = f["text"]

    # Category: - **Categoría:** <val> or - **Categoría**: <val>
    cat_match = re.search(r"-\s+\*\*Categor[ií]a:?\*\*:?\s*([^\n]+)", txt, re.IGNORECASE)
    sev_match = re.search(r"-\s+\*\*Severidad:?\*\*:?\s*([^\n]+)", txt, re.IGNORECASE)
    loc_match = re.search(r"-\s+\*\*Ubicaci[oó]n(?:\s+Exacta)?:?\*\*:?\s*([^\n]+)", txt, re.IGNORECASE)
    diag_match = re.search(r"-\s+\*\*Diagn[oó]stico(?:\s+y\s+Escenario\s+de\s+Fallo)?:?\*\*:?\s*", txt, re.IGNORECASE)
    rem_match = re.search(r"-\s+\*\*C[oó]digo\s+de\s+Remediaci[oó]n(?:\s+Exacto)?:?\*\*:?\s*", txt, re.IGNORECASE)

    cat = cat_match.group(1).strip() if cat_match else "UNKNOWN"
    sev = sev_match.group(1).strip() if sev_match else "UNKNOWN"
    loc = loc_match.group(1).strip() if loc_match else "UNKNOWN"

    cat_norm = "UNKNOWN"
    if "seguridad" in cat.lower() or "security" in cat.lower() or fid.startswith("SEC"):
        cat_norm = "Security"
    elif "rendimiento" in cat.lower() or "performance" in cat.lower() or fid.startswith("PERF"):
        cat_norm = "Performance"
    elif "accesibilidad" in cat.lower() or "a11y" in cat.lower() or "accessibility" in cat.lower() or fid.startswith("A11Y"):
        cat_norm = "Accessibility"
    elif "arquitectura" in cat.lower() or "calidad" in cat.lower() or "code" in cat.lower() or fid.startswith("ARCH"):
        cat_norm = "Architecture"

    sev_norm = "UNKNOWN"
    if "cr" in sev.lower():
        sev_norm = "Critical"
    elif "al" in sev.lower() or "hi" in sev.lower():
        sev_norm = "High"
    elif "med" in sev.lower():
        sev_norm = "Medium"
    elif "ba" in sev.lower() or "low" in sev.lower():
        sev_norm = "Low"

    cat_counter[cat_norm] += 1
    sev_counter[sev_norm] += 1

    # Check code blocks
    code_blocks = re.findall(r"```([a-zA-Z0-9_\-]*)\n(.*?)\n```", txt, re.DOTALL)
    if not code_blocks:
        missing_code_blocks.append(fid)
    else:
        # Check code block content
        for lang, cb in code_blocks:
            lines = [l.strip() for l in cb.splitlines() if l.strip()]
            if len(lines) == 0:
                placeholders_found.append((fid, "Empty code block"))
            # Check for dummy facade indicators
            if len(lines) == 1 and lines[0].startswith("return"):
                placeholders_found.append((fid, f"Potential facade: {lines[0]}"))

    if loc == "UNKNOWN":
        missing_locations.append(fid)
    else:
        # Check file citations
        # Matches patterns like src/app/...:123 or sql/migrations/...:12
        path_matches = re.findall(r"`?([a-zA-Z0-9_\-\./\\]+\.[a-zA-Z0-9]+)(?::(\d+(?:-\d+)?))?`?", loc)
        for pm, lno in path_matches:
            clean_path = pm.strip("`'\" \t")
            if clean_path.startswith("./"):
                clean_path = clean_path[2:]
            # Ignore standard spec names or doc files if any, check real files
            full_path = os.path.join(WORKSPACE, clean_path.replace("/", os.sep))
            exists = os.path.exists(full_path)
            files_checked.append((fid, clean_path, lno, exists))
            if not exists:
                # Some files might be in subdirectories or config
                nonexistent_files.append((fid, clean_path))

print("\n--- DETAILED AUDIT VERIFICATION METRICS ---")
print(f"Total Findings Found: {len(findings)}")
print("Category Breakdown (Target: Security: 16, Performance: 15, Accessibility: 17, Architecture: 14):")
for k in ["Security", "Performance", "Accessibility", "Architecture"]:
    print(f"  {k}: {cat_counter[k]}")

print("\nSeverity Breakdown (Target: Critical: 9, High: 23, Medium: 19, Low: 11):")
for k in ["Critical", "High", "Medium", "Low"]:
    print(f"  {k}: {sev_counter[k]}")

print(f"\nMissing code blocks count: {len(missing_code_blocks)}")
if missing_code_blocks:
    print(f"  Findings without code blocks: {missing_code_blocks}")

print(f"\nMissing location citations count: {len(missing_locations)}")
if missing_locations:
    print(f"  Findings without location: {missing_locations}")

print(f"\nPlaceholders or facades flagged: {len(placeholders_found)}")
for pf in placeholders_found:
    print(f"  {pf}")

print(f"\nTotal file citations verified: {len(files_checked)}")
print(f"Nonexistent files count: {len(nonexistent_files)}")
if nonexistent_files:
    for nf in nonexistent_files:
        print(f"  {nf}")

# Check Section 2 table counts against findings
print("\n--- SECTION 2 EXECUTIVE SUMMARY PARITY CHECK ---")
sec2_start = re.search(r"2\.\s+RESUMEN EJECUTIVO DE RIESGO", content, re.IGNORECASE).start()
sec2_content = content[sec2_start:sec3_start]
print("Section 2 excerpt:\n" + "\n".join(sec2_content.strip().splitlines()[:15]))

# Verify Prioritized Action Plan (Section 4)
print("\n--- SECTION 4 PRIORITIZED ACTION PLAN CHECK ---")
sec4_content = content[sec4_start:]
phases = re.findall(r"(?:###|####|\*\*)\s*(Fase\s+\d+[^:\n*]+)", sec4_content, re.IGNORECASE)
print(f"Action plan phases found ({len(phases)}):")
for p in phases:
    print(f"  - {p.strip()}")

print("\n=== VERIFICATION FINISHED ===")
