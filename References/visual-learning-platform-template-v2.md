# Visual Learning Platform Template

## For Jeff: How to Use This Document

When starting a new learning project with Claude, include this document in your prompt along with:

1. **The subject matter** you want to learn
2. **Your current knowledge level** in that subject
3. **Any specific aspects** you want to focus on

Example prompt:
```
I want to build a learning platform following the attached template [this document].

Subject: Kubernetes basics
Current level: I understand Docker containers but haven't used orchestration
Focus areas: Local development setup, core concepts, debugging failed deployments
Include: Sandbox with kubectl command practice, export to markdown
```

Claude will then build a platform matching this pattern with content appropriate to your subject.

### Customization Options

When prompting, you can specify:
- **Subject and scope** — what to cover, what to skip
- **Sandbox type** — SQL queries, CLI commands, code snippets, or none
- **Export needs** — markdown, print-friendly, both, or neither
- **Accessibility level** — full ARIA support or basic
- **Complexity** — full feature set or MVP only

### Related Documents

- **curriculum-authoring-guide.md** — Detailed guidance on writing effective learning content
- **deployment-guide.md** — Steps to deploy to OpenBSD httpd (or adapt for other servers)
- **learning-platform-scaffold/** — Ready-to-use code scaffold (unzip, edit config + curriculum, build)

---

## Platform Philosophy

This template is designed for a learner who:
- Learns best through **visual representations** of systems
- Thinks in terms of **boundaries and flows** (what contains what, what moves where)
- Values understanding **cause and effect** (if X fails, what are the possible causes?)
- Wants **interactive exploration** that becomes **static reference** after mastery
- Prefers **minimal maintenance** — learn once, reference later

---

## Mental Models Over Memorization

This platform prioritizes building **transferable mental models** over memorizing facts or procedures. A mental model is an internal representation of how something works that lets you reason about new situations — not just recall what you've seen before.

### What Makes a Good Mental Model

**Useful mental models:**
- Help you **predict** what will happen ("if I do X, then Y")
- Help you **debug** when things go wrong ("it failed, so the problem is probably at stage N")
- **Transfer** to related situations ("this works like that other thing I understand")
- Are **simpler than reality** but capture the essential dynamics

**Warning signs of a bad model (or model for model's sake):**
- It just restates facts in boxes and arrows
- You couldn't use it to explain something to someone else
- It doesn't help you answer "what if?" questions
- It's more complex than just remembering the thing directly

### The Three Model Types Map to Thinking Patterns

| Visualization | Mental Model Purpose | Thinking It Enables |
|---------------|---------------------|---------------------|
| **Data Flow** | "How does X get from A to B?" | Trace problems through stages. Predict where bottlenecks/failures occur. |
| **Concept Map** | "How do these things relate?" | See the family tree. Know which concept to reach for in a given situation. |
| **Fault Tree** | "Why did X break?" | Systematic debugging. Don't miss causes. Know fixes for each branch. |

### Test for Model Quality

Before finalizing a module, ask:

1. **Prediction test**: Can someone use this model to predict what happens in a scenario not explicitly covered?
2. **Debugging test**: If something goes wrong, does the model help narrow down where/why?
3. **Teaching test**: Could you use this model to explain the concept to someone else without additional notes?
4. **Transfer test**: Does this model connect to or resemble other models the learner already has?

If a diagram fails these tests, it's decoration, not a mental model. Either redesign it or question whether visualization is the right approach for that content.

### Connecting New Models to Existing Ones

When writing "Why This Matters" and reveals, explicitly connect to models the learner likely already has:

- "This works like a postal system — your query is a letter, the parser is the sorting facility..."
- "Think of RLS like a bouncer checking IDs — the database enforces the rules, not your app..."
- "This is the same pattern as a restaurant kitchen — orders come in, get processed in stages, results go out..."

Analogies are load-bearing. They're not decorative flourishes — they're how new mental models get anchored to existing ones.

---

## Core Structure

### Hierarchy

```
Platform
├── Categories (3-5 major topic areas)
│   ├── Modules (3-6 per category)
│   │   ├── Explanation (why this matters, what can go wrong)
│   │   ├── Visualization (one of three types below)
│   │   ├── Exercises (optional, with reference material)
│   │   └── Completion state (freezes to static reference)
```

### Three Visualization Types

Every module uses ONE of these visualization types, chosen based on what the content needs:

#### 1. Data Flow Diagram
**Use when:** Showing how something moves through a system, sequence of operations, request/response patterns

**Structure:**
- Nodes: boxes representing stages, components, or actors
- Edges: arrows showing direction of flow
- Node types with distinct colors:
  - `boundary` (blue): External systems, start/end points
  - `process` (orange): Transformations, operations, decision points  
  - `flow` (green): Data in transit, intermediate states

**Interaction:** Click nodes to reveal what happens at each stage

**Example subjects:** API request lifecycle, authentication flow, data pipeline stages, build/deploy process

#### 2. Concept Map
**Use when:** Showing how ideas relate hierarchically, categorizing related items, comparing options

**Structure:**
- Central concept in the middle
- Branches radiating out (4-6 branches typical)
- Each branch contains:
  - ID (unique identifier for reveal tracking)
  - Label (the concept name)
  - Details (1-2 sentence explanation)
  - Example (code snippet or concrete example, optional)
  - Children (sub-concepts, 3-5 items)

**Interaction:** Click branches to expand and reveal details

**Example subjects:** Types/categories of something, comparing approaches, feature breakdowns, decision frameworks

#### 3. Fault Tree
**Use when:** Teaching debugging, showing what can go wrong, troubleshooting guides

**Structure:**
- Root: The problem/failure state ("X doesn't work")
- Branches: Categories of causes
- Leaves: Specific causes, each with:
  - Cause name
  - Detail (why/how this happens)
  - Fix (concrete remediation step)

**Interaction:** Click fault categories to expand causes and fixes

**Example subjects:** Error debugging, migration risks, security vulnerabilities, performance problems

---

## Module Components

### Required for Every Module

```javascript
{
  id: 'unique-slug',
  title: 'Human Readable Title',
  type: 'dataflow' | 'conceptmap' | 'faulttree',
  
  // Explanation text
  why: "1-3 sentences on why this matters in practice. Connect to real-world impact.",
  
  pitfalls: [
    "Specific mistake #1 - not generic warnings",
    "Specific mistake #2 - things the learner might actually do",
    "Specific mistake #3 - include the consequence"
  ],
  
  content: { /* visualization-specific structure */ }
}
```

### Optional: Exercises

When the subject allows hands-on practice:

```javascript
{
  exercises: [
    {
      id: 'exercise-slug',
      prompt: 'Clear instruction of what to do',
      hint: 'Nudge without giving away the answer',
      starterCode: 'Pre-filled starting point',
      solution: 'The correct answer (for validation)',
      validator: (result) => boolean // How to check correctness
    }
  ]
}
```

### Optional: Sandbox Challenges

For the free-form practice area, define a pool of challenges:

```javascript
const sandboxChallenges = [
  {
    id: 'unique-id',
    difficulty: 'easy',  // easy | medium | hard
    prompt: 'What the learner should accomplish',
    hint: 'Helpful nudge without giving away solution',
    validator: (result) => boolean  // Check if solution is correct
  },
  // ... more challenges
];
```

Aim for 8-15 challenges with distribution across difficulties:
- **Easy (40%)**: Single concept, direct application
- **Medium (40%)**: Combine 2-3 concepts, some thinking required
- **Hard (20%)**: Multi-step, edge cases, optimization

### Optional: Reference Material

When exercises need supporting information (like database schemas, API references, etc.):

```javascript
// Define reference data that learners need
const referenceData = {
  // Subject-specific structure
};

// Map which references each module needs
const moduleReferences = {
  'module-id': ['relevant', 'reference', 'keys']
};
```

Build a collapsible reference component that:
- Shows only what's relevant to the current module
- Defaults to collapsed (doesn't overwhelm)
- Is accessible from both module view and main dashboard

---

## Interaction Patterns

### Click-to-Reveal
- Nodes/branches start with visual indicator (pulsing dot, chevron)
- Clicking reveals the explanation
- Revealed state is tracked
- All items must be revealed before module can be completed

### Progress Tracking
- Track per-module: revealed items, completed exercises, completion timestamp
- Persist across sessions (use localStorage)
- Show progress at category and platform level

### Freeze on Completion
- Once all reveals + exercises done, offer "Complete & Freeze" button
- Frozen modules:
  - All content visible by default
  - No more interaction needed
  - Serves as static reference
  - Visually distinct (completion badge)

### Dashboard
- Show all categories with progress bars
- Make reference material accessible (clickable viewer)
- Include legend explaining module types

### Quick Review Mode
- Modal/panel showing all completed modules at a glance
- Filter options: "All completed" vs "Bookmarked only"
- Click any item to jump directly to that module
- Shows personal notes preview inline
- Serves as alternative to search — fast navigation to any completed content
- Keyboard shortcut: `Q`

### Keyboard Navigation
Full keyboard support for power users:

| Key | Action |
|-----|--------|
| `j` | Next item / Move down |
| `k` | Previous item / Move up |
| `Enter` | Expand / Select current item |
| `Esc` | Go back / Close modal |
| `q` | Open Quick Review |
| `r` | Open Reference |
| `s` | Open Sandbox (if applicable) |
| `n` | Add/edit note (in module view) |
| `?` | Show keyboard help modal |
| `Ctrl+E` | Export to Markdown |
| `Ctrl+P` | Print |

Implementation notes:
- Track `focusIndex` state for current position
- Show visual focus indicator (ring/highlight)
- Ignore keyboard events when typing in input/textarea
- Create `useKeyboardNav` hook for reusable handlers

### Personal Notes & Bookmarks
Allow learners to annotate their learning:

**Notes:**
- Per-module text notes that persist
- Accessed via `n` key or note icon
- Modal editor with save/cancel
- Displayed in module view when present
- Included in exports

**Bookmarks:**
- Star icon on individual reveals
- Toggle on/off per item
- Stored as array per module: `bookmarks: { [moduleId]: [itemId, itemId, ...] }`
- Filterable in Quick Review
- Included in exports

Storage structure:
```javascript
{
  modules: { [moduleId]: "note text" },
  bookmarks: { [moduleId]: ["item1", "item2"] }
}
```

### Sandbox Mode (for subjects with hands-on practice)
Free-form practice area separate from structured exercises:

- Open workspace to experiment without constraints
- Reference panel showing available data/APIs/commands
- **Random Challenges**: 
  - Pool of practice problems at varying difficulty (easy/medium/hard)
  - "Random Challenge" button picks one
  - Validator checks if solution is correct
  - Progress tracked visually (grid of completed challenges)
  - Hints available per challenge
- Keyboard shortcut: `S`

Challenge structure:
```javascript
{
  id: 'unique-id',
  difficulty: 'easy' | 'medium' | 'hard',
  prompt: 'What to accomplish',
  hint: 'Nudge toward solution',
  validator: (result) => boolean
}
```

### Export & Print

**Markdown Export:**
- Download button generates `.md` file
- Includes only completed modules
- Content: title, why, pitfalls, all reveals, personal notes, bookmarked items
- Clean format suitable for wikis, Obsidian, Notion, etc.
- Keyboard shortcut: `Ctrl+E`

**Print-Friendly View:**
- Print button or `Ctrl+P` triggers print styles
- White background, proper contrast
- Hides interactive elements (exercises, buttons, navigation)
- Shows all reveals expanded
- Good for physical reference sheets or PDF generation

CSS approach:
```css
@media print {
  .print\\:hidden { display: none !important; }
  .print\\:block { display: block !important; }
  /* Override dark theme colors */
}
```

---

## Accessibility

The platform should be usable by people with disabilities:

### ARIA Labels
- All interactive elements need `role`, `aria-label`, or `aria-labelledby`
- Buttons without visible text need `aria-label`
- Expandable sections need `aria-expanded`
- SVG diagrams need `role="img"` with descriptive `aria-label`

### Tab Panels
- Table/schema viewers use proper tab pattern:
  - Container: `role="tablist"`
  - Tabs: `role="tab"` with `aria-selected`
  - Panels: `role="tabpanel"`

### Focus Management
- Visible focus indicator on all interactive elements
- Focus trap in modals (Tab cycles within modal)
- Return focus to trigger element when modal closes
- Skip repetitive navigation where possible

### Screen Reader Considerations
- Status messages (e.g., "Completed") use `role="status"` or `aria-live`
- Icon-only buttons always have text alternative
- Decorative icons use `aria-hidden="true"`
- Form inputs have associated labels

### Color & Contrast
- Don't rely on color alone to convey information
- Ensure sufficient contrast ratios (4.5:1 for text)
- Consider high-contrast mode option

---

## Technical Implementation Notes

### React Component Structure

```
App
├── Dashboard (category overview, reference viewer access, export/print)
├── CategoryView (list modules in a category)
├── ModuleView (single module with visualization + exercises)
├── Visualizations
│   ├── DataFlowDiagram (SVG-based)
│   ├── ConceptMap (expandable cards)
│   └── FaultTree (collapsible tree)
├── ExerciseRunner (if applicable)
├── ReferenceViewer (modal or collapsible panel)
├── Modals
│   ├── KeyboardHelp (shortcut reference)
│   ├── QuickReviewPanel (jump to completed content)
│   ├── NotesEditor (per-module notes)
│   └── Sandbox (free-form practice)
└── Utilities
    ├── useKeyboardNav (hook for keyboard handlers)
    ├── generateMarkdownExport (export function)
    └── downloadFile (trigger browser download)
```

### State Management
```javascript
// Progress state
progress: {
  [moduleId]: {
    complete: boolean,
    revealed: string[],      // IDs of revealed items
    exercises: string[],     // IDs of completed exercises
    completedAt: ISO string
  }
}

// Notes state (separate storage key)
notes: {
  modules: { [moduleId]: "note text" },
  bookmarks: { [moduleId]: ["itemId", "itemId"] }
}

// Navigation state
view: 'dashboard' | 'category' | 'module'
selectedCategory: Category | null
selectedModule: Module | null
focusIndex: number  // For keyboard navigation

// Modal state
showKeyboardHelp: boolean
showQuickReview: boolean
showReference: boolean
showSandbox: boolean
showNotes: boolean
```

### Storage
- Use localStorage for persistence
- Separate keys for progress vs notes (allows independent reset)
- Save on every progress/notes change
- Load on app mount
- Include reset functionality (with confirmation)

### Keyboard Navigation Hook
```javascript
const useKeyboardNav = (handlers) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      const key = e.key.toLowerCase();
      
      // Handle ctrl combinations
      if (e.ctrlKey || e.metaKey) {
        if (handlers[`ctrl+${key}`]) {
          e.preventDefault();
          handlers[`ctrl+${key}`]();
          return;
        }
      }
      
      if (handlers[key]) {
        e.preventDefault();
        handlers[key]();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
};
```

### Export Function Pattern
```javascript
const generateMarkdownExport = (progress, notes, curriculum) => {
  let md = `# Title - Reference Export\n\n`;
  md += `Generated: ${new Date().toLocaleDateString()}\n\n`;
  
  Object.values(curriculum).forEach(category => {
    const completedModules = category.modules.filter(m => progress[m.id]?.complete);
    if (completedModules.length === 0) return;
    
    md += `## ${category.title}\n\n`;
    
    completedModules.forEach(module => {
      md += `### ${module.title}\n\n`;
      // Add why, pitfalls, reveals, notes, bookmarks...
    });
  });
  
  return md;
};

const downloadFile = (content, filename, type = 'text/markdown') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
```

### Styling Approach
- Dark theme (easier on eyes for learning)
- Color-code by visualization type (blue=dataflow, green=conceptmap, amber=faulttree)
- Use color meaningfully in visualizations (consistent node types)
- Tailwind CSS for rapid implementation
- Print styles override to white background with proper contrast
- Focus ring for keyboard navigation visibility

---

## Checklist for New Platform

When building a new learning platform, ensure:

**Content Structure**
- [ ] 3-5 categories covering the subject breadth
- [ ] 3-6 modules per category (15-25 total modules)
- [ ] Each module has appropriate visualization type
- [ ] Every module has "why" and "pitfalls"
- [ ] Visualizations have sufficient reveals (5-8 per diagram)
- [ ] Reference material is accessible where needed
- [ ] Exercises (if any) have validators and hints

**Mental Model Quality**
- [ ] Each diagram passes the prediction test (can reason about unseen scenarios)
- [ ] Each diagram passes the debugging test (helps narrow down problems)
- [ ] Analogies connect new concepts to familiar ones
- [ ] No "diagrams for decoration" — every visualization earns its place
- [ ] Simple facts are prose, not forced into diagrams

**Core Features**
- [ ] Progress persists across sessions
- [ ] Dashboard shows overall progress
- [ ] Completion freezes modules to static state

**Navigation & Review**
- [ ] Quick Review mode for jumping to completed content (Q key)
- [ ] Reference panel accessible (R key)
- [ ] Keyboard navigation (j/k/enter/esc at minimum)
- [ ] Keyboard help modal (? key)
- [ ] Focus indicators visible for keyboard users

**Personal Annotation**
- [ ] Per-module notes that persist
- [ ] Bookmark/star individual reveals
- [ ] Notes and bookmarks appear in Quick Review

**Practice (if applicable)**
- [ ] Sandbox mode for free-form experimentation (S key)
- [ ] Random challenges with varying difficulty
- [ ] Challenge progress tracking

**Export & Output**
- [ ] Markdown export of completed content + notes (Ctrl+E)
- [ ] Print-friendly styles for physical reference (Ctrl+P)
- [ ] Exports include personal annotations

**Accessibility**
- [ ] ARIA labels on interactive elements
- [ ] Proper roles for tabs, buttons, dialogs
- [ ] Screen reader compatible
- [ ] Sufficient color contrast

**Responsive**
- [ ] Mobile-friendly layout
- [ ] Touch targets large enough
- [ ] Modals work on small screens

---

## Example Category Structures

### For Technical Tools (like SQL, Git, Docker)
1. **Foundations** — Core concepts that everything builds on
2. **[Tool]-Specific Features** — What makes this tool unique
3. **Integration/Platform** — How it connects to larger ecosystem
4. **Troubleshooting/Migration** — What goes wrong and how to fix it

### For Conceptual Subjects (like Design Patterns, Architecture)
1. **Core Principles** — Fundamental ideas
2. **Pattern Categories** — Groups of related patterns
3. **Application** — When and how to apply
4. **Anti-patterns** — What to avoid and why

### For Process-Based Subjects (like CI/CD, Project Management)
1. **Workflow Overview** — The big picture flow
2. **Stage Deep-Dives** — Each major stage in detail
3. **Tools & Automation** — Specific implementations
4. **Failure Modes** — What breaks and recovery strategies

---

## Sample Module Templates

### Data Flow Module

```javascript
{
  id: 'example-dataflow',
  title: 'How Data Moves Through the System',
  type: 'dataflow',
  
  why: "This matters because [practical impact]. You'll encounter this when [situation]. Understanding it helps you [benefit].",
  
  pitfalls: [
    "Common mistake #1 — leads to [consequence]",
    "Common mistake #2 — especially when [context]",
    "Common mistake #3 — fix by [brief remedy]"
  ],
  
  content: {
    description: 'One-line summary of what this diagram shows',
    nodes: [
      { id: 'start', label: 'Start Point', type: 'boundary', x: 100, y: 150 },
      { id: 'step1', label: 'First Step', type: 'process', x: 250, y: 150 },
      { id: 'step2', label: 'Second Step', type: 'process', x: 400, y: 150 },
      { id: 'end', label: 'End Point', type: 'boundary', x: 550, y: 150 },
    ],
    edges: [
      { from: 'start', to: 'step1' },
      { from: 'step1', to: 'step2' },
      { from: 'step2', to: 'end' },
    ],
    reveals: {
      start: 'Explanation of what happens at start...',
      step1: 'Explanation of first transformation...',
      step2: 'Explanation of second transformation...',
      end: 'Explanation of the result...',
    }
  }
}
```

### Concept Map Module

```javascript
{
  id: 'example-conceptmap',
  title: 'Types of Something',
  type: 'conceptmap',
  
  why: "This matters because [practical impact]. You'll encounter this when [situation].",
  
  pitfalls: [
    "Confusing type A with type B — they differ in [key way]",
    "Using type C when type D is more appropriate for [situation]"
  ],
  
  content: {
    central: 'Central Concept',
    description: 'One sentence describing what this map covers',
    branches: [
      {
        id: 'branch-1',
        label: 'First Branch',
        color: '#3b82f6',
        details: 'What this branch represents and when to use it',
        example: 'Concrete code example or usage',  // optional
        children: ['Sub-item 1', 'Sub-item 2', 'Sub-item 3']
      },
      {
        id: 'branch-2',
        label: 'Second Branch',
        color: '#22c55e',
        details: 'What this branch represents',
        example: null,
        children: ['Sub-item A', 'Sub-item B']
      },
      {
        id: 'branch-3',
        label: 'Third Branch',
        color: '#f59e0b',
        details: 'What this branch represents',
        example: 'Another example',
        children: ['Sub-item X', 'Sub-item Y', 'Sub-item Z']
      },
    ]
  }
}
```

### Fault Tree Module

```javascript
{
  id: 'example-faulttree',
  title: 'When X Does Not Work',
  type: 'faulttree',
  
  why: "Systematic debugging beats random guessing. This tree helps you narrow down causes quickly when [symptom] occurs.",
  
  pitfalls: [
    "Jumping to conclusions before checking basics",
    "Fixing symptoms instead of root cause"
  ],
  
  content: {
    root: 'The Problem Statement',
    branches: [
      {
        fault: 'Configuration Issues',
        icon: 'warning',  // 'warning', 'error', or 'info'
        causes: [
          { 
            cause: 'Missing setting',
            detail: 'Required value is not set in config',
            fix: 'Add [setting] to config file with value [X]'
          },
          { 
            cause: 'Wrong value',
            detail: 'Setting exists but has incorrect value',
            fix: 'Change [setting] from [wrong] to [correct]'
          },
        ]
      },
      {
        fault: 'Connection Problems',
        icon: 'error',
        causes: [
          { 
            cause: 'Service not running',
            detail: 'The backend service is down',
            fix: 'Check with [command], restart if needed'
          },
          { 
            cause: 'Network blocked',
            detail: 'Firewall preventing connection',
            fix: 'Verify port [X] is open'
          },
        ]
      },
    ]
  }
}
```

---

## Final Notes

This pattern works because it:
1. **Builds mental models, not memorization** — diagrams enable prediction and debugging, not just recall
2. **Respects how visual/systems thinkers learn** — boundaries, flows, cause-effect
3. **Provides immediate utility** — frozen modules become reference docs
4. **Balances exploration with structure** — click-to-reveal maintains engagement
5. **Reduces cognitive load** — reference material available but not overwhelming
6. **Tracks progress visibly** — motivation through completion percentage
7. **Supports personal connection** — notes and bookmarks make it yours
8. **Enables multiple access patterns** — keyboard for power users, mouse for casual
9. **Creates portable artifacts** — export and print for offline/external use

The key is matching visualization type to **thinking pattern**:
- **"How does this move/transform?"** → Data Flow
- **"How do these relate/categorize?"** → Concept Map  
- **"Why did this fail?"** → Fault Tree
- **"What is this?"** → Just prose (no diagram needed)

When in doubt, ask: "Will this model help me predict what happens or debug what went wrong? Or am I just drawing boxes?"

### Implementation Priority

If building incrementally, implement in this order:

1. **Core** (MVP): Categories, modules, visualizations, progress tracking, freeze
2. **Reference**: Schema/reference viewer, exercise support
3. **Navigation**: Keyboard nav, Quick Review, focus management
4. **Annotation**: Notes, bookmarks
5. **Practice**: Sandbox, random challenges
6. **Export**: Markdown export, print styles
7. **Polish**: Accessibility audit, responsive refinements

### Using the Scaffold

For fastest development, use the `learning-platform-scaffold/`:

1. Unzip the scaffold
2. Edit `src/config.js` — title, storage key, features
3. Edit `src/curriculum.js` — your learning content
4. Edit `vite.config.js` — set base path for deployment
5. `npm install && npm run build`
6. Deploy per `docs/deployment-guide.md`

The scaffold includes all infrastructure code. You only write content.
