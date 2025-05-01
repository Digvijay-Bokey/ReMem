import anthropic
import json

def test_claude():
    client = anthropic.Anthropic(
        api_key="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",
    )
    
    try:
        message = client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": "What is the capital of France?"}
            ]
        )
        
        print("Message type:", type(message))
        print("Content type:", type(message.content))
        
        if hasattr(message.content, '__iter__'):
            print("Content is iterable")
            for i, block in enumerate(message.content):
                print(f"Block {i} type: {type(block)}")
                print(f"Block {i} attributes: {dir(block)}")
                
                if hasattr(block, 'text'):
                    print(f"Block {i} text: {block.text}")
        else:
            print("Content is not iterable")
            print("Content:", message.content)
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    test_claude() 