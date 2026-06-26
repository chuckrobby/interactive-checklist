#!/bin/bash
# Launch_All.command
# Double-click this to start everything needed for the KFLL CD Checklist.
# Keep this Terminal window open while using the checklist.

cd "$(dirname "$0")"

echo "========================================"
echo "  KFLL CD Checklist — Launch All"
echo "========================================"
echo ""

# Show Mac Mini's local IP
IP=$(ipconfig getifaddr en1 2>/dev/null || ipconfig getifaddr en0 2>/dev/null || echo "unknown")
echo "  Mac Mini IP : $IP"
echo "  Checklist   : http://localhost:8080/SWEATBOX_CD_Pre-Clearance_Checklist_2.html"
echo "  Clip relay  : http://localhost:8081/clip"
echo ""
echo "  Keep this window open while using the checklist."
echo "  Press Ctrl-C to stop both servers."
echo ""
echo "========================================"
echo ""

# Start clip server in background
python3 clip_server.py &
CLIP_PID=$!
echo "[launcher] Clip server started (PID $CLIP_PID)"

# Brief pause so clip server is ready before Chrome opens
sleep 1

# Start checklist HTTP server in background
python3 -m http.server 8080 &
HTTP_PID=$!
echo "[launcher] Checklist server started (PID $HTTP_PID)"

sleep 1

# Open checklist in Chrome
open -a "Google Chrome" "http://localhost:8080/SWEATBOX_CD_Pre-Clearance_Checklist_2.html"
echo "[launcher] Opened checklist in Chrome"
echo ""
echo "[launcher] Both servers running. Ctrl-C to stop."

# Wait — keep terminal open; Ctrl-C kills both background servers
trap "echo ''; echo '[launcher] Stopping servers...'; kill $CLIP_PID $HTTP_PID 2>/dev/null; echo '[launcher] Done.'" EXIT
wait
