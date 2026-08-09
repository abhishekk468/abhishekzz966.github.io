from PIL import Image
from pathlib import Path

IN = Path(__file__).parent.parent / 'images' / 'profile.jpg'
BACKUP = IN.with_name('profile_orig.jpg')
OUT = IN
SIZE = (400,400)

if not IN.exists():
    print('profile.jpg not found at', IN)
    raise SystemExit(1)

# backup
if not BACKUP.exists():
    IN.replace(BACKUP)
    # restore name for processing
    BACKUP.replace(IN)
    # now IN exists again (since we replaced back)

# Create a proper backup copy (overwrite)
from shutil import copy2
copy2(IN, BACKUP)

img = Image.open(IN).convert('RGB')
w,h = img.size
# center crop to square
min_dim = min(w,h)
left = (w - min_dim)//2
top = (h - min_dim)//2
right = left + min_dim
bottom = top + min_dim
img_cropped = img.crop((left,top,right,bottom))
img_resized = img_cropped.resize(SIZE, Image.LANCZOS)
img_resized.save(OUT, quality=90)
print('Resized and saved', OUT)
print('Backup at', BACKUP)
