#!/bin/bash
# Launch_ClipServer.command
# Double-click this to start the clipboard relay server on the Mac Mini.
# Keep this Terminal window open while using the checklist.

cd "$(dirname "$0")"

echo "========================================"
echo "  KFLL Clipboard Relay Server"
echo "========================================"
echo ""

# Show this Mac's local IP so you can configure the KM macro
IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "unknown")
echo "  Mac Mini local IP: $IP"
echo "  KM macro POST URL: http://$IP:8081/clip"
echo ""
echo "  Keep this window open while using the checklist."
echo "  Press Ctrl-C to stop."
echo ""
echo "========================================"
echo ""

python3 clip_server.py
