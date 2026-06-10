# Development Workflow

## Branching

- `main` stays releasable.
- Feature branch format: `feature/<issue-number>-short-name`.
- Fix branch format: `fix/<issue-number>-short-name`.

## GitHub Issues

Create an issue before implementation with:
- user value
- acceptance criteria
- test plan
- affected areas

Suggested labels:
- `feature`
- `bug`
- `backend`
- `frontend`
- `design`
- `docs`

## Pull Requests

Every PR must include:
- summary
- screenshots for UI changes
- test results
- linked issue
- self-review checklist

## Self-Review Checklist

- No direct frontend API calls outside `app/services`.
- Store has loading and error states.
- Server input is validated.
- Role access is explicit.
- UI works in light and dark mode.
- Text fits on mobile.
- No unrelated refactors.
- `typecheck`, `lint`, `build`, and `prisma validate` were run or blockers are documented.
