import anthropic
import sys
import json

def main():
    # Parse command-line arguments
    if len(sys.argv) < 2:
        print("Usage: python api_test.py 'Your question'")
        return
    
    user_input = sys.argv[1]
    context = sys.argv[2] if len(sys.argv) > 2 else ""
    
    # Call Claude API directly
    client = anthropic.Anthropic(
        api_key="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",
    )
    
    # Combine input and context
    prompt = f"{context}\n\n{user_input}" if context else user_input
    
    try:
        print(f"Calling Claude API with prompt: '{prompt}'")
        
        message = client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        # Extract text from response
        response_text = ""
        for block in message.content:
            if hasattr(block, 'text'):
                response_text += block.text
        
        print("\nResponse from Claude:")
        print(response_text)
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main() 