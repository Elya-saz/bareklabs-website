import { Link } from 'react-router'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'

const STATS = [
  { k: '342', l: 'TRADES LOGGED' },
  { k: '61.4%', l: 'HIT RATE' },
  { k: '+1.8R', l: 'AVG EXPECTANCY' },
  { k: '0', l: 'UNEXPLAINED LOSSES' },
]

function TrackCard({
  to, code, name, desc, stats, i,
}: {
  to: string; code: string; name: string; desc: string; stats: string[]; i: number
}) {
  const ref = useSpotlight<HTMLAnchorElement>()
  return (
    <Reveal delay={i * 100}>
      <Link ref={ref} to={to} className="spot-card group block border border-line p-8 transition-colors duration-300 hover:border-[#2e2e2e] md:p-12">
        <div className="flex items-start justify-between">
          <span className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{code}</span>
          <span className="font-mono-lab text-lg text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal">→</span>
        </div>
        <h2 className="mt-12 text-3xl font-medium tracking-tight transition-colors group-hover:text-signal md:text-5xl">{name}</h2>
        <p className="mt-5 max-w-md font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{desc}</p>
        <div className="mt-10 flex flex-wrap gap-2">
          {stats.map((s) => (
            <span key={s} className="border border-line px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em] text-dim">{s}</span>
          ))}
        </div>
      </Link>
    </Reveal>
  )
}

export default function TradeTracker() {
  return (
    <>
      <PageHero
        code="03 / TRADE TRACKER"
        title="Trade"
        serif="tracker"
        desc="RADICAL TRANSPARENCY: EVERY TRACKED POSITION — ENTRY, SIZE, EXIT, RATIONALE — LOGGED AND TIMESTAMPED. WINS AND LOSSES, NO EDITING."
      />

      <section className="lab-grid-fine border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i * 70} className="bg-[#060606] p-8">
                <div className="text-4xl font-light tracking-tight text-signal">{s.k}</div>
                <div className="mt-3 font-mono-lab text-[10px] tracking-[0.2em] text-dim">{s.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="03" label="Ledgers" right="SELECT A MARKET" />
          <div className="grid gap-4 md:grid-cols-2">
            <TrackCard
              to="/trade-tracker/stocks"
              code="03.A"
              name="STOCKS"
              desc="Equity positions on regional and global exchanges. Swing horizon, breadth-confirmed entries."
              stats={['218 TRADES', '63.2% HIT', 'SWING']}
              i={0}
            />
            <TrackCard
              to="/trade-tracker/crypto"
              code="03.B"
              name="CRYPTO"
              desc="Digital asset positions, spot-led with strict leverage discipline. Funding-aware, regime-filtered."
              stats={['124 TRADES', '58.1% HIT', 'MOMENTUM']}
              i={1}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-[#050505]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="RULES" label="House rules" right="NON-NEGOTIABLE" />
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {[
              { n: 'LOG BEFORE ENTRY', d: 'A trade that is not written down before execution does not exist. No retroactive narratives.' },
              { n: 'SIZE BY CONVICTION', d: 'Position size follows the scenario map, never the mood. Max risk per idea: fixed, published.' },
              { n: 'AUDIT THE LOSSES', d: 'Every losing trade gets a post-mortem within 48h. Pattern repeats get the strategy benched.' },
            ].map((m, i) => (
              <Reveal key={m.n} delay={i * 80} className="bg-[#060606] p-8 md:p-10">
                <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">RULE {String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-6 text-xl font-medium tracking-tight">{m.n}</h3>
                <p className="mt-4 font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{m.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
