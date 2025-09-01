import re

def clean_dedup_sort(input_file, output_file):
    seen = set()
    chapters = []
    
    with open(input_file, "r", encoding="utf-8") as f:
        for line in f:
            # Remove any leading numbers + punctuation + spaces
            chapter = re.sub(r'^\s*\d+[\.\)\-]*\s*', '', line.strip())
            if chapter and chapter not in seen:
                chapters.append(chapter)
                seen.add(chapter)
    
    # Sort alphabetically
    chapters.sort(key=lambda x: x.lower())
    
    with open(output_file, "w", encoding="utf-8") as out:
        for chapter in chapters:
            out.write(chapter + "\n")

# Usage:
# Put your list in chapters.txt, run script, get clean_sorted.txt
clean_dedup_sort(r"D:\FUN SCHOOL\maths\chapters.txt", r"D:\FUN SCHOOL\maths\clean_sorted.txt")

# Input: clean_sorted.txt (deduped + alphabetical)
# Output: numbered_sorted.txt

input_file = r"D:\FUN SCHOOL\maths\clean_sorted.txt"
output_file = r"D:\FUN SCHOOL\maths\numbered_sorted.txt"

with open(input_file, "r", encoding="utf-8") as f:
    chapters = [line.strip() for line in f if line.strip()]

with open(output_file, "w", encoding="utf-8") as out:
    for i, chapter in enumerate(chapters, start=1):
        out.write(f"{i}. {chapter}\n")

print(f"Numbered list saved to: {output_file}")# Input: chapters.txt (with possible duplicates and numbering)