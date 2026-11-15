import Link from 'next/link';
import Effects from './Effects';
import ProductCarousel, { ProductDefs } from './Products';
import Story from './Story';
import { GUIDELINE_AREA, TAB, TAB_AREA, Tub, pctOfGuideline } from './demo/shared';

export default function Page() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="logo" href="#top" aria-label="OpenAble home"><svg width="24" height="24" aria-hidden="true"><use href="#mark"/></svg>OpenAble</a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#how">How it works</a>
            <a href="#product">Product</a>
            <Link href="/metrics">Metrics</Link>
          </nav>
          <Link className="btn btn-primary" href="/demo">Open demo</Link>
        </div>
      </header>

      <main id="top">

      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <h1>Access for every appetite.</h1>
            <p className="lead">Check a package against easy-open guidelines. Get three ways to fix it.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/demo">Open the demo</Link>
              <a className="btn btn-secondary" href="#how">See how it works</a>
            </div>
          </div>
        </div>
        <div className="hero-art">
          <div className="glow" aria-hidden="true"></div>
          <ProductDefs />
          <ProductCarousel />
        </div>
      </section>

      <section id="metrics" className="container metrics">
        <div>
          <h2>Hard to open is a measured problem.</h2>
          <p className="lead">Brands learn a pack is hard to open after launch, from complaints, when changes are expensive.</p>
          <Link className="btn btn-secondary metrics-cta" href="/metrics">See all the numbers</Link>
        </div>
        <div>
          <div className="stat">
            <div className="stat-num"><span data-count="90">90</span>%</div>
            <p className="stat-label">of people with arthritis often need help opening packaging</p>
            <p className="stat-src">Arthritis Foundation 2024, self-reported</p>
          </div>
          <div className="stat">
            <div className="stat-num"><span data-count="72">72</span>%</div>
            <p className="stat-label">of consumers would switch brands for a product or package that is easier to use</p>
            <p className="stat-src">Arthritis Foundation surveys, per vice president Deb Gokie in Packaging Dive, 2023</p>
          </div>
          <div className="stat">
            <div className="stat-num"><span data-count="15">15</span>%</div>
            <p className="stat-label">of the recommended tab size on the 8 oz cream cheese tub we measured</p>
            <p className="stat-src">Team measurement, informal; Arthritis Australia guideline 10</p>
          </div>
        </div>
      </section>

      <section id="live" className="container live">
        <div className="live-art"><Tub highlight="tab" tabArea={TAB_AREA} /></div>
        <div>
          <h2>See it live: one tub, one tab.</h2>
          <p className="lead">The peel tab on this 8 oz cream cheese tub is a fraction of the size the guideline asks for.</p>
          <div className="live-facts">
            <div><div className="live-num">{TAB.width} × {TAB.length} mm</div><p className="stat-label">The tab we measured</p></div>
            <div><div className="live-num">12 × 20 mm</div><p className="stat-label">The published guideline</p></div>
            <div><div className="live-num">{pctOfGuideline(TAB_AREA)}%</div><p className="stat-label">Of the recommended grip area, {TAB_AREA} of {GUIDELINE_AREA} mm²</p></div>
          </div>
          <p className="stat-src">Team measurement, informal; Arthritis Australia guideline 10</p>
        </div>
      </section>

      <section id="how" className="container">
        <h2 className="center">One package in. Three fixes out.</h2>
        <div className="cards">
          <article className="card">
            <div className="well">
              <div className="field"><span>Tab</span><span>3 × 12 mm</span></div>
              <div className="field"><span>Overcap clearance</span><span>2 mm</span></div>
            </div>
            <h3>Bring your package. We find the gaps.</h3>
            <p>Dimensions in, guideline checks out.</p>
          </article>
          <article className="card">
            <div className="well">
              <div className="pills"><span className="pill">Low</span><span className="pill on">Moderate</span><span className="pill">Full access</span></div>
            </div>
            <h3>Set your limits. Pick a fix.</h3>
            <p>Three options that fit your tooling and budget.</p>
          </article>
          <article className="card">
            <div className="well">
              <div className="field"><span>Tab length</span><span>13 mm</span></div>
              <div><span className="chip meets">Clearance OK</span></div>
            </div>
            <h3>Refine it and hand it off.</h3>
            <p>Edit the new dimensions, download the spec.</p>
          </article>
        </div>
      </section>

      <Story />

      <section id="research" className="container">
        <h2 className="center">Every check traces back to research.</h2>
        <div className="pillars">
          <div className="pillar">
            <h3>Guidelines in.</h3>
            <p>Targets come from Arthritis Foundation and Arthritis Australia research.</p>
          </div>
          <div className="pillar">
            <h3>Measurements added.</h3>
            <p>Each package we screen grows a dataset nobody else holds.</p>
          </div>
          <div className="pillar">
            <h3>Research supported.</h3>
            <p>What we learn goes back to the people studying hard-to-open packaging.</p>
          </div>
        </div>
      </section>

      <section id="label" className="container label">
        <div>
          <h2>A label shoppers can look for.</h2>
          <p className="lead">Packs that pass every check can carry the Kind to hands mark.</p>
          <div className="label-row" aria-label="Kind to hands sits alongside labels shoppers already know">
            <span className="pill">Organic</span><span className="pill">Wild caught</span><span className="pill">Responsibly farmed</span><span className="pill ours">Kind to hands</span>
          </div>
        </div>
        <svg className="seal" viewBox="0 0 240 240" role="img" aria-label="Round Kind to hands sticker with the OpenAble hand mark">
          <circle cx="120" cy="120" r="116" fill="#F4F7FB"/>
          <circle cx="120" cy="120" r="106" fill="none" stroke="rgba(6,9,18,.18)" strokeWidth="1.5" strokeDasharray="2 5"/>
          <use href="#mark" x="82" y="50" width="76" height="76"/>
          <text x="120" y="170" fontSize="27" letterSpacing="-.8" textAnchor="middle">Kind to hands</text>
        </svg>
      </section>

      <section id="start" className="closing">
        <div className="glow" aria-hidden="true"></div>
        <div className="container">
          <h2>Start with one package.</h2>
          <p className="lead">A $5,000 study screens one pack and returns three options.</p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/demo">Open the demo</Link>
            <a className="btn btn-secondary" href="mailto:hello@example.com">Request a study</a>
          </div>
        </div>
      </section>

      </main>

      <footer className="container">
        <div className="footer">
          <div className="footer-top">
            <a className="logo" href="#top" aria-label="OpenAble home"><svg width="24" height="24" aria-hidden="true"><use href="#mark"/></svg>OpenAble</a>
            <nav className="nav-links" aria-label="Footer">
              <a href="#how">How it works</a>
              <a href="#product">Product</a>
              <Link href="/metrics">Metrics</Link>
            </nav>
          </div>
          <p>Kearney PERLab × UIUC AI Entrepreneurship Hackathon</p>
          <p className="fine">Pilot reference: Philadelphia Original 8 oz tub. Not affiliated with Kraft Heinz. Demo values from an informal team measurement; concept values, not CAD.</p>
        </div>
      </footer>
      <Effects />
    </>
  );
}
