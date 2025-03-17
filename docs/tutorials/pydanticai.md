# PydanticAI Agent System Tutorial: A Comprehensive Guide

## Introduction

PydanticAI is a Python agent framework designed for building production-grade applications with Generative AI. It offers a streamlined approach compared to more abstract frameworks like LangChain, making it easier to develop, deploy, and maintain agent-based systems.

This tutorial will guide you through setting up PydanticAI, creating basic agents, implementing more complex agent systems, and providing best practices for debugging and monitoring.

## Table of Contents

1. [Installation](#1-installation)
2. [Basic Concepts](#2-basic-concepts)
3. [Creating Your First Agent](#3-creating-your-first-agent)
4. [Tool Creation and Integration](#4-tool-creation-and-integration)
5. [Advanced Agent Patterns](#5-advanced-agent-patterns)
6. [Debugging Strategies](#6-debugging-strategies)
7. [Performance Optimization](#7-performance-optimization)
8. [Real-World Example](#8-real-world-example-building-a-code-agent)
9. [Troubleshooting Common Issues](#9-troubleshooting-common-issues)

## 1. Installation

There are two options to setup virtual environments: Conda and VENV.
Unless you know you are going to ONLY use Python, we suggest you use Conda since
it can also be used to manage non-Python languages.

### Conda Setup

```sh
conda deactivate
conda create -n "agents" python=3.10
conda activate 
```

### Python VENV

Alternatively you can install PydanticAI and its dependencies in a Python VENV

```bash
# Create a virtual environment (recommended)
python -m venv pydantic_env
source pydantic_env/bin/activate  # On Windows: pydantic_env\Scripts\activate
```

### Pip

```sh
pip install pydantic-ai pydantic
```

You can also install various LLM model tools

```sh
pip install ollama openai
```

### Sample Test Code

```py
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
```

For local development with Ollama, you'll need to have Ollama installed and a compatible model like DeepSeek R1:

```bash
# Download and install Ollama from https://ollama.ai/
# Then pull the DeepSeek R1 model
ollama pull deepseek-r1:7b
```

Verify your installation:

```python
import pydantic_ai
print(f"PydanticAI version: {pydantic_ai.__version__}")
```

## 2. Basic Concepts

Before diving into code, let's understand key PydanticAI concepts:

- **Agents**: Autonomous entities that use LLMs to make decisions and perform actions
- **Tools**: Functions that agents can call to interact with external systems
- **Pydantic Models**: Used to define structured inputs and outputs for tools
- **Prompts**: Templates that guide the LLM's behavior within the agent

PydanticAI uses Pydantic's data validation to ensure type safety and proper documentation of tools, making it easier for LLMs to understand and use them correctly.

## 3. Creating Your First Agent

Let's create a simple agent that can respond to user queries:

```python
from pydantic_ai import Agent
from pydantic import BaseModel
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger("pydantic_agent")

# Define our agent
class SimpleAgent(Agent):
    """A simple agent that can respond to user queries."""
    
    def get_system_prompt(self):
        return """You are a helpful assistant that provides information about AI and programming.
                 Answer questions concisely and accurately."""

# Initialize the agent
agent = SimpleAgent(
    model="openai/gpt-3.5-turbo",  # For OpenAI
    # Alternatively for local Ollama model:
    # model="ollama/deepseek-r1:7b",
)

# Run the agent
response = agent.run("What is an intelligent software agent?")
print(response)
```

## 4. Tool Creation and Integration

Tools extend an agent's capabilities. Let's create some tools and integrate them:

```python
from pydantic_ai import Agent, tool
from pydantic import BaseModel
from typing import List, Optional
import datetime

# Define input/output models for our tools
class WeatherRequest(BaseModel):
    location: str
    date: Optional[datetime.date] = None

class WeatherResponse(BaseModel):
    temperature: float
    conditions: str
    humidity: Optional[float] = None

class SearchRequest(BaseModel):
    query: str
    max_results: int = 5

class SearchResult(BaseModel):
    title: str
    url: str
    snippet: str

class SearchResponse(BaseModel):
    results: List[SearchResult]
    total_found: int

# Create tool functions
@tool
def get_weather(request: WeatherRequest) -> WeatherResponse:
    """
    Get current weather information for a specific location.
    
    Args:
        request: Contains the location and optional date for weather information
        
    Returns:
        Weather data including temperature and conditions
    """
    # In a real implementation, you would call a weather API here
    logger.info(f"Getting weather for {request.location}")
    return WeatherResponse(
        temperature=72.5,
        conditions="Sunny",
        humidity=45.0
    )

@tool
def search_information(request: SearchRequest) -> SearchResponse:
    """
    Search for information on a specific topic.
    
    Args:
        request: Contains the search query and maximum number of results to return
        
    Returns:
        A list of search results with titles, URLs, and snippets
    """
    # In a real implementation, you would call a search API
    logger.info(f"Searching for: {request.query} (max: {request.max_results})")
    return SearchResponse(
        results=[
            SearchResult(
                title="Example search result",
                url="https://example.com/result1",
                snippet="This is an example search result snippet"
            )
        ],
        total_found=1
    )

# Create an agent with tools
class AssistantAgent(Agent):
    """An assistant agent with access to tools."""
    
    def get_system_prompt(self):
        return """You are a helpful assistant with access to tools.
                 Use the appropriate tool when needed to answer questions accurately."""
    
    # Register tools with the agent
    tools = [get_weather, search_information]

# Initialize and use the agent
assistant = AssistantAgent(model="openai/gpt-3.5-turbo")
response = assistant.run("What's the weather like in New York?")
print(response)
```

## 5. Advanced Agent Patterns

Now let's implement more advanced patterns like memory and multi-step reasoning:

```python
from pydantic_ai import Agent, tool, AgentExecutor
from pydantic import BaseModel
from typing import List, Dict, Any
import logging

# Enhanced logging for debugging
logger = logging.getLogger("advanced_agent")
handler = logging.FileHandler("agent_debug.log")
handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

# Memory model
class ConversationMemory(BaseModel):
    history: List[Dict[str, str]] = []
    
    def add_interaction(self, user_message: str, agent_response: str):
        self.history.append({
            "user": user_message,
            "agent": agent_response
        })
        logger.debug(f"Added to memory: User: {user_message[:50]}... Agent: {agent_response[:50]}...")
    
    def get_recent_history(self, limit: int = 5) -> List[Dict[str, str]]:
        return self.history[-limit:] if self.history else []

# ReAct pattern implementation
class ReActAgent(Agent):
    """An agent that uses the ReAct framework to interleave reasoning and action."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.memory = ConversationMemory()
    
    def get_system_prompt(self):
        recent_history = self.memory.get_recent_history()
        history_text = "\n".join([
            f"User: {interaction['user']}\nAgent: {interaction['agent']}"
            for interaction in recent_history
        ])
        
        return f"""You are an assistant that carefully thinks through problems step by step.
                 When faced with a complex task, break it down into smaller steps and solve each one.
                 
                 Recent conversation history:
                 {history_text}
                 
                 Follow this format when using tools:
                 Thought: I need to figure out what to do
                 Action: Choose which tool to use
                 Observation: Note the result
                 ... (repeat as needed)
                 Answer: Provide the final answer to the user
                 """
    
    # Register tools and track execution
    def run(self, user_input: str) -> str:
        logger.info(f"Processing user input: {user_input}")
        
        try:
            # Execute the agent with detailed logging
            response = super().run(user_input)
            
            # Store interaction in memory
            self.memory.add_interaction(user_input, response)
            
            return response
        except Exception as e:
            logger.error(f"Error in agent execution: {str(e)}", exc_info=True)
            return f"I encountered an error: {str(e)}"

# Define tools for our ReAct agent
@tool
def calculate(expression: str) -> float:
    """
    Calculate the result of a mathematical expression.
    
    Args:
        expression: A string containing a mathematical expression
        
    Returns:
        The calculated result
    """
    logger.debug(f"Calculating: {expression}")
    try:
        # Warning: eval can be dangerous in production, use a safer alternative
        result = eval(expression)
        logger.debug(f"Calculation result: {result}")
        return result
    except Exception as e:
        logger.error(f"Calculation error: {str(e)}")
        raise ValueError(f"Error calculating expression: {str(e)}")

# Initialize and use the ReAct agent
react_agent = ReActAgent(
    model="ollama/deepseek-r1:7b",
    temperature=0.2,  # Lower temperature for more deterministic responses
    max_tokens=1000
)

# Example multi-step reasoning task
response = react_agent.run(
    "If I have 5 apples and give 2 to my friend, then buy 3 more, how many do I have in total?"
)
print(response)
```

## 6. Debugging Strategies

Effective debugging is crucial for agent development. Here's a comprehensive approach:

```python
from pydantic_ai import Agent, tool
from pydantic import BaseModel
import logging
import json
import time
from typing import Any, Dict, List, Optional

# Create a custom logger for agent debugging
class AgentDebugLogger:
    def __init__(self, log_file="agent_debug.log", console_level=logging.INFO, file_level=logging.DEBUG):
        self.logger = logging.getLogger("agent_debugger")
        self.logger.setLevel(logging.DEBUG)
        
        # Clear existing handlers to avoid duplication
        self.logger.handlers = []
        
        # Console handler
        console = logging.StreamHandler()
        console.setLevel(console_level)
        console.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))
        self.logger.addHandler(console)
        
        # File handler for detailed logs
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(file_level)
        file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
        self.logger.addHandler(file_handler)
    
    def log_tool_call(self, tool_name: str, inputs: Dict[str, Any], outputs: Any, duration: float):
        """Log details of a tool call"""
        self.logger.debug(f"TOOL CALL: {tool_name}")
        self.logger.debug(f"INPUTS: {json.dumps(inputs, default=str)}")
        self.logger.debug(f"OUTPUTS: {json.dumps(outputs, default=str)}")
        self.logger.debug(f"DURATION: {duration:.4f}s")
    
    def log_llm_call(self, prompt: str, response: str, duration: float):
        """Log details of an LLM call"""
        self.logger.debug("LLM CALL:")
        self.logger.debug(f"PROMPT: {prompt[:200]}... (truncated)")
        self.logger.debug(f"RESPONSE: {response[:200]}... (truncated)")
        self.logger.debug(f"DURATION: {duration:.4f}s")
        
        # Save full prompt and response to files for detailed analysis
        timestamp = int(time.time())
        with open(f"debug_prompt_{timestamp}.txt", "w") as f:
            f.write(prompt)
        with open(f"debug_response_{timestamp}.txt", "w") as f:
            f.write(response)
    
    def log_error(self, error_type: str, message: str, details: Optional[Dict] = None):
        """Log error information"""
        self.logger.error(f"ERROR - {error_type}: {message}")
        if details:
            self.logger.error(f"DETAILS: {json.dumps(details, default=str)}")

# Create a debuggable agent wrapper
class DebuggableAgent(Agent):
    """A wrapper for agents that adds detailed debugging capabilities"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.debug_logger = AgentDebugLogger()
        self.execution_stats = {
            "tool_calls": 0,
            "llm_calls": 0,
            "errors": 0,
            "total_duration": 0
        }
    
    # Override the run method to add debugging
    def run(self, user_input: str) -> str:
        self.debug_logger.logger.info(f"AGENT RUN: Processing user input: {user_input}")
        start_time = time.time()
        
        try:
            # Capture the original tool calling mechanism
            original_tool_call = self._call_tool
            
            # Define a wrapper to log tool calls
            def logged_tool_call(tool_name, **kwargs):
                self.execution_stats["tool_calls"] += 1
                tool_start = time.time()
                
                try:
                    result = original_tool_call(tool_name, **kwargs)
                    tool_duration = time.time() - tool_start
                    self.debug_logger.log_tool_call(tool_name, kwargs, result, tool_duration)
                    return result
                except Exception as e:
                    self.execution_stats["errors"] += 1
                    self.debug_logger.log_error("Tool Error", f"Error in {tool_name}: {str(e)}", kwargs)
                    raise
            
            # Replace the tool call method with our logged version
            self._call_tool = logged_tool_call
            
            # Run the agent
            response = super().run(user_input)
            
            # Restore original method
            self._call_tool = original_tool_call
            
            # Update statistics
            self.execution_stats["total_duration"] = time.time() - start_time
            
            # Log completion
            self.debug_logger.logger.info(
                f"AGENT COMPLETE: Duration={self.execution_stats['total_duration']:.2f}s, "
                f"Tool calls={self.execution_stats['tool_calls']}, "
                f"Errors={self.execution_stats['errors']}"
            )
            
            return response
            
        except Exception as e:
            self.execution_stats["errors"] += 1
            self.debug_logger.log_error("Agent Error", str(e))
            return f"I encountered an error: {str(e)}"

# Example usage of the debuggable agent
debuggable_agent = DebuggableAgent(
    model="ollama/deepseek-r1:7b",
    temperature=0.2
)

# Add tools to the agent
@tool
def fetch_data(url: str) -> Dict[str, Any]:
    """Fetch data from a URL"""
    # Simulation of fetching data
    if "error" in url:
        raise ValueError("Failed to fetch data: connection error")
    return {"status": "success", "data": {"sample": "value"}}

debuggable_agent.tools = [fetch_data]

# Test the debuggable agent
response = debuggable_agent.run("Can you fetch data from https://example.com/api/data?")
print(f"Agent response: {response}")

# Intentionally trigger an error for demonstration
error_response = debuggable_agent.run("Can you fetch data from https://error.example.com?")
print(f"Error response: {error_response}")

# Print execution stats
print(f"Execution stats: {json.dumps(debuggable_agent.execution_stats, indent=2)}")
```

## 7. Performance Optimization

When working with local models like DeepSeek R1 through Ollama, performance optimization becomes crucial:

```python
from pydantic_ai import Agent, tool
import time
import psutil
import logging
import json
from typing import Dict, Any

# Set up performance monitoring logger
performance_logger = logging.getLogger("agent_performance")
performance_logger.setLevel(logging.INFO)
file_handler = logging.FileHandler("performance_metrics.log")
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(message)s'))
performance_logger.addHandler(file_handler)

class PerformanceMonitor:
    """Monitor and optimize agent performance"""
    
    def __init__(self):
        self.metrics = {
            "start_time": None,
            "end_time": None,
            "cpu_percent": [],
            "memory_percent": [],
            "response_times": []
        }
    
    def start_monitoring(self):
        """Start monitoring system resources"""
        self.metrics["start_time"] = time.time()
        self._monitor_resources_thread = self._start_resource_monitoring()
    
    def _start_resource_monitoring(self):
        """Start a thread to monitor CPU and memory usage"""
        import threading
        
        def monitor():
            while time.time() - self.metrics["start_time"] < 120:  # Monitor for 2 minutes max
                self.metrics["cpu_percent"].append(psutil.cpu_percent())
                self.metrics["memory_percent"].append(psutil.virtual_memory().percent)
                time.sleep(0.5)
        
        thread = threading.Thread(target=monitor)
        thread.daemon = True
        thread.start()
        return thread
    
    def record_response_time(self, duration: float):
        """Record an individual response time"""
        self.metrics["response_times"].append(duration)
    
    def stop_monitoring(self):
        """Stop monitoring and save metrics"""
        self.metrics["end_time"] = time.time()
        total_duration = self.metrics["end_time"] - self.metrics["start_time"]
        
        # Summarize the metrics
        summary = {
            "total_duration": total_duration,
            "avg_response_time": sum(self.metrics["response_times"]) / len(self.metrics["response_times"]) if self.metrics["response_times"] else 0,
            "max_response_time": max(self.metrics["response_times"]) if self.metrics["response_times"] else 0,
            "avg_cpu_percent": sum(self.metrics["cpu_percent"]) / len(self.metrics["cpu_percent"]) if self.metrics["cpu_percent"] else 0,
            "max_cpu_percent": max(self.metrics["cpu_percent"]) if self.metrics["cpu_percent"] else 0,
            "avg_memory_percent": sum(self.metrics["memory_percent"]) / len(self.metrics["memory_percent"]) if self.metrics["memory_percent"] else 0,
            "request_count": len(self.metrics["response_times"])
        }
        
        # Log the summary
        performance_logger.info(f"Performance Summary: {json.dumps(summary, indent=2)}")
        return summary

class OptimizedAgent(Agent):
    """An agent optimized for performance with local LLMs"""
    
    def __init__(self, *args, **kwargs):
        # Set optimal parameters for local LLM usage
        kwargs.setdefault("temperature", 0.2)  # Lower temperature for faster, more consistent responses
        kwargs.setdefault("max_tokens", 500)   # Limit token generation for speed
        
        super().__init__(*args, **kwargs)
        self.performance_monitor = PerformanceMonitor()
        self.performance_monitor.start_monitoring()
    
    def get_system_prompt(self):
        # Optimized prompt - shorter prompts process faster
        return """You are a helpful, efficient assistant. Keep responses concise and focused.
               Answer questions directly or use tools when appropriate."""
    
    def run(self, user_input: str) -> str:
        start_time = time.time()
        
        try:
            response = super().run(user_input)
            duration = time.time() - start_time
            self.performance_monitor.record_response_time(duration)
            
            # Log performance for this request
            performance_logger.info(f"Request processed in {duration:.2f}s")
            
            return response
        except Exception as e:
            duration = time.time() - start_time
            self.performance_monitor.record_response_time(duration)
            performance_logger.error(f"Error processing request: {str(e)}, duration: {duration:.2f}s")
            return f"Error: {str(e)}"
    
    def finalize(self):
        """Clean up and display final performance metrics"""
        summary = self.performance_monitor.stop_monitoring()
        print(f"Agent Performance Summary:")
        print(f"  Total duration: {summary['total_duration']:.2f}s")
        print(f"  Average response time: {summary['avg_response_time']:.2f}s")
        print(f"  Requests processed: {summary['request_count']}")
        print(f"  Avg CPU usage: {summary['avg_cpu_percent']:.1f}%")
        print(f"  Avg memory usage: {summary['avg_memory_percent']:.1f}%")

# Example usage with DeepSeek through Ollama
optimized_agent = OptimizedAgent(
    model="ollama/deepseek-r1:7b",
    # Additional optimization parameters for Ollama
    model_kwargs={
        "num_ctx": 2048,      # Smaller context window for faster processing
        "repeat_penalty": 1.1  # Slight penalty to reduce token repetition
    }
)

# Run a series of queries to test performance
test_queries = [
    "What is the capital of France?",
    "Explain how a binary search algorithm works",
    "What are the main features of Python?",
    "Define what an intelligent software agent is",
    "What's the difference between supervised and unsupervised learning?"
]

for query in test_queries:
    print(f"\nQuery: {query}")
    response = optimized_agent.run(query)
    print(f"Response: {response[:100]}...")  # Truncated for brevity

# Get final performance metrics
optimized_agent.finalize()
```

## 8. Real-World Example: Building a Code Agent

Now let's build a more complex, practical agent for a real-world use case - a code assistant agent using PydanticAI that can help with Python programming tasks:

```python
from pydantic_ai import Agent, tool
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import logging
import os
import json
import subprocess
import time

# Advanced logging configuration
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("code_agent.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("code_agent")

# Tool input/output models
class CodeGenerationRequest(BaseModel):
    """Request for generating code based on a description"""
    description: str = Field(..., description="Description of what the code should do")
    language: str = Field("python", description="Programming language to use")
    libraries: List[str] = Field(default_factory=list, description="List of libraries to use")

class CodeGenerationResponse(BaseModel):
    """Response containing the generated code"""
    code: str = Field(..., description="The generated code")
    explanation: str = Field(..., description="Explanation of how the code works")

class CodeExecutionRequest(BaseModel):
    """Request for executing code"""
    code: str = Field(..., description="Code to execute")
    input_data: Optional[Dict[str, Any]] = Field(None, description="Input data for code execution")

class CodeExecutionResponse(BaseModel):
    """Response from code execution"""
    output: str = Field(..., description="Output from code execution")
    success: bool = Field(..., description="Whether execution was successful")
    error: Optional[str] = Field(None, description="Error message if execution failed")
    execution_time: float = Field(..., description="Time taken to execute the code in seconds")

class CodeReviewRequest(BaseModel):
    """Request for reviewing code"""
    code: str = Field(..., description="Code to review")
    focus_areas: Optional[List[str]] = Field(None, description="Areas to focus on in the review")

class CodeReviewResponse(BaseModel):
    """Response from code review"""
    feedback: List[str] = Field(..., description="List of feedback points")
    suggestions: List[str] = Field(..., description="List of suggestions for improvement")
    overall_rating: int = Field(..., description="Rating from 1-10")

# Define tools for our code agent
@tool
def generate_code(request: CodeGenerationRequest) -> CodeGenerationResponse:
    """
    Generate code based on a description.
    
    Args:
        request: Contains the description of what the code should do, language, and libraries
        
    Returns:
        Generated code and explanation
    """
    logger.info(f"Generating {request.language} code for: {request.description}")
    
    start_time = time.time()
    
    # In a real implementation, you might use a code-specialized model here
    # This is a simplified example
    code = f"# {request.language} code for: {request.description}\n"
    
    if request.language.lower() == "python":
        # Add imports
        if request.libraries:
            for lib in request.libraries:
                code += f"import {lib}\n"
            code += "\n"
        
        # Add a simple function template
        code += f"def main():\n"
        code += f"    # TODO: Implement {request.description}\n"
        code += f"    pass\n\n"
        code += f"if __name__ == '__main__':\n"
        code += f"    main()\n"
    
    duration = time.time() - start_time
    logger.debug(f"Code generation took {duration:.2f}s")
    
    return CodeGenerationResponse(
        code=code,
        explanation=f"This is a basic template for {request.description}. It includes the necessary imports and a main function structure."
    )

@tool
def execute_code(request: CodeExecutionRequest) -> CodeExecutionResponse:
    """
    Execute Python code in a safe environment and return the output.
    
    Args:
        request: Contains the code to execute and optional input data
        
    Returns:
        Execution output, success status, any error messages, and execution time
    """
    logger.info("Executing code")
    logger.debug(f"Code to execute: {request.code[:100]}...")
    
    # Create a temporary Python file
    temp_file = "temp_execution.py"
    with open(temp_file, "w") as f:
        f.write(request.code)
    
    start_time = time.time()
    
    try:
        # Execute in a controlled environment
        # Note: In production, you should use a proper sandbox
        result = subprocess.run(
            ["python", temp_file],
            capture_output=True,
            text=True,
            timeout=10  # Limit execution time
        )
        
        success = result.returncode == 0
        output = result.stdout if success else result.stderr
        error = None if success else result.stderr
        
    except subprocess.TimeoutExpired:
        success = False
        output = "Execution timed out after 10 seconds"
        error = "Timeout error"
    except Exception as e:
        success = False
        output = f"Error executing code: {str(e)}"
        error = str(e)
    finally:
        # Clean up
        if os.path.exists(temp_file):
            os.remove(temp_file)
    
    execution_time = time.time() - start_time
    logger.info(f"Code execution completed in {execution_time:.2f}s with success={success}")
    
    return CodeExecutionResponse(
        output=output,
        success=success,
        error=error,
        execution_time=execution_time
    )

@tool
def review_code(request: CodeReviewRequest) -> CodeReviewResponse:
    """
    Review code and provide feedback for improvement.
    
    Args:
        request: Contains the code to review and optional focus areas
        
    Returns:
        Feedback, suggestions, and overall rating
    """
    logger.info("Reviewing code")
    
    # In a real implementation, you would analyze the code
    # This is a simplified example
    feedback = ["Code structure is clean", "Good use of comments"]
    suggestions = ["Consider adding error handling", "Add type hints for better readability"]
    rating = 7
    
    focus_areas = request.focus_areas or []
    if "performance" in focus_areas:
        feedback.append("No obvious performance issues detected")
        suggestions.append("Consider using list comprehensions for better performance")
    
    if "security" in focus_areas:
        feedback.append("No obvious security vulnerabilities detected")
        suggestions.append("Validate user inputs to prevent injection attacks")
    
    return CodeReviewResponse(
        feedback=feedback,
        suggestions=suggestions,
        overall_rating=rating
    )

# Create our code assistant agent
class CodeAssistantAgent(Agent):
    """An agent specialized in code generation, execution, and review"""
    
    def get_system_prompt(self):
        return """You are a Python programming assistant with expertise in software development.
                 You can help users by generating code, executing it, and providing code reviews.
                 When helping users with code:
                 1. Understand their requirements clearly
                 2. Generate appropriate code using the generate_code tool
                 3. Test the code using the execute_code tool if needed
                 4. Provide explanations and improvements using the review_code tool
                 
                 Keep your explanations clear and focused on the user's needs.
                 """
    
    # Register tools
    tools = [generate_code, execute_code, review_code]

# Initialize the agent
code_assistant = CodeAssistantAgent(
    model="ollama/deepseek-r1:7b",
    temperature=0.3,
    max_tokens=1000
)

# Example usage
test_requests = [
    "Can you write a Python function to calculate the Fibonacci sequence?",
    "I need a script to read a CSV file and calculate the average of a column",
    "Can you help me understand how decorators work in Python?"
]

for request in test_requests:
    print(f"\n\n===== PROCESSING REQUEST: {request} =====\n")
    response = code_assistant.run(request)
    print(response)
```

## 9. Troubleshooting Common Issues

Here are solutions for common PydanticAI issues:

### Issue 1: Model Integration Problems
```python
# Troubleshooting model connection issues
from pydantic_ai import Agent
import logging

# Enable verbose logging
logging.basicConfig(level=logging.DEBUG)

def test_model_connection(model_name):
    """Test connection to an LLM model"""
    try:
        agent = Agent(model=model_name)
        test_response = agent.run("Hello, are you working correctly?")
        print(f"Response from {model_name}: {test_response}")
        return True
    except Exception as e:
        print(f"Error connecting to {model_name}: {str(e)}")
        return False

# Test different model configurations
models_to_test = [
    "openai/gpt-3.5-turbo",  # OpenAI model
    "ollama/deepseek-r1:7b", # Local Ollama model
    "anthropic/claude-3-sonnet"  # Anthropic model
]

for model in models_to_test:
    print(f"\nTesting connection to {model}...")
    success = test_model_connection(model)
    print(f"Connection test {'succeeded' if success else 'failed'}")

```
```

### Issue 2: Tool Execution Failures

```python
from pydantic_ai import Agent, tool
from pydantic import BaseModel, ValidationError
import logging
import traceback

# Set up detailed logging for tool execution
logging.basicConfig(level=logging.DEBUG)
tool_logger = logging.getLogger("tool_execution")

# Wrapper to debug tool execution issues
def debug_tool_execution(tool_func):
    """Decorator to add debugging to tool execution"""
    def wrapper(*args, **kwargs):
        tool_logger.debug(f"Executing tool: {tool_func.__name__}")
        tool_logger.debug(f"Arguments: {args}")
        tool_logger.debug(f"Keyword arguments: {kwargs}")
        try:
            result = tool_func(*args, **kwargs)
            tool_logger.debug(f"Tool execution successful")
            tool_logger.debug(f"Result: {result}")
            return result
        except ValidationError as ve:
            tool_logger.error(f"Validation error in tool {tool_func.__name__}: {str(ve)}")
            tool_logger.error(f"Validation error details: {ve.errors()}")
            raise
        except Exception as e:
            tool_logger.error(f"Error executing tool {tool_func.__name__}: {str(e)}")
            tool_logger.error(f"Traceback: {traceback.format_exc()}")
            raise
    return wrapper

# Example of using the debug wrapper with a tool
class MathRequest(BaseModel):
    expression: str

@tool
@debug_tool_execution
def calculate(request: MathRequest) -> float:
    """Calculate the result of a mathematical expression"""
    return eval(request.expression)

# Test the tool directly
try:
    result = calculate(MathRequest(expression="2 + 2"))
    print(f"Calculation result: {result}")

    # Intentionally trigger an error
    result = calculate(MathRequest(expression="2 / 0"))
except Exception as e:
    print(f"Caught error: {str(e)}")

```

### Issue 3: LLM Context Management

```
from pydantic_ai import Agent
from typing import List, Dict, Any
import logging
import json

# Set up logging
logging.basicConfig(level=logging.INFO)
context_logger = logging.getLogger("context_management")

class ContextManager:
    """Helper class to manage LLM context size and debug context issues"""

    def __init__(self, max_tokens=4000):
        self.max_tokens = max_tokens
        self.conversation_history: List[Dict[str, Any]] = []
        self.estimated_token_count = 0

    def add_message(self, role: str, content: str):
        """Add a message to the conversation history"""
        # Rough estimation: 1 token ≈ 4 characters
        estimated_tokens = len(content) // 4

        message = {"role": role, "content": content}
        self.conversation_history.append(message)
        self.estimated_token_count += estimated_tokens

        context_logger.info(f"Added {role} message with ~{estimated_tokens} tokens")
        context_logger.info(f"Current estimated token count: {self.estimated_token_count}/{self.max_tokens}")

        # If we're approaching the limit, summarize older messages
        if self.estimated_token_count > self.max_tokens * 0.8:
            context_logger.warning(f"Approaching token limit, summarizing conversation")
            self._summarize_history()

    def _summarize_history(self):
        """Summarize older conversation messages to reduce token count"""
        if len(self.conversation_history) <= 4:
            return  # Keep at least the last few messages

        # Extract messages to summarize (all but the last 4)
        to_summarize = self.conversation_history[:-4]

        # Create a summary message
        summary_content = f"[Summary of {len(to_summarize)} previous messages]"
        summary_message = {"role": "system", "content": summary_content}

        # Replace old messages with summary
        self.conversation_history = [summary_message] + self.conversation_history[-4:]

        # Recalculate token count
        self.estimated_token_count = sum(len(msg["content"]) // 4 for msg in self.conversation_history)
        context_logger.info(f"Summarized conversation history. New token count: {self.estimated_token_count}")

    def get_formatted_history(self) -> str:
        """Get the conversation history formatted for the LLM prompt"""
        formatted = ""
        for msg in self.conversation_history:
            formatted += f"{msg['role'].upper()}: {msg['content']}\n\n"
        return formatted

    def debug_token_usage(self):
        """Print detailed token usage for debugging"""
        context_logger.debug("==== Token Usage Breakdown ====")
        for i, msg in enumerate(self.conversation_history):
            tokens = len(msg["content"]) // 4
            percent = (tokens / self.estimated_token_count) * 100 if self.estimated_token_count > 0 else 0
            context_logger.debug(f"Message {i+1} ({msg['role']}): ~{tokens} tokens ({percent:.1f}%)")
        context_logger.debug(f"Total: ~{self.estimated_token_count} tokens")

# Example usage with an agent
class ContextAwareAgent(Agent):
    """An agent that is aware of context limitations"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.context_manager = ContextManager(max_tokens=4000)

    def get_system_prompt(self):
        # Include conversation history in the prompt
        history = self.context_manager.get_formatted_history()

        return f"""You are a helpful assistant with memory of our conversation.

Previous conversation:
{history}

Respond to the user's latest message.
"""

    def run(self, user_input: str) -> str:
        # Add the user message to history
        self.context_manager.add_message("user", user_input)

        # Run the agent
        response = super().run(user_input)

        # Add the agent response to history
        self.context_manager.add_message("assistant", response)

        # Debug token usage
        self.context_manager.debug_token_usage()

        return response

# Test the context-aware agent
context_agent = ContextAwareAgent(model="ollama/deepseek-r1:7b")

# Simulate a conversation
responses = []
for i in range(5):
    user_message = f"This is test message {i+1}. Tell me something interesting about Python programming."
    print(f"\n>> USER: {user_message}")

    response = context_agent.run(user_message)
    responses.append(response)

    print(f"<< ASSISTANT: {response[:100]}...")

```

Deploying in Production
-----------------------

For production deployment of your PydanticAI agents, consider these best practices:

```
from pydantic_ai import Agent, tool
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
import logging
import time
import uuid
import json
from typing import Dict, Any, List, Optional

# Set up production-ready logging
logging.config.dictConfig({
    'version': 1,
    'formatters': {
        'default': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'INFO',
            'formatter': 'default',
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'level': 'DEBUG',
            'formatter': 'default',
            'filename': 'production.log',
            'maxBytes': 10485760,  # 10MB
            'backupCount': 5,
        }
    },
    'root': {
        'level': 'INFO',
        'handlers': ['console', 'file']
    }
})

logger = logging.getLogger("production_agent")

# Define API models
class AgentRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class AgentResponse(BaseModel):
    response: str
    session_id: str
    request_id: str
    processing_time: float

# Create a production agent with monitoring and error handling
class ProductionAgent(Agent):
    """Production-ready agent with error handling and monitoring"""

    def __init__(self, *args, fallback_response="I'm sorry, I'm having trouble processing that request right now. Please try again in a moment.", **kwargs):
        super().__init__(*args, **kwargs)
        self.fallback_response = fallback_response
        self.sessions: Dict[str, Dict[str, Any]] = {}

    def get_system_prompt(self, session_id=None):
        # Get session-specific prompt if available
        if session_id and session_id in self.sessions:
            return self.sessions[session_id].get("system_prompt", self._default_system_prompt())
        return self._default_system_prompt()

    def _default_system_prompt(self):
        return """You are a helpful, accurate, and professional assistant.
               Provide clear and concise responses to user inquiries."""

    def run_with_monitoring(self, user_input: str, session_id: Optional[str] = None) -> Dict[str, Any]:
        """Run the agent with comprehensive monitoring and error handling"""
        start_time = time.time()
        request_id = str(uuid.uuid4())

        # Create session if it doesn't exist
        if session_id and session_id not in self.sessions:
            self.sessions[session_id] = {"created_at": time.time(), "requests": 0}

        # Update session stats
        if session_id:
            self.sessions[session_id]["requests"] = self.sessions[session_id].get("requests", 0) + 1
            self.sessions[session_id]["last_activity"] = time.time()

        logger.info(f"Processing request {request_id} for session {session_id}")

        try:
            # Run the agent with the session-specific prompt
            original_get_system_prompt = self.get_system_prompt
            self.get_system_prompt = lambda: self.get_system_prompt(session_id)

            response = super().run(user_input)

            # Restore original method
            self.get_system_prompt = original_get_system_prompt

            processing_time = time.time() - start_time
            logger.info(f"Request {request_id} processed in {processing_time:.2f}s")

            # Log performance metrics (could be sent to monitoring system)
            if processing_time > 5.0:
                logger.warning(f"Slow response detected: {processing_time:.2f}s for request {request_id}")

            return {
                "response": response,
                "session_id": session_id or request_id,
                "request_id": request_id,
                "processing_time": processing_time,
                "status": "success"
            }

        except Exception as e:
            processing_time = time.time() - start_time
            logger.error(f"Error processing request {request_id}: {str(e)}", exc_info=True)

            return {
                "response": self.fallback_response,
                "session_id": session_id or request_id,
                "request_id": request_id,
                "processing_time": processing_time,
                "status": "error",
                "error": str(e)
            }

# Initialize FastAPI
app = FastAPI(title="PydanticAI Agent API")

# Initialize the production agent
production_agent = ProductionAgent(
    model="ollama/deepseek-r1:7b",
    # For high-volume production, consider using a cloud model with higher throughput
    # model="openai/gpt-4-turbo",
    temperature=0.2,
    max_tokens=1000
)

# Add tools for the production agent
@tool
def search_knowledge_base(query: str) -> List[Dict[str, str]]:
    """Search the knowledge base for information"""
    # In production, this would connect to your actual knowledge base
    return [{"title": "Sample result", "content": "This is a sample search result"}]

production_agent.tools = [search_knowledge_base]

# API endpoints
@app.post("/api/agent", response_model=AgentResponse)
async def query_agent(request: AgentRequest, background_tasks: BackgroundTasks):
    """Process an agent request synchronously"""
    result = production_agent.run_with_monitoring(request.message, request.session_id)

    # Schedule cleanup in the background
    background_tasks.add_task(cleanup_old_sessions)

    if result["status"] == "error":
        logger.error(f"Error in request {result['request_id']}: {result.get('error')}")

    return AgentResponse(
        response=result["response"],
        session_id=result["session_id"],
        request_id=result["request_id"],
        processing_time=result["processing_time"]
    )

async def cleanup_old_sessions():
    """Clean up inactive sessions"""
    current_time = time.time()
    inactive_threshold = 3600  # 1 hour

    inactive_sessions = [
        session_id for session_id, data in production_agent.sessions.items()
        if current_time - data.get("last_activity", 0) > inactive_threshold
    ]

    for session_id in inactive_sessions:
        del production_agent.sessions[session_id]
        logger.info(f"Cleaned up inactive session {session_id}")

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy", "timestamp": time.time()}

```

Conclusion
----------

PydanticAI offers a well-structured, efficient framework for building AI agents that balances simplicity with power. Key takeaways from this tutorial:

1.  **Start Simple**: Begin with basic agents and gradually add complexity as needed.
2.  **Documentation is Key**: Well-documented tools with clear Pydantic models help LLMs understand how to use them correctly.
3.  **Debugging is Essential**: Implement comprehensive logging and monitoring from the start to identify and fix issues quickly.
4.  **Performance Matters**: Optimize your agents for local LLM deployment when running models like DeepSeek R1 with Ollama.
5.  **Test Thoroughly**: Verify agent behavior across a range of inputs before deploying to production.

Remember that agent development is an iterative process. Start with a minimal viable agent, test it thoroughly, and progressively enhance its capabilities based on real-world performance and user feedback.

As you build more complex agent systems, consider implementing the ReAct framework to interleave reasoning and action, and explore multi-agent architectures for tasks that benefit from specialized capabilities working together.

Happy agent building!