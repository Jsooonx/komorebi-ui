# Memory & Documentation Sync Workflow

> [!IMPORTANT]
> **Privacy Note**: The Obsidian memory vault (`obsidian_memory_vault/`) and sync scripts contain private execution logs, user prompts, and internal reasoning. They must **NEVER** be pushed to public git repositories. Ensure they are listed in `.gitignore`.

Whenever a feature, refactor, bugfix, or workflow change is completed, the agent must keep the project memory and documentation updated:

1. **Obsidian Graph Sync**: Always run the memory sync script that matches the active agent before completing the task.
   For Codex sessions, run `python scripts/sync_codex_memory.py`.
   For Gemini / Antigravity sessions, run `python scripts/sync_memory.py`.
2. **AI-Generated Documentation Update**: Update the relevant markdown files inside `docs/` to reflect any new features, layout changes, or architecture updates.
3. **Agent Rules Update**: Update `AGENTS.md` (or `.agents/AGENTS.md` if present) with any critical lessons, constraints, or new rules learned during the task, ensuring subsequent New Chat sessions inherit this context.
4. **GitHub Push**: After docs and memory are updated, push the finished change set to GitHub so the remote branch stays current.

## Current Project Policy

- Every change must update both project documentation and memory before the task is considered complete.
- The required completion order is: make changes -> update `docs/` -> run the matching memory sync -> push GitHub.
- Private memory artifacts inside `obsidian_memory_vault/` and the sync implementations in `scripts/sync_memory.py` and `scripts/sync_codex_memory.py` must remain unpushed.
