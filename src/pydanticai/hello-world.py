from pydantic_ai import Agent

# Create an agent using the local DeepSeek-R1 model from Ollama
agent = Agent(
    'ollama:deepseek-r1',  # Use the Ollama model name format
    system_prompt='Be concise, reply with one sentence.',
    model_kwargs={
        # Additional parameters for the Ollama API
        'base_url': 'http://localhost:11434',  # Default Ollama API URL
        'temperature': 0.7,
    }
)

# Run a simple query
result = agent.run_sync('Where does "hello world" come from?')
print(result.data)
"""
Expected output similar to:
The first known use of "hello, world" was in a 1974 textbook about the C programming language.
"""

# You can also try a more complex query
code_query = agent.run_sync('Write a Python function to calculate the Fibonacci sequence')
print("\nCode generation example:")
print(code_query.data)