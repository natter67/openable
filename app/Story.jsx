import Link from 'next/link';
import {
  DIMENSIONS, FILE_TYPES, GAPS, LEVELS, OPTIONS, PROCESS, STATUS, STEPS, TAB, TAB_AREA,
  Tub, addedSales, bigMoney, money, pctOfGuideline, tally,
} from './demo/shared';

// Landing-page walkthrough: static captures of the six demo steps, built from the same data as /demo
// so the two cannot drift apart. Nothing in here is interactive.
const SELECTED = OPTIONS.find((o) => o.key === 'moderate');
const touched = PROCESS.filter((p) => SELECTED.needs[p.key]).length;

const SCREENS = [
  // Import
  <>
    <div className="drop">
      <h3>Drop your packaging file here</h3>
      <p>CAD model, spec sheet or print file.</p>
      <div className="btn-row">
        <span className="btn btn-secondary">Browse files</span>
        <span className="btn btn-primary">Use the sample pack</span>
      </div>
    </div>
    {FILE_TYPES.map((t) => (
      <div className="row" key={t.label}><span className="k">{t.label}</span><span className="v">{t.value}</span></div>
    ))}
  </>,

  // Dimensions
  <>
    <div className="force">
      <div>
        <div className="l">Pull force</div>
        <div className="n">15.5–20.0 <small>N</small></div>
      </div>
      <span className="chip above">Above limit</span>
    </div>
    {DIMENSIONS.map((d) => (
      <div className="row" key={d.label}><span className="k">{d.label}</span><span className="v">{d.value}</span><span className="chip">Imported</span></div>
    ))}
    <div className="row"><span className="k">Tab area</span><span className="v">{TAB_AREA} mm²</span><span className="chip meets">Calculated</span></div>
    <div className="row"><span className="k">Of guideline tab size</span><span className="v">{pctOfGuideline(TAB_AREA)}%</span><span className="chip meets">Calculated</span></div>
  </>,

  // Manufacturing changes
  <>
    {PROCESS.map((p) => (
      <div className="process" key={p.key}>
        <div>{p.name}<small>{p.machine}</small></div>
        <div className="seg">
          {LEVELS.map((l, i) => <span key={l} className={i === p.level ? 'on' : ''}>{l}</span>)}
        </div>
      </div>
    ))}
    <div className="budget-box"><span>Total budget</span><span className="budget">$50,000</span></div>
  </>,

  // Guideline gaps
  <>
    <div className="tally">
      {['above', 'below', 'meets'].map((status) => (
        <div key={status} className={status}><b>{tally(status)}</b>{STATUS[status]}</div>
      ))}
    </div>
    {GAPS.map((g) => (
      <div key={g.label} className={`gap ${g.status}`}>
        <span className="top">
          <span>{g.label}<small>{g.value}</small></span>
          <span className={`chip ${g.status}`}>{STATUS[g.status]}</span>
        </span>
        {g.meter != null && (
          <>
            <span className="meter"><i style={{ width: `${g.meter}%` }}></i></span>
            <small>{g.meter}% of guideline size</small>
          </>
        )}
      </div>
    ))}
  </>,

  // Fix options
  <div className="designs">
    {OPTIONS.map((o) => (
      <div key={o.key} className={`design${o === SELECTED ? ' on' : ''}`}>
        <Tub highlight="tab" tabArea={o.tabArea} rim={o.rim} labels={false} />
        <span className="name">{o.name}{o === SELECTED ? ', selected' : ''}</span>
        <span className="cost">{money(o.cost)}</span>
        <span className="note">{o.summary}</span>
        <span className="note">Tab at {pctOfGuideline(o.tabArea)}% of guideline size</span>
        <span className="note">Adds {bigMoney(addedSales(o))} a year in sales</span>
      </div>
    ))}
  </div>,

  // Report
  <div className="paper">
    <h3>Easy-open redesign summary</h3>
    <p>8 oz tub, peel tab {TAB.width} × {TAB.length} mm</p>
    <div className="row"><span className="k">Selected design</span><span className="v">{SELECTED.name}, {money(SELECTED.cost)}</span></div>
    <div className="row"><span className="k">Gaps found</span><span className="v">{tally('below') + tally('above')} of {GAPS.length} checks</span></div>
    <div className="row"><span className="k">Tab size</span><span className="v">{pctOfGuideline(TAB_AREA)}% → {pctOfGuideline(SELECTED.tabArea)}% of guideline</span></div>
    <div className="row"><span className="k">Line untouched</span><span className="v">{PROCESS.length - touched} of {PROCESS.length} steps</span></div>
    <div className="row"><span className="k">Sales lift</span><span className="v">{SELECTED.lift}% of yearly sales</span></div>
    <div className="big">{bigMoney(addedSales(SELECTED))}</div>
    <p>Added yearly sales, based on Kind to hands label branding and buyer appeal.</p>
    <span className="btn btn-primary">Export full report</span>
    <p className="fine">Demo figures for the sample pack.</p>
  </div>,
];

export default function Story() {
  return (
    <section id="product" className="story">
      <div className="container story-grid">
        <div className="story-side">
          <h2>From your pack to a fix.</h2>
          <p className="lead">Six steps from the package you have to a report your team can use.</p>
          <div className="story-list">
            {STEPS.map((s) => (
              <button type="button" key={s.tab}><span className="t">{s.title}</span><span className="d">{s.line}</span></button>
            ))}
          </div>
          <Link className="btn btn-primary story-cta story-cta-side" href="/demo">Try it yourself</Link>
        </div>
        <div className="story-gallery">
          {STEPS.map((s, i) => (
            <article className="step" key={s.tab}>
              <div className="step-copy">
                <h3>{s.title}</h3>
                <p className="lead">{s.line}</p>
              </div>
              <div className="screen">
                <div className="bar">{s.tab}</div>
                <div className="body">{SCREENS[i]}</div>
              </div>
            </article>
          ))}
          <Link className="btn btn-primary story-cta story-cta-end" href="/demo">Try it yourself</Link>
        </div>
      </div>
    </section>
  );
}
