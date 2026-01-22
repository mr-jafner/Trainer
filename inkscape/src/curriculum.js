// ============================================================
// INKSCAPE LEARNING PLATFORM - CURRICULUM
// Vector graphics fundamentals for laser cutting and web
// ============================================================

export const curriculum = {
  // ------------------------------------------------------------
  // CATEGORY 1: Vector Fundamentals
  // ------------------------------------------------------------
  fundamentals: {
    id: 'fundamentals',
    title: 'Vector Fundamentals',
    description: 'The mental model that makes everything else click',
    color: '#8b5cf6',
    icon: '📐',
    modules: [
      {
        id: 'fundamentals-01',
        title: 'Vector vs Raster',
        type: 'conceptmap',
        why: "Understanding this distinction explains why vectors scale infinitely, why your traced image looks jagged, and why lasers need vectors to cut. Every Inkscape decision flows from this mental model.",
        pitfalls: [
          "Importing a JPG and expecting it to cut cleanly — raster images must be traced to vectors first",
          "Exporting at too low DPI when raster is needed — vectors are resolution-independent, rasters are not",
          "Confusing 'looks smooth on screen' with 'is actually vector' — zoom to 1000% to check"
        ],
        content: {
          central: 'Image Types',
          description: 'Two fundamentally different ways to represent graphics',
          branches: [
            {
              id: 'vector',
              label: 'Vector Graphics',
              color: '#22c55e',
              details: "Vectors are mathematical descriptions: 'draw a line from (0,0) to (100,50)'. The computer recalculates the image at any size. This is why you can zoom infinitely without blur. Inkscape is a vector editor — everything you create is stored as math.",
              example: "A circle isn't pixels — it's: center=(50,50), radius=25. Scale it 10x and it's still a perfect circle.",
              children: ['Infinitely scalable', 'Small file size', 'Editable nodes', 'Required for cutting', 'SVG, AI, EPS, PDF']
            },
            {
              id: 'raster',
              label: 'Raster Graphics',
              color: '#f59e0b',
              details: "Rasters are grids of colored pixels. A 100x100 image is 10,000 individual color values. Zoom in and you see the pixels. Photos are raster. Screenshots are raster.",
              example: "A 72 DPI image printed at 300 DPI will look pixelated — there's no information to fill the gaps.",
              children: ['Fixed resolution', 'Large file size', 'Destructive editing', 'Used for engraving', 'JPG, PNG, GIF, BMP']
            },
            {
              id: 'laser',
              label: 'Laser Implications',
              color: '#3b82f6',
              details: "Lasers follow paths. For cutting, the laser head physically moves along vector paths. For engraving, it rasters back and forth like an inkjet printer. You can't cut with a raster image — there's no path to follow.",
              example: "Import a PNG logo → trace it to vector → now it can cut. Skip tracing → laser can only engrave it.",
              children: ['Cut/score = vectors', 'Engrave = raster', 'Trace Bitmap converts', 'Quality varies']
            },
            {
              id: 'hybrid',
              label: 'Hybrid Files',
              color: '#ec4899',
              details: "Most real designs mix both. An SVG can contain embedded raster images. A PDF can have vector text and raster photos. Know what you have before exporting.",
              example: "Logo with vector text + raster texture = hybrid. The text cuts, the texture engraves.",
              children: ['SVG embeds rasters', 'PDF mixes both', 'Know what you have']
            },
          ]
        }
      },
      {
        id: 'fundamentals-02',
        title: 'Anatomy of a Path',
        type: 'dataflow',
        why: "Paths are the atoms of vector graphics. Understanding nodes → segments → paths → objects lets you debug why your shape won't close, why Boolean operations fail, and how to edit any shape precisely.",
        pitfalls: [
          "Confusing objects with paths — a rectangle object isn't a path until converted",
          "Not closing paths — open paths can't be filled and may confuse laser software",
          "Forgetting that groups contain paths but aren't paths themselves"
        ],
        content: {
          description: 'Building blocks from smallest to largest',
          nodes: [
            { id: 'node', label: 'Node', type: 'boundary', x: 80, y: 150 },
            { id: 'handles', label: 'Handles', type: 'flow', x: 200, y: 150 },
            { id: 'segment', label: 'Segment', type: 'process', x: 340, y: 150 },
            { id: 'path', label: 'Path', type: 'process', x: 480, y: 150 },
            { id: 'object', label: 'Object', type: 'boundary', x: 620, y: 150 },
          ],
          edges: [
            { from: 'node', to: 'handles' },
            { from: 'handles', to: 'segment' },
            { from: 'segment', to: 'path' },
            { from: 'path', to: 'object' },
          ],
          reveals: {
            node: "A node is a point with X,Y coordinates — an anchor where segments connect. Select with Node tool (N). Nodes can be corners (cusp) or smooth curves. Every path has at least 2 nodes.",
            handles: "Handles extend from nodes and control curve shape. Drag a handle to bend the segment. No handles = straight line. They're the 'steering wheel' for Bezier curves.",
            segment: "A segment connects two nodes as a straight line or Bezier curve. The segment is what the laser follows. Multiple segments chain together to form a path.",
            path: "A path is a chain of segments — open (line) or closed (shape). Closed paths can have fills. A single path can have subpaths (like the letter 'O').",
            object: "An object has a path plus stroke, fill, transforms, and metadata. Rectangles and ellipses are 'live' objects with special handles. Convert to path (Ctrl+Shift+C) to edit nodes."
          }
        }
      },
      {
        id: 'fundamentals-03',
        title: 'Strokes vs Fills',
        type: 'conceptmap',
        why: "Laser software interprets strokes and fills differently — strokes become cut/score lines, fills become engrave areas. This is the #1 source of 'my file didn't cut right' problems.",
        pitfalls: [
          "Leaving both stroke AND fill on cut paths — laser may try to engrave the stroke width",
          "Using thick strokes for engraving — strokes are paths, not areas",
          "Forgetting stroke width adds to dimensions — 1\" square with 0.1\" stroke is 1.1\" total"
        ],
        content: {
          central: 'Path Appearance',
          description: 'How paths render and what lasers do with each',
          branches: [
            {
              id: 'stroke',
              label: 'Stroke',
              color: '#ef4444',
              details: "The stroke is the line along the path. For laser cutting, use stroke-only (no fill) with specific color (red). Laser follows path centerline regardless of stroke width.",
              example: "Red stroke, no fill, 0.001\" width = cut line. Width is just for visibility.",
              children: ['Follows centerline', 'Width is visual only', 'Color = operation', 'End caps options']
            },
            {
              id: 'fill',
              label: 'Fill',
              color: '#000000',
              details: "Fill is the color inside a closed path. Fills are rasterized for engraving — laser sweeps back and forth burning the area. Fill color often controls power.",
              example: "Black fill, no stroke = engrave area.",
              children: ['Requires closed path', 'Rasterized for engrave', 'Color may map to power', 'Fill rules matter']
            },
            {
              id: 'both',
              label: 'Stroke + Fill',
              color: '#8b5cf6',
              details: "Objects can have both. For laser: cut outline (stroke) and engrave interior (fill). Some software gets confused — separate layers is safer.",
              example: "Circle with red stroke + black fill = cut shape + engrave inside.",
              children: ['Common for cut+engrave', 'Can confuse software', 'Separate layers safer']
            },
            {
              id: 'none',
              label: 'No Stroke/Fill',
              color: '#6b7280',
              details: "Path with nothing is invisible but exists. Won't affect laser output. Useful for construction guides.",
              example: "Alignment guides: draw them, remove stroke/fill, invisible but selectable.",
              children: ['Path still exists', 'Invisible on canvas', 'Useful for guides']
            },
            {
              id: 'stroke-to-path',
              label: 'Stroke to Path',
              color: '#22c55e',
              details: "Path > Stroke to Path converts stroked line into filled shape. Use when you want to engrave a line's thickness, not cut its centerline.",
              example: "10pt stroke → Stroke to Path → filled rectangle that engraves full width.",
              children: ['Converts width to fill', 'Creates outlined shape', 'Use for thick engrave']
            },
          ]
        }
      },
    ]
  },

  // ------------------------------------------------------------
  // CATEGORY 2: Path Operations
  // ------------------------------------------------------------
  pathops: {
    id: 'pathops',
    title: 'Path Operations',
    description: 'Boolean operations that build complex shapes',
    color: '#3b82f6',
    icon: '⊕',
    modules: [
      {
        id: 'pathops-01',
        title: 'Boolean Operations',
        type: 'conceptmap',
        why: "Boolean operations build complex shapes from simple ones. Instead of drawing a keyhole node-by-node, union a rectangle and circle. Master these five operations and you can construct almost any shape.",
        pitfalls: [
          "Operating on objects instead of paths — convert first (Ctrl+Shift+C)",
          "Wrong stacking order — bottom object is 'base' for Difference",
          "Expecting non-destructive results — Booleans permanently merge/cut"
        ],
        content: {
          central: 'Boolean Operations',
          description: 'Combining and cutting paths mathematically',
          branches: [
            {
              id: 'union',
              label: 'Union (Ctrl++)',
              color: '#22c55e',
              details: "Union merges overlapping paths into one. Result is combined outline. Use when multiple shapes should become single cuttable path.",
              example: "Circle + rectangle overlapping = pill shape. Interior paths removed.",
              children: ['Adds shapes', 'Removes internals', 'Single path result', 'Good for outlines']
            },
            {
              id: 'difference',
              label: 'Difference (Ctrl+-)',
              color: '#ef4444',
              details: "Difference subtracts top from bottom. Think cookie cutter — top cuts hole in bottom. Order matters critically.",
              example: "Rectangle (bottom) - Circle (top) = rectangle with circular hole.",
              children: ['Top cuts bottom', 'Order matters', 'Creates holes', 'Good for cutouts']
            },
            {
              id: 'intersection',
              label: 'Intersection (Ctrl+*)',
              color: '#f59e0b',
              details: "Intersection keeps only where shapes overlap. Everything else deleted. Useful for cropping.",
              example: "Two overlapping circles → lens shape (only overlap).",
              children: ['Keeps overlap only', 'Deletes rest', 'Good for cropping']
            },
            {
              id: 'exclusion',
              label: 'Exclusion (Ctrl+^)',
              color: '#8b5cf6',
              details: "Exclusion keeps everything EXCEPT overlap. Where shapes overlap becomes transparent. Like XOR.",
              example: "Two overlapping circles → two crescents (overlap removed).",
              children: ['Removes overlap', 'Keeps non-overlap', 'XOR operation']
            },
            {
              id: 'division',
              label: 'Division (Ctrl+/)',
              color: '#06b6d4',
              details: "Division uses top path as knife to slice bottom into pieces. Unlike Difference, all pieces remain.",
              example: "Rectangle divided by diagonal = two triangles, both remain.",
              children: ['Cuts into pieces', 'All pieces remain', 'Top is knife']
            },
          ]
        }
      },
      {
        id: 'pathops-02',
        title: 'Combine vs Group vs Union',
        type: 'dataflow',
        why: "Group, Combine, and Union look similar but behave differently. Groups are containers. Combined paths share stroke/fill. Unioned paths merge into one outline.",
        pitfalls: [
          "Using Group when you need Combine — grouped paths cut separately",
          "Using Combine when you need Union — combine makes overlaps into holes",
          "Can't Boolean-operate on Groups — ungroup first"
        ],
        content: {
          description: 'Three ways to work with multiple objects',
          nodes: [
            { id: 'separate', label: 'Separate\nObjects', type: 'boundary', x: 80, y: 150 },
            { id: 'decision', label: 'Choose\nOperation', type: 'process', x: 220, y: 150 },
            { id: 'group', label: 'Group\n(Ctrl+G)', type: 'process', x: 380, y: 80 },
            { id: 'combine', label: 'Combine\n(Ctrl+K)', type: 'process', x: 380, y: 150 },
            { id: 'union', label: 'Union\n(Ctrl++)', type: 'process', x: 380, y: 220 },
            { id: 'result', label: 'Result', type: 'boundary', x: 540, y: 150 },
          ],
          edges: [
            { from: 'separate', to: 'decision' },
            { from: 'decision', to: 'group' },
            { from: 'decision', to: 'combine' },
            { from: 'decision', to: 'union' },
            { from: 'group', to: 'result' },
            { from: 'combine', to: 'result' },
            { from: 'union', to: 'result' },
          ],
          reveals: {
            separate: "Multiple separate paths/objects. Each has own stroke, fill. For laser: each is separate cut.",
            decision: "Move together? → Group. Share fill with holes? → Combine. Single outline? → Union.",
            group: "Group (Ctrl+G) creates container. Objects keep properties but move together. Still separate cuts. Can't Boolean-operate on groups.",
            combine: "Combine (Ctrl+K) merges into one path with subpaths. Share ONE stroke/fill. Overlaps become holes. Break Apart (Ctrl+Shift+K) reverses.",
            union: "Union (Ctrl++) merges into single outline. Interior removed. Permanent. No double-cuts at overlaps.",
            result: "Group: container. Combine: one path, overlaps=holes. Union: merged outline. Test with black fill — overlaps visible in Group, not in Combine/Union."
          }
        }
      },
      {
        id: 'pathops-03',
        title: 'Path Operation Failures',
        type: 'faulttree',
        why: "Boolean operations fail silently or give wrong results more often than any other Inkscape operation. Understanding why helps fix designs that 'should work.'",
        pitfalls: [
          "Assuming failure is a bug — usually input paths need fixing",
          "Retrying same operation — fix paths first",
          "Not checking for duplicate nodes before Booleans"
        ],
        content: {
          root: 'Boolean Failed or Wrong Result',
          branches: [
            {
              fault: 'Non-Path Objects',
              icon: 'warning',
              causes: [
                { cause: 'Not converted to path', detail: 'Rectangles, ellipses, text are live objects. Booleans need paths.', fix: 'Path > Object to Path (Ctrl+Shift+C)' },
                { cause: 'Operating on Group', detail: 'Groups are containers, not paths.', fix: 'Ungroup (Ctrl+U) first' },
                { cause: 'Image or clone selected', detail: 'Rasters and clones aren\'t paths.', fix: 'Unlink Clone or Trace Bitmap' },
              ]
            },
            {
              fault: 'Geometry Issues',
              icon: 'error',
              causes: [
                { cause: 'Paths don\'t overlap', detail: 'Booleans need overlap. Touching edges may not count.', fix: 'Zoom in, ensure clear overlap' },
                { cause: 'Self-intersecting path', detail: 'Path crosses itself. Confuses fill rule and Booleans.', fix: 'Path > Break Apart, fix pieces' },
                { cause: 'Duplicate nodes', detail: 'Invisible duplicate nodes at same position.', fix: 'Select all nodes, Join. Or: Simplify (Ctrl+L)' },
              ]
            },
            {
              fault: 'Stacking Order',
              icon: 'info',
              causes: [
                { cause: 'Wrong order for Difference', detail: 'Difference subtracts TOP from BOTTOM.', fix: 'Object > Raise to Top (Home)' },
                { cause: 'Can\'t see order', detail: 'Similar colors hide stacking.', fix: 'Objects panel or change colors temporarily' },
              ]
            },
            {
              fault: 'Unexpected Holes',
              icon: 'warning',
              causes: [
                { cause: 'Used Combine not Union', detail: 'Combine makes overlaps into holes (even-odd fill).', fix: 'Undo. Use Union instead.' },
                { cause: 'Wrong fill rule', detail: 'Even-odd vs nonzero affects what\'s "inside."', fix: 'Fill & Stroke panel > toggle fill rule' },
              ]
            },
          ]
        }
      },
    ]
  },

  // ------------------------------------------------------------
  // CATEGORY 3: Node Editing
  // ------------------------------------------------------------
  nodes: {
    id: 'nodes',
    title: 'Node Editing',
    description: 'Precision control over path shapes',
    color: '#22c55e',
    icon: '◇',
    modules: [
      {
        id: 'nodes-01',
        title: 'Node Types & Handles',
        type: 'conceptmap',
        why: "Different node types create different curve behaviors. Understanding cusp vs smooth vs symmetric lets you create precise curves and sharp corners exactly where you want them.",
        pitfalls: [
          "Fighting smooth nodes when you need corner — switch to cusp (C)",
          "Wondering why curve is lopsided — check symmetric vs smooth",
          "Deleting handles entirely — use straight segment (Y) instead"
        ],
        content: {
          central: 'Node Types',
          description: 'How different nodes control curve behavior',
          branches: [
            {
              id: 'cusp',
              label: 'Cusp Node',
              color: '#ef4444',
              details: "Cusp nodes create corners. Each handle moves independently. Use for sharp angles. Most flexible type.",
              example: "Star point: handles point different directions. Sharp corner between.",
              children: ['Handles independent', 'Creates corners', 'Most flexible', 'Keyboard: C']
            },
            {
              id: 'smooth',
              label: 'Smooth Node',
              color: '#22c55e',
              details: "Smooth nodes create flowing curves. Handles stay collinear (180° apart) but can differ in length.",
              example: "S-curve side: handles opposite but one longer for asymmetric curve.",
              children: ['Handles collinear', 'Different lengths OK', 'Smooth transitions', 'Keyboard: S']
            },
            {
              id: 'symmetric',
              label: 'Symmetric Node',
              color: '#3b82f6',
              details: "Like smooth but handles must be equal length. Moving one mirrors the other. Balanced curves.",
              example: "Circle top: both handles equal, opposite directions.",
              children: ['Equal length handles', 'Mirrors movement', 'Balanced curves', 'Keyboard: Shift+S']
            },
            {
              id: 'auto',
              label: 'Auto-Smooth',
              color: '#f59e0b',
              details: "Handles auto-adjust when neighbors move. Convenient but less precise. Good for sketching.",
              example: "Pencil tool points: middle auto-adjusts as endpoints move.",
              children: ['Auto-calculated', 'Less control', 'Good for sketching', 'Keyboard: A']
            },
            {
              id: 'handles',
              label: 'Handle Mechanics',
              color: '#8b5cf6',
              details: "Handles are levers pulling curve toward themselves. Longer = wider curve. No handle = straight line.",
              example: "Handles as magnets. Two long = wide arc. Two short = tight bend.",
              children: ['Length = curve width', 'Direction = curve direction', 'No handle = straight', 'Ctrl+click retracts']
            },
          ]
        }
      },
      {
        id: 'nodes-02',
        title: 'Node Operations',
        type: 'dataflow',
        why: "Adding, deleting, joining, and breaking nodes are core editing operations. This workflow lets you refine traced paths and fix broken outlines.",
        pitfalls: [
          "Adding too many nodes — use Simplify (Ctrl+L) to reduce",
          "Breaking when you meant to delete — break creates endpoints; delete removes",
          "Forgetting to join endpoints — open paths can't fill"
        ],
        content: {
          description: 'Essential node editing operations',
          nodes: [
            { id: 'select', label: 'Select\nNode(s)', type: 'boundary', x: 80, y: 150 },
            { id: 'decide', label: 'What\nneeded?', type: 'process', x: 200, y: 150 },
            { id: 'add', label: 'Add', type: 'process', x: 340, y: 60 },
            { id: 'delete', label: 'Delete', type: 'process', x: 340, y: 120 },
            { id: 'join', label: 'Join', type: 'process', x: 340, y: 180 },
            { id: 'break', label: 'Break', type: 'process', x: 340, y: 240 },
            { id: 'result', label: 'Refined\nPath', type: 'boundary', x: 480, y: 150 },
          ],
          edges: [
            { from: 'select', to: 'decide' },
            { from: 'decide', to: 'add' },
            { from: 'decide', to: 'delete' },
            { from: 'decide', to: 'join' },
            { from: 'decide', to: 'break' },
            { from: 'add', to: 'result' },
            { from: 'delete', to: 'result' },
            { from: 'join', to: 'result' },
            { from: 'break', to: 'result' },
          ],
          reveals: {
            select: "Node tool (N), click to select. Shift+click adds to selection. Ctrl+A selects all on path.",
            decide: "More control? Add. Too cluttered? Delete. Connect endpoints? Join. Split path? Break.",
            add: "Double-click segment to add node. New node inherits curve — no corner created.",
            delete: "Select and Delete/Backspace. Path reshapes to connect remaining nodes. Ctrl+L to auto-simplify.",
            join: "Select two endpoints, press J to join at midpoint. Shift+J adds segment between. Essential for closing paths.",
            break: "Select nodes, press B to break path there. Creates two endpoints. Use to split closed paths.",
            result: "Clean path with just enough nodes for smooth curves and precise corners."
          }
        }
      },
      {
        id: 'nodes-03',
        title: 'Bezier Handle Mechanics',
        type: 'dataflow',
        why: "Bezier curves are vector graphics' foundation. Understanding how handles shape curves gives you precise control — create any curve by knowing where to place handles and how long to make them.",
        pitfalls: [
          "Handles too long — creates loops and self-intersections",
          "Handles wrong direction — curve bulges wrong way",
          "Trying sharp corners with smooth nodes — switch to cusp first"
        ],
        content: {
          description: 'How Bezier handles determine curve shape',
          nodes: [
            { id: 'start', label: 'Start\nNode', type: 'boundary', x: 80, y: 150 },
            { id: 'handle1', label: 'Start\nHandle', type: 'flow', x: 180, y: 150 },
            { id: 'curve', label: 'Curve\nSegment', type: 'process', x: 300, y: 150 },
            { id: 'handle2', label: 'End\nHandle', type: 'flow', x: 420, y: 150 },
            { id: 'end', label: 'End\nNode', type: 'boundary', x: 520, y: 150 },
          ],
          edges: [
            { from: 'start', to: 'handle1' },
            { from: 'handle1', to: 'curve' },
            { from: 'curve', to: 'handle2' },
            { from: 'handle2', to: 'end' },
          ],
          reveals: {
            start: "Start node anchors one end. Its position is fixed; handle controls how curve leaves.",
            handle1: "Start handle points where curve initially travels. Longer = travels further before bending. Handle tip is 'magnet' pulling curve.",
            curve: "Curve calculated from four points (two nodes + two handles). Always tangent to handles at endpoints. Stays within convex hull of control points.",
            handle2: "End handle points where curve is coming FROM (opposite direction). Controls how curve approaches end. Longer = more gradual.",
            end: "End node anchors other end. For smooth continuation, next segment's handle should be collinear."
          }
        }
      },
    ]
  },

  // ------------------------------------------------------------
  // CATEGORY 4: Organization & Workflow
  // ------------------------------------------------------------
  organization: {
    id: 'organization',
    title: 'Organization & Workflow',
    description: 'Staying sane on complex designs',
    color: '#f59e0b',
    icon: '📁',
    modules: [
      {
        id: 'organization-01',
        title: 'Layers & Groups',
        type: 'conceptmap',
        why: "Complex laser files have dozens of objects. Layers organize by purpose (cut, engrave, guides). Groups organize related objects. Without organization, you'll select wrong things and go insane.",
        pitfalls: [
          "Everything on one layer — can't easily show/hide cut vs engrave",
          "Too many layers — management burden; 3-5 usually enough",
          "Forgetting to unlock layers — 'why can't I select anything?'"
        ],
        content: {
          central: 'Organization',
          description: 'Layers for purpose, groups for related objects',
          branches: [
            {
              id: 'layers',
              label: 'Layers',
              color: '#3b82f6',
              details: "Layers are global containers. They have Z-order, visibility, and lock. Use to separate: cuts, engraves, guides. Shift+Ctrl+L for panel.",
              example: "'Cut' layer (red), 'Engrave' layer (black), 'Guides' layer (locked).",
              children: ['Document-wide', 'Show/hide toggle', 'Lock toggle', 'Control Z-order']
            },
            {
              id: 'groups',
              label: 'Groups',
              color: '#22c55e',
              details: "Groups (Ctrl+G) bundle related objects. Move/scale as unit. Double-click to enter and edit contents.",
              example: "Logo = group of paths. Move whole logo; double-click to edit letters.",
              children: ['Bundle objects', 'Move as unit', 'Can nest', 'Ungroup: Ctrl+U']
            },
            {
              id: 'naming',
              label: 'Naming',
              color: '#f59e0b',
              details: "Name descriptively. 'Layer 1' means nothing; 'Cut - Frame' is clear. Object Properties to rename.",
              example: "'01-Cut-Frame', '02-Engrave-Text', '03-Guides'.",
              children: ['Descriptive names', 'Number prefix', 'Include operation']
            },
            {
              id: 'workflow',
              label: 'Layer Workflow',
              color: '#8b5cf6',
              details: "Create layers first. Lock non-active. Hide for clarity. Move Selection to Layer for existing objects.",
              example: "Working on engrave: lock Cut layer, hide Guides, work freely.",
              children: ['Create first', 'Lock inactive', 'Hide for clarity']
            },
          ]
        }
      },
      {
        id: 'organization-02',
        title: 'Text to Paths',
        type: 'dataflow',
        why: "Text relies on fonts — if font isn't installed on laser software, text displays wrong. Converting to paths embeds shapes permanently. Essential for sharing files.",
        pitfalls: [
          "Converting too early — can't edit after; keep backup",
          "Forgetting before laser — font substitution ruins design",
          "Not ungrouping after — becomes group, not individual paths"
        ],
        content: {
          description: 'Converting editable text to permanent paths',
          nodes: [
            { id: 'text', label: 'Live\nText', type: 'boundary', x: 80, y: 150 },
            { id: 'font', label: 'Font\nDependency', type: 'flow', x: 200, y: 150 },
            { id: 'convert', label: 'Object\nto Path', type: 'process', x: 340, y: 150 },
            { id: 'group', label: 'Group of\nPaths', type: 'process', x: 480, y: 150 },
            { id: 'result', label: 'Portable\nPaths', type: 'boundary', x: 620, y: 150 },
          ],
          edges: [
            { from: 'text', to: 'font' },
            { from: 'font', to: 'convert' },
            { from: 'convert', to: 'group' },
            { from: 'group', to: 'result' },
          ],
          reveals: {
            text: "Live text is editable — retype, change font. Text tool (T). Stores characters and font reference, not shapes.",
            font: "Font file must be installed to render. Different machines have different fonts. Laser software has limited support.",
            convert: "Path > Object to Path (Ctrl+Shift+C). Letter shapes embedded — no font dependency. Permanent: can't edit as text. Keep backup.",
            group: "After conversion, text becomes group of paths. One path per character. Ungroup (Ctrl+U) for individual letters.",
            result: "Pure vectors identical on any system. Node-edit, Boolean operations, send to laser. Self-contained and portable."
          }
        }
      },
      {
        id: 'organization-03',
        title: 'Alignment & Distribution',
        type: 'conceptmap',
        why: "Precise alignment separates amateur from professional. Inkscape's tools let you center, space evenly, position exactly. Faster and more accurate than eyeballing.",
        pitfalls: [
          "Aligning to wrong reference — check 'Relative to' dropdown",
          "Distributing objects not in line — works on bounding boxes",
          "Snapping fighting you — toggle off (%) when needed"
        ],
        content: {
          central: 'Precision',
          description: 'Tools for exact placement and spacing',
          branches: [
            {
              id: 'align',
              label: 'Align',
              color: '#3b82f6',
              details: "Shift+Ctrl+A for panel. Left/center/right edges, top/middle/bottom. 'Relative to' controls anchor.",
              example: "5 icons → Center on vertical axis → all share horizontal center.",
              children: ['Edge alignment', 'Center alignment', 'Relative to dropdown']
            },
            {
              id: 'distribute',
              label: 'Distribute',
              color: '#22c55e',
              details: "Spaces objects evenly. Select 3+, distribute by centers or edges. 'Equal gaps' most useful.",
              example: "5 different buttons → equal gaps → even spacing.",
              children: ['Centers equidistant', 'Equal gaps', 'Needs 3+ objects']
            },
            {
              id: 'snap',
              label: 'Snapping',
              color: '#f59e0b',
              details: "Auto-aligns while dragging. % toggles all. Snap toolbar for fine control. Learn to toggle it.",
              example: "Drag near page center → snaps exactly.",
              children: ['% toggles all', 'Grid, guides, objects', 'Disable when fighting']
            },
            {
              id: 'guides',
              label: 'Guides',
              color: '#8b5cf6',
              details: "Non-printing reference lines. Drag from rulers. Double-click for exact position.",
              example: "Horizontal guide at Y=50mm for consistent baseline.",
              children: ['Drag from rulers', 'Double-click for exact', 'Non-printing']
            },
            {
              id: 'transform',
              label: 'Transform',
              color: '#ec4899',
              details: "Shift+Ctrl+M for precise numeric control. Exact position, dimensions, rotation.",
              example: "Need X=25.4mm, Y=12.7mm → enter values, Apply.",
              children: ['Exact position', 'Precise dimensions', 'Rotation by degrees']
            },
          ]
        }
      },
    ]
  },

  // ------------------------------------------------------------
  // CATEGORY 5: Export & Output
  // ------------------------------------------------------------
  export: {
    id: 'export',
    title: 'Export & Output',
    description: 'Getting from Inkscape to laser and web',
    color: '#ec4899',
    icon: '📤',
    modules: [
      {
        id: 'export-01',
        title: 'Design-to-Laser Workflow',
        type: 'dataflow',
        why: "Path from Inkscape to cut piece has checkpoints. Skipping steps leads to wasted material. This workflow catches problems before they cost money.",
        pitfalls: [
          "Skipping 'check open paths' — unfilled engraves, incomplete cuts",
          "Not matching units — 100mm becomes 100 inches",
          "Forgetting to flatten transparency — gradients become solid"
        ],
        content: {
          description: 'Complete workflow from design to cut',
          nodes: [
            { id: 'design', label: 'Design\nComplete', type: 'boundary', x: 60, y: 150 },
            { id: 'check', label: 'Check\nPaths', type: 'process', x: 160, y: 150 },
            { id: 'colors', label: 'Set\nColors', type: 'process', x: 260, y: 150 },
            { id: 'units', label: 'Verify\nUnits', type: 'process', x: 360, y: 150 },
            { id: 'export', label: 'Export', type: 'process', x: 460, y: 150 },
            { id: 'laser', label: 'Laser\nSoftware', type: 'boundary', x: 560, y: 150 },
          ],
          edges: [
            { from: 'design', to: 'check' },
            { from: 'check', to: 'colors' },
            { from: 'colors', to: 'units' },
            { from: 'units', to: 'export' },
            { from: 'export', to: 'laser' },
          ],
          reveals: {
            design: "Design done, shapes correct. Resist 'just send it.' Few minutes of checks saves material.",
            check: "View > Display Mode > Outline. Look for: open paths, overlapping cuts, strays. Path > Combine if needed.",
            colors: "Assign colors by operation: red = cut, blue = score, black fill = engrave. Remove unintended fills from cuts.",
            units: "Document Properties > Display units should match laser. Check page size. Verify dimensions make sense.",
            export: "File > Save a Copy. Plain SVG for compatibility. Or PDF. DXF loses colors.",
            laser: "Open in laser software. Verify size, color mapping. Bounds check. Test on scrap first."
          }
        }
      },
      {
        id: 'export-02',
        title: 'Stroke Color Conventions',
        type: 'conceptmap',
        why: "Laser software interprets colors as operations. Wrong colors mean cuts become engraves. No universal standard — check your software — but these conventions are common.",
        pitfalls: [
          "Assuming all software uses same colors — always verify",
          "Using RGB approximations — #FF0001 might not match #FF0000",
          "Forgetting stroke width ignored — laser follows path, not visual"
        ],
        content: {
          central: 'Color Mapping',
          description: 'Common laser operation color conventions',
          branches: [
            {
              id: 'red',
              label: 'Red (Cut)',
              color: '#FF0000',
              details: "Red (#FF0000) = CUT. Full power, through material. Stroke only, no fill. Most universal.",
              example: "Stroke #FF0000, no fill, 0.1mm width = cut line.",
              children: ['#FF0000', 'Full power', 'Through material', 'Most common']
            },
            {
              id: 'blue',
              label: 'Blue (Score)',
              color: '#0000FF',
              details: "Blue (#0000FF) = SCORE. Partial power, doesn't go through. Fold lines, decoration.",
              example: "Fold line: Stroke #0000FF, lower power.",
              children: ['#0000FF', 'Partial power', 'Score/etch/mark']
            },
            {
              id: 'black',
              label: 'Black (Engrave)',
              color: '#000000',
              details: "Black (#000000) fill = ENGRAVE. Raster operation, removes material in area. Power controls depth.",
              example: "Engraved text: Black fill, no stroke.",
              children: ['#000000', 'Fill not stroke', 'Raster operation']
            },
            {
              id: 'other',
              label: 'Other Colors',
              color: '#00FF00',
              details: "Green, magenta, cyan for additional operations or organization. Less standardized.",
              example: "Multi-material: red = part, green = jig, magenta = align.",
              children: ['Less standardized', 'Secondary operations', 'Check software']
            },
            {
              id: 'settings',
              label: 'Software Settings',
              color: '#f59e0b',
              details: "Your software maps colors to settings. Lightburn uses layers. Always verify mapping.",
              example: "Lightburn: C0 = red = Cut 80% power 10mm/s.",
              children: ['Map colors', 'Set power/speed', 'Save presets']
            },
          ]
        }
      },
      {
        id: 'export-03',
        title: 'Export Formats',
        type: 'conceptmap',
        why: "Different formats preserve different info. SVG usually best for laser. DXF for CAD software. Knowing trade-offs helps you choose correctly.",
        pitfalls: [
          "Inkscape SVG instead of Plain SVG — includes Inkscape-specific data",
          "DXF and colors gone — DXF doesn't preserve colors reliably",
          "PNG for laser — raster, not vector paths"
        ],
        content: {
          central: 'Export Formats',
          description: 'Format options and trade-offs',
          branches: [
            {
              id: 'svg',
              label: 'SVG',
              color: '#f59e0b',
              details: "Best for most laser software. Plain SVG more compatible than Inkscape SVG. Preserves paths, colors, layers.",
              example: "Save a Copy > Plain SVG. Lightburn: all preserved.",
              children: ['Best for laser', 'Use Plain SVG', 'Preserves colors']
            },
            {
              id: 'dxf',
              label: 'DXF',
              color: '#3b82f6',
              details: "AutoCAD format. Works with CAD software. Loses colors. Use R14, LWPOLYLINE.",
              example: "Save a Copy > DXF. Colors become layer numbers.",
              children: ['For CAD software', 'Loses colors', 'R14 format']
            },
            {
              id: 'pdf',
              label: 'PDF',
              color: '#ef4444',
              details: "Universal, preserves vectors. Good fallback. Enable 'Convert text to paths.'",
              example: "Save a Copy > PDF. Check 'Convert text.'",
              children: ['Universal', 'Preserves vectors', 'Good fallback']
            },
            {
              id: 'png',
              label: 'PNG',
              color: '#22c55e',
              details: "Raster export for engrave-only or web. Export Selection for DPI control. 300+ for quality.",
              example: "Photo engrave: 300 DPI PNG, engrave only.",
              children: ['Raster only', 'For engraving', '300+ DPI']
            },
          ]
        }
      },
      {
        id: 'export-04',
        title: 'SVG for Web',
        type: 'conceptmap',
        why: "SVG is web's native vector — scalable, small, CSS-styleable. But Inkscape output is bloated. Optimization makes files smaller and more compatible.",
        pitfalls: [
          "Using Inkscape SVG for web — includes junk browsers don't need",
          "Forgetting viewBox — SVG won't scale responsively",
          "Leaving editor IDs — 'rect1234' clutters markup"
        ],
        content: {
          central: 'Web SVG',
          description: 'Optimizing Inkscape SVGs for web',
          branches: [
            {
              id: 'optimized',
              label: 'Optimized SVG',
              color: '#22c55e',
              details: "File > Save As > Optimized SVG strips metadata. Often 30-50% smaller. Keep working file separate.",
              example: "100KB Inkscape SVG → 40KB Optimized SVG.",
              children: ['Remove metadata', 'Shorten IDs', 'Keep working file']
            },
            {
              id: 'viewbox',
              label: 'viewBox',
              color: '#3b82f6',
              details: "viewBox defines coordinate system. Required for responsive scaling. Resize Page to Drawing first.",
              example: "viewBox='0 0 100 100' scales to any size.",
              children: ['Coordinate space', 'Required for scaling', 'Resize Page first']
            },
            {
              id: 'svgo',
              label: 'SVGO',
              color: '#f59e0b',
              details: "Command-line tool for aggressive optimization. SVGOMG web interface for one-offs. Can break some SVGs.",
              example: "svgo input.svg -o output.svg → further 20-40% reduction.",
              children: ['More aggressive', 'SVGOMG web tool', 'Test after']
            },
            {
              id: 'inline',
              label: 'Inline vs External',
              color: '#8b5cf6',
              details: "Inline SVGs are CSS-styleable and scriptable. External are cached but isolated. Choose by use case.",
              example: "Inline: styleable. External: <img src='logo.svg'>.",
              children: ['Inline: styleable', 'External: cached', 'CSS background works']
            },
            {
              id: 'css',
              label: 'CSS Styling',
              color: '#ec4899',
              details: "Inline SVGs use CSS for colors, hover, animations. currentColor inherits text color. Remove inline styles for overrides.",
              example: "path { fill: currentColor; } inherits text color.",
              children: ['Use classes', 'currentColor', 'Hover states']
            },
          ]
        }
      },
    ]
  },

  // ------------------------------------------------------------
  // CATEGORY 6: Troubleshooting
  // ------------------------------------------------------------
  troubleshooting: {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'When things don\'t work',
    color: '#ef4444',
    icon: '🔧',
    modules: [
      {
        id: 'troubleshooting-01',
        title: 'Path Problems',
        type: 'faulttree',
        why: "Path issues are most common laser problems. Open paths won't fill, self-intersecting confuses software, tiny gaps cause incomplete cuts.",
        pitfalls: [
          "Assuming paths closed because they look closed — use Outline view",
          "Fixing complex problems at once — break apart, fix pieces, recombine",
          "Ignoring 'looks fine' — trust symptoms; if laser fails, path has issues"
        ],
        content: {
          root: 'Path Not Working',
          branches: [
            {
              fault: 'Open Path',
              icon: 'error',
              causes: [
                { cause: 'Gap at endpoints', detail: 'Close but not connected. Looks closed at normal zoom.', fix: 'Node tool → select endpoints → Join (J)' },
                { cause: 'Fill not appearing', detail: 'Path actually open. Inkscape shows fill based on visual closing.', fix: 'View > Outline. Find gap. Join endpoints.' },
                { cause: 'Mixed subpaths', detail: 'Combined path has open subpaths mixed in.', fix: 'Break Apart. Fix open ones. Recombine.' },
              ]
            },
            {
              fault: 'Self-Intersection',
              icon: 'warning',
              causes: [
                { cause: 'Path crosses itself', detail: 'Single path loops and crosses. Fill rule affects "inside."', fix: 'Break Apart at crossing. Or: Union with itself.' },
                { cause: 'Alternating fill', detail: 'Even-odd rule causes crossing paths to alternate.', fix: 'Toggle fill rule. Or: Break Apart and fix.' },
              ]
            },
            {
              fault: 'Duplicates',
              icon: 'info',
              causes: [
                { cause: 'Stacked identical paths', detail: 'Copy accident. Laser cuts same line twice (fire risk).', fix: 'Select Same > Stroke Color. Delete duplicates.' },
                { cause: 'Shared edges', detail: 'Two shapes share edge. Edge cut twice.', fix: 'Union to merge. Or: delete overlapping segments.' },
              ]
            },
            {
              fault: 'Too Many Nodes',
              icon: 'warning',
              causes: [
                { cause: 'Traced path noisy', detail: 'Low-smoothing trace creates hundreds of nodes.', fix: 'Simplify (Ctrl+L). Re-trace with higher smoothing.' },
                { cause: 'Boolean node explosion', detail: 'Complex Booleans multiply nodes at intersections.', fix: 'Simplify (Ctrl+L). Manual cleanup.' },
              ]
            },
          ]
        }
      },
      {
        id: 'troubleshooting-02',
        title: 'Engrave Not Showing',
        type: 'faulttree',
        why: "Engrave uses fills, not strokes. When missing in laser software, it's usually fill/stroke, visibility, or color mapping issue.",
        pitfalls: [
          "Checking stroke when should check fill — engrave reads fills",
          "Forgetting layer visibility — may be hidden",
          "Assuming preview accurate — some software hides engrave by default"
        ],
        content: {
          root: 'Engrave Not Appearing',
          branches: [
            {
              fault: 'Fill Issues',
              icon: 'error',
              causes: [
                { cause: 'No fill set', detail: 'Only stroke. Laser sees cut line, not engrave.', fix: 'Fill & Stroke > Fill > solid color.' },
                { cause: 'Fill is white', detail: 'Invisible on white background. Software may ignore.', fix: 'Change to black (#000000).' },
                { cause: 'Gradient/pattern', detail: 'Some software doesn\'t handle these.', fix: 'Solid fill. Or: Make Bitmap Copy.' },
              ]
            },
            {
              fault: 'Path Issues',
              icon: 'warning',
              causes: [
                { cause: 'Path not closed', detail: 'Open paths can\'t fill. Preview may show but not actual.', fix: 'Outline view to verify. Join endpoints.' },
                { cause: 'Path direction', detail: 'Inner/outer same direction = middle is "outside."', fix: 'Path > Reverse on inner. Or: toggle fill rule.' },
              ]
            },
            {
              fault: 'Visibility',
              icon: 'info',
              causes: [
                { cause: 'Layer hidden', detail: 'Object on hidden layer. Won\'t export.', fix: 'Check layer visibility (eye icon).' },
                { cause: 'Low opacity', detail: 'Semi-transparent may not engrave.', fix: 'Set opacity to 100%.' },
                { cause: 'Software hiding', detail: 'Preview may hide engrave by default.', fix: 'Check software layer/color settings.' },
              ]
            },
          ]
        }
      },
      {
        id: 'troubleshooting-03',
        title: 'Scale & Unit Problems',
        type: 'faulttree',
        why: "Most frustrating: 3-inch design comes out 3mm or 3 meters. Scale issues at multiple points — document, export, import.",
        pitfalls: [
          "Changing units after drawing — doesn't resize, just relabels",
          "Trusting 'looks right' — verify numeric dimensions",
          "Some software ignores SVG units — may import as pixels"
        ],
        content: {
          root: 'Wrong Size at Laser',
          branches: [
            {
              fault: 'Document Units',
              icon: 'warning',
              causes: [
                { cause: 'Wrong units set', detail: 'Designed in inches but doc set to mm.', fix: 'Document Properties > Display units. Check dimensions.' },
                { cause: 'Changed units mid-project', detail: 'Doesn\'t scale objects, just relabels.', fix: 'Note dimensions before, verify after change.' },
              ]
            },
            {
              fault: 'Export/Import',
              icon: 'error',
              causes: [
                { cause: 'SVG units ignored', detail: 'Some software ignores SVG units, uses default (px/mm).', fix: 'Check import settings. Scale after import.' },
                { cause: 'DXF scale factor', detail: 'Export may include scale. Default might not be 1:1.', fix: 'Check DXF export options. Ensure 1:1.' },
                { cause: 'PDF resized', detail: 'May resize to fit page or use different DPI.', fix: 'Check PDF options. Verify known dimension.' },
              ]
            },
            {
              fault: 'Verification',
              icon: 'info',
              causes: [
                { cause: 'Didn\'t verify before export', detail: 'Always check dimensions match intent.', fix: 'Ruler or Transform panel (Shift+Ctrl+M).' },
                { cause: 'Didn\'t check laser software', detail: 'Last check before cutting.', fix: 'Measure known dimension after import. Scale if wrong.' },
              ]
            },
          ]
        }
      },
      {
        id: 'troubleshooting-04',
        title: 'Trace Bitmap Issues',
        type: 'faulttree',
        why: "Trace Bitmap converts raster to vector. Results vary on input and settings. Understanding success/failure helps get usable results.",
        pitfalls: [
          "Tracing low-res/blurry — garbage in, garbage out",
          "Single-scan on complex images — unusable mesh",
          "Not cleaning up — raw traces have too many nodes"
        ],
        content: {
          root: 'Bad Trace Results',
          branches: [
            {
              fault: 'Input Image',
              icon: 'warning',
              causes: [
                { cause: 'Low resolution', detail: 'Can\'t add detail that isn\'t there. Traces blocky.', fix: 'Get higher res source. Request vector original.' },
                { cause: 'JPEG artifacts', detail: 'Compression halos trace as unwanted paths.', fix: 'Get PNG source. Or: blur slightly before trace.' },
                { cause: 'Low contrast', detail: 'Needs clear edges. Gradients produce poor boundaries.', fix: 'Increase contrast first. Adjust threshold.' },
              ]
            },
            {
              fault: 'Wrong Settings',
              icon: 'error',
              causes: [
                { cause: 'Wrong threshold', detail: 'Single-scan uses threshold. Wrong value captures too much/little.', fix: 'Adjust Threshold slider. Preview before accepting.' },
                { cause: 'Single-scan on multicolor', detail: 'Brightness trace for simple B&W only.', fix: 'Multiple scans > Colors or Grays.' },
                { cause: 'Low smoothing', detail: 'Creates hundreds of nodes following pixels.', fix: 'Increase Smooth and Optimize values.' },
              ]
            },
            {
              fault: 'Cleanup Needed',
              icon: 'info',
              causes: [
                { cause: 'Too many nodes', detail: 'Dense nodes even with optimization.', fix: 'Simplify (Ctrl+L) repeatedly.' },
                { cause: 'Unwanted elements', detail: 'Background/noise captured.', fix: 'Break Apart. Delete unwanted. Or: clean source.' },
                { cause: 'Gaps and islands', detail: 'Imperfect source creates tiny problems.', fix: 'Zoom in, close gaps. Delete specks. Union pieces.' },
              ]
            },
          ]
        }
      },
    ]
  },
};
