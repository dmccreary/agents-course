# Project Rules for Intelligent Agents Course

These rules should be loaded into the LLM Projects area to provide context when
we are generating content or code.

## Definition Rule

When we ask for an ISO definition of a term or concept, always give use a term that follows the ISO 11179 metadata registry guidelines for terms.  These definitions should be:

1. Precise - use words in the definition that have unambiguous meaning
2. Concise - use the fewest words that will still provide a clear definition
3. Distinct - check with the glossary.md file in the project to make sure the term is distinct from other terms
4. Non-circular - do not place the term in the definition
5. Unencumbered with business rules - do not places business rules within the definition
6. Singular form - do not use plurals for terms

After you define the term in 1 or 2 sentences, create a new paragraph and give some context of why this term is relevant to a course on intelligent software agents.  Then create a new paragraph that begins with **Example: ** and provide and example of usage within this context.

Place the term in a level 4 markdown header.

Example:

#### Graphics Processing Unit

A specialized device designed to accelerate matrix operations using parallel processing.

In the context of intelligent software agents, GPUs are relevant as they provide parallel processing capabilities that significantly accelerate machine learning model training and inference operations, enabling more complex and performant AI systems. The parallel architecture of GPUs allows for efficient matrix operations that form the computational backbone of many neural network implementations.

**Example:** When deploying a code agent for real-time coding tasks, a developer would typically configure the environment to utilize a GPU to ensure the agent can perform inference operations at sufficient speed, rather than relying solely on CPU processing.


## Python Code Generation Rules

When generating Python code, always provide a brief comment at the beginning of the code
that describes what the code should do.

When creating a python function that could be used by an agent, make sure
there is a docstring in the function that describes the name, description, input parameters and output type.

Add the decorator `@tool` when generating a function that can be used by an agent.