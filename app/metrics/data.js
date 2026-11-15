// Every figure on the /metrics page, with its source.
// The page holds only what the pitch speaks to: the prize for the brand, the market, the competition.
// This file is self-contained: the landing page and /demo do not read from it.

// The prize: what a small sales lift on Kraft Heinz soft cream cheese is worth.
// Base 141M tubs a year. Extra tubs = 141M x lift. Added sales = extra tubs x $1.79 (the demo's price per tub).
// Profit after costs = extra tubs x $0.82 - $154,000.
// $154,000 = $13,000 one-time + 141M x $0.001 per tub + $3,000 study - $3,000 of avoided testing.
// Break-even lift = $154,000 / (141M x $0.82) = 0.133%.
export const ROI_ROWS = [
  ['0.25%', '352,500', '$631k', '+$135k'],
  ['0.5%', '705,000', '$1.26M', '+$424k'],
  ['1%', '1.41M', '$2.52M', '+$1.0M'],
];
export const BREAK_EVEN = '0.133%';
export const ROI_NOTE = 'A scenario, not a forecast. 141M Kraft Heinz soft cream cheese tubs a year (Circana, company-level). Sales at $1.79 a tub to the brand; profit at $0.82 per added tub, the low end of our researched range of $0.82 to $1.36. First-year cost $154,000: the Moderate tab change across every tub, plus our $3,000 study.';

// Market size = organizations x products each x $3,000 per product.
// TAM 5,397 x 50 x $3,000 = $809.6M. SAM 1,127 x 50 x $3,000 = $169.1M. SOM 10 x 20 x $3,000 = $600k.
export const MARKET_ROWS = [
  { tier: 'TAM, total market', who: '5,397 US packaged-goods organizations, about 270,000 products', value: '$810M' },
  { tier: 'SAM, reachable market', who: '1,127 food and beverage organizations, about 56,000 products', value: '$169M' },
  { tier: 'SOM, year 5', who: '10 brands, 20 products each', value: '$600k' },
];
export const MARKET_NOTE = 'Market sizing built with Velocity AI, then repriced per product by us. Circles are not to scale. Each product is counted once, so these are one-time totals, not yearly revenue.';
// How each layer is worked out, and where each input comes from.
export const MARKET_BASIS = [
  { label: 'TAM', line: '5,397 organizations × 50 products × $3,000 = $809.6M, shown as $810M.' },
  { label: 'SAM', line: '1,127 food and beverage organizations × 50 products × $3,000 = $169.1M, shown as $169M.' },
  { label: 'SOM', line: '10 brands × 20 products × $3,000 = $600k by year 5. Our target, not a forecast.' },
  { label: 'Organization counts', line: 'From our Velocity AI top-down market sizing. Not re-verified.' },
  { label: '50 products per organization', line: 'Our assumption; no published average exists. Large brands carry thousands: Kraft Heinz cut more than 1,100 products, about 20% of its US and Canada range (Food Business News).' },
  { label: '$3,000 per product', line: 'Preliminary. Arthritis Australia charges A$3,190 for a comparable packaging review, and a US senior-friendly panel test runs about $8,000 per design.' },
  { label: 'Our cost', line: 'The tool costs about $0 to run today, and about $0 more for each further product.' },
];

// The one risk we name is the competition. Competitor wording follows the hackathon deck.
export const RIVALRY = 'No direct software rival. The substitutes are strong: guides, consultants and Arthritis Foundation certification.';
export const RIVALRY_SRC = 'Velocity AI competitive landscape (Five Forces). Competitor wording from the hackathon deck.';
export const RISKS = [
  { name: 'Public design guidelines', does: 'Published requirements, free for any brand to read.', lacks: 'No product-specific options or factory trade-offs.' },
  { name: 'Fraunhofer EasyReliablePeel', does: 'Predicts peel force from CAD and materials.', lacks: 'Not an end-to-end guideline and cost workflow.' },
  { name: 'Arthritis Foundation / IDARI', does: 'Physical testing with people.', lacks: 'Not early, manufacturing-aware screening.' },
  { name: 'Packaging CAD platforms', does: 'Geometry and drawings. A vendor could add a generic accessibility plug-in.', lacks: 'Accessibility rules and opening outcomes stay separate work.' },
];
export const ADVANTAGE = [
  { title: 'Exclusive data', line: 'We are pursuing data exclusivity contracts with the foundations we research with. That gives us first-hand data other companies cannot replicate.' },
  { title: 'A patent on the software', line: 'We are pursuing a patent. A review of the current patent space found nothing our filing should infringe on.' },
  { title: 'The pre-certification step', line: 'Become the step brands take before Arthritis Foundation certification.' },
  { title: 'Data rights in every pilot', line: 'Lock the paired dataset with data rights written into every pilot.' },
];
export const ADVANTAGE_NOTE = 'Patent space reviewed by a patent lawyer. The contracts and the patent are in progress, not secured. The last two are the top actions from our Velocity AI SWOT.';

// The roadmap: how one pilot grows. The pitch ends here, before the ask.
export const PATH_STEPS = [
  { title: 'One tub', line: 'Philadelphia Original 8 oz, the pilot.' },
  { title: 'One brand\'s range', line: 'The same fix across Kraft Heinz soft and whipped tubs.' },
  { title: 'Other food brands', line: 'Lids, caps, dips, sauces and trays.' },
  { title: 'Beyond food', line: 'Pharma, over-the-counter and beauty.' },
];
export const PATH_NOTE = 'Kraft Heinz is our target first customer, not a customer or partner.';

export const ASK = 'Our ask: a $3,000 study on one Philadelphia tub.';
export const SOURCES = 'Circana via Dairy Foods (tubs sold, 52 weeks to Feb 2026); Kraft Heinz filings and retailer prices (per-tub estimates, our research); Velocity AI canvases (market sizing, competitive landscape, SWOT); Food Business News; hackathon deck.';
