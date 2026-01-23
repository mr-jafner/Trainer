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
    
      ,
{
        id: 'foundations-ohms-law',
        title: 'Ohm’s law as a constraint (reasoning loop)',
        type: 'dataflow',
        why: 'Treat Ohm’s law like a constraint solver: define the boundary, pick two nodes, solve, then sanity-check power.',
        pitfalls: [
          'Plug-and-chug without defining the boundary',
          'Unit slips (kΩ vs Ω)',
          'Ignoring power/heat limits',
        ],
        content: {
          nodes: [
            { id: 'bnd', label: 'Choose boundary', type: 'boundary', x: 40, y: 80 },
            { id: 'nodes', label: 'Pick two nodes\n(+ reference)', type: 'process', x: 260, y: 80 },
            { id: 'known', label: 'Knowns\n(V, I, or R)', type: 'process', x: 520, y: 80 },
            { id: 'solve', label: 'Solve\nV=I·R', type: 'process', x: 780, y: 80 },
            { id: 'check', label: 'Sanity\nP=V·I', type: 'flow', x: 1040, y: 80 },
          ],
          flows: [
            { from: 'bnd', to: 'nodes', label: 'define' },
            { from: 'nodes', to: 'known', label: 'measure/assume' },
            { from: 'known', to: 'solve', label: 'constraint' },
            { from: 'solve', to: 'check', label: 'limits' },
          ]
        }
      }
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
        id: 'signals-digital-v-analog',
        title: 'Digital vs Analog (a measurement contract)',
        type: 'conceptmap',
        why: 'Digital is thresholds + noise margins; analog is continuous values + bandwidth. The bridges are ADC and PWM+filter.',
        pitfalls: [
          'Slow ramps hovering at thresholds',
          'Forgetting Vref on ADC',
          'Assuming PWM is “analog” without filtering/inertia',
        ],
        content: {
          central: 'Two ways signals carry information',
          description: 'Digital: discrete states with margin. Analog: continuous values with sensitivity.',
          branches: [
            { id: 'dig', label: 'Digital: thresholds + margins', color: '#22c55e', details: 'Voltage ranges map to 0/1; margin gives robustness.', example: '3.3V logic interprets a range as HIGH/LOW (device-specific).', children: ['Noise margin', 'Rise/fall times', 'Pull-ups/downs']},
            { id: 'ana', label: 'Analog: value + bandwidth', color: '#f59e0b', details: 'Small noise matters; filters and references matter.', example: 'Potentiometer into ADC needs stable reference.', children: ['Reference', 'Filtering', 'Impedance']},
            { id: 'bridge', label: 'Bridges: ADC and PWM', color: '#60a5fa', details: 'ADC samples analog into numbers; PWM + inertia/filter approximates analog out.', example: 'PWM dimming LED; PWM+RC makes a control voltage.', children: ['Sampling', 'Quantization', 'Averaging']},
          ]
        }
      },
      {
        id: 'signals-sense-decide-drive',
        title: 'Sense → Condition → Decide → Drive (component roles)',
        type: 'dataflow',
        why: 'Most circuits are just this pipeline. Components are roles in the story, not trivia.',
        pitfalls: [
          'Driving loads directly from GPIO',
          'Missing flyback protection',
          'Mixing voltage domains without a shared reference',
        ],
        content: {
          nodes: [
            { id: 'sense', label: 'Sense', type: 'boundary', x: 40, y: 90 },
            { id: 'cond', label: 'Condition', type: 'process', x: 260, y: 90 },
            { id: 'decide', label: 'Decide (MCU)', type: 'process', x: 520, y: 90 },
            { id: 'drive', label: 'Drive (transistor/IC)', type: 'process', x: 780, y: 90 },
            { id: 'load', label: 'Load', type: 'boundary', x: 1040, y: 90 },
          ],
          flows: [
            { from: 'sense', to: 'cond', label: 'signal' },
            { from: 'cond', to: 'decide', label: 'scaled' },
            { from: 'decide', to: 'drive', label: 'control' },
            { from: 'drive', to: 'load', label: 'power' },
          ]
        }
      }
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
    
      ,
{
        id: 'debug-loop',
        title: 'Debug Loop: rails → ground → signals → one change',
        type: 'dataflow',
        why: 'Debugging is hypothesis testing. Measure invariants first, then walk the signal path.',
        pitfalls: [
          'Changing multiple variables at once',
          'Measuring without a stable reference',
          'Assuming firmware is broken when hardware is dead',
        ],
        content: {
          nodes: [
            { id: 'sym', label: 'Symptom', type: 'boundary', x: 40, y: 80 },
            { id: 'pwr', label: 'Rails\n(under load)', type: 'process', x: 260, y: 80 },
            { id: 'gnd', label: 'Ground\n(return path)', type: 'process', x: 520, y: 80 },
            { id: 'sig', label: 'Signals\n(upstream→down)', type: 'process', x: 780, y: 80 },
            { id: 'chg', label: 'One change\nper test', type: 'flow', x: 1040, y: 80 },
          ],
          flows: [
            { from: 'sym', to: 'pwr', label: 'start' },
            { from: 'pwr', to: 'gnd', label: 'if ok' },
            { from: 'gnd', to: 'sig', label: 'then' },
            { from: 'sig', to: 'chg', label: 'hypothesis' },
          ]
        }
      }
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
{
        id: 'mcu-gpio-ports',
        title: 'GPIO: modes, pull-ups, and current limits',
        type: 'conceptmap',
        why: 'GPIO is an interface contract between firmware intent and external circuitry.',
        pitfalls: [
          'Floating inputs',
          'Forgetting pin direction/mode',
          'Powering loads from pins',
        ],
        content: {
          central: 'GPIO = port with modes and limits',
          description: 'Pins are small transistors, not ideal sources.',
          branches: [
            { id: 'out', label: 'Output: push/pull', color: '#22c55e', details: 'Drives HIGH/LOW with limited current.', example: 'Drive LED through resistor; drive MOSFET gate for loads.', children: ['Source/sink limits', '3.3V vs 5V', 'Edge speed depends on load']},
            { id: 'in', label: 'Input: high impedance', color: '#f59e0b', details: 'Needs defined default via pull-up/down.', example: 'Button with pull-up: released=HIGH, pressed=LOW.', children: ['Internal pulls', 'Debounce', 'Noise']},
            { id: 'od', label: 'Open-drain (I²C style)', color: '#60a5fa', details: 'Devices pull low; pull-up provides HIGH.', example: 'I²C SDA/SCL require pull-ups.', children: ['Pull-up value', 'Bus capacitance', 'Speed tradeoffs']},
          ]
        }
      },
      {
        id: 'mcu-pwm',
        title: 'PWM: fast switching → average effect',
        type: 'dataflow',
        why: 'PWM is the universal trick: time-slice power and let the load/filter average it.',
        pitfalls: [
          'No driver for inductive loads',
          'Wrong frequency (audible, slow response)',
          'Expecting a DC voltage without filtering/inertia',
        ],
        content: {
          nodes: [
            { id: 't', label: 'Timer', type: 'process', x: 40, y: 90 },
            { id: 'd', label: 'Duty cycle', type: 'process', x: 260, y: 90 },
            { id: 'w', label: 'Switching\nwave', type: 'flow', x: 520, y: 90 },
            { id: 'avg', label: 'Filter/inertia', type: 'process', x: 780, y: 90 },
            { id: 'out', label: 'Effect', type: 'boundary', x: 1040, y: 90 },
          ],
          flows: [
            { from: 't', to: 'd', label: 'set' },
            { from: 'd', to: 'w', label: 'compare' },
            { from: 'w', to: 'avg', label: 'energy packets' },
            { from: 'avg', to: 'out', label: 'average' },
          ]
        }
      },
      {
        id: 'mcu-adc',
        title: 'ADC: scaling, Vref, and impedance gotchas',
        type: 'conceptmap',
        why: 'Most weird ADC readings are reference or source-impedance problems.',
        pitfalls: [
          'Rail/Vref moves under load',
          'High impedance source into ADC',
          'Noise and long wires',
        ],
        content: {
          central: 'ADC turns voltage into integers',
          description: 'code ≈ Vin/Vref*(2^N−1). Vref stability matters.',
          branches: [
            { id: 'ref', label: 'Vref stability', color: '#22c55e', details: 'ADC is relative to Vref; if Vref moves, readings move.', example: 'Battery sag makes Vcc-based ADC drift.', children: ['Decouple', 'Use stable ref', 'Calibrate']},
            { id: 'imp', label: 'Source impedance', color: '#f59e0b', details: 'Sampling cap needs to charge quickly; high R causes errors.', example: 'Large divider may need a small cap or lower R.', children: ['RC settle', 'Buffer cap', 'Lower impedance']},
            { id: 'math', label: 'Scaling', color: '#60a5fa', details: 'Convert counts↔volts in firmware.', example: '12-bit: 0..4095; mid-scale ~2048.', children: ['Quantization', 'Averaging', 'Oversampling later']},
          ]
        }
      },
      {
        id: 'mcu-serial',
        title: 'UART / I²C / SPI: three common boundaries',
        type: 'conceptmap',
        why: 'Most “sensor won’t talk” bugs are wiring + pull-ups + framing, not code.',
        pitfalls: [
          'I²C missing pull-ups',
          'SPI CS mistakes',
          'UART level mismatch',
        ],
        content: {
          central: 'Bits across wires',
          description: 'Pick based on simplicity, bus needs, and speed.',
          branches: [
            { id: 'uart', label: 'UART (TX/RX)', color: '#22c55e', details: 'No clock; framed bytes; point-to-point.', example: 'Serial console, GPS.', children: ['Baud rate', 'Shared ground', 'Voltage levels']},
            { id: 'i2c', label: 'I²C (addressed bus)', color: '#f59e0b', details: 'Open-drain + pull-ups; multiple devices.', example: 'IMU + temp sensor.', children: ['Pull-ups', 'Addresses', 'Capacitance']},
            { id: 'spi', label: 'SPI (fast, CS per device)', color: '#60a5fa', details: 'Clocked; CS selects device.', example: 'Displays, fast ADCs.', children: ['CS discipline', 'Signal integrity', 'Clock']},
          ]
        }
      }
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
{
        id: 'pwr-rails',
        title: 'Rails & Brownouts',
        type: 'conceptmap',
        why: 'Power problems cause the weirdest “software bugs.” Rails sag, noise appears, and MCUs reset.',
        pitfalls: [
          'Measuring with no load',
          'Missing local decoupling',
          'Assuming USB equals stable power',
        ],
        content: {
          central: 'Supply → regulation → distribution → load',
          description: 'Voltage is a flow with limits and transients.',
          branches: [
            { id: 'droop', label: 'Droop under load', color: '#ef4444', details: 'Peak current draw drops Vcc.', example: 'Motor start resets MCU.', children: ['Measure during event', 'Reservoir caps', 'Better source']},
            { id: 'dec', label: 'Decoupling', color: '#22c55e', details: 'Local caps provide fast current and reduce noise.', example: '0.1µF + 10µF near MCU Vcc.', children: ['Placement matters', 'Short loop', 'Multiple values']},
            { id: 'brown', label: 'Brownout thresholds', color: '#60a5fa', details: 'Below threshold behavior becomes undefined or resets.', example: 'ESP32 brownout detector trips.', children: ['Logs/serial clues', 'Improve rail', 'Don’t “solve” by disabling']},
          ]
        }
      },
      {
        id: 'pwr-regs',
        title: 'Regulators: LDO vs Buck',
        type: 'conceptmap',
        why: 'Pick your tradeoff: LDO heat vs buck noise/complexity.',
        pitfalls: [
          'LDO thermal overload',
          'Buck ripple corrupts analog readings',
          'Ignoring dropout/headroom',
        ],
        content: {
          central: 'Two regulator archetypes',
          description: 'Choose based on current, efficiency, and noise tolerance.',
          branches: [
            { id: 'ldo', label: 'LDO (quiet, hot)', color: '#f59e0b', details: '(Vin−Vout)·I becomes heat.', example: '12V→5V at 0.5A burns ~3.5W.', children: ['Thermal budget', 'Dropout', 'Output caps']},
            { id: 'buck', label: 'Buck (efficient, noisy)', color: '#22c55e', details: 'Switching + inductor averages power efficiently.', example: '12V→5V for motors/LEDs.', children: ['Ripple', 'Layout/decoupling', 'EMI']},
            { id: 'mix', label: 'Buck then LDO', color: '#60a5fa', details: 'Bulk efficiency + quiet rail for sensors.', example: '12V→5V buck; 5V→3.3V LDO.', children: ['Separate rails', 'Star ground', 'Filtering']},
          ]
        }
      },
      {
        id: 'pwr-batt',
        title: 'Battery Basics (sag & internal resistance)',
        type: 'dataflow',
        why: 'Batteries sag under load. That sag looks like brownouts and noise.',
        pitfalls: [
          'Assuming nominal voltage is constant',
          'Ignoring peak current',
          'Unsafe charging assumptions (Li-ion)',
        ],
        content: {
          nodes: [
            { id: 'cell', label: 'Cell', type: 'boundary', x: 40, y: 90 },
            { id: 'curve', label: 'Discharge\ncurve', type: 'process', x: 260, y: 90 },
            { id: 'ir', label: 'Internal\nresistance', type: 'process', x: 520, y: 90 },
            { id: 'load', label: 'Load\nspikes', type: 'process', x: 780, y: 90 },
            { id: 'rail', label: 'Rail\nbehavior', type: 'flow', x: 1040, y: 90 },
          ],
          flows: [
            { from: 'cell', to: 'curve', label: 'nominal V' },
            { from: 'curve', to: 'ir', label: 'headroom' },
            { from: 'ir', to: 'load', label: 'sag' },
            { from: 'load', to: 'rail', label: 'brownout/noise' },
          ]
        }
      },
      {
        id: 'pwr-usb-batt',
        title: 'Fault Tree: Works on USB, Fails on Battery',
        type: 'faulttree',
        why: 'Classic. Usually power integrity, not firmware.',
        pitfalls: [
          'Not measuring under load',
          'Ignoring connector/switch resistance',
          'Missing shared ground',
        ],
        content: {
          root: 'Works on USB, fails on battery',
          branches: [
            { label: 'Battery sag → brownout resets', color: '#ef4444', details: 'Peak load drops Vcc below threshold.', example: 'Wi‑Fi transmit resets ESP32.', children: ['Measure Vcc during event', 'Add reservoir cap', 'Improve source/regulator']},
            { label: 'Dropout / insufficient headroom', color: '#f59e0b', details: 'Regulator can’t hold Vout as Vin drops.', example: 'Near-empty battery + LDO dropout.', children: ['Check dropout spec', 'Use buck/boost', 'Lower rail requirement']},
            { label: 'Noise/grounding glitches', color: '#3b82f6', details: 'Switching currents corrupt signals/ADC.', example: 'ADC jitter and serial garbage.', children: ['Decouple locally', 'Improve returns', 'Separate motor supply']},
            { label: 'Wiring/polarity/connectors', color: '#22c55e', details: 'Battery path differs physically.', example: 'Reversed connector; high-R switch.', children: ['Continuity check', 'Inspect polarity', 'Measure at load']},
          ]
        }
      }
    ],
  },

  // ------------------------------------------------------------
  // CATEGORY 6: Dynamics (Time Domain + Control)
  // ------------------------------------------------------------
  dynamics: {
    id: 'dynamics',
    title: 'Dynamics',
    description: 'Time-domain intuition and control loops — how circuits behave over time',
    color: '#0ea5e9', // sky
    icon: '⏱️',
    modules: [
      {
        id: 'dyn-sampling',
        title: 'Sampling & Aliasing (why “fast enough” matters)',
        type: 'conceptmap',
        why: 'If you sample too slowly, the signal lies. This shows up in ADC reads, PWM, and sensor polling.',
        pitfalls: [
          'Sampling near the signal frequency',
          'Ignoring sensor response time',
          'Sampling during noisy switching moments',
        ],
        content: {
          central: 'Continuous reality → discrete measurements',
          description: 'Sparse samples can invent patterns (aliasing).',
          branches: [
            { id: 'alias', label: 'Aliasing', color: '#ef4444', details: 'Fast changes masquerade as slow ones when undersampled.', example: 'Spinning fan appears reversed on video.', children: ['Sample faster', 'Filter first', 'Know bandwidth']},
            { id: 'bw', label: 'Bandwidth / response time', color: '#22c55e', details: 'Real sensors/rails don’t change instantly; they lag.', example: 'Thermistors are slow; accelerometers are fast.', children: ['Lag', 'Filtering', 'Latency']},
            { id: 'sync', label: 'Sync & quiet sampling', color: '#60a5fa', details: 'Sampling aligned with switching edges can bias/noise readings.', example: 'ADC reads during PWM edge → jitter.', children: ['Sample at quiet times', 'Average', 'Decouple']},
          ]
        }
      },
      {
        id: 'dyn-edges',
        title: 'Rise/Fall Times (digital edges are ramps)',
        type: 'conceptmap',
        why: 'Long wires + capacitance + weak pull-ups make slow edges, which breaks “digital.”',
        pitfalls: [
          'Assuming “HIGH” arrives instantly',
          'Too-weak I²C pull-ups',
          'Overloading GPIO with capacitance',
        ],
        content: {
          central: 'Edge speed = driver strength + capacitance',
          description: 'Slow edges linger near thresholds and cause trouble.',
          branches: [
            { id: 'cap', label: 'Capacitance slows', color: '#f59e0b', details: 'Wires and inputs add capacitance; more C → slower transition.', example: 'I²C errors increase with longer cables.', children: ['Shorter wires', 'Lower speed', 'Stronger pull-ups']},
            { id: 'drv', label: 'Driver strength matters', color: '#22c55e', details: 'Pins can only charge/discharge so fast.', example: 'Heavy load makes edges mushy.', children: ['Use buffer/driver', 'Reduce load', 'Check specs']},
            { id: 'thr', label: 'Threshold chatter', color: '#60a5fa', details: 'Slow crossings can create multiple transitions.', example: 'Button input without debounce.', children: ['Debounce', 'Schmitt trigger', 'Faster edges']},
          ]
        }
      },
      {
        id: 'dyn-rc',
        title: 'RC Time Constant (the throttled charging story)',
        type: 'dataflow',
        why: 'RC is the simplest time-domain block: filtering, debouncing, smoothing.',
        pitfalls: [
          'Picking R and C without time scale',
          'Forgetting “slow” adds lag',
          'Ignoring input impedance',
        ],
        content: {
          nodes: [
            { id: 'step', label: 'Step\ninput', type: 'flow', x: 40, y: 90 },
            { id: 'r', label: 'Resistor\n(throttle)', type: 'process', x: 300, y: 90 },
            { id: 'c', label: 'Capacitor\n(reservoir)', type: 'process', x: 560, y: 90 },
            { id: 'curve', label: 'Exponential\ncurve', type: 'flow', x: 820, y: 90 },
            { id: 'tau', label: 'τ=R·C\ntime scale', type: 'boundary', x: 1080, y: 90 },
          ],
          flows: [
            { from: 'step', to: 'r', label: 'drives current' },
            { from: 'r', to: 'c', label: 'charges' },
            { from: 'c', to: 'curve', label: 'voltage evolves' },
            { from: 'curve', to: 'tau', label: 'characteristic' },
          ]
        }
      },
      {
        id: 'dyn-control',
        title: 'Control Loops (P/PI/PD intuition)',
        type: 'conceptmap',
        why: 'Loop: try → measure → correct. Tuning sets “snappy vs stable.”',
        pitfalls: [
          'Gain too high (oscillation)',
          'Gain too low (sluggish)',
          'Integral wind-up',
        ],
        content: {
          central: 'Setpoint → measurement → error → controller → system',
          description: 'The loop keeps adjusting until error is small (or it goes unstable).',
          branches: [
            { id: 'p', label: 'P: proportional', color: '#22c55e', details: 'More error → more correction.', example: 'Motor speed error increases PWM duty.', children: ['Fast', 'Can overshoot', 'Tune gain']},
            { id: 'i', label: 'I: integral', color: '#f59e0b', details: 'Accumulates error to remove steady bias.', example: 'Friction causes steady error; I compensates.', children: ['Removes bias', 'Can wind up', 'Slows response']},
            { id: 'd', label: 'D: derivative', color: '#60a5fa', details: 'Responds to change rate; can damp overshoot.', example: 'Helps fast systems; beware noise.', children: ['Damping', 'Noise amplification', 'Often optional']},
          ]
        }
      },
      {
        id: 'dyn-control-faults',
        title: 'Fault Tree: Loop Misbehavior Patterns',
        type: 'faulttree',
        why: '“Possessed” control loops usually match a small set of archetypes.',
        pitfalls: [
          'Tuning without fixed sample time',
          'Ignoring sensor noise/latency',
          'Not handling saturation',
        ],
        content: {
          root: 'Loop behaves badly',
          branches: [
            { label: 'Oscillation', color: '#ef4444', details: 'Gain too high or too much delay.', example: 'Motor hunts up/down.', children: ['Lower P', 'Increase sample rate', 'Add filtering']},
            { label: 'Sluggish', color: '#f59e0b', details: 'Gain too low or too much lag.', example: 'Takes too long to settle.', children: ['Raise P', 'Reduce lag', 'Check actuator authority']},
            { label: 'Jitter/noise chasing', color: '#3b82f6', details: 'Noise makes the controller twitch.', example: 'PWM jitters rapidly.', children: ['Filter measurement', 'Deadband', 'Lower D']},
            { label: 'Integral wind-up', color: '#22c55e', details: 'Integrator accumulates while saturated.', example: 'Slow recovery after big change.', children: ['Clamp I', 'Anti-windup', 'Handle saturation']},
          ]
        }
      }
    ]
  },

  // ------------------------------------------------------------
  // CATEGORY 7: Probe Mode (curriculum-visible; interaction later)
  // ------------------------------------------------------------
  probe: {
    id: 'probe',
    title: 'Probe Mode',
    description: 'Guided measurement instincts (what to probe, what it means)',
    color: '#8b5cf6', // violet
    icon: '🧪',
    modules: [
      {
        id: 'probe-overview',
        title: 'Probe Mode: What It Teaches',
        type: 'conceptmap',
        why: 'Probe Mode trains the core debugging skill: find where reality diverges from expectation along the signal path.',
        pitfalls: [
          'Probing without a reference (ground)',
          'Ignoring “under load” behavior',
          'Stopping after one measurement',
        ],
        content: {
          central: 'Click nodes → get measurement + meaning',
          description: 'Not a physics simulator: a guided measurement mental model.',
          branches: [
            { id: 'v', label: 'Voltage: DC level', color: '#22c55e', details: 'Rails, logic levels, references.', example: '3.3V droops during motor start → brownout risk.', children: ['Measure at the load', 'Watch droop', 'Check ground']},
            { id: 'w', label: 'Waveform: qualitative time behavior', color: '#f59e0b', details: 'Square, ramp, noise, spikes.', example: 'PWM looks mushy → too much capacitance/weak driver.', children: ['Edges', 'Noise', 'Spikes']},
            { id: 'role', label: 'Role in flow', color: '#60a5fa', details: 'Source → condition → decide → drive.', example: 'Floating input has no defined role; add pull-up/down.', children: ['Upstream/downstream', 'Boundary crossing', 'Return path']},
          ]
        }
      },
      {
        id: 'probe-clues',
        title: 'Fault Clues from Probing (pattern recognition)',
        type: 'faulttree',
        why: 'The same few probe patterns appear constantly; this turns them into fast diagnostics.',
        pitfalls: [
          'Skipping rails/ground',
          'Measuring in the wrong place (before vs after regulator)',
          'Chasing complex theories too early',
        ],
        content: {
          root: 'Probe result is surprising',
          branches: [
            { label: 'Everything ~0V (GND-land)', color: '#3b82f6', details: 'Wrong reference, missing power, or wrong probe point.', example: 'No shared ground between modules.', children: ['Confirm ground', 'Check rails', 'Verify probe point']},
            { label: 'Rails droop under load', color: '#ef4444', details: 'Source/wiring can’t supply peaks.', example: 'ESP32 resets on Wi‑Fi transmit.', children: ['Measure during event', 'Add reservoir cap', 'Improve source']},
            { label: 'Noisy baseline', color: '#f59e0b', details: 'Grounding/supply integrity issue.', example: 'ADC readings jitter wildly.', children: ['Shorten returns', 'Decouple locally', 'Separate motor supply']},
            { label: 'Mushy edges', color: '#22c55e', details: 'Capacitance + weak drive/pulls.', example: 'I²C errors with long cables.', children: ['Stronger pull-ups', 'Lower speed', 'Shorter wires']},
          ]
        }
      }
    ]
  },

};
