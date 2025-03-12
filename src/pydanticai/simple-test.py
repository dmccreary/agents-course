from pydantic_ai import Agent

agent = Agent('ollama:deepseek-r1', base_url='http://localhost:11434')
result = agent.run_sync('Hello!')
print(result.data)