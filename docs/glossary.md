# Glossary of Terms

#### Action

The process of calling a specific tool directly from within an agent.

In a multi-step agent, at each step, the LLM can write an action, in the form of some calls to external tools.  Tools much be carefully described so that agents can match their capabilities with the needs of a the user.

A common format (used by Anthropic, OpenAI, and many others) for writing these actions is generally different variations of "writing actions as a JSON of tools names, description and arguments to use, which you then parse to know which tool to execute and with which arguments".

#### Agent

An autonomous computational entity that performs tasks on behalf of users or other programs with some degree of independence or autonomy, and in doing so, employs a precise [knowledge representation](#knowledge-representation) of the user's goals or desires.

Agents are similar to the use of complex [rules engines](#rules-engine) but they have a higher degree of independence or autonomy.

* See also: [Rules Engine](#rules-engine)

#### Agntcy

A set of proposed standards for Agent interoperability.

* See [Agntcy on Perplexity](https://www.perplexity.ai/search/agntcy-c.tl7VIyRK.c2F.27VxeCg)

#### Business Process Modeling Notation

[BPMN References Guide](https://camunda.com/bpmn/reference/)

#### Decorator
A decorator is a design pattern implemented as a special syntax that allows a function, method, or class to be modified or extended without changing its source code. 

In this course, we use Python decorators with the @ symbol followed by a decorator name such as `@tool`  placed above the definition of the function to be decorated. 

They effectively wrap the target function, enabling pre-processing of arguments, post-processing of return values, modification of behavior, or registration within a larger system.

#### DeepSeek R1

A [large language model](#large-language-model) developed in China that uses an innovative architecture that combines mixture of experts with reinforcement learning to create smaller models at lower cost.

In this course we use a 7 billion parameter variant of DeepSeek R1 created by the [Ollama](#ollama) system that runs on a local GPU with only 12GB RAM but still generates over 50 tokens per second.

- See Also [DeepSeek R1 in Concepts](concepts/deepseek-r1.md)

#### ISO Definition

A term definition is considered to be consistent with ISO metadata registry guideline 11179 if it meets the following criteria:

1. Precise
2. Concise
3. Distinct
4. Non-circular
5. Unencumbered with business rules

#### Docstring

A docstring in Python is a string literal that appears as the first statement in a module, function, class, or method definition.

Python docstrings are enclosed by triple quotes (`"""` or `'''`) and can span multiple lines.

Docstrings combined with the `@tool` decorator are used to document the purpose, behavior, parameters, and return values of the code object. 

This approach allows agents to understand not just what functions are available, but when and how to use them appropriately based on their documented purpose and parameters.

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

#### Intelligent Textbook

An interactive digital learning resource that employs artificial intelligence to generate personalized educational content and adaptive learning experiences in response to individual student needs and progress.

In the context of intelligent software agents, intelligent textbooks represent an advanced application domain where multiple specialized agents collaborate to deliver customized educational experiences. These agents work together to analyze student performance, identify knowledge gaps, generate appropriate lesson content, create interactive simulations, and adapt teaching methodologies in real-time. The intelligent textbook serves as both a platform for agent integration and an interface through which students interact with these educational AI systems.

**Example:** A computer science student using an intelligent textbook to learn about data structures might receive dynamically generated lesson content on binary trees based on their previous interaction patterns, followed by an interactive coding simulation that adjusts its complexity based on the student's demonstrated proficiency, all orchestrated by specialized AI agents working in concert to optimize the learning experience.

#### Integrated Development Environment

A software application that provides comprehensive facilities to programmers for software development, combining multiple development tools into a single graphical user interface.

In the context of intelligent software agents, IDEs are relevant as they provide environments where code agents can be integrated to assist developers with tasks such as code completion, error detection, refactoring suggestions, and automated documentation. Modern IDEs often incorporate AI-powered features that enhance developer productivity by leveraging language models to understand code context and provide intelligent assistance.

**Example:** A developer working with a code agent might configure their IDE to seamlessly interact with the agent, allowing it to analyze code as it's being written, suggest improvements based on best practices, and even generate test cases automatically based on the function implementations.

* [Codium Windsurf](https://codeium.com/windsurf)
* [Lovable](https://lovable.dev/)
* [Cursor](https://www.cursor.com/en)

#### Knowledge Representation

The methods and structures used to encode information about the world.

In this book, we focus on knowledge representation in a form that an agent can utilize for reasoning and decision-making. It provides the foundation for an agent's understanding of its environment, goals, and possible actions.

Knowledge representation encompasses:

1. **Symbolic Structures**: Formalized frameworks such as ontologies, semantic networks, frames, rules, or logic-based systems that capture entities, relationships, and constraints in the agent's domain.

2. **Information Organization**: Methods for structuring knowledge in ways that facilitate efficient access, inference, and updates as the agent interacts with its environment.

3. **Reasoning Mechanisms**: Techniques that allow agents to derive new knowledge from existing representations, evaluate truth values, and make decisions based on incomplete information.

4. **Semantic Grounding**: Connections between abstract symbols and their real-world referents, allowing the agent to map internal representations to external phenomena.

Effective knowledge representation systems in agents balance expressiveness (the ability to represent complex knowledge) with computational efficiency (allowing the agent to reason within reasonable time and resource constraints).

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

#### LLM Agents

A specialized type of software [agent](#agent) where LLM outputs control the workflow.

Note that "agency" evolves on a continuous spectrum, as you give more or less power to the LLM on your workflow.

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

#### Model Context Protocol

An open protocol and standardized set of rules and data structures that govern the exchange of contextual information between an application programming interface (API) and a large language model (LLM).

The Model Context Protocol (MCP) defines how prompts, system instructions, session states, user interactions, and relevant contextual metadata are structured, transmitted, and maintained to ensure consistent and coherent model behavior across interactions.

Example:
In an AI chatbot API, a Model Context Protocol may define how user messages, past conversation history, user preferences, and domain-specific knowledge are encoded and sent to the LLM, ensuring that responses remain relevant and contextually aware.

- [Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [Cursor Model Content Protocol](https://docs.cursor.com/context/model-context-protocol)

#### Ollama

A software framework that enables deployment and execution of large language models (LLMs) locally on personal computing devices, designed to optimize resource utilization and provide standardized interfaces for model management, inference, and integration with agent-based systems.

We use Ollama in this course to enable us to run LLMs on a local GPU.

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

#### Rules Engine

A software system that manages and executes a set of business rules in a runtime production environment. 

Rules engines separate business logic from application code by allowing rules to be defined, stored, and managed independently. Rules engines evaluate conditions against input data and execute corresponding actions when conditions are met, enabling non-technical users to modify business logic without changing the underlying application code.

Key components typically include:

1. A rule repository for storing and managing business rules
2. A rule authoring interface for creating and modifying rules
3. A rule execution engine that evaluates conditions and triggers actions
4. Working memory that holds the data being evaluated against the rules

Rules engines are commonly used in complex decision-making systems, regulatory compliance, fraud detection, pricing strategies, and other scenarios where business logic frequently changes or requires transparency.

#### SmolAgents

An agent framework released by HuggingFace in December of 2024 with
the goal of creating a small efficient way to build agents

* [HuggingFace SmolAgents Docs](https://huggingface.co/docs/smolagents/index)

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

A list of the tools available for an agent to use.  Each tool must be described by a name, description and list of parameters and their possible data types and enumerated values.

In this course, the definition of Python functions that can be used by agents must have a [Docstring](#docstring) with the `@tool` annotation.