import { Link } from 'react-router'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'

const PILLARS = [
  {
    to: '/analysis/insights',
    code: '01.A',
    name: 'INSIGHTS',
    desc: 'Short, dense reads on market structure, macro shifts and anomalies we observe across the feeds.',
    count: '72 NOTES',
  },
  {
    to: '/analysis/ideas',
    code: '01.B',
    name: 'INVESTMENT IDEAS',
    desc: 'Thesis-driven setups with entry logic, invalidation levels and scenario maps. Documented before, not after.',
    count: '56 THESES',
  },
]

function PillarCard({ p, i }: { p: (typeof PILLARS)[0]; i: number }) {
  const ref = useSpotlight<HTMLAnchorElement>()
  return (
    <Reveal delay={i * 100}>
      <Link
        ref={ref}
        to={p.to}
        className="spot-card group block border border-line p-8 transition-colors duration-300 hover:border-[#2e2e2e] md:p-12"
      >
        <div className="flex items-start justify-between">
          <span className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{p.code}</span>
          <span className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">{p.count}</span>
        </div>
        <h2 className="mt-12 text-3xl font-medium tracking-tight transition-colors group-hover:text-signal md:text-5xl">
          {p.name}
        </h2>
        <p className="mt-5 max-w-md font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{p.desc}</p>
        <div className="mt-10 font-mono-lab text-[11px] tracking-[0.25em] text-dim transition-all duration-300 group-hover:translate-x-2 group-hover:text-signal">
          OPEN →
        </div>
      </Link>
    </Reveal>
  )
}

export default function Analysis() {
  return (
    <>
      <PageHero
        code="01 / ANALYSIS & RESEARCH"
        title="Analysis"
        serif="& research"
        desc="RESEARCH IS THE PRODUCT. TWO PILLARS: INSIGHTS FOR UNDERSTANDING, IDEAS FOR POSITIONING. EVERY PIECE VERSIONED, SOURCED AND DATED."
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="01" label="Research pillars" right="SELECT A TRACK" />
          <div className="grid gap-4 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <PillarCard key={p.to} p={p} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-[#050505]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="02" label="Method" right="HOW WE WORK" />
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {[
              { n: 'OBSERVE', d: 'Breadth, flows, positioning, narrative. Data before story — always in that order.' },
              { n: 'HYPOTHESIZE', d: 'A thesis is a falsifiable statement. We write the kill criteria before the entry logic.' },
              { n: 'PUBLISH', d: 'Notes ship with sources, timestamps and confidence levels. Wrong is fine; undocumented is not.' },
            ].map((m, i) => (
              <Reveal key={m.n} delay={i * 80} className="bg-[#060606] p-8 md:p-10">
                <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">STEP {String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-6 text-xl font-medium tracking-tight md:text-2xl">{m.n}</h3>
                <p className="mt-4 font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{m.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
