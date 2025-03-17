# LLM Control Levels

**Level 0 - No Control**: LLMs function purely as information processors, generating outputs with no ability to influence program execution. All workflows and decisions are predetermined by human-written code.

**Level 1 - Decision Support**: LLMs can influence conditional branches in existing workflows, essentially acting as a sophisticated decision-making component that determines which predefined path to take based on analysis.

**Level 2 - Function Selection**: LLMs can select and call specific functions from a predefined tool catalog based on their understanding of the task. The agent chooses which tools to use but operates within a fixed set of capabilities.

**Level 3 - Flow Control**: LLMs determine not just which functions to call but also the order, frequency, and conditions for termination. They control program flow, deciding when to loop, continue, or conclude a process.

**Level 4 - Workflow Initiation**: LLMs can spawn additional agent workflows, effectively creating sub-agents to handle specialized tasks. This enables complex hierarchical problem-solving with task delegation.

**Level 5 - Code Generation**: LLMs can write, execute, and evaluate original code in real-time, essentially programming themselves to solve novel problems beyond their predefined toolset, as seen in current IDEs like Cursor and Windsurf and SmolAgents' CodeAgent.