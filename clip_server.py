
#!/usr/bin/env python3
"""
clip_server.py  —  KFLL CD Checklist Clipboard Relay
=====================================================
Runs on the Mac Mini alongside the existing checklist HTTP server.
Listens on port 8081.
 
Computer 1 (KM Mac):
  After OCR, the KM macro POSTs the captured text to:
    http://<mac-mini-ip>:8081/clip
 
Mac Mini (checklist):
  The Fetch button GETs http://localhost:8081/clip
  instead of reading navigator.clipboard.
 
Endpoints:
  POST /clip        body = plain text OCR output → stores it (and logs it)
  GET  /clip        returns the stored text
  GET  /            health check → "clip_server OK"
 
Every /clip POST is also appended to clip_captures.log (same folder as this
script) with a timestamp, so intermittent bad OCR captures can be recovered
for debugging even after a clean re-capture overwrites the stored text.
 
Usage:
  python3 clip_server.py
  (runs forever; Ctrl-C to stop)
 
To find the Mac Mini's local IP (needed for KM macro):
  System Settings → Wi-Fi → Details → IP Address
  or run: ipconfig getifaddr en0
"""
 
from http.server import BaseHTTPRequestHandler, HTTPServer
import threading
import os
from datetime import datetime
 
PORT = 8081
_lock = threading.Lock()
_clip = ""          # last text received from KM Mac (OCR -> checklist)
_fpe  = ""          # last FPE payload from checklist (checklist -> KM/CRC)
 
# --- Capture logging -----------------------------------------------------
# Every /clip POST (the raw OCR text the checklist will parse) is appended to
# this file, with a timestamp, so an intermittent bad capture is never lost
# even if a clean re-capture overwrites the in-memory _clip before it can be
# read back via `curl /clip`. To diagnose a misparse later: open this file and
# find the entry by timestamp. Logging never blocks or breaks the relay -- any
# failure writing the log is swallowed so serving text always succeeds.
_LOG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "clip_captures.log")
_log_lock = threading.Lock()
 
def _log_capture(body):
    try:
        ts = datetime.now().isoformat(timespec="seconds")
        entry = (
            f"===== {ts}  ({len(body)} chars) "
            f"{'=' * 24}\n{body}\n\n"
        )
        with _log_lock:
            with open(_LOG_PATH, "a", encoding="utf-8") as fh:
                fh.write(entry)
    except Exception as e:
        # Never let a logging problem affect the relay's real job.
        print(f"[clip_server] (capture log write failed: {e})")
 
class Handler(BaseHTTPRequestHandler):
 
    # ------------------------------------------------------------------ POST
    def do_POST(self):
        if self.path == "/clip":
            global _clip
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length).decode("utf-8", errors="replace")
            with _lock:
                _clip = body
            _log_capture(body)
            print(f"[clip_server] received {len(body)} chars (logged)")
            self._ok("stored")
        elif self.path == "/fpe":
            global _fpe
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length).decode("utf-8", errors="replace")
            with _lock:
                _fpe = body
            print(f"[clip_server] received FPE payload ({len(body)} chars)")
            self._ok("stored")
        else:
            self._err(404, "not found")
 
    # ------------------------------------------------------------------- GET
    def do_GET(self):
        if self.path == "/clip":
            with _lock:
                text = _clip
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(text.encode("utf-8"))
        elif self.path == "/fpe":
            with _lock:
                text = _fpe
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(text.encode("utf-8"))
        elif self.path == "/":
            self._ok("clip_server OK")
        else:
            self._err(404, "not found")
 
    # ---------------------------------------------------------------- OPTIONS
    # Chrome pre-flights cross-origin requests with OPTIONS
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
 
    # --------------------------------------------------------------- helpers
    def _ok(self, msg):
        body = msg.encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/plain")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
 
    def _err(self, code, msg):
        body = msg.encode()
        self.send_response(code)
        self.send_header("Content-Type", "text/plain")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
 
    def log_message(self, fmt, *args):
        # Suppress noisy per-request logs; keep POSTs visible (handled above)
        pass
 
 
if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", PORT), Handler)
    print(f"[clip_server] listening on port {PORT}")
    print(f"[clip_server] POST http://<this-mac-ip>:{PORT}/clip  <- KM macro sends here")
    print(f"[clip_server] GET  http://localhost:{PORT}/clip       <- checklist reads here")
    print(f"[clip_server] capture log: {_LOG_PATH}")
    print("[clip_server] Ctrl-C to stop")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[clip_server] stopped")
 