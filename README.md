# Building the Bolt.new UI

As I anticipate my technical interview at Bolt, I decided to practice building the Bolt.new user interface from scratch. The purpose of doing this was to ensure my design and React development skills are sharp before my interviews.

Roughly ~65% of the code is hand-written, as many technical interviews rely on ingrained knowledge and memory, and limit the use of search and LLMs. The foundational layers, including types, utility functions, primitive components, the custom dropdown system, and the state architecture, were designed and written by hand. AI was used for execution within that structure.

As the project's foundation was laid by hand (i.e., core abstractions and design patterns), iterating with AI became easier and, honestly, much more tempting.

I used AI coding assistance for Q&A, generating/formatting mock data, and executing straightforward but comprehensive refactors that were easily verifiable (e.g., ensuring HTML semantics were correct; auditing accessibility concerns, etc.).

While I worked, my design ideas exceeded my ability to build by hand, given the time constraints. I felt more interested in expressing those ideas than in sticking to handwritten purity. Adopting AI for UI coding assistance in the back half of this project helped me rapidly build and iterate.

In total, I spent approximately 25 hours on this project.

I believe that what I'm sharing is a genuine expression of my 18 years of design and development experience, and I'm happy to share it with you all.

## Design Decisions

### Base Tailwind Styles

I relied on base Tailwind styles (e.g., colors, typography, spacing) for rapid prototyping. This introduces acknowledged design deviations from the Bolt interface.

### Database UI

Databases are a core part of the application development workflow. As such, I think it's sensible to include it as part of the core workbench interface, rather than inside a dialog.

Keeping the database available in the workbench prevents unnecessary context switching between interfaces, which may help keep users in flow while building.

I adopted the same UI as the code editor for convenience and utility. Keeping all database tables and rows accessible in the left sidebar reduces clicks when switching between them.

### Mobile UI

I adopted a common bottom navigation interface pattern for mobile, making it easy for users to switch between app sections.

Using a simple grid layout allowed me to elegantly collapse the application interface across breakpoints, providing a solid mobile experience.

I allowed the application to be installed as a PWA, which bridges the gap between where Bolt currently sits (i.e., primarily a desktop application) and where Bolt can emerge (i.e., as a mobile application).

Many minor UX improvements have been made on mobile to ensure a usable experience.

### Accessibility

I took the liberty of deviating from some of the Bolt interface styles to ensure my implementation conforms with [WCAG AA](https://www.w3.org/WAI/WCAG2AA-Conformance) accessibility standards.

I put extra effort to ensure the entire interface is accessible via keyboard navigation.

### Colors

Associating colors with actions (e.g., save, cancel) helps users understand the intent of each action at a glance. I reserved red for destructive actions (e.g., cancel) and green for primary non-destructive actions (e.g., save).

Associating colors with states helps users understand the application's state at a glance. I used blue to indicate all currently selected interface elements.

## Architectural Decisions

### Component Hierarchy

The components in this application are organized into four distinct layers, each with a clear responsibility boundary:

- **Primitives:** `Button`, `ToggleButton`, `SearchInput`, `CollapseToggle` — generic, reusable building blocks with no business domain knowledge
- **Compound components:** the custom Dropdown system (`Dropdown`, `DropdownTrigger`, `DropdownItem`, `DropdownSubmenuItem`, etc.) — interaction-complete and context-aware, but still domain-agnostic
- **Feature components:** `ChatForm`, `WorkbenchDatabase`, `WorkbenchLeftSidebar` — domain-specific compositions of primitives and compound components
- **Layout and orchestration:** `App`, `WorkbenchCodebase`, `WorkbenchContainer` — responsible for wiring, data flow, and pane visibility

Organizing components this way makes it easier to reason about where a change belongs and avoids coupling domain logic to reusable UI patterns.

### Custom Components

I wrote most of the components in this application myself, rather than reaching for a component library such as [Base UI](https://base-ui.com/) or [Radix](https://www.radix-ui.com/). This helped me think through and work with the numerous edge cases that arise with complex components.

One exception I made was for the Dialog component, which I used Base UI for. Dialogs are a particularly tricky component to design and implement, which is why I made this decision.

### Variant Management with CVA

`Button` uses [cva](https://cva.style/docs) (Class Variance Authority) to encode its variant matrix as a typed data structure rather than ad-hoc conditional strings. This makes variants predictable, type-safe, and easy to extend without introducing regressions across other variants.

### Dropdown Context Pattern

Rather than threading a `close` callback through every nested dropdown item, `DropdownTrigger` provides a `DropdownTriggerCloseContext` that any descendant can consume. This inverts control: the trigger owns the close behavior, and consumers opt in when they need it. This keeps the prop surface of individual dropdown items clean and makes the system straightforward to extend.

### Pane Visibility Strategy

`WorkbenchCodebase` and `WorkbenchDatabase` are kept mounted and toggled via CSS rather than conditionally rendered. Unmounting a pane on every switch would reset scroll position, discard form state, and force the `@pierre/diffs` diff viewer to re-initialize, all of which would create a noticeably degraded user experience. Keeping them mounted preserves that state at the cost of slightly higher memory usage, which is an acceptable trade-off for a prototype workbench-style interface.

### Semantic Design Tokens

`index.css` uses Tailwind v4's `@theme` directive to define semantic CSS custom properties (`--color-surface`, `--color-text-heading`, `--color-focus-ring`, etc.) backed by the CSS `light-dark()` function. This means dark mode support is resolved at the token level rather than the component level.

Any new component that uses the semantic tokens gets correct light and dark mode styles without needing to apply dark-mode variant classes.

### Type System

`src/types/` organizes domain contracts by concern: `navigation.ts`, `chat.ts`, `workbench.ts`, and `user.ts`. All mock data in `src/data/` conforms to these types.

When a real API layer is introduced, these types serve as the integration boundary, then service functions can be swapped in without touching any component that consumes the data.

## Next Steps

### Add AI Harnesses

Different harnesses can be added to this project depending on how AI-assisted coding agents will be iterating on it. This may come in the form of rules, skills, AGENTS.md , inline JSDOC comments, documentation, etc.

Harnesses should be scoped appropriately, with global conventions belonging in root-level rules, and subsystem-specific conventions belonging in directory-level rules or inline documentation.

The AI harnesses should work at four levels:

1. **Discovery:** Help agents find the right files, types, patterns, and best practices.
2. **Decision:** Help agents choose the right approach when making decisions.
3. **Execution:** Help agents execute changes correctly and efficiently.
4. **Verification:** Help agents verify the correctness of the changes.

We should always enforce the following:

- Agents must use semantic color tokens defined in index.css and never default Tailwind color class names.
- Agents must conform to WCAG accessibility guidance for color contrast and keyboard navigation.
- Agents must follow the four-layer component hierarchy (e.g., primitives, compound, feature, layout) documented in [Component Hierarchy](#component-hierarchy).
- Agents must import and conform to the domain types defined in `src/types/`. Ad-hoc type definitions for data that already has a type are not permitted.
- Agents must use CVA when adding or modifying component variants.
- Agents must follow a clear state management escalation pattern. Local state is implemented with `useState`, shared UI state is implemented with React Context, and server state is implemented with a library like [TanStack Query](https://tanstack.com/query/latest).
- Agents must follow the existing naming conventions for components, hooks, and utility functions.
- Agents must run `npm run lint` and `npm run typecheck` after making changes.
- Agents must write tests for changes following the test coverage pattern.
- Agents must write documentation for changes following the documentation pattern.
- Agents must write inline comments for changes following the comment pattern.

### State Management

Application state is primarily managed with `useState`, which is appropriate for a prototype. As the application grows, I'd evolve the state architecture in deliberate steps: use React Context for shared UI state that doesn't warrant a library — the existing `DropdownTriggerCloseContext` demonstrates this pattern already works well — then introduce a library like [TanStack Query](https://tanstack.com/query/latest) for server state once a real backend is wired in, and only reach for a lightweight store like [Zustand](https://zustand-demo.pmnd.rs) if prop drilling through context becomes unmanageable.

The goal is to match the state solution to the actual complexity, not anticipate it prematurely.

### API Integration Layer

The mock data in `src/data/` already conforms to the typed domain contracts in `src/types/`. The natural next step is to introduce a thin service layer where functions that currently return mock constants and will eventually call a real API. Components would consume those services rather than importing mock data directly, so no component needs to change when the backend is wired in.

### Testing with Vitest and Playwright

Tests should cover three layers: unit tests for the utility functions in `src/utils/` (the tree traversal, database, and formatting functions are already pure and easily testable), component interaction tests for the custom Dropdown system and `ChatForm` where the interactions are non-trivial, and E2E tests via Playwright for critical user paths such as submitting a chat message, switching workbench panes, and keyboard navigation.

### URL Routing

Navigation is currently managed entirely as UI state in `App`, which works well for a single-page workbench. When deeper linking becomes necessary, such as allowing users to share a link to a specific project or workbench pane, React Router can be layered in without restructuring the component tree, since `App` already owns navigation state cleanly.

### Improve Keyboard Navigation

The keyboard navigation experience could be enhanced by adding a common "CMD/CTRL+K" interface that facilitates quicker navigation and interaction with the application.

### Virtualization

Virtualization/lazy loading should be used in areas where large lists are expected, such as the workbench code editor, file tree, or database editor.

### Leverage a Component Library

Instead of writing components from scratch, leverage components from a well-supported component library, such as [Base UI](https://base-ui.com/) or [Radix](https://www.radix-ui.com/).

### Use CVA Everywhere

Class variance authority (CVA) is currently only used for the `Button` component. This should be expanded to all components that have variants.

## Omitted Implementation Details

I scoped this prototype to the core workbench interface. The following features exist in the production Bolt interface but were intentionally omitted

- Settings dialog
- Comprehensive database UI (e.g., logs, security audit, advanced)
- Full chat UX (e.g., plan execution, plan interaction)
- Manual light/dark theme switching
- Robust code editor support

## Getting Started

This project is built with [Vite](https://vite.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/) and is deployed via [Netlify](https://www.netlify.com/).

### Install Dependencies

```bash
npm install
npm run setup
```

### Development Server

```bash
npm run dev
```

### Code Quality

```bash
npm run format
npm run lint
npm run typecheck
```
