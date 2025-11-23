# .agent_workspace — Agents Working Area

Intended use:

- This folder is an isolated workspace for agents to leave drafts, notes, proofs-of-concept, and temporary files.
- Nothing here should be promoted to production without human review and a clear entry in `AGENT_LOG.md`.

Quick rules:

- Allowed files: notes, experiment files prefixed with `EXP_`, local logs, screenshots, temporary artifacts.
- Prohibited files: secrets/keys, final production builds, assets that will replace production without review.
- Prefix experimental files with `EXP_` and document their purpose in an internal README.

Recommended flow:

1. Create `/.agent_workspace/EXP_<name>` for an experiment.
2. Log the experiment start in `AGENT_LOG.md`, including objective and files created.
3. When finished, record results in `AGENT_LOG.md`. Do not move artifacts to `src/` without human review.

Cleanup:

- Keep this directory tidy; remove old artifacts when no longer needed and note the cleanup in the log.
