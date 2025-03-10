#!/usr/bin/env python3
# A test script to check if Ollama is installed and callable from Python,
# specifically testing the deepseek-r1 model.

import subprocess
import sys
import json
import requests
from typing import Dict, Any, Optional, List, Tuple

def check_ollama_installed() -> bool:
    """
    Check if Ollama is installed on the system.
    
    Returns:
        bool: True if Ollama is installed, False otherwise.
    """
    try:
        result = subprocess.run(
            ["which", "ollama"], 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE, 
            text=True
        )
        return result.returncode == 0
    except Exception as e:
        print(f"Error checking Ollama installation: {e}")
        return False

def get_ollama_models() -> List[Dict[str, str]]:
    """
    Get a list of available Ollama models.
    
    Returns:
        List[Dict[str, str]]: List of models with their details
    """
    try:
        result = subprocess.run(
            ["ollama", "list"], 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE, 
            text=True
        )
        
        if result.returncode != 0:
            print(f"Error listing models: {result.stderr}")
            return []
        
        # Parse the output to extract model information
        lines = result.stdout.strip().split('\n')
        if len(lines) <= 1:
            return []
            
        # Skip header line
        models = []
        for line in lines[1:]:
            parts = line.split()
            if len(parts) >= 4:
                model = {
                    "name": parts[0],
                    "id": parts[1],
                    "size": " ".join(parts[2:4])
                }
                models.append(model)
                
        return models
    except Exception as e:
        print(f"Error getting Ollama models: {e}")
        return []

def test_ollama_api(model_name: str) -> Tuple[bool, Optional[str]]:
    """
    Test the Ollama API with a simple prompt using the specified model.
    
    Args:
        model_name (str): The name of the model to test
        
    Returns:
        Tuple[bool, Optional[str]]: (Success status, Response or error message)
    """
    try:
        url = "http://localhost:11434/api/generate"
        data = {
            "model": model_name,
            "prompt": "Say hello in exactly one sentence.",
            "stream": False
        }
        
        response = requests.post(url, json=data)
        
        if response.status_code == 200:
            return True, response.json().get("response", "")
        else:
            return False, f"API error: {response.status_code} - {response.text}"
            
    except requests.exceptions.ConnectionError:
        return False, "Failed to connect to Ollama API. Is the Ollama service running?"
    except Exception as e:
        return False, f"Error testing Ollama API: {e}"

def main():
    print("Checking Ollama installation and functionality...")
    
    # Step 1: Check if Ollama is installed
    if check_ollama_installed():
        print("✅ Ollama is installed")
    else:
        print("❌ Ollama is not installed or not in PATH")
        print("Please install Ollama from: https://ollama.ai/download")
        sys.exit(1)
    
    # Step 2: Check available models
    models = get_ollama_models()
    if models:
        print(f"✅ Found {len(models)} models installed")
        for model in models:
            print(f"  - {model['name']} ({model['size']})")
    else:
        print("❌ No models found or couldn't retrieve model list")
    
    # Step 3: Check specifically for deepseek-r1
    deepseek_models = [model for model in models if "deepseek-r1" in model["name"]]
    if deepseek_models:
        print("✅ deepseek-r1 model found")
        for model in deepseek_models:
            print(f"  - {model['name']} ({model['size']})")
    else:
        print("❌ deepseek-r1 model not found")
        print("You can install it with: ollama pull deepseek-r1")
    
    # Step 4: Test API with deepseek-r1
    print("\nTesting Ollama API with deepseek-r1 model...")
    success, response = test_ollama_api("deepseek-r1")
    
    if success:
        print("✅ Successfully called Ollama API")
        print(f"Response: {response}")
    else:
        print(f"❌ Failed to call Ollama API: {response}")
    
    print("\nOllama test complete!")

if __name__ == "__main__":
    main()
