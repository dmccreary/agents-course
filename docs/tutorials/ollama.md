# Ollama: A Step-by-Step Tutorial

# Setting Up and Using Ollama: A Comprehensive Guide

I'll walk you through a complete tutorial on setting up and using Ollama for local LLM deployment, including installation, model management, command-line usage, and Python integration.

## 1. Installing Ollama

### For macOS
1. Download the official installer from [ollama.ai](https://ollama.ai)
2. Open the downloaded file and follow the installation prompts
3. Once installed, Ollama will run as a background service

### For Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### For Windows

1. Download the installer from [ollama.ai](https://ollama.ai)
2. Run the installer and follow the prompts
3. Ollama will be available as a background service after installation

## 2. Downloading and Managing Models

Once Ollama is installed, you can download models using the `pull` command.

### Basic Model Download

```bash
# Pull the DeepSeek R1 model
ollama pull deepseek-r1:7b
```

### List Available Models

```bash
ollama list
```

Output will look similar to:

```
NAME                    ID             SIZE    MODIFIED
deepseek-r1:latest      0a8c26691023   4.7 GB  3 weeks ago
deepseek-r1:7b          0a8c26691023   4.7 GB  3 weeks ago
```

### Remove a Model

```bash
ollama rm deepseek-r1:7b
```

### Additional Popular Models

```bash
# Pull other useful models
ollama pull llama3:8b
ollama pull mistral:7b
ollama pull gemma:7b
```

## 3. Using Ollama via Command Line

### Basic Generation

```bash
ollama run deepseek-r1:7b "What is a knowledge graph?"
```

### Interactive Chat Session
```bash
ollama run deepseek-r1:7b
```
This opens an interactive chat session where you can type prompts and get responses. Use Ctrl+D to exit.

### Advanced Parameters
```bash
# Run with specific parameters
ollama run deepseek-r1:7b --temperature 0.7 --top_p 0.9
```

### Creating Custom Model Versions with Modelfiles
Create a file named `Modelfile`:
```
FROM deepseek-r1:7b
SYSTEM "You are a helpful AI assistant specialized in Python programming."
PARAMETER temperature 0.7
```

Build your custom model:
```bash
ollama create code-helper -f Modelfile
```

Run your custom model:
```bash
ollama run code-helper "Write a function to calculate Fibonacci numbers"
```

## 4. Using Ollama from Python

### Basic API Usage

```python
import requests
import json

# Define the API endpoint
api_url = "http://localhost:11434/api/generate"

# Configure the request
payload = {
    "model": "deepseek-r1:7b",
    "prompt": "What are the key features of a code agent?",
    "stream": False
}

# Make the API call
response = requests.post(api_url, json=payload)
result = response.json()

# Print the response
print(result['response'])
```

### Streaming Responses

```python
import requests
import json

api_url = "http://localhost:11434/api/generate"

payload = {
    "model": "deepseek-r1:7b",
    "prompt": "Explain knowledge representation in AI agents",
    "stream": True
}

# Stream the response
with requests.post(api_url, json=payload, stream=True) as response:
    for line in response.iter_lines():
        if line:
            json_response = json.loads(line)
            if 'response' in json_response:
                print(json_response['response'], end='', flush=True)
            # Check if this is the final response
            if json_response.get('done', False):
                print()  # Add a newline at the end
```

### Using the Ollama Python Client Library

First, install the official Python client:
```bash
pip install ollama
```

Then, use it in your code:

```python
import ollama

# Simple generation
response = ollama.generate(
    model='deepseek-r1:7b',
    prompt='What is a knowledge graph in the context of AI?'
)
print(response['response'])

# Chat completion with history
messages = [
    {
        'role': 'user',
        'content': 'What are the key components of a multi-agent system?'
    }
]

response = ollama.chat(
    model='deepseek-r1:7b',
    messages=messages
)

# Add the response to the conversation
messages.append({
    'role': 'assistant',
    'content': response['message']['content']
})

# Continue the conversation
messages.append({
    'role': 'user',
    'content': 'How can these components communicate with each other?'
})

response = ollama.chat(
    model='deepseek-r1:7b',
    messages=messages
)

print(response['message']['content'])
```

### Integration with SmolAgents Framework

Based on your documents, here's an example of how to integrate Ollama with the SmolAgents framework:

```python
import smolagents
from smolagents.models import Model
from smolagents import CodeAgent

# Create a model using the local Ollama endpoint
ollama_model = Model(
    name="ollama-deepseek",
    base_url="http://localhost:11434",
    api_type="ollama",
    model_name="deepseek-r1:7b",
    temperature=0.2
)

# Create tools for the agent
def search_documentation(query):
    """
    Search documentation for the given query.
    
    Args:
        query (str): The search query
        
    Returns:
        str: Search results
    """
    # Implementation would go here
    return f"Documentation results for: {query}"

# Create a code agent with the model
agent = CodeAgent(
    model=ollama_model,
    tools=[search_documentation],
    system_prompt="You are a helpful coding assistant that writes Python code."
)

# Use the agent
response = agent.run("Create a function to parse CSV files using the pandas library")
print(response)
```

## 5. Performance Optimization

### GPU Acceleration

Ollama automatically uses GPU if available. To check if GPU is being utilized:

```bash
# For NVIDIA GPUs
nvidia-smi

# For AMD GPUs
rocm-smi
```

### Memory Requirements

As indicated in your course materials, models like DeepSeek R1:7b work best with GPUs that have at least 12GB of VRAM. Here are some compatible GPU models:
- GeForce RTX 4090 (24 GB)
- GeForce RTX 4080 (16 GB)
- GeForce RTX 3090 Ti (24 GB)
- GeForce RTX 3090 (24 GB)
- GeForce RTX 3080 Ti (12 GB)
- GeForce RTX 3080 (12 GB version)

### Model Quantization

Ollama supports different quantization levels to reduce memory requirements:

```bash
# Pull a quantized version
ollama pull deepseek-r1:7b-q4_0

# List to see the size difference
ollama list
```

## 6. Advanced Use Cases

### Creating a Simple Code Agent

```python
import ollama
from typing import Dict, Any, List

def code_agent(prompt: str) -> Dict[str, Any]:
    """
    A simple code agent that leverages Ollama to generate Python code.
    
    Args:
        prompt (str): The coding task description
        
    Returns:
        Dict[str, Any]: Results including code and explanation
    """
    # Enhance the prompt
    enhanced_prompt = f"""
    Write Python code for the following task:
    {prompt}
    
    Provide well-commented code with docstrings and explanations.
    """
    
    # Generate the code
    response = ollama.generate(
        model='deepseek-r1:7b',
        prompt=enhanced_prompt,
        system="You are an expert Python programmer. Generate clean, efficient, and well-documented code."
    )
    
    # Extract and format the code
    code_text = response['response']
    
    return {
        "code": code_text,
        "prompt": prompt,
        "model": "deepseek-r1:7b"
    }

# Example usage
result = code_agent("Create a function to calculate the Fibonacci sequence up to n terms")
print(result["code"])
```

### Building a ReAct Agent with Ollama

```python
import ollama
import json
from typing import Dict, List, Any, Callable

class ReActAgent:
    def __init__(self, model_name: str, tools: Dict[str, Callable]):
        self.model_name = model_name
        self.tools = tools
        self.messages = []
        self.max_iterations = 5
    
    def add_system_message(self, content: str):
        self.messages.append({"role": "system", "content": content})
    
    def add_user_message(self, content: str):
        self.messages.append({"role": "user", "content": content})
    
    def add_assistant_message(self, content: str):
        self.messages.append({"role": "assistant", "content": content})
    
    def run(self, query: str) -> str:
        self.add_user_message(query)
        
        for _ in range(self.max_iterations):
            # Get the next action from the model
            response = ollama.chat(
                model=self.model_name,
                messages=self.messages
            )
            
            response_content = response['message']['content']
            self.add_assistant_message(response_content)
            
            # Check if the response contains a tool call
            if "Action:" in response_content:
                try:
                    # Extract the action and arguments
                    action_line = [line for line in response_content.split('\n') if line.startswith('Action:')][0]
                    action_name = action_line.replace('Action:', '').strip()
                    
                    args_line = [line for line in response_content.split('\n') if line.startswith('Action Input:')][0]
                    args_text = args_line.replace('Action Input:', '').strip()
                    
                    # Execute the tool
                    if action_name in self.tools:
                        tool_result = self.tools[action_name](args_text)
                        self.add_user_message(f"Tool result: {tool_result}")
                    else:
                        self.add_user_message(f"Error: Tool '{action_name}' not found")
                except Exception as e:
                    self.add_user_message(f"Error executing action: {str(e)}")
            else:
                # If no action is requested, return the final answer
                return response_content
        
        return "Max iterations reached without final answer"

# Example tools
def search_web(query: str) -> str:
    return f"Search results for '{query}': [Sample results would appear here]"

def get_current_weather(location: str) -> str:
    return f"Weather in {location}: 72°F, Sunny"

# Create and use the agent
tools = {
    "search_web": search_web,
    "get_weather": get_current_weather
}

agent = ReActAgent(model_name="deepseek-r1:7b", tools=tools)
agent.add_system_message("""
You are a helpful assistant that can use tools to get information.
When you need information, specify the tool to use with:
Action: tool_name
Action Input: input for the tool

When you have the final answer, provide it directly without using a tool.
""")

result = agent.run("What's the weather like in New York?")
print(result)
```

## 7. Troubleshooting Common Issues

### Connection Refused

If you see "Connection refused" errors when trying to use the API:

```bash
# Check if Ollama service is running
ps aux | grep ollama

# Restart the service if needed
ollama serve
```

### High Memory Usage

If you're experiencing memory issues:

1. Use a more quantized model (e.g., q4_0 instead of q8_0)
2. Adjust context window size:

```python
response = ollama.generate(
    model='deepseek-r1:7b',
    prompt='Your prompt here',
    options={"num_ctx": 2048}  # Reduce context window size
)
```

### Slow Response Times

If responses are too slow:

1. Verify GPU is being used correctly
2. Consider a smaller model
3. Check other applications using GPU resources

## Conclusion

Ollama provides a flexible and powerful way to run LLMs locally. With the DeepSeek R1:7b model mentioned in your course materials, you can achieve token generation rates of 50+ tokens per second with suitable hardware, making it viable for development and testing of intelligent software agents. The framework's integration capabilities with Python make it an excellent choice for building code agents, implementing ReAct patterns, and developing other advanced agent systems.