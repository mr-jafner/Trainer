// ============================================================
// APP CONFIGURATION
// Customize these values for your learning platform
// ============================================================

export const config = {
  // App identity
  title: 'Learning Platform',
  subtitle: 'Interactive visual learning',
  
  // localStorage key - use unique name per project to avoid conflicts
  storageKey: 'learning-platform-progress',
  
  // Theme colors (Tailwind classes)
  theme: {
    // Main accent color for headers, buttons
    primary: 'blue',        // blue, green, purple, amber, etc.
    // Background
    bgDark: 'slate-900',
    bgMedium: 'slate-800', 
    bgLight: 'slate-700',
    // Module type colors (used in dashboard chips and visualizations)
    dataflow: '#3b82f6',    // blue
    conceptmap: '#22c55e',  // green
    faulttree: '#f59e0b',   // amber
  },
  
  // Keyboard shortcuts (customize if needed)
  shortcuts: {
    quickReview: 'q',
    reference: 'r',
    export: 'e',           // requires ctrl
    print: 'p',            // requires ctrl
    help: '?',
    back: 'Escape',
    next: 'j',
    prev: 'k',
    select: 'Enter',
  },
  
  // Feature flags - turn off features you don't need
  features: {
    reference: true,        // Reference panel (R key)
    quickReview: true,      // Quick review modal (Q key)
    notes: true,            // Per-module notes
    bookmarks: true,        // Bookmark reveals
    export: true,           // Markdown export
    print: true,            // Print styles
  },
};

// ============================================================
// REFERENCE DATA (optional)
// If your subject has reference material (schemas, cheat sheets, etc.)
// define it here. Set config.features.reference = false if not needed.
// ============================================================

export const referenceData = {
  // Example structure - customize for your subject:
  sections: [
    {
      id: 'example',
      title: 'Example Reference',
      content: [
        { term: 'Term 1', definition: 'Definition of term 1' },
        { term: 'Term 2', definition: 'Definition of term 2' },
      ]
    },
  ],
};
