# Design System

## Product Feel

AutoService Queue is an operational dashboard for repeated daily work. The interface should feel fast, clean, confident, and premium without becoming decorative.

## Layout

- Use a persistent sidebar on desktop.
- Keep primary work areas dense but readable.
- Prefer full-width sections and tables.
- Use cards only for repeated metrics, summaries, forms, and modals.
- Avoid nested cards and oversized marketing hero sections.

## Visual Style

- Palette: slate neutrals, cyan primary, emerald success, amber waiting, blue in repair, rose danger.
- Support dark mode everywhere.
- Use 8px or smaller radius for operational UI.
- Use Lucide icons for navigation and button actions.
- Avoid one-hue UI and decorative gradient blobs.

## Interaction Rules

- Forms should be close to the data they create.
- Table actions must be visible and predictable.
- Every async action needs loading/error feedback.
- Search is debounced by 500ms and only sends a query from 2 characters.
- Controls must remain usable on mobile widths.

## Page Standards

- Dashboard: quick scan of workload and status.
- Clients/Cars/Orders/Employees: search, form, table, actions.
- Queue: position-first view with fast position changes.
- Reports: operational counts and mechanic workload.
