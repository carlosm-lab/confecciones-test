import os
import re

WORKSPACE = r"c:\Users\usuar\Desktop\confecciones liss"
PATH = os.path.join(WORKSPACE, r".agents\teamwork\orchestrator_2\AUDIT_REPORT.md")

with open(PATH, "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines in file: {len(lines)}")

# Let's find every line where triple backticks appear
fence_lines = []
for i, line in enumerate(lines, 1):
    stripped = line.strip()
    if stripped.startswith("```"):
        fence_lines.append((i, stripped))

print(f"Total triple-backtick fence lines: {len(fence_lines)}")
print(f"Is count even?: {len(fence_lines) % 2 == 0}")

if len(fence_lines) % 2 != 0:
    print("WARNING: Odd number of fences! Listing first 20 and last 20:")
    for fl in fence_lines[:20]:
        print(f"  Line {fl[0]}: {fl[1]}")
    for fl in fence_lines[-20:]:
        print(f"  Line {fl[0]}: {fl[1]}")
else:
    print("All code block fences are strictly paired!")

# Let's inspect each pair of fences
empty_blocks = []
blocks_info = []
for idx in range(0, len(fence_lines), 2):
    if idx + 1 >= len(fence_lines):
        break
    start_line, start_fence = fence_lines[idx]
    end_line, end_fence = fence_lines[idx + 1]
    lang = start_fence[3:].strip()
    content_lines = lines[start_line:end_line - 1]
    non_empty = [l.strip() for l in content_lines if l.strip()]
    blocks_info.append((start_line, end_line, lang, len(content_lines), len(non_empty)))
    if len(non_empty) == 0:
        empty_blocks.append((start_line, end_line, start_fence))

print(f"\nTotal paired code blocks: {len(blocks_info)}")
print(f"Empty code blocks count: {len(empty_blocks)}")
for eb in empty_blocks:
    print(f"  Empty block at lines {eb[0]}-{eb[1]}: '{eb[2]}'")

# Check if any markdown headers are accidentally inside a code block
headers_in_code = []
for start_line, end_line, lang, total_l, ne_l in blocks_info:
    for li, line in enumerate(lines[start_line:end_line - 1], start=start_line + 1):
        if line.startswith("### ") or line.startswith("## ") or line.startswith("# "):
            headers_in_code.append((li, line.strip(), start_line, end_line))

print(f"\nMarkdown headers accidentally inside code blocks: {len(headers_in_code)}")
for h in headers_in_code:
    print(f"  Line {h[0]}: '{h[1]}' (inside block {h[2]}-{h[3]})")
