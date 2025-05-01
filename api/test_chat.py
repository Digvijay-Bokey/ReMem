from chat import chat_with_claude

def main():
    try:
        response = chat_with_claude(
            "What is the capital of France?", 
            "I am studying European geography."
        )
        print("Response type:", type(response))
        print("Response:", response)
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main() 