import React, { useState, useEffect, useCallback } from 'react';

// ============================================================
// COMBINED ARTIFACT - Source files are separate
// config.js, curriculum.js, App.jsx
// Generated: Thu Jan 22 21:35:28 UTC 2026
// ============================================================

// === CONFIG ===
// ============================================================
// SYSML V2 TRAINER - CONFIGURATION
// Edit this file to customize platform settings
// ============================================================

const config = {
  title: 'SysML v2 Practitioner',
  subtitle: 'Model-Based Systems Engineering fundamentals',
  storageKey: 'sysml-v2-learning-progress',
  theme: {
    primary: 'cyan',
    bgDark: 'slate-900',
    bgMedium: 'slate-800',
    bgLight: 'slate-700',
    dataflow: '#06b6d4',
    conceptmap: '#8b5cf6',
    faulttree: '#f59e0b',
    statediagram: '#ec4899',
  },
  features: {
    reference: true,
    quickReview: true,
    notes: true,
    bookmarks: true,
    export: true,
    print: true,
    sandbox: true,
  },
};

const referenceData = {
  sections: [
    {
      id: 'keywords-structure',
      title: 'Structure Keywords',
      content: [
        { term: 'package', definition: 'Container/namespace for elements', syntax: 'package Name { ... }' },
        { term: 'part def', definition: 'Define a reusable part type', syntax: 'part def Name { ... }' },
        { term: 'part', definition: 'Create instance of a part type', syntax: 'part name : PartDef;' },
        { term: 'item def', definition: 'Define something that flows', syntax: 'item def Name { ... }' },
        { term: 'item', definition: 'Instance of flowing thing', syntax: 'item name : ItemDef;' },
        { term: 'port def', definition: 'Define a connection point type', syntax: 'port def Name { in/out item ...; }' },
        { term: 'port', definition: 'Instance of connection point', syntax: 'port name : PortDef;' },
        { term: 'interface def', definition: 'Define connection contract', syntax: 'interface def Name { ... }' },
        { term: 'attribute', definition: 'Property with value', syntax: 'attribute name : Type;' },
        { term: 'enum def', definition: 'Enumeration type', syntax: 'enum def Name { val1; val2; }' },
      ]
    },
    {
      id: 'keywords-behavior',
      title: 'Behavior Keywords',
      content: [
        { term: 'action def', definition: 'Define a transformation/behavior', syntax: 'action def Name { in/out item ...; }' },
        { term: 'action', definition: 'Instance of behavior', syntax: 'action name : ActionDef;' },
        { term: 'state def', definition: 'Define state machine type', syntax: 'state def Name { state s1; state s2; }' },
        { term: 'state', definition: 'Mode within state machine', syntax: 'state name { entry action ...; }' },
        { term: 'transition', definition: 'State change', syntax: 'transition first s1 then s2 when event;' },
        { term: 'entry', definition: 'Action on entering state', syntax: 'entry action doSomething;' },
        { term: 'exit', definition: 'Action on leaving state', syntax: 'exit action cleanup;' },
        { term: 'do', definition: 'Action while in state', syntax: 'do action monitor;' },
        { term: 'flow', definition: 'Data flow between actions', syntax: 'flow a.outItem to b.inItem;' },
        { term: 'succession', definition: 'Control flow sequence', syntax: 'first a then b;' },
      ]
    },
    {
      id: 'keywords-requirements',
      title: 'Requirements Keywords',
      content: [
        { term: 'requirement def', definition: 'Define requirement type', syntax: 'requirement def Name { doc /* */ }' },
        { term: 'requirement', definition: 'Requirement instance', syntax: 'requirement name : ReqDef { }' },
        { term: 'doc', definition: 'Documentation text', syntax: 'doc /* The system shall... */' },
        { term: 'satisfy', definition: 'Design satisfies requirement', syntax: 'satisfy requirement reqName;' },
        { term: 'verification def', definition: 'Define verification type', syntax: 'verification def Name { }' },
        { term: 'verify', definition: 'Verification applies to requirement', syntax: 'verify requirement reqName;' },
        { term: 'subject', definition: 'What requirement applies to', syntax: 'subject subj : PartType;' },
        { term: 'assume', definition: 'Assumption constraint', syntax: 'assume constraint c;' },
        { term: 'require', definition: 'Required constraint', syntax: 'require constraint c;' },
      ]
    },
    {
      id: 'keywords-analysis',
      title: 'Analysis Keywords',
      content: [
        { term: 'constraint def', definition: 'Define equation/rule', syntax: 'constraint def Name { in x; x == ... }' },
        { term: 'constraint', definition: 'Apply constraint', syntax: 'constraint c : ConstraintDef { in x = attr; }' },
        { term: 'assert', definition: 'Must-be-true constraint', syntax: 'assert constraint { x > 0 }' },
        { term: 'calc def', definition: 'Define calculation', syntax: 'calc def Name { in x; return y; }' },
        { term: 'calc', definition: 'Perform calculation', syntax: 'calc c : CalcDef { in x = val; }' },
        { term: 'analysis def', definition: 'Define analysis case', syntax: 'analysis def Name { subject s; }' },
        { term: 'objective', definition: 'What analysis targets', syntax: 'objective obj : ReqDef;' },
      ]
    },
    {
      id: 'operators',
      title: 'Operators & Symbols',
      content: [
        { term: ':', definition: 'Type assignment', syntax: 'part p : PartDef;' },
        { term: ':>', definition: 'Specialization (subtype)', syntax: 'part def Child :> Parent { }' },
        { term: ':>>', definition: 'Redefinition (override)', syntax: 'attribute x :>> inherited = 5;' },
        { term: '~', definition: 'Conjugate (flip direction)', syntax: 'port p : ~PortDef;' },
        { term: '==', definition: 'Constraint equality', syntax: 'x == y * 2' },
        { term: '=', definition: 'Binding/default value', syntax: 'attribute x : Real = 5.0;' },
        { term: '::', definition: 'Namespace path', syntax: 'Package::Element' },
        { term: '[ ]', definition: 'Multiplicity', syntax: 'part wheels : Wheel[4];' },
        { term: '..', definition: 'Multiplicity range', syntax: 'part items : Item[1..10];' },
        { term: '*', definition: 'Zero or more', syntax: 'part items : Item[*];' },
      ]
    },
    {
      id: 'connections',
      title: 'Connections & Flows',
      content: [
        { term: 'connect', definition: 'Link ports together', syntax: 'connect a.port to b.port;' },
        { term: 'bind', definition: 'Make values equal', syntax: 'bind a.x = b.y;' },
        { term: 'flow', definition: 'Item flows between actions', syntax: 'flow source.out to dest.in;' },
        { term: 'in', definition: 'Incoming direction', syntax: 'in item data : Data;' },
        { term: 'out', definition: 'Outgoing direction', syntax: 'out item result : Result;' },
        { term: 'inout', definition: 'Bidirectional', syntax: 'inout item signal : Signal;' },
        { term: 'perform', definition: 'Part performs action', syntax: 'perform action a : ActionDef;' },
        { term: 'exhibit', definition: 'Part exhibits state', syntax: 'exhibit state s : StateDef;' },
      ]
    },
    {
      id: 'value-types',
      title: 'Value Types & Units',
      content: [
        { term: 'Real', definition: 'Floating point number', syntax: 'attribute x : Real = 3.14;' },
        { term: 'Integer', definition: 'Whole number', syntax: 'attribute n : Integer = 42;' },
        { term: 'Boolean', definition: 'True/false', syntax: 'attribute flag : Boolean = true;' },
        { term: 'String', definition: 'Text value', syntax: 'attribute name : String = "test";' },
        { term: 'Units (ISQ)', definition: 'Physical quantities', syntax: 'attribute len : LengthValue = 5 [m];' },
        { term: '[ ]', definition: 'Unit specification', syntax: '100 [kg], 25 [degC], 2.5 [bar]' },
        { term: 'attribute def', definition: 'Custom value type', syntax: 'attribute def Pressure :> Real;' },
      ]
    },
    {
      id: 'imports',
      title: 'Imports & Visibility',
      content: [
        { term: 'import', definition: 'Bring elements into scope', syntax: 'import Package::Element;' },
        { term: 'import *', definition: 'Wildcard import all', syntax: 'import Package::*;' },
        { term: 'private', definition: 'Not visible outside', syntax: 'private part internal : X;' },
        { term: 'public', definition: 'Visible outside (default)', syntax: 'public part exposed : X;' },
        { term: 'protected', definition: 'Visible to specializations', syntax: 'protected attribute x;' },
        { term: 'alias', definition: 'Rename on import', syntax: 'alias NewName for OldName;' },
      ]
    },
    {
      id: 'turbo-domain',
      title: 'Turbocharger Domain',
      content: [
        { term: 'VNT', definition: 'Variable Nozzle Turbine', syntax: 'Adjustable turbine geometry' },
        { term: 'Wastegate', definition: 'Exhaust bypass valve', syntax: 'Binary boost control' },
        { term: 'CHRA', definition: 'Center Housing Rotating Assembly', syntax: 'Shaft + bearings + seals' },
        { term: 'Compressor Map', definition: 'PR vs flow with efficiency', syntax: 'Operating envelope' },
        { term: 'Surge Line', definition: 'Low-flow instability limit', syntax: 'Left boundary of map' },
        { term: 'Choke Line', definition: 'Max flow limit', syntax: 'Right boundary of map' },
        { term: 'Pressure Ratio', definition: 'P_out / P_in', syntax: 'Compressor output metric' },
        { term: 'A/R', definition: 'Area / Radius ratio', syntax: 'Turbine housing sizing' },
        { term: 'TIT', definition: 'Turbine Inlet Temperature', syntax: 'Max ~1050°C typical' },
        { term: 'Transient Response', definition: 'Boost build-up speed', syntax: 'Time to target boost' },
      ]
    },
  ],
};

// === CURRICULUM ===
// ============================================================
// SYSML V2 TRAINER - CURRICULUM
// All learning content - edit this file to add/modify modules
// ============================================================

const curriculum = {
  mindset: {
    id: 'mindset',
    title: 'MBSE Mindset',
    description: 'Why model-based engineering and how to think about it',
    color: '#06b6d4',
    icon: '🧠',
    modules: [
      {
        id: 'mindset-why-mbse',
        title: 'Why Model-Based?',
        type: 'conceptmap',
        why: "Before learning SysML syntax, understand why we model at all. This shapes every decision you'll make.",
        pitfalls: [
          "Building models because 'we should' without clear purpose",
          "Treating the model as documentation instead of executable specification",
          "Modeling everything at max detail — creates maintenance burden"
        ],
        content: {
          central: 'Why Model-Based?',
          description: 'Benefits, trade-offs, and when MBSE makes sense',
          branches: [
            {
              id: 'single-source',
              label: 'Single Source of Truth',
              color: '#22c55e',
              details: "Documents get out of sync. A model is one connected artifact where changing 'pump pressure' updates everywhere.",
              example: "Change a port definition once → all connections using that port reflect the change",
              children: ['Eliminates copy-paste drift', 'Automatic consistency', 'Traceable impact analysis']
            },
            {
              id: 'executable-spec',
              label: 'Executable Specification',
              color: '#8b5cf6',
              details: "Unlike a Word doc, models can be validated, simulated, and queried. The model does work for you.",
              example: "Query: 'Which components have no allocated function?' → instant gap analysis",
              children: ['Validate completeness', 'Simulate behavior', 'Generate artifacts']
            },
            {
              id: 'tradeoffs',
              label: 'Trade-offs & Limits',
              color: '#ef4444',
              details: "MBSE isn't free. Learning curve is real. Tooling can be painful. Be honest about when it's overkill.",
              example: "A one-off jig design probably doesn't need a full SysML model",
              children: ['Learning investment', 'Tool costs', 'Maintenance required']
            },
          ]
        }
      },
      {
        id: 'mindset-model-quality',
        title: 'What Makes a Model Useful?',
        type: 'conceptmap',
        why: "A model that exists but nobody uses is worse than no model. Understanding quality helps you make pragmatic choices.",
        pitfalls: [
          "Confusing 'complete' with 'useful'",
          "Modeling for the tool, not the question",
          "No clear owner — models without maintainers rot"
        ],
        content: {
          central: 'Model Quality',
          description: 'Criteria that separate useful models from shelf-ware',
          branches: [
            {
              id: 'purpose-fit',
              label: 'Fit for Purpose',
              color: '#22c55e',
              details: "A model should answer specific questions. If you can't name what questions your model answers, reconsider.",
              example: "Good: 'This model lets us analyze thermal paths.' Bad: 'This model captures the system.'",
              children: ['Answers real questions', 'Right abstraction level', 'Stakeholder-aligned']
            },
            {
              id: 'maintained',
              label: 'Actively Maintained',
              color: '#3b82f6',
              details: "A model is only as good as its last update. Build maintenance into the workflow.",
              example: "ECO process includes: 'Update affected model elements' as a checklist item",
              children: ['Clear ownership', 'Update triggers defined', 'Part of change process']
            },
          ]
        }
      },
      {
        id: 'mindset-docs-to-models',
        title: 'From Documents to Models',
        type: 'dataflow',
        why: "The hardest part of MBSE isn't learning syntax — it's changing how you think. This shows the mental shift from document-centric to model-centric engineering.",
        pitfalls: [
          "Treating the model as 'just another document to maintain'",
          "Keeping parallel documents 'just in case' — defeats the purpose",
          "Expecting the model to look like your old documents"
        ],
        content: {
          description: 'The shift from document-centric to model-centric engineering',
          nodes: [
            { id: 'doc-world', label: 'Document World', type: 'boundary', x: 50, y: 100 },
            { id: 'silos', label: 'Info Silos', type: 'process', x: 50, y: 200 },
            { id: 'transition', label: 'Mental Shift', type: 'flow', x: 250, y: 150 },
            { id: 'model-world', label: 'Model World', type: 'boundary', x: 450, y: 100 },
            { id: 'connected', label: 'Connected Data', type: 'process', x: 450, y: 200 },
          ],
          edges: [
            { from: 'doc-world', to: 'silos' },
            { from: 'doc-world', to: 'transition' },
            { from: 'silos', to: 'transition' },
            { from: 'transition', to: 'model-world' },
            { from: 'transition', to: 'connected' },
            { from: 'model-world', to: 'connected' },
          ],
          reveals: {
            'doc-world': "Traditional engineering: Word specs, Excel analyses, PowerPoint reviews. Each document is a standalone artifact created and owned separately.",
            'silos': "Documents don't talk to each other. The requirements doc doesn't know if the design changed. The test plan references a spec version that's outdated.",
            'transition': "The mental shift: Stop thinking 'I need to write a document' and start thinking 'I need to capture this information in the model.' Views replace documents.",
            'model-world': "Model-centric engineering: One integrated model is the source of truth. Documents become generated views — reports, not artifacts.",
            'connected': "Information is linked. Change a requirement and see which design elements are affected. Trace from test results back to requirements automatically."
          }
        }
      },
      {
        id: 'mindset-abstraction',
        title: 'Choosing Abstraction Levels',
        type: 'conceptmap',
        why: "The #1 mistake in modeling is wrong abstraction — too detailed too early, or too vague to be useful. Learn to match detail to purpose.",
        pitfalls: [
          "Modeling bolt threads when you haven't defined subsystems yet",
          "Staying so abstract the model can't answer real questions",
          "Mixing abstraction levels in the same view — confuses everyone"
        ],
        content: {
          central: 'Abstraction Levels',
          description: 'Matching model detail to engineering phase and purpose',
          branches: [
            {
              id: 'abstraction-high',
              label: 'High (Concept)',
              color: '#8b5cf6',
              details: "Early phases: What are the major functions? What are the key interfaces to external systems? Black-box the internals.",
              example: "part def Vehicle { port powerIn; port controlSignals; } // No internal structure yet",
              children: ['System context', 'Major functions', 'External interfaces', 'Trade study candidates']
            },
            {
              id: 'abstraction-mid',
              label: 'Medium (Architecture)',
              color: '#22c55e',
              details: "Decompose into subsystems. Define internal interfaces. Allocate functions to structure. This is where most modeling value lives.",
              example: "part def Vehicle { part engine : Engine; part transmission : Transmission; connect engine.output to transmission.input; }",
              children: ['Subsystem breakdown', 'Internal interfaces', 'Function allocation', 'Key parameters']
            },
            {
              id: 'abstraction-low',
              label: 'Low (Detailed Design)',
              color: '#f59e0b',
              details: "Component specs, tolerances, detailed behavior. Often better handled in CAD/analysis tools with model integration.",
              example: "attribute boltTorque : TorqueValue = 45 [N*m]; // Maybe too detailed for SysML?",
              children: ['Component specs', 'Detailed parameters', 'Consider tool boundaries', 'Integration over duplication']
            },
            {
              id: 'abstraction-rule',
              label: 'The Goldilocks Rule',
              color: '#3b82f6',
              details: "Model at the level where decisions are made. If you're debating subsystem boundaries, model subsystems. If you're picking bolts, use CAD.",
              example: "Ask: 'What decision does this model element support?' If no answer, you may be at the wrong level.",
              children: ['Match detail to decisions', 'Avoid premature detail', 'Let tools do what they do best']
            },
          ]
        }
      },
      {
        id: 'mindset-when-to-model',
        title: 'When to Model (and When Not To)',
        type: 'faulttree',
        why: "Not everything needs a model. Knowing when MBSE adds value — and when it's overhead — makes you effective, not just busy.",
        pitfalls: [
          "Modeling everything because 'that's what MBSE means'",
          "Skipping models for complex systems because 'we don't have time'",
          "Using model complexity as a measure of progress"
        ],
        content: {
          root: 'Should I Model This?',
          branches: [
            {
              fault: 'Strong YES — Model It',
              icon: 'info',
              causes: [
                {
                  cause: 'Multiple interacting subsystems',
                  detail: "Complexity comes from interactions. When A affects B affects C, you need a model to see the ripples.",
                  fix: "Start with interface definitions and connections. The structure will reveal hidden dependencies."
                },
                {
                  cause: 'Long lifecycle with many changes',
                  detail: "Systems that evolve over years accumulate inconsistencies. Models maintain coherence.",
                  fix: "Invest in the model early. Maintenance cost is lower than re-documenting each change."
                },
                {
                  cause: 'Multiple stakeholders with different views',
                  detail: "When thermal, electrical, and software teams need different perspectives on the same system.",
                  fix: "One model, multiple views. Each stakeholder sees what they need without separate artifacts."
                }
              ]
            },
            {
              fault: 'Maybe — Consider Scope',
              icon: 'warning',
              causes: [
                {
                  cause: 'Small team, simple system',
                  detail: "If three people can hold it in their heads, a whiteboard might be enough.",
                  fix: "Consider lightweight modeling: capture key interfaces and decisions, skip exhaustive detail."
                },
                {
                  cause: 'Prototype or proof-of-concept',
                  detail: "If it's getting thrown away in 3 months, model investment may not pay off.",
                  fix: "Capture lessons learned in model form only if the concept moves forward."
                }
              ]
            },
            {
              fault: 'Probably NO — Skip It',
              icon: 'error',
              causes: [
                {
                  cause: 'One-off or disposable',
                  detail: "A jig, a test fixture, a single-use tool. No iteration, no maintenance, no stakeholders.",
                  fix: "Just build it. Document with a sketch and move on."
                },
                {
                  cause: 'Mature COTS integration only',
                  detail: "If you're just bolting together commercial products with no custom design.",
                  fix: "Capture interfaces and configuration, but don't model internal COTS structure."
                }
              ]
            }
          ]
        }
      },
    ]
  },

  language: {
    id: 'language',
    title: 'SysML v2 Core Language',
    description: 'The building blocks of SysML v2 textual notation',
    color: '#8b5cf6',
    icon: '📝',
    modules: [
      {
        id: 'language-textual',
        title: 'Textual vs Graphical',
        type: 'conceptmap',
        why: "SysML v2's biggest shift is text-first notation. This changes how you work: version control, diffs, scripting all become possible.",
        pitfalls: [
          "Expecting to 'draw' the model like v1 — text is primary",
          "Thinking textual means no visualization — diagrams are rendered views",
          "Fighting the syntax instead of learning patterns"
        ],
        content: {
          central: 'Textual vs Graphical',
          description: "SysML v2's text-first approach",
          branches: [
            {
              id: 'text-primary',
              label: 'Text as Primary',
              color: '#8b5cf6',
              details: "You write 'part def Pump { }' not drag a block. The text IS the model. Diagrams are generated views.",
              example: `part def Pump {
  port inlet : FluidPort;
  port outlet : FluidPort;
}`,
              children: ['Model is the text file', 'Diagrams are views', 'IDE support']
            },
            {
              id: 'vcs-friendly',
              label: 'Version Control Native',
              color: '#22c55e',
              details: "Text diffs are meaningful. Merging, branching, reviewing model changes works like code.",
              example: "git diff shows: '+  port safetyValve : PressurePort;'",
              children: ['Meaningful diffs', 'Standard merge workflows', 'Code review for models']
            },
          ]
        }
      },
      {
        id: 'language-parts',
        title: 'Parts and Items',
        type: 'conceptmap',
        why: "Parts are building blocks — things your system is made of. Items flow or get exchanged. Master this distinction first.",
        pitfalls: [
          "Using parts for everything — items exist for things that flow",
          "Confusing definition vs usage — 'part def' is a type, 'part x : Type' is an instance",
          "Over-decomposing too early"
        ],
        content: {
          central: 'Parts & Items',
          description: 'Structural elements and things that flow',
          branches: [
            {
              id: 'part-def',
              label: 'Part Definitions',
              color: '#8b5cf6',
              details: "A part definition is a reusable type — like a class. Define once, use many times.",
              example: `part def Pump {
  attribute maxPressure : Real;
  port inlet : FluidInPort;
}`,
              children: ['Reusable type', 'Contains attributes/ports', 'Specialized with :>']
            },
            {
              id: 'part-usage',
              label: 'Part Usages',
              color: '#22c55e',
              details: "A part usage is an instance within a context. Usages can redefine attributes with specific values.",
              example: `part def Vehicle {
  part engine : Engine;
  part wheels : Wheel[4];
}`,
              children: ['Instance of definition', 'Lives in a context', 'Supports multiplicity [n]']
            },
            {
              id: 'items',
              label: 'Item Definitions',
              color: '#f59e0b',
              details: "Items flow, transfer, or are exchanged — not structural. Fuel, signals, data packets, forces.",
              example: `item def Fuel {
  attribute octaneRating : Integer;
}`,
              children: ['Things that flow', 'Not structural', 'Used in flow properties']
            },
          ]
        }
      },
      {
        id: 'language-ports',
        title: 'Ports and Interfaces',
        type: 'conceptmap',
        why: "Ports define how parts connect to the outside world. Interfaces specify what flows through ports. This is how you compose systems.",
        pitfalls: [
          "Creating ports without thinking about what flows through them",
          "Forgetting port direction (in/out/inout) — causes connection errors",
          "Over-specifying interfaces too early — start simple, refine later"
        ],
        content: {
          central: 'Ports & Interfaces',
          description: 'Connection points and their contracts',
          branches: [
            {
              id: 'port-def',
              label: 'Port Definitions',
              color: '#8b5cf6',
              details: "A port definition specifies what a connection point looks like — its direction and what flows through it.",
              example: `port def FluidPort {
  in item fuel : Fuel;
  attribute pressure : Real;
}`,
              children: ['Defines connection contract', 'Has direction (in/out)', 'Contains flow items']
            },
            {
              id: 'port-usage',
              label: 'Port Usages',
              color: '#22c55e',
              details: "Ports are used inside parts. A part can have multiple ports of the same or different types.",
              example: `part def Tank {
  port inlet : FluidPort;
  port outlet : ~FluidPort;  // conjugate
}`,
              children: ['Instance on a part', 'Can be conjugated (~)', 'Multiplicity supported']
            },
            {
              id: 'conjugation',
              label: 'Conjugate Ports',
              color: '#f59e0b',
              details: "The ~ operator flips direction. If FluidPort has 'in fuel', ~FluidPort has 'out fuel'. Essential for connecting compatible ports.",
              example: `// Provider has output
port outlet : ~FluidPort;
// Consumer has input
port inlet : FluidPort;
// They connect!`,
              children: ['~ flips in/out', 'Required for compatible connections', 'Think provider/consumer']
            },
            {
              id: 'interface-def',
              label: 'Interface Definitions',
              color: '#3b82f6',
              details: "Interfaces group related features that ports must provide. Parts can declare they implement an interface.",
              example: `interface def Controllable {
  in item command : Command;
  out item status : Status;
}`,
              children: ['Contract specification', 'Multiple ports can implement', 'Enables substitution']
            },
          ]
        }
      },
      {
        id: 'language-connections',
        title: 'Connections and Bindings',
        type: 'dataflow',
        why: "Connections link ports together to show how parts interact. Understanding connection semantics prevents subtle bugs.",
        pitfalls: [
          "Connecting incompatible port types — check directions match",
          "Forgetting that connections imply item flow, not just topology",
          "Over-connecting — not every relationship needs a connection"
        ],
        content: {
          description: 'How parts communicate through connections',
          nodes: [
            { id: 'part-a', label: 'Part A', type: 'boundary', x: 50, y: 100 },
            { id: 'port-out', label: 'out port', type: 'flow', x: 180, y: 100 },
            { id: 'connection', label: 'connect', type: 'process', x: 310, y: 100 },
            { id: 'port-in', label: 'in port', type: 'flow', x: 440, y: 100 },
            { id: 'part-b', label: 'Part B', type: 'boundary', x: 570, y: 100 },
            { id: 'binding', label: 'bind (=)', type: 'process', x: 310, y: 200 },
          ],
          edges: [
            { from: 'part-a', to: 'port-out' },
            { from: 'port-out', to: 'connection' },
            { from: 'connection', to: 'port-in' },
            { from: 'port-in', to: 'part-b' },
            { from: 'connection', to: 'binding' },
          ],
          reveals: {
            'part-a': "The source part — owns the output port. Think of this as the provider or sender in the interaction.",
            'port-out': "Output port sends items/data outward. Direction is relative to the owning part, not the connection.",
            'connection': "The 'connect' keyword links ports. Syntax: connect partA.portX to partB.portY; — direction must be compatible.",
            'port-in': "Input port receives items/data. Must be conjugate-compatible with the connected output port.",
            'part-b': "The destination part — owns the input port. Think of this as the consumer or receiver.",
            'binding': "Bindings (bind x = y) equate values rather than showing flow. Use for constraints, not communication."
          }
        }
      },
      {
        id: 'language-attributes',
        title: 'Attributes and Value Types',
        type: 'conceptmap',
        why: "Attributes capture properties and characteristics. Value types define what kinds of values are valid. Get this right and your model becomes queryable.",
        pitfalls: [
          "Using strings for everything — lose type safety and units",
          "Forgetting units on physical quantities — mass vs force confusion",
          "Not using enumerations for discrete choices"
        ],
        content: {
          central: 'Attributes & Values',
          description: 'Properties, types, and units',
          branches: [
            {
              id: 'attr-basics',
              label: 'Attribute Basics',
              color: '#8b5cf6',
              details: "Attributes are typed properties. They can have default values and can be redefined in specialized types.",
              example: `part def Pump {
  attribute maxFlow : Real = 100;
  attribute status : PumpStatus;
}`,
              children: ['Named property', 'Has a type', 'Optional default value']
            },
            {
              id: 'value-types',
              label: 'Value Types',
              color: '#22c55e',
              details: "Standard library includes Real, Integer, Boolean, String. Define custom value types for domain concepts.",
              example: `attribute def Temperature :> Real {
  attribute unit : TempUnit;
}`,
              children: ['Primitives: Real, Integer, Boolean, String', 'Custom types specialize primitives', 'Can add constraints']
            },
            {
              id: 'units',
              label: 'Units & Quantities',
              color: '#f59e0b',
              details: "SysML v2 has built-in unit support via ISQ. Always model physical quantities with units to catch errors.",
              example: `attribute mass : ISQ::MassValue;
attribute force : ISQ::ForceValue;
// Can't accidentally add these!`,
              children: ['ISQ standard library', 'Prevents unit mismatch', 'Automatic conversion']
            },
            {
              id: 'enums',
              label: 'Enumerations',
              color: '#3b82f6',
              details: "Enums define a fixed set of allowed values. Much safer than strings for discrete states or modes.",
              example: `enum def PumpStatus {
  off; standby; running; fault;
}
attribute status : PumpStatus = PumpStatus::off;`,
              children: ['Fixed set of values', 'Type-safe', 'Self-documenting']
            },
          ]
        }
      },
      {
        id: 'language-packages',
        title: 'Packages and Imports',
        type: 'conceptmap',
        why: "Packages organize your model into manageable chunks. Imports control visibility and dependencies. Essential for team collaboration.",
        pitfalls: [
          "One giant package with everything — unmanageable",
          "Circular imports — indicates poor structure",
          "Not using private members — everything becomes API"
        ],
        content: {
          central: 'Packages & Imports',
          description: 'Model organization and namespaces',
          branches: [
            {
              id: 'package-basics',
              label: 'Package Basics',
              color: '#8b5cf6',
              details: "Packages are containers that group related elements. They create namespaces to avoid naming conflicts.",
              example: `package TurboSystem {
  part def Compressor { }
  part def Turbine { }
}
// Access: TurboSystem::Compressor`,
              children: ['Groups related elements', 'Creates namespace', 'Can nest packages']
            },
            {
              id: 'imports',
              label: 'Import Statements',
              color: '#22c55e',
              details: "Imports bring elements from other packages into scope. Wildcard (*) imports everything, specific imports are safer.",
              example: `package MyModel {
  import TurboSystem::*;     // all
  import ISQ::MassValue;     // specific
  
  part def Assembly {
    part turbo : Compressor; // no prefix needed
  }
}`,
              children: ['Wildcard: PackageName::*', 'Specific: PackageName::Element', 'Avoid circular imports']
            },
            {
              id: 'visibility',
              label: 'Visibility (public/private)',
              color: '#f59e0b',
              details: "Members are public by default. Use 'private' to hide implementation details that shouldn't be used externally.",
              example: `package API {
  public part def PublicInterface { }
  private part def InternalHelper { }
}`,
              children: ['public = visible outside package', 'private = internal only', 'Default is public']
            },
            {
              id: 'structure',
              label: 'Package Structure Patterns',
              color: '#3b82f6',
              details: "Common patterns: separate definitions from usages, group by domain, keep interfaces in their own package.",
              example: `// Typical structure:
Interfaces/     // port/interface defs
Domain/         // domain-specific types
Structure/      // part definitions
Analysis/       // constraints, views`,
              children: ['Interfaces separate from implementation', 'Domain types in own package', 'One concept per package']
            },
          ]
        }
      },
      {
        id: 'language-states',
        title: 'State Machines',
        type: 'statediagram',
        why: "State machines model discrete behaviors — modes, phases, operating conditions. Essential for control logic, protocols, and lifecycle modeling.",
        pitfalls: [
          "Modeling continuous behavior as states — use actions for continuous flows",
          "Too many states — if >7-10, consider hierarchy or decomposition",
          "Missing transitions — every state should have a way out (except final)"
        ],
        content: {
          description: 'VNT turbo control modes — from startup to shutdown',
          states: [
            { id: 'init', type: 'initial', x: 50, y: 150 },
            { id: 'idle', label: 'Idle', type: 'normal', x: 120, y: 120 },
            { id: 'warmup', label: 'Warmup', type: 'normal', x: 280, y: 50 },
            { id: 'normal', label: 'Normal Op', type: 'normal', x: 280, y: 190 },
            { id: 'boost', label: 'Max Boost', type: 'normal', x: 450, y: 120 },
            { id: 'protect', label: 'Protection', type: 'normal', x: 450, y: 250 },
            { id: 'shutdown', label: 'Shutdown', type: 'normal', x: 280, y: 320 },
            { id: 'final', type: 'final', x: 120, y: 350 },
          ],
          transitions: [
            { from: 'init', to: 'idle' },
            { from: 'idle', to: 'warmup', event: 'start', guard: 'oilTemp < min' },
            { from: 'idle', to: 'normal', event: 'start', guard: 'oilTemp >= min' },
            { from: 'warmup', to: 'normal', event: 'warmupComplete' },
            { from: 'normal', to: 'boost', event: 'kickdown' },
            { from: 'boost', to: 'normal', event: 'cruise' },
            { from: 'normal', to: 'protect', event: 'overtemp' },
            { from: 'boost', to: 'protect', event: 'overtemp' },
            { from: 'protect', to: 'normal', event: 'tempNormal' },
            { from: 'normal', to: 'shutdown', event: 'engineOff' },
            { from: 'shutdown', to: 'final' },
          ],
          reveals: {
            'idle': {
              entry: 'Set VNT to minimum opening (reduce lag)',
              do: 'Monitor oil pressure and temperature',
              exit: 'Log startup timestamp',
              notes: "state def Idle { entry action setVNTMin; do action monitorOil; }"
            },
            'warmup': {
              entry: 'Open VNT to reduce backpressure',
              do: 'Circulate oil, gentle boost only',
              exit: 'Verify oil temp threshold met',
              notes: "Warmup protects bearings. Constraint: oilTemp >= 60°C before full boost."
            },
            'normal': {
              entry: 'Enable closed-loop boost control',
              do: 'PID control of VNT position to target boost',
              exit: 'Save last VNT position for quick restart',
              notes: "Main operating state. Most time spent here. Transitions to boost on demand."
            },
            'boost': {
              entry: 'Close VNT for max spool, increase fuel',
              do: 'Track max TIT, monitor surge margin',
              exit: 'Ramp down VNT gradually (avoid surge)',
              notes: "Time-limited state. assert constraint { duration <= 30[s] }"
            },
            'protect': {
              entry: 'Open VNT fully, reduce fueling, alert driver',
              do: 'Monitor TIT until below threshold',
              exit: 'Clear fault code if temp normal',
              notes: "Guard against thermal damage. Triggered by TIT > 950°C."
            },
            'shutdown': {
              entry: 'Disable boost control',
              do: 'Allow turbo to cool (30s idle if possible)',
              exit: 'Log operating hours, fault counts',
              notes: "Proper shutdown extends bearing life. Skip if emergency."
            },
          }
        }
      },
    ]
  },

  methodology: {
    id: 'methodology',
    title: 'Methodology Essentials',
    description: 'How to approach modeling — what to model first and why',
    color: '#06b6d4',
    icon: '🎯',
    modules: [
      {
        id: 'methodology-what-first',
        title: 'What to Model First',
        type: 'dataflow',
        why: "Starting with the right elements prevents rework. This flow shows how to build a model that grows naturally without constant restructuring.",
        pitfalls: [
          "Jumping straight to detailed parts without context",
          "Modeling solutions before understanding the problem",
          "Skipping stakeholder needs — they anchor everything else"
        ],
        content: {
          description: 'Recommended order for building a SysML v2 model',
          nodes: [
            { id: 'stakeholders', label: 'Stakeholder Needs', type: 'boundary', x: 50, y: 100 },
            { id: 'use-cases', label: 'Use Cases', type: 'process', x: 220, y: 100 },
            { id: 'requirements', label: 'Requirements', type: 'process', x: 390, y: 100 },
            { id: 'structure', label: 'System Structure', type: 'process', x: 280, y: 200 },
            { id: 'behavior', label: 'Behavior', type: 'flow', x: 450, y: 200 },
            { id: 'analysis', label: 'Analysis', type: 'boundary', x: 365, y: 300 },
          ],
          edges: [
            { from: 'stakeholders', to: 'use-cases' },
            { from: 'use-cases', to: 'requirements' },
            { from: 'requirements', to: 'structure' },
            { from: 'requirements', to: 'behavior' },
            { from: 'structure', to: 'analysis' },
            { from: 'behavior', to: 'analysis' },
          ],
          reveals: {
            stakeholders: "Start here. Who cares about this system and what do they need? These become your top-level concerns that everything traces back to.",
            'use-cases': "What does the system do from the user's perspective? Use cases capture the key scenarios without implementation details.",
            requirements: "Formalize the 'shalls'. Each requirement should trace to a stakeholder need and be verifiable.",
            structure: "Now decompose. What parts make up the system? Define part definitions and their relationships.",
            behavior: "How do the parts work together? Actions, states, and interactions that realize the requirements.",
            analysis: "Validate the design. Parametric constraints, trade studies, and verification that requirements are met."
          }
        }
      },
      {
        id: 'methodology-naming',
        title: 'Naming Conventions',
        type: 'conceptmap',
        why: "Names are the UI of your model. Good naming makes models self-documenting and navigable. Bad naming creates confusion that compounds over time.",
        pitfalls: [
          "Inconsistent casing (pump vs Pump vs PUMP)",
          "Abbreviations only the author understands",
          "Names that describe implementation, not purpose"
        ],
        content: {
          central: 'Naming Conventions',
          description: 'Patterns for clear, consistent model element names',
          branches: [
            {
              id: 'naming-definitions',
              label: 'Definition Names',
              color: '#8b5cf6',
              details: "Definitions are types — name them like types. PascalCase, singular, noun-based. Describe what it IS.",
              example: `part def FuelPump { }      // Good
part def fuel_pump { }     // Inconsistent
part def ThePumps { }      // Plural, article`,
              children: ['PascalCase', 'Singular nouns', 'No articles (the, a)', 'Describe the concept']
            },
            {
              id: 'naming-usages',
              label: 'Usage Names',
              color: '#22c55e',
              details: "Usages are instances — name them like variables. camelCase, can be plural for multiplicity, describe the role.",
              example: `part fuelPump : FuelPump;     // Good
part mainFuelPump : FuelPump; // Role-specific
part wheels : Wheel[4];       // Plural for [n]`,
              children: ['camelCase', 'Role-descriptive', 'Plural for multiplicity', 'Context-specific']
            },
            {
              id: 'naming-packages',
              label: 'Package Names',
              color: '#f59e0b',
              details: "Packages are namespaces — name them for organization. PascalCase, describe the domain or layer.",
              example: `package FuelSystem { }
package Interfaces { }
package Analysis::Thermal { }  // Nested`,
              children: ['PascalCase', 'Domain or layer', 'Can nest with ::', 'Avoid deep nesting']
            },
            {
              id: 'naming-avoid',
              label: 'What to Avoid',
              color: '#ef4444',
              details: "Certain patterns cause confusion. Avoid them even if they seem convenient at the time.",
              example: `part def Comp1 { }     // Meaningless number
part def TBD { }       // Placeholder rot
part def NewPump { }   // New compared to what?`,
              children: ['Numbered suffixes', 'TBD/TODO in names', 'Temporal words (new, old)', 'Overly long names']
            },
          ]
        }
      },
      {
        id: 'methodology-views',
        title: 'Views and Viewpoints',
        type: 'conceptmap',
        why: "Different stakeholders need different perspectives. Views let one model serve many audiences without duplication or inconsistency.",
        pitfalls: [
          "Creating separate models for each audience — sync nightmare",
          "One giant view that shows everything — overwhelms everyone",
          "Views that don't trace to stakeholder concerns"
        ],
        content: {
          central: 'Views & Viewpoints',
          description: 'Tailoring model presentation to stakeholder needs',
          branches: [
            {
              id: 'view-concept',
              label: 'View Concept',
              color: '#8b5cf6',
              details: "A view is a filtered, formatted presentation of model data. The model is the truth; views are lenses.",
              example: "Same model → Structural view for mechanical team, Interface view for software team, Requirements view for customer",
              children: ['Filter: what to show', 'Format: how to show it', 'Same underlying data', 'Auto-updates with model']
            },
            {
              id: 'view-viewpoint',
              label: 'Viewpoints',
              color: '#22c55e',
              details: "A viewpoint defines the rules for a class of views — what types of elements, what relationships, what notation.",
              example: `viewpoint def StructuralViewpoint {
  frame SystemStructure;
  include Part;
  include Connection;
}`,
              children: ['Template for views', 'Defines included elements', 'Consistent across views', 'Reusable pattern']
            },
            {
              id: 'view-stakeholder',
              label: 'Stakeholder Matching',
              color: '#f59e0b',
              details: "Map views to stakeholder concerns. Each stakeholder should have a view that answers their questions directly.",
              example: "Customer → Requirements + Verification status\nThermal engineer → Parts + thermal parameters + constraints",
              children: ['Identify stakeholder questions', 'Design view to answer them', 'Minimize noise', 'Include needed context']
            },
            {
              id: 'view-common',
              label: 'Common View Types',
              color: '#3b82f6',
              details: "Standard viewpoints that most projects need. Start with these and customize as needed.",
              example: "System Context, Functional Architecture, Physical Architecture, Interface Definition, Verification Matrix",
              children: ['Context: system + externals', 'Functional: what it does', 'Physical: what it is', 'Interfaces: how things connect']
            },
          ]
        }
      },
      {
        id: 'methodology-reviews',
        title: 'Effective Model Reviews',
        type: 'faulttree',
        why: "Model reviews catch errors early — but only if done well. Bad reviews waste time and miss issues. Learn what makes reviews effective.",
        pitfalls: [
          "Reviewing the diagram, not the model",
          "No clear review criteria or checklist",
          "Reviewers unfamiliar with model structure"
        ],
        content: {
          root: 'Model Review Fails to Find Issues',
          branches: [
            {
              fault: 'Wrong Focus',
              icon: 'warning',
              causes: [
                {
                  cause: 'Reviewing aesthetics over content',
                  detail: "Spending time on diagram layout, colors, and formatting instead of semantic correctness.",
                  fix: "Use a checklist that focuses on: completeness, consistency, traceability, correctness. Aesthetics are last."
                },
                {
                  cause: 'Reviewing in isolation',
                  detail: "Looking at one part of the model without checking connections to related elements.",
                  fix: "Always review relationships: What does this connect to? What depends on this? What traces here?"
                }
              ]
            },
            {
              fault: 'Unprepared Reviewers',
              icon: 'error',
              causes: [
                {
                  cause: 'No context provided',
                  detail: "Reviewers dropped into a model without understanding scope, conventions, or purpose.",
                  fix: "Provide a review package: scope, key decisions, conventions doc, specific questions to answer."
                },
                {
                  cause: 'Reviewers can\'t navigate the model',
                  detail: "Tool unfamiliarity means reviewers can't explore beyond what's shown.",
                  fix: "Train reviewers on basic navigation. Or provide pre-generated views that answer likely questions."
                }
              ]
            },
            {
              fault: 'No Actionable Outcomes',
              icon: 'info',
              causes: [
                {
                  cause: 'Vague feedback',
                  detail: "'This doesn't look right' without specifics. Author can't act on it.",
                  fix: "Require: Element ID, specific issue, suggested fix or question. Make feedback traceable."
                },
                {
                  cause: 'No follow-up process',
                  detail: "Issues identified but no tracking to resolution.",
                  fix: "Log review findings. Assign owners. Verify fixes in subsequent review."
                }
              ]
            }
          ]
        }
      },
    ]
  },

  requirements: {
    id: 'requirements',
    title: 'Requirements & Behavior',
    description: 'Capturing needs, defining behavior, and ensuring traceability',
    color: '#10b981',
    icon: '📋',
    modules: [
      {
        id: 'req-modeling',
        title: 'Requirements in SysML v2',
        type: 'conceptmap',
        why: "Requirements drive everything. SysML v2 makes them first-class model elements that connect to design and verification — not just text in a document.",
        pitfalls: [
          "Writing requirements as prose blobs instead of structured elements",
          "Not connecting requirements to the design that satisfies them",
          "Treating the model as a separate thing from 'the real requirements'"
        ],
        content: {
          central: 'Requirements Modeling',
          description: 'Structured requirements as model elements',
          branches: [
            {
              id: 'req-definition',
              label: 'Requirement Definitions',
              color: '#10b981',
              details: "Requirements are typed elements with attributes. Define requirement types for your domain, then instantiate them.",
              example: `requirement def PerformanceRequirement {
  doc /* The system shall... */
  attribute priority : Priority;
  attribute verificationMethod : VerificationMethod;
}`,
              children: ['requirement def for types', 'doc for text', 'Attributes for metadata', 'Reusable patterns']
            },
            {
              id: 'req-hierarchy',
              label: 'Requirement Hierarchy',
              color: '#3b82f6',
              details: "Requirements decompose. Top-level stakeholder needs break into system requirements, then subsystem requirements. Use containment.",
              example: `requirement stakeholderNeeds {
  requirement systemReqs {
    requirement subsystemReqs { }
  }
}`,
              children: ['Containment = decomposition', 'Trace to parent', 'Maintain context', 'Avoid orphan requirements']
            },
            {
              id: 'req-satisfaction',
              label: 'Satisfaction Links',
              color: '#f59e0b',
              details: "Connect requirements to the design elements that satisfy them. This is how you prove completeness and trace impact.",
              example: `part def Turbocharger {
  satisfy requirement boostRequirement;
}
// or: requirement r { subject s : Turbocharger; }`,
              children: ['satisfy keyword', 'Links req to design', 'Enables coverage analysis', 'Impact tracing']
            },
            {
              id: 'req-verification',
              label: 'Verification',
              color: '#8b5cf6',
              details: "How do you prove the requirement is met? Verification cases define the test/analysis that demonstrates compliance.",
              example: `verification def BoostTest {
  subject : Turbocharger;
  objective : requirement boostReq;
  // Test procedure details
}`,
              children: ['verification def', 'Links to requirement', 'Defines test approach', 'Records results']
            },
          ]
        }
      },
      {
        id: 'req-traceability',
        title: 'Traceability Patterns',
        type: 'dataflow',
        why: "Traceability answers: 'Why does this exist?' and 'What breaks if I change this?' Good traceability makes impact analysis instant.",
        pitfalls: [
          "Tracing everything to everything — creates noise",
          "Only tracing down (needs→design) but not up (design→verification)",
          "Traceability that exists but nobody queries"
        ],
        content: {
          description: 'Traceability chain from stakeholder to verification',
          nodes: [
            { id: 'stakeholder', label: 'Stakeholder Need', type: 'boundary', x: 50, y: 100 },
            { id: 'system-req', label: 'System Requirement', type: 'process', x: 200, y: 100 },
            { id: 'design', label: 'Design Element', type: 'process', x: 350, y: 100 },
            { id: 'verification', label: 'Verification', type: 'boundary', x: 500, y: 100 },
            { id: 'derive', label: 'derive', type: 'flow', x: 125, y: 180 },
            { id: 'satisfy', label: 'satisfy', type: 'flow', x: 275, y: 180 },
            { id: 'verify', label: 'verify', type: 'flow', x: 425, y: 180 },
          ],
          edges: [
            { from: 'stakeholder', to: 'derive' },
            { from: 'derive', to: 'system-req' },
            { from: 'system-req', to: 'satisfy' },
            { from: 'satisfy', to: 'design' },
            { from: 'design', to: 'verify' },
            { from: 'verify', to: 'verification' },
          ],
          reveals: {
            stakeholder: "Where everything starts. 'The customer needs X.' These are often informal but must be captured to anchor everything downstream.",
            'system-req': "Formalized 'shalls' derived from stakeholder needs. Each should trace to at least one need. Orphan requirements are red flags.",
            design: "The parts, interfaces, behaviors that implement the requirement. Satisfaction links prove the design addresses the need.",
            verification: "Tests, analyses, inspections that prove compliance. Every requirement needs a verification. Unverified requirements are wishes.",
            derive: "Derivation shows where requirements come from. Enables asking: 'Why do we have this requirement?'",
            satisfy: "Satisfaction shows what implements the requirement. Enables asking: 'What design elements address this need?'",
            verify: "Verification links show how we prove compliance. Enables asking: 'How do we know this requirement is met?'"
          }
        }
      },
      {
        id: 'req-actions',
        title: 'Actions and Behavior',
        type: 'conceptmap',
        why: "Structure defines what the system IS. Behavior defines what it DOES. Actions model the transformations, flows, and sequences.",
        pitfalls: [
          "Modeling only structure without behavior — half a model",
          "Actions without clear inputs/outputs",
          "Confusing actions (what happens) with states (current condition)"
        ],
        content: {
          central: 'Behavior Modeling',
          description: 'Actions, flows, and sequences',
          branches: [
            {
              id: 'action-def',
              label: 'Action Definitions',
              color: '#10b981',
              details: "Actions are transformations — they take inputs, do something, produce outputs. Think functions, not objects.",
              example: `action def CompressAir {
  in item airIn : Air;
  out item airOut : CompressedAir;
  out item heat : ThermalEnergy;
}`,
              children: ['action def for types', 'in/out items', 'Transformation focus', 'Can have parameters']
            },
            {
              id: 'action-flow',
              label: 'Action Flows',
              color: '#3b82f6',
              details: "Actions connect via flows. Output of one becomes input to another. This creates data flow networks.",
              example: `action processingChain {
  action compress : CompressAir;
  action cool : CoolAir;
  flow compress.airOut to cool.airIn;
}`,
              children: ['flow keyword', 'Connects in/out', 'Sequential or parallel', 'Fork/join for concurrency']
            },
            {
              id: 'action-succession',
              label: 'Succession (Sequence)',
              color: '#f59e0b',
              details: "When order matters but not data flow, use succession. 'First A, then B' without implying A's output feeds B.",
              example: `action procedure {
  action step1;
  action step2;
  first start then step1 then step2 then done;
}`,
              children: ['first/then keywords', 'Control flow', 'start/done markers', 'Decision points']
            },
            {
              id: 'action-allocation',
              label: 'Allocation to Structure',
              color: '#8b5cf6',
              details: "Which part performs which action? Allocation connects behavior to structure. Essential for understanding 'who does what.'",
              example: `part def Compressor {
  perform action compress : CompressAir;
}`,
              children: ['perform keyword', 'Part performs action', 'Enables analysis', 'Drives architecture']
            },
          ]
        }
      },
      {
        id: 'req-states',
        title: 'States and Transitions',
        type: 'conceptmap',
        why: "Systems have modes — off, standby, running, fault. State machines model how systems change between modes and what triggers transitions.",
        pitfalls: [
          "Too many states — exponential complexity",
          "Missing transitions — can't get from A to B",
          "States that overlap — ambiguous current state"
        ],
        content: {
          central: 'State Machines',
          description: 'Modes, transitions, and event handling',
          branches: [
            {
              id: 'state-def',
              label: 'State Definitions',
              color: '#10b981',
              details: "States are conditions or modes. A part can be in exactly one state at a time (per state machine). States can nest.",
              example: `state def TurboState {
  entry; then off;
  state off;
  state running {
    state normal;
    state surge;  // nested
  }
  state fault;
}`,
              children: ['state keyword', 'Mutually exclusive', 'Can nest (substates)', 'entry state required']
            },
            {
              id: 'state-transition',
              label: 'Transitions',
              color: '#3b82f6',
              details: "Transitions define how to move between states. Triggered by events, can have guards (conditions).",
              example: `transition off_to_running
  first off then running
  when startCommand
  if oilPressure > minPressure;`,
              children: ['first/then for states', 'when = trigger event', 'if = guard condition', 'Can have actions']
            },
            {
              id: 'state-events',
              label: 'Events and Triggers',
              color: '#f59e0b',
              details: "Events trigger transitions. Can be signals received, conditions becoming true, or time passing.",
              example: `// Signal event
when receivedSignal : StartCommand
// Time event  
when at 5 [s]
// Change event
when oilTemp > maxTemp`,
              children: ['Signal events', 'Time events', 'Change events', 'Can combine with guards']
            },
            {
              id: 'state-actions',
              label: 'Entry/Exit Actions',
              color: '#8b5cf6',
              details: "States can trigger actions on entry or exit. Useful for setup/cleanup without cluttering transitions.",
              example: `state running {
  entry action startOilPump;
  exit action stopOilPump;
  // ... substates
}`,
              children: ['entry action', 'exit action', 'do action (while in state)', 'Cleaner than transition actions']
            },
          ]
        }
      },
    ]
  },

  analysis: {
    id: 'analysis',
    title: 'Analysis & Constraints',
    description: 'Parametric analysis, constraints, and trade studies',
    color: '#f97316',
    icon: '📊',
    modules: [
      {
        id: 'analysis-constraints',
        title: 'Constraint Definitions',
        type: 'conceptmap',
        why: "Constraints capture equations and rules. They connect parameters across the model, enabling analysis and ensuring consistency.",
        pitfalls: [
          "Constraints without clear inputs/outputs",
          "Over-constraining — system has no solution",
          "Constraints that exist but aren't evaluated"
        ],
        content: {
          central: 'Constraints',
          description: 'Equations, rules, and parametric relationships',
          branches: [
            {
              id: 'constraint-def',
              label: 'Constraint Definitions',
              color: '#f97316',
              details: "Define a constraint as a reusable equation or rule. Parameters are the variables. The constraint expression relates them.",
              example: `constraint def PowerBalance {
  in power_in : PowerValue;
  in power_out : PowerValue;
  in efficiency : Real;
  power_out == power_in * efficiency
}`,
              children: ['constraint def keyword', 'in parameters', 'Equation or inequality', 'Reusable across model']
            },
            {
              id: 'constraint-usage',
              label: 'Applying Constraints',
              color: '#22c55e',
              details: "Use a constraint by binding its parameters to actual model attributes. Now the equation connects real values.",
              example: `part def Turbine {
  attribute powerIn : PowerValue;
  attribute powerOut : PowerValue;
  attribute efficiency : Real;
  
  constraint powerBal : PowerBalance {
    in power_in = powerIn;
    in power_out = powerOut;
    in efficiency = efficiency;
  }
}`,
              children: ['constraint usage : Type', 'Bind to attributes', 'Multiple usages allowed', 'Chain constraints together']
            },
            {
              id: 'constraint-assert',
              label: 'Assertions',
              color: '#ef4444',
              details: "Assertions are constraints that must be true. Violation indicates an error — the model is inconsistent.",
              example: `assert constraint maxTempLimit {
  turbineInletTemp <= maxAllowedTIT
}`,
              children: ['assert keyword', 'Must be satisfied', 'Violations = errors', 'Use for limits/bounds']
            },
            {
              id: 'constraint-patterns',
              label: 'Common Patterns',
              color: '#8b5cf6',
              details: "Standard constraint patterns: conservation laws, efficiency relationships, geometric constraints, performance envelopes.",
              example: `// Mass conservation
massIn == massOut
// Efficiency
outputPower == inputPower * efficiency
// Bounds
minValue <= x && x <= maxValue`,
              children: ['Conservation (mass, energy)', 'Efficiency relationships', 'Bounds and limits', 'Geometric constraints']
            },
          ]
        }
      },
      {
        id: 'analysis-parametric',
        title: 'Parametric Diagrams',
        type: 'dataflow',
        why: "Parametric diagrams show how constraints connect attributes across parts. They're the 'wiring diagram' for your analysis.",
        pitfalls: [
          "Parameters not bound — constraint is orphaned",
          "Wrong units — garbage in, garbage out",
          "Circular constraints without solver support"
        ],
        content: {
          description: 'Connecting constraints to form analysis networks',
          nodes: [
            { id: 'part-a', label: 'Compressor', type: 'boundary', x: 50, y: 80 },
            { id: 'attr-pr', label: 'pressureRatio', type: 'flow', x: 50, y: 160 },
            { id: 'constraint', label: 'Efficiency Calc', type: 'process', x: 250, y: 120 },
            { id: 'attr-eff', label: 'efficiency', type: 'flow', x: 450, y: 80 },
            { id: 'part-b', label: 'System', type: 'boundary', x: 450, y: 160 },
          ],
          edges: [
            { from: 'part-a', to: 'attr-pr' },
            { from: 'attr-pr', to: 'constraint' },
            { from: 'constraint', to: 'attr-eff' },
            { from: 'attr-eff', to: 'part-b' },
          ],
          reveals: {
            'part-a': "Source part with attribute to analyze. The compressor has a pressure ratio that affects efficiency.",
            'attr-pr': "Input parameter to the constraint. Value flows from the part's attribute into the constraint binding.",
            constraint: "The constraint evaluates the equation. Given inputs (pressure ratio, flow), calculates output (efficiency).",
            'attr-eff': "Output parameter from constraint. The calculated efficiency becomes available for downstream use.",
            'part-b': "Consumer of the analysis result. System-level performance depends on compressor efficiency."
          }
        }
      },
      {
        id: 'analysis-trades',
        title: 'Trade Studies',
        type: 'conceptmap',
        why: "Engineering is choosing between alternatives. Trade studies use the model to evaluate options against criteria systematically.",
        pitfalls: [
          "Trading without clear criteria and weights",
          "Not using the model — just doing trade studies in Excel",
          "Analysis paralysis — trading forever without deciding"
        ],
        content: {
          central: 'Trade Studies',
          description: 'Systematic comparison of design alternatives',
          branches: [
            {
              id: 'trade-setup',
              label: 'Setting Up Trades',
              color: '#f97316',
              details: "Define: What are we trading? What are the alternatives? What criteria matter? How do we weight them?",
              example: `// Alternatives as variants
part def Turbocharger {
  variant wastegate : WastegateTurbo;
  variant vnt : VNTTurbo;
}`,
              children: ['Define alternatives', 'Identify criteria', 'Assign weights', 'variant keyword for options']
            },
            {
              id: 'trade-criteria',
              label: 'Evaluation Criteria',
              color: '#22c55e',
              details: "Criteria come from requirements and stakeholder priorities. Make them measurable. Connect to model attributes.",
              example: `// Criteria as analyzed attributes
attribute transientResponse : TimeValue;  // lower is better
attribute cost : CostValue;               // lower is better
attribute efficiency : Real;              // higher is better`,
              children: ['Derived from requirements', 'Must be measurable', 'Direction (higher/lower better)', 'Weighting for priority']
            },
            {
              id: 'trade-analysis',
              label: 'Running Analysis',
              color: '#3b82f6',
              details: "For each alternative, evaluate the criteria using model constraints. Collect results into a decision matrix.",
              example: `// Each variant binds to same constraint set
// Evaluate: VNT scores 0.8 on response, 0.6 on cost
// Evaluate: Wastegate scores 0.5 on response, 0.9 on cost`,
              children: ['Evaluate per alternative', 'Use model constraints', 'Normalize scores', 'Build decision matrix']
            },
            {
              id: 'trade-decision',
              label: 'Making Decisions',
              color: '#8b5cf6',
              details: "Weighted sum gives overall score. But don't just pick highest — check sensitivity. Document rationale in model.",
              example: `// Weighted scores
VNT: 0.8*0.6 + 0.6*0.4 = 0.72
Wastegate: 0.5*0.6 + 0.9*0.4 = 0.66
// VNT wins, but sensitive to response weight`,
              children: ['Weighted scoring', 'Sensitivity analysis', 'Document rationale', 'Capture in model']
            },
          ]
        }
      },
    ]
  },

  turboDomain: {
    id: 'turboDomain',
    title: 'Turbocharger Domain',
    description: 'Worked examples applying SysML v2 to turbocharger systems',
    color: '#ef4444',
    icon: '🏭',
    modules: [
      {
        id: 'turbo-system-context',
        title: 'System Context Model',
        type: 'dataflow',
        why: "Every model starts with context: what's inside the boundary, what's outside, and how they interact. This shows a turbocharger in its engine context.",
        pitfalls: [
          "Modeling turbo internals before understanding engine interface",
          "Forgetting the control system is an external actor",
          "Not capturing all the flows (air, exhaust, oil, coolant, signals)"
        ],
        content: {
          description: 'Turbocharger system boundary and external interfaces',
          nodes: [
            { id: 'engine', label: 'Engine', type: 'boundary', x: 50, y: 150 },
            { id: 'airfilter', label: 'Air Filter', type: 'boundary', x: 200, y: 50 },
            { id: 'turbo', label: 'Turbocharger', type: 'process', x: 300, y: 150 },
            { id: 'intercooler', label: 'Intercooler', type: 'flow', x: 450, y: 50 },
            { id: 'exhaust', label: 'Exhaust System', type: 'boundary', x: 450, y: 250 },
            { id: 'ecu', label: 'ECU', type: 'boundary', x: 200, y: 250 },
          ],
          edges: [
            { from: 'airfilter', to: 'turbo' },
            { from: 'turbo', to: 'intercooler' },
            { from: 'intercooler', to: 'engine' },
            { from: 'engine', to: 'turbo' },
            { from: 'turbo', to: 'exhaust' },
            { from: 'ecu', to: 'turbo' },
          ],
          reveals: {
            engine: "The engine is an external system from the turbo's perspective. It provides exhaust energy and receives compressed air. Key interface: exhaust gas temp, pressure, flow rate.",
            airfilter: "Ambient air enters through the filter. The turbo sees filtered air at ambient pressure and temperature. Interface: mass flow rate, inlet restriction.",
            turbo: "The system under design. Contains compressor, turbine, bearing system, and (for VNT) actuation. This is your modeling boundary.",
            intercooler: "Compressed air is hot. The intercooler cools it before the engine. Interface: charge air temp and pressure drop. Often modeled as external.",
            exhaust: "Post-turbine exhaust exits to aftertreatment. Interface: backpressure constraint, turbine outlet conditions.",
            ecu: "The ECU commands boost pressure (and VNT position). Interface: target boost, actual boost feedback, position commands."
          }
        }
      },
      {
        id: 'turbo-structure',
        title: 'Turbo Part Decomposition',
        type: 'conceptmap',
        why: "Decomposing the turbo into parts establishes the structural architecture. This drives interface definitions and analysis allocation.",
        pitfalls: [
          "Decomposing too deep too early — start with major assemblies",
          "Forgetting the bearing system — it's critical for modeling",
          "Mixing part types (structural vs flow items)"
        ],
        content: {
          central: 'Turbocharger Assembly',
          description: 'Major structural components and their relationships',
          branches: [
            {
              id: 'turbo-compressor',
              label: 'Compressor',
              color: '#3b82f6',
              details: "The cold side. Draws ambient air, compresses it, delivers to the engine. Driven by the turbine via shared shaft.",
              example: `part def Compressor {
  part wheel : CompressorWheel;
  part housing : CompressorHousing;
  port airIn : AirPort;
  port airOut : ~AirPort;
}`,
              children: ['Compressor wheel', 'Compressor housing', 'Diffuser', 'Inlet geometry']
            },
            {
              id: 'turbo-turbine',
              label: 'Turbine',
              color: '#ef4444',
              details: "The hot side. Extracts energy from exhaust gas, drives the compressor. For VNT, includes variable nozzle mechanism.",
              example: `part def Turbine {
  part wheel : TurbineWheel;
  part housing : TurbineHousing;
  part nozzle : VNTNozzle;  // For VNT variants
  port exhaustIn : ExhaustPort;
  port exhaustOut : ~ExhaustPort;
}`,
              children: ['Turbine wheel', 'Turbine housing', 'VNT nozzle ring', 'Wastegate (if applicable)']
            },
            {
              id: 'turbo-chra',
              label: 'Center Housing (CHRA)',
              color: '#22c55e',
              details: "Center Housing Rotating Assembly. Contains bearings, shaft, seals. The mechanical link between compressor and turbine.",
              example: `part def CHRA {
  part shaft : Shaft;
  part bearings : Bearing[2];
  part seals : Seal[2];
  port oilIn : OilPort;
  port oilOut : ~OilPort;
}`,
              children: ['Shaft', 'Journal bearings', 'Thrust bearing', 'Oil seals', 'Heat shield']
            },
            {
              id: 'turbo-actuation',
              label: 'Actuation System',
              color: '#f59e0b',
              details: "Controls boost. VNT uses electric or pneumatic actuator to position nozzle vanes. Wastegate turbos use a bypass valve.",
              example: `part def VNTActuator {
  port positionCmd : SignalPort;
  port positionFbk : ~SignalPort;
  attribute strokeLength : LengthValue;
}`,
              children: ['Actuator (electric/pneumatic)', 'Linkage', 'Position sensor', 'Control interface']
            },
          ]
        }
      },
      {
        id: 'turbo-interfaces',
        title: 'Interface Definitions',
        type: 'conceptmap',
        why: "Interfaces define what flows between components. Getting these right enables analysis and ensures parts can connect properly.",
        pitfalls: [
          "Defining interfaces without physical basis — what actually flows?",
          "Forgetting direction matters — provider vs consumer",
          "Over-constraining interfaces too early"
        ],
        content: {
          central: 'Turbo Interfaces',
          description: 'Port and flow definitions for turbocharger modeling',
          branches: [
            {
              id: 'interface-air',
              label: 'Air/Gas Ports',
              color: '#3b82f6',
              details: "Air and exhaust ports carry gas flows. Key properties: mass flow, temperature, pressure. Direction distinguishes inlet from outlet.",
              example: `port def GasPort {
  in item gas : GasFlow;
  attribute temperature : TemperatureValue;
  attribute pressure : PressureValue;
  attribute massFlow : MassFlowValue;
}`,
              children: ['Compressor inlet/outlet', 'Turbine inlet/outlet', 'Include T, P, mdot']
            },
            {
              id: 'interface-oil',
              label: 'Oil Ports',
              color: '#22c55e',
              details: "Oil flows through the CHRA for lubrication and cooling. Supply and drain have different pressure/temp requirements.",
              example: `port def OilSupplyPort {
  in item oil : LubeOil;
  attribute pressure : PressureValue;
  attribute temperature : TemperatureValue;
  attribute flowRate : VolumeFlowValue;
}`,
              children: ['Oil supply (high pressure)', 'Oil drain (low pressure)', 'Temperature limits']
            },
            {
              id: 'interface-mechanical',
              label: 'Mechanical Interfaces',
              color: '#f59e0b',
              details: "Mounting, shaft connections. These define physical attachment and torque transfer.",
              example: `port def ShaftInterface {
  attribute torque : TorqueValue;
  attribute speed : AngularVelocityValue;
}`,
              children: ['Shaft coupling', 'Mounting flange', 'Bolt patterns']
            },
            {
              id: 'interface-control',
              label: 'Control Signals',
              color: '#8b5cf6',
              details: "Electrical signals for actuation and sensing. PWM commands, position feedback, speed sensors.",
              example: `port def ActuatorPort {
  in item pwmCommand : PWMSignal;
  out item positionFeedback : AnalogSignal;
}`,
              children: ['Position command (PWM)', 'Position feedback', 'Speed sensor', 'Diagnostic signals']
            },
          ]
        }
      },
      {
        id: 'turbo-parameters',
        title: 'Key Performance Parameters',
        type: 'conceptmap',
        why: "Parameters drive analysis and trade studies. Defining them consistently enables constraint checking and optimization.",
        pitfalls: [
          "Parameters without units — leads to errors",
          "Duplicating parameters instead of referencing",
          "Not connecting parameters to requirements"
        ],
        content: {
          central: 'Turbo Parameters',
          description: 'Critical attributes for turbocharger performance',
          branches: [
            {
              id: 'param-aero',
              label: 'Aerodynamic',
              color: '#3b82f6',
              details: "Compressor and turbine map parameters. Efficiency, pressure ratio, flow range define the operating envelope.",
              example: `attribute compressorPR : Real;      // Pressure ratio
attribute compressorEff : Real;    // Isentropic efficiency
attribute surgeMargin : Real;      // % margin to surge`,
              children: ['Pressure ratio', 'Efficiency (isentropic)', 'Mass flow', 'Surge/choke limits']
            },
            {
              id: 'param-mechanical',
              label: 'Mechanical',
              color: '#22c55e',
              details: "Rotordynamics, stress, life parameters. Speed limits, inertia, bearing loads.",
              example: `attribute maxSpeed : AngularVelocityValue;
attribute rotorInertia : InertiaValue;
attribute thrustLoad : ForceValue;`,
              children: ['Max speed', 'Rotor inertia', 'Bearing loads', 'Burst margin']
            },
            {
              id: 'param-thermal',
              label: 'Thermal',
              color: '#ef4444',
              details: "Temperature limits, heat transfer. Turbine inlet temp, oil coking limits, housing temps.",
              example: `attribute maxTIT : TemperatureValue = 1050 [K];
attribute oilCokeLimit : TemperatureValue = 473 [K];`,
              children: ['Max turbine inlet temp', 'Oil temperature limits', 'Housing temperatures', 'Thermal growth']
            },
            {
              id: 'param-response',
              label: 'Transient Response',
              color: '#f59e0b',
              details: "Boost build-up, lag characteristics. Time to target boost, acceleration response.",
              example: `attribute timeToBoost : TimeValue;  // 0-90% boost
attribute transientResponse : Real; // Normalized lag metric`,
              children: ['Time to boost', 'Transient efficiency', 'VNT response time', 'Tip-in behavior']
            },
          ]
        }
      },
      {
        id: 'turbo-compressor-map',
        title: 'Reading Compressor Maps',
        type: 'dataflow',
        why: "The compressor map is the turbo's fingerprint. Understanding how to read it — and model its constraints — is fundamental to sizing and analysis.",
        pitfalls: [
          "Ignoring surge line — compressor instability destroys turbos",
          "Confusing corrected vs actual flow rates",
          "Picking efficiency islands without considering operating range"
        ],
        content: {
          description: 'Anatomy of a compressor map and how to interpret it',
          nodes: [
            { id: 'flow-axis', label: 'Mass Flow (X)', type: 'boundary', x: 50, y: 100 },
            { id: 'pr-axis', label: 'Pressure Ratio (Y)', type: 'boundary', x: 50, y: 200 },
            { id: 'surge-line', label: 'Surge Line', type: 'process', x: 200, y: 80 },
            { id: 'speed-lines', label: 'Speed Lines', type: 'flow', x: 200, y: 150 },
            { id: 'eff-islands', label: 'Efficiency Islands', type: 'flow', x: 200, y: 220 },
            { id: 'choke-line', label: 'Choke Line', type: 'process', x: 350, y: 150 },
            { id: 'op-point', label: 'Operating Point', type: 'boundary', x: 350, y: 220 },
          ],
          edges: [
            { from: 'flow-axis', to: 'speed-lines' },
            { from: 'pr-axis', to: 'speed-lines' },
            { from: 'surge-line', to: 'speed-lines' },
            { from: 'speed-lines', to: 'choke-line' },
            { from: 'speed-lines', to: 'eff-islands' },
            { from: 'eff-islands', to: 'op-point' },
          ],
          reveals: {
            'flow-axis': "X-axis is corrected mass flow rate (accounts for inlet conditions). Higher flow = more air moved. Units typically kg/s or lb/min corrected.",
            'pr-axis': "Y-axis is pressure ratio (outlet/inlet total pressure). Higher PR = more boost. A PR of 2.5 means outlet pressure is 2.5× inlet.",
            'surge-line': "Left boundary — the danger zone. Operating left of surge causes flow reversal, vibration, and damage. Always maintain surge margin.",
            'speed-lines': "Curved lines of constant turbo speed (RPM). Moving up a speed line = more PR at higher restriction. Speed increases left-to-right across lines.",
            'eff-islands': "Contours of isentropic efficiency (η). Peak efficiency 70-80% typical. Operating far from peak wastes energy as heat.",
            'choke-line': "Right boundary — max flow the compressor can pass. Speed lines go vertical here. More flow impossible regardless of speed.",
            'op-point': "Where the engine operates on the map. Defined by engine flow demand and system restriction. Should have surge margin and good efficiency."
          }
        }
      },
      {
        id: 'turbo-turbine-matching',
        title: 'Turbine Sizing and Matching',
        type: 'conceptmap',
        why: "The turbine extracts exhaust energy to drive the compressor. Getting the turbine size right balances boost response against high-RPM backpressure.",
        pitfalls: [
          "Turbine too small — great response but chokes the engine at high power",
          "Turbine too large — laggy response, poor low-end boost",
          "Ignoring the power balance — turbine must drive compressor plus losses"
        ],
        content: {
          central: 'Turbine Matching',
          description: 'Sizing the turbine for the application',
          branches: [
            {
              id: 'turbine-ar',
              label: 'A/R Ratio',
              color: '#ef4444',
              details: "Area/Radius ratio sets the turbine's 'gear ratio.' Smaller A/R = faster spool, more backpressure. Larger A/R = slower spool, less restriction.",
              example: `attribute turbineAR : Real = 0.82;  // Typical diesel
// Gasoline might use 0.6-0.8
// Large diesel might use 1.0+`,
              children: ['Smaller A/R = quicker spool', 'Larger A/R = more top-end', 'Trade-off is fundamental', 'VNT varies this dynamically']
            },
            {
              id: 'turbine-wheel',
              label: 'Wheel Sizing',
              color: '#f59e0b',
              details: "Wheel diameter and trim affect flow capacity and inertia. Larger wheels flow more but spool slower. Match to engine displacement.",
              example: `attribute turbineExducer : LengthValue = 56 [mm];
attribute turbineTrim : Real = 76;  // (inducer/exducer)² × 100`,
              children: ['Exducer diameter', 'Trim (inducer/exducer ratio)', 'Blade count and angle', 'Inertia implications']
            },
            {
              id: 'turbine-power',
              label: 'Power Balance',
              color: '#22c55e',
              details: "Turbine power must equal compressor power plus bearing losses. This is the fundamental matching equation.",
              example: `constraint def TurboPowerBalance {
  in turbinePower : PowerValue;
  in compressorPower : PowerValue;
  in bearingLoss : PowerValue;
  turbinePower == compressorPower + bearingLoss
}`,
              children: ['Turbine extracts energy', 'Compressor consumes energy', 'Bearing friction losses', 'Heat transfer losses']
            },
            {
              id: 'turbine-map',
              label: 'Turbine Maps',
              color: '#3b82f6',
              details: "Like compressor maps but for the hot side. Shows efficiency and flow vs pressure ratio and speed. Used for detailed matching.",
              example: `// Turbine map parameters
attribute turbineEfficiency : Real;    // 0.65-0.75 typical
attribute expansionRatio : Real;       // P_in / P_out
attribute reducedMassFlow : Real;      // Corrected for conditions`,
              children: ['Efficiency vs expansion ratio', 'Reduced mass flow parameter', 'Often simplified to single curve', 'Critical for transient modeling']
            },
          ]
        }
      },
      {
        id: 'turbo-vnt-vs-wastegate',
        title: 'VNT vs Wastegate Trade-offs',
        type: 'faulttree',
        why: "Choosing between VNT and wastegate is a fundamental architecture decision. Each has strengths — understanding the trade-offs drives the right choice.",
        pitfalls: [
          "Assuming VNT is always better — it's more complex and expensive",
          "Ignoring duty cycle — wastegate may be fine for steady-state applications",
          "Not considering failure modes — VNT has more failure points"
        ],
        content: {
          root: 'VNT or Wastegate?',
          branches: [
            {
              fault: 'Choose VNT When...',
              icon: 'info',
              causes: [
                {
                  cause: 'Wide operating range needed',
                  detail: "VNT varies effective A/R continuously. Good for engines with broad speed/load maps — automotive diesel is classic case.",
                  fix: "Model as variable A/R. Add actuator position as control input. Define position vs A/R relationship."
                },
                {
                  cause: 'Transient response critical',
                  detail: "VNT can close vanes for fast spool at low flow, open for capacity at high flow. Best of both worlds.",
                  fix: "Include transient response requirement. Model vane position dynamics and response time."
                },
                {
                  cause: 'Emissions compliance required',
                  detail: "VNT enables precise boost control for EGR and emissions. Regulatory requirements often drive VNT adoption.",
                  fix: "Link VNT control to emissions constraints. Model EGR + boost interaction."
                }
              ]
            },
            {
              fault: 'Choose Wastegate When...',
              icon: 'info',
              causes: [
                {
                  cause: 'Cost is primary driver',
                  detail: "Wastegate turbos are simpler and cheaper. If the application doesn't need VNT's flexibility, don't pay for it.",
                  fix: "Model as fixed A/R with bypass valve. Simpler control logic."
                },
                {
                  cause: 'High temperature environment',
                  detail: "VNT mechanisms can be vulnerable to extreme heat (gasoline race engines). Wastegate is more robust.",
                  fix: "Add thermal constraints for vane mechanism if considering VNT. May rule it out."
                },
                {
                  cause: 'Steady-state dominant',
                  detail: "Generator sets, marine, industrial — if operating point is stable, VNT complexity isn't justified.",
                  fix: "Analyze duty cycle. If operating point variation is low, wastegate is sufficient."
                }
              ]
            },
            {
              fault: 'Key Modeling Differences',
              icon: 'warning',
              causes: [
                {
                  cause: 'VNT: Variable geometry',
                  detail: "VNT needs vane position as a parameter affecting A/R, efficiency, and flow capacity.",
                  fix: "attribute vanePosition : Real; // 0-100%\nConstraint: A/R = f(vanePosition)"
                },
                {
                  cause: 'Wastegate: Bypass flow',
                  detail: "Wastegate diverts exhaust around turbine. Model bypass valve position and split flow.",
                  fix: "attribute wastegatePosition : Real;\nConstraint: bypassFlow = f(wastegatePosition, exhaustPressure)"
                }
              ]
            }
          ]
        }
      },
      {
        id: 'turbo-operating-limits',
        title: 'Operating Constraints',
        type: 'conceptmap',
        why: "Every turbo has limits — surge, choke, speed, temperature. Modeling these as constraints enables automated validation that the design stays in bounds.",
        pitfalls: [
          "Defining limits but not connecting them to analysis",
          "Single-point limits when the envelope is multi-dimensional",
          "Forgetting that limits change with conditions (altitude, ambient temp)"
        ],
        content: {
          central: 'Operating Constraints',
          description: 'Physical limits that bound turbo operation',
          branches: [
            {
              id: 'limit-surge',
              label: 'Surge Limit',
              color: '#ef4444',
              details: "Minimum stable flow at a given PR. Operating left of surge line causes compressor stall — flow reverses, pressure collapses, cycle repeats violently.",
              example: `constraint def SurgeMargin {
  in operatingFlow : MassFlowValue;
  in surgeFlow : MassFlowValue;
  assert constraint { operatingFlow > surgeFlow * 1.10 }  // 10% margin
}`,
              children: ['Flow reversal instability', 'Pressure pulsations', 'Mechanical damage risk', 'Always maintain margin']
            },
            {
              id: 'limit-choke',
              label: 'Choke Limit',
              color: '#f59e0b',
              details: "Maximum flow the compressor can pass. Beyond choke, flow is sonic — can't increase regardless of downstream conditions or speed.",
              example: `constraint def ChokeLimit {
  in operatingFlow : MassFlowValue;
  in maxFlow : MassFlowValue;
  assert constraint { operatingFlow < maxFlow }
}`,
              children: ['Sonic flow condition', 'Hard physical limit', 'Indicates undersized compressor', 'Size for headroom']
            },
            {
              id: 'limit-speed',
              label: 'Speed Limit',
              color: '#8b5cf6',
              details: "Rotor speed is limited by blade stress and bearing capability. Exceeding max speed risks burst — catastrophic failure.",
              example: `constraint def SpeedLimit {
  in shaftSpeed : AngularVelocityValue;
  in maxSpeed : AngularVelocityValue;
  assert constraint { shaftSpeed <= maxSpeed }
}
// Typical max: 150,000-250,000 RPM`,
              children: ['Blade stress limit', 'Bearing DN limit', 'Burst is catastrophic', 'Include safety factor']
            },
            {
              id: 'limit-thermal',
              label: 'Thermal Limits',
              color: '#22c55e',
              details: "Turbine inlet temperature, oil coking, housing temps. Thermal limits often set by material properties and oil chemistry.",
              example: `constraint def ThermalLimits {
  in TIT : TemperatureValue;
  in oilTemp : TemperatureValue;
  assert constraint { TIT <= 1323 [K] }      // ~1050°C
  assert constraint { oilTemp <= 473 [K] }   // ~200°C coking limit
}`,
              children: ['Turbine wheel material', 'Housing material', 'Oil coking point', 'Seal temperature limits']
            },
          ]
        }
      },
      {
        id: 'turbo-sizing-workflow',
        title: 'Sizing Methodology',
        type: 'dataflow',
        why: "Turbo sizing follows a logical flow: engine requirements → airflow targets → compressor selection → turbine matching → verification. The model should reflect this process.",
        pitfalls: [
          "Picking a turbo first, then hoping it fits — backwards",
          "Sizing for peak power only, ignoring the operating range",
          "Not iterating — first guess is rarely optimal"
        ],
        content: {
          description: 'Workflow for sizing a turbocharger to an engine',
          nodes: [
            { id: 'engine-req', label: 'Engine Requirements', type: 'boundary', x: 50, y: 100 },
            { id: 'airflow-calc', label: 'Airflow Targets', type: 'process', x: 200, y: 100 },
            { id: 'comp-select', label: 'Compressor Selection', type: 'process', x: 350, y: 100 },
            { id: 'turbine-match', label: 'Turbine Matching', type: 'process', x: 200, y: 200 },
            { id: 'system-model', label: 'System Integration', type: 'flow', x: 350, y: 200 },
            { id: 'verify', label: 'Verify Constraints', type: 'boundary', x: 450, y: 150 },
          ],
          edges: [
            { from: 'engine-req', to: 'airflow-calc' },
            { from: 'airflow-calc', to: 'comp-select' },
            { from: 'comp-select', to: 'turbine-match' },
            { from: 'turbine-match', to: 'system-model' },
            { from: 'comp-select', to: 'system-model' },
            { from: 'system-model', to: 'verify' },
          ],
          reveals: {
            'engine-req': "Start with what the engine needs: displacement, power target, RPM range, boost pressure. Also constraints: packaging, cost, emissions tier.",
            'airflow-calc': "Calculate required airflow from engine parameters: Flow = (Displacement × RPM × VE × PR) / 2 (for 4-stroke). Account for charge air cooling.",
            'comp-select': "Plot required operating points on candidate compressor maps. Check: surge margin across range, efficiency at key points, flow capacity at max power.",
            'turbine-match': "Select turbine to drive the compressor. Balance spool (small A/R) vs restriction (large A/R). Power balance: turbine must supply compressor + losses.",
            'system-model': "Integrate compressor and turbine into system model. Add constraints: surge margin, speed limit, thermal limits. Connect to engine air path.",
            verify: "Run analysis: Do all operating points stay within limits? Is surge margin adequate? Speed within bounds? Iterate if needed."
          }
        }
      },
    ]
  },

  caseStudy: {
    id: 'caseStudy',
    title: 'Case Study: VNT Turbo Sizing',
    description: 'Complete worked example — sizing a turbo for a 2.0L diesel using SysML v2',
    color: '#ec4899',
    icon: '🎓',
    modules: [
      {
        id: 'case-intro',
        title: '1. Problem Statement',
        type: 'conceptmap',
        why: "Every project starts with understanding what we're trying to achieve. This case study sizes a VNT turbocharger for a 2.0L light-duty diesel engine.",
        pitfalls: [
          "Jumping to solutions before understanding constraints",
          "Missing key stakeholder needs",
          "Not capturing the 'why' behind requirements"
        ],
        content: {
          central: 'Project Brief',
          description: 'Sizing a VNT turbo for a 2.0L diesel — what we know',
          branches: [
            {
              id: 'case-engine',
              label: 'Engine Specs',
              color: '#3b82f6',
              details: "The engine defines our airflow needs. 2.0L displacement, 4-cylinder, targeting 150kW peak power at 4000 RPM.",
              example: `// Given engine parameters
displacement = 2.0 [L]
cylinders = 4
peakPower = 150 [kW] @ 4000 [RPM]
idleSpeed = 800 [RPM]
ratedSpeed = 4000 [RPM]`,
              children: ['2.0L displacement', '4-cylinder inline', '150kW target', '4000 RPM rated speed']
            },
            {
              id: 'case-targets',
              label: 'Performance Targets',
              color: '#22c55e',
              details: "What the customer needs: strong low-end torque for drivability, full power at rated speed, acceptable transient response.",
              example: `// Performance requirements
maxBoost = 2.2 [bar] absolute
torquePeak = 400 [N·m] @ 1750-2500 RPM
timeToBoost = < 1.5 [s] (1000→2000 RPM step)`,
              children: ['2.2 bar max boost', '400 N·m plateau', '< 1.5s transient', 'Euro 6d emissions']
            },
            {
              id: 'case-constraints',
              label: 'Constraints',
              color: '#f59e0b',
              details: "Boundaries we can't exceed: packaging envelope, cost target, durability requirements, emissions compliance.",
              example: `// Design constraints
maxTIT = 850 [degC]  // Emissions durability
packageLength = < 250 [mm]
targetLife = 240000 [km]
costTarget = "competitive with current gen"`,
              children: ['850°C max TIT', 'Packaging envelope', '240k km durability', 'Cost competitive']
            },
            {
              id: 'case-approach',
              label: 'Our Approach',
              color: '#8b5cf6',
              details: "We'll model this in SysML v2: capture requirements, define structure, add parametric constraints, run trade study, verify compliance.",
              example: `// Model structure
package TurboSizingCaseStudy {
  package Requirements { }
  package Structure { }
  package Analysis { }
  package Verification { }
}`,
              children: ['Requirements capture', 'Structural model', 'Parametric analysis', 'Verification']
            },
          ]
        }
      },
      {
        id: 'case-requirements',
        title: '2. Requirements Model',
        type: 'dataflow',
        why: "Before designing anything, formalize what 'success' means. Requirements become traceable model elements that we'll verify against.",
        pitfalls: [
          "Vague requirements that can't be verified",
          "Missing traceability to stakeholder needs",
          "Requirements that conflict without realizing it"
        ],
        content: {
          description: 'Capturing turbo requirements in SysML v2',
          nodes: [
            { id: 'stakeholder', label: 'Stakeholder Need', type: 'boundary', x: 50, y: 100 },
            { id: 'sys-req', label: 'System Requirement', type: 'process', x: 200, y: 100 },
            { id: 'perf-req', label: 'Performance Reqs', type: 'flow', x: 350, y: 50 },
            { id: 'constraint-req', label: 'Constraint Reqs', type: 'flow', x: 350, y: 150 },
            { id: 'verify', label: 'Verification Method', type: 'boundary', x: 500, y: 100 },
          ],
          edges: [
            { from: 'stakeholder', to: 'sys-req' },
            { from: 'sys-req', to: 'perf-req' },
            { from: 'sys-req', to: 'constraint-req' },
            { from: 'perf-req', to: 'verify' },
            { from: 'constraint-req', to: 'verify' },
          ],
          reveals: {
            stakeholder: `package Requirements {
  requirement def StakeholderNeed {
    doc /* Stakeholder needs drive everything */
  }
  
  requirement vehiclePerformance : StakeholderNeed {
    doc /* Vehicle must achieve competitive acceleration and towing capability */
  }
  
  requirement emissionsCompliance : StakeholderNeed {
    doc /* Vehicle must meet Euro 6d emissions standards */
  }
}`,
            'sys-req': `  // System requirements derived from stakeholder needs
  requirement def TurboRequirement :> StakeholderNeed {
    attribute priority : Integer;
    attribute verificationMethod : VerificationMethod;
  }
  
  requirement boostCapability : TurboRequirement {
    doc /* Turbo shall deliver 2.2 bar absolute boost at rated power */
    attribute priority = 1;
    attribute targetBoost : PressureValue = 2.2 [bar];
  }`,
            'perf-req': `  requirement transientResponse : TurboRequirement {
    doc /* Turbo shall achieve 90% boost within 1.5s on 1000-2000 RPM tip-in */
    attribute priority = 1;
    attribute maxResponseTime : TimeValue = 1.5 [s];
  }
  
  requirement lowEndTorque : TurboRequirement {
    doc /* Turbo shall support 400 Nm from 1750-2500 RPM */
    attribute priority = 1;
    attribute torqueTarget : TorqueValue = 400 [N*m];
  }`,
            'constraint-req': `  requirement thermalDurability : TurboRequirement {
    doc /* Turbo shall operate continuously at TIT ≤ 850°C */
    attribute priority = 1;
    attribute maxTIT : TemperatureValue = 1123 [K];  // 850°C
  }
  
  requirement surgeMargin : TurboRequirement {
    doc /* Turbo shall maintain ≥ 10% surge margin at all operating points */
    attribute priority = 2;
    attribute minMargin : Real = 0.10;
  }`,
            verify: `  // Verification links to requirements
  enum def VerificationMethod { analysis; test; inspection; demonstration; }
  
  verification def BoostVerification {
    subject turbo : Turbocharger;
    objective boostCapability;
    // Verified by: engine dyno test at rated speed
    attribute method : VerificationMethod = VerificationMethod::test;
  }`
          }
        }
      },
      {
        id: 'case-structure',
        title: '3. Structural Model',
        type: 'conceptmap',
        why: "With requirements defined, we model the turbo structure: what parts exist, how they connect, what interfaces they expose.",
        pitfalls: [
          "Over-decomposing too early — start with major assemblies",
          "Missing interfaces to external systems",
          "Structure that doesn't trace to requirements"
        ],
        content: {
          central: 'Turbo Structure',
          description: 'Part definitions and connections for the VNT turbo',
          branches: [
            {
              id: 'case-partdef',
              label: 'Part Definitions',
              color: '#3b82f6',
              details: "Define the turbo and its major components as part definitions. These are reusable types.",
              example: `package Structure {
  part def VNTTurbocharger {
    doc /* Variable Nozzle Turbine turbocharger assembly */
    
    // Major components
    part compressor : Compressor;
    part turbine : VNTTurbine;
    part chra : CHRA;
    part actuator : ElectricActuator;
  }
  
  part def Compressor {
    attribute wheelDiameter : LengthValue;
    attribute trim : Real;
    port airIn : GasPort;
    port airOut : ~GasPort;
  }
}`,
              children: ['VNTTurbocharger assembly', 'Compressor with ports', 'VNTTurbine with vanes', 'CHRA with bearings']
            },
            {
              id: 'case-ports',
              label: 'Port Definitions',
              color: '#22c55e',
              details: "Ports define how components connect. Include the physical quantities that flow across interfaces.",
              example: `  port def GasPort {
    doc /* Port for gas flow (air or exhaust) */
    in item gas : GasFlow;
    attribute pressure : PressureValue;
    attribute temperature : TemperatureValue;
    attribute massFlow : MassFlowValue;
  }
  
  port def OilPort {
    in item oil : LubeOil;
    attribute pressure : PressureValue;
    attribute temperature : TemperatureValue;
  }
  
  port def ControlPort {
    in item command : PWMSignal;
    out item feedback : PositionSignal;
  }`,
              children: ['GasPort for air/exhaust', 'OilPort for lubrication', 'ControlPort for actuation', 'Conjugates for direction']
            },
            {
              id: 'case-connections',
              label: 'Internal Connections',
              color: '#f59e0b',
              details: "Connect the internal components. The shaft links compressor and turbine through the CHRA.",
              example: `  part def VNTTurbocharger {
    // ... parts defined above ...
    
    // Internal connections
    connect compressor.shaft to chra.compressorEnd;
    connect turbine.shaft to chra.turbineEnd;
    connect actuator.linkage to turbine.vaneRing;
    
    // Oil routing
    connect chra.oilIn to oilSupply;
    connect chra.oilOut to oilDrain;
  }`,
              children: ['Shaft connections', 'Actuator linkage', 'Oil routing', 'Signal paths']
            },
            {
              id: 'case-context',
              label: 'System Context',
              color: '#8b5cf6',
              details: "The turbo exists in context — connected to engine, ECU, oil system. Model the external interfaces.",
              example: `  part def EngineAirSystem {
    part turbo : VNTTurbocharger;
    part intercooler : Intercooler;
    part engine : DieselEngine;
    
    // Air path
    connect ambient to turbo.compressor.airIn;
    connect turbo.compressor.airOut to intercooler.hotSide;
    connect intercooler.coldSide to engine.intake;
    connect engine.exhaust to turbo.turbine.exhaustIn;
    
    // Control
    connect ecu.turboControl to turbo.actuator.control;
  }`,
              children: ['Engine connections', 'Intercooler integration', 'ECU interface', 'Ambient conditions']
            },
          ]
        }
      },
      {
        id: 'case-parameters',
        title: '4. Parametric Model',
        type: 'dataflow',
        why: "Parameters connect structure to analysis. We define the key attributes and the equations that relate them — this enables sizing calculations.",
        pitfalls: [
          "Parameters without units — errors waiting to happen",
          "Equations not connected to model attributes",
          "Missing the core sizing relationships"
        ],
        content: {
          description: 'Key parameters and sizing equations',
          nodes: [
            { id: 'engine-params', label: 'Engine Params', type: 'boundary', x: 50, y: 100 },
            { id: 'airflow-calc', label: 'Airflow Calc', type: 'process', x: 200, y: 100 },
            { id: 'comp-sizing', label: 'Compressor Sizing', type: 'process', x: 350, y: 50 },
            { id: 'turb-sizing', label: 'Turbine Sizing', type: 'process', x: 350, y: 150 },
            { id: 'power-balance', label: 'Power Balance', type: 'flow', x: 500, y: 100 },
          ],
          edges: [
            { from: 'engine-params', to: 'airflow-calc' },
            { from: 'airflow-calc', to: 'comp-sizing' },
            { from: 'airflow-calc', to: 'turb-sizing' },
            { from: 'comp-sizing', to: 'power-balance' },
            { from: 'turb-sizing', to: 'power-balance' },
          ],
          reveals: {
            'engine-params': `package Analysis {
  // Engine parameters (given)
  attribute def EngineParams {
    attribute displacement : VolumeValue = 2.0 [L];
    attribute cylinders : Integer = 4;
    attribute ratedSpeed : AngularVelocityValue = 4000 [RPM];
    attribute ratedPower : PowerValue = 150 [kW];
    attribute volumetricEfficiency : Real = 0.92;
    attribute airFuelRatio : Real = 23.0;  // Lean diesel
  }
}`,
            'airflow-calc': `  // Airflow calculation constraint
  constraint def EngineAirflow {
    in displacement : VolumeValue;
    in speed : AngularVelocityValue;
    in VE : Real;
    in PR : Real;
    out massFlow : MassFlowValue;
    
    // 4-stroke: one intake per 2 revolutions
    massFlow == (displacement * speed * VE * PR * rhoAir) / 2
  }
  
  // At rated: ~0.28 kg/s airflow needed for 150kW`,
            'comp-sizing': `  // Compressor operating point constraint
  constraint def CompressorOperatingPoint {
    in massFlow : MassFlowValue;
    in pressureRatio : Real;
    in ambientTemp : TemperatureValue;
    in ambientPressure : PressureValue;
    out correctedFlow : MassFlowValue;
    out compressorPower : PowerValue;
    
    // Corrected flow for map lookup
    correctedFlow == massFlow * sqrt(ambientTemp/288[K]) / (ambientPressure/101.3[kPa])
    
    // Compressor power (isentropic + efficiency)
    compressorPower == massFlow * cp * ambientTemp * ((PR^0.286 - 1) / efficiency)
  }`,
            'turb-sizing': `  // Turbine sizing constraint
  constraint def TurbineSizing {
    in exhaustFlow : MassFlowValue;
    in TIT : TemperatureValue;
    in expansionRatio : Real;
    in turbineEfficiency : Real;
    out turbinePower : PowerValue;
    
    // Turbine extracts energy from exhaust
    turbinePower == exhaustFlow * cpExhaust * TIT * turbineEfficiency * (1 - (1/expansionRatio)^0.286)
  }
  
  // Must produce enough power to drive compressor`,
            'power-balance': `  // Power balance: turbine drives compressor
  constraint def TurboPowerBalance {
    in turbinePower : PowerValue;
    in compressorPower : PowerValue;
    in bearingLoss : PowerValue;
    
    // Turbine must supply compressor + losses
    assert constraint { turbinePower >= compressorPower + bearingLoss }
  }
  
  // If this fails, turbine is undersized — need larger A/R or higher TIT`
          }
        }
      },
      {
        id: 'case-trade',
        title: '5. Trade Study',
        type: 'conceptmap',
        why: "With the parametric model, we can evaluate compressor and turbine options. The model calculates outcomes — we pick the best fit.",
        pitfalls: [
          "Trading without clear criteria weights",
          "Ignoring off-design points",
          "Not checking sensitivity to assumptions"
        ],
        content: {
          central: 'Compressor Selection',
          description: 'Evaluating candidate compressors against requirements',
          branches: [
            {
              id: 'trade-candidates',
              label: 'Candidate Options',
              color: '#3b82f6',
              details: "Identify 2-3 compressor frame sizes that could work. Map our operating points onto each.",
              example: `  // Define variants to trade
  part def VNTTurbocharger {
    variant smallFrame : Compressor {
      attribute wheelDiameter = 44 [mm];
      attribute trim = 56;
      // Quick spool, but tight on max flow
    }
    variant mediumFrame : Compressor {
      attribute wheelDiameter = 49 [mm];
      attribute trim = 52;
      // Balanced
    }
    variant largeFrame : Compressor {
      attribute wheelDiameter = 52 [mm];
      attribute trim = 58;
      // Max flow headroom, slower spool
    }
  }`,
              children: ['44mm small frame', '49mm medium frame', '52mm large frame', 'Each with trade-offs']
            },
            {
              id: 'trade-criteria',
              label: 'Evaluation Criteria',
              color: '#22c55e',
              details: "Score each candidate on: surge margin, efficiency at key points, flow capacity, transient response (inertia-related).",
              example: `  // Criteria with weights
  attribute surgeMarginScore : Real;      // Weight: 0.30
  attribute efficiencyScore : Real;       // Weight: 0.25
  attribute flowCapacityScore : Real;     // Weight: 0.20
  attribute transientScore : Real;        // Weight: 0.25
  
  // Scores normalized 0-1, higher is better
  totalScore == 0.30*surgeMargin + 0.25*efficiency 
              + 0.20*flowCapacity + 0.25*transient`,
              children: ['Surge margin (30%)', 'Efficiency (25%)', 'Flow capacity (20%)', 'Transient (25%)']
            },
            {
              id: 'trade-results',
              label: 'Trade Results',
              color: '#f59e0b',
              details: "Run the analysis for each candidate. Medium frame wins on balance — good surge margin, adequate flow, reasonable spool.",
              example: `  // Trade study results
  // Small (44mm):  Surge=0.95, Eff=0.85, Flow=0.60, Trans=0.95 → 0.84
  // Medium (49mm): Surge=0.85, Eff=0.90, Flow=0.85, Trans=0.80 → 0.85 ✓
  // Large (52mm):  Surge=0.70, Eff=0.85, Flow=0.95, Trans=0.65 → 0.78
  
  // Selection: 49mm medium frame
  // Rationale: Best balanced score, meets all requirements`,
              children: ['Small: best transient, tight on flow', 'Medium: balanced winner', 'Large: flow headroom, slow', 'Document rationale']
            },
            {
              id: 'trade-turbine',
              label: 'Turbine Matching',
              color: '#8b5cf6',
              details: "With compressor selected, match turbine A/R. Balance spool vs backpressure. VNT gives us flexibility.",
              example: `  // Turbine selection for medium frame compressor
  part turbine : VNTTurbine {
    attribute wheelDiameter = 43 [mm];
    attribute vaneCount = 11;
    
    // VNT A/R range
    attribute minAR : Real = 0.45;  // Closed - fast spool
    attribute maxAR : Real = 0.90;  // Open - low backpressure
    
    // Matches compressor power requirement across range
  }`,
              children: ['43mm turbine wheel', 'VNT range 0.45-0.90 A/R', 'Sized for power balance', '11 vanes']
            },
          ]
        }
      },
      {
        id: 'case-verification',
        title: '6. Verification',
        type: 'faulttree',
        why: "The model must prove the design meets requirements. We verify each requirement — by analysis, test, or inspection — and trace the results.",
        pitfalls: [
          "Verification disconnected from requirements",
          "Passing analysis but failing test — model fidelity issue",
          "Not capturing verification results in the model"
        ],
        content: {
          root: 'Design Verification',
          branches: [
            {
              fault: 'Performance Verification',
              icon: 'info',
              causes: [
                {
                  cause: 'Boost capability',
                  detail: "Requirement: 2.2 bar at rated speed. Analysis shows 2.28 bar achieved with medium frame at 4000 RPM.",
                  fix: `verify requirement boostCapability {
  attribute analysisResult = 2.28 [bar];
  attribute status = VerificationStatus::passed;
}`
                },
                {
                  cause: 'Transient response',
                  detail: "Requirement: < 1.5s tip-in response. Transient simulation shows 1.2s with VNT vanes starting closed.",
                  fix: `verify requirement transientResponse {
  attribute simulatedTime = 1.2 [s];
  attribute status = VerificationStatus::passed;
}`
                },
                {
                  cause: 'Low-end torque',
                  detail: "Requirement: 400 Nm from 1750-2500 RPM. Map analysis confirms sufficient boost across range.",
                  fix: `verify requirement lowEndTorque {
  attribute method = VerificationMethod::analysis;
  attribute status = VerificationStatus::passed;
}`
                }
              ]
            },
            {
              fault: 'Constraint Verification',
              icon: 'info',
              causes: [
                {
                  cause: 'Surge margin',
                  detail: "Requirement: ≥ 10% surge margin. Worst case is 12% at low-speed / high-load. Passes with margin.",
                  fix: `verify requirement surgeMargin {
  attribute worstCaseMargin = 0.12;  // 12%
  attribute status = VerificationStatus::passed;
}`
                },
                {
                  cause: 'Thermal durability',
                  detail: "Requirement: TIT ≤ 850°C. Max TIT at rated power is 820°C. Passes.",
                  fix: `verify requirement thermalDurability {
  attribute maxTIT_analyzed = 1093 [K];  // 820°C
  attribute status = VerificationStatus::passed;
}`
                },
                {
                  cause: 'Speed limit',
                  detail: "Max turbo speed at rated is 185,000 RPM. Design limit is 210,000 RPM. 12% margin.",
                  fix: `assert constraint speedMargin {
  maxOperatingSpeed <= maxAllowedSpeed * 0.88
  // 185k / 210k = 0.88 — passes
}`
                }
              ]
            },
            {
              fault: 'Traceability Check',
              icon: 'warning',
              causes: [
                {
                  cause: 'All requirements verified?',
                  detail: "Query the model: any requirements without verification links? Should return empty.",
                  fix: `// Model query
requirements.filter(r => !r.verifiedBy.exists())
// Result: [] — all requirements have verification`
                },
                {
                  cause: 'Verification complete?',
                  detail: "Query: any verification cases without results? Should return empty for complete verification.",
                  fix: `// Model query  
verifications.filter(v => v.status == pending)
// Result: [] — all verifications executed`
                }
              ]
            }
          ]
        }
      },
      {
        id: 'case-summary',
        title: '7. Model Summary',
        type: 'conceptmap',
        why: "Step back and see the complete model. This is what model-based engineering delivers — traceable, analyzable, verifiable system definition.",
        pitfalls: [
          "Model exists but nobody can navigate it",
          "Documentation separate from model — gets out of sync",
          "No clear entry point for stakeholders"
        ],
        content: {
          central: 'Complete Model',
          description: 'What we built and how it connects',
          branches: [
            {
              id: 'summary-structure',
              label: 'Model Structure',
              color: '#3b82f6',
              details: "Four packages organizing the model: Requirements, Structure, Analysis, Verification. Clean separation of concerns.",
              example: `package TurboSizingCaseStudy {
  package Requirements { /* 6 requirements */ }
  package Structure { /* turbo + context */ }
  package Analysis { /* constraints + params */ }
  package Verification { /* 6 verifications */ }
}`,
              children: ['Requirements package', 'Structure package', 'Analysis package', 'Verification package']
            },
            {
              id: 'summary-trace',
              label: 'Traceability',
              color: '#22c55e',
              details: "Every element connects: stakeholder needs → requirements → design → verification. Impact analysis is now trivial.",
              example: `// Trace query: What satisfies boostCapability?
boostCapability.satisfiedBy
→ VNTTurbocharger.compressor

// Trace query: What verifies it?
boostCapability.verifiedBy
→ BoostVerification (analysis + test)`,
              children: ['Need → Requirement', 'Requirement → Design', 'Design → Verification', 'Complete chain']
            },
            {
              id: 'summary-analysis',
              label: 'Analysis Capability',
              color: '#f59e0b',
              details: "Parametric constraints enable what-if analysis. Change engine displacement? Model recalculates airflow, checks constraints.",
              example: `// What-if: 2.2L engine instead of 2.0L?
engineParams.displacement = 2.2 [L];
// Model recalculates:
// - Required airflow: +10%
// - Surge margin: drops to 8% — WARNING
// - Need to re-evaluate compressor selection`,
              children: ['Sizing calculations', 'Constraint checking', 'What-if scenarios', 'Trade study support']
            },
            {
              id: 'summary-value',
              label: 'What This Enables',
              color: '#8b5cf6',
              details: "This model is now an asset: reusable for variants, baseline for next program, training reference, audit evidence.",
              example: `// Reuse: 1.6L variant
import TurboSizingCaseStudy::*;
part def SmallEngineTurbo :> VNTTurbocharger {
  // Specialize for smaller engine
  :>> compressor.wheelDiameter = 41 [mm];
}`,
              children: ['Variant development', 'Program baseline', 'Knowledge capture', 'Compliance evidence']
            },
          ]
        }
      },
    ]
  },

  troubleshooting: {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'When models go wrong — diagnosis and fixes',
    color: '#f59e0b',
    icon: '🔧',
    modules: [
      {
        id: 'troubleshooting-model-unused',
        title: 'Model Nobody Uses',
        type: 'faulttree',
        why: "The most common model failure isn't technical — it's adoption. Understanding why models get abandoned helps you build ones that stick.",
        pitfalls: [
          "Assuming the model is 'done' after initial creation",
          "Not including model users in the development process",
          "Building for tool features instead of team workflows"
        ],
        content: {
          root: 'Model Exists But Nobody Uses It',
          branches: [
            {
              fault: 'Value Not Visible',
              icon: 'warning',
              causes: [
                {
                  cause: 'No clear questions answered',
                  detail: "The model exists but doesn't help anyone make decisions or answer specific questions.",
                  fix: "Identify 3 specific questions the model should answer. Restructure to answer them directly."
                },
                {
                  cause: 'Outputs not in useful format',
                  detail: "Stakeholders can't extract what they need without deep model knowledge.",
                  fix: "Create views/reports that present model data in stakeholder-friendly formats."
                }
              ]
            },
            {
              fault: 'Too Hard to Use',
              icon: 'error',
              causes: [
                {
                  cause: 'Requires expert knowledge',
                  detail: "Only the model author can navigate or update it effectively.",
                  fix: "Document patterns, create templates, run training sessions. Lower the barrier."
                },
                {
                  cause: 'Tool friction',
                  detail: "The tool is slow, crashes, or has a steep learning curve.",
                  fix: "Evaluate if the tool matches team skills. Consider lighter alternatives for some use cases."
                }
              ]
            },
            {
              fault: 'Not Maintained',
              icon: 'info',
              causes: [
                {
                  cause: 'No owner assigned',
                  detail: "Everyone assumes someone else will update it.",
                  fix: "Assign explicit ownership. Model updates should be in job descriptions."
                },
                {
                  cause: 'Not in change process',
                  detail: "Design changes happen but model updates are optional.",
                  fix: "Add 'Update model' as a required checklist item in your change/release process."
                }
              ]
            }
          ]
        }
      },
      {
        id: 'troubleshooting-syntax-errors',
        title: 'Common Syntax Errors',
        type: 'faulttree',
        why: "SysML v2 syntax errors can be cryptic. This tree covers the most frequent mistakes and how to fix them quickly.",
        pitfalls: [
          "Ignoring error messages — they usually point to the problem",
          "Changing multiple things at once — harder to isolate the issue",
          "Assuming the tool is broken when it's usually your code"
        ],
        content: {
          root: 'Syntax Error in SysML v2 Code',
          branches: [
            {
              fault: 'Keyword/Structure Errors',
              icon: 'error',
              causes: [
                {
                  cause: 'Missing semicolons',
                  detail: "Statements need semicolons. Easy to forget after closing braces.",
                  fix: "Check line endings. Statements end with ; — blocks end with } (no semicolon needed after })."
                },
                {
                  cause: 'Wrong keyword',
                  detail: "Using 'part' when you meant 'part def', or 'type' instead of 'attribute'.",
                  fix: "part def = defines a type. part = creates an instance. attribute = property. port = connection point."
                },
                {
                  cause: 'Mismatched braces',
                  detail: "Opening { without closing }, or nesting errors.",
                  fix: "Use editor brace matching. Keep consistent indentation to spot mismatches visually."
                }
              ]
            },
            {
              fault: 'Type/Reference Errors',
              icon: 'warning',
              causes: [
                {
                  cause: 'Undefined type reference',
                  detail: "'Pump' used but never defined with 'part def Pump'.",
                  fix: "Define before use, or import the package containing the definition."
                },
                {
                  cause: 'Wrong namespace',
                  detail: "Type exists but not imported. 'Cannot resolve Pump' when it's in another package.",
                  fix: "Add import statement: import PackageName::Pump; or import PackageName::*;"
                },
                {
                  cause: 'Circular reference',
                  detail: "A specializes B specializes A. Tool may hang or error.",
                  fix: "Check specialization chains. Use composition (parts inside) instead of specialization where appropriate."
                }
              ]
            },
            {
              fault: 'Attribute/Value Errors',
              icon: 'info',
              causes: [
                {
                  cause: 'Type mismatch',
                  detail: "Assigning 'hello' to a Real attribute, or wrong unit type.",
                  fix: "Check attribute type. Real needs numbers. String needs quotes. Enums need EnumName::value."
                },
                {
                  cause: 'Missing attribute keyword',
                  detail: "Writing 'x : Real;' instead of 'attribute x : Real;' inside a part def.",
                  fix: "Inside definitions, features need their keyword: attribute, part, port, etc."
                }
              ]
            }
          ]
        }
      },
      {
        id: 'troubleshooting-connections',
        title: 'Connection Problems',
        type: 'faulttree',
        why: "Connections are where parts meet — and where many errors hide. Diagnosing connection issues requires understanding port compatibility.",
        pitfalls: [
          "Connecting without checking port direction compatibility",
          "Assuming connections imply physical proximity",
          "Forgetting that items must flow through compatible ports"
        ],
        content: {
          root: 'Connection Does Not Work',
          branches: [
            {
              fault: 'Port Compatibility Issues',
              icon: 'error',
              causes: [
                {
                  cause: 'Direction mismatch',
                  detail: "Connecting two 'in' ports or two 'out' ports. Flow has nowhere to go.",
                  fix: "One port must be conjugate (~). Provider has out/~InPort, consumer has in/InPort."
                },
                {
                  cause: 'Type mismatch',
                  detail: "Ports are different types that don't share a common interface.",
                  fix: "Ports must be same type or one must be conjugate of the other. Check definitions."
                },
                {
                  cause: 'Missing port definition',
                  detail: "Using a port type that doesn't exist or isn't imported.",
                  fix: "Define the port type first: port def MyPort { in item x : Something; }"
                }
              ]
            },
            {
              fault: 'Connection Syntax Issues',
              icon: 'warning',
              causes: [
                {
                  cause: 'Wrong path to port',
                  detail: "'connect pump.inlet' fails because pump is nested deeper or named differently.",
                  fix: "Use full path: connect system.subsystem.pump.inlet to ... Check actual part names."
                },
                {
                  cause: 'Connect outside owning context',
                  detail: "Connection statement in wrong scope — can't see both endpoints.",
                  fix: "Connections must be inside a part that contains both endpoints (directly or nested)."
                }
              ]
            },
            {
              fault: 'Semantic Issues',
              icon: 'info',
              causes: [
                {
                  cause: 'No flow item defined',
                  detail: "Ports connect but nothing flows because port has no 'in item' or 'out item'.",
                  fix: "Add flow items to port definition: port def P { in item data : DataPacket; }"
                },
                {
                  cause: 'Connection doesn\'t match intent',
                  detail: "Parts are connected but the flow doesn't represent what you meant.",
                  fix: "Review: What physically/logically flows? Model that item. Assign it to the port."
                }
              ]
            }
          ]
        }
      },
    ]
  },
};

// ============================================================
// SANDBOX EXERCISES
// ============================================================

const sandboxExercises = [
  {
    id: 'sandbox-intro-1',
    title: 'Your First Part',
    difficulty: 'easy',
    type: 'write',
    unlockRequires: [],
    prompt: "Create a part definition called 'Sensor' with a single attribute 'accuracy' of type Real.",
    hint: "Start with 'part def Sensor { ... }' and add an attribute inside.",
    starterCode: '// Write your part definition below\n',
    expectedElements: ['part def', 'Sensor', 'attribute', 'accuracy', 'Real'],
    solution: `part def Sensor {
  attribute accuracy : Real;
}`
  },
  {
    id: 'sandbox-intro-2',
    title: 'Package Organization',
    difficulty: 'easy',
    type: 'write',
    unlockRequires: [],
    prompt: "Create a package called 'Components' containing an empty part definition called 'Actuator'.",
    hint: "Packages use 'package Name { ... }' and contain definitions.",
    starterCode: '// Write your package below\n',
    expectedElements: ['package', 'Components', 'part def', 'Actuator'],
    solution: `package Components {
  part def Actuator { }
}`
  },
  {
    id: 'sandbox-parts-1',
    title: 'Part with Ports',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['language-parts'],
    prompt: "Create a 'Pump' part definition with inlet and outlet ports of type 'FluidPort'.",
    hint: "Use 'port portName : PortType;' syntax inside the part def.",
    starterCode: '// Create a Pump with inlet and outlet ports\n',
    expectedElements: ['part def', 'Pump', 'port', 'inlet', 'outlet', 'FluidPort'],
    solution: `part def Pump {
  port inlet : FluidPort;
  port outlet : FluidPort;
}`
  },
  {
    id: 'sandbox-ports-1',
    title: 'Port Definition with Flow',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['language-ports'],
    prompt: "Create a port definition 'DataPort' that has an input item 'signal' of type 'Signal'.",
    hint: "Use 'in item' for input flow items inside a port def.",
    starterCode: '// Define a port with an input flow\n',
    expectedElements: ['port def', 'DataPort', 'in', 'item', 'signal', 'Signal'],
    solution: `port def DataPort {
  in item signal : Signal;
}`
  },
  {
    id: 'sandbox-ports-2',
    title: 'Conjugate Ports',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['language-ports'],
    prompt: "Create a part 'Transceiver' with a 'send' port of type DataPort and a 'receive' port that is the conjugate (~DataPort).",
    hint: "Use ~ before the port type for conjugation.",
    starterCode: '// Create a part with regular and conjugate ports\n',
    expectedElements: ['part def', 'Transceiver', 'port', 'send', 'receive', 'DataPort', '~'],
    solution: `part def Transceiver {
  port send : DataPort;
  port receive : ~DataPort;
}`
  },
  {
    id: 'sandbox-connect-1',
    title: 'Connect Two Parts',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['language-connections'],
    prompt: "Inside a 'System' part def, create two parts (source: Pump, dest: Tank) and connect source.outlet to dest.inlet.",
    hint: "Use 'connect partA.portX to partB.portY;' syntax.",
    starterCode: '// Create a system with connected parts\npart def System {\n  \n}',
    expectedElements: ['part def', 'System', 'part', 'source', 'dest', 'connect', 'outlet', 'inlet'],
    solution: `part def System {
  part source : Pump;
  part dest : Tank;
  connect source.outlet to dest.inlet;
}`
  },
  {
    id: 'sandbox-attr-1',
    title: 'Enumeration Type',
    difficulty: 'easy',
    type: 'write',
    unlockRequires: ['language-attributes'],
    prompt: "Create an enum 'OperatingMode' with values: off, idle, active, fault.",
    hint: "Use 'enum def Name { value1; value2; }' syntax.",
    starterCode: '// Define an enumeration\n',
    expectedElements: ['enum def', 'OperatingMode', 'off', 'idle', 'active', 'fault'],
    solution: `enum def OperatingMode {
  off; idle; active; fault;
}`
  },
  {
    id: 'sandbox-pkg-1',
    title: 'Import and Use',
    difficulty: 'hard',
    type: 'write',
    unlockRequires: ['language-packages'],
    prompt: "Create package 'Application' that imports all from 'Components' and defines a part 'Controller' containing a part 'sensor' of type 'Sensor'.",
    hint: "Use 'import PackageName::*;' for wildcard import.",
    starterCode: '// Create a package with imports\n',
    expectedElements: ['package', 'Application', 'import', 'Components', 'part def', 'Controller', 'part', 'sensor', 'Sensor'],
    solution: `package Application {
  import Components::*;
  
  part def Controller {
    part sensor : Sensor;
  }
}`
  },
  {
    id: 'sandbox-turbo-1',
    title: 'Compressor Definition',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['turbo-structure'],
    prompt: "Create a 'Compressor' part def with an 'airIn' port of type GasPort and an 'airOut' port that is conjugate (~GasPort).",
    hint: "Compressor has input and output — use conjugate for the output direction.",
    starterCode: '// Define a compressor with gas ports\n',
    expectedElements: ['part def', 'Compressor', 'port', 'airIn', 'airOut', 'GasPort', '~'],
    solution: `part def Compressor {
  port airIn : GasPort;
  port airOut : ~GasPort;
}`
  },
  {
    id: 'sandbox-turbo-2',
    title: 'Gas Port Definition',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['turbo-interfaces'],
    prompt: "Create a 'GasPort' port definition with: an input item 'gas' of type GasFlow, and attributes for temperature, pressure, and massFlow (all type Real).",
    hint: "Port defs can have both flow items and attributes.",
    starterCode: '// Define a gas port with flows and properties\n',
    expectedElements: ['port def', 'GasPort', 'in', 'item', 'gas', 'GasFlow', 'attribute', 'temperature', 'pressure', 'massFlow', 'Real'],
    solution: `port def GasPort {
  in item gas : GasFlow;
  attribute temperature : Real;
  attribute pressure : Real;
  attribute massFlow : Real;
}`
  },
  {
    id: 'sandbox-turbo-3',
    title: 'Turbo Assembly',
    difficulty: 'hard',
    type: 'write',
    unlockRequires: ['turbo-structure'],
    prompt: "Create a 'Turbocharger' part def containing: compressor, turbine, and chra parts. Connect compressor to chra and chra to turbine using shaft ports.",
    hint: "Decompose first, then connect internal interfaces.",
    starterCode: '// Build a turbocharger with internal connections\npart def Turbocharger {\n  \n}',
    expectedElements: ['part def', 'Turbocharger', 'part', 'compressor', 'turbine', 'chra', 'connect', 'shaft'],
    solution: `part def Turbocharger {
  part compressor : Compressor;
  part turbine : Turbine;
  part chra : CHRA;
  
  connect compressor.shaft to chra.compressorEnd;
  connect turbine.shaft to chra.turbineEnd;
}`
  },
  {
    id: 'sandbox-turbo-4',
    title: 'Performance Attributes',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['turbo-parameters'],
    prompt: "Add to a Compressor part def: attributes for pressureRatio (Real, default 2.5), efficiency (Real, default 0.75), and maxFlow (Real).",
    hint: "Use 'attribute name : Type = defaultValue;' for defaults.",
    starterCode: '// Add performance attributes to compressor\npart def Compressor {\n  \n}',
    expectedElements: ['part def', 'Compressor', 'attribute', 'pressureRatio', 'efficiency', 'maxFlow', 'Real', '2.5', '0.75'],
    solution: `part def Compressor {
  attribute pressureRatio : Real = 2.5;
  attribute efficiency : Real = 0.75;
  attribute maxFlow : Real;
}`
  },
  {
    id: 'sandbox-req-1',
    title: 'Requirement Definition',
    difficulty: 'easy',
    type: 'write',
    unlockRequires: ['req-modeling'],
    prompt: "Create a requirement definition 'PerformanceReq' with a doc string 'The system shall meet performance targets.' and an attribute 'priority' of type Integer.",
    hint: "Use 'doc /* text */' for documentation inside the requirement def.",
    starterCode: '// Define a requirement type\n',
    expectedElements: ['requirement def', 'PerformanceReq', 'doc', 'attribute', 'priority', 'Integer'],
    solution: `requirement def PerformanceReq {
  doc /* The system shall meet performance targets. */
  attribute priority : Integer;
}`
  },
  {
    id: 'sandbox-req-2',
    title: 'Requirement with Satisfaction',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['req-modeling'],
    prompt: "Create a part 'Turbocharger' that satisfies a requirement 'boostReq'. Use the satisfy keyword inside the part def.",
    hint: "Use 'satisfy requirement reqName;' inside the part.",
    starterCode: '// Part that satisfies a requirement\n',
    expectedElements: ['part def', 'Turbocharger', 'satisfy', 'requirement', 'boostReq'],
    solution: `part def Turbocharger {
  satisfy requirement boostReq;
}`
  },
  {
    id: 'sandbox-req-3',
    title: 'Simple Action',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['req-actions'],
    prompt: "Create an action definition 'CompressAir' with an input item 'airIn' of type Air and an output item 'airOut' of type CompressedAir.",
    hint: "Use 'in item' and 'out item' for action parameters.",
    starterCode: '// Define an action with inputs and outputs\n',
    expectedElements: ['action def', 'CompressAir', 'in', 'out', 'item', 'airIn', 'airOut', 'Air', 'CompressedAir'],
    solution: `action def CompressAir {
  in item airIn : Air;
  out item airOut : CompressedAir;
}`
  },
  {
    id: 'sandbox-analysis-1',
    title: 'Constraint Definition',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['analysis-constraints'],
    prompt: "Create a constraint 'EfficiencyCalc' with input parameters 'powerIn' and 'powerOut' (both Real), and an equation: powerOut == powerIn * 0.85",
    hint: "Constraints have 'in' parameters and an equation using ==.",
    starterCode: '// Define a constraint with equation\n',
    expectedElements: ['constraint def', 'EfficiencyCalc', 'in', 'powerIn', 'powerOut', 'Real', '==', '0.85'],
    solution: `constraint def EfficiencyCalc {
  in powerIn : Real;
  in powerOut : Real;
  powerOut == powerIn * 0.85
}`
  },
  {
    id: 'sandbox-analysis-2',
    title: 'Using a Constraint',
    difficulty: 'hard',
    type: 'write',
    unlockRequires: ['analysis-constraints'],
    prompt: "Inside a 'Turbine' part def, add attributes inputPower and outputPower (Real), then apply a constraint 'effCalc' of type EfficiencyCalc binding the parameters.",
    hint: "Bind parameters with 'in paramName = attributeName;' inside the constraint usage.",
    starterCode: '// Part with constraint usage\npart def Turbine {\n  \n}',
    expectedElements: ['part def', 'Turbine', 'attribute', 'inputPower', 'outputPower', 'Real', 'constraint', 'effCalc', 'EfficiencyCalc', 'powerIn', 'powerOut'],
    solution: `part def Turbine {
  attribute inputPower : Real;
  attribute outputPower : Real;
  
  constraint effCalc : EfficiencyCalc {
    in powerIn = inputPower;
    in powerOut = outputPower;
  }
}`
  },
  {
    id: 'sandbox-case-1',
    title: 'Engine Requirement',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['case-requirements'],
    prompt: "Create a requirement 'boostTarget' with a doc string 'System shall achieve 2.2 bar boost at rated speed' and an attribute 'targetPressure' of type Real with default 2.2.",
    hint: "Requirements have 'doc /* text */' and attributes with defaults.",
    starterCode: '// Define a boost requirement\n',
    expectedElements: ['requirement', 'boostTarget', 'doc', '2.2', 'bar', 'attribute', 'targetPressure', 'Real'],
    solution: `requirement boostTarget {
  doc /* System shall achieve 2.2 bar boost at rated speed */
  attribute targetPressure : Real = 2.2;
}`
  },
  {
    id: 'sandbox-case-2',
    title: 'Power Balance Constraint',
    difficulty: 'hard',
    type: 'write',
    unlockRequires: ['case-parameters'],
    prompt: "Create a constraint 'TurboPowerBalance' with inputs turbinePower, compressorPower, and bearingLoss (all Real). Add an assert that turbinePower >= compressorPower + bearingLoss.",
    hint: "Use 'assert constraint { expression }' for must-be-true conditions.",
    starterCode: '// Power balance constraint\n',
    expectedElements: ['constraint def', 'TurboPowerBalance', 'in', 'turbinePower', 'compressorPower', 'bearingLoss', 'Real', 'assert', '>='],
    solution: `constraint def TurboPowerBalance {
  in turbinePower : Real;
  in compressorPower : Real;
  in bearingLoss : Real;
  
  assert constraint { turbinePower >= compressorPower + bearingLoss }
}`
  },
  {
    id: 'sandbox-case-3',
    title: 'Verification Link',
    difficulty: 'medium',
    type: 'write',
    unlockRequires: ['case-verification'],
    prompt: "Create a verification 'boostVerification' that verifies requirement 'boostTarget' with subject 'turbo' of type Turbocharger.",
    hint: "Verifications use 'verify requirement reqName;' and 'subject name : Type;'",
    starterCode: '// Verification case\n',
    expectedElements: ['verification', 'boostVerification', 'verify', 'requirement', 'boostTarget', 'subject', 'turbo', 'Turbocharger'],
    solution: `verification boostVerification {
  subject turbo : Turbocharger;
  verify requirement boostTarget;
}`
  },
];

// ============================================================
// KNOWLEDGE CHECKS - Questions per category
// ============================================================

const knowledgeChecks = {
  mindset: {
    title: 'MBSE Mindset Check',
    passingScore: 4,
    questions: [
      {
        id: 'mindset-q1',
        type: 'multiple-choice',
        question: "What's the PRIMARY advantage of a model being 'single source of truth'?",
        options: [
          'It looks more professional than documents',
          'Changes propagate automatically — no copy-paste drift',
          'It requires less disk space',
          'Managers prefer it'
        ],
        correctIndex: 1,
        explanation: "When you change a definition once, all usages update. Documents require manual sync that inevitably drifts."
      },
      {
        id: 'mindset-q2',
        type: 'multiple-choice',
        question: "When is MBSE probably overkill?",
        options: [
          'Complex system with multiple interfaces',
          'Long-lived product with variants',
          "One-off jig you'll build once and discard",
          'Safety-critical system requiring traceability'
        ],
        correctIndex: 2,
        explanation: "MBSE has real overhead. For throwaway work, the investment doesn't pay back."
      },
      {
        id: 'mindset-q3',
        type: 'multiple-choice',
        question: "You query the model: 'Which components have no allocated function?' This demonstrates which MBSE benefit?",
        options: [
          'Single source of truth',
          'Executable specification',
          'Better documentation',
          'Reduced file size'
        ],
        correctIndex: 1,
        explanation: "The model does work for you — you can query it, validate it, simulate it. A Word doc can't answer questions."
      },
      {
        id: 'mindset-q4',
        type: 'multiple-choice',
        question: "Your model has 200 parts but nobody uses it for decisions. What's wrong?",
        options: [
          'Need more parts',
          'Need better diagrams',
          'Model exists but provides no value — question its purpose',
          'Need to add more detail'
        ],
        correctIndex: 2,
        explanation: "A model that exists but isn't used is worse than no model — it's just overhead. Models should drive decisions."
      },
      {
        id: 'mindset-q5',
        type: 'multiple-choice',
        question: "What determines the RIGHT level of model detail?",
        options: [
          'Include everything possible for completeness',
          'Match what stakeholders paid for',
          'Whatever the tool supports',
          "What's needed to answer the questions you have"
        ],
        correctIndex: 3,
        explanation: "Model detail should be driven by purpose. If nobody asks about bolt torques, don't model bolt torques."
      },
    ]
  },

  language: {
    title: 'Core Language Check',
    passingScore: 5,
    questions: [
      {
        id: 'lang-q1',
        type: 'multiple-choice',
        question: "What's the difference between 'part def' and 'part'?",
        options: [
          'They are the same thing',
          'part def creates a reusable type; part creates an instance of that type',
          'part def is for hardware; part is for software',
          'part is the old syntax; part def is new'
        ],
        correctIndex: 1,
        explanation: "'part def Pump { }' defines what a pump IS. 'part mainPump : Pump;' creates an actual pump in your system."
      },
      {
        id: 'lang-q2',
        type: 'multiple-choice',
        question: "Which keyword creates a connection point where things flow in or out?",
        options: [
          'attribute',
          'item',
          'port',
          'connect'
        ],
        correctIndex: 2,
        explanation: "Ports are the connection points. 'port fuelIn : FuelPort;' defines where fuel enters."
      },
      {
        id: 'lang-q3',
        type: 'spot-error',
        question: "What's wrong with this code?",
        code: `part def Pump {
  attribute flowRate : Real;
  port inlet : FluidPort;
}

part system {
  part pump : Pump;
  pump.flowRate = 100;
}`,
        options: [
          'flowRate should be an item, not attribute',
          'Cannot assign to attribute outside a constraint or redefinition',
          'pump should be pump def',
          'Nothing is wrong'
        ],
        correctIndex: 1,
        explanation: "You can't just assign 'pump.flowRate = 100' directly. Use ':>>' redefinition: 'part pump : Pump { :>> flowRate = 100; }'"
      },
      {
        id: 'lang-q4',
        type: 'multiple-choice',
        question: "What does the '~' symbol mean in 'port outlet : ~FluidPort'?",
        options: [
          'Optional port',
          'Conjugate — reverses in/out direction',
          'Approximately',
          'Deprecated port'
        ],
        correctIndex: 1,
        explanation: "Conjugate (~) flips the port direction. If FluidPort has 'out fluid', ~FluidPort has 'in fluid'. Essential for matching connections."
      },
      {
        id: 'lang-q5',
        type: 'multiple-choice',
        question: "You want to say 'this pump is a specific kind of generic pump with preset values'. Which pattern?",
        options: [
          'part def SpecificPump { part generic : Pump; }',
          'part def SpecificPump :> Pump { :>> flowRate = 50; }',
          'part def SpecificPump = Pump;',
          'part def SpecificPump extends Pump { }'
        ],
        correctIndex: 1,
        explanation: "':>' means specialization (is-a). ':>>' redefines inherited features. This is core SysML v2 pattern for variants."
      },
      {
        id: 'lang-q6',
        type: 'multiple-choice',
        question: "What does 'item def' define?",
        options: [
          'A physical component in the system',
          'Something that flows between parts (fluid, signal, energy)',
          'A list of parts',
          'A menu item in the tool'
        ],
        correctIndex: 1,
        explanation: "Items are things that move/flow. 'item def Fuel { }' defines fuel as something that can flow through ports."
      },
      {
        id: 'lang-q7',
        type: 'spot-error',
        question: "This connection doesn't work. Why?",
        code: `port def FluidPort {
  out item fluid : Fluid;
}

part def System {
  part tank : Tank { port outlet : FluidPort; }
  part pump : Pump { port inlet : FluidPort; }
  
  connect tank.outlet to pump.inlet;
}`,
        options: [
          'connect syntax is wrong',
          'Both ports have "out" direction — nothing to receive',
          'Should use flow instead of connect',
          'Missing interface definition'
        ],
        correctIndex: 1,
        explanation: "tank.outlet has 'out fluid' and pump.inlet ALSO has 'out fluid'. The pump inlet should be ~FluidPort (conjugate) to have 'in fluid'."
      },
      {
        id: 'lang-q8',
        type: 'multiple-choice',
        question: "In a state machine, what do 'entry', 'do', and 'exit' represent?",
        options: [
          'Different types of states',
          'Actions performed when entering, while in, and when leaving a state',
          'Keywords for defining transitions',
          'State hierarchy levels'
        ],
        correctIndex: 1,
        explanation: "'entry action X' runs once when entering. 'do action Y' runs while in the state. 'exit action Z' runs when leaving. They define state behavior."
      },
    ]
  },

  methodology: {
    title: 'Methodology Check',
    passingScore: 4,
    questions: [
      {
        id: 'method-q1',
        type: 'multiple-choice',
        question: "In the 'Pillars of MBSE', what does Structure represent?",
        options: [
          'The file organization',
          'What the system IS — parts, connections, hierarchy',
          'The development schedule',
          'Team organization'
        ],
        correctIndex: 1,
        explanation: "Structure = the physical/logical decomposition. What parts exist, how they connect, what contains what."
      },
      {
        id: 'method-q2',
        type: 'multiple-choice',
        question: "Why define a Context before decomposing the system?",
        options: [
          "It's required by the tool",
          "Establishes what's IN vs OUT of scope — prevents scope creep",
          'Makes diagrams look better',
          "It's optional but looks professional"
        ],
        correctIndex: 1,
        explanation: "Context shows your system as a black box with external actors. If it's not in context, it's not your problem to solve."
      },
      {
        id: 'method-q3',
        type: 'multiple-choice',
        question: "What's the relationship between 'action def' and 'part def'?",
        options: [
          'They are unrelated',
          'action def defines WHAT happens; part def defines WHO does it',
          'action def replaces part def in v2',
          'part def contains action def always'
        ],
        correctIndex: 1,
        explanation: "Functions (actions) are allocated to structure (parts). 'Compress air' is an action; 'Compressor' is the part that performs it."
      },
      {
        id: 'method-q4',
        type: 'multiple-choice',
        question: "You have requirements, parts, and functions. What connects them for traceability?",
        options: [
          'Comments in the code',
          'satisfy, verify, and allocation relationships',
          'Naming conventions',
          'External spreadsheet'
        ],
        correctIndex: 1,
        explanation: "'satisfy' links design to requirements. 'verify' links tests to requirements. Allocations link functions to parts."
      },
      {
        id: 'method-q5',
        type: 'multiple-choice',
        question: "When should you use 'constraint def' vs 'requirement def'?",
        options: [
          'They are interchangeable',
          'constraint for math/equations; requirement for stakeholder needs with verification',
          'requirement for code; constraint for documents',
          'Use requirement always'
        ],
        correctIndex: 1,
        explanation: "Requirements capture SHALL statements from stakeholders. Constraints capture mathematical relationships and equations."
      },
    ]
  },

  requirements: {
    title: 'Requirements Modeling Check',
    passingScore: 4,
    questions: [
      {
        id: 'req-q1',
        type: 'multiple-choice',
        question: "What goes in the 'doc' field of a requirement?",
        options: [
          'Code comments',
          'The SHALL statement — what the system must do',
          'Test procedures',
          'Design decisions'
        ],
        correctIndex: 1,
        explanation: "'doc /* The system shall maintain boost pressure within ±5% */' captures the actual requirement text."
      },
      {
        id: 'req-q2',
        type: 'multiple-choice',
        question: "What does 'satisfy requirement boostReq;' inside a part def mean?",
        options: [
          'The part needs that requirement',
          'The part deletes the requirement',
          'This design element claims to fulfill that requirement',
          'The requirement is optional'
        ],
        correctIndex: 2,
        explanation: "'satisfy' creates a trace: this design element is intended to meet this requirement. Auditors follow these traces."
      },
      {
        id: 'req-q3',
        type: 'spot-error',
        question: "What's the problem with this requirement?",
        code: `requirement def BoostReq {
  doc /* The turbo should provide good boost */
}`,
        options: [
          'Missing semicolon',
          '"Should" is weak and "good" is unmeasurable — not verifiable',
          'doc syntax is wrong',
          'Missing subject'
        ],
        correctIndex: 1,
        explanation: "Requirements must be verifiable. 'Good boost' can't be tested. Should be: 'shall achieve 2.5 bar ±0.1 bar'"
      },
      {
        id: 'req-q4',
        type: 'multiple-choice',
        question: "What's the purpose of 'subject' in a verification?",
        options: [
          'Email subject line',
          'What the verification tests against — the instance being verified',
          'A description field',
          'The test name'
        ],
        correctIndex: 1,
        explanation: "'subject turbo : Turbocharger;' says 'this verification applies to a Turbocharger instance' — the thing being tested."
      },
      {
        id: 'req-q5',
        type: 'multiple-choice',
        question: "Stakeholder says: 'It should be fast.' How do you model this?",
        options: [
          'requirement def Fast { doc /* should be fast */ }',
          'Ask stakeholder to quantify, then model with measurable attribute',
          'Skip it — too vague',
          'Make up a number'
        ],
        correctIndex: 1,
        explanation: "Push back to get specifics. 'Fast' → 'Response time < 500ms'. Then you can model it with an attribute and verify it."
      },
    ]
  },

  analysis: {
    title: 'Analysis & Constraints Check',
    passingScore: 4,
    questions: [
      {
        id: 'analysis-q1',
        type: 'multiple-choice',
        question: "What's the difference between 'constraint' and 'assert constraint'?",
        options: [
          'No difference',
          'constraint defines the equation; assert constraint says it MUST be true (fails if violated)',
          'assert is for testing only',
          'constraint is deprecated'
        ],
        correctIndex: 1,
        explanation: "'constraint' sets up relationships. 'assert constraint { x > 0 }' says 'x MUST be > 0' — violation is an error."
      },
      {
        id: 'analysis-q2',
        type: 'multiple-choice',
        question: "In a constraint def, what do 'in' and 'out' parameters mean?",
        options: [
          'Input files and output files',
          'in = values provided TO constraint; out = values CALCULATED BY constraint',
          'in = required; out = optional',
          'Direction of flow'
        ],
        correctIndex: 1,
        explanation: "'in massFlow : Real;' is given. 'out power : Real;' is computed from the constraint equation."
      },
      {
        id: 'analysis-q3',
        type: 'spot-error',
        question: "This constraint doesn't work as intended. Why?",
        code: `constraint def PowerBalance {
  in turbinePower : Real;
  in compressorPower : Real;
  in losses : Real;
  
  turbinePower == compressorPower + losses;
}`,
        options: [
          'Should use = instead of ==',
          'All three are "in" but equation needs one to be "out" (calculated)',
          'Missing assert',
          'Variable names are wrong'
        ],
        correctIndex: 1,
        explanation: "If all are 'in', you're just checking equality. Usually you want: turbinePower and losses 'in', compressorPower 'out' (calculated)."
      },
      {
        id: 'analysis-q4',
        type: 'multiple-choice',
        question: "What's 'calc def' used for?",
        options: [
          'Calculator widget',
          'Named calculation that returns a result — like a function',
          'Calibration data',
          'Calendar definition'
        ],
        correctIndex: 1,
        explanation: "'calc def Efficiency { in powerOut; in powerIn; return powerOut / powerIn; }' — a reusable calculation."
      },
      {
        id: 'analysis-q5',
        type: 'multiple-choice',
        question: "You want to run the same analysis on multiple design variants. What construct?",
        options: [
          'Copy paste the analysis',
          'analysis def with different subjects — same analysis, swap the target',
          'Create separate models',
          'Use comments'
        ],
        correctIndex: 1,
        explanation: "Define 'analysis def SizingAnalysis { subject s : Turbo; }' then run it with different turbo instances to compare."
      },
    ]
  },

  turboDomain: {
    title: 'Turbocharger Domain Check',
    passingScore: 5,
    questions: [
      {
        id: 'turbo-q1',
        type: 'multiple-choice',
        question: "What makes VNT different from a wastegate turbo?",
        options: [
          'VNT is larger',
          'VNT adjusts turbine geometry for control; wastegate bypasses exhaust',
          'VNT uses a different compressor',
          'Wastegate is newer technology'
        ],
        correctIndex: 1,
        explanation: "VNT (Variable Nozzle Turbine) adjusts vane angle to control flow. Wastegate just dumps exhaust around the turbine."
      },
      {
        id: 'turbo-q2',
        type: 'multiple-choice',
        question: "On a compressor map, what happens if you operate left of the surge line?",
        options: [
          'Maximum efficiency',
          'Flow reversal and instability — audible surge, potential damage',
          'Extra power',
          'Nothing bad'
        ],
        correctIndex: 1,
        explanation: "Surge = flow reversal. Compressor can't maintain forward flow. Causes pressure pulsations, noise, and bearing loads."
      },
      {
        id: 'turbo-q3',
        type: 'multiple-choice',
        question: "What does 'corrected mass flow' account for?",
        options: [
          'Measurement errors',
          'Inlet temperature and pressure vs standard conditions',
          'Unit conversion',
          'Time of day'
        ],
        correctIndex: 1,
        explanation: "Corrected flow = massFlow * sqrt(T/Tref) / (P/Pref). Lets you compare operating points at different ambient conditions."
      },
      {
        id: 'turbo-q4',
        type: 'multiple-choice',
        question: "A/R ratio on the turbine affects:",
        options: [
          'Compressor efficiency only',
          'Exhaust backpressure, spool-up speed, and max flow capacity',
          'Oil viscosity',
          'Intercooler size'
        ],
        correctIndex: 1,
        explanation: "Smaller A/R = higher backpressure but faster spool. Larger A/R = lower backpressure but slower spool. It's a key sizing trade-off."
      },
      {
        id: 'turbo-q5',
        type: 'multiple-choice',
        question: "What does 'choke' mean on a compressor map?",
        options: [
          'Engine stall',
          "Flow limit — can't push more air through regardless of speed",
          'Fuel system issue',
          'Bearing failure'
        ],
        correctIndex: 1,
        explanation: "Choke is the right-side limit. Flow reaches sonic velocity somewhere in the compressor — no more flow possible."
      },
      {
        id: 'turbo-q6',
        type: 'multiple-choice',
        question: "When modeling turbo in SysML, compressor and turbine share a shaft. How to represent?",
        options: [
          'Two separate parts, no connection',
          'part shaft connecting both, with rotational speed attribute',
          'Comment saying they spin together',
          'One combined part only'
        ],
        correctIndex: 1,
        explanation: "Model the shaft as a part with rotational speed. Connect compressor and turbine to it. Constraint ensures same speed."
      },
      {
        id: 'turbo-q7',
        type: 'multiple-choice',
        question: "Turbine inlet temperature (TIT) limit exists because:",
        options: [
          'Hotter is always better',
          "Material limits — turbine wheel/housing can't survive beyond rated temperature",
          'Aesthetic reasons',
          'Noise regulations'
        ],
        correctIndex: 1,
        explanation: "TIT limits (often 950-1050°C for VNT) protect the turbine materials. Exceeding causes accelerated wear or failure."
      },
    ]
  },

  caseStudy: {
    title: 'Case Study Comprehension Check',
    passingScore: 5,
    questions: [
      {
        id: 'case-q1',
        type: 'multiple-choice',
        question: "Why start the case study with a Problem Statement model?",
        options: [
          'Tool requires it first',
          'Establishes scope, constraints, and success criteria BEFORE diving into design',
          "It's optional but looks professional",
          'To fill time'
        ],
        correctIndex: 1,
        explanation: "The problem statement anchors everything. Without clear goals and constraints, you can't evaluate if a design is good."
      },
      {
        id: 'case-q2',
        type: 'multiple-choice',
        question: "In the case study, why model BOTH stakeholder needs AND system requirements?",
        options: [
          'Just for documentation',
          'Stakeholder needs are vague goals; system requirements are verifiable specs derived from them',
          'They are the same thing',
          'Only system requirements matter'
        ],
        correctIndex: 1,
        explanation: "'Better fuel economy' (stakeholder) → 'Achieve 2.5 bar boost at 85% efficiency' (requirement). Traceability shows coverage."
      },
      {
        id: 'case-q3',
        type: 'multiple-choice',
        question: "The parametric model calculates compressor power. What inputs does it need?",
        options: [
          'Just pressure ratio',
          'Mass flow, pressure ratio, inlet temperature, efficiency',
          'Only speed',
          'Turbine size'
        ],
        correctIndex: 1,
        explanation: "Compressor power = f(massFlow, PR, Tin, efficiency). The parametric model encodes this physics."
      },
      {
        id: 'case-q4',
        type: 'multiple-choice',
        question: "Why include a Trade Study module in the case study?",
        options: [
          'To pad the module count',
          'Shows how the model supports selecting between candidate designs with clear criteria',
          'Trade studies are required by law',
          'Just for documentation'
        ],
        correctIndex: 1,
        explanation: "The model should drive decisions. Trade study shows evaluating 44mm vs 49mm vs 52mm compressor with objective criteria."
      },
      {
        id: 'case-q5',
        type: 'multiple-choice',
        question: "The Verification module uses a fault tree. What does each branch represent?",
        options: [
          'Different tests',
          'Categories of potential verification failures — helps debug when tests fail',
          'Pass/fail results',
          'Test equipment'
        ],
        correctIndex: 1,
        explanation: "Fault tree for verification: 'Boost test fails' → branches for surge limit, constraint violation, requirement trace issues."
      },
      {
        id: 'case-q6',
        type: 'multiple-choice',
        question: "What's the value of the Model Summary module at the end?",
        options: [
          'Just recap',
          'Shows complete traceability: requirements → design → verification',
          'Required by standards',
          'For the appendix'
        ],
        correctIndex: 1,
        explanation: "The summary demonstrates the model provides complete coverage. Every requirement traced to design and verification."
      },
    ]
  },

  troubleshooting: {
    title: 'Troubleshooting Check',
    passingScore: 3,
    questions: [
      {
        id: 'trouble-q1',
        type: 'multiple-choice',
        question: "You see error: 'Type mismatch: expected Fluid, got Signal'. What's wrong?",
        options: [
          'Missing import',
          'Connecting ports with incompatible item types',
          'Typo in name',
          'Tool bug'
        ],
        correctIndex: 1,
        explanation: "Port types must match. Can't connect a FluidPort to a SignalPort — the items flowing are different types."
      },
      {
        id: 'trouble-q2',
        type: 'multiple-choice',
        question: "Your constraint says 'massFlow > 0' but analysis fails with 'cannot determine value'. Cause?",
        options: [
          'Math error',
          'Input not bound — the "in" parameter has no value',
          'Constraint is wrong',
          "massFlow can't be positive"
        ],
        correctIndex: 1,
        explanation: "Constraints need values. If 'in massFlow' isn't bound to an actual attribute value, the constraint can't evaluate."
      },
      {
        id: 'trouble-q3',
        type: 'multiple-choice',
        question: "Requirement shows as 'not satisfied' but you added 'satisfy' in the design. What to check?",
        options: [
          'Delete and recreate',
          'Verify satisfy references correct requirement ID, check for typos',
          'Requirements never show satisfied',
          'Run analysis again'
        ],
        correctIndex: 1,
        explanation: "'satisfy requirement boostReq;' must match the actual requirement ID exactly. Common issue: typo in name or wrong package path."
      },
      {
        id: 'trouble-q4',
        type: 'multiple-choice',
        question: "Model works in your package but breaks when imported elsewhere. Likely cause?",
        options: [
          'File corruption',
          'Missing imports — referenced elements not visible in new scope',
          'Wrong file format',
          'Disk space'
        ],
        correctIndex: 1,
        explanation: "Each package needs to import its dependencies. 'import TurboLib::*;' makes those elements available."
      },
    ]
  },
};

// === APP ===
// ============================================================================
// SYSML V2 TRAINER - APPLICATION
// UI components and logic - edit config.js and curriculum.js for content
// ============================================================================

const generateMarkdownExport = (progress, notes) => {
  let md = `# ${config.title} - Reference Export\n\nGenerated: ${new Date().toLocaleDateString()}\n\n---\n\n`;
  Object.values(curriculum).forEach(category => {
    const completedModules = category.modules.filter(m => progress[m.id]?.complete);
    if (completedModules.length === 0) return;
    md += `## ${category.icon} ${category.title}\n\n`;
    completedModules.forEach(module => {
      md += `### ${module.title}\n\n**Why:** ${module.why}\n\n`;
      if (module.pitfalls?.length > 0) {
        md += `**Watch out for:**\n${module.pitfalls.map(p => `- ${p}`).join('\n')}\n\n`;
      }
      if (notes.modules?.[module.id]) {
        md += `**My notes:** ${notes.modules[module.id]}\n\n`;
      }
      md += `---\n\n`;
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

const useKeyboardNav = (handlers) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && handlers[`ctrl+${key}`]) {
        e.preventDefault();
        handlers[`ctrl+${key}`]();
        return;
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

// ============================================================================
// VISUALIZATION COMPONENTS
// ============================================================================

const ConceptMap = ({ content, revealed, onReveal }) => {
  return (
    <div className="space-y-4 overflow-hidden">
      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-base md:text-xl font-bold max-w-full">
          {content.central}
        </div>
        <p className="text-slate-400 text-sm mt-2">{content.description}</p>
      </div>
      
      <div className="grid gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {content.branches.map(branch => {
          const isRevealed = revealed.includes(branch.id);
          return (
            <div
              key={branch.id}
              className={`rounded-lg border-2 transition-all cursor-pointer overflow-hidden ${
                isRevealed ? 'bg-slate-700' : 'bg-slate-800 hover:bg-slate-750'
              }`}
              style={{ borderColor: branch.color }}
              onClick={() => onReveal(branch.id)}
              role="button"
              aria-expanded={isRevealed}
            >
              <div className="p-3 md:p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm md:text-base">{branch.label}</h3>
                  {!isRevealed && <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />}
                </div>
                
                {isRevealed && (
                  <div className="space-y-3 mt-3">
                    <p className="text-slate-300 text-sm">{branch.details}</p>
                    {branch.example && (
                      <pre className="bg-slate-900 p-2 rounded text-xs text-green-400 overflow-x-auto max-w-full">
                        {branch.example}
                      </pre>
                    )}
                    {branch.children?.length > 0 && (
                      <ul className="space-y-1">
                        {branch.children.map((child, i) => (
                          <li key={i} className="text-slate-400 text-sm flex items-center gap-2">
                            <span style={{ color: branch.color }}>•</span>
                            {child}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DataFlow = ({ content, revealed, onReveal }) => {
  const padding = 60;
  const nodeWidth = 140;
  const nodeHeight = 50;
  
  const minX = Math.min(...content.nodes.map(n => n.x)) - padding;
  const minY = Math.min(...content.nodes.map(n => n.y)) - padding;
  const maxX = Math.max(...content.nodes.map(n => n.x)) + nodeWidth + padding;
  const maxY = Math.max(...content.nodes.map(n => n.y)) + nodeHeight + padding;
  
  const width = maxX - minX;
  const height = maxY - minY;

  const nodeColors = {
    boundary: { fill: '#1e3a5f', stroke: '#3b82f6' },
    process: { fill: '#4a3728', stroke: '#f59e0b' },
    flow: { fill: '#1a3d2e', stroke: '#22c55e' },
  };

  const getNodeCenter = (nodeId) => {
    const node = content.nodes.find(n => n.id === nodeId);
    return node ? { x: node.x + nodeWidth / 2, y: node.y + nodeHeight / 2 } : { x: 0, y: 0 };
  };

  return (
    <div className="space-y-4 overflow-hidden">
      <p className="text-slate-400 text-sm text-center">{content.description}</p>
      
      <div className="flex justify-center gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: nodeColors.boundary.stroke }}></div>
          <span className="text-slate-400">Boundary</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: nodeColors.process.stroke }}></div>
          <span className="text-slate-400">Process</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: nodeColors.flow.stroke }}></div>
          <span className="text-slate-400">Flow</span>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-2 overflow-x-auto">
        <svg 
          viewBox={`${minX} ${minY} ${width} ${height}`}
          className="w-full min-w-[300px]"
          style={{ maxHeight: '300px' }}
        >
          {content.edges.map((edge, i) => {
            const from = getNodeCenter(edge.from);
            const to = getNodeCenter(edge.to);
            return (
              <g key={i}>
                <defs>
                  <marker id={`arrow-${i}`} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
                  </marker>
                </defs>
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke="#64748b"
                  strokeWidth="2"
                  markerEnd={`url(#arrow-${i})`}
                />
              </g>
            );
          })}
          
          {content.nodes.map(node => {
            const colors = nodeColors[node.type] || nodeColors.process;
            const isRevealed = revealed.includes(node.id);
            return (
              <g key={node.id} onClick={() => onReveal(node.id)} className="cursor-pointer">
                <rect
                  x={node.x} y={node.y}
                  width={nodeWidth} height={nodeHeight}
                  rx="8"
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isRevealed ? "3" : "2"}
                />
                <text
                  x={node.x + nodeWidth / 2}
                  y={node.y + nodeHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="500"
                >
                  {node.label}
                </text>
                {!isRevealed && (
                  <circle cx={node.x + nodeWidth - 10} cy={node.y + 10} r="5" fill="#3b82f6" className="animate-pulse" />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="space-y-2">
        {content.nodes.filter(n => revealed.includes(n.id)).map(node => {
          const colors = nodeColors[node.type] || nodeColors.process;
          return (
            <div key={node.id} className="p-3 rounded-lg border-l-4" style={{ backgroundColor: colors.fill, borderColor: colors.stroke }}>
              <h4 className="font-semibold text-white text-sm">{node.label}</h4>
              <p className="text-slate-300 text-sm mt-1">{content.reveals[node.id]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FaultTree = ({ content, revealed, onReveal }) => {
  const [expanded, setExpanded] = useState({});
  const toggleBranch = (faultId) => setExpanded(prev => ({ ...prev, [faultId]: !prev[faultId] }));
  const iconMap = { warning: '⚠️', error: '❌', info: 'ℹ️' };

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="bg-red-900/40 border-2 border-red-500 rounded-lg p-4 text-center">
        <span className="text-red-400 text-2xl">🚨</span>
        <h3 className="text-white font-bold mt-2">{content.root}</h3>
      </div>

      <div className="space-y-3">
        {content.branches.map((branch, branchIndex) => {
          const isExpanded = expanded[branch.fault];
          const branchReveals = branch.causes.map((_, i) => `${branch.fault}-${i}`);
          const revealedCount = branchReveals.filter(id => revealed.includes(id)).length;
          
          return (
            <div key={branchIndex} className="bg-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleBranch(branch.fault)}
                className="w-full p-3 flex items-center justify-between hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{iconMap[branch.icon] || '⚠️'}</span>
                  <span className="font-semibold text-white">{branch.fault}</span>
                  <span className="text-slate-400 text-sm">({revealedCount}/{branch.causes.length})</span>
                </div>
                <span className="text-slate-400">{isExpanded ? '▼' : '▶'}</span>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-700">
                  {branch.causes.map((cause, causeIndex) => {
                    const causeId = `${branch.fault}-${causeIndex}`;
                    const isRevealed = revealed.includes(causeId);
                    
                    return (
                      <div 
                        key={causeIndex}
                        className={`p-3 border-b border-slate-700 last:border-b-0 cursor-pointer transition-colors ${isRevealed ? 'bg-slate-700' : 'hover:bg-slate-750'}`}
                        onClick={() => onReveal(causeId)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-amber-300 font-medium text-sm">{cause.cause}</span>
                          {!isRevealed && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                        </div>
                        
                        {isRevealed && (
                          <div className="mt-2 space-y-2 text-sm">
                            <p className="text-slate-300">{cause.detail}</p>
                            <div className="bg-green-900/30 border border-green-700 rounded p-2">
                              <span className="text-green-400 font-medium">Fix: </span>
                              <span className="text-slate-200">{cause.fix}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StateDiagram = ({ content, revealed, onReveal }) => {
  const padding = 60;
  const stateWidth = 120;
  const stateHeight = 60;
  const initialRadius = 12;
  const finalOuterRadius = 14;
  const finalInnerRadius = 8;
  
  // Calculate viewBox from state positions
  const allX = content.states.map(s => s.x);
  const allY = content.states.map(s => s.y);
  const minX = Math.min(...allX) - padding;
  const minY = Math.min(...allY) - padding;
  const maxX = Math.max(...allX) + stateWidth + padding;
  const maxY = Math.max(...allY) + stateHeight + padding;
  const width = maxX - minX;
  const height = maxY - minY;

  const stateColors = {
    initial: { fill: '#1e293b', stroke: '#64748b' },
    normal: { fill: '#1e3a5f', stroke: '#8b5cf6' },
    final: { fill: '#1e293b', stroke: '#64748b' },
    active: { fill: '#2d1f4e', stroke: '#a78bfa' },
  };

  const getStateCenter = (stateId) => {
    const state = content.states.find(s => s.id === stateId);
    if (!state) return { x: 0, y: 0 };
    if (state.type === 'initial') return { x: state.x, y: state.y };
    if (state.type === 'final') return { x: state.x, y: state.y };
    return { x: state.x + stateWidth / 2, y: state.y + stateHeight / 2 };
  };

  const getEdgePoints = (fromId, toId) => {
    const from = getStateCenter(fromId);
    const to = getStateCenter(toId);
    const fromState = content.states.find(s => s.id === fromId);
    const toState = content.states.find(s => s.id === toId);
    
    // Calculate angle between states
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    
    // Offset from center based on state type
    let fromOffset = { x: 0, y: 0 };
    let toOffset = { x: 0, y: 0 };
    
    if (fromState?.type === 'initial') {
      fromOffset = { x: Math.cos(angle) * initialRadius, y: Math.sin(angle) * initialRadius };
    } else if (fromState?.type === 'final') {
      fromOffset = { x: Math.cos(angle) * finalOuterRadius, y: Math.sin(angle) * finalOuterRadius };
    } else {
      // Rectangle edge intersection
      const hw = stateWidth / 2;
      const hh = stateHeight / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const t = Math.min(Math.abs(hw / cos), Math.abs(hh / sin));
      fromOffset = { x: cos * t, y: sin * t };
    }
    
    if (toState?.type === 'initial') {
      toOffset = { x: -Math.cos(angle) * initialRadius, y: -Math.sin(angle) * initialRadius };
    } else if (toState?.type === 'final') {
      toOffset = { x: -Math.cos(angle) * finalOuterRadius, y: -Math.sin(angle) * finalOuterRadius };
    } else {
      const hw = stateWidth / 2;
      const hh = stateHeight / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const t = Math.min(Math.abs(hw / cos), Math.abs(hh / sin));
      toOffset = { x: -cos * t, y: -sin * t };
    }
    
    return {
      x1: from.x + fromOffset.x,
      y1: from.y + fromOffset.y,
      x2: to.x + toOffset.x,
      y2: to.y + toOffset.y,
    };
  };

  const renderState = (state) => {
    const isRevealed = revealed.includes(state.id);
    const colors = stateColors[state.type] || stateColors.normal;
    
    if (state.type === 'initial') {
      return (
        <g key={state.id} className="cursor-default">
          <circle
            cx={state.x}
            cy={state.y}
            r={initialRadius}
            fill="#64748b"
          />
        </g>
      );
    }
    
    if (state.type === 'final') {
      return (
        <g key={state.id} className="cursor-default">
          <circle cx={state.x} cy={state.y} r={finalOuterRadius} fill="none" stroke="#64748b" strokeWidth="2" />
          <circle cx={state.x} cy={state.y} r={finalInnerRadius} fill="#64748b" />
        </g>
      );
    }
    
    return (
      <g key={state.id} onClick={() => onReveal(state.id)} className="cursor-pointer">
        <rect
          x={state.x}
          y={state.y}
          width={stateWidth}
          height={stateHeight}
          rx="20"
          fill={isRevealed ? stateColors.active.fill : colors.fill}
          stroke={isRevealed ? stateColors.active.stroke : colors.stroke}
          strokeWidth={isRevealed ? "3" : "2"}
        />
        <text
          x={state.x + stateWidth / 2}
          y={state.y + stateHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="12"
          fontWeight="600"
        >
          {state.label}
        </text>
        {!isRevealed && content.reveals?.[state.id] && (
          <circle cx={state.x + stateWidth - 10} cy={state.y + 10} r="5" fill="#8b5cf6" className="animate-pulse" />
        )}
      </g>
    );
  };

  return (
    <div className="space-y-4 overflow-hidden">
      <p className="text-slate-400 text-sm text-center">{content.description}</p>
      
      <div className="flex justify-center gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-slate-500"></div>
          <span className="text-slate-400">Initial/Final</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-lg" style={{ backgroundColor: stateColors.normal.stroke }}></div>
          <span className="text-slate-400">State</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-slate-400 text-xs">event [guard]</span>
          <span className="text-slate-500">→</span>
          <span className="text-slate-400 text-xs">Transition</span>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-2 overflow-x-auto">
        <svg 
          viewBox={`${minX} ${minY} ${width} ${height}`}
          className="w-full min-w-[300px]"
          style={{ maxHeight: '350px' }}
        >
          <defs>
            <marker id="state-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
            </marker>
          </defs>
          
          {/* Transitions */}
          {content.transitions.map((trans, i) => {
            const pts = getEdgePoints(trans.from, trans.to);
            const midX = (pts.x1 + pts.x2) / 2;
            const midY = (pts.y1 + pts.y2) / 2;
            const label = [trans.event, trans.guard ? `[${trans.guard}]` : ''].filter(Boolean).join(' ');
            
            return (
              <g key={i}>
                <line
                  x1={pts.x1} y1={pts.y1}
                  x2={pts.x2} y2={pts.y2}
                  stroke="#64748b"
                  strokeWidth="2"
                  markerEnd="url(#state-arrow)"
                />
                {label && (
                  <text
                    x={midX}
                    y={midY - 8}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                    fontStyle="italic"
                  >
                    {label}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* States */}
          {content.states.map(renderState)}
        </svg>
      </div>

      {/* Revealed state details */}
      <div className="space-y-2">
        {content.states
          .filter(s => s.type === 'normal' && revealed.includes(s.id) && content.reveals?.[s.id])
          .map(state => {
            const reveal = content.reveals[state.id];
            return (
              <div key={state.id} className="p-3 rounded-lg border-l-4 bg-slate-800" style={{ borderColor: stateColors.active.stroke }}>
                <h4 className="font-semibold text-white text-sm mb-2">{state.label}</h4>
                {typeof reveal === 'string' ? (
                  <p className="text-slate-300 text-sm">{reveal}</p>
                ) : (
                  <div className="space-y-1 text-sm">
                    {reveal.entry && (
                      <div className="flex gap-2">
                        <span className="text-purple-400 font-mono text-xs">entry/</span>
                        <span className="text-slate-300">{reveal.entry}</span>
                      </div>
                    )}
                    {reveal.do && (
                      <div className="flex gap-2">
                        <span className="text-cyan-400 font-mono text-xs">do/</span>
                        <span className="text-slate-300">{reveal.do}</span>
                      </div>
                    )}
                    {reveal.exit && (
                      <div className="flex gap-2">
                        <span className="text-amber-400 font-mono text-xs">exit/</span>
                        <span className="text-slate-300">{reveal.exit}</span>
                      </div>
                    )}
                    {reveal.notes && (
                      <p className="text-slate-400 text-xs mt-2 italic">{reveal.notes}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

// ============================================================================
// MODAL COMPONENTS
// ============================================================================

// Contextual Help Modal ("Clippy")
const ContextualHelpModal = ({ context, onClose }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const buildSystemPrompt = () => {
    let prompt = `You are a helpful SysML v2 tutor embedded in a learning platform. Be encouraging, concise (under 200 words), and practical.

Current context:`;
    
    if (context.view === 'dashboard') {
      prompt += `\n- User is on the main dashboard viewing all categories`;
    } else if (context.view === 'category' && context.category) {
      prompt += `\n- User is viewing category: "${context.category.title}"`;
      prompt += `\n- Category description: ${context.category.description}`;
    } else if (context.view === 'module' && context.module) {
      prompt += `\n- User is studying module: "${context.module.title}"`;
      prompt += `\n- Module type: ${context.module.type}`;
      prompt += `\n- Why it matters: ${context.module.why}`;
      prompt += `\n- Common pitfalls: ${context.module.pitfalls?.join('; ')}`;
    }
    
    if (context.sandboxCode) {
      prompt += `\n- User has code in sandbox:\n\`\`\`sysml\n${context.sandboxCode}\n\`\`\``;
    }

    prompt += `\n\nHelp the user understand SysML v2 concepts. If they ask about their code, review it. If they seem stuck, offer encouragement and a concrete next step.`;
    
    return prompt;
  };

  const askQuestion = async (q) => {
    if (!q.trim()) return;
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildSystemPrompt(),
          messages: [{ role: "user", content: q }],
        })
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error.message || 'API error');
      } else {
        const text = data.content?.map(c => c.text || '').join('\n') || 'No response';
        setResponse(text);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const quickActions = [
    { label: '💡 Explain this topic', question: 'Can you explain what I should learn from this topic and why it matters?' },
    { label: '🤔 I\'m stuck', question: 'I\'m feeling stuck. Can you give me a hint or suggest what to focus on next?' },
    { label: '📝 Review my code', question: 'Can you review my SysML code and tell me if I\'m on the right track?', needsCode: true },
    { label: '🔗 How does this connect?', question: 'How does this topic connect to other SysML v2 concepts I should know?' },
  ];

  const getContextSummary = () => {
    if (context.view === 'module' && context.module) return `📍 ${context.module.title}`;
    if (context.view === 'category' && context.category) return `📂 ${context.category.title}`;
    return '🏠 Dashboard';
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto" onClick={onClose}>
      <div className="min-h-full p-4 flex items-start justify-center">
        <div className="bg-slate-800 rounded-xl w-full max-w-2xl my-4" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div>
              <h2 className="text-lg font-bold text-white">🤖 SysML Help</h2>
              <p className="text-slate-400 text-sm">{getContextSummary()}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-500 rounded text-white font-bold">✕</button>
          </div>

          <div className="p-4 space-y-4">
            {/* Quick Actions */}
            <div>
              <p className="text-slate-400 text-sm mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (action.needsCode && !context.sandboxCode) {
                        setError('No code in sandbox to review. Open the sandbox (S) and write some SysML first!');
                        return;
                      }
                      setQuestion(action.question);
                      askQuestion(action.question);
                    }}
                    disabled={isLoading}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-sm text-white"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Question */}
            <div>
              <p className="text-slate-400 text-sm mb-2">Or ask anything:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && askQuestion(question)}
                  placeholder="What's the difference between part def and part usage?"
                  className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500"
                />
                <button
                  onClick={() => askQuestion(question)}
                  disabled={isLoading || !question.trim()}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 rounded text-white font-semibold"
                >
                  {isLoading ? '...' : 'Ask'}
                </button>
              </div>
            </div>

            {/* Response Area */}
            {error && (
              <div className="bg-red-900/50 border border-red-700 rounded p-3">
                <p className="text-red-300 text-sm">⚠️ {error}</p>
              </div>
            )}

            {isLoading && (
              <div className="bg-slate-900 rounded p-4 text-center">
                <div className="animate-pulse text-cyan-400">Thinking...</div>
              </div>
            )}

            {response && !isLoading && (
              <div className="bg-slate-900 rounded p-4">
                <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{response}</p>
              </div>
            )}

            {/* Context Info */}
            {context.sandboxCode && (
              <div className="text-xs text-slate-500 border-t border-slate-700 pt-3">
                <span className="text-green-400">✓</span> Sandbox code available ({context.sandboxCode.split('\n').length} lines)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const KeyboardHelpModal = ({ onClose }) => {
  const shortcuts = [
    { key: 'H', action: 'Help (Contextual AI Assistant)' },
    { key: 'Q', action: 'Quick Review' },
    { key: 'R', action: 'Reference' },
    { key: 'S', action: 'Sandbox' },
    { key: 'Esc', action: 'Close / Back' },
    { key: '?', action: 'This help' },
  ];
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">×</button>
        </div>
        <div className="space-y-2">
          {shortcuts.map(({ key, action }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-slate-700">
              <kbd className="bg-slate-700 px-3 py-1 rounded text-sm font-mono">{key}</kbd>
              <span className="text-slate-300">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const QuickReviewModal = ({ progress, notes, onClose, onNavigate }) => {
  const completedModules = [];
  Object.values(curriculum).forEach(category => {
    category.modules.forEach(module => {
      if (progress[module.id]?.complete) {
        completedModules.push({ ...module, categoryIcon: category.icon });
      }
    });
  });
  return (
    <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto" onClick={onClose}>
      <div className="min-h-full p-4 flex items-start justify-center">
        <div className="bg-slate-800 rounded-xl w-full max-w-xl relative my-4" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="text-lg font-bold text-white">📋 Quick Review</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-500 rounded text-white font-bold">✕</button>
          </div>
          <div className="p-4">
            {completedModules.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No completed modules yet.</p>
            ) : (
              <div className="space-y-2">
                {completedModules.map(module => (
                  <button
                    key={module.id}
                    className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg"
                    onClick={() => { onNavigate(module); onClose(); }}
                  >
                    <span>{module.categoryIcon}</span>
                    <span className="font-medium text-white ml-2">{module.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-slate-700">
            <button onClick={onClose} className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded text-white">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReferenceModal = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState(referenceData.sections[0]?.id);
  return (
    <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto" onClick={onClose}>
      <div className="min-h-full p-4 flex items-start justify-center">
        <div className="bg-slate-800 rounded-xl w-full max-w-xl relative my-4" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="text-lg font-bold text-white">📖 SysML v2 Reference</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-500 rounded text-white font-bold">✕</button>
          </div>
          <div className="flex gap-2 p-3 border-b border-slate-700 flex-wrap">
            {referenceData.sections.map(section => (
              <button
                key={section.id}
                className={`px-3 py-1 rounded text-sm ${activeSection === section.id ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </button>
            ))}
          </div>
          <div className="p-4 space-y-3">
            {referenceData.sections.filter(s => s.id === activeSection).map(section => (
              section.content.map((item, i) => (
                <div key={i} className="bg-slate-700 p-3 rounded-lg">
                  <span className="font-semibold text-cyan-300">{item.term}</span>
                  <p className="text-slate-300 text-sm mt-1">{item.definition}</p>
                  {item.syntax && (
                    <pre className="mt-2 p-2 bg-slate-900 rounded text-green-400 text-sm font-mono overflow-x-auto">{item.syntax}</pre>
                  )}
                </div>
              ))
            ))}
          </div>
          <div className="p-4 border-t border-slate-700">
            <button onClick={onClose} className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded text-white">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotesModal = ({ moduleId, moduleTitle, notes, onSave, onClose }) => {
  const [text, setText] = useState(notes.modules?.[moduleId] || '');
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Notes: {moduleTitle}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">×</button>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full h-48 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-cyan-500"
          placeholder="Add your notes..."
          autoFocus
        />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white">Cancel</button>
          <button onClick={() => { onSave(moduleId, text); onClose(); }} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white">Save</button>
        </div>
      </div>
    </div>
  );
};

const SandboxModal = ({ progress, onClose, onCodeChange }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(() => {
    try {
      const saved = localStorage.getItem('sysml-sandbox-completed');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Report code changes to parent for contextual help
  useEffect(() => {
    onCodeChange?.(code);
  }, [code, onCodeChange]);

  const isUnlocked = (ex) => !ex.unlockRequires?.length || ex.unlockRequires.every(id => progress[id]?.complete);
  const unlockedExercises = sandboxExercises.filter(isUnlocked);
  const lockedCount = sandboxExercises.length - unlockedExercises.length;

  const handleCheck = async () => {
    if (!code.trim() || !selectedExercise) return;
    setIsLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a SysML v2 tutor. Review code for: 1) Syntax validity 2) Semantic sense 3) Meeting requirements. Be encouraging but accurate. Keep responses under 150 words.

Exercise: ${selectedExercise.prompt}
Expected elements: ${selectedExercise.expectedElements?.join(', ')}`,
          messages: [{ role: "user", content: `Review my SysML v2:\n\`\`\`\n${code}\n\`\`\`` }],
        })
      });
      const data = await response.json();
      const text = data.content?.map(c => c.text || '').join('\n') || 'No response';
      const isCorrect = selectedExercise.expectedElements?.every(el => code.toLowerCase().includes(el.toLowerCase()));
      
      setFeedback({ text, isCorrect });
      if (isCorrect && !completedExercises.includes(selectedExercise.id)) {
        const newCompleted = [...completedExercises, selectedExercise.id];
        setCompletedExercises(newCompleted);
        localStorage.setItem('sysml-sandbox-completed', JSON.stringify(newCompleted));
      }
    } catch (err) {
      setFeedback({ text: `Error: ${err.message}`, isCorrect: false });
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto" onClick={onClose}>
      <div className="min-h-full p-4 flex items-start justify-center">
        <div className="bg-slate-800 rounded-xl w-full max-w-4xl my-4" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div>
              <h2 className="text-lg font-bold text-white">🧪 SysML v2 Practice Sandbox</h2>
              <p className="text-slate-400 text-sm">{unlockedExercises.length} unlocked • {completedExercises.length} completed</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-500 rounded text-white font-bold">✕</button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 p-4">
            <div className="md:w-56 flex-shrink-0 space-y-2 max-h-48 md:max-h-96 overflow-y-auto">
              {unlockedExercises.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => { setSelectedExercise(ex); setCode(ex.starterCode || ''); setFeedback(null); }}
                  className={`w-full text-left p-2 rounded text-sm ${selectedExercise?.id === ex.id ? 'bg-cyan-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                  <div className="flex items-center gap-2">
                    {completedExercises.includes(ex.id) && <span className="text-green-400">✓</span>}
                    <span>{ex.title}</span>
                  </div>
                  <span className={`text-xs ${ex.difficulty === 'easy' ? 'text-green-400' : ex.difficulty === 'medium' ? 'text-amber-400' : 'text-red-400'}`}>
                    {ex.difficulty}
                  </span>
                </button>
              ))}
              {lockedCount > 0 && (
                <div className="text-slate-500 text-sm p-2 border border-slate-600 rounded">🔒 {lockedCount} more unlock with progress</div>
              )}
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              {selectedExercise ? (
                <>
                  <div className="bg-slate-900 p-3 rounded-t-lg">
                    <h3 className="font-semibold text-white">{selectedExercise.title}</h3>
                    <p className="text-slate-300 text-sm mt-1">{selectedExercise.prompt}</p>
                    <p className="text-cyan-400 text-xs mt-2">💡 {selectedExercise.hint}</p>
                  </div>
                  <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="w-full bg-slate-950 text-green-400 font-mono text-sm p-3 resize-none focus:outline-none min-h-[150px]"
                    placeholder="// Write SysML v2 here..."
                    spellCheck={false}
                  />
                  <div className="bg-slate-900 p-2 flex flex-wrap gap-2">
                    <button onClick={handleCheck} disabled={isLoading || !code.trim()} className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 text-white text-sm font-semibold rounded">
                      {isLoading ? '⏳...' : '🤖 Check'}
                    </button>
                    <button onClick={() => setCode(selectedExercise.solution)} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm">👀 Solution</button>
                    <button onClick={() => setCode(selectedExercise.starterCode || '')} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm">🔄 Reset</button>
                  </div>
                  {feedback && (
                    <div className={`p-3 ${feedback.isCorrect ? 'bg-green-900/50' : 'bg-slate-900'} rounded-b-lg max-h-32 overflow-y-auto`}>
                      {feedback.isCorrect && <div className="text-green-400 font-semibold mb-1 text-sm">✓ Correct!</div>}
                      <div className="text-slate-200 text-sm whitespace-pre-wrap">{feedback.text}</div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 min-h-[200px]">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-sm">Select an exercise</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KnowledgeCheckModal = ({ categoryId, onClose, onComplete }) => {
  const check = knowledgeChecks[categoryId];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!check) return null;

  const question = check.questions[currentQuestion];
  const totalQuestions = check.questions.length;
  const correctCount = Object.entries(answers).filter(([qId, ans]) => {
    const q = check.questions.find(q => q.id === qId);
    return q && ans === q.correctIndex;
  }).length;
  const passed = correctCount >= check.passingScore;

  const handleAnswer = (index) => {
    if (showExplanation) return; // Already answered
    setSelectedAnswer(index);
    setShowExplanation(true);
    setAnswers(prev => ({ ...prev, [question.id]: index }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto" onClick={onClose}>
      <div className="min-h-full p-4 flex items-center justify-center">
        <div className="bg-slate-800 rounded-xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div>
              <h2 className="text-lg font-bold text-white">📝 {check.title}</h2>
              <p className="text-slate-400 text-sm">
                {showResults ? `Score: ${correctCount}/${totalQuestions}` : `Question ${currentQuestion + 1} of ${totalQuestions}`}
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-500 rounded text-white font-bold">✕</button>
          </div>

          <div className="p-6">
            {showResults ? (
              <div className="text-center space-y-6">
                <div className={`text-6xl ${passed ? 'text-green-400' : 'text-amber-400'}`}>
                  {passed ? '🎉' : '📚'}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {passed ? 'Passed!' : 'Keep Practicing'}
                  </h3>
                  <p className="text-slate-300">
                    You got <span className="font-bold text-cyan-400">{correctCount}</span> out of <span className="font-bold">{totalQuestions}</span> correct.
                    {!passed && ` Need ${check.passingScore} to pass.`}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  {!passed && (
                    <button onClick={handleRetry} className="px-6 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg font-semibold">
                      Try Again
                    </button>
                  )}
                  <button onClick={() => { if (passed) onComplete(categoryId, correctCount); onClose(); }} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold">
                    {passed ? 'Complete!' : 'Close'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Question */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{question.question}</h3>
                  {question.code && (
                    <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto mb-4">
                      {question.code}
                    </pre>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === question.correctIndex;
                    const showCorrectness = showExplanation;
                    
                    let bgClass = 'bg-slate-700 hover:bg-slate-600';
                    if (showCorrectness) {
                      if (isCorrect) bgClass = 'bg-green-700';
                      else if (isSelected && !isCorrect) bgClass = 'bg-red-700';
                      else bgClass = 'bg-slate-700 opacity-50';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showExplanation}
                        className={`w-full text-left p-3 rounded-lg transition-all ${bgClass} ${!showExplanation ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 flex items-center justify-center bg-slate-600 rounded text-sm font-mono">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-white">{option}</span>
                          {showCorrectness && isCorrect && <span className="ml-auto text-green-400">✓</span>}
                          {showCorrectness && isSelected && !isCorrect && <span className="ml-auto text-red-400">✗</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <div className="bg-slate-900 border border-slate-600 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={selectedAnswer === question.correctIndex ? 'text-green-400' : 'text-amber-400'}>
                        {selectedAnswer === question.correctIndex ? '✓ Correct!' : '✗ Not quite'}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm">{question.explanation}</p>
                  </div>
                )}

                {/* Navigation */}
                {showExplanation && (
                  <div className="flex justify-end">
                    <button onClick={handleNext} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold">
                      {currentQuestion < totalQuestions - 1 ? 'Next →' : 'See Results'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress bar */}
          {!showResults && (
            <div className="px-6 pb-4">
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all" 
                  style={{ width: `${((currentQuestion + (showExplanation ? 1 : 0)) / totalQuestions) * 100}%` }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// VIEW COMPONENTS
// ============================================================================

const Dashboard = ({ progress, onSelectCategory }) => {
  const totalModules = Object.values(curriculum).reduce((sum, cat) => sum + cat.modules.length, 0);
  const completedModules = Object.values(curriculum).reduce(
    (sum, cat) => sum + cat.modules.filter(m => progress[m.id]?.complete).length, 0
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{config.title}</h1>
        <p className="text-slate-400">{config.subtitle}</p>
        <div className="mt-4 inline-block bg-slate-800 px-6 py-3 rounded-full">
          <span className="text-slate-300">Progress: </span>
          <span className="text-cyan-400 font-bold">{completedModules}/{totalModules} modules</span>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {Object.values(curriculum).map(category => {
          const completed = category.modules.filter(m => progress[m.id]?.complete).length;
          const total = category.modules.length;
          const percent = Math.round((completed / total) * 100);

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className="text-left p-4 md:p-6 rounded-xl bg-slate-800 hover:bg-slate-700 border-2 hover:scale-[1.02] transition-all"
              style={{ borderColor: category.color }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl md:text-3xl">{category.icon}</span>
                <h2 className="text-lg md:text-xl font-bold text-white">{category.title}</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">{category.description}</p>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full transition-all" style={{ width: `${percent}%`, backgroundColor: category.color }} />
              </div>
              <p className="text-right text-sm text-slate-400 mt-1">{completed}/{total} complete</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const CategoryView = ({ category, progress, quizProgress, onBack, onSelectModule, onTakeQuiz }) => {
  const allComplete = category.modules.every(m => progress[m.id]?.complete);
  const hasQuiz = knowledgeChecks[category.id];
  const quizPassed = quizProgress[category.id]?.passed;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-700 rounded-lg text-2xl">←</button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl">{category.icon}</span>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{category.title}</h1>
          </div>
          <p className="text-slate-400">{category.description}</p>
        </div>
      </div>

      {/* Quiz banner - show when all modules complete and quiz exists */}
      {hasQuiz && allComplete && (
        <div className={`p-4 rounded-lg border-2 ${quizPassed ? 'bg-green-900/30 border-green-600' : 'bg-purple-900/30 border-purple-500'}`}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                {quizPassed ? '✓ Knowledge Check Passed' : '📝 Ready for Knowledge Check'}
              </h3>
              <p className="text-slate-400 text-sm">
                {quizPassed 
                  ? `Score: ${quizProgress[category.id].score}/${knowledgeChecks[category.id].questions.length}` 
                  : `${knowledgeChecks[category.id].questions.length} questions • Pass: ${knowledgeChecks[category.id].passingScore}+ correct`}
              </p>
            </div>
            <button 
              onClick={() => onTakeQuiz(category.id)}
              className={`px-4 py-2 rounded-lg font-semibold ${quizPassed ? 'bg-slate-600 hover:bg-slate-500' : 'bg-purple-600 hover:bg-purple-500'}`}
            >
              {quizPassed ? 'Retake Quiz' : 'Take Quiz'}
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-3 md:gap-4">
        {category.modules.map((module, index) => {
          const isComplete = progress[module.id]?.complete;
          return (
            <button
              key={module.id}
              onClick={() => onSelectModule(module)}
              className={`text-left p-3 md:p-4 rounded-lg transition-all hover:scale-[1.01] ${
                isComplete ? 'bg-green-900/30 border-2 border-green-600' : 'bg-slate-800 border-2 border-slate-600 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-semibold text-white">{module.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded hidden md:inline" style={{ backgroundColor: `${config.theme[module.type]}30`, color: config.theme[module.type] }}>
                    {module.type}
                  </span>
                </div>
                {isComplete && <span className="text-green-400 text-xl">✓</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ModuleView = ({ module, category, progress, notes, onBack, onComplete, onSaveNote }) => {
  const [revealed, setRevealed] = useState(progress[module.id]?.revealed || []);
  const [showNotes, setShowNotes] = useState(false);
  const isComplete = progress[module.id]?.complete;

  const getRequiredReveals = () => {
    switch (module.type) {
      case 'conceptmap': return module.content.branches?.map(b => b.id) || [];
      case 'dataflow': return module.content.nodes?.map(n => n.id) || [];
      case 'faulttree': return module.content.branches?.flatMap((branch) => branch.causes.map((_, ci) => `${branch.fault}-${ci}`)) || [];
      case 'statediagram': return module.content.states?.filter(s => s.type === 'normal' && module.content.reveals?.[s.id]).map(s => s.id) || [];
      default: return [];
    }
  };
  
  const requiredReveals = getRequiredReveals();
  const allRevealed = requiredReveals.every(r => revealed.includes(r));

  const handleReveal = (id) => {
    if (!revealed.includes(id)) setRevealed([...revealed, id]);
  };

  const renderVisualization = () => {
    switch (module.type) {
      case 'conceptmap': return <ConceptMap content={module.content} revealed={revealed} onReveal={handleReveal} />;
      case 'dataflow': return <DataFlow content={module.content} revealed={revealed} onReveal={handleReveal} />;
      case 'faulttree': return <FaultTree content={module.content} revealed={revealed} onReveal={handleReveal} />;
      case 'statediagram': return <StateDiagram content={module.content} revealed={revealed} onReveal={handleReveal} />;
      default: return <p className="text-slate-400">Unknown visualization type: {module.type}</p>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-700 rounded-lg text-2xl">←</button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl md:text-2xl">{category.icon}</span>
            <h1 className="text-xl md:text-2xl font-bold text-white truncate">{module.title}</h1>
            {isComplete && <span className="bg-green-600 text-white text-xs px-2 py-1 rounded flex-shrink-0">Completed</span>}
          </div>
        </div>
        <button onClick={() => setShowNotes(true)} className="p-2 hover:bg-slate-700 rounded-lg text-xl flex-shrink-0">
          {notes.modules?.[module.id] ? '📝' : '📋'}
        </button>
      </div>

      <div className="bg-cyan-900/30 border border-cyan-700 rounded-lg p-3 md:p-4">
        <h3 className="text-cyan-300 font-semibold mb-2">Why This Matters</h3>
        <p className="text-slate-200 text-sm md:text-base">{module.why}</p>
      </div>

      {module.pitfalls?.length > 0 && (
        <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-3 md:p-4">
          <h3 className="text-amber-300 font-semibold mb-2">Watch Out For</h3>
          <ul className="space-y-1">
            {module.pitfalls.map((p, i) => (
              <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                <span className="text-amber-400 flex-shrink-0">⚠</span>{p}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-slate-800 rounded-lg p-3 md:p-6 overflow-hidden">
        {renderVisualization()}
      </div>

      {!isComplete && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-800 rounded-lg p-4">
          <div>
            <span className="text-slate-400">Progress: </span>
            <span className="text-white font-semibold">{revealed.length}/{requiredReveals.length} revealed</span>
          </div>
          {allRevealed && (
            <button onClick={() => onComplete(module.id, revealed)} className="w-full md:w-auto px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg">
              Complete & Freeze ✓
            </button>
          )}
        </div>
      )}

      {notes.modules?.[module.id] && (
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-slate-300 font-semibold mb-2">📝 My Notes</h3>
          <p className="text-slate-200 whitespace-pre-wrap">{notes.modules[module.id]}</p>
        </div>
      )}

      {showNotes && (
        <NotesModal moduleId={module.id} moduleTitle={module.title} notes={notes} onSave={onSaveNote} onClose={() => setShowNotes(false)} />
      )}
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [view, setView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showQuickReview, setShowQuickReview] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showSandbox, setShowSandbox] = useState(false);
  const [showKnowledgeCheck, setShowKnowledgeCheck] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [sandboxCode, setSandboxCode] = useState('');
  const [quizCategoryId, setQuizCategoryId] = useState(null);
  const [progress, setProgress] = useState({});
  const [quizProgress, setQuizProgress] = useState({});
  const [notes, setNotes] = useState({ modules: {}, bookmarks: {} });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(config.storageKey);
      if (saved) setProgress(JSON.parse(saved));
      const savedNotes = localStorage.getItem(`${config.storageKey}-notes`);
      if (savedNotes) setNotes(JSON.parse(savedNotes));
      const savedQuiz = localStorage.getItem(`${config.storageKey}-quiz`);
      if (savedQuiz) setQuizProgress(JSON.parse(savedQuiz));
    } catch {}
  }, []);

  useEffect(() => { localStorage.setItem(config.storageKey, JSON.stringify(progress)); }, [progress]);
  useEffect(() => { localStorage.setItem(`${config.storageKey}-notes`, JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem(`${config.storageKey}-quiz`, JSON.stringify(quizProgress)); }, [quizProgress]);

  const handleBack = () => {
    if (view === 'module') { setView('category'); setSelectedModule(null); }
    else if (view === 'category') { setView('dashboard'); setSelectedCategory(null); }
  };

  const handleComplete = (moduleId, revealed) => {
    setProgress(prev => ({ ...prev, [moduleId]: { complete: true, revealed, completedAt: new Date().toISOString() } }));
  };

  const handleSaveNote = (moduleId, text) => {
    setNotes(prev => ({ ...prev, modules: { ...prev.modules, [moduleId]: text || undefined } }));
  };

  const handleExport = () => {
    const md = generateMarkdownExport(progress, notes);
    downloadFile(md, `sysml-v2-export-${new Date().toISOString().split('T')[0]}.md`);
  };

  const handleNavigateToModule = (module) => {
    const category = Object.values(curriculum).find(cat => cat.modules.some(m => m.id === module.id));
    if (category) { setSelectedCategory(category); setSelectedModule(module); setView('module'); }
  };

  const handleTakeQuiz = (categoryId) => {
    setQuizCategoryId(categoryId);
    setShowKnowledgeCheck(true);
  };

  const handleQuizComplete = (categoryId, score) => {
    setQuizProgress(prev => ({
      ...prev,
      [categoryId]: { passed: true, score, completedAt: new Date().toISOString() }
    }));
  };

  const keyboardHandlers = useCallback(() => ({
    '?': () => setShowKeyboardHelp(true),
    'escape': () => {
      if (showHelp) setShowHelp(false);
      else if (showKnowledgeCheck) setShowKnowledgeCheck(false);
      else if (showKeyboardHelp) setShowKeyboardHelp(false);
      else if (showQuickReview) setShowQuickReview(false);
      else if (showReference) setShowReference(false);
      else if (showSandbox) setShowSandbox(false);
      else handleBack();
    },
    'h': () => setShowHelp(true),
    'q': () => setShowQuickReview(true),
    'r': () => setShowReference(true),
    's': () => setShowSandbox(true),
    'ctrl+e': handleExport,
  }), [showKeyboardHelp, showQuickReview, showReference, showSandbox, showKnowledgeCheck, showHelp]);

  useKeyboardNav(keyboardHandlers());

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {view === 'dashboard' && <Dashboard progress={progress} onSelectCategory={cat => { setSelectedCategory(cat); setView('category'); }} />}
        {view === 'category' && selectedCategory && (
          <CategoryView 
            category={selectedCategory} 
            progress={progress} 
            quizProgress={quizProgress}
            onBack={handleBack} 
            onSelectModule={mod => { setSelectedModule(mod); setView('module'); }}
            onTakeQuiz={handleTakeQuiz}
          />
        )}
        {view === 'module' && selectedModule && selectedCategory && <ModuleView module={selectedModule} category={selectedCategory} progress={progress} notes={notes} onBack={handleBack} onComplete={handleComplete} onSaveNote={handleSaveNote} />}

        <div className="fixed bottom-6 right-6 flex flex-col gap-2">
          <button onClick={() => setShowHelp(true)} className="w-12 h-12 bg-pink-600 hover:bg-pink-500 rounded-full flex items-center justify-center shadow-lg" title="Help (H)">🤖</button>
          <button onClick={() => setShowQuickReview(true)} className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg" title="Quick Review (Q)">📋</button>
          <button onClick={() => setShowReference(true)} className="w-12 h-12 bg-amber-600 hover:bg-amber-500 rounded-full flex items-center justify-center shadow-lg" title="Reference (R)">📖</button>
          <button onClick={() => setShowSandbox(true)} className="w-12 h-12 bg-cyan-600 hover:bg-cyan-500 rounded-full flex items-center justify-center shadow-lg" title="Sandbox (S)">🧪</button>
          <button onClick={handleExport} className="w-12 h-12 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center shadow-lg" title="Export (Ctrl+E)">💾</button>
          <button onClick={() => setShowKeyboardHelp(true)} className="w-12 h-12 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center shadow-lg" title="Shortcuts (?)">⌨️</button>
        </div>

        {showHelp && (
          <ContextualHelpModal 
            context={{ view, category: selectedCategory, module: selectedModule, sandboxCode }}
            onClose={() => setShowHelp(false)} 
          />
        )}
        {showKeyboardHelp && <KeyboardHelpModal onClose={() => setShowKeyboardHelp(false)} />}
        {showQuickReview && <QuickReviewModal progress={progress} notes={notes} onClose={() => setShowQuickReview(false)} onNavigate={handleNavigateToModule} />}
        {showReference && <ReferenceModal onClose={() => setShowReference(false)} />}
        {showSandbox && <SandboxModal progress={progress} onClose={() => setShowSandbox(false)} onCodeChange={setSandboxCode} />}
        {showKnowledgeCheck && quizCategoryId && (
          <KnowledgeCheckModal 
            categoryId={quizCategoryId} 
            onClose={() => { setShowKnowledgeCheck(false); setQuizCategoryId(null); }}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </div>
  );
}
