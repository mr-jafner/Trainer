# Learning Platform Project Ideas

Prompts ready to use with the visual-learning-platform-template.

---

## High-Value Projects

### 1. OpenBSD System Administration

```
I want to build a learning platform following the attached template.

Subject: OpenBSD system administration
Current level: Daily user, comfortable with basic tasks but often looking things up
Focus areas:
- httpd configuration (virtual hosts, locations, rewrites)
- Service management (rcctl patterns, daemon lifecycle)
- User/permission model (doas, file permissions, www user)
- pf firewall basics
- Package management and ports
- Common maintenance tasks (updates, logs, backups)

Include: Fault trees for common issues (403s, service won't start, can't connect), 
reference panel with config file syntax
Skip: Advanced networking, building from source
```

---

### 2. Git Workflows

```
I want to build a learning platform following the attached template.

Subject: Git version control
Current level: Use it daily but mental model is shaky — often Google when things go wrong
Focus areas:
- The DAG mental model (commits, branches, HEAD)
- Working directory → staging → local → remote flow
- Branching strategies (when to branch, naming)
- Merge vs rebase (when to use each, consequences)
- Undoing things (reset, revert, reflog rescue)
- Collaboration patterns (PRs, code review workflow)

Include: Fault trees for "I made a mess" scenarios (committed to wrong branch, 
need to undo a push, merge conflict resolution), command reference panel
Skip: Git internals, server-side hooks, submodules
```

---

### 3. Engine Fundamentals for Turbo Engineers

```
I want to build a learning platform following the attached template.

Subject: Internal combustion engine fundamentals for turbocharger application engineers
Current level: Mechanical engineering background, need practical engine context
Focus areas:
- Four-stroke cycle and where turbo fits in
- Air path: intake → compressor → intercooler → engine → turbine → exhaust
- Key parameters: boost pressure, A/F ratio, volumetric efficiency
- Engine operating map and how it relates to compressor map
- Efficiency and emissions trade-offs
- Transient vs steady-state behavior

Include: Data flows showing air/exhaust path, concept maps for parameter relationships
Skip: Detailed combustion chemistry, emissions aftertreatment details
Note: Use industry-standard terminology (VNT not VGT)
```

---

### 4. Music Theory for Guitar Players

```
I want to build a learning platform following the attached template.

Subject: Music theory fundamentals for acoustic guitar
Current level: Can play chords and songs, limited theory knowledge
Focus areas:
- Notes, intervals, and the fretboard
- Major and minor scales (patterns, relationships)
- Chord construction (triads, why chords are named what they are)
- The Nashville number system
- Circle of fifths (key relationships, chord families)
- Common progressions and why they work (I-IV-V, ii-V-I)

Include: Concept maps for scale/chord relationships, 
reference panel with fretboard diagrams and chord formulas
Skip: Modes beyond major/minor, jazz theory, reading standard notation
```

---

## Medium-Value Projects

### 5. Docker & Containers

```
I want to build a learning platform following the attached template.

Subject: Docker and container fundamentals
Current level: Have used containers but mental model is incomplete
Focus areas:
- What containers actually are (namespaces, cgroups — conceptually)
- Image vs container distinction
- Dockerfile patterns and layer caching
- Volumes and persistence
- Networking basics (bridge, host, port mapping)
- Docker Compose for multi-container apps

Include: Data flows for build and run processes, 
fault trees for common issues (container won't start, can't connect, out of space)
Skip: Kubernetes, swarm, advanced orchestration
```

---

### 6. Networking Fundamentals

```
I want to build a learning platform following the attached template.

Subject: Networking fundamentals for self-hosters
Current level: Can configure basic setups but gaps in understanding why
Focus areas:
- TCP/IP model (practical, not academic)
- DNS resolution flow
- NAT, port forwarding, and why they exist
- HTTPS/TLS handshake (conceptual)
- Firewall concepts (stateful, rules, zones)
- Common home/small server topologies

Include: Data flows for DNS resolution and HTTPS connection,
fault trees for "can't connect" scenarios
Skip: Subnetting math, routing protocols, enterprise networking
```

---

### 7. Technical Writing for Engineers

```
I want to build a learning platform following the attached template.

Subject: Technical writing and documentation
Current level: Write docs regularly, want to be more systematic
Focus areas:
- Document types and when to use each (tutorial, how-to, reference, explanation)
- Audience analysis (what do they know, what do they need)
- Structure patterns (progressive disclosure, inverted pyramid)
- Writing mechanics (active voice, concrete examples, scannability)
- Diagram and visual guidelines
- Review and maintenance processes

Include: Concept maps for document types and structure patterns,
fault trees for "doc isn't working" (users confused, outdated, can't find)
Skip: Tools and formatting specifics, API documentation automation
```

---

### 8. Self-Hosting & Home Lab

```
I want to build a learning platform following the attached template.

Subject: Self-hosting services and home lab fundamentals
Current level: Running some services, want better architecture understanding
Focus areas:
- Service architecture patterns (reverse proxy, containers, VMs)
- Security layers (firewall, isolation, updates, backups)
- DNS and domain management for self-hosted services
- SSL/TLS certificate management (Let's Encrypt flow)
- Monitoring and knowing when things break
- Backup strategies (3-2-1 rule, testing restores)

Include: Data flows for request routing through reverse proxy,
concept maps for security layers, fault trees for "service unreachable"
Skip: Specific software comparisons, hardware recommendations
```

---

### 9. Electronics & Microcontrollers

```
I want to build a learning platform following the attached template.

Subject: Electronics fundamentals and microcontroller basics
Current level: Software background, minimal electronics experience
Focus areas:
- Basic circuit concepts (voltage, current, resistance, Ohm's law)
- Reading schematics (common symbols, following signal flow)
- Common components (resistors, capacitors, transistors, ICs — what they do)
- Digital vs analog signals
- Microcontroller basics (GPIO, PWM, ADC, serial communication)
- Arduino/ESP32 practical patterns (sensors, actuators, basic projects)
- Power considerations (voltage regulation, battery basics)

Include: Data flows for signal paths, concept maps for component selection,
fault trees for "circuit doesn't work" debugging, reference panel with pinouts and formulas
Skip: Complex analog design, RF, PCB fabrication
```

---

### 10. Home Repair Fundamentals

```
I want to build a learning platform following the attached template.

Subject: Home repair and maintenance fundamentals
Current level: Can handle basic tasks, uncertain about when to DIY vs call a pro
Focus areas:
- Plumbing basics (supply vs drain, shutoffs, common fixes)
- Electrical basics (circuits, breakers, safe DIY scope)
- Wall repair and painting
- Appliance troubleshooting patterns
- Seasonal maintenance checklist
- Tool essentials and when to use what
- The "call a pro" decision framework

Include: Fault trees for common problems (leak under sink, outlet not working, 
door won't close), data flows for plumbing/electrical systems,
concept maps for tool selection
Skip: Major renovations, HVAC internals, structural work
```

---

## Creative Projects

### 11. Voice & Storytelling Performance

```
I want to build a learning platform following the attached template.

Subject: Voice performance and storytelling for reading to kids
Current level: Read to kids regularly, want to be more engaging and dynamic
Focus areas:
- Voice mechanics (breath support, projection, pacing)
- Character voices (pitch, rhythm, accent patterns — not impressions, just differentiation)
- Emotional dynamics (building tension, release, matching tone to content)
- Pacing and pauses (dramatic timing, letting moments land)
- Physical storytelling (even when seated — gesture, eye contact, presence)
- Audience awareness (reading the room, adjusting on the fly)
- Stamina (not losing voice during long sessions)

Include: Data flows for story arc energy, concept maps for voice techniques,
reference panel with warm-up exercises and character voice "recipes"
Skip: Professional VO career advice, recording/audio engineering, accents/dialects deep dive
```

---

### 12. Inkscape & Vector Design

```
I want to build a learning platform following the attached template.

Subject: Inkscape and vector graphics for laser cutting/engraving
Current level: Using it for projects, learning as I go, gaps in fundamentals
Focus areas:
- Vector vs raster mental model (paths, nodes, strokes, fills)
- Path operations (union, difference, intersection, divide — when to use each)
- Node editing (smoothing, breaking, joining, bezier handles)
- Layers and organization (workflow for complex designs)
- Text handling (fonts, converting to paths, spacing)
- Laser-ready export (stroke colors for cut/engrave, DXF/SVG settings)
- Trace bitmap (when it works, when it doesn't, cleanup workflow)
- Alignment and distribution (precision positioning)

Include: Data flows for design-to-laser workflow, concept maps for path operations,
fault trees for common issues (path not closing, engrave not showing, wrong scale),
reference panel with keyboard shortcuts and export settings
Skip: Artistic illustration techniques, print design, web graphics
```

---

### 13. Photography Beyond Exposure

```
I want to build a learning platform following the attached template.

Subject: Photography fundamentals beyond the exposure triangle
Current level: Solid grasp of exposure (aperture, shutter, ISO) from Understanding Exposure, 
want to develop eye and share knowledge with others
Focus areas:
- Composition frameworks (rule of thirds, leading lines, framing, negative space — 
  and when to break them)
- Light quality and direction (hard/soft, golden hour, window light, reading natural light)
- Color theory for photography (complementary, mood, white balance intent)
- Moment and timing (anticipation, peak action, decisive moment)
- Storytelling in single frames (context, subject relationship, environmental portraits)
- Simple editing workflow (exposure correction, crop, color — not heavy retouching)
- Teaching photography to others (how to explain concepts simply)

Include: Concept maps for composition and light types, data flows for 
"see scene → analyze → decide → shoot" process, reference panel with 
composition patterns and light diagrams
Skip: Gear recommendations, studio lighting setups, advanced post-processing, 
business/portfolio
```

---

## Specialized / Advanced Projects

### 14. MBSE & SysML v2

**Deployment: Claude.ai artifact** (not self-hosted) — keeps API integration simple and free.
Future option: hybrid approach with core content on jafner.com, sandbox as linked artifact.

```
I want to build a learning platform following the attached template.

Subject: Model-Based Systems Engineering with SysML v2
Current level: Engineering background, familiar with systems thinking, new to formal MBSE
Target audience: Initially self-learning, eventually sharing with engineering team

Focus areas:

CATEGORY 1 — MBSE Mindset
- Why model-based vs document-based (benefits, trade-offs, when it's overkill)
- The mental shift: models as executable specifications
- Model quality: what makes a model useful vs just existing
- Where MBSE fits in product development lifecycle
- Principles over process (note: deeper methodologies like OOSEM, MagicGrid exist for further study)

CATEGORY 2 — SysML v2 Core Language
- Textual vs graphical notation (v2's big shift)
- Parts and items (the building blocks)
- Ports and interfaces (connection points)
- Connections and flows (how things link)
- Attributes and value types (properties)
- Packages and namespaces (organization)

CATEGORY 3 — Requirements & Behavior
- Requirements modeling (text requirements → formal requirements)
- Use cases and scenarios
- State machines (lifecycle, modes)
- Activities and actions (behavior flow)
- Linking requirements to design (satisfaction, verification)

CATEGORY 4 — Analysis & Constraints
- Constraint blocks and parametrics
- Analysis integration patterns
- Trade studies in models
- Viewpoints and views (stakeholder perspectives)

CATEGORY 5 — Methodology Essentials
- What to model first (and what to skip)
- Abstraction levels (system → subsystem → component)
- Iteration patterns (when to go deep vs broad)
- Model governance (who owns what, versioning concepts)
- Integration with existing processes (fit into current workflow)

CATEGORY 6 — Domain Application: Turbocharger System
Progressive worked example building a complete turbocharger model:
- Module 1: Stakeholder needs and high-level requirements
- Module 2: System context and external interfaces
- Module 3: Functional decomposition (what the turbo does)
- Module 4: Physical architecture (compressor, turbine, bearing, actuator)
- Module 5: Interface definitions (air, oil, exhaust, control signals)
- Module 6: Behavioral models (surge, speed control, thermal states)
- Module 7: Requirements satisfaction and verification linkage
- Module 8: Analysis integration (performance maps, thermal limits)

CATEGORY 7 — Troubleshooting
Fault trees for common MBSE problems:
- "My model exists but nobody uses it"
- "Model and reality have diverged"
- "Stakeholders don't understand the model"
- "Model is too detailed / not detailed enough"

INTERACTIVE SANDBOX:
Include a sandbox where users can write SysML v2 textual notation and receive 
feedback. Use Claude API within the artifact for validation/feedback.

Exercise types:
- Write from scratch: "Model a pump with inlet/outlet ports"
- Complete partial: "This model is missing X, add it"
- Fix broken: "Find and fix the issues in this model"
- Translate: "Here's a diagram description, write the textual SysML v2"
- Review: "Critique this modeling approach"

Sandbox should provide:
- Syntax feedback (is this valid SysML v2?)
- Semantic feedback (does this make sense?)
- Methodology suggestions (this works, but consider...)
- Concrete examples when correcting errors

TOOL GROUNDING:
- Tool-agnostic principles, but ground examples in free/open source tooling
- Primary: Jupyter SysML v2 kernel (official OMG implementation)
- Reference: SysML v2 Pilot Implementation (Eclipse-based)
- Show how to set up a free environment for practice
- Note Python integration possibilities for team interested in automation

Include: Reference panel with SysML v2 syntax cheat sheet, element type quick 
reference, common patterns library
Skip: SysML v1 (fresh start), specific commercial tool workflows, deep methodology 
frameworks (mention they exist for further study), formal specification/proofs

Note on scope: This is "SysML v2 for practitioners" not "complete MBSE methodology 
certification". Explicitly call out what's NOT covered and where to go deeper 
(INCOSE resources, specific methodology training, etc.)
```

---

## Quick Reference: Choosing Your Next Project

### Full Learning Platforms — Technical (Self-hosted: jafner.com)

| Project | Immediate Use | Learning Gap | Build Time |
|---------|--------------|--------------|------------|
| OpenBSD Sysadmin | High — daily reference | Medium | Medium |
| Git Workflows | High — constant use | High | Medium |
| Engine Fundamentals | High — team training | Low (you know it) | Medium |
| Electronics | Medium — work + hobby | High | Medium |
| Home Repair | Medium — homeowner life | Medium | Medium |
| Music Theory | Medium — supports guitar | High | Medium |
| Docker | Medium | Medium | Small |
| Networking | Medium | Medium | Medium |
| Technical Writing | Medium | Low | Small |
| Self-Hosting | Low — already doing it | Low | Medium |

### Full Learning Platforms — Creative (Self-hosted: jafner.com)

| Project | Immediate Use | Learning Gap | Build Time |
|---------|--------------|--------------|------------|
| Voice & Storytelling | High — nightly with kids | Medium | Medium |
| Inkscape & Vector | High — active projects | Medium | Medium |
| Photography | Medium — shareable skill | Low | Medium |

### Full Learning Platforms — Specialized (Artifact-only)

| Project | Immediate Use | Learning Gap | Build Time | Deployment |
|---------|--------------|--------------|------------|------------|
| MBSE & SysML v2 | High — team capability building | High | Large | claude.ai artifact |

**Recommended order:** 
- Technical: OpenBSD → Git → Electronics → Engine Fundamentals → Home Repair
- Creative: Voice & Storytelling → Inkscape → Photography
- Specialized: SysML v2 (when ready for larger project)

### Infographics (see infographic-template.md)

| Topic | Format | Time to Build |
|-------|--------|---------------|
| Espresso & Coffee | Concept map + data flow + reference | 1 hour |
| Whiskey Appreciation | Concept map + comparison table | 1 hour |
| Personal Finance | Decision tree + data flow + reference | 1 hour |
| Fermentation | Concept map + comparison table | 1 hour |
| Strength Training | Concept map + decision tree | 1 hour |
