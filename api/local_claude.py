import anthropic
import sys
import os
import datetime

def chat_with_claude(user_input, context=""):
    """Call Claude API and return the response text"""
    client = anthropic.Anthropic(
        api_key="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",
    )
    
    # Combine input and context
    prompt = f"{context}\n\n{user_input}" if context else user_input
    
    try:
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
        
        return response_text
            
    except Exception as e:
        print(f"Error calling Claude API: {str(e)}")
        return f"Error: {str(e)}"

def save_to_file(prompt, response):
    """Save prompt and response to a file"""
    # Create responses directory if it doesn't exist
    if not os.path.exists("responses"):
        os.makedirs("responses")
    
    # Generate timestamp for filename
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"responses/claude_response_{timestamp}.txt"
    
    with open(filename, "w") as f:
        f.write(f"PROMPT:\n{prompt}\n\n")
        f.write(f"RESPONSE:\n{response}\n")
    
    return filename

def main():
    # Check command-line arguments
    if len(sys.argv) < 2:
        print("Usage: python local_claude.py 'Your question' 'Optional context'")
        return
    
    user_input = sys.argv[1]
    context = sys.argv[2] if len(sys.argv) > 2 else ""
    
    # Format full prompt
    full_prompt = f"{context}\n\n{user_input}" if context else user_input
    
    print(f"Sending prompt to Claude: '{full_prompt}'")
    
    # Call Claude API
    response = chat_with_claude(user_input, context)
    
    # Save the response to a file
    filename = save_to_file(full_prompt, response)
    
    # Print response to console
    print("\nClaude's response:")
    print("-" * 50)
    print(response)
    print("-" * 50)
    print(f"\nResponse saved to: {filename}")

if __name__ == "__main__":
    main() 