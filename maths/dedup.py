import re
import argparse
from pathlib import Path

def clean_chapter_name(line):
    """Remove leading numbers, punctuation, and spaces from a chapter name."""
    return re.sub(r'^\s*\d+[\.\)\-]*\s*', '', line.strip())

def process_chapters(input_file, clean_output, numbered_output):
    """
    Process chapters: clean, deduplicate, sort, and write clean and numbered versions.
    
    Args:
        input_file (Path): Path to input file with raw chapters
        clean_output (Path): Path to write clean, sorted, deduplicated chapters
        numbered_output (Path): Path to write numbered version of clean chapters
    """
    seen = set()
    chapters = []
    
    try:
        with open(input_file, "r", encoding="utf-8") as f:
            for line in f:
                chapter = clean_chapter_name(line)
                # Case-insensitive deduplication
                if chapter and chapter.lower() not in seen:
                    chapters.append(chapter)
                    seen.add(chapter.lower())
        
        # Sort alphabetically (case-insensitive)
        chapters.sort(key=lambda x: x.lower())
        
        # Write clean, sorted, deduplicated chapters
        with open(clean_output, "w", encoding="utf-8") as out:
            for chapter in chapters:
                out.write(chapter + "\n")
        
        # Write numbered version
        with open(numbered_output, "w", encoding="utf-8") as out:
            for i, chapter in enumerate(chapters, start=1):
                out.write(f"{i}. {chapter}\n")
                
        print(f"Clean sorted list saved to: {clean_output}")
        print(f"Numbered list saved to: {numbered_output}")
        
    except FileNotFoundError as e:
        print(f"Error: File not found - {e.filename}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def main():
    """Parse command-line arguments and run the chapter processing."""
    parser = argparse.ArgumentParser(
        description="Clean, deduplicate, sort, and number chapter lists from a text file."
    )
    parser.add_argument(
        "input_file", 
        type=Path, 
        nargs='?',  # Makes argument optional
        default=Path(r"D:\FUN SCHOOL\maths\chapters.txt"),
        help="Path to input file (e.g., chapters.txt)"
    )
    parser.add_argument(
        "clean_output", 
        type=Path, 
        nargs='?',  # Makes argument optional
        default=Path(r"D:\FUN SCHOOL\maths\clean_sorted.txt"),
        help="Path to clean sorted output file"
    )
    parser.add_argument(
        "numbered_output", 
        type=Path, 
        nargs='?',  # Makes argument optional
        default=Path(r"D:\FUN SCHOOL\maths\numbered_sorted.txt"),
        help="Path to numbered output file"
    )
    
    args = parser.parse_args()
    process_chapters(args.input_file, args.clean_output, args.numbered_output)

if __name__ == "__main__":
    main()