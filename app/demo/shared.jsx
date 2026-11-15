// Demo data and the tub sketch, shared by the /demo walkthrough and the landing-page story section.

// Everything below is demo data for the sample pack. Nothing is entered by the user except
// how much each manufacturing step may change, and the budget.
export const SAMPLE_FILE = 'sample-8oz-tub.step';

// 36 mm² is 15% of the guideline tab size, so the guideline area works out to 240 mm².
export const GUIDELINE_AREA = 240;
export const TAB = { width: 3, length: 12 };
export const TAB_AREA = TAB.width * TAB.length;
export const pctOfGuideline = (area) => Math.round((area / GUIDELINE_AREA) * 100);

export const STATUS = {
  below: 'Below guideline',
  meets: 'Meets guideline',
  above: 'Above limit',
};

export const DIMENSIONS = [
  { label: 'Tab width', value: `${TAB.width} mm`, part: 'tab' },
  { label: 'Tab length', value: `${TAB.length} mm`, part: 'tab' },
  { label: 'Extends past rim', value: '3 mm', part: 'tab' },
  { label: 'Overcap clearance', value: '2 mm', part: 'lid' },
  { label: 'Texture', value: 'Smooth', part: 'tab' },
  { label: 'Contrast', value: 'Low', part: 'tab' },
  { label: 'Instruction text', value: '6–8 pt', part: 'foil' },
];

// Worst first.
export const GAPS = [
  { label: 'Pull force', value: '15.5–20.0 N', status: 'above', part: 'tab' },
  { label: 'Tab size', value: `${TAB.width} × ${TAB.length} mm`, status: 'below', part: 'tab', meter: pctOfGuideline(TAB_AREA) },
  { label: 'Grip texture', value: 'Smooth', status: 'below', part: 'tab' },
  { label: 'Easy to see', value: 'Silver on silver', status: 'below', part: 'tab' },
  { label: 'Instruction text', value: '6–8 pt', status: 'below', part: 'foil' },
  { label: 'Tab extends past rim', value: '3 mm', status: 'meets', part: 'tab' },
];
export const tally = (status) => GAPS.filter((g) => g.status === status).length;
export const SUMMARY = `${tally('below')} below guideline, ${tally('above')} above the limit, ${tally('meets')} meets`;

// Pack types the product checks. `name` matches the carousel art in Products.jsx.
// No limits or measurements here yet: only the tub has real figures, so the others list what gets checked.
export const PACK_TYPES = [
  { name: 'Tub', opening: 'Peel tab', measure: 'Pull force', checks: ['Tab size', 'Tab extends past rim', 'Grip texture', 'Easy to see', 'Instruction text'] },
  { name: 'Jar', opening: 'Twist lid', measure: 'Opening torque', checks: ['Grip diameter', 'Lid ridging', 'Easy to see', 'Instruction text'] },
  { name: 'Carton', opening: 'Screw cap', measure: 'Opening torque', checks: ['Cap diameter', 'Cap ridging', 'Seal under the cap', 'Instruction text'] },
  { name: 'Can', opening: 'Ring pull', measure: 'Lift and pull force', checks: ['Finger clearance under the ring', 'Ring size', 'Edge after opening'] },
  { name: 'Pouch', opening: 'Tear notch', measure: 'Tear force', checks: ['Notch easy to find', 'Tear direction', 'Reseal open and close force', 'Instruction text'] },
  { name: 'Tray', opening: 'Film corner', measure: 'Peel force', checks: ['Corner tab size', 'Corner easy to see', 'Grip texture', 'Instruction text'] },
];

export const FILE_TYPES = [
  { label: 'CAD model', value: '.step, .stp, .iges' },
  { label: 'Spec sheet', value: '.pdf, .xlsx' },
  { label: 'Print file', value: '.pdf, .ai' },
];

// The pack's production line. `level` is how much change the brand allows at each step (index into LEVELS).
export const LEVELS = ['Keep', 'Minor', 'Open'];
export const LEVEL_NAMES = ['kept as is', 'minor changes', 'open to change'];
export const PROCESS = [
  { key: 'forming', name: 'Tub forming', machine: 'Thermoforming mold', level: 0 },
  { key: 'filling', name: 'Filling', machine: 'Filler line', level: 0 },
  { key: 'die', name: 'Foil cutting', machine: 'Lid and tab die', level: 1 },
  { key: 'seal', name: 'Sealing', machine: 'Heat sealer', level: 1 },
  { key: 'overcap', name: 'Overcap', machine: 'Lid applicator', level: 0 },
  { key: 'print', name: 'Artwork', machine: 'Foil printing', level: 2 },
];

// `needs` maps a process step to the lowest change level the design requires there.
// `lift` is the predicted rise in yearly sales, in percent: the more accessible the design, the bigger the lift.
export const OPTIONS = [
  {
    key: 'low',
    name: 'Low',
    cost: 8140,
    summary: 'High-contrast tab and larger instructions.',
    tabArea: TAB_AREA,
    lift: 0.25,
    needs: { print: 1 },
    changes: [
      { label: 'Tab colour', value: 'Silver → high contrast' },
      { label: 'Instruction text', value: '6–8 pt → larger' },
    ],
  },
  {
    key: 'moderate',
    name: 'Moderate',
    cost: 41200,
    summary: 'A larger tab cut on the existing die line.',
    tabArea: 162,
    lift: 0.5,
    needs: { print: 1, die: 1, seal: 1 },
    changes: [
      { label: 'Tab width', value: '3 → 12 mm' },
      { label: 'Tab length', value: '12 → 13.5 mm' },
      { label: 'Tab area', value: '36 → 162 mm²' },
      { label: 'Overcap clearance', value: '2 → 0.5 mm', chip: 'Check clearance' },
    ],
  },
  {
    key: 'extreme',
    name: 'Full access',
    cost: 214500, // placeholder until the new-mold quote is in
    summary: 'Full-size tab with a reshaped rim.',
    tabArea: GUIDELINE_AREA,
    lift: 1,
    rim: true,
    needs: { print: 1, die: 2, seal: 1, forming: 2, overcap: 1 },
    changes: [
      { label: 'Tab size', value: 'Full guideline size' },
      { label: 'Tub rim', value: 'Reshaped for the tab' },
    ],
  },
];

// Revenue model for the sample pack: extra tubs = tubs sold × appeal lift; added sales = extra tubs × price.
export const MARKET = { units: 141, share: 66, price: 1.79 };
// Extra tubs a year, in millions, and the added yearly sales in dollars, for one design.
export const extraUnits = (option) => MARKET.units * (option.lift / 100);
export const addedSales = (option) => extraUnits(option) * 1e6 * MARKET.price;

export const STEPS = [
  { tab: 'Import', title: 'Import your current packaging', line: 'Drop in a CAD model, spec sheet or print file.' },
  { tab: 'Dimensions', title: 'Dimensions', line: 'Read automatically from your file. Nothing to enter.' },
  { tab: 'Manufacturing', title: 'Manufacturing changes', line: 'Your line, step by step. Say how much each can change.' },
  { tab: 'Gaps', title: 'Guideline gaps', line: 'Checked against proprietary guidelines, built on research and studies.' },
  { tab: 'Options', title: 'Fix options', line: 'Three designs, generated to fit your line. Pick one.' },
  { tab: 'Report', title: 'Report', line: 'Findings, costs and what the fix is worth.' },
];
export const OPTIONS_STEP = 4;
export const REPORT_STEP = 5;

export const CYAN = '#22E4FF';
export const TAB_PATH = 'M392 350L418 344L426 362Q427 368 421 369L404 373Q398 374 396 368Z';
export const money = (n) => `$${n.toLocaleString('en-US')}`;
export const bigMoney = (n) => `$${(n / 1e6).toFixed(1)} million`;
export const round1 = (n) => Math.round(n * 10) / 10;

export const LABELS = [
  { part: 'lid', text: 'Lid', x: 548, y: 100, anchor: 'start', line: 'M488 120L542 100' },
  { part: 'foil', text: 'Foil seal', x: 8, y: 250, anchor: 'start', line: 'M70 254L128 268' },
  { part: 'tab', text: 'Peel tab', x: 500, y: 410, anchor: 'start', line: 'M430 372L494 402' },
  { part: 'tub', text: 'Tub', x: 70, y: 446, anchor: 'end', line: 'M76 440L150 410' },
];

// The sketch is not to scale: the tab grows with the square root of its area, relative to the 3 × 12 mm pilot tab.
// The tab is always outlined in cyan; the highlighted part turns solid cyan and its label lights up.
// `rim` draws the reshaped rim of the Full access design; `labels` toggles the part call-outs.
// `sticker` puts a small Kind to hands sticker on the side of the tub.
//
// The shape follows the pilot pack: an oval, soft-cornered silver tub with curved sides, a foil seal,
// and a grey overcap with a blank oval label panel. No brand name, logo or artwork is drawn.

// A soft-cornered oval seen at an angle: a rounded rectangle whose corners take up most of each side.
const oval = (cx, cy, rx, ry) => {
  const a = rx * 0.62;
  const b = ry * 0.86;
  return `M${cx - rx + a} ${cy - ry}H${cx + rx - a}A${a} ${b} 0 0 1 ${cx + rx} ${cy - ry + b}V${cy + ry - b}`
    + `A${a} ${b} 0 0 1 ${cx + rx - a} ${cy + ry}H${cx - rx + a}A${a} ${b} 0 0 1 ${cx - rx} ${cy + ry - b}V${cy - ry + b}`
    + `A${a} ${b} 0 0 1 ${cx - rx + a} ${cy - ry}Z`;
};
// The front (lower) half of the same oval, from its left edge round to its right edge.
const ovalFront = (cx, cy, rx, ry) => {
  const a = rx * 0.62;
  const b = ry * 0.86;
  return `V${cy + ry - b}A${a} ${b} 0 0 0 ${cx - rx + a} ${cy + ry}H${cx + rx - a}A${a} ${b} 0 0 0 ${cx + rx} ${cy + ry - b}V${cy}`;
};

export function Tub({ highlight, tabArea, rim = false, labels = true, sticker = false }) {
  const lit = (part) => highlight === part;
  const scale = Math.min(2.6, Math.max(0.6, Math.sqrt(tabArea / 36)));
  const edge = 'rgba(6,9,18,.35)';
  return (
    <svg viewBox="0 50 600 440" role="img" aria-label="Sketch of the oval tub with its foil seal, peel tab and grey overcap">
      <defs>
        <linearGradient id="d-body" x1="0" x2="1"><stop offset="0" stopColor="#DCE2EC" /><stop offset=".5" stopColor="#A9B3C5" /><stop offset="1" stopColor="#C6CEDB" /></linearGradient>
        <linearGradient id="d-foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F4F7FB" /><stop offset=".6" stopColor="#C9D1E0" /><stop offset="1" stopColor="#A3ADC2" /></linearGradient>
        <linearGradient id="d-lid" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9AA5B8" /><stop offset="1" stopColor="#6F7A8E" /></linearGradient>
      </defs>
      {/* body: curved sides tapering to an oval base */}
      <path d={`M116 306Q120 384 150 430${ovalFront(300, 430, 150, 46)}Q480 384 484 306Z`} fill="url(#d-body)" stroke="rgba(244,247,251,.5)" />
      {/* blank label panel wrapped round the front */}
      <path d="M126 352Q300 396 474 352L466 398Q300 446 134 398Z" fill="rgba(244,247,251,.5)" />
      <path d={oval(300, 307, 187, 59)} fill="#8E99AD" stroke="rgba(244,247,251,.5)" />
      {rim && <path d={oval(300, 312, 200, 65)} fill="none" stroke={CYAN} strokeWidth="3" />}
      <path className="part" d={oval(300, 300, 187, 59)} fill="url(#d-foil)" stroke={lit('foil') ? CYAN : 'transparent'} strokeWidth="5" />
      <path d={oval(300, 300, 170, 52)} fill="none" stroke="rgba(6,9,18,.14)" />
      {/* the tab sits a little lower than on a round rim, where the oval's corner curves away */}
      <g transform="translate(2 7)">
        <path
          className="part"
          d={TAB_PATH}
          fill={lit('tab') ? CYAN : '#0E5F73'}
          stroke={CYAN}
          strokeWidth={2 / scale}
          style={{
            transformOrigin: '405px 347px',
            transform: `scale(${scale})`,
            filter: lit('tab') ? 'drop-shadow(0 0 6px rgba(34,228,255,.9))' : 'none',
          }}
        />
      </g>
      {/* grey overcap, lifted off the tub, with a blank oval label panel on top */}
      <path className="part" d={`M106 130${ovalFront(300, 152, 194, 61)}V130Z`} fill="#667186" stroke={lit('lid') ? CYAN : edge} strokeWidth={lit('lid') ? 2.5 : 1} />
      <path className="part" d={oval(300, 130, 194, 61)} fill="url(#d-lid)" stroke={lit('lid') ? CYAN : 'rgba(244,247,251,.6)'} strokeWidth={lit('lid') ? 2.5 : 1} />
      <ellipse cx="300" cy="128" rx="112" ry="32" fill="#F4F7FB" opacity=".92" />
      <ellipse cx="300" cy="128" rx="100" ry="27" fill="none" stroke="rgba(6,9,18,.14)" />
      {sticker && (
        <>
          {/* A small sticker on the side of the tub, secondary to the brand's own artwork on the lid. */}
          <g transform="translate(252 422) scale(.92 1)">
            <circle r="20" fill="#F4F7FB" stroke="rgba(6,9,18,.35)" />
            <use href="#mark" x="-11" y="-11" width="22" height="22" />
          </g>
          <g fill={CYAN} stroke={CYAN}>
            <path d="M114 394L232 416" fill="none" />
            <text x="8" y="392" fontSize="15" stroke="none">Kind to hands</text>
          </g>
        </>
      )}
      {labels && LABELS.map((l) => (
        <g key={l.part} className="part label" fill={lit(l.part) ? CYAN : '#A3ADC2'} stroke={lit(l.part) ? CYAN : 'rgba(244,247,251,.35)'}>
          <path d={l.line} fill="none" />
          <text x={l.x} y={l.y} textAnchor={l.anchor} fontSize="15" stroke="none">{l.text}</text>
        </g>
      ))}
    </svg>
  );
}
