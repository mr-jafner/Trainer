# Curriculum Authoring Guide

How to write effective learning content for the platform.

## Core Principle: Mental Models Over Memorization

The goal is to build **transferable mental models** — internal representations of how something works that let you reason about new situations.

**Good mental models:**
- Help predict what will happen ("if I do X, then Y")
- Help debug when things go wrong ("it failed, so the problem is probably at stage N")
- Transfer to related situations
- Are simpler than reality but capture essential dynamics

**Warning signs of a bad model:**
- Just restates facts in boxes and arrows
- Doesn't help answer "what if?" questions
- More complex than just remembering the thing directly

## Choosing Visualization Type

| If the content is about... | Use | Example |
|---------------------------|-----|---------|
| How something moves/transforms | **Data Flow** | API request lifecycle, build pipeline |
| How things relate/categorize | **Concept Map** | Types of joins, design patterns |
| What can go wrong and how to fix it | **Fault Tree** | Debugging connection errors |
| Simple facts or definitions | **Plain prose** | Don't force a diagram |

**Decision tree:**
1. Is there a sequence or flow? → Data Flow
2. Are there categories or relationships? → Concept Map
3. Are there failure modes to learn? → Fault Tree
4. None of the above? → Just write it, no diagram needed

## Writing "Why This Matters"

This is the hook. In 2-3 sentences, answer:

1. **What can they do** after understanding this?
2. **When will they encounter** this in practice?
3. **What mental model** does this build?

**Good example:**
> "Understanding this flow helps you predict where things can go wrong and debug issues faster. When a request fails, you'll know which stage to check first."

**Bad example:**
> "This is an important concept that you should understand."

## Writing Pitfalls

Pitfalls prevent common mistakes. They should be:

1. **Specific** — not generic warnings
2. **Include consequences** — what happens if you make this mistake
3. **Drawn from real mistakes** — things people actually do

**Good:**
> "UPDATE without WHERE affects ALL rows — you'll overwrite everyone's data"

**Bad:**
> "Be careful with UPDATE statements"

Aim for 3-5 pitfalls per module.

## Writing Reveals

Each reveal (the content shown when clicking a node/branch) should:

1. Be **self-contained** — makes sense on its own
2. Progress from **what → why → watch out**
3. Include **concrete examples** where possible
4. **Connect to analogies** — "Think of this like..."

**For Data Flow nodes:**
- Explain what happens at this stage
- What comes in, what goes out
- What can go wrong here

**For Concept Map branches:**
- What this category/type is
- When you'd use it vs alternatives
- Concrete syntax or example

**For Fault Tree causes:**
- Why/how this failure happens
- How to diagnose it
- Specific fix steps

## Using Analogies

Analogies are load-bearing — they anchor new concepts to existing mental models.

**Good analogies:**
> "This works like a postal system — your query is a letter, the parser is the sorting facility..."

> "Think of RLS like a bouncer checking IDs — the database enforces the rules, not your app..."

**When to use analogies:**
- Introducing a new concept
- Explaining something counterintuitive
- Connecting to something the learner already knows

**Avoid:**
- Forced analogies that don't really fit
- Analogies more complex than the thing being explained

## Data Flow Diagrams

**Structure:**
```javascript
{
  description: 'One sentence overview',
  nodes: [
    { id: 'unique-id', label: 'Short Label', type: 'boundary|process|flow', x: 100, y: 100 }
  ],
  edges: [
    { from: 'node1', to: 'node2' }
  ],
  reveals: {
    'node-id': 'Explanation text...'
  }
}
```

**Node types:**
- `boundary` (blue): External systems, start/end points
- `process` (orange): Transformations, operations, decisions
- `flow` (green): Data in transit, intermediate states

**Layout tips:**
- Left-to-right flow is easiest to read
- Keep labels short (2-3 words)
- 5-8 nodes is usually enough
- Position nodes at consistent Y for horizontal flow

## Concept Maps

**Structure:**
```javascript
{
  central: 'Main Concept',
  description: 'One sentence overview',
  branches: [
    {
      id: 'unique-id',
      label: 'Branch Name',
      color: '#hexcolor',
      details: 'Explanation paragraph',
      example: 'Code or concrete example (optional)',
      children: ['Sub-item 1', 'Sub-item 2', 'Sub-item 3']
    }
  ]
}
```

**Tips:**
- 4-6 branches is ideal
- 3-5 children per branch
- Use distinct colors for each branch
- Details should answer "what is this and when do I use it?"

## Fault Trees

**Structure:**
```javascript
{
  root: 'The Problem Statement',
  branches: [
    {
      fault: 'Category of Failure',
      icon: 'warning|error|info',
      causes: [
        {
          cause: 'Specific cause name',
          detail: 'Why/how this happens',
          fix: 'Concrete remediation steps'
        }
      ]
    }
  ]
}
```

**Tips:**
- Root should be the symptom users see ("Connection Failed", "Query Returns Empty")
- Group causes into 3-5 categories
- Each cause needs a specific, actionable fix
- Order from most common to least common

## Quality Checklist

Before finalizing a module:

- [ ] **Prediction test:** Can someone use this to predict what happens in a new scenario?
- [ ] **Debugging test:** Does this help narrow down where/why something went wrong?
- [ ] **Teaching test:** Could you use this to explain the concept to someone else?
- [ ] **Transfer test:** Does this connect to mental models the learner already has?

If a diagram fails these tests, either redesign it or question whether visualization is the right approach.

## Category Structure

Aim for 3-5 categories with 3-6 modules each (15-25 total modules).

**Common patterns:**

For technical tools:
1. Foundations — core concepts
2. Tool-specific features — what makes this unique
3. Integration — how it connects to larger ecosystem
4. Troubleshooting — what goes wrong

For conceptual subjects:
1. Core principles — fundamental ideas
2. Pattern categories — groups of related patterns
3. Application — when and how to apply
4. Anti-patterns — what to avoid

For process-based subjects:
1. Workflow overview — the big picture
2. Stage deep-dives — each major stage
3. Tools & automation — specific implementations
4. Failure modes — what breaks and recovery

## Content Scope

**Include:**
- Concepts that benefit from visual representation
- Things that have sequence, hierarchy, or cause-effect
- Common mistakes and how to avoid them
- Practical application guidance

**Skip:**
- Simple facts that don't need visualization
- Rarely-used edge cases
- Content that requires hands-on practice to learn (put that in exercises instead)
- Reference material (put in the Reference panel instead)
