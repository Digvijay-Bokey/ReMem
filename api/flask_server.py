from flask import Flask, request, jsonify
from chat import chat_with_claude

app = Flask(__name__)

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        # Handle CORS preflight request
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
        
    # Handle actual request
    try:
        data = request.json
        user_input = data.get('input', '')
        context = data.get('context', '')
        
        # Call Claude via our function
        response_text = chat_with_claude(user_input, context)
        
        # Return response
        response = jsonify({"response": response_text})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
        
    except Exception as e:
        import traceback
        error_traceback = traceback.format_exc()
        print(f"Error: {str(e)}")
        print(error_traceback)
        
        response = jsonify({"error": str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.status_code = 500
        return response

if __name__ == '__main__':
    print("Starting Flask server on port 8000...")
    app.run(host='0.0.0.0', port=8000) 