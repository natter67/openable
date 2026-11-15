import Link from 'next/link';
import {
  ADVANTAGE, ADVANTAGE_NOTE, ASK, BREAK_EVEN, MARKET_BASIS, MARKET_NOTE, MARKET_ROWS, PATH_NOTE, PATH_STEPS,
  RISKS, RIVALRY, RIVALRY_SRC, ROI_NOTE, ROI_ROWS, SOURCES,
} from './data';

export const metadata = { title: 'OpenAble metrics' };

// The numbers the pitch speaks to, in the order it uses them:
// the prize for the brand, the market, the competition and how we keep our advantage, then the growth path.
// All figures come from app/metrics/data.js.
const Pillars = ({ items, className = '' }) => (
  <div className={`pillars ${className}`}>
    {items.map((item) => (
      <div className="pillar" key={item.title}>
        <h3>{item.title}</h3>
        <p>{item.line}</p>
      </div>
    ))}
  </div>
);

// A dense table: `cols` is the CSS grid-template-columns value, `head` the column names, `rows` arrays of cells.
const Table = ({ cols, head, rows }) => (
  <div className="dtable" style={{ '--cols': cols }}>
    <div className="r h">{head.map((h) => <span key={h}>{h}</span>)}</div>
    {rows.map((cells, i) => (
      <div className="r" key={i}>{cells.map((cell, j) => <span key={j}>{cell}</span>)}</div>
    ))}
  </div>
);

// TAM, SAM and SOM as nested circles. Not to scale: at true scale the SOM circle would be too small to see.
const RINGS = [
  { cy: 260, r: 250, y: 62, fill: 'rgba(31,91,255,.16)', stroke: 'rgba(31,91,255,.7)' },
  { cy: 340, r: 170, y: 212, fill: 'rgba(31,91,255,.3)', stroke: 'rgba(34,228,255,.55)' },
  { cy: 415, r: 95, y: 392, fill: 'rgba(34,228,255,.22)', stroke: '#22E4FF' },
];
const MarketDiagram = () => (
  <svg className="market-diagram" viewBox="0 0 520 520" role="img" aria-label={`Nested circles, not to scale: ${MARKET_ROWS.map((r) => `${r.tier} ${r.value}`).join('; ')}`}>
    {RINGS.map((ring, i) => (
      <g key={i} textAnchor="middle">
        <circle cx="260" cy={ring.cy} r={ring.r} fill={ring.fill} stroke={ring.stroke} strokeWidth="1.5" />
        <text x="260" y={ring.y} fontSize="17" fill="#A3ADC2">{MARKET_ROWS[i].tier.split(',')[0]}</text>
        <text x="260" y={ring.y + 40} fontSize="38" fontWeight="600" letterSpacing="-1" fill="#F4F7FB">{MARKET_ROWS[i].value}</text>
      </g>
    ))}
  </svg>
);

export default function Metrics() {
  return (
    <>
      <header className="nav is-scrolled">
        <div className="container nav-inner">
          <Link className="logo" href="/" aria-label="OpenAble home"><svg width="24" height="24" aria-hidden="true"><use href="#mark" /></svg>OpenAble</Link>
          <nav className="nav-links" aria-label="Metrics sections">
            <a href="#business">The prize</a>
            <a href="#market">Market</a>
            <a href="#competition">Competition</a>
            <a href="#growth">Growth</a>
          </nav>
          <Link className="btn btn-primary" href="/demo">Open demo</Link>
        </div>
      </header>

      <main>
        <section className="container metrics-top">
          <h1>The numbers behind OpenAble.</h1>
          <p className="lead">Every figure we use, with where it comes from.</p>
        </section>

        <section id="business" className="container">
          <h2 className="center">The prize is more customers.</h2>
          <Table
            cols=".8fr 1fr 1.2fr 1.2fr"
            head={['Sales lift', 'Extra tubs a year', 'Added sales to the brand', 'Profit after costs']}
            rows={ROI_ROWS.map(([lift, tubs, sales, profit]) => [lift, tubs, sales, <b key="p">{profit}</b>])}
          />
          <p className="lead center pricing">Break-even at a {BREAK_EVEN} lift.</p>
          <p className="stat-src center">{ROI_NOTE}</p>
        </section>

        <section id="market" className="container">
          <h2 className="center">TAM, SAM, SOM: every product a brand sells.</h2>
          <MarketDiagram />
          <div className="ledger">
            {MARKET_ROWS.map((r) => (
              <div className="ledger-row" key={r.tier}><span>{r.tier}</span><span>{r.who}</span><span>{r.value}</span></div>
            ))}
          </div>
          <p className="stat-src center">{MARKET_NOTE}</p>
          <ul className="basis">
            {MARKET_BASIS.map((b) => <li key={b.label}><b>{b.label}:</b> {b.line}</li>)}
          </ul>
        </section>

        <section id="competition" className="container">
          <h2 className="center">Nobody helps brands fix the opening before tooling.</h2>
          <p className="lead center">{RIVALRY} That makes competition our one real risk.</p>
          <Table
            cols="1.2fr 1.6fr 1.6fr"
            head={['Competitor', 'Why they are a risk', 'What they lack']}
            rows={RISKS.map((r) => [r.name, r.does, r.lacks])}
          />
          <p className="stat-src center">{RIVALRY_SRC}</p>
          <h3 className="center sub-head">How we keep our advantage.</h3>
          <Pillars items={ADVANTAGE} className="two" />
          <p className="stat-src center">{ADVANTAGE_NOTE}</p>
        </section>

        <section id="growth" className="container">
          <h2 className="center">Prove one seal. Then expand across a portfolio.</h2>
          <Pillars items={PATH_STEPS} className="four" />
          <p className="stat-src center">{PATH_NOTE}</p>
        </section>

        <section className="closing">
          <div className="glow" aria-hidden="true"></div>
          <div className="container">
            <h2>Start with one package.</h2>
            <p className="lead">{ASK}</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/demo">Open the demo</Link>
              <Link className="btn btn-secondary" href="/">Back to site</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="container">
        <div className="footer">
          <p className="fine">Sources: {SOURCES}</p>
          <p className="fine">Not affiliated with Kraft Heinz. Costs and profit per tub are estimates, not Kraft Heinz data or supplier quotes.</p>
        </div>
      </footer>
    </>
  );
}
