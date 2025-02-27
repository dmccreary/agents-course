# Intalling SmolAgents

## Why SmolAgents

AI agent frameworks are often criticized with two points:

1. They build too many layers of abstraction, making them rigid and challenging to learn and use.
2. They focus on "workflows" rather than building agents that can dynamically collaborate on their own using Python data structures.

Smolagents has qualities that make ideal for simple agentic applications.

- The framework's abstractions are kept at a minimum.
- While most frameworks have the agents define their actions in JSON/text format, smolagents' main approach is ```Code Agents``` in which actions are written as Python code snippets (this is different from agents that write code).
- Being a Hugging Face framework, smolagents integrates well with the Hub and the Transformers library. You can use many models from the hub (some of them you can only use as a Pro user), and you can also work with proprietary models from OpenAI, Anthropic, etc.
-   You can easily utilize the already-provided tools, or define your custom tools with minimum effort, almost as simple as writing a Python function.

These qualities are what, on paper, make smolagents a plug-and-play with AI agents with little effort, so let's see if they hold in practice.

## Installing SmolAgents

Make sure you are in the correct environment.  In this class we used conda to create an environment called "agents"

```sh
conda activate agents
```

Next, use ```pip``` to install the smolagents Python library

```sh
pip install smolagents
pip install 'smolagents[litellm]'
```

The second line also includes the litellm module.

## Testing SmolAgents

### Basic Test
```python
from smolagents import SmoLAgent
print("SmoLAgents installed successfully!")
```

### Test with Version and Dir

We can also use the Python ```dir``` function on the smolagents module
to get a detailed list of the items in the smolagents Python library.

```python
import smolagents

# Print version and available modules
print(f"SmoLAgents version: {smolagents.__version__}")
print(f"Available in smolagents: {dir(smolagents)}")

# Try to create a "TestAgent"
try:
    from smolagents.agents import Agent
    agent = Agent(name="TestAgent")
    print(f"Agent created successfully with name: {agent.name}")
except ImportError as e:
    print(f"Could not import Agent: {e}")

print("SmoLAgents is installed!")
```

```
SmoLAgents version: 1.9.2
Available in smolagents: ['AUTHORIZED_TYPES', 'ActionStep', 'AgentAudio', 'AgentError', 'AgentExecutionError', 'AgentGenerationError', 'AgentImage', 'AgentLogger', 'AgentMaxStepsError', 'AgentMemory', 'AgentParsingError', 'AgentText', 'AgentType', 'Any', 'AzureOpenAIServerModel', 'BASE_BUILTIN_MODULES', 'Callable', 'ChatMessage', 'CodeAgent', 'Dict', 'DuckDuckGoSearchTool', 'E2BExecutor', 'EMPTY_PROMPT_TEMPLATES', 'FinalAnswerPromptTemplate', 'FinalAnswerTool', 'Generator', 'GoogleSearchTool', 'GradioUI', 'Group', 'HfApiModel', 'List', 'LiteLLMModel', 'LocalPythonInterpreter', 'LogLevel', 'MLXModel', 'ManagedAgentPromptTemplate', 'MessageRole', 'Model', 'Monitor', 'MultiStepAgent', 'OpenAIServerModel', 'Optional', 'Panel', 'Path', 'PlanningPromptTemplate', 'PlanningStep', 'PromptTemplates', 'PythonInterpreterTool', 'Rule', 'Set', 'SpeechToTextTool', 'StrictUndefined', 'SystemPromptStep', 'TOOL_MAPPING', 'TaskStep', 'Template', 'Text', 'Tool', 'ToolCall', 'ToolCallingAgent', 'ToolCollection', 'TransformersModel', 'Tuple', 'TypedDict', 'Union', 'UserInputTool', 'VisitWebpageTool', 'YELLOW_HEX', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__path__', '__spec__', '__version__', '_function_type_hints_utils', 'agent_types', 'agents', 'argparse', 'cli', 'create_repo', 'default_tools', 'deque', 'e2b_executor', 'evaluate_python_code', 'fix_final_answer_code', 'getLogger', 'get_clean_message_list', 'get_variable_names', 'gradio_ui', 'handle_agent_output_types', 'importlib', 'inspect', 'jinja2', 'json', 'launch_gradio_demo', 'leopard_prompt', 'load_dotenv', 'load_model', 'load_tool', 'local_python_executor', 'logger', 'main', 'make_init_file', 'memory', 'metadata_update', 'models', 'monitoring', 'os', 'parse_arguments', 'parse_code_blobs', 'parse_json_tool_call', 'populate_template', 're', 'snapshot_download', 'stream_to_gradio', 'tempfile', 'textwrap', 'time', 'tool', 'tool_role_conversions', 'tool_validation', 'tools', 'truncate_content', 'upload_folder', 'utils', 'yaml']

Could not import Agent: cannot import name 'Agent' from 'smolagents.agents' (/home/dan/miniconda3/envs/agents/lib/python3.13/site-packages/smolagents/agents.py)

SmoLAgents is installed!
```

## Creating a Model

We can get a list of the agent types by looking for all method names with the string "Agent" it it.

```python
# test-smolagents-final.py
import smolagents
from smolagents import FinalAnswerTool  # Import directly from smolagents
from smolagents.models import Model

print(f"SmoLAgents version: {smolagents.__version__}")

try:
    # Create a dummy model
    dummy_model = Model(name="dummy-model")
    
    # Create a basic tool
    final_answer_tool = FinalAnswerTool()
    
    print("Successfully created tool and model!")
    
    # Print available agent types
    print("Available agent types:")
    print([name for name in dir(smolagents) if 'Agent' in name])
    
except Exception as e:
    print(f"Error: {e}")
    
print("SmoLAgents installation test complete!")
```

```
SmoLAgents version: 1.9.2
Successfully created tool and model!

Available agent types:
['AgentAudio', 'AgentError', 'AgentExecutionError', 'AgentGenerationError', 'AgentImage', 'AgentLogger', 'AgentMaxStepsError', 'AgentMemory', 'AgentParsingError', 'AgentText', 'AgentType', 'CodeAgent', 'ManagedAgentPromptTemplate', 'MultiStepAgent', 'ToolCallingAgent']

SmoLAgents installation test complete!
```

## References

[Build Fast with AI Video](https://www.youtube.com/watch?v=zlSENn-IunU&t=7s)