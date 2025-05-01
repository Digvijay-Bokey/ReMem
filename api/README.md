# Claude API Tools

This directory contains Python-based tools for interacting with Claude 3 Opus.

## Setup

1. Install required dependencies:
   ```
   pip install anthropic
   ```
   
## Local Scripts

### Single Question Mode

Process a single question with optional context:

```
python local_claude.py "Your question here" "Optional context"
```

Example:
```
python local_claude.py "What is the capital of France?" "I am studying European geography."
```

The response will be displayed in the console and saved to a file in the `responses` directory.

### Batch Processing Mode

Process multiple questions from a file:

```
python batch_claude.py questions.txt
```

or

```
python batch_claude.py questions.json
```

#### File Formats:

1. **Text file** (.txt): One question per line. No context is used.

2. **JSON file** (.json): An array of objects with the following structure:
   ```json
   [
     {
       "input": "Your question here",
       "context": "Optional context"
     },
     ...
   ]
   ```

Responses will be saved to a batch directory with individual response files and a combined JSON file.

## API Usage (Experimental)

Note: The HTTP server implementations are currently experimental and have issues with JSON serialization.

For direct API usage in Python code:

```python
from local_claude import chat_with_claude

response = chat_with_claude("What's the weather like?", "I'm in New York City")
print(response)
```

### HTTP Server (Experimental)

Note: The HTTP server implementation is currently experimental.

1. Start the server:
   ```
   python server.py
   ```

2. The server will run on port 8000.

3. Make a POST request to `http://localhost:8000` with a JSON body:
   ```json
   {
     "input": "Your question here",
     "context": "Optional context information"
   }
   ```

### Command line usage

```
python chat.py "What's the weather like?" "I'm in New York City"
```

Or pipe in a JSON object:

```
echo '{"input": "What is the weather like?", "context": "I am in New York City"}' | python chat.py 