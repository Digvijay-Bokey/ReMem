import anthropic
import sys
import json

def chat_with_claude(user_input, context=""):
    client = anthropic.Anthropic(
        # defaults to os.environ.get("ANTHROPIC_API_KEY")
        api_key="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",
    )
    
    # Combine input and context
    prompt = f"{context}\n\n{user_input}" if context else user_input
    
    try:
        message = client.messages.create(
            model="claude-3-opus-20240229",  # Using a valid model
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        # Extract text from response
        if isinstance(message.content, list):
            response_text = ""
            for block in message.content:
                if hasattr(block, 'text'):
                    response_text += block.text
            return response_text
        else:
            # Fallback to string representation
            return str(message.content)
            
    except Exception as e:
        print(f"Error calling Claude API: {str(e)}")
        return f"Error: {str(e)}"

if __name__ == "__main__":
    # Check if input is provided via command line
    if len(sys.argv) > 1:
        user_input = sys.argv[1]
        context = sys.argv[2] if len(sys.argv) > 2 else ""
        result = chat_with_claude(user_input, context)
        print(result)
    else:
        # If no command line args, try to read from stdin (for piping)
        try:
            data = json.loads(sys.stdin.read())
            user_input = data.get("input", "")
            context = data.get("context", "")
            result = chat_with_claude(user_input, context)
            print(json.dumps({"response": result}))
        except Exception as e:
            print(f"Error: {str(e)}")
            print("Please provide input either as command line arguments or as JSON via stdin") 