# Glossary of Terms

#### Agent

An autonomous computational entity that performs tasks on behalf of users or other programs with some degree of independence or autonomy, and in doing so, employs a precise [knowledge representation](#knowledge-representation) of the user's goals or desires.

Agents are similar to the use of complex [rules engines](#rules-engine) but they have a higher degree of independence or autonomy.

* See also: [Rules Engine](#rules-engine)

#### LLM Agents

A specialized type of software [agent](#agent) where LLM outputs control the workflow.

Note that "agency" evolves on a continuous spectrum, as you give more or less power to the LLM on your workflow.

#### DeepSeek R1

#### ISO Definition

A term definition is considered to be consistent with ISO metadata registry guideline 11179 if it meets the following criteria:

1. Precise
2. Concise
3. Distinct
4. Non-circular
5. Unencumbered with business rules

#### Knowledge Representation

The methods and structures used to encode information about the world.

In this book, we focus on knowledge representation in a form that an agent can utilize for reasoning and decision-making. It provides the foundation for an agent's understanding of its environment, goals, and possible actions.

Knowledge representation encompasses:

1. **Symbolic Structures**: Formalized frameworks such as ontologies, semantic networks, frames, rules, or logic-based systems that capture entities, relationships, and constraints in the agent's domain.

2. **Information Organization**: Methods for structuring knowledge in ways that facilitate efficient access, inference, and updates as the agent interacts with its environment.

3. **Reasoning Mechanisms**: Techniques that allow agents to derive new knowledge from existing representations, evaluate truth values, and make decisions based on incomplete information.

4. **Semantic Grounding**: Connections between abstract symbols and their real-world referents, allowing the agent to map internal representations to external phenomena.

Effective knowledge representation systems in agents balance expressiveness (the ability to represent complex knowledge) with computational efficiency (allowing the agent to reason within reasonable time and resource constraints).

#### Large Language Model

#### LLM Agent Control Levels

The amount you allow an LLM to control agentic execution.
Her are some sample levels:

Level 0 - LLMs have no control
Level 1 - LLMs can impact an if/then/else decision
Level 2 - LLMs determine what functions should be called
Level 3 - LLMs control iteration, and program order and continuation
Level 4 - LLMs can start another agentic workflow
Level 5 - LLMs can generate new code and run it

* See also: [HuggingFace Agent Definition](https://huggingface.co/docs/smolagents/conceptual_guides/intro_agents)

#### Ollama

A software framework that enables deployment and execution of large language models (LLMs) locally on personal computing devices, designed to optimize resource utilization and provide standardized interfaces for model management, inference, and integration with agent-based systems.

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

#### Tool Calling

Letting an LLM call a function.

**Example:** Let an LLM call a function to get similar text to a question from a knowledge base.