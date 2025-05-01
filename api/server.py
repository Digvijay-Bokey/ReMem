import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from chat import chat_with_claude

class ChatRequestHandler(BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        request_body = self.rfile.read(content_length).decode('utf-8')
        
        try:
            data = json.loads(request_body)
            user_input = data.get('input', '')
            context = data.get('context', '')
            
            response = chat_with_claude(user_input, context)
            
            self.send_response(200)
            self._set_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            # Ensure response is a string for JSON serialization
            response_data = {"response": str(response) if response is not None else ""}
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
            
        except Exception as e:
            import traceback
            traceback_str = traceback.format_exc()
            print(f"Error: {str(e)}\n{traceback_str}")
            
            self.send_response(500)
            self._set_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            error_data = {"error": str(e), "traceback": traceback_str}
            self.wfile.write(json.dumps(error_data).encode('utf-8'))

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, ChatRequestHandler)
    print(f'Starting server on port 8000...')
    httpd.serve_forever() 