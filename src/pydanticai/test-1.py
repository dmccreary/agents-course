# check-pydanticai-version.py
# This script will help diagnose what version of PydanticAI you have
# and what parameters are supported

import inspect
import sys

try:
    import pydantic_ai
    from pydantic_ai import Agent
    
    # Print version information
    print(f"Python version: {sys.version}")
    print(f"PydanticAI version: {pydantic_ai.__version__}")
    
    # Check Agent initialization signature
    print("\nAgent initialization parameters:")
    print(inspect.signature(Agent.__init__))
    
    # List available attributes/methods of Agent
    print("\nAvailable Agent attributes/methods:")
    methods = [attr for attr in dir(Agent) if not attr.startswith('_')]
    print(methods)
    
    # Check if there are any documented examples
    print("\nPydanticAI module docstring:")
    print(pydantic_ai.__doc__)
    
except ImportError as e:
    print(f"Error importing PydanticAI: {e}")
except Exception as e:
    print(f"Error: {e}")