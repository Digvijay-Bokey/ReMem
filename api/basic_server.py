import http.server
import socketserver
import json
import anthropic
import sys

class BasicHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(post_data)
            
            user_input = data.get('input', '')
            context = data.get('context', '')
            
            # Direct API call instead of using the chat module
            prompt = f"{context}\n\n{user_input}" if context else user_input
            
            # Call Claude API directly
            client = anthropic.Anthropic(
                api_key="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",
            )
            
            message = client.messages.create(
                model="claude-3-opus-20240229",
                max_tokens=1024,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            # Extract text manually
            response_text = ""
            for block in message.content:
                if hasattr(block, 'text'):
                    response_text += block.text
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Manual JSON construction - no serialization issues
            json_response = '{"response": "' + response_text.replace('"', '\\"').replace('\n', '\\n') + '"}'
            self.wfile.write(json_response.encode('utf-8'))
            
        except Exception as e:
            import traceback
            error_traceback = traceback.format_exc()
            print(f"Error: {str(e)}")
            print(error_traceback)
            
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            error_json = '{"error": "' + str(e).replace('"', '\\"') + '"}'
            self.wfile.write(error_json.encode('utf-8'))

if __name__ == '__main__':
    PORT = 8000
    
    with socketserver.TCPServer(("", PORT), BasicHandler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever() 