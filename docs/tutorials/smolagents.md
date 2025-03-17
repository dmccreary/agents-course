# Tutorial: Getting Started with HuggingFace's SmoLAgents

This tutorial will guide you through setting up and using HuggingFace's SmoLAgents framework with a local LLM deployment using Ollama and DeepSeek-R1. SmoLAgents is a lightweight framework designed for efficient creation and deployment of language model-powered agents.

## Table of Contents
1. [Understanding SmoLAgents](#understanding-smolagents)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Testing Your Installation](#testing-your-installation)
5. [Setting Up Ollama with DeepSeek-R1](#setting-up-ollama-with-deepseek-r1)
6. [Creating Your First Agent](#creating-your-first-agent)
7. [Building a Code Agent](#building-a-code-agent)
8. [Troubleshooting](#troubleshooting)
9. [Next Steps](#next-steps)

## Understanding SmoLAgents

SmoLAgents is a framework released by HuggingFace designed to create small, efficient agents. Unlike more complex frameworks like LangChain, SmoLAgents focuses on simplicity and flexible agency levels, from basic decision support to advanced code generation capabilities.

A key feature of SmoLAgents is its support for different agent types, including specialized Code Agents that can generate and execute Python code directly.

## Prerequisites

Before starting, ensure you have:

- Python 3.8+ installed
- A GPU with at least 12GB VRAM (recommended for running DeepSeek-R1)
- Basic understanding of Python programming
- Git installed (for repository access)

## Installation

Let's install SmoLAgents and its dependencies:

```bash
# Create a virtual environment (recommended)
python -m venv smolagents-env
source smolagents-env/bin/activate  # On Windows: smolagents-env\Scripts\activate

# Install SmoLAgents
pip install smolagents

# Install additional dependencies
pip install ollama  # Python client for Ollama
```

## Testing Your Installation

Create a simple test script to verify that SmoLAgents is correctly installed:

Run the test script:

```bash
python test_smolagents.py
```

You should see output similar to:
```
SmoLAgents version: 1.9.2
Successfully created tool and model!
Available agent types:
['Agent', 'CodeAgent', 'JSONAgent', 'ReActAgent', 'SimpleAgent']
SmoLAgents installation test complete!
```

This confirms that SmoLAgents is installed correctly and shows the available agent types, including the powerful CodeAgent.

## Setting Up Ollama with DeepSeek-R1

To use a local LLM with SmoLAgents, we'll set up Ollama with the DeepSeek-R1 model:

1. **Install Ollama**: Download and install from [ollama.ai](https://ollama.ai/)

2. **Pull the DeepSeek-R1 model**:
   ```bash
   ollama pull deepseek-r1:7b
   ```

3. **Verify the model is available**:
   ```bash
   ollama list
   ```

   You should see output similar to:
   ```
   NAME                    ID          SIZE    MODIFIED     
   deepseek-r1:latest      0a8c26691023	4.7 GB	3 weeks ago 	
   deepseek-r1:7b          0a8c26691023	4.7 GB	3 weeks ago
   ```

## Creating Your First Agent

Now, let's create a simple agent that uses the DeepSeek-R1 model via Ollama:

Run the simple agent:

```bash
python simple_agent.py
```

This agent demonstrates:
- Using the `@tool` decorator to create a custom tool
- Connecting to Ollama to use DeepSeek-R1
- Creating a basic Agent with tools
- Running the agent with a user query

## Building a Code Agent

Now, let's create a more advanced Code Agent that can write and execute Python code:



Run the code agent:

```bash
python code_agent.py
```

This code agent demonstrates:
- Using the CodeAgent class to create an agent that can generate and execute Python code
- Setting safety constraints with allowed modules
- Handling more complex tasks requiring data generation and visualization

## Creating a Data Analysis Agent

Let's create a more practical example - an agent that can analyze CSV data:

## Troubleshooting

If you encounter issues:

### Connection to Ollama fails:

- Ensure Ollama is running: `ollama serve`
- Verify the model is downloaded: `ollama list`
- Check the API endpoint URL: default is `http://localhost:11434/v1`

### Out of Memory errors:

- DeepSeek-R1 7B requires around 12GB of VRAM
- Try closing other applications using GPU memory
- Consider using a smaller model if necessary

### Import errors:
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check for version conflicts: `pip list | grep smolagents`

## Advanced: Creating a ReAct Agent

The ReAct (Reasoning-Action) framework combines reasoning traces with actions. Let's create a ReAct agent:

## Agent Integration with Knowledge Graphs

Let's create an example that combines SmoLAgents with a simple knowledge graph:

Let me continue with the knowledge graph agent code:

```py
#!/usr/bin/env python
# knowledge_graph_agent.py - SmoLAgents with a simple knowledge graph

import os
import json
import networkx as nx
import matplotlib.pyplot as plt
from smolagents import CodeAgent, FinalAnswerTool, tool
from smolagents.models import Model

# Create a simple knowledge graph for the course concepts
def create_knowledge_graph():
    """Create a simple knowledge graph of course concepts."""
    G = nx.DiGraph()
    
    # Add nodes (concepts)
    concepts = {
        "agent": "An autonomous computational entity that performs tasks with independence",
        "llm": "Large Language Model - a deep learning model trained on text data",
        "tool": "An atomic function used by an agent",
        "code_agent": "A specialized agent that can write and execute code",
        "ollama": "Software framework for local LLM deployment",
        "deepseek_r1": "A large language model developed in China",
        "react": "Framework that interleaves reasoning and action",
        "knowledge_graph": "A structured representation of knowledge with entities and relationships",
        "agency_level": "The degree of autonomy granted to an intelligent agent",
        "tool_catalog": "A list of tools available for an agent to use"
    }
    
    # Add each concept as a node with its definition
    for concept, definition in concepts.items():
        G.add_node(concept, definition=definition)
    
    # Add edges (relationships between concepts)
    relationships = [
        ("agent", "code_agent", "is a type of"),
        ("agent", "tool", "uses"),
        ("llm", "agent", "powers"),
        ("tool", "tool_catalog", "belongs to"),
        ("ollama", "deepseek_r1", "can run"),
        ("agent", "react", "can implement"),
        ("agent", "knowledge_graph", "can use"),
        ("agency_level", "agent", "classifies"),
        ("code_agent", "agency_level", "has highest"),
    ]
    
    # Add each relationship as an edge
    for source, target, relation in relationships:
        G.add_edge(source, target, relation=relation)
    
    # Save the graph to a JSON file
    graph_data = {
        "nodes": [{
            "id": node,
            "definition": data["definition"]
        } for node, data in G.nodes(data=True)],
        "edges": [{
            "source": source,
            "target": target,
            "relation": G.edges[source, target]["relation"]
        } for source, target in G.edges()]
    }
    
    with open("course_knowledge_graph.json", "w") as f:
        json.dump(graph_data, f, indent=2)
    
    return G, "course_knowledge_graph.json"

# Create knowledge graph tools
@tool
def query_concept(concept):
    """
    Get the definition of a concept from the knowledge graph.
    
    Args:
        concept (str): The concept to query
        
    Returns:
        dict: Information about the concept including definition and relationships
    """
    try:
        with open("course_knowledge_graph.json", "r") as f:
            graph_data = json.load(f)
        
        # Find the concept in nodes
        concept = concept.lower()
        node = next((node for node in graph_data["nodes"] if node["id"] == concept), None)
        
        if not node:
            return {"error": f"Concept '{concept}' not found in knowledge graph"}
        
        # Find relationships
        relationships = []
        for edge in graph_data["edges"]:
            if edge["source"] == concept:
                relationships.append({
                    "relation": edge["relation"],
                    "target": edge["target"]
                })
            elif edge["target"] == concept:
                relationships.append({
                    "relation": f"is {edge['relation']} by",
                    "target": edge["source"]
                })
        
        return {
            "concept": concept,
            "definition": node["definition"],
            "relationships": relationships
        }
        
    except Exception as e:
        return {"error": f"Error querying concept: {str(e)}"}

@tool
def list_all_concepts():
    """
    List all concepts in the knowledge graph.
    
    Returns:
        list: All concepts in the knowledge graph
    """
    try:
        with open("course_knowledge_graph.json", "r") as f:
            graph_data = json.load(f)
        
        return [node["id"] for node in graph_data["nodes"]]
        
    except Exception as e:
        return {"error": f"Error listing concepts: {str(e)}"}

@tool
def visualize_knowledge_graph():
    """
    Generate a visualization of the knowledge graph.
    
    Returns:
        str: Path to the saved visualization image
    """
    try:
        with open("course_knowledge_graph.json", "r") as f:
            graph_data = json.load(f)
        
        # Create a new directed graph
        G = nx.DiGraph()
        
        # Add nodes
        for node in graph_data["nodes"]:
            G.add_node(node["id"])
        
        # Add edges
        for edge in graph_data["edges"]:
            G.add_edge(edge["source"], edge["target"], relation=edge["relation"])
        
        # Create visualization
        plt.figure(figsize=(12, 8))
        pos = nx.spring_layout(G, seed=42)
        nx.draw(G, pos, with_labels=True, node_color="lightblue", 
                node_size=2000, font_size=10, font_weight="bold", 
                arrowsize=15, edge_color="gray")
        
        # Add edge labels
        edge_labels = {(edge["source"], edge["target"]): edge["relation"] 
                      for edge in graph_data["edges"]}
        nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=8)
        
        # Save the visualization
        output_path = "knowledge_graph_visualization.png"
        plt.savefig(output_path)
        plt.close()
        
        return {"success": True, "visualization_path": output_path}
        
    except Exception as e:
        return {"error": f"Error visualizing graph: {str(e)}"}

def main():
    # Create the knowledge graph
    _, kg_path = create_knowledge_graph()
    print(f"Knowledge graph created: {kg_path}")
    
    try:
        # Check if networkx is installed
        import networkx
    except ImportError:
        print("NetworkX is required for this example.")
        print("Please install it with: pip install networkx matplotlib")
        return
    
    # Create a model using the Ollama endpoint for DeepSeek-R1
    model = Model(
        base_url="http://localhost:11434/v1",
        model_name="deepseek-r1",
        api_type="ollama"
    )
    
    # Create a Code Agent with knowledge graph tools
    allowed_modules = ["json", "networkx", "matplotlib.pyplot", "os"]
    
    kg_agent = CodeAgent(
        model=model,
        tools=[query_concept, list_all_concepts, visualize_knowledge_graph, FinalAnswerTool()],
        allowed_modules=allowed_modules
    )
    
    # Example query about course concepts
    query = """
    Explain what a code agent is and how it relates to other concepts in the course.
    Also, visualize the knowledge graph to help me understand the relationships.
    """
    
    print(f"Query: {query}\n")
    print("Agent response:")
    
    # Run the agent and capture the response
    response = kg_agent.run(
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": query}
        ]
    )
    
    # Print the response
    print(response)
    
    # Example query about multiple concepts
    comparison_query = """
    Compare the concepts of 'agent', 'tool', and 'llm'. How do they relate to each other
    in the context of this course?
    """
    
    print(f"\nQuery: {comparison_query}\n")
    print("Agent response:")
    
    # Run the agent with the comparison query
    comparison_response = kg_agent.run(
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": comparison_query}
        ]
    )
    
    # Print the response
    print(comparison_response)
    
    # Define a system message for the knowledge graph agent
    system_message = """
    You are a knowledge graph assistant for a course on intelligent software agents.
    You can query concepts in the knowledge graph, list all available concepts,
    and visualize the relationships between concepts.
    
    When answering questions:
    1. Use the knowledge graph tools to retrieve relevant information
    2. Explain the concepts clearly using the information from the graph
    3. Highlight relationships between concepts to show their connections
    4. If requested, create visualizations to help illustrate the relationships
    """
```
Now let's create a comprehensive requirements.txt file for all our examples:

```txt
# Core requirements
smolagents>=1.9.2
ollama>=0.1.10

# For data analysis and visualization
pandas>=1.3.0
numpy>=1.20.0
matplotlib>=3.4.0
seaborn>=0.11.0

# For knowledge graph example
networkx>=2.6.0

# Optional dependencies
# scikit-learn>=1.0.0  # For machine learning tasks
# requests>=2.25.0     # For API calls
# beautifulsoup4>=4.9.0  # For web scraping
```

Let's also create a step-by-step installation and setup guide:

## Next Steps

Now that you've learned the basics of SmoLAgents and how to integrate it with Ollama and DeepSeek-R1, here are some ideas for expanding your skills:

1. **Create Your Own Tools**: Design custom tools for specific domains like finance, healthcare, or education.

2. **Experiment with Different LLMs**: Try other models available in Ollama like Llama2, Mistral, or smaller versions of DeepSeek-R1.

3. **Multi-Agent Systems**: Create applications where multiple specialized agents collaborate to solve complex problems.

4. **Integration with Real Data Sources**: Connect your agents to databases, APIs, or real-time data streams.

5. **Explore Agency Levels**: Implement agents with different levels of autonomy, from simple decision support to fully autonomous code generation.

6. **Compare Agent Frameworks**: Try implementing the same functionality with other frameworks like PydanticAI or LangChain to understand the trade-offs.

## Conclusion

SmoLAgents provides a lightweight, efficient framework for building AI agents with LLMs. Its unique features, particularly the CodeAgent that can write and execute Python code, make it a powerful tool for developing autonomous systems.

By combining SmoLAgents with local LLM deployment via Ollama and models like DeepSeek-R1, you can create sophisticated agent applications that run entirely on your local machine, providing better privacy, control, and cost-effectiveness compared to cloud-based solutions.

The examples in this tutorial demonstrate the flexibility of the framework - from simple tool-calling to advanced data analysis and knowledge graph integration. As you continue to explore, you'll discover how these building blocks can be combined to create intelligent agents that solve real-world problems.

Remember to follow the setup guide and refer to the provided code examples as you build your own agent applications. Happy building!