# Code Review Standard

Review in this order:

1. Correctness and data integrity.
2. Authorization and validation.
3. UX regressions and accessibility.
4. Type safety and maintainability.
5. Performance and unnecessary network/database work.
6. Documentation and test coverage.

Findings should include:
- severity
- file and line
- risk
- suggested fix

Prefer small PRs that map to one issue. Keep commits focused and explain why the change exists.
