# Context Window Management with Letta

**Letta** (formerly known as **MemGPT**) is an open source framework for building stateful agents with advanced reasoning capabilities and transparent long-term memory. 

The MemGPT package and Docker image have been renamed to letta to clarify the distinction between MemGPT agents and the Letta API server / runtime that runs LLM agents as services.

## How It Works Like Virtual Memory

Letta uses virtual context management, a technique drawing inspiration from hierarchical memory systems in traditional operating systems that provide the appearance of large memory resources through data movement between fast and slow memory. Similar to an OS, the operating system coordinates between virtual memory, physical memory, and disk, deciding what data stays in RAM, what goes to disk, and when to swap it back. [arXiv](https://arxiv.org/abs/2310.08560)[Medium](https://neerajku.medium.com/memgpt-extending-llm-context-through-os-inspired-virtual-memory-and-hierarchical-storage-c5cc96f9818a)

The system creates a **memory hierarchy** with different tiers:

-   **Main Context**: Analogous to an OS's main memory or RAM, representing the standard fixed-length context window the LLM processes during inference [Letta+Zilliz Cloud: Building RAG Agents with Extended LLM Context Window](https://zilliz.com/product/integrations/memgpt)
-   **External Context**: Resembling secondary storage in an OS, holding out-of-context information that can be selectively moved into the main context through explicit function calls [Letta+Zilliz Cloud: Building RAG Agents with Extended LLM Context Window](https://zilliz.com/product/integrations/memgpt)
-   **Recall Storage**: Stores recent evicted data for quick retrieval
-   **Archival Storage**: For long-term, less frequently accessed information

## Intelligent Memory Management

The Queue Manager in MemGPT plays a central role in managing the limited memory resources of the main context (LLM's context window). It evicts the oldest messages (typically around 50% of the context window) and replaces them with a recursive summary. [Extending LLM Context Through OS-Inspired Virtual Memory and Hierarchical Storage | by Neeraj Kumar | Medium](https://neerajku.medium.com/memgpt-extending-llm-context-through-os-inspired-virtual-memory-and-hierarchical-storage-c5cc96f9818a)

MemGPT empowers LLMs to control data movement between the main and external context through self-generated function calls, learning to leverage these functions based on the current goals and context. [Letta+Zilliz Cloud: Building RAG Agents with Extended LLM Context Window](https://zilliz.com/product/integrations/memgpt)

## Key Features

-   **Self-editing memory**: The basic idea is to use LLM tools to allow an agent to both edit its own context window ("core memory"), as well as edit external storage (i.e. "archival memory")
-   **Automatic swapping**: The system automatically determines what information is most relevant and should remain in the active context window
-   **Persistent memory**: Unlike traditional LLMs, agents built with Letta can remember information across sessions
-   **Model-agnostic**: Works with various LLM providers including OpenAI, local models, etc.

You can find the project on GitHub at `letta-ai/letta` and install it via Docker or pip (`pip install -U letta`).
