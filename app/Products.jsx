// Hero carousel: six packs drawn in one style, each with the part that needs fixing in cyan.
// Gradients and the blur filter (#g-body, #g-foil, #g-blur) are defined once in ProductDefs.
// When the visitor's hand cursor is over a product, its `act-*` part sticks and jerks, grows, then opens (see globals.css).

const LINE = 'rgba(244,247,251,.3)';
const CYAN = '#22E4FF';

// Draws the problem part twice: a blurred pulsing copy behind, a solid copy on top.
function Glow({ children }) {
  return (
    <>
      <g className="tab-glow" filter="url(#g-blur)">{children}</g>
      {children}
    </>
  );
}

function Tub() {
  return (
    <g transform="translate(0 20) scale(.5)">
      <path d="M118 306L150 430A150 46 0 0 0 450 430L482 306Z" fill="url(#g-body)" stroke={LINE} strokeWidth="2" />
      <ellipse cx="300" cy="307" rx="185" ry="58" fill="#1E2942" stroke={LINE} strokeWidth="2" />
      <ellipse cx="300" cy="300" rx="185" ry="58" fill="url(#g-foil)" />
      <ellipse cx="300" cy="300" rx="168" ry="51" fill="none" stroke="rgba(6,9,18,.14)" strokeWidth="2" />
      <Glow><path className="act act-tab" d="M388 350L422 342L432 364Q433 372 425 373L404 378Q396 379 393 371Z" fill={CYAN} /></Glow>
      <g className="lid">
        <path d="M108 130V152A192 60 0 0 0 492 152V130" fill="rgba(244,247,251,.05)" stroke="rgba(244,247,251,.4)" strokeWidth="2" />
        <ellipse cx="300" cy="130" rx="192" ry="60" fill="rgba(244,247,251,.07)" stroke="rgba(244,247,251,.6)" strokeWidth="2" />
        <path d="M150 112A170 51 0 0 1 250 82" fill="none" stroke="rgba(244,247,251,.7)" strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>
  );
}

function Jar() {
  return (
    <>
      <path d="M92 118Q92 100 106 96H194Q208 100 208 118V240Q208 264 186 264H114Q92 264 92 240Z" fill="rgba(244,247,251,.06)" stroke="rgba(244,247,251,.45)" />
      <path d="M98 140H202V240Q202 258 186 258H114Q98 258 98 240Z" fill="url(#g-body)" />
      <rect x="92" y="168" width="116" height="52" fill="url(#g-foil)" opacity=".92" />
      <g className="act act-lid">
        <Glow>
          <path d="M98 62A52 11 0 0 1 202 62V88A52 11 0 0 1 98 88Z" fill={CYAN} />
        </Glow>
        <ellipse cx="150" cy="62" rx="52" ry="11" fill="#9FF4FF" />
        <g clipPath="url(#g-clip-lid)">
          <path className="twist" style={{ '--tw': '42px' }} d="M63 72V100M77 72V100M91 72V100M105 72V100M119 72V100M133 72V100M147 72V100M161 72V100M175 72V100M189 72V100M203 72V100" stroke="rgba(6,9,18,.3)" strokeWidth="2" />
        </g>
      </g>
    </>
  );
}

function Carton() {
  return (
    <>
      <path d="M92 124L172 136V266L92 250Z" fill="url(#g-body)" stroke={LINE} />
      <path d="M172 136L214 120V248L172 266Z" fill="#141B2D" stroke={LINE} />
      <path d="M92 124L172 136L162 90L104 82Z" fill="#26324F" stroke={LINE} />
      <path d="M172 136L214 120L200 80L162 90Z" fill="#1A2340" stroke={LINE} />
      <path d="M104 82L162 90L200 80L198 66L161 76L103 68Z" fill="#33416B" stroke={LINE} />
      <rect x="92" y="172" width="80" height="46" transform="skewY(8.5) translate(0 -14)" fill="url(#g-foil)" opacity=".9" />
      <g className="act act-cap">
        <Glow>
          <path d="M119 104A16 8 0 0 1 151 108V116A16 8 0 0 1 119 112Z" fill={CYAN} />
        </Glow>
        <g clipPath="url(#g-clip-cap)">
          <path className="twist" style={{ '--tw': '18px' }} d="M104 106V120M110 106V120M116 106V120M122 106V120M128 106V120M134 106V120M140 106V120M146 106V120M152 106V120" stroke="rgba(6,9,18,.35)" strokeWidth="1.5" />
        </g>
        <ellipse cx="135" cy="106" rx="16" ry="8" fill="#9FF4FF" transform="rotate(7 135 106)" />
      </g>
    </>
  );
}

function Can() {
  return (
    <>
      <path d="M84 104V236A66 20 0 0 0 216 236V104Z" fill="url(#g-body)" stroke={LINE} />
      <path d="M84 142A66 20 0 0 0 216 142V204A66 20 0 0 1 84 204Z" fill="rgba(244,247,251,.08)" />
      <ellipse cx="150" cy="104" rx="66" ry="20" fill="url(#g-foil)" />
      <ellipse cx="150" cy="104" rx="56" ry="15.5" fill="none" stroke="rgba(6,9,18,.16)" />
      <Glow>
        <g className="act act-ring" fill="none" stroke={CYAN} strokeWidth="4.5">
          <ellipse cx="170" cy="106" rx="17" ry="7" />
          <path d="M140 103H153" strokeLinecap="round" />
        </g>
      </Glow>
    </>
  );
}

function Pouch() {
  return (
    <>
      <path d="M100 66H200L214 248Q150 270 86 248Z" fill="url(#g-body)" stroke={LINE} />
      <path className="act act-tear" d="M100 66H200L201.500 86H98.500Z" fill="url(#g-foil)" />
      <rect x="116" y="128" width="68" height="68" rx="12" fill="rgba(244,247,251,.08)" stroke="rgba(244,247,251,.14)" />
      <path d="M90 234Q150 254 210 234" fill="none" stroke="rgba(244,247,251,.18)" />
      <Glow>
        <g>
          <path d="M97 84L112 93L96 102Z" fill={CYAN} />
          <path d="M116 93H203" fill="none" stroke={CYAN} strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" />
        </g>
      </Glow>
    </>
  );
}

function Tray() {
  return (
    <>
      <path d="M48 150L118 200L252 164V190L120 232L50 180Z" fill="url(#g-body)" stroke={LINE} />
      <path d="M48 150L182 116L252 164L118 200Z" fill="url(#g-foil)" />
      <path d="M68 151L180 123L232 161L120 190Z" fill="none" stroke="rgba(6,9,18,.14)" />
      <g className="act act-film">
        <Glow>
          <path d="M118 200L150 191L140 166L106 176Z" fill={CYAN} />
        </Glow>
        <path d="M106 176L140 166L132 178L112 184Z" fill="#9FF4FF" />
      </g>
    </>
  );
}

// The tub sits fourth so the track can start with it just right of centre (see .marquee-track)
// and still have three products filling the screen to its left.
// `hard` and `easy` caption the two halves of the opening animation: the struggle with today's part, then the fixed one.
export const PRODUCTS = [
  { name: 'Can', part: 'Ring pull', Art: Can, hard: 'Flat ring, hard to lift', easy: 'Raised ring, easy to pull' },
  { name: 'Pouch', part: 'Tear notch', Art: Pouch, hard: 'Small notch, hard to tear', easy: 'Bigger notch, easy to tear' },
  { name: 'Tray', part: 'Film corner', Art: Tray, hard: 'Small corner, hard to peel', easy: 'Bigger corner, easy to peel' },
  { name: 'Tub', part: 'Peel tab', Art: Tub, hard: 'Small tab, hard to grip', easy: 'Larger tab, easy to peel' },
  { name: 'Jar', part: 'Twist lid', Art: Jar, hard: 'Smooth lid, hard to twist', easy: 'Taller grip, easy to twist' },
  { name: 'Carton', part: 'Screw cap', Art: Carton, hard: 'Small cap, hard to turn', easy: 'Larger cap, easy to turn' },
];

export function ProductDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="g-body" x1="0" x2="1"><stop offset="0" stopColor="#2A3760" /><stop offset=".55" stopColor="#141B2D" /><stop offset="1" stopColor="#222C4A" /></linearGradient>
        <linearGradient id="g-foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F4F7FB" /><stop offset=".6" stopColor="#C9D1E0" /><stop offset="1" stopColor="#A3ADC2" /></linearGradient>
        <filter id="g-blur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7" /></filter>
        <clipPath id="g-clip-lid"><path d="M98 62A52 11 0 0 1 202 62V88A52 11 0 0 1 98 88Z" /></clipPath>
        <clipPath id="g-clip-cap"><path d="M119 104A16 8 0 0 1 151 108V116A16 8 0 0 1 119 112Z" /></clipPath>
      </defs>
    </svg>
  );
}

// The set is rendered three times so the track can loop seamlessly on wide screens; the copies are hidden from assistive tech.
export default function ProductCarousel() {
  return (
    <>
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1, 2].map((copy) => PRODUCTS.map(({ name, part, Art, hard, easy }) => (
            <figure className="product" key={`${copy}-${name}`} aria-hidden={copy > 0}>
              <svg viewBox="0 0 300 290" role="img" aria-label={`${name} with its ${part.toLowerCase()} highlighted`}><Art /></svg>
              <figcaption>{name}<span>{part}</span></figcaption>
              <span className="verdict hard chip below">{hard}</span>
              <span className="verdict easy chip meets">{easy}</span>
            </figure>
          )))}
        </div>
      </div>
      <div className="marquee-nav">
        <button type="button" data-dir="prev" aria-label="Previous product"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.500 6L8.500 12L14.500 18" /></svg></button>
        <button type="button" data-dir="next" aria-label="Next product"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.500 6L15.500 12L9.500 18" /></svg></button>
      </div>
    </>
  );
}
