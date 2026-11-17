import os
import re

WORKSPACE = r"c:\Users\usuar\Desktop\confecciones liss"
PATH = os.path.join(WORKSPACE, r".agents\teamwork\orchestrator_2\AUDIT_REPORT.md")

with open(PATH, "r", encoding="utf-8") as f:
    lines = f.readlines()

sec4_line = None
for i, line in enumerate(lines):
    if "4. PLAN DE ACCIÓN" in line:
        sec4_line = i
        break

finding_indices = []
for i, line in enumerate(lines[:sec4_line]):
    m = re.match(r"^###\s+([A-Z0-9\-_]+):\s*(.*)", line.strip())
    if m:
        finding_indices.append((i, m.group(1), m.group(2)))

sev_order = {"Crítica": 1, "Alta": 2, "Media": 3, "Baja": 4}

findings_data = []
for idx, (l_no, fid, title) in enumerate(finding_indices):
    next_l = finding_indices[idx + 1][0] if idx + 1 < len(finding_indices) else sec4_line
    block = "".join(lines[l_no:next_l])
    sev_m = re.search(r"-\s+\*\*Severidad:?\*\*:?\s*([^\n]+)", block, re.IGNORECASE)
    sev_raw = sev_m.group(1).strip() if sev_m else "UNKNOWN"
    sev_val = sev_raw.split()[0]
    rank = sev_order.get(sev_val, 99)
    findings_data.append((fid, sev_val, rank))

ranks = [fd[2] for fd in findings_data]
is_sorted = ranks == sorted(ranks)
print(f"Findings ordered strictly from Critical to Low: {is_sorted}")

# Print count per severity level in order:
from itertools import groupby
for k, g in groupby(findings_data, key=lambda x: x[1]):
    group_list = list(g)
    print(f"Group {k}: {len(group_list)} findings (IDs: {group_list[0][0]} to {group_list[-1][0]})")
