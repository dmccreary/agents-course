# Testing SmolAgents with Ollama

```python
# minimal-smolagents-ollama.py
import smolagents
from smolagents import FinalAnswerTool
import requests
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class SimplerOllamaModel:
    """Simplified Ollama model adapter for smolagents"""
    
    def __init__(self, model_name, base_url="http://localhost:11434"):
        self.model_name = model_name
        self.base_url = base_url
        self.generate_endpoint = f"{base_url}/api/generate"
        logger.info(f"Initialized SimplerOllamaModel with model: {model_name}")
    
    def __call__(self, prompt, **kwargs):
        """Handle both direct prompts and formatted messages"""
        # Process the prompt to handle different formats
        processed_prompt = self._process_prompt(prompt)
        
        # Prepare the request payload
        payload = {
            "model": self.model_name,
            "prompt": processed_prompt,
            "stream": False
        }
        
        # Send request to Ollama
        try:
            logger.info(f"Sending request to Ollama, prompt length: {len(processed_prompt)} chars")
            response = requests.post(self.generate_endpoint, json=payload)
            
            if response.status_code == 200:
                result = response.json()
                return result.get("response", "")
            else:
                logger.error(f"Ollama request failed: {response.status_code}")
                return f"Error: Ollama request failed with status {response.status_code}"
        except Exception as e:
            logger.error(f"Error: {e}")
            return f"Error: {str(e)}"
    
    def _process_prompt(self, prompt):
        """Convert various prompt formats to a string"""
        if prompt is None:
            return ""
        
        if isinstance(prompt, str):
            return prompt
        
        if isinstance(prompt, list):
            # If it's a list of messages (dicts with role and content)
            if len(prompt) > 0 and isinstance(prompt[0], dict):
                result = ""
                for msg in prompt:
                    if isinstance(msg, dict) and "content" in msg:
                        role = msg.get("role", "")
                        content = msg.get("content", "")
                        if role and content:
                            result += f"{role.upper()}: {content}\n\n"
                        else:
                            result += f"{content}\n\n"
                return result.strip()
            
            # If it's a list of strings
            return "\n".join([str(item) for item in prompt if item])
        
        # Default case - convert to string
        return str(prompt)

def use_direct_ollama():
    """Use Ollama directly without smolagents"""
    try:
        # Create model
        model = SimplerOllamaModel("deepseek-r1")
        
        # Test with simple prompt
        result = model("What is 2 + 2? Explain step by step.")
        logger.info(f"Direct Ollama result: {result[:200]}...")
        
        # Test with ChatML format
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "What is the sum of numbers from 1 to 5?"}
        ]
        
        result2 = model(messages)
        logger.info(f"Messages format result: {result2[:200]}...")
        
        return True
    except Exception as e:
        logger.error(f"Direct Ollama test failed: {e}")
        return False

def create_custom_agent():
    """Create a custom agent that uses Ollama without relying on smolagents classes"""
    try:
        # Create our Ollama model
        model = SimplerOllamaModel("deepseek-r1")
        
        # Define a simple agent function
        def simple_agent(prompt):
            # Format the prompt to encourage step-by-step thinking
            enhanced_prompt = f"""
Please solve this problem step by step:

{prompt}

Think through this problem carefully. First, understand what is being asked.
Then break it down into steps and solve each step.
Finally, provide your answer.
"""
            # Get response from model
            response = model(enhanced_prompt)
            
            # Return the result
            return response
        
        # Test the simple agent
        task = "Calculate the sum of numbers from 1 to 5."
        logger.info(f"Running simple agent with task: {task}")
        
        result = simple_agent(task)
        logger.info(f"Simple agent result: {result[:200]}...")
        
        # Test with complex task
        complex_task = """
I need to solve this problem:
1. Calculate the area of a rectangle with width 6 meters and length 9 meters
2. Then calculate what percentage of that area would be covered by a square with side length 4 meters
"""
        logger.info(f"Running simple agent with complex task")
        complex_result = simple_agent(complex_task)
        logger.info(f"Complex task result: {complex_result[:200]}...")
        
        return True
    except Exception as e:
        logger.error(f"Custom agent test failed: {e}")
        return False

def main():
    logger.info("Starting Ollama integration test...")
    
    # First, test direct Ollama usage
    if use_direct_ollama():
        logger.info("Direct Ollama test successful!")
        
        # Then, test our custom agent
        if create_custom_agent():
            logger.info("Custom agent test successful!")
        else:
            logger.warning("Custom agent test failed.")
    else:
        logger.error("Direct Ollama test failed. Cannot proceed.")
    
    logger.info("All tests completed.")

if __name__ == "__main__":
    main()
```