#!/bin/bash
cd "/Users/macmini2/Documents/Vatsim Interactive Checkliat/checklist files"
lsof -ti:8080 | xargs kill -9 2>/dev/null
python3 -m http.server 8080 &
sleep 1
# Find the first SWEATBOX html file in the folder
FILE=$(ls SWEATBOX*.html 2>/dev/null | head -1)
ENCODED=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$FILE'))")
open -a "Google Chrome" "http://localhost:8080/$ENCODED"
wait
