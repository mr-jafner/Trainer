// ============================================================
// CURRICULUM DATA
// This is where all your learning content goes.
// See docs/curriculum-authoring-guide.md for writing tips.
// ============================================================

export const curriculum = {
  // ------------------------------------------------------------
  // CATEGORY 1: Example Foundations
  // ------------------------------------------------------------
  foundations: {
    id: 'foundations',
    title: 'Foundations',
    description: 'Core concepts that everything else builds on',
    color: '#3b82f6',  // blue
    icon: '📚',
    modules: [
      // --------------------------------------------------------
      // CONCEPT MAP EXAMPLE
      // Use for: categories, relationships, comparing options
      // --------------------------------------------------------
      {
        id: 'foundations-01',
        title: 'Core Concepts Overview',
        type: 'conceptmap',
        why: "Understanding these fundamentals helps you [practical benefit]. You'll use these concepts when [situation].",
        pitfalls: [
          "Common mistake #1 — leads to [consequence]",
          "Common mistake #2 — especially when [context]",
          "Assuming [wrong thing] — actually [correct thing]"
        ],
        content: {
          central: 'Central Concept',
          description: 'One sentence describing what this map covers',
          branches: [
            {
              id: 'branch-1',
              label: 'First Branch',
              color: '#22c55e',
              details: 'Explanation of what this branch represents and why it matters.',
              example: 'Concrete example or code snippet',
              children: [
                'Sub-concept A',
                'Sub-concept B', 
                'Sub-concept C',
              ]
            },
            {
              id: 'branch-2',
              label: 'Second Branch',
              color: '#f59e0b',
              details: 'Explanation of this branch.',
              example: 'Another example',
              children: [
                'Sub-concept D',
                'Sub-concept E',
              ]
            },
            {
              id: 'branch-3',
              label: 'Third Branch',
              color: '#8b5cf6',
              details: 'Explanation of this branch.',
              example: null,  // optional
              children: [
                'Sub-concept F',
                'Sub-concept G',
                'Sub-concept H',
              ]
            },
          ]
        }
      },
      
      // --------------------------------------------------------
      // DATA FLOW EXAMPLE
      // Use for: sequences, processes, request/response patterns
      // --------------------------------------------------------
      {
        id: 'foundations-02',
        title: 'How Data Flows Through the System',
        type: 'dataflow',
        why: "Understanding this flow helps you predict where things can go wrong and debug issues faster.",
        pitfalls: [
          "Skipping step X — causes [problem]",
          "Not waiting for Y to complete — leads to [issue]",
        ],
        content: {
          description: 'How [thing] moves from start to finish',
          nodes: [
            // Node types: 'boundary' (external), 'process' (transformation), 'flow' (data in transit)
            { id: 'start', label: 'Start Point', type: 'boundary', x: 100, y: 150 },
            { id: 'step1', label: 'First Step', type: 'process', x: 250, y: 150 },
            { id: 'step2', label: 'Second Step', type: 'process', x: 400, y: 150 },
            { id: 'step3', label: 'Third Step', type: 'process', x: 550, y: 150 },
            { id: 'end', label: 'End Point', type: 'boundary', x: 700, y: 150 },
          ],
          edges: [
            { from: 'start', to: 'step1' },
            { from: 'step1', to: 'step2' },
            { from: 'step2', to: 'step3' },
            { from: 'step3', to: 'end' },
          ],
          reveals: {
            start: 'What happens at the starting point. What triggers this flow?',
            step1: 'First transformation. What changes here?',
            step2: 'Second transformation. What gets validated/processed?',
            step3: 'Final processing before output.',
            end: 'The result. What does the user/system receive?',
          }
        }
      },
    ]
  },

  // ------------------------------------------------------------
  // CATEGORY 2: Example Troubleshooting
  // ------------------------------------------------------------
  troubleshooting: {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Diagnosing and fixing common problems',
    color: '#f59e0b',  // amber
    icon: '🔧',
    modules: [
      // --------------------------------------------------------
      // FAULT TREE EXAMPLE
      // Use for: debugging guides, error diagnosis, failure modes
      // --------------------------------------------------------
      {
        id: 'troubleshooting-01',
        title: "When Things Don't Work",
        type: 'faulttree',
        why: "Systematic debugging beats random guessing. This tree helps you narrow down causes quickly.",
        pitfalls: [
          "Jumping to conclusions before checking basics",
          "Fixing symptoms instead of root cause",
        ],
        content: {
          root: "It's Not Working",
          branches: [
            {
              fault: 'Configuration Issues',
              icon: 'warning',  // 'warning', 'error', or 'info'
              causes: [
                {
                  cause: 'Missing setting',
                  detail: 'Required configuration value is not set',
                  fix: 'Check config file for [specific setting], add if missing'
                },
                {
                  cause: 'Wrong value',
                  detail: 'Setting exists but has incorrect value',
                  fix: 'Verify [setting] matches expected format: [example]'
                },
              ]
            },
            {
              fault: 'Connection Problems',
              icon: 'error',
              causes: [
                {
                  cause: 'Service not running',
                  detail: 'The backend service is down or unreachable',
                  fix: 'Check service status with [command], restart if needed'
                },
                {
                  cause: 'Network blocked',
                  detail: 'Firewall or network config preventing connection',
                  fix: 'Verify port [X] is open, check firewall rules'
                },
              ]
            },
            {
              fault: 'Data Issues',
              icon: 'info',
              causes: [
                {
                  cause: 'Invalid input',
                  detail: 'Input data does not match expected format',
                  fix: 'Validate input against schema, check for [common issues]'
                },
                {
                  cause: 'Stale cache',
                  detail: 'Cached data is outdated',
                  fix: 'Clear cache with [method], retry operation'
                },
              ]
            },
          ]
        }
      },
    ]
  },

  // ------------------------------------------------------------
  // ADD MORE CATEGORIES HERE
  // Copy a category block above and customize
  // ------------------------------------------------------------
};
