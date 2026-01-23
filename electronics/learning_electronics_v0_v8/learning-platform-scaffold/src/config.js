// ============================================================
// APP CONFIGURATION
// Customize these values for your learning platform
// ============================================================

export const config = {
  // App identity
  title: 'Electronics Fundamentals + Microcontroller Basics',
  subtitle: 'Visual mental models for software-first learners',

  // localStorage key - use unique name per project to avoid conflicts
  storageKey: 'learning-electronics-v0-progress',

  // Theme colors (Tailwind classes)
  theme: {
    // Main accent color for headers, buttons
    primary: 'blue',
    // Background
    bgDark: 'slate-900',
    bgMedium: 'slate-800',
    bgLight: 'slate-700',
    // Module type colors (used in dashboard chips and visualizations)
    dataflow: '#3b82f6', // blue
    conceptmap: '#22c55e', // green
    faulttree: '#f59e0b', // amber
  },

  // Keyboard shortcuts (customize if needed)
  shortcuts: {
    quickReview: 'q',
    reference: 'r',
    export: 'e', // requires ctrl
    print: 'p', // requires ctrl
    help: '?',
    back: 'Escape',
    next: 'j',
    prev: 'k',
    select: 'Enter',
  },

  // Feature flags - turn off features you don't need
  features: {
    reference: true, // Reference panel (R key)
    quickReview: true, // Quick review modal (Q key)
    notes: true, // Per-module notes
    bookmarks: true, // Bookmark reveals
    export: true, // Markdown export
    print: true, // Print styles
  },
};

// ============================================================
// REFERENCE DATA
// Reference panel (R) is meant to be a grab-and-go cheat sheet.
// Keep it compact and practical.
// ============================================================

export const referenceData = {
  sections: [
    {
      id: 'formulas',
      title: 'Core Formulas & Rules of Thumb',
      content: [
        { term: 'Ohm\'s law', definition: 'V = I·R  (volts = amps · ohms)' },
        { term: 'Power', definition: 'P = V·I  (also P = I²·R, P = V²/R)' },
        { term: 'Voltage divider', definition: 'Vout = Vin · R2/(R1+R2) (Vout taken across R2 to ground)' },
        { term: 'Series resistors', definition: 'R_total = R1 + R2 + ...' },
        { term: 'Parallel resistors', definition: '1/R_total = 1/R1 + 1/R2 + ...' },
        { term: 'Capacitor (charge bucket)', definition: 'I = C · dV/dt  (current flows when voltage changes)' },
        { term: 'RC time constant', definition: 'τ = R·C  (≈63% step response in 1τ, ≈99% in 5τ)' },
        { term: 'ADC step size', definition: 'LSB ≈ Vref / (2^N)  (e.g., 3.3V/4096 ≈ 0.8mV for 12-bit)' },
        { term: 'PWM average (ideal)', definition: 'Vavg ≈ Vhigh · dutyCycle  (after filtering / with inertia)' },
        { term: 'Logic thresholds (rough)', definition: '3.3V logic: HIGH ~ >2.0V, LOW ~ <0.8V (check datasheet!)' },
      ],
    },
    {
      id: 'schematic-symbols',
      title: 'Schematic Symbols You\'ll See Constantly',
      content: [
        { term: 'Ground (GND)', definition: 'Your 0V reference. Not always earth ground; it\'s the circuit\'s “return path”.' },
        { term: 'VCC / VIN / 3V3 / 5V', definition: 'Power rails. “VIN” is often input to a regulator; “3V3/5V” are regulated outputs.' },
        { term: 'Net labels', definition: 'Wires with the same label are connected, even if not drawn together.' },
        { term: 'Pull-up / pull-down', definition: 'A resistor that sets a default logic level when a pin would otherwise float.' },
        { term: 'Decoupling capacitor', definition: 'A small cap (often 0.1µF) placed close to an IC\'s power pins to tame fast current spikes.' },
      ],
    },
    {
      id: 'arduino-uno',
      title: 'Arduino Uno (ATmega328P) Quick Pin Notes',
      content: [
        { term: 'Logic level', definition: '5V logic. Many sensors are 3.3V—level shifting may be needed.' },
        { term: 'GPIO', definition: 'Digital pins D0–D13. D13 often tied to onboard LED.' },
        { term: 'UART', definition: 'D0 (RX), D1 (TX) share serial + often used for USB programming.' },
        { term: 'I2C', definition: 'A4 (SDA), A5 (SCL) on classic Uno.' },
        { term: 'SPI', definition: 'D10 (SS), D11 (MOSI), D12 (MISO), D13 (SCK) + ICSP header.' },
        { term: 'PWM pins', definition: 'Typically D3, D5, D6, D9, D10, D11 (board-dependent).' },
        { term: 'ADC', definition: 'A0–A5 are analog inputs (10-bit ADC by default).' },
      ],
    },
    {
      id: 'esp32',
      title: 'ESP32 Dev Boards Quick Pin Notes (Varies by Board!)',
      content: [
        { term: 'Logic level', definition: '3.3V logic. Many pins are NOT 5V tolerant.' },
        { term: 'GPIO gotchas', definition: 'Some pins are strapping/boot pins or used by flash; avoid for “random GPIO” unless you verify.' },
        { term: 'ADC', definition: '12-bit ADC exists, but analog behavior is quirky; treat as “good enough” unless calibrated.' },
        { term: 'PWM', definition: 'PWM is flexible (LEDC peripheral): almost any output-capable GPIO can do it.' },
        { term: 'Serial', definition: 'Multiple UARTs; USB-to-serial often on UART0. Check your board\'s pinout.' },
      ],
    },
    {
      id: 'common-pinouts',
      title: 'Common Component Pinouts (Breadboard World)',
      content: [
        { term: 'LED', definition: 'Anode (+) to resistor/VCC, Cathode (−) to GND (flat edge/short leg is often cathode).' },
        { term: 'Diode (signal/rectifier)', definition: 'Stripe marks cathode. Current (conventional) flows anode → cathode when forward-biased.' },
        { term: 'BJT (NPN, TO-92)', definition: 'Pin order varies by part! Common: E-B-C or C-B-E—verify the datasheet.' },
        { term: 'MOSFET (logic-level, TO-220)', definition: 'Often G-D-S left-to-right facing the front; verify. Use a gate resistor + pull-down.' },
        { term: 'Linear regulator (7805)', definition: 'Often IN-GND-OUT facing the front; add input/output caps close by.' },
      ],
    },
  ],
};
