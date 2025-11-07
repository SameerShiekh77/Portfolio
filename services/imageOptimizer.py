import os

# Change to parent directory
os.chdir("../")

# Get all files from the public directory
files = [os.path.join(path, name) for path, subdirs, files in os.walk("/home/sameer/Desktop/Personal/Portfolio/public") for name in files]

print(f"Found {len(files)} files to process")

# Track conversion statistics
converted_count = 0
skipped_count = 0
error_count = 0

for file in files:
    # Get file extension
    file_ext = file.split(".")[-1].lower()
    
    # Only process image files
    if file_ext in ["png", "jpg", "jpeg"]:
        # Create output filename by replacing extension with .webp
        output_file = os.path.splitext(file)[0] + ".webp"
        
        # Skip if WebP version already exists
        if os.path.exists(output_file):
            print(f"Skipping {file} - WebP version already exists")
            skipped_count += 1
            continue
        
        # Convert to WebP
        command = f'cwebp -q 80 "{file}" -o "{output_file}"'
        
        print(f"Converting: {os.path.basename(file)}")
        result = os.system(command)
        
        if result == 0:
            converted_count += 1
            print(f"✓ Successfully converted to {os.path.basename(output_file)}")
            
            # Uncomment the next line if you want to delete original files after conversion
            os.remove(file)
        else:
            error_count += 1
            print(f"✗ Error converting {file}")
    
    elif file_ext == "webp":
        print(f"Skipping {os.path.basename(file)} - already WebP format")
        skipped_count += 1

print(f"\n=== Conversion Summary ===")
print(f"Successfully converted: {converted_count}")
print(f"Skipped: {skipped_count}")
print(f"Errors: {error_count}")
print(f"Total files processed: {len(files)}")