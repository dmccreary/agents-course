#### Action

The process of calling a specific tool directly from within an agent.

In a multi-step agent, at each step, the LLM can write an action, in the form of some calls to external tools.  Tools much be carefully described so that agents can match their capabilities with the needs of a the user.

A common format (used by Anthropic, OpenAI, and many others) for writing these actions is generally different variations of "writing actions as a JSON of tools names, description and arguments to use, which you then parse to know which tool to execute and with which arguments".

#### Agency Level

A classification system that defines the degree of autonomy and decision-making authority granted to an intelligent software agent.

In the context of intelligent software agents, agency levels provide a framework for understanding and designing agents with appropriate capabilities for specific use cases. These levels range from simple decision support (Level 0-1) to complex autonomous behaviors including code generation and execution (Level 5). In this course, students progressively implement agents with increasing agency levels as they develop more sophisticated understanding and implementation skills.

**Example:** A student project might begin with a Level 2 agent that can select and call predefined tools based on user input, then evolve to a Level 5 agent capable of writing, testing, and executing its own Python code to solve novel problems.

Here are additional terms that are not currently in the glossary but would be valuable additions for the course on intelligent software agents:

#### Agent

An autonomous computational entity that performs tasks on behalf of users or other programs with some degree of independence or autonomy.

In this course we focus on agents that use and add precise [knowledge representation](#knowledge-representation) of the user's goals or desires.

Our agents use graphs to give precise context and provide a [rules engines](#rules-engine) tool for agents to use.

* See also: [Rules Engine](#rules-engine)

#### Agentic Workflow

A sequence of operations where large language models control the execution flow, decision points, and tool selection to accomplish complex tasks autonomously.

In the context of intelligent software agents, agentic workflows represent the orchestration of planning, reasoning, and action that enables an agent to pursue goals with minimal human intervention. These workflows may involve loops, conditionals, and dynamic adjustments based on intermediate results. In this course, students implement increasingly sophisticated agentic workflows as they progress from basic tool-calling to advanced code generation and execution.

**Example:** A student might develop an agentic workflow for data analysis that begins with data exploration, automatically determines which cleaning operations are needed, selects appropriate visualization techniques based on data characteristics, and finally generates insights without requiring step-by-step human guidance.#### Agntcy

A set of proposed standards for Agent interoperability.

* See [Agntcy on Perplexity](https://www.perplexity.ai/search/agntcy-c.tl7VIyRK.c2F.27VxeCg)

#### Business Process Modeling Notation

[BPMN References Guide](https://camunda.com/bpmn/reference/)

#### Code Agent

A specialized type of artificial intelligence agent that directly generates and executes programming code to perform tasks autonomously.

In the context of intelligent software agents, code agents represent an advanced form of agency where the agent produces executable code rather than structured formats like JSON to perform actions. This approach allows for greater expressiveness, efficiency, and flexibility when solving complex problems, as the agent can leverage the full capabilities of a programming language. Code agents in this course are implemented using the SmolAgents framework and typically generate Python code.

**Example:** A student might implement a code agent that analyzes a dataset by writing Python code to load the CSV file, perform statistical calculations, and visualize the results, all without requiring predefined functions for each specific operation.

#### Controlled Imports

A security mechanism that restricts which external libraries or modules an agent can access when executing generated code.

In the context of intelligent software agents, controlled imports are a critical safety feature, particularly for code agents that generate and execute Python code. By limiting the modules an agent can import and use, developers can prevent potentially harmful operations while still allowing the agent to perform its intended functions. In this course, controlled imports would be implemented as part of the sandboxed environment when working with code-generating agents.

**Example:** When configuring a code agent for a data analysis task, a student would implement controlled imports to allow access to pandas and matplotlib for data processing and visualization, while restricting access to system-level modules that could pose security risks.

#### Decorator
A decorator is a design pattern implemented as a special syntax that allows a function, method, or class to be modified or extended without changing its source code. 

In this course, we use Python decorators with the @ symbol followed by a decorator name such as `@tool`  placed above the definition of the function to be decorated. 

They effectively wrap the target function, enabling pre-processing of arguments, post-processing of return values, modification of behavior, or registration within a larger system.

#### DeepSeek R1

A large language model developed in China that combines mixture of experts with reinforcement learning to create efficient, smaller-scale models.

In the context of intelligent software agents, DeepSeek R1 represents an accessible yet powerful foundation model that can run on consumer-grade hardware while maintaining strong reasoning and code generation capabilities. The model's architecture enables it to perform complex tasks with relatively modest computational requirements. In this course, the 7 billion parameter variant of DeepSeek R1 is deployed through Ollama to serve as the reasoning engine for various agent implementations.

**Example:** A student might observe that their code agent running on DeepSeek R1 7B can generate effective Python code for data analysis while maintaining an inference speed of over 50 tokens per second on their local GPU.

#### Docstring

A docstring in Python is a string literal that appears as the first statement in a module, function, class, or method definition.

Python docstrings are enclosed by triple quotes (`"""` or `'''`) and can span multiple lines.

Docstrings combined with the `@tool` decorator are used to document the purpose, behavior, parameters, and return values of the code object. 

This approach allows agents to understand not just what functions are available, but when and how to use them appropriately based on their documented purpose and parameters.

#### FinalAnswerTool

A component within agent frameworks that enables an agent to provide definitive responses to user queries.

In the context of intelligent software agents, the FinalAnswerTool represents the simplest form of agent output mechanism, allowing the agent to formulate and deliver conclusive responses. It serves as a foundation for more complex tool interactions and is often used as a fallback when specialized tools are not required for a particular query. In the SmolAgents framework used in this course, the FinalAnswerTool is a basic building block for agent implementation.

**Example:** When implementing their first agent using SmolAgents, a student would start by incorporating the FinalAnswerTool to allow their agent to respond directly to informational queries before adding more specialized tools for data manipulation or code execution.

#### Goal-Driven Process (GDP)

In the context of the Software Development Life Cycle (SDLC), GDP typically refers to "Goal-Driven Process" or "Goal-Directed Planning." This is a methodological approach within software development that emphasizes:

Defining clear goals and objectives for the software project
Aligning development processes with these established goals
Making decisions throughout the development lifecycle based on how they contribute to achieving the defined goals

The GDP approach within SDLC helps teams:

- Maintain focus on delivering value that aligns with business or user objectives
- Prioritize features and development tasks based on goal contribution
- Establish measurable criteria for evaluating progress and success
- Create a framework for making consistent decisions when trade-offs are necessary

This approach can be implemented across various SDLC methodologies, including Agile, Waterfall, or hybrid approaches, as it's more about the strategic alignment of development efforts rather than the specific technical implementation process.

#### Graphics Processing Unit

A specialized device designed to accelerate matrix operations using parallel processing.

In the context of intelligent software agents, GPUs are relevant as they provide parallel processing capabilities that significantly accelerate machine learning model training and inference operations, enabling more complex and performant AI systems. The parallel architecture of GPUs allows for efficient matrix operations that form the computational backbone of many neural network implementations.

**Example:** When deploying a code agent for real-time coding tasks, a developer would typically configure the environment to utilize a GPU to ensure the agent can perform inference operations at sufficient speed, rather than relying solely on CPU processing.

#### ISO Definition

A term definition is considered to be consistent with ISO metadata registry guideline 11179 if it meets the following criteria:

1. Precise
2. Concise
3. Distinct
4. Non-circular
5. Unencumbered with business rules

#### Integrated Development Environment

A software application that provides comprehensive facilities to programmers for software development, combining multiple development tools into a single graphical user interface.

In the context of intelligent software agents, IDEs are relevant as they provide environments where code agents can be integrated to assist developers with tasks such as code completion, error detection, refactoring suggestions, and automated documentation. Modern IDEs often incorporate AI-powered features that enhance developer productivity by leveraging language models to understand code context and provide intelligent assistance.

**Example:** A developer working with a code agent might configure their IDE to seamlessly interact with the agent, allowing it to analyze code as it's being written, suggest improvements based on best practices, and even generate test cases automatically based on the function implementations.

* [Codium Windsurf](https://codeium.com/windsurf)
* [Lovable](https://lovable.dev/)
* [Cursor](https://www.cursor.com/en)

#### Intelligent Textbook

An interactive digital learning resource that employs artificial intelligence to generate personalized educational content and adaptive learning experiences in response to individual student needs and progress.

In the context of intelligent software agents, intelligent textbooks represent an advanced application domain where multiple specialized agents collaborate to deliver customized educational experiences. These agents work together to analyze student performance, identify knowledge gaps, generate appropriate lesson content, create interactive simulations, and adapt teaching methodologies in real-time. The intelligent textbook serves as both a platform for agent integration and an interface through which students interact with these educational AI systems.

**Example:** A computer science student using an intelligent textbook to learn about data structures might receive dynamically generated lesson content on binary trees based on their previous interaction patterns, followed by an interactive coding simulation that adjusts its complexity based on the student's demonstrated proficiency, all orchestrated by specialized AI agents working in concert to optimize the learning experience.

#### Knowledge Graph

A structured representation of knowledge consisting of entities, their semantic types, properties, and the relationships between them.

In the context of intelligent software agents, knowledge graphs provide a mechanism for organizing and interconnecting domain-specific information in a way that facilitates reasoning, inference, and contextual understanding. Knowledge graphs extend beyond simple data storage by explicitly modeling the relationships between concepts, allowing agents to navigate complex information spaces more effectively. In this course, knowledge graphs may be used to augment agent capabilities by providing structured knowledge beyond what is encoded in the base language model.

**Example:** A student might enhance their agent by creating a knowledge graph of programming concepts and their relationships, enabling the agent to understand connections between different libraries, functions, and programming paradigms when generating code solutions.

#### Knowledge Representation

The methods and structures used to encode information about the world.

In this book, we focus on knowledge representation in a form that an agent can utilize for reasoning and decision-making. It provides the foundation for an agent's understanding of its environment, goals, and possible actions.

Knowledge representation encompasses:

1. **Symbolic Structures**: Formalized frameworks such as ontologies, semantic networks, frames, rules, or logic-based systems that capture entities, relationships, and constraints in the agent's domain.

2. **Information Organization**: Methods for structuring knowledge in ways that facilitate efficient access, inference, and updates as the agent interacts with its environment.

3. **Reasoning Mechanisms**: Techniques that allow agents to derive new knowledge from existing representations, evaluate truth values, and make decisions based on incomplete information.

4. **Semantic Grounding**: Connections between abstract symbols and their real-world referents, allowing the agent to map internal representations to external phenomena.

Effective knowledge representation systems in agents balance expressiveness (the ability to represent complex knowledge) with computational efficiency (allowing the agent to reason within reasonable time and resource constraints).

#### LLM Agent Control Levels

The amount you allow an LLM to control agentic execution.
Her are some sample levels:

1. **Level 0** - LLMs have no control over workflows
2. **Level 1** - LLMs can impact an if/then/else decision within workflows
3. **Level 2** - LLMs determine what functions should be called
4. **Level 3** - LLMs control iteration, and program order and continuation
5. **Level 4** - LLMs can start another agentic workflow
6. **Level 5** - LLMs can generate new code and run it

See also: [HuggingFace Agent Definition](https://huggingface.co/docs/smolagents/conceptual_guides/intro_agents)

#### LLM Agents

A specialized type of software [agent](#agent) where LLM outputs control the workflow.

Note that "agency" evolves on a continuous spectrum, as you give more or less power to the LLM on your workflow.

#### LLM Reasoning

The process by which a large language model analyzes information, makes inferences, and arrives at conclusions through patterns learned during training.

In the context of intelligent software agents, LLM reasoning forms the cognitive foundation that enables agents to understand requests, plan approaches, and generate appropriate responses or actions. While traditional software relies on explicit logic, LLM reasoning emerges from statistical patterns learned across vast text corpora. In this course, students learn to leverage and guide LLM reasoning through effective prompting, context management, and task decomposition.

**Example:** When designing an agent to solve complex programming problems, a student would structure their prompts to encourage step-by-step LLM reasoning, allowing the model to break down the problem, consider alternative approaches, and identify potential edge cases before generating code.

#### LangChain

An open-source framework designed to simplify the development of applications that leverages large language models (LLMs). 

LangChain provides a standardized interface for chaining together different components needed for LLM applications, such as prompt templates, language models, memory systems, and external tools or data sources.

Key features of LangChain include:

1.  **Chains**: Sequences of operations that combine prompts, models, and other components to perform complex tasks.
2.  **Agents**: Systems that use LLMs as reasoning engines to determine which actions to take based on user input and tool feedback.
3.  **Memory**: Components that allow applications to maintain conversational state and context over interactions.
4.  **Retrieval Augmented Generation (RAG)**: Tools for connecting LLMs to external knowledge sources and databases to enhance responses with specific information.
5.  **Tool integration**: Standardized methods for connecting LLMs to external APIs, databases, and computational resources.

LangChain helps developers build sophisticated applications like chatbots, question-answering systems, summarization tools, and other AI assistants by providing reusable components and patterns that work across different LLM providers.

The main disadvantage of LangChain is a long learning curve.  To use LangChain you must master several abstractions.

#### Large Language Model

A deep learning model that is trained on natural language and used to predict the next token.

Examples of LLMs include BERT, DeepSeek, GPTs and Llams.

#### Model Context Protocol

An open protocol and standardized set of rules and data structures that govern the exchange of contextual information between an application programming interface (API) and a large language model (LLM).

The Model Context Protocol (MCP) defines how prompts, system instructions, session states, user interactions, and relevant contextual metadata are structured, transmitted, and maintained to ensure consistent and coherent model behavior across interactions.

Example:
In an AI chatbot API, a Model Context Protocol may define how user messages, past conversation history, user preferences, and domain-specific knowledge are encoded and sent to the LLM, ensuring that responses remain relevant and contextually aware.

- [Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [Cursor Model Content Protocol](https://docs.cursor.com/context/model-context-protocol)

#### Multi-Agent System

A computational framework composed of multiple interacting intelligent agents working together to solve complex problems or achieve shared goals.

In the context of intelligent software agents, multi-agent systems represent an advanced architectural pattern where specialized agents collaborate, communicate, and coordinate their activities. Each agent may have distinct capabilities, knowledge bases, or roles, but collectively they address problems that would be difficult for a single agent to solve effectively. In this course, students explore how to design and implement multi-agent systems where agents with complementary capabilities can interact.

**Example:** For their capstone project, a team might develop a multi-agent system for software development assistance, with specialized agents handling requirements analysis, code generation, testing, and documentation, all coordinating through a shared communication protocol.

#### Ollama

A software framework that enables deployment and execution of large language models locally on personal computing devices.

In the context of intelligent software agents, Ollama provides a crucial capability for running LLMs without cloud dependencies, allowing for development and testing of agents with reduced latency and cost. The framework optimizes resource utilization and provides standardized interfaces for model management, inference, and integration with agent frameworks like SmolAgents. In this course, Ollama is used to run the DeepSeek R1 model on local GPUs.

**Example:** Before implementing their code agent, a student would first install Ollama on their system and download the DeepSeek R1 7B model to enable local execution of their agent without relying on external API services.

#### Private Knowledge

Knowledge that is not publicly available.

 For organizations, private knowledge usually is stored on an intranet or private company databases such as ERP and CRM systems.

Software Agents must combine both public knowledge (usually within a LLM) with private knowledge.

#### Procedural Code

Procedural code is a programming paradigm that focuses on defining a sequence of operations for a computer to execute.

It emphasizes how a program should accomplish tasks through explicit step-by-step instructions, control flow structures, and state changes. Procedural code typically organizes functionality into procedures or functions that are called in a predetermined order.

Procedural code is contracted with declarative code and agentic code.

#### Public Knowledge

Knowledge that is openly available on public data sources such as the Internet and Wikipedia.

Public knowledge is contrasted to [private knowledge](#private-knowledge) that has limited access.  For organizations, private knowledge usually is stored on an intranet or private company databases such as ERP and CRM systems.

Software Agents must combine both public knowledge (usually within a LLM) with private knowledge.

#### PydanticAI

A Python agent framework designed to make it easy to build production grade applications with Generative AI.

PydanticAI is a reaction to overly abstract frameworks such as LangChain that have long learning curves to manage the abstractions.

- See also [PydanticAI Web Site](https://ai.pydantic.dev/)

#### ReAct framework

The use of LLMs to generate both reasoning traces and task-specific actions in an interleaved manner.  This interleaving provides better results than separated workflows.

Reasoning traces help the model induce, track, and update action plans as well as handle exceptions, while actions allow it to interface with external sources, such as knowledge bases or environments, to gather additional information. 

* [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) - March 2023

#### Reasoning Trace

A documented sequence of logical steps generated by an agent that explains its thought process in arriving at a decision or conclusion.

In the context of intelligent software agents, reasoning traces provide transparency into an agent's decision-making, allowing users and developers to understand how and why particular actions were chosen. Reasoning traces are a key component of the ReAct framework, where they are interleaved with actions to improve performance and explainability. In this course, students implement agents that generate reasoning traces to make their behavior more interpretable and trustworthy.

**Example:** When analyzing a complex dataset, a student's agent might produce a reasoning trace that outlines its approach: "First, I'll check for missing values in the dataset. Then, I'll examine the distribution of each variable. Based on those distributions, I'll select appropriate statistical tests for the hypothesis."

#### Retrieval Augmented Generation (RAG)

A hybrid approach that enhances language model outputs by retrieving relevant information from external knowledge sources before generating responses.

In the context of intelligent software agents, RAG systems address the limitation of fixed knowledge in pre-trained models by dynamically incorporating domain-specific or up-to-date information during inference. This approach allows agents to leverage both the reasoning capabilities of language models and accurate, specific knowledge from external sources. In this course, RAG techniques are used to combine public knowledge (encoded in LLMs) with private knowledge sources specific to particular domains or organizations.

**Example:** A student implementing an agent for academic research assistance might use RAG to retrieve information from course materials and research papers before generating responses, ensuring the agent provides accurate and relevant guidance based on the latest scholarship.

#### Rules Engine

A software system that manages and executes a set of business rules in a runtime production environment. 

Rules engines separate business logic from application code by allowing rules to be defined, stored, and managed independently. Rules engines evaluate conditions against input data and execute corresponding actions when conditions are met, enabling non-technical users to modify business logic without changing the underlying application code.

Key components typically include:

1. A rule repository for storing and managing business rules
2. A rule authoring interface for creating and modifying rules
3. A rule execution engine that evaluates conditions and triggers actions
4. Working memory that holds the data being evaluated against the rules

Rules engines are commonly used in complex decision-making systems, regulatory compliance, fraud detection, pricing strategies, and other scenarios where business logic frequently changes or requires transparency.

#### Sandboxed Environment

A secured, isolated execution context that constrains the resources, capabilities, and potential impact of code generated by an artificial intelligence system.

In the context of intelligent software agents, sandboxed environments provide essential protection when working with code agents or any system that executes dynamically generated code. They establish boundaries around what operations can be performed, what files can be accessed, and what system resources can be utilized, mitigating the risk of unintended or malicious behaviors. In this course, sandboxed environments are used when implementing code agents to ensure safe execution of agent-generated Python code.

**Example:** To safely deploy their code agent in a production setting, a student would configure a sandboxed environment that allows the agent to process data and generate insights without having access to sensitive system files or network capabilities.

#### SmolAgents

A lightweight agent framework developed by HuggingFace designed for efficient creation and deployment of language model-powered agents.

In the context of intelligent software agents, SmolAgents provides a streamlined approach to agent development that reduces unnecessary abstraction layers while maintaining flexibility for implementing various agency levels. The framework supports multiple agent types, including specialized code agents that can generate and execute Python code directly. In this course, SmolAgents serves as the primary framework for implementing and experimenting with different agent architectures.

**Example:** Using the SmolAgents library, a student might implement a basic agent that uses the `FinalAnswerTool` to provide responses, then progressively enhance it to a code agent capable of writing and executing Python functions to solve more complex problems.

#### Token Generation Rate

The speed at which a language model produces new text elements, measured in tokens per second during the inference process.

In the context of intelligent software agents, token generation rate is a critical performance metric that directly impacts the responsiveness and usability of agent systems. Higher generation rates result in more fluid interactions and shorter response times, particularly important for interactive applications. In this course, token generation rate is a consideration when deploying models locally using Ollama, with adequate GPU hardware enabling rates of 50+ tokens per second for models like DeepSeek R1.

**Example:** A student might observe that after optimizing their local environment, their agent built on DeepSeek R1 achieves a token generation rate of 55 tokens per second, making it suitable for real-time coding assistance tasks that require prompt responses.

#### Tool

An atomic function used by an agent. 

To be used by an LLM, tools needs a few attributes that constitute its API and will be used to describe to the LLM how to call this tool.  Here  are the four key attributes a tool needs:

1. A tool name - this is usually the name of a python function
2. A description - this comes from the Python Docstring
3. Input parameter names, types and descriptions which include descriptions of enumerated values
4. An output format including types and how errors are returned

* See also: [Docstring](#docstring)
* See also: [Decorator](#decorator)

#### Tool Calling

Letting an LLM call a specific function usually with specific patterns.

**Example:** Let an LLM call a function to get similar text to a question from a knowledge base.

* See also: [Tool](#tool)
* See also: [Docstring](#docstring)
* See also: [Decorator](#decorator)

#### Tool Catalog

A comprehensive inventory of functions, APIs, or services available for an agent to utilize when performing tasks.

In the context of intelligent software agents, tool catalogs serve as the interface between an agent's reasoning capabilities and the external world. A well-designed tool catalog provides the agent with clearly defined operations it can perform, complete with detailed metadata about each tool's purpose, required parameters, and expected outputs. In this course, tool catalogs are typically implemented using Python functions decorated with `@tool` and accompanied by descriptive docstrings.

**Example:** When building an agent to assist with data analysis tasks, a student would first create a tool catalog containing functions for data loading, transformation, statistical analysis, and visualization, each documented with proper parameters and return types.

