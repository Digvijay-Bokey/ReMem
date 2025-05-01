import json
import http.server
import socketserver
from chat import chat_with_claude

class SimpleHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')
        
        try:
            # Parse JSON request
            data = json.loads(post_data)
            user_input = data.get('input', '')
            context = data.get('context', '')
            
            # Call Claude API via our function that properly extracts text
            response = chat_with_claude(user_input, context)
            
            # Prepare and send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Convert response to string to ensure JSON serialization
            self.wfile.write(json.dumps({"response": str(response)}).encode('utf-8'))
            
        except Exception as e:
            import traceback
            error_traceback = traceback.format_exc()
            print(f"Error: {str(e)}")
            print(error_traceback)
            
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e), "traceback": error_traceback}).encode('utf-8'))

if __name__ == '__main__':
    PORT = 8000
    
    with socketserver.TCPServer(("", PORT), SimpleHandler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever() 