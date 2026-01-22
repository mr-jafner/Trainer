// ============================================================
// INKSCAPE LEARNING PLATFORM - CONFIGURATION
// ============================================================

export const config = {
  // App identity
  title: 'Inkscape for Laser Cutting',
  subtitle: 'Vector graphics fundamentals for laser cutting and web',
  
  // localStorage key - unique per project
  storageKey: 'inkscape-laser-learning-progress',
  
  // Theme colors
  theme: {
    primary: 'purple',
    bgDark: 'slate-900',
    bgMedium: 'slate-800', 
    bgLight: 'slate-700',
    dataflow: '#3b82f6',    // blue
    conceptmap: '#22c55e',  // green
    faulttree: '#f59e0b',   // amber
  },
  
  // Keyboard shortcuts
  shortcuts: {
    quickReview: 'q',
    reference: 'r',
    export: 'e',
    print: 'p',
    help: '?',
    back: 'Escape',
    next: 'j',
    prev: 'k',
    select: 'Enter',
  },
  
  // Feature flags
  features: {
    reference: true,
    quickReview: true,
    notes: true,
    bookmarks: true,
    export: true,
    print: true,
  },
};

// ============================================================
// REFERENCE DATA
// Keyboard shortcuts and export settings for quick lookup
// ============================================================

export const referenceData = {
  sections: [
    {
      id: 'shortcuts-selection',
      title: 'Selection & Tools',
      content: [
        { term: 'S', definition: 'Selection tool (select and transform objects)' },
        { term: 'N', definition: 'Node tool (edit path nodes and handles)' },
        { term: 'R', definition: 'Rectangle tool' },
        { term: 'E', definition: 'Ellipse/circle tool' },
        { term: 'B', definition: 'Bezier pen tool (draw paths)' },
        { term: 'P', definition: 'Pencil tool (freehand drawing)' },
        { term: 'T', definition: 'Text tool' },
        { term: 'G', definition: 'Gradient tool' },
        { term: 'D', definition: 'Dropper tool (pick colors)' },
        { term: 'Space + drag', definition: 'Pan canvas (temporary hand tool)' },
        { term: '+ / -', definition: 'Zoom in/out' },
        { term: '1', definition: 'Zoom to 100%' },
        { term: '3', definition: 'Zoom to fit selection' },
        { term: '4', definition: 'Zoom to fit drawing' },
      ]
    },
    {
      id: 'shortcuts-editing',
      title: 'Editing & Transform',
      content: [
        { term: 'Ctrl+D', definition: 'Duplicate in place' },
        { term: 'Alt+D', definition: 'Clone (linked duplicate)' },
        { term: 'Ctrl+G', definition: 'Group selected objects' },
        { term: 'Ctrl+U', definition: 'Ungroup' },
        { term: 'Ctrl+K', definition: 'Combine paths (into single path)' },
        { term: 'Ctrl+Shift+K', definition: 'Break apart combined paths' },
        { term: 'Ctrl++', definition: 'Union (Path menu)' },
        { term: 'Ctrl+-', definition: 'Difference (Path menu)' },
        { term: 'Ctrl+*', definition: 'Intersection (Path menu)' },
        { term: 'Ctrl+^', definition: 'Exclusion (Path menu)' },
        { term: 'Ctrl+/', definition: 'Division (Path menu)' },
        { term: 'Shift+Ctrl+C', definition: 'Object to Path (convert shapes/text)' },
        { term: 'Ctrl+L', definition: 'Simplify path (reduce nodes)' },
      ]
    },
    {
      id: 'shortcuts-node',
      title: 'Node Editing (N tool active)',
      content: [
        { term: 'Click node', definition: 'Select node' },
        { term: 'Shift+click', definition: 'Add/remove from selection' },
        { term: 'Double-click segment', definition: 'Add node at click point' },
        { term: 'Del / Backspace', definition: 'Delete selected nodes' },
        { term: 'Ctrl+Alt+click', definition: 'Delete node, keep path shape' },
        { term: 'J', definition: 'Join selected end nodes' },
        { term: 'B', definition: 'Break path at selected nodes' },
        { term: 'Shift+J', definition: 'Join with new segment' },
        { term: 'Shift+B', definition: 'Break apart at selected nodes' },
        { term: 'S', definition: 'Make node smooth' },
        { term: 'Shift+S', definition: 'Make node symmetric' },
        { term: 'C', definition: 'Make node cusp (corner)' },
        { term: 'A', definition: 'Make node auto-smooth' },
        { term: 'Y', definition: 'Make segment a line' },
        { term: 'U', definition: 'Make segment a curve' },
      ]
    },
    {
      id: 'shortcuts-alignment',
      title: 'Alignment & Distribution',
      content: [
        { term: 'Shift+Ctrl+A', definition: 'Open Align & Distribute dialog' },
        { term: '%', definition: 'Toggle snapping on/off' },
        { term: 'Page Up', definition: 'Raise selection one step' },
        { term: 'Page Down', definition: 'Lower selection one step' },
        { term: 'Home', definition: 'Raise to top' },
        { term: 'End', definition: 'Lower to bottom' },
      ]
    },
    {
      id: 'laser-colors',
      title: 'Laser Color Conventions',
      content: [
        { term: 'Red (#FF0000)', definition: 'Cut (vector) — stroke only, no fill' },
        { term: 'Blue (#0000FF)', definition: 'Score/etch — lighter cut, doesn\'t go through' },
        { term: 'Black (#000000)', definition: 'Engrave (raster) — fill, power determines depth' },
        { term: 'Green (#00FF00)', definition: 'Often: second cut pass or different material layer' },
        { term: 'Magenta (#FF00FF)', definition: 'Often: third cut or annotation layer' },
        { term: 'Stroke width', definition: 'Typically ignored by laser — use hairline (0.001")' },
      ]
    },
    {
      id: 'export-settings',
      title: 'Export Settings for Laser',
      content: [
        { term: 'Format: SVG', definition: 'Preferred for most laser software (Lightburn, Glowforge)' },
        { term: 'Format: DXF', definition: 'For CAD-based software, loses color info' },
        { term: 'Format: PDF', definition: 'Universal, preserves vectors if saved correctly' },
        { term: 'Units', definition: 'Set document units to match laser (usually inches or mm)' },
        { term: 'Page size', definition: 'Match to laser bed size for easier positioning' },
        { term: 'SVG Output: Plain SVG', definition: 'Better compatibility than Inkscape SVG' },
        { term: 'DXF: LWPOLYLINE', definition: 'Use R14 format for widest compatibility' },
      ]
    },
    {
      id: 'web-export',
      title: 'Export Settings for Web',
      content: [
        { term: 'Format: SVG (optimized)', definition: 'Smallest file size, scales infinitely' },
        { term: 'Format: PNG', definition: 'For raster fallbacks, set DPI to 72 or 96' },
        { term: 'Optimized SVG', definition: 'File > Save As > Optimized SVG — removes metadata' },
        { term: 'SVGO', definition: 'External tool for aggressive SVG optimization' },
        { term: 'viewBox', definition: 'Ensures SVG scales responsively in browsers' },
        { term: 'ID cleanup', definition: 'Remove auto-generated IDs for cleaner markup' },
        { term: 'CSS styling', definition: 'Inline vs external — inline works in img tags' },
      ]
    },
  ],
};
