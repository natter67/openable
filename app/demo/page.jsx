'use client';
import Link from 'next/link';

import { useState } from 'react';

import { PRODUCTS, ProductDefs } from '../Products';

import {
  addedSales, bigMoney, CYAN, DIMENSIONS, extraUnits, FILE_TYPES, GAPS, GUIDELINE_AREA, LABELS, LEVEL_NAMES, LEVELS, MARKET, money, OPTIONS, OPTIONS_STEP, PACK_TYPES, pctOfGuideline, PROCESS, REPORT_STEP, round1, SAMPLE_FILE, STATUS, STEPS, SUMMARY, TAB, TAB_AREA, TAB_PATH, tally, Tub,
} from './shared';

export default function Demo() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [over, setOver] = useState(false);
  const [step, setStep] = useState(0);
  const [focus, setFocus] = useState(null);
  const [levels, setLevels] = useState(Object.fromEntries(PROCESS.map((p) => [p.key, p.level])));
  const [budget, setBudget] = useState(50000);
  const [picked, setPicked] = useState('moderate');
  const [openPack, setOpenPack] = useState('Tub');

  const loaded = file && !loading;

  // Why a design does not fit the line as configured, or null if it does.
  const blocked = (o) => {
    const short = PROCESS.find((p) => (o.needs[p.key] || 0) > levels[p.key]);
    if (short) return `Needs ${LEVEL_NAMES[o.needs[short.key]]} at ${short.name.toLowerCase()}`;
    if (o.cost > budget) return 'Over budget';
    return null;
  };
  const touched = (o) => PROCESS.filter((p) => o.needs[p.key]);
  const available = OPTIONS.filter((o) => !blocked(o));
  const option = available.find((o) => o.key === picked) || available[0] || null;
  const kept = PROCESS.filter((p) => levels[p.key] === 0).length;

  // With nothing selected, the tab is highlighted on Dimensions.
  const highlight = focus?.part || (step === 1 || step === REPORT_STEP ? 'tab' : null);

  const go = (n) => { setStep(n); setFocus(null); };

  // The demo cannot read real files: any file loads the sample pack's values.
  const load = (name) => {
    setFile(name);
    setLoading(true);
    setTimeout(() => { setLoading(false); go(1); }, 900);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) load(dropped.name);
  };

  // Full report as a CSV download: everything the walkthrough showed, not just the summary.
  const exportReport = () => {
    const rows = [
      ['Section', 'Item', 'Value', 'Note'],
      ['Package', 'File', file, ''],
      ['Package', 'Pack', '8 oz tub', ''],
      ['Dimensions', 'Pull force', '15.5–20.0 N', STATUS.above],
      ...DIMENSIONS.map((d) => ['Dimensions', d.label, d.value, 'Imported']),
      ['Dimensions', 'Tab area', `${TAB_AREA} mm²`, 'Calculated'],
      ['Dimensions', 'Of guideline tab size', `${pctOfGuideline(TAB_AREA)}%`, 'Calculated'],
      ...PROCESS.map((p) => ['Manufacturing', `${p.name} (${p.machine})`, LEVEL_NAMES[levels[p.key]], '']),
      ['Manufacturing', 'Total budget', money(budget), ''],
      ...GAPS.map((g) => ['Guideline gaps', g.label, g.value, STATUS[g.status]]),
      ...OPTIONS.map((o) => ['Designs', o.name, money(o.cost), `${blocked(o) || o.summary} Sales lift ${o.lift}%, ${bigMoney(addedSales(o))} a year.`]),
      ...(option ? [
        ['Selected design', 'Name', option.name, ''],
        ...option.changes.map((c) => ['Selected design', c.label, c.value, c.chip || '']),
        ...touched(option).map((t) => ['Selected design', `Line step: ${t.name}`, `${LEVELS[option.needs[t.key]]} change`, '']),
        ['Sales model', 'Tubs sold a year', `${MARKET.units} million`, ''],
        ['Sales model', 'Share of category', `${MARKET.share}%`, ''],
        ['Sales model', 'Price per tub', `$${MARKET.price}`, ''],
        ['Sales model', 'Buyer appeal lift', `${option.lift}%`, ''],
        ['Sales model', 'Extra tubs a year', `${round1(extraUnits(option))} million`, ''],
        ['Sales model', 'Added yearly sales', bigMoney(addedSales(option)), ''],
      ] : []),
      ['Note', 'Demo figures for the sample pack', '', ''],
    ];
    const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    // The BOM lets Excel read the arrows and superscripts correctly.
    const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'openable-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const dimensionRow = (item) => (
    <button
      type="button"
      key={item.label}
      className={`row${focus?.label === item.label ? ' sel' : ''}`}
      aria-pressed={focus?.label === item.label}
      onClick={() => setFocus(item)}
    >
      <span className="k">{item.label}</span><span className="v">{item.value}</span><span className="chip">Imported</span>
    </button>
  );

  const stageNote = () => {
    if (step === OPTIONS_STEP) return <span>Three designs</span>;
    if (step === REPORT_STEP && option) return <span className="focus"><b>{option.name} design</b></span>;
    if (focus) {
      return (
        <span className="focus">
          <b>{focus.label}</b>{focus.value}
          {focus.status && <span className={`chip ${focus.status}`}>{STATUS[focus.status]}</span>}
        </span>
      );
    }
    return <span>Detected: tub, peel tab</span>;
  };

  return (
    <>
      <header className="nav is-scrolled">
        <div className="container nav-inner">
          <Link className="logo" href="/" aria-label="OpenAble home"><svg width="24" height="24" aria-hidden="true"><use href="#mark" /></svg>OpenAble</Link>
          <Link className="btn btn-secondary" href="/">Back to site</Link>
        </div>
      </header>

      <ProductDefs />
      <main className="container demo">
        <div className="app">
          <div className="app-tabs" role="tablist" aria-label="Demo steps">
            {STEPS.map((s, i) => (
              <button type="button" role="tab" key={s.tab} aria-selected={i === step} disabled={i > 0 && !loaded} className={i === step ? 'on' : ''} onClick={() => go(i)}>
                <span className="n">{i + 1}</span>{s.tab}
              </button>
            ))}
          </div>

          <div className="app-main">
            <div className="stage">
              {!loaded ? (
                <div
                  className={`drop${over ? ' over' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setOver(true); }}
                  onDragLeave={() => setOver(false)}
                  onDrop={onDrop}
                >
                  {loading ? (
                    <>
                      <h2>Reading dimensions</h2>
                      <p>{file}</p>
                    </>
                  ) : (
                    <>
                      <h2>Drop your packaging file here</h2>
                      <p>CAD model, spec sheet or print file. This demo loads the sample pack for any file.</p>
                      <div className="btn-row">
                        <label className="btn btn-secondary">
                          Browse files
                          <input type="file" onChange={(e) => e.target.files[0] && load(e.target.files[0].name)} />
                        </label>
                        <button type="button" className="btn btn-primary" onClick={() => load(SAMPLE_FILE)}>Use the sample pack</button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="stage-head" aria-live="polite">
                    <span>{file}</span>
                    {stageNote()}
                  </div>

                  {step === OPTIONS_STEP ? (
                    <div className="designs">
                      {OPTIONS.map((o) => (
                        <button
                          type="button"
                          key={o.key}
                          disabled={!!blocked(o)}
                          aria-pressed={o.key === option?.key}
                          className={`design${o.key === option?.key ? ' on' : ''}`}
                          onClick={() => setPicked(o.key)}
                        >
                          <Tub highlight="tab" tabArea={o.tabArea} rim={o.rim} labels={false} />
                          <span className="name">{o.name}{o.key === option?.key ? ', selected' : ''}</span>
                          <span className="cost">{money(o.cost)}</span>
                          <span className="note">{blocked(o) || o.summary}</span>
                          <span className="note">Tab at {pctOfGuideline(o.tabArea)}% of guideline size</span>
                          <span className="note">Adds {bigMoney(addedSales(o))} a year in sales</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="stage-view">
                      <Tub
                        highlight={highlight}
                        tabArea={step === REPORT_STEP && option ? option.tabArea : TAB_AREA}
                        rim={step === REPORT_STEP && !!option?.rim}
                        sticker={step === REPORT_STEP && !!option}
                      />
                    </div>
                  )}

                  {step === REPORT_STEP && (
                    <div className="readouts">
                      <div className="readout main">
                        <div className="l">Added yearly sales</div>
                        <div className="n">{option ? bigMoney(addedSales(option)) : 'None'}</div>
                      </div>
                      <div className="readout">
                        <div className="l">Extra tubs a year</div>
                        <div className="n">{option ? round1(extraUnits(option)) : 0} <small>million</small></div>
                      </div>
                      <div className="readout">
                        <div className="l">Redesign cost</div>
                        <div className="n">{option ? money(option.cost) : 'None'}</div>
                      </div>
                    </div>
                  )}
                  {step < OPTIONS_STEP && (
                    <div className="readouts">
                      <div className="readout main">
                        <div className="l">Pull force<span className="chip above">Above limit</span></div>
                        <div className="n">15.5–20.0 <small>N</small></div>
                      </div>
                      <div className="readout">
                        <div className="l">Tab area</div>
                        <div className="n">{TAB_AREA} <small>mm²</small></div>
                      </div>
                      <div className="readout">
                        <div className="l">Of guideline tab size</div>
                        <div className="n">{pctOfGuideline(TAB_AREA)}<small>%</small></div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="side">
              <div className="side-head">
                <h1>{STEPS[step].title}</h1>
                <p>{STEPS[step].line}</p>
              </div>

              <div className="side-body">
                {step === 0 && (
                  <>
                    {FILE_TYPES.map((t) => (
                      <div className="row" key={t.label}><span className="k">{t.label}</span><span className="v">{t.value}</span></div>
                    ))}
                    {loaded && (
                      <div className="row">
                        <div>Loaded<small>{file}</small></div>
                        <button type="button" className="btn btn-secondary" onClick={() => { setFile(null); setFocus(null); }}>Replace file</button>
                      </div>
                    )}

                    <div className="group">Pack types we check</div>
                    {PACK_TYPES.map((t) => {
                      const { Art } = PRODUCTS.find((p) => p.name === t.name);
                      const open = openPack === t.name;
                      return (
                        <div key={t.name}>
                          <button type="button" className={`pack${open ? ' on' : ''}`} aria-expanded={open} onClick={() => setOpenPack(open ? null : t.name)}>
                            <svg viewBox="0 0 300 290" aria-hidden="true"><Art /></svg>
                            <span>{t.name}<small>{t.opening}</small></span>
                            {loaded && t.name === 'Tub' && <span className="chip meets">Detected</span>}
                          </button>
                          {open && (
                            <div className="pack-checks">
                              <div className="row"><span className="k">Key measurement</span><span className="v">{t.measure}</span></div>
                              {t.checks.map((c) => <div className="row" key={c}><span className="k">{c}</span><span className="chip">Checked</span></div>)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <p className="demo-note">This demo runs the full walkthrough for the tub.</p>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="force">
                      <div>
                        <div className="l">Pull force</div>
                        <div className="n">15.5–20.0 <small>N</small></div>
                      </div>
                      <span className="chip above">Above limit</span>
                    </div>
                    {DIMENSIONS.map(dimensionRow)}
                    <div className="row"><span className="k">Tab area</span><span className="v">{TAB_AREA} mm²</span><span className="chip meets">Calculated</span></div>
                    <div className="row"><span className="k">Of guideline tab size</span><span className="v">{pctOfGuideline(TAB_AREA)}%</span><span className="chip meets">Calculated</span></div>
                  </>
                )}

                {step === 2 && (
                  <>
                    {PROCESS.map((p) => (
                      <div className="process" key={p.key}>
                        <div>{p.name}<small>{p.machine}</small></div>
                        <div className="seg" role="group" aria-label={`${p.name}: allowed change`}>
                          {LEVELS.map((l, i) => (
                            <button type="button" key={l} aria-pressed={levels[p.key] === i} className={levels[p.key] === i ? 'on' : ''} onClick={() => setLevels({ ...levels, [p.key]: i })}>{l}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="budget-box">
                      <span>Total budget, $</span>
                      <input className="num wide" type="number" min="0" step="1000" aria-label="Total budget in dollars" value={budget} onChange={(e) => setBudget(Math.max(0, Number(e.target.value) || 0))} />
                    </div>
                    <p className="demo-note">{kept} of {PROCESS.length} steps stay as they are. {available.length} of {OPTIONS.length} designs fit this line.</p>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="tally">
                      {['above', 'below', 'meets'].map((status) => (
                        <div key={status} className={status}><b>{tally(status)}</b>{STATUS[status]}</div>
                      ))}
                    </div>
                    {GAPS.map((g) => (
                      <button
                        type="button"
                        key={g.label}
                        className={`gap ${g.status}${focus?.label === g.label ? ' sel' : ''}`}
                        aria-pressed={focus?.label === g.label}
                        onClick={() => setFocus(g)}
                      >
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
                      </button>
                    ))}
                  </>
                )}

                {step === OPTIONS_STEP && (option ? (
                  <>
                    <div className="group">{option.name} design, what changes</div>
                    {option.changes.map((c) => (
                      <div className="row" key={c.label}>
                        <span className="k">{c.label}</span><span className="v">{c.value}</span>
                        {c.chip && <span className="chip below">{c.chip}</span>}
                      </div>
                    ))}
                    <div className="group">On your line</div>
                    {PROCESS.map((p) => (
                      <div className="row" key={p.key}>
                        <span className="k">{p.name}</span>
                        {option.needs[p.key]
                          ? <span className="chip below">{LEVELS[option.needs[p.key]]} change</span>
                          : <span className="chip">Untouched</span>}
                      </div>
                    ))}
                    <p className="demo-note">{PROCESS.length - touched(option).length} of {PROCESS.length} steps untouched.</p>
                  </>
                ) : (
                  <p className="demo-note">No design fits your line yet. Open up a step in Manufacturing changes.</p>
                ))}

                {step === REPORT_STEP && (
                  <div className="paper">
                    <h3>Easy-open redesign summary</h3>
                    <p>8 oz tub, peel tab {TAB.width} × {TAB.length} mm</p>
                    {option ? (
                      <>
                        <div className="row"><span className="k">Selected design</span><span className="v">{option.name}, {money(option.cost)}</span></div>
                        <div className="row"><span className="k">Gaps found</span><span className="v">{tally('below') + tally('above')} of {GAPS.length} checks</span></div>
                        <div className="row"><span className="k">Tab size</span><span className="v">{pctOfGuideline(TAB_AREA)}% → {pctOfGuideline(option.tabArea)}% of guideline</span></div>
                        <div className="row"><span className="k">Line untouched</span><span className="v">{PROCESS.length - touched(option).length} of {PROCESS.length} steps</span></div>
                        <div className="row"><span className="k">Sales lift</span><span className="v">{option.lift}% of yearly sales</span></div>
                        <div className="big">{bigMoney(addedSales(option))}</div>
                        <p>Added yearly sales, based on Kind to hands label branding and buyer appeal.</p>
                      </>
                    ) : (
                      <p>No design fits your line yet.</p>
                    )}
                    <button type="button" className="btn btn-primary" onClick={exportReport}>Export full report</button>
                    <p className="fine">The export has every dimension, line setting, gap, design and sales figure. Demo figures for the sample pack.</p>
                  </div>
                )}
              </div>

              <div className="side-foot">
                <button type="button" className="btn btn-secondary" disabled={step === 0} onClick={() => go(step - 1)}>Back</button>
                {step < STEPS.length - 1
                  ? <button type="button" className="btn btn-primary" disabled={!loaded} onClick={() => go(step + 1)}>Next</button>
                  : <button type="button" className="btn btn-primary" onClick={() => go(0)}>Start over</button>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
