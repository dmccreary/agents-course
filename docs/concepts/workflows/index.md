# Agentic Workflows

Here is a brief overview of the key workflows we use when building intelligent agents.

## Overview

## Prompt Iteration

![](./prompt-iteration.png)

- The LLM is trained on public knowledge but does not know anything about your goals, your products or your customers 
- A human decides if the response is OK
- The human is “trained” to write better prompts

## Prompt Enrichment from Knowledge Base (RAG)

![](./prompt-enrichment.png)

- In this model, we enrich your prompt with content from
a local knowledge based.
- The key to enrichment is to find the right content related
to the question in your prompt.
- Enriching your prompt with local knowledge is much more cost effective than fine tuning your own language model.

## Prompt Enrichment from Knowledge Graph

![](./knowledge-graph.png)

- In this workflow we replace the generic knowledge based with a knowledge graph that has similarity indexes on reinvent components
- Knowledge graphs store models of the real world with better precision than tabular data such as CSV files or flat files with per-query relational JOIN operations

## Matching a Developer Request to a Developer Tool

If you are a software developer and you want an agent to help
you the first task is to match your prompt to a tool.  So for example your prompt might be: "move these new files into the sims folder".  That would required the agent to use the unix "mv" command to move the files.

![](developer-tool.png)

The bottom row of the workflow above is a list of all the tools that the IDE agent knows how to use and how to call them with the right parameters.

## Matching a Developer Request to a Workflow

We can take this matching process one step further to
not just match a single tool, but a set of tools executing in a specific order.  For example you might need to first create a new directory and then move the files into that new directory.

![](./workflow-matcher.png)

Each of these "actions" will match not with a single command, but with a complex workflow of operations that can be executed and then tested for correctness.

Remember that workflows are graphs!  So what we are really doing is finding the nearness of a prompt to a region of the graph that has similar values in a vector store.

## The Role of Context

The primary use of the knowledge graph is to analyze the current state of a task and then bring in the right sections of the knowledge graph that are relevant to the contest.

We know that LLMs pay "attention" to the words around the last token in a sequence to predict the next token.  We need to apply the same attention systems to finding out what parts of the model of our world, the knowledge graph, is relevant to our task.

We also need some way of measuring conceptual distance and knowing that we don't have ANY match and inform the user that no appropriate tools have been found.

## The Reasoning Model

The way that we match these prompts to tools can be thought of as being done in steps.  The first step is to come up with a plan of action.  The second step is to execute those actions.

## Summary

One of the best ways to summarize this is that agents work with LLMs and tools to match prompts to regions of a knowledge graph.  Once a plan is created it can be executed and the result of that execution can be tested.  After the test pass we consider the workflow complete.