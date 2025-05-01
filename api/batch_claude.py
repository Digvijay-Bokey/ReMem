import anthropic
import sys
import os
import datetime
import json
from local_claude import chat_with_claude, save_to_file

def process_questions_file(filename):
    """Process a file containing multiple questions"""
    if not os.path.exists(filename):
        print(f"Error: File '{filename}' not found.")
        return
    
    # Read questions from file
    try:
        with open(filename, 'r') as f:
            if filename.endswith('.json'):
                # JSON format with questions and contexts
                data = json.load(f)
                questions = data
            else:
                # Simple text file with one question per line
                questions = [{"input": line.strip(), "context": ""} for line in f if line.strip()]
    except Exception as e:
        print(f"Error reading file: {str(e)}")
        return
    
    # Create a directory for batch responses
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    batch_dir = f"responses/batch_{timestamp}"
    if not os.path.exists(batch_dir):
        os.makedirs(batch_dir)
    
    # Process each question
    responses = []
    for i, question in enumerate(questions):
        input_text = question["input"]
        context = question.get("context", "")
        
        print(f"\nProcessing question {i+1}/{len(questions)}: '{input_text}'")
        
        # Call Claude API
        response = chat_with_claude(input_text, context)
        
        # Format full prompt
        full_prompt = f"{context}\n\n{input_text}" if context else input_text
        
        # Save individual response
        filename = f"{batch_dir}/question_{i+1}.txt"
        with open(filename, "w") as f:
            f.write(f"PROMPT:\n{full_prompt}\n\n")
            f.write(f"RESPONSE:\n{response}\n")
        
        # Add to responses list
        responses.append({
            "question": input_text,
            "context": context,
            "response": response
        })
        
        print(f"Response saved to: {filename}")
    
    # Save all responses to a JSON file
    all_responses_file = f"{batch_dir}/all_responses.json"
    with open(all_responses_file, "w") as f:
        json.dump(responses, f, indent=2)
    
    print(f"\nAll responses saved to: {all_responses_file}")
    print(f"Batch processing complete. Results are in: {batch_dir}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python batch_claude.py questions.txt")
        print("   or: python batch_claude.py questions.json")
        print("\nFile format:")
        print("  - Text file: One question per line")
        print("  - JSON file: Array of objects with 'input' and optional 'context' fields")
        return
    
    questions_file = sys.argv[1]
    process_questions_file(questions_file)

if __name__ == "__main__":
    main() 