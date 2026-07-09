# Memory & Documentation Sync Workflow

> [!IMPORTANT]
> **Privacy Note**: The Obsidian memory vault (`obsidian_memory_vault/`) and sync scripts contain private execution logs, user prompts, and internal reasoning. They must **NEVER** be pushed to public git repositories. Ensure they are listed in `.gitignore`.

Whenever a feature, refactor, or bugfix is completed, the agent must keep the project memory and documentation updated:

1. **Obsidian Graph Sync**: Always run `python scripts/sync_memory.py` in the workspace terminal before completing the task. This parses log transcripts into `obsidian_memory_vault/` to update the user's Graph Memory.
2. **AI-Generated Documentation Update**: Update the relevant markdown files inside `docs/` to reflect any new features, layout changes, or architecture updates.
3. **Agent Rules Update**: Update `AGENTS.md` (or `.agents/AGENTS.md` if present) with any critical lessons, constraints, or new rules learned during the task, ensuring subsequent New Chat sessions inherit this context.
