# Building the Bolt.new UI

As I anticipate my technical interview at Bolt, I decided to practice building the Bolt.new user interface from scratch. The purpose of doing this was to ensure my design and React development skills are sharp before my interviews.

Roughly ~65% of the code is hand-written, as many technical interviews rely on ingrained knowledge and memory, and limit the use of search and LLMs.

As the project's foundation was laid by hand (i.e., core abstractions and design patterns), iterating with AI became easier and, honestly, much more tempting.

I used AI coding assistance for Q&A, generating/formatting mock data, and executing straightforward but comprehensive refactors that were easily verifiable (e.g., ensuring HTML semantics were correct; auditing accessibility concerns, etc.).

While I worked, my design ideas exceeded my ability to build by hand, given the time constraints. I felt more interested in expressing those ideas than in sticking to handwritten purity. Adopting AI for UI coding assistance in the back half of this project helped me rapidly build and iterate.

In total, I spent approximately 25 hours on this project.

I believe that what I’m sharing is a genuine expression of my 18 years of design and development experience, and I’m eager to know what you all think.

## Design Decisions

### Base Tailwind Styles

I relied on base Tailwind styles (e.g., colors, typography, spacing) for rapid prototyping. This introduces acknowledged design deviations from the Bolt interface.

### Database UI

Databases are a core part of the application development workflow. As such, I think it’s sensible to include it as part of the core workbench interface, rather than inside a dialog.

Keeping the database available in the workbench prevents unnecessary context switching between interfaces, which may help keep users in flow while building.

I adopted the same UI as the code editor for convenience and utility. Keeping all database columns accessible in the left sidebar reduces clicks when switching between them.

### Mobile UI

I adopted a common bottom navigation interface pattern for mobile, making it easy for users to switch between app sections.

Using a simple grid layout allowed me to elegantly collapse the application interface across breakpoints, providing a decent mobile experience.

I allowed the application to be installed as a PWA, which bridges the gap between where Bolt currently sits (i.e., primarily a desktop application) and where Bolt can emerge (i.e., as a mobile application).

Many minor UX improvements have been made on mobile to ensure a usable experience.

### Accessibility

I took the liberty of deviating from some of the Bolt interface styles to ensure my implementation conforms with WCAG AA accessibility standards.

I put extra effort into ensuring the entire interface is accessible via keyboard navigation.

### Colors

Associating colors with actions (e.g., save, cancel) helps users understand the intent of each action at a glance. I reserved red for destructive actions (e.g., cancel) and green for primary non-destructive actions.

Associating colors with states (e.g., the currently selected state) helps users understand the application's state at a glance. I used blue to indicate all currently selected interface elements.

## Architectural Decisions

### Custom Components

I wrote most of the components in this application myself, rather than reaching for a component library such as Base UI, Radix, etc. The purpose of those decisions was to push myself to think through and work with the numerous edge cases that arise with complex components.

One exception I made was for the Dialog component, which I used Base UI for. Dialogs are a particularly tricky component to design and implement, which is why I made this decision.

## Next Steps

### State Management

Application state is primarily managed with useState . This works for prototyping, but as the application moves from prototype to production, the stateful architecture will need to evolve. I would investigate React-native state management first, such as context providers, then look at external libraries.

### Testing with Vitest and Playwright

Tests should be added for all core user interface interactions to prevent bugs and regressions.

### Improve Keyboard Navigation

The keyboard navigation experience could be enhanced by adding a common "CMD/CTRL+K" interface that facilitates quicker navigation and interaction with the application.

### Virtualization

Virtualization/lazy loading should be used in areas where large lists are expected, such as the workbench code editor, file tree, or database editor.

### Leverage a Component Library

Instead of writing components from scratch, leverage components from a well-supported component library, such as [Base UI](https://base-ui.com/) or [Radix](https://www.radix-ui.com/).

### Add AI Harnesses

Different harnesses can be added to this project depending on how AI-assisted coding agents will be iterating on it. This may come in the form of Cursor rules, skills, AGENTS.md , inline JSDOC comments, etc.

Regardless of what harnesses are added, we should ensure the following:

- Agents always use semantic color tokens defined in index.css and never default Tailwind color class names.
- Agents should conform to WCAG accessibility guidance for color contrast and keyboard navigation.

## Omitted Implementation Details

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
npm run dev
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
