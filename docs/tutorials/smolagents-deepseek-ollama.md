# Setup Guide: SmoLAgents with DeepSeek-R1 on Ollama

This guide will walk you through setting up SmoLAgents with a local DeepSeek-R1 model running on Ollama.

## Prerequisites

- Python 3.8+
- Local GPU with minimum 12GB VRAM (recommended)
- Basic understanding of Python and command-line tools
- Windows, macOS, or Linux operating system

## Step 1: Install Ollama

1. Visit [ollama.ai](https://ollama.ai/) to download the appropriate version for your operating system
2. Install Ollama following the instructions for your platform
3. After installation, open a terminal or command prompt and verify Ollama is working:

```bash
ollama --version
```

## Step 2: Download DeepSeek-R1 Model

1. Pull the DeepSeek-R1 7B model (this will take some time depending on your internet connection):

```bash
ollama pull deepseek-r1:7b
```

2. Verify the model was downloaded successfully:

```bash
ollama list
```

You should see `deepseek-r1:7b` in the list of available models.

## Step 3: Set Up Python Environment

1. Create a virtual environment (recommended):

```bash
# Create directory for project
mkdir smolagents-tutorial
cd smolagents-tutorial

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

2. Create a requirements.txt file with the content provided in this tutorial or download it from the repository

3. Install the required packages:

```bash
pip install -r requirements.txt
```

## Step 4: Test Basic Functionality

1. Create a simple test script `test_smolagents.py` using the code provided in the tutorial

2. Run the test script to verify SmoLAgents is installed correctly:

```bash
python test_smolagents.py
```

3. Check that Ollama is running the server:

```bash
# Start Ollama server if not already running
ollama serve
```

## Step 5: Run the Example Agents

1. Start with the simple agent:

```bash
python simple_agent.py
```

2. Try more advanced examples like the code agent and data analysis agent:

```bash
python code_agent.py
python data_analysis_agent.py
```

3. For the knowledge graph example, ensure you have NetworkX installed:

```bash
pip install networkx matplotlib
python knowledge_graph_agent.py
```

## Troubleshooting

### Model Loading Issues

If you encounter issues loading the model:

```bash
# Restart the Ollama server
ollama serve
```

### Out of Memory Errors

If you see CUDA out of memory errors:

1. Close other applications using GPU memory
2. Try a smaller model like `deepseek-r1:6.7b-dpo-q4_0` which uses less memory

### Connection Issues

If the agent can't connect to Ollama:

1. Verify Ollama is running: `ollama serve`
2. Check the API endpoint in your code: should be `http://localhost:11434/v1`
3. Ensure no firewall is blocking the connection

## Next Steps

After successfully running the examples, try:

1. Creating your own custom tools
2. Experimenting with different agent types (JSONAgent, ReActAgent)
3. Integrating with other data sources or APIs
4. Building a complete application using the agent framework

Happy coding with SmoLAgents and DeepSeek-R1!