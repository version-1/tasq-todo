# Plan: Simple Todo App (React + TypeScript)

## Goal

Build a simple, client-only Todo application with React and TypeScript that
lets a user add, edit, complete, delete, and filter todos, with data persisted
in the browser via localStorage. The codebase should keep state/logic separated
from UI, be covered by unit and component tests, and be verified automatically
in CI.

## Confirmed Decisions

| Topic       | Decision                                            |
| ----------- | --------------------------------------------------- |
| Build tool  | Vite (React + TypeScript template)                  |
| Persistence | localStorage (no backend)                           |
| Features    | Add / toggle complete / edit / delete / filter      |
| Styling     | Plain CSS with CSS Modules (no UI library)          |
| Testing     | Vitest + React Testing Library, ESLint + Prettier   |
| CI          | GitHub Actions running lint, typecheck, and tests   |

## Scope

### In scope

- Single-page Todo app: create, edit title, toggle completion, delete
- Filter views: All / Active / Completed
- Persistence across page reloads via localStorage
- Separation of concerns: domain types and state logic independent of UI components
- Unit tests for state/domain logic; component tests for the main user flows
- Lint, format, and typecheck tooling
- CI workflow that runs lint, typecheck, and tests on push / pull request

### Out of scope

- Backend API, authentication, or multi-user support
- Due dates, priorities, tags, drag-and-drop reordering
- Routing / multiple pages
- E2E tests (Playwright etc.)
- Deployment / hosting setup
- i18n, dark mode, offline sync beyond localStorage

Out-of-scope items are deliberately deferred, not forgotten; revisit them only
as explicitly requested follow-ups.

## Task List

Tasks are ordered as vertical slices. Each slice includes its own tests where
applicable.

### T1. Project scaffolding and tooling

Set up the Vite React + TypeScript project with ESLint, Prettier, Vitest, and
React Testing Library configured, plus npm scripts for dev, build, lint,
typecheck, format, and test.

**DoD**
- Dev server starts and shows the default page
- `lint`, `typecheck`, `test`, and `build` scripts all pass on a clean checkout
- Strict TypeScript settings are enabled

### T2. Domain model and todo state logic

Define the Todo domain type and the state transitions (add, toggle, edit,
delete, filter selection) as pure, UI-independent logic. This is the contract
layer the UI and persistence build on.

**DoD**
- All state transitions exist as pure functions/logic with no React or DOM dependency
- Unit tests cover each transition, including edge cases (empty title, unknown id, toggling twice)
- `test` and `typecheck` pass

### T3. Add and list todos (UI slice)

First visible feature: an input to add a todo and a list that renders current
todos, wired to the state logic from T2.

**DoD**
- A user can type a title and add a todo; it appears in the list
- Empty or whitespace-only input is rejected without adding an item
- Component test covers the add-and-display flow
- `lint`, `typecheck`, `test` pass

### T4. Toggle completion

A user can mark a todo as completed and back, with a clear visual distinction
for completed items.

**DoD**
- Toggling updates both the visual state and the underlying data
- Component test covers toggle on and off
- Existing tests still pass

### T5. Edit todo title

A user can change the title of an existing todo and confirm or cancel the edit.

**DoD**
- Editing updates the title; cancel leaves it unchanged
- Confirming an empty title is rejected (item keeps its previous title)
- Component test covers edit-confirm and edit-cancel
- Existing tests still pass

### T6. Delete todo

A user can remove a todo from the list.

**DoD**
- Deleted item disappears from the list and from state
- Component test covers deletion
- Existing tests still pass

### T7. Filter views (All / Active / Completed)

A user can switch between the three filter views; the active filter is
visually indicated.

**DoD**
- Each filter shows exactly the matching subset
- Unit tests cover the filtering logic; a component test covers switching filters
- Existing tests still pass

### T8. localStorage persistence

Todos survive a page reload. Persistence is isolated behind a small storage
boundary so the state logic stays storage-agnostic.

**DoD**
- Adding/editing/toggling/deleting then reloading the page restores the same list
- Corrupt or missing stored data falls back to an empty list without crashing
- Tests cover save/load round-trip and the corrupt-data fallback
- Existing tests still pass

### T9. Styling pass

Apply CSS Modules styling for a clean, usable layout: input area, list,
filters, and completed-item appearance.

**DoD**
- All interactive elements are styled and usable on desktop and narrow (mobile-width) viewports
- No inline style sprawl; styles are scoped per component
- `build` succeeds; visual check of the main flows in the dev server

### T10. CI workflow

GitHub Actions workflow that runs lint, typecheck, and tests on push and pull
request.

**DoD**
- Workflow runs automatically on push / PR and passes on the pull request branch
- A deliberate lint or test failure makes the workflow fail (verified once, then reverted)

## Dependencies

- T1 blocks everything else
- T2 blocks T3–T8
- T3 blocks T4, T5, T6, T7 (they extend the rendered list); T4–T7 are mutually independent after T3
- T8 depends on T2 for the storage boundary, and on T4–T6 for its DoD: verifying reload after add/edit/toggle/delete requires those operations to exist in the UI
- T9 can run any time after T3, ideally last; T10 only requires T1 (it runs the scripts set up there) but is most useful once tests exist

## Risks

- **localStorage schema drift**: once users have stored data, changing the Todo
  shape needs a fallback/migration story. Mitigated by the corrupt-data
  fallback in T8; keep the stored shape minimal.
- **Scope creep**: Todo apps invite "one more feature". The out-of-scope list
  is the guard; new features require an explicit scope change.
- **UI/state coupling**: if state logic leaks into components, T2's tests lose
  value. Reviewer should check that transitions stay UI-independent.

## Open Questions

None blocking. Deferred decisions intentionally left to the Implementer:
exact state management mechanism (component state vs. reducer vs. context),
component file layout, and test file organization — all within the constraint
that state logic remains pure and UI-independent.
