
import React from 'react';

// Probe Mode is intentionally "simulation-lite":
// it provides curated, educational probe readouts when a learner clicks
// nodes/branches in diagrams. It does NOT attempt physical simulation.

const classify = (text = '') => {
  const t = String(text).toLowerCase();
  if (t.includes('gnd') || t.includes('ground') || t.trim() === '0v') return 'ground';
  if (t.includes('vcc') || t.includes('rail') || t.includes('3.3') || t.includes('5v') || t.includes('supply') || t.includes('vdd')) return 'rail';
  if (t.includes('pwm') || t.includes('duty') || t.includes('timer')) return 'pwm';
  if (t.includes('adc') || t.includes('analog') || t.includes('vin') || t.includes('sensor')) return 'analog';
  if (t.includes('motor') || t.includes('relay') || t.includes('coil') || t.includes('induct')) return 'inductive';
  if (t.includes('i2c') || t.includes('spi') || t.includes('uart') || t.includes('serial') || t.includes('sda') || t.includes('scl') || t.includes('cs')) return 'bus';
  if (t.includes('float')) return 'floating';
  return 'generic';
};

const defaultProbeByClass = (cls) => {
  switch (cls) {
    case 'rail':
      return {
        icon: '🔋',
        title: 'Power rail',
        expect: [
          'Steady DC near the nominal value (e.g., 3.3V or 5V).',
          'Small ripple is normal; big droop during events is the clue.',
        ],
        clues: [
          'Droop under load → brownout/reset risk.',
          'Ripple/noise → grounding/decoupling/layout/wiring issues.',
          'Correct voltage unloaded but low under load → source/wiring resistance.',
        ],
        next: ['Measure at the load (MCU Vcc pin), not just at the regulator output.', 'Compare “idle” vs “during the event”.'],
      };
    case 'ground':
      return {
        icon: '🪨',
        title: 'Ground / reference',
        expect: [
          'Your measurement reference. “Everything is relative to ground.”',
          'A missing shared ground makes signals meaningless.',
        ],
        clues: [
          'Weird serial / “nothing works” across modules → often missing common ground.',
          'Noise on ground reference → everything looks noisy.',
        ],
        next: ['Continuity check ground return paths.', 'Look for high-current ground sharing (motors + MCU).'],
      };
    case 'pwm':
      return {
        icon: '🟦',
        title: 'PWM / switching node',
        expect: [
          'Square-ish waveform switching between LOW and HIGH.',
          'Average effect depends on filtering/inertia (multimeter reads “average-ish”).',
        ],
        clues: [
          'Mushy edges → too much capacitance / weak driver / long wires.',
          'Inductive load without diode/driver → spikes and resets.',
        ],
        next: ['Probe the rail while PWM load switches (brownout check).', 'Confirm duty cycle in firmware and at the pin.'],
      };
    case 'analog':
      return {
        icon: '📈',
        title: 'Analog / ADC-related node',
        expect: [
          'A continuous voltage that should be stable or slowly varying.',
          'ADC reading is relative to Vref (often Vcc).',
        ],
        clues: [
          'Jitter → noise pickup, poor grounding, insufficient filtering.',
          'Wrong scale → divider math, wrong Vref assumption, saturation.',
          'Sticky values → high source impedance vs ADC sample cap settling.',
        ],
        next: ['Check Vref/rail stability.', 'Add small RC filtering or lower source impedance.'],
      };
    case 'inductive':
      return {
        icon: '⚡',
        title: 'Inductive switching node',
        expect: [
          'Spiky transients during switching (motors, relays).',
          'Requires flyback/clamp protection and careful return paths.',
        ],
        clues: [
          'Resets / random glitches during actuation → rail droop or spikes.',
          'Driver overheats → too much current, wrong MOSFET/driver, no diode.',
        ],
        next: ['Verify flyback diode orientation.', 'Separate motor supply/ground return if possible.'],
      };
    case 'bus':
      return {
        icon: '🧵',
        title: 'Serial bus node (UART/I²C/SPI)',
        expect: [
          'UART: toggling TX/RX with idle level between frames.',
          'I²C: open-drain lines pulled up; clean rising edges.',
          'SPI: clocked bursts with chip-select discipline.',
        ],
        clues: [
          'I²C lines stuck low → short, wrong pull-up, device holding the bus.',
          'I²C errors with long wires → slow edges (capacitance) / weak pull-ups.',
          'UART gibberish → baud mismatch or voltage levels.',
        ],
        next: ['Check shared ground + pull-ups (I²C).', 'Verify CS lines (SPI) and voltage levels.'],
      };
    case 'floating':
      return {
        icon: '🎈',
        title: 'Floating node (unpredictable)',
        expect: [
          'A floating node can read “anything” and change when you touch it.',
          'Often an input missing pull-up/down.',
        ],
        clues: [
          'Intermittent behavior → half-inserted jumpers, missing reference, no pull.',
        ],
        next: ['Add pull-up/down (internal or external).', 'Confirm continuity on the intended path.'],
      };
    default:
      return {
        icon: '🧪',
        title: 'Probe readout',
        expect: ['A guided interpretation of what you clicked.'],
        clues: ['If it’s surprising, verify rails and reference first.'],
        next: ['Probe upstream source then downstream load to find the boundary where reality diverges.'],
      };
  }
};

export const buildProbeInfo = ({ module, category, elementType, element }) => {
  // Allow explicit overrides on content objects (optional)
  const override = element?.probe;
  if (override && typeof override === 'object') {
    return {
      icon: override.icon || '🧪',
      title: override.title || element?.label || element?.fault || module?.title || 'Probe',
      expect: override.expect || [],
      clues: override.clues || [],
      next: override.next || [],
      meta: override.meta || {},
    };
  }

  const basis = `${element?.label || ''} ${element?.id || ''} ${element?.fault || ''} ${module?.id || ''} ${module?.title || ''}`;
  const cls = classify(basis);
  const base = defaultProbeByClass(cls);

  const title = element?.label || element?.fault || base.title;
  return {
    ...base,
    title,
    meta: {
      class: cls,
      elementType,
      moduleId: module?.id,
      categoryId: category?.id,
    },
  };
};

export const ProbePanel = ({ selection, onClose }) => {
  if (!selection) return null;
  const { info, elementType, element } = selection;

  return (
    <div className="bg-slate-800/70 border border-slate-600 rounded-xl p-4 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl leading-none">{info.icon || '🧪'}</div>
          <div>
            <h3 className="text-white font-semibold">{info.title}</h3>
            <div className="text-xs text-slate-400 mt-1">
              {info.meta?.class ? `${info.meta.class} · ` : ''}{elementType}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm"
          aria-label="Close probe panel"
          title="Close"
        >
          ✕
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-4">
        <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">What you’d expect</div>
          <ul className="text-sm text-slate-200 space-y-1 list-disc pl-5">
            {(info.expect?.length ? info.expect : ['(no notes)']).map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>

        <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Clues if it’s weird</div>
          <ul className="text-sm text-slate-200 space-y-1 list-disc pl-5">
            {(info.clues?.length ? info.clues : ['(no notes)']).map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>

        <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Next probe / next move</div>
          <ul className="text-sm text-slate-200 space-y-1 list-disc pl-5">
            {(info.next?.length ? info.next : ['(no notes)']).map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>
      </div>

      {element?.label && (
        <div className="mt-3 text-xs text-slate-400">
          Tip: probe under load when possible — “idle rails” are liars.
        </div>
      )}
    </div>
  );
};
