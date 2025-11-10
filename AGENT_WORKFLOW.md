# AGENT_WORKFLOW.md

## AI Agent Workflow Log

### Agents Used

* GitHub Copilot: Assisted with boilerplate code generation, function signatures, and inline suggestions.
* Claude Code: Used for complex TypeScript logic, refactoring, and generating clean architecture use-cases.
* Cursor Agent: Managed task-based code generation and step-by-step implementation.

### Prompts & Outputs

* **Example 1:** Copilot prompt for creating a route controller method:

```text
"Create a POST API in Express.js to add a shipping route with TypeScript and Prisma"
```

* Generated snippet included route handler, type validation, and Prisma call.

* **Example 2:** Claude Code prompt for computing compliance balance:

```text
"Write a TypeScript use-case to compute Compliance Balance for a ship given target intensity and fuel consumption. Follow hexagonal architecture."
```

* Initial output missed CB formula; refined prompt to include energy calculation.
* Final output correctly computed CB and returned results with TypeScript types.

### Validation / Corrections

* Reviewed generated code manually for type correctness and Prisma syntax.
* Added missing error handling and validation in some generated snippets.
* Verified endpoints with Postman to ensure functional correctness.

### Observations

* Copilot was excellent for repetitive boilerplate and controller scaffolding.
* Claude Code handled business logic generation better, especially for domain-specific formulas.
* Cursor Agent helped in incremental task-based coding and prevented large errors.
* Some outputs required prompt refinement; agents occasionally hallucinated Prisma method names or TypeScript types.

### Best Practices Followed

* Used Cursor’s task lists (`tasks.md`) for modular code generation.
* Copilot for inline completions in controllers and route handlers.
* Claude Code for complex use-case and domain logic generation.
* Always validated AI-generated code with tests and manual review.
* Iteratively refined prompts for correctness and clarity.
