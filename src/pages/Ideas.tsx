import { useState } from 'react'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { cn } from '@/lib/utils'

type Idea = {
  id: string
  date: string
  status: 'ACTIVE' | 'WATCHING' | 'CLOSED'
  title: string
  thesis: string
  entry: string
  invalidation: string
  horizon: string
  scenarios: { label: string; prob: number; tone: 'up' | 'mid' | 'down' }[]
}

const IDEAS: Idea[] = [
  {
    id: 'IDEA-0142',
    date: '2026.08.01',
    status: 'ACTIVE',
    title: 'Banking barbell: rate-path consolidation',
    thesis: 'Large-cap banks price a cut that the data keeps postponing. Pair quality deposit franchises against rate-sensitive lenders.',
    entry: 'Staggered, 3 tranches on breadth resets',
    invalidation: 'Yield curve re-steepens >25bp in a month',
    horizon: '2–4 MONTHS',
    scenarios: [
      { label: 'BASE', prob: 55, tone: 'up' },
      { label: 'BULL', prob: 25, tone: 'up' },
      { label: 'BEAR', prob: 20, tone: 'down' },
    ],
  },
  {
    id: 'IDEA-0139',
    date: '2026.07.24',
    status: 'WATCHING',
    title: 'Telecom cash-flow rerating',
    thesis: 'Capex cycle peaks while data monetisation inflects. Free cash flow inflection unpriced by a market anchored to legacy multiples.',
    entry: 'On confirmed FCF inflection print',
    invalidation: 'Regulatory tariff intervention',
    horizon: '6–12 MONTHS',
    scenarios: [
      { label: 'BASE', prob: 50, tone: 'up' },
      { label: 'BULL', prob: 20, tone: 'up' },
      { label: 'BEAR', prob: 30, tone: 'down' },
    ],
  },
  {
    id: 'IDEA-0135',
    date: '2026.07.12',
    status: 'ACTIVE',
    title: 'ETH momentum continuation',
    thesis: 'Funding neutral while spot-led accumulation persists on-chain. Momentum with clean leverage backdrop — rare alignment.',
    entry: 'Pullback to 20D mean, confirmed by funding reset',
    invalidation: 'Weekly close below 200D MA',
    horizon: '3–6 WEEKS',
    scenarios: [
      { label: 'BASE', prob: 45, tone: 'up' },
      { label: 'BULL', prob: 30, tone: 'up' },
      { label: 'BEAR', prob: 25, tone: 'down' },
    ],
  },
  {
    id: 'IDEA-0128',
    date: '2026.06.28',
    status: 'CLOSED',
    title: 'Pharma defensive rotation',
    thesis: 'Breadth deterioration in cyclicals while defensives accumulate quietly. Rotation completed at +4.1% R in 5 weeks.',
    entry: 'Executed — see trade tracker',
    invalidation: '—',
    horizon: 'CLOSED +4.1% R',
    scenarios: [
      { label: 'HIT', prob: 100, tone: 'up' },
    ],
  },
]

const STATUS_TONE: Record<Idea['status'], string> = {
  ACTIVE: 'border-signal/50 text-signal',
  WATCHING: 'border-[#ffb84d]/50 text-[#ffb84d]',
  CLOSED: 'border-[#333] text-dim',
}

function IdeaCard({ idea, i }: { idea: Idea; i: number }) {
  const [open, setOpen] = useState(false)
  const ref = useSpotlight<HTMLDivElement>()
  return (
    <Reveal delay={i * 70}>
      <div ref={ref} className="spot-card border border-line">
        <button onClick={() => setOpen(!open)} className="w-full p-6 text-left md:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono-lab text-[10px] tracking-wider text-faint">{idea.id}</span>
            <span className={cn('border px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em]', STATUS_TONE[idea.status])}>
              {idea.status}
            </span>
            <span className="ml-auto font-mono-lab text-[10px] tracking-wider text-faint">{idea.date}</span>
          </div>
          <div className="mt-5 flex items-center justify-between gap-6">
            <h3 className="text-xl font-medium tracking-tight md:text-2xl">{idea.title}</h3>
            <span className={cn('font-mono-lab text-lg text-faint transition-transform duration-300', open && 'rotate-45')}>+</span>
          </div>
          <p className="mt-3 max-w-2xl font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{idea.thesis}</p>
        </button>

        <div className={cn('grid transition-all duration-500 ease-out', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
          <div className="overflow-hidden">
            <div className="grid gap-px border-t border-line bg-line md:grid-cols-3">
              <div className="bg-[#080808] p-6">
                <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">ENTRY LOGIC</div>
                <p className="mt-3 font-mono-lab text-[11px] leading-5 text-foreground/90">{idea.entry}</p>
              </div>
              <div className="bg-[#080808] p-6">
                <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">INVALIDATION</div>
                <p className="mt-3 font-mono-lab text-[11px] leading-5 text-[#ff4d4d]">{idea.invalidation}</p>
              </div>
              <div className="bg-[#080808] p-6">
                <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">HORIZON</div>
                <p className="mt-3 font-mono-lab text-[11px] leading-5 text-foreground/90">{idea.horizon}</p>
              </div>
            </div>
            <div className="border-t border-line bg-[#080808] p-6">
              <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">SCENARIO MAP</div>
              <div className="mt-4 flex h-2 w-full overflow-hidden bg-[#1c1c1c]">
                {idea.scenarios.map((s) => (
                  <div
                    key={s.label}
                    className={cn('h-full transition-all duration-700', s.tone === 'down' ? 'bg-[#ff4d4d]/70' : 'bg-signal/80')}
                    style={{ width: `${s.prob}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-5">
                {idea.scenarios.map((s) => (
                  <span key={s.label} className="font-mono-lab text-[10px] tracking-wider text-dim">
                    {s.label} <span className={s.tone === 'down' ? 'text-[#ff4d4d]' : 'text-signal'}>{s.prob}%</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Ideas() {
  return (
    <>
      <PageHero
        code="01.B / ANALYSIS — INVESTMENT IDEAS"
        title="Investment"
        serif="ideas"
        desc="THESES WITH RECEIPTS: ENTRY LOGIC, INVALIDATION LEVELS AND PROBABILITY MAPS — WRITTEN BEFORE THE TRADE, AUDITED AFTER."
      />
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="LEDGER" label="Open theses" right="CLICK TO EXPAND" />
          <div className="space-y-4">
            {IDEAS.map((idea, i) => (
              <IdeaCard key={idea.id} idea={idea} i={i} />
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">
              IDEAS ARE RESEARCH ARTEFACTS, NOT RECOMMENDATIONS. SIZING AND EXECUTION LIVE IN THE TRADE TRACKER.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
