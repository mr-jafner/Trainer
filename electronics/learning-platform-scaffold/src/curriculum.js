// ============================================================
// CURRICULUM DATA
// Electronics fundamentals + microcontroller basics
//
// Design goals for Jeff:
// - Visual mental models (dataflows, concept maps, fault trees)
// - Boundary + flow thinking: ports, signals, power, return paths
// - Practical: schematics, common parts, microcontroller patterns
// - Skip: complex analog design, RF, PCB fabrication
// ============================================================

export const curriculum = {
  // ------------------------------------------------------------
  // CATEGORY 1: Foundations
  // ------------------------------------------------------------
  foundations: {
    id: 'foundations',
    title: 'Foundations',
    description: 'Voltage, current, resistance — and how schematics “speak”',
    color: '#3b82f6', // blue
    icon: '📚',
    modules: [
      {
        id: 'foundations-v-i-r',
        title: 'Voltage / Current / Resistance (the mental model, not the math)',
        type: 'conceptmap',
        why: 'When circuits feel confusing, it is usually because V, I, and R got mentally swapped. This map gives you a stable “cause/effect” model you can reuse in any schematic.',
        pitfalls: [
          'Treating voltage like “stuff that flows” — current is the flow; voltage is the push (potential difference).',
          'Forgetting the return path — current needs a loop; “ground” is just the chosen 0V reference.',
          'Assuming current is “forced” by the source — the load + wiring sets current (through resistance/impedance).',
        ],
        content: {
          central: 'V, I, R (Ohm’s law lives here, but the model comes first)',
          description: 'A compact relationship map for what each quantity *means* and how to reason about it.',
          branches: [
            {
              id: 'v',
              label: 'Voltage (V) = push / potential difference',
              color: '#22c55e',
              details: 'Voltage is a difference between two nodes. It does not “travel”; it is measured *across* something. In schematics, labels like 5V/3V3 tell you which nodes are “higher potential” than GND.',
              example: 'Measure 5V between 5V and GND; you cannot measure “voltage at a point” without a reference.',
              children: [
                'Think: height difference (gravity analogy), not water volume',
                'Node-to-node quantity (across two points)',
                'Sources set voltage (ideally), loads draw current',
              ],
            },
            {
              id: 'i',
              label: 'Current (I) = flow (amps)',
              color: '#f59e0b',
              details: 'Current is charge flow through a component. It is the thing that actually “goes around the loop”. If a circuit is open, current is ~0 even if voltage exists.',
              example: 'LED off? Often the loop is broken: no current path from VCC → LED → resistor → GND.',
              children: [
                'Needs a closed loop',
                'Conventional current: + → − (electron flow is opposite)',
                'Current is the same everywhere in a series chain',
              ],
            },
            {
              id: 'r',
              label: 'Resistance (R) = opposition / control knob',
              color: '#8b5cf6',
              details: 'Resistance (and impedance for capacitors/inductors) sets how much current flows for a given voltage. Resistors are used to limit current, set bias points, and create dividers.',
              example: 'LED resistor sizing starts with desired current: R ≈ (Vsup − Vled) / I.',
              children: [
                'Series adds (R_total = R1 + R2 …)',
                'Parallel shares current (1/R_total = 1/R1 + 1/R2 …)',
                'Real wires have resistance too (especially breadboards, long leads)',
              ],
            },
            {
              id: 'power',
              label: 'Power (P) = heat / work budget',
              color: '#ef4444',
              details: 'Power tells you what gets hot and what drains batteries. It is the “cost” of current flowing through a voltage drop.',
              example: 'Regulator overheating is a power problem: P_loss ≈ (Vin − Vout) · Iload.',
              children: [
                'P = V·I (most common)',
                'P = I²·R (resistor heating)',
                'P = V²/R (useful for fixed resistors)',
              ],
            },
          ],
        },
      },

      {
        id: 'foundations-series-parallel',
        title: 'Series vs Parallel (what stays the same, what changes)',
        type: 'dataflow',
        why: 'Most schematic reading is “path tracing”. Series/parallel reasoning lets you predict voltages and currents without getting lost in algebra.',
        pitfalls: [
          'Calling things “parallel” just because they are drawn next to each other — parallel means they share the same two nodes.',
          'Forgetting that series elements share current — so one open in the chain kills the loop.',
          'Measuring voltage on the wrong reference node — you can be “right” and still read nonsense.',
        ],
        content: {
          description: 'A simple reasoning flow you can run in your head when you see a circuit chunk.',
          nodes: [
            { id: 'identify-nodes', label: 'Identify nodes', type: 'process', x: 80, y: 90 },
            { id: 'loop', label: 'Find loop(s)', type: 'process', x: 250, y: 90 },
            { id: 'series', label: 'Series chain?', type: 'process', x: 420, y: 50 },
            { id: 'parallel', label: 'Parallel branch?', type: 'process', x: 420, y: 130 },
            { id: 'predict', label: 'Predict V & I', type: 'process', x: 610, y: 90 },
            { id: 'measure', label: 'Measure / verify', type: 'boundary', x: 780, y: 90 },
          ],
          edges: [
            { from: 'identify-nodes', to: 'loop' },
            { from: 'loop', to: 'series' },
            { from: 'loop', to: 'parallel' },
            { from: 'series', to: 'predict' },
            { from: 'parallel', to: 'predict' },
            { from: 'predict', to: 'measure' },
          ],
          reveals: {
            'identify-nodes': 'Circle the “electrically common” points. Net labels are teleporters: same label = same node. Ground symbols are all the same reference node unless noted otherwise.',
            loop: 'Ask: where could current flow from a power rail, through components, back to ground/return? No loop → no current → nothing happens.',
            series: 'Series rule-of-thumb: **same current** through each element; voltage drops add up. One open element breaks the whole chain.',
            parallel: 'Parallel rule-of-thumb: **same voltage** across each branch; currents add. One open branch can fail “silently” while others still work.',
            predict: 'Do the quick mental math: dividers split voltage, series shares voltage proportional to R, parallel shares current proportional to conductance (1/R).',
            measure: 'Sanity checks: measure V at rails first, then measure across suspected components. Measure continuity for opens. Measure voltage drop across resistors to infer current (I = V/R).',
          },
        },
      },

      {
        id: 'foundations-schematics',
        title: 'Reading schematics like a software engineer (signals, rails, and “namespaces”)',
        type: 'conceptmap',
        why: 'Schematics are closer to code than they look: nets are variables, IC pins are function signatures, and power/ground are “global services”. This map makes schematics legible fast.',
        pitfalls: [
          'Following lines visually instead of following net labels — you’ll miss connections that are “not drawn”.',
          'Assuming symbols imply direction — many components are bidirectional; direction comes from context.',
          'Ignoring power pins and decoupling — digital chips fail in weird ways when power is noisy.',
        ],
        content: {
          central: 'Schematic reading mindset',
          description: 'How to parse a schematic into power domains, signal paths, and reusable chunks.',
          branches: [
            {
              id: 'rails',
              label: 'Power rails & domains',
              color: '#22c55e',
              details: 'First find rails: VIN, 5V, 3V3, GND. Many “mystery bugs” are power integrity issues, not logic issues.',
              example: 'ESP32 dev boards: VIN → regulator → 3V3 rail → ICs. Brownout resets happen when 3V3 sags under load.',
              children: ['VIN vs regulated rails', 'Ground is return path', 'Decoupling caps live *at* the IC pins'],
            },
            {
              id: 'nets',
              label: 'Net labels = connections',
              color: '#f59e0b',
              details: 'A net label is like a variable name: any wire with that name is the same node even if it never touches on the page.',
              example: 'SCL and SDA appear near MCU pins and again near a sensor — that is the same bus.',
              children: ['Buses: SDA/SCL, MOSI/MISO/SCK', 'Active-low naming: /RESET, ~CS', 'Test points are “debug ports”'],
            },
            {
              id: 'signal-flow',
              label: 'Signal paths (data flows)',
              color: '#8b5cf6',
              details: 'Trace signals the way you trace a packet: source → conditioning → destination. Every hop is a failure opportunity.',
              example: 'Sensor output → ADC pin → firmware scaling → control output → transistor/MOSFET → actuator.',
              children: ['Analog vs digital paths', 'Where thresholds happen', 'Where energy is delivered (drivers, loads)'],
            },
            {
              id: 'grounds',
              label: 'Grounding & references',
              color: '#ef4444',
              details: '“Ground” is a chosen reference. In mixed-signal systems you may see AGND/DGND; in power systems you may see “power ground” vs “signal ground”.',
              example: 'Measuring a sensor output against the wrong ground makes it look broken.',
              children: ['Single-point reference matters', 'Return currents choose paths', 'Shared grounds can inject noise'],
            },
          ],
        },
      },
    ],
  },

  // ------------------------------------------------------------
  // CATEGORY 2: Signals & Components (early practical chunk)
  // ------------------------------------------------------------
  signals_components: {
    id: 'signals-components',
    title: 'Signals & Components',
    description: 'What common parts do, and how analog and digital “behave”',
    color: '#22c55e', // green
    icon: '🧩',
    modules: [
      {
        id: 'signals-digital-analog',
        title: 'Digital vs Analog (thresholds, noise margins, and why breadboards lie)',
        type: 'dataflow',
        why: 'Microcontrollers live at the border between the analog world and digital decisions. Understanding where the “threshold” is prevents magical thinking when GPIO behaves weirdly.',
        pitfalls: [
          'Assuming a digital input reads “0” or “1” without a pull-up/pull-down — floating inputs are chaos generators.',
          'Expecting PWM to be a true analog voltage without filtering or inertia (motor, LED brightness, etc.).',
          'Forgetting that ADC inputs are analog and sensitive to source impedance, noise, and reference voltage.',
        ],
        content: {
          description: 'A “signal path” model: real-world voltage → threshold/measurement → code → output that becomes real-world energy again.',
          nodes: [
            { id: 'real-world', label: 'Real-world signal', type: 'boundary', x: 70, y: 150 },
            { id: 'conditioning', label: 'Conditioning', type: 'process', x: 230, y: 150 },
            { id: 'decision', label: 'Threshold / ADC', type: 'process', x: 390, y: 150 },
            { id: 'firmware', label: 'Firmware logic', type: 'process', x: 560, y: 150 },
            { id: 'output', label: 'GPIO / PWM', type: 'process', x: 730, y: 150 },
            { id: 'load', label: 'Driver + load', type: 'boundary', x: 900, y: 150 },
          ],
          edges: [
            { from: 'real-world', to: 'conditioning' },
            { from: 'conditioning', to: 'decision' },
            { from: 'decision', to: 'firmware' },
            { from: 'firmware', to: 'output' },
            { from: 'output', to: 'load' },
          ],
          reveals: {
            'real-world': 'Sensors produce voltages/currents that are not “clean”. Expect noise, drift, and impedance effects. The world is analog by default.',
            conditioning: 'Resistors, caps, dividers, and protection parts shape the signal: pull-ups set defaults; RC filters smooth; series resistors limit input current; diodes clamp.',
            'decision': 'Digital inputs compare to thresholds (HIGH/LOW). ADC converts a voltage into a number based on a reference (Vref). Both are vulnerable to noise near the boundary.',
            firmware: 'Firmware turns measurements into decisions. Your code is only as good as the assumptions you made about ranges, timing, and filtering.',
            output: 'GPIO outputs logic levels. PWM is *time slicing* a digital output; average behavior only appears after filtering or via physical inertia.',
            load: 'Loads need energy. LEDs need current limiting. Motors/solenoids need drivers (transistor/MOSFET) + flyback diodes. Many “GPIO failures” are really “asking a pin to do power work”.',
          },
        },
      },

      {
        id: 'components-selection-map',
        title: 'Component selection map (choose the boring part that prevents pain)',
        type: 'conceptmap',
        why: 'When you know what job a part is doing (limit current, switch power, measure voltage, protect a pin), selection becomes a small set of patterns instead of a giant parts catalog.',
        pitfalls: [
          'Picking a part by “looks right” without checking ratings (voltage, current, power, logic-level compatibility).',
          'Using a BJT or MOSFET without a base/gate resistor or pull-down — hello oscillation / stuck-on.',
          'Skipping protection (diodes, resistors) when connecting “unknown” things to MCU pins.',
        ],
        content: {
          central: 'What job does the part do?',
          description: 'A decision map from intent → common component choice → the gotcha to check.',
          branches: [
            {
              id: 'limit',
              label: 'Limit / set current',
              color: '#22c55e',
              details: 'If a thing needs controlled current (LEDs, pull-ups, bias networks), start with a resistor and sanity-check power dissipation.',
              example: 'LED: R ≈ (Vrail − Vled)/Iled. Start with 330Ω–1kΩ for 5V/3.3V indicator LEDs.',
              children: ['Series resistor (LED, input protection)', 'Pull-up / pull-down (10kΩ typical)', 'Sense resistor (measure current via ADC)'],
            },
            {
              id: 'store',
              label: 'Store / smooth energy',
              color: '#f59e0b',
              details: 'Capacitors handle fast current changes and create time constants. They are the “shock absorbers” of electronics.',
              example: 'Decoupling: 0.1µF ceramic at each IC VCC pin + a bulk cap (10–100µF) per rail.',
              children: ['Decoupling (0.1µF near pins)', 'Bulk reservoir (10–100µF)', 'RC filter / debounce'],
            },
            {
              id: 'switch',
              label: 'Switch / drive power',
              color: '#8b5cf6',
              details: 'MCU pins are signal outputs, not power drivers. Use a transistor or MOSFET to switch loads; add a diode for inductive loads.',
              example: 'Low-side N-MOSFET switching a motor: gate resistor + pull-down + flyback diode across motor.',
              children: ['BJT (small currents, simple)', 'Logic-level MOSFET (efficient)', 'Flyback diode (inductive loads)'],
            },
            {
              id: 'protect',
              label: 'Protect pins / rails',
              color: '#ef4444',
              details: 'Protection is cheap insurance. It keeps “oops” from turning into smoke.',
              example: 'Series resistor into a GPIO + clamp diode/TVS if coming from a long cable or unknown source.',
              children: ['Series resistor (limits fault current)', 'Diode clamp / TVS', 'Reverse-polarity protection'],
            },
          ],
        },
      },
    ],
  },

  // ------------------------------------------------------------
  // CATEGORY 3: Troubleshooting
  // ------------------------------------------------------------
  troubleshooting: {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Fault trees for systematic debugging (no ritual sacrifices required)',
    color: '#f59e0b', // amber
    icon: '🔧',
    modules: [
      {
        id: 'debug-nothing-works',
        title: 'Fault tree: “The circuit doesn’t work (nothing happens)”',
        type: 'faulttree',
        why: 'Most electronics failures are boring: power, wiring, orientation, or “wrong assumptions”. This tree keeps you from skipping the boring checks that solve 80% of issues.',
        pitfalls: [
          'Starting with code when the power rail is dead.',
          'Changing multiple things at once — you lose the experiment.',
          'Trusting breadboard wiring without continuity checks.',
        ],
        content: {
          root: 'Nothing happens / circuit doesn’t work',
          branches: [
            {
              fault: 'Power & ground problems',
              icon: 'error',
              causes: [
                {
                  cause: 'No supply voltage at the rails',
                  detail: 'VIN/5V/3V3 not present where you think it is (dead supply, wrong rail, bad cable).',
                  fix: 'Measure rail-to-GND with a multimeter at the load point (near the MCU or IC), not just at the supply output.',
                },
                {
                  cause: 'No return path / ground not common',
                  detail: 'Two subsystems are not sharing a reference, so signals have no meaning and currents can’t return.',
                  fix: 'Ensure common ground between MCU and peripherals/driver. Verify continuity from each GND point to the same node.',
                },
                {
                  cause: 'Brownout / sag under load',
                  detail: 'Voltage looks fine unloaded, then drops when something turns on (motor, Wi‑Fi burst, servo).',
                  fix: 'Measure rail while the load is active. Add bulk capacitance, use a better supply/regulator, or separate the power domains.',
                },
              ],
            },
            {
              fault: 'Wiring & orientation errors',
              icon: 'warning',
              causes: [
                {
                  cause: 'Breadboard row/rail misunderstanding',
                  detail: 'Common gotcha: thinking two holes are connected when they are not (or vice versa).',
                  fix: 'Use continuity mode to verify the exact connections. Draw your breadboard layout as a “netlist” (which holes are the same node).',
                },
                {
                  cause: 'Component reversed (diode/LED/electrolytic)',
                  detail: 'Polarized parts only work one way. Reverse polarity can mean “nothing happens” or “magic smoke”.',
                  fix: 'Check markings: LED flat side/short leg = cathode; diode stripe = cathode; electrolytic has marked negative stripe.',
                },
                {
                  cause: 'Wrong pinout for transistor/regulator/module',
                  detail: 'Pin orders vary a lot (especially BJTs and cheap modules). “Looks right” is not a datasheet.',
                  fix: 'Pull the datasheet or a trusted pinout. Confirm pin order and orientation physically before rewiring.',
                },
              ],
            },
            {
              fault: 'MCU & code assumptions',
              icon: 'info',
              causes: [
                {
                  cause: 'Wrong GPIO / wrong mode',
                  detail: 'Pin is not the one you think, or it is configured as input when you expect output (or vice versa).',
                  fix: 'Blink the onboard LED first (known-good test). Then print pin states over serial. Confirm pin numbers match the board variant.',
                },
                {
                  cause: 'Floating inputs / missing pull-up',
                  detail: 'Digital inputs without pull resistors can read random values (noise + leakage).',
                  fix: 'Add a pull-up/pull-down (10kΩ typical) or enable the MCU’s internal pull-ups if appropriate.',
                },
                {
                  cause: 'Trying to drive a load directly from a pin',
                  detail: 'MCU pins have limited current; motors/solenoids/relays need drivers.',
                  fix: 'Use a transistor/MOSFET driver stage and size the base/gate resistor. Add flyback diode for inductive loads.',
                },
              ],
            },
          ],
        },
      },
    ],
  },

  // ------------------------------------------------------------
  // CATEGORY 4: Microcontrollers (stub for next increment)
  // ------------------------------------------------------------
  microcontrollers: {
    id: 'microcontrollers',
    title: 'Microcontroller Basics',
    description: 'GPIO, PWM, ADC, and serial comms (coming next)',
    color: '#8b5cf6',
    icon: '🧠',
    modules: [
      // Next increment will add: GPIO modes, PWM mental model, ADC scaling, UART/I2C/SPI “bus as a protocol boundary”.
    ],
  },

  // ------------------------------------------------------------
  // CATEGORY 5: Power (stub for next increment)
  // ------------------------------------------------------------
  power: {
    id: 'power',
    title: 'Power Considerations',
    description: 'Regulators, batteries, and not letting the smoke out (coming next)',
    color: '#ef4444',
    icon: '🔋',
    modules: [
      // Next increment will add: linear vs buck, battery basics, grounding/noise, common ESP32 brownout scenarios.
    ],
  },
};


// Increment 2: Microcontroller Basics Modules
export const microcontrollers = {
  gpio: {
    title: 'GPIO as Ports and States',
    conceptMap: `GPIO pins as boundaries: firmware writes logical states => pin drivers assert voltages => external circuits interpret levels. Include internal pull-ups, pin modes, and current limits.`,
  },
  pwm: {
    title: 'PWM as Time-Slicing',
    dataFlow: `Timer -> duty cycle -> switching waveform -> load with inertia/capacitance -> average effect (brightness, motor speed).`,
  },
  adc: {
    title: 'ADC Scaling & References',
    conceptMap: `Analog input -> sampling switch -> RC hold cap -> comparator ladder -> digital code. Pitfalls: source impedance, reference stability, quantization.`,
  },
  serial: {
    title: 'UART/I2C/SPI Boundaries',
    dataFlow: `Firmware buffer -> protocol engine -> pins -> wire-level signaling -> peripheral. Focus on clock, framing, pull-ups, addressing.`,
  },
};


// Increment 3: Power & Survival Layer
export const power = {
  rails: {
    title: 'Voltage Rails & Brownout Behavior',
    conceptMap: `Supply -> regulator -> rail -> load. Key ideas: droop under load, brownout thresholds, decoupling caps as local reservoirs.`,
  },
  regulators: {
    title: 'Linear vs Buck Regulators',
    conceptMap: `LDO: simple, heat as (Vin-Vout)*I. Buck: switch -> inductor -> diode -> cap, high efficiency but noisy. Tradeoffs for sensors/MCUs.`,
  },
  batteries: {
    title: 'Battery Basics',
    dataFlow: `Cell chemistry -> nominal voltage -> internal resistance -> discharge curve -> load behavior. Pitfalls: sag, protection circuits, charging limits.`,
  },
  faults: {
    title: 'Fault Tree: Works on USB, Fails on Battery',
    faultTree: `Branch 1: battery sag -> brownout -> MCU resets. Branch 2: regulator dropout -> rails dip. Branch 3: insufficient decoupling -> transient glitches. Branch 4: wiring: polarity, switch, connector issues.`,
  },
};


// Increment 4: Arduino & ESP32 Practical Patterns
export const microProjects = {
  sensors: {
    title: 'Sensor Patterns',
    dataFlow: `Transducer -> conditioning (voltage divider, RC, amplifier) -> ADC/GPIO -> firmware -> interpretation. Emphasize pull-ups, debouncing, and analog scaling.`,
  },
  actuators: {
    title: 'Actuator Patterns',
    conceptMap: `MCU pin -> driver (BJT, MOSFET, ULN2003, H-bridge) -> load (motor, relay, LED strip). Highlight flyback diodes and current limits.`,
  },
  serialPatterns: {
    title: 'Serial Communication Patterns',
    dataFlow: `Sensor/Module -> protocol (UART/I2C/SPI) -> MCU driver -> firmware parsing. Show known-good topologies: shared pull-ups for I2C, chip-select discipline for SPI.`,
  },
  esp32Gotchas: {
    title: 'ESP32 Boot & Power Gotchas',
    faultTree: `Branch 1: Boot-mode pins pulled incorrectly. Branch 2: brownout detector due to weak supply. Branch 3: serial noise causing boot stalls. Branch 4: flash/PSRAM timing issues.`,
  },
};


// Increment 5: Reference Panel
export const referencePanel = {
  formulas: {
    title: 'Core Electronics Formulas',
    content: `Ohm's law: V=IR. Power: P=VI. ADC count: code = Vin/Vref * (2^N - 1). RC: tau = R*C.`,
  },
  pinouts: {
    title: 'Pinout Quick Reference',
    content: `Arduino Uno/Nano: GPIO, analog pins, 5V/3.3V rails. ESP32 DevKit: strapping pins, ADC limits, 3.3V only.`,
  },
  wiring: {
    title: 'Known-Good Wiring Patterns',
    content: `I2C with shared pull-ups, SPI with per-device CS, MOSFET low-side switching, flyback diode orientation.`,
  },
  debugging: {
    title: 'Debugging Quick Checks',
    content: `Continuity first, rails next, orientation third. Verify grounds shared. Measure loaded vs unloaded voltage.`,
  },
  symbols: {
    title: 'Schematic Symbol Mini-Atlas',
    content: `Resistor, capacitor (polarized & NP), inductor, diode, LED, BJT, MOSFET, op-amp, regulator blocks.`,
  },
};


// Increment 6: Time-Domain Intuition & Control Loops
export const timeDomain = {
  sampling: {
    title: 'Sampling & Aliasing',
    conceptMap: `Signal -> sampling clock -> discrete points -> reconstruction. Intuition: fast changes beyond sampling cause aliasing and lies in the data.`,
  },
  riseFall: {
    title: 'Rise & Fall Times',
    dataFlow: `Digital driver -> trace capacitance -> edge shape -> threshold crossing. Slow edges break assumptions on digital buses.`,
  },
  rcIntuition: {
    title: 'RC Time Constant Intuition',
    conceptMap: `Step input -> R throttles flow -> C charges -> exponential curve. Foundation for filtering, smoothing, and debouncing.`,
  },
  scopeThinking: {
    title: 'Oscilloscope Thinking',
    content: `Flat = DC, ripples = supply issues, sawtooth = PWM/load interaction, wiggly baseline = grounding or bandwidth limits.`,
  },
};

export const controlLoops = {
  loopBoundary: {
    title: 'Behavior Boundary Model',
    conceptMap: `Desired value -> measurement -> error -> controller -> actuator -> system. Disturbances and saturation shape stability.`,
  },
  pControl: {
    title: 'P-Controller Basics',
    content: `Low gain = sluggish, high gain = oscillation, tuned gain = stable tracking. Good for LEDs, motors, and servos.`,
  },
  pidIntuition: {
    title: 'Intuition for I & D',
    conceptMap: `Integral fixes drift and bias; derivative tempers overshoot. Think of them as memory and anticipation.`,
  },
  failureModes: {
    title: 'Control Loop Failure Modes',
    faultTree: `Wind-up -> slow recovery; Overgain -> oscillation; Noise -> jitter; Sampling latency -> unexpected wobble.`,
  },
};


// Increment 6: Time-Domain Intuition & Control Loops
export const dynamics = {
  timeDomain: {
    title: 'Time-Domain Intuition',
    conceptMap: `Sampling → aliasing → reconstruction intuition. Edges shaped by capacitance, wiring, drivers. RC as throttled charging curve.`,
    dataFlow: `Signal → sampler → discrete-time view → controller/firmware → actuator/load.`,
  },
  riseFall: {
    title: 'Rise & Fall Times',
    conceptMap: `Digital edges are ramps. Capacitance + driver strength = transition time. Slow edges break timing.`,
  },
  rcFilter: {
    title: 'RC Behavior',
    dataFlow: `Step input → resistor throttles current → capacitor accumulates → exponential curve.`,
  },
  controlLoops: {
    title: 'Control Loops (P/PI/PD Basics)',
    conceptMap: `Desired → measured → error → controller → system. Gains tune responsiveness vs oscillation.`,
    faultTree: `Overgain → oscillation; undergain → sluggish; sensor noise → jitter; latency → instability at specific frequencies.`,
  },
};


// Increment 7: Probe Mode (Interactive Mental Model)
export const probeMode = {
  overview: {
    title: 'Probe Mode Overview',
    conceptMap: `Simulated multimeter/oscilloscope: click node → show DC level, qualitative waveform, current direction, and signal role. No physics engine required.`,
  },
  nodeStates: {
    title: 'Curated Node States',
    content: `Power rail (steady DC), ground, floating node (unpredictable), PWM node (square wave), analog sensor (slow varying), motor driver (spiky switching).`,
  },
  faultHints: {
    title: 'Fault Clues When Probing',
    content: `If node reads 0V everywhere → ground trap. If rails droop → brownout risk. If noisy baseline → grounding/supply issue. If PWM edges mushy → capacitance or weak driver.`,
  },
  misProbing: {
    title: 'Guided Mis-Probing',
    content: `Floating nodes, probing outputs expecting inputs, reversed polarity points. Provide humorous but accurate guidance.`,
  },
  signalFlowHighlight: {
    title: 'Signal Flow Highlight Mode',
    content: `Click a node → highlight upstream source and downstream load. Teaches tracing without full simulation.`,
  },
};
