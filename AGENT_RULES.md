# Rules for All Agents

1. Do not change the folder architecture unless absolutely necessary.
2. Do not refactor without a documented technical justification (record the justification in `AGENT_LOG.md`).
3. Do not rewrite or replace essential code blocks without clear evidence of necessity and human approval.
4. Preserve the corporate branding and design guidelines of Monynha Softwares.
5. Log all activity in `AGENT_LOG.md` before and after any significant change.
6. Always leave concrete guidance for the next agent (steps, commands, context).
7. If in doubt, prefer not to modify and record the question in the log for human review.
8. Immediate technical prohibitions:
   - Do not add new dependencies without human approval.
   - Do not add keys or secrets to the repository.

Emergency procedures:
- If a change breaks the build, stop and record the incident immediately in `AGENT_LOG.md`, including steps to reproduce.

Operational recommendations:
- Use `/.agent_workspace` for experiments and drafts; clearly prefix any experimental file with `EXP_`.
- When an experiment is useful, record it in `AGENT_LOG.md` and move the artifact into a human-reviewed issue/PR instead of directly to production.

Responsibility:
- Every agent that makes changes must describe reasoning, expected impact, and tests performed in `AGENT_LOG.md`.
