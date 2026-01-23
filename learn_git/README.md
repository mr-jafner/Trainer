# Learning Platform Scaffold

Reusable scaffold for building interactive visual learning platforms.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Edit your content
#    - src/config.js     → App name, theme, features
#    - src/curriculum.js → Your learning modules

# 3. Run locally
npm run dev

# 4. Build and deploy
npm run build
# See docs/deployment-guide.md for server setup
```

## Project Structure

```
learning-platform-scaffold/
├── src/
│   ├── App.jsx          # Platform infrastructure (don't edit for basic use)
│   ├── config.js        # ⭐ App settings - customize this
│   ├── curriculum.js    # ⭐ Your content - customize this
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind entry
├── docs/
│   ├── deployment-guide.md        # OpenBSD httpd deployment
│   └── curriculum-authoring-guide.md  # How to write good content
├── index.html
├── package.json
└── vite.config.js       # ⭐ Set base path for deployment
```

## Customization

### 1. Configure Your App (`src/config.js`)

```javascript
export const config = {
  title: 'My Learning Platform',
  subtitle: 'Master the fundamentals',
  storageKey: 'my-platform-progress',  // Unique per project
  
  features: {
    reference: true,    // Reference panel
    quickReview: true,  // Quick review modal
    notes: true,        // Per-module notes
    export: true,       // Markdown export
    print: true,        // Print styles
  },
};
```

### 2. Add Your Content (`src/curriculum.js`)

See `docs/curriculum-authoring-guide.md` for writing tips.

```javascript
export const curriculum = {
  categoryId: {
    id: 'categoryId',
    title: 'Category Name',
    description: 'What this category covers',
    color: '#3b82f6',
    icon: '📚',
    modules: [
      {
        id: 'module-01',
        title: 'Module Title',
        type: 'conceptmap',  // or 'dataflow' or 'faulttree'
        why: 'Why this matters...',
        pitfalls: ['Common mistake 1', 'Common mistake 2'],
        content: { /* visualization-specific */ }
      }
    ]
  }
};
```

### 3. Set Deployment Path (`vite.config.js`)

```javascript
base: '/your-app-path/',  // Must match your URL
```

## Visualization Types

| Type | Use For | Structure |
|------|---------|-----------|
| `dataflow` | Sequences, processes, flows | nodes[], edges[], reveals{} |
| `conceptmap` | Categories, relationships | central, branches[] |
| `faulttree` | Debugging, troubleshooting | root, branches[] with causes[] |

## Features

**Built-in:**
- ✅ Progress tracking (localStorage)
- ✅ Click-to-reveal interactions
- ✅ Module completion and freezing
- ✅ Quick Review panel (Q key)
- ✅ Reference modal (R key)
- ✅ Per-module notes
- ✅ Markdown export (Ctrl+E)
- ✅ Print styles (Ctrl+P)
- ✅ Keyboard navigation
- ✅ Responsive layout

**Keyboard Shortcuts:**
| Key | Action |
|-----|--------|
| Q | Quick Review |
| R | Reference |
| Ctrl+E | Export |
| Ctrl+P | Print |
| Esc | Back / Close |
| ? | Help |

## Adding Subject-Specific Features

For features unique to your subject (like a metronome for guitar, or SQL sandbox), create a separate component file and import it into App.jsx.

Example:
```javascript
// src/Metronome.jsx
export const Metronome = ({ bpm, onBpmChange }) => { ... }

// In App.jsx, import and add to the UI
import { Metronome } from './Metronome.jsx';
```

## Documentation

- **[Deployment Guide](docs/deployment-guide.md)** — OpenBSD httpd setup, permissions, troubleshooting
- **[Curriculum Authoring Guide](docs/curriculum-authoring-guide.md)** — Writing effective learning content

## Built With

- [Vite](https://vite.dev/) — Build tool
- [React](https://react.dev/) — UI framework
- [Tailwind CSS](https://tailwindcss.com/) — Styling
