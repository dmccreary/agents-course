## Calling DeepSeek R1 via Ollama

```python
#!/usr/bin/env python3
# working-code-agent.py
import smolagents
from smolagents import FinalAnswerTool, CodeAgent
import requests
import logging

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class OllamaModel:
    """Simple Ollama model that ignores unsupported parameters"""
    
    def __init__(self, model_name, base_url="http://localhost:11434"):
        self.model_name = model_name
        self.base_url = base_url
        self.generate_endpoint = f"{base_url}/api/generate"
        logger.info(f"Initialized OllamaModel with model: {model_name}")
    
    def __call__(self, prompt, **kwargs):
        """Generate response from Ollama model, ignore any kwargs"""
        # Handle various prompt formats
        if isinstance(prompt, list):
            # Convert list to text
            if len(prompt) > 0 and isinstance(prompt[0], dict):
                # Extract from messages format
                full_prompt = "\n".join([msg.get("content", "") for msg in prompt if isinstance(msg, dict) and "content" in msg])
            else:
                # Join list items
                full_prompt = "\n".join([str(item) for item in prompt if item])
        else:
            # Use as is
            full_prompt = str(prompt)
        
        payload = {
            "model": self.model_name,
            "prompt": full_prompt,
            "stream": False
        }
        
        try:
            logger.info(f"Sending request to Ollama with prompt length: {len(full_prompt)} chars")
            response = requests.post(self.generate_endpoint, json=payload)
            
            if response.status_code == 200:
                result = response.json()
                return result.get("response", "")
            else:
                logger.error(f"Ollama request failed: {response.status_code}")
                return "Error: Failed to get response from Ollama"
        except Exception as e:
            logger.error(f"Error: {e}")
            return f"Error: {str(e)}"

def main():
    try:
        # Create the model
        model = OllamaModel("deepseek-r1")
        
        # Test direct model use
        response = model("What is 2 + 2?")
        logger.info(f"Direct model response: {response[:100]}...")
        
        # Create a simple task for the agent
        task = "Calculate the sum of numbers from 1 to 5"
        
        # Create the agent with minimal setup - REMOVED verbose parameter
        agent = CodeAgent(
            model=model,
            tools=[FinalAnswerTool()]
        )
        
        # Run the agent
        logger.info(f"Running agent with task: {task}")
        result = agent.run(task)
        
        logger.info(f"Agent result: {result}")
        
        # If that works, try a more complex task
        complex_task = """
        I need to solve this problem:
        1. Calculate the area of a rectangle with width 6 meters and length 9 meters
        2. Then calculate what percentage of that area would be covered by a square with side length 4 meters
        """
        
        logger.info(f"\nRunning agent with complex task...")
        complex_result = agent.run(complex_task)
        
        logger.info(f"Complex task result: {complex_result}")
        
    except Exception as e:
        logger.error(f"Error: {e}")
        import traceback
        logger.error(traceback.format_exc())

if __name__ == "__main__":
    main()
```