# PydanticAI

PydanticAI is a Python agent framework designed to make it easy to build production grade applications with Generative AI.

PydanticAI is a reaction to overly abstract frameworks such as LangChain that have long learning curves to manage the abstractions.

## Key Benefits

1. **Simplicity** - designed to be easy to learn and easy to use with few abstractions

2. **Model Agnostic** - you can use any LLM including local DeepSeek running on Ollama

## Code Sample

```py
from pydantic_ai import Agent

agent = Agent(  
    'google-gla:gemini-1.5-flash',
    system_prompt='Be concise, reply with one sentence.',  
)

result = agent.run_sync('Where does "hello world" come from?')  
print(result.data)
"""
The first known use of "hello, world" was in a 1974 textbook about the C programming language.
"""
```

## References

* [PydanticAI Web Site](https://ai.pydantic.dev/)