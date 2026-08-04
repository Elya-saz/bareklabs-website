import { useState } from 'react'
import { Reveal } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { cn } from '@/lib/utils'

const FILTERS = ['ALL', 'MACRO', 'STRUCTURE', 'FLOWS', 'CRYPTO'] as const

const NOTES = [
  { d: '2026.08.03', tag: 'STRUCTURE', t: 'Liquidity cycles in frontier exchanges: a breadth-first autopsy', read: '9 MIN', conf: 86 },
  { d: '2026.07.30', tag: 'MACRO', t: 'When the dirham steadies: imported inflation and the carry question', read: '7 MIN', conf: 74 },
  { d: '2026.07.27', tag: 'FLOWS', t: 'Foreign allocation trickle: reading the custody data nobody charts', read: '6 MIN', conf: 81 },
  { d: '2026.07.22', tag: 'CRYPTO', t: 'Stablecoin velocity as a leading indicator for risk-on rotations', read: '11 MIN', conf: 69 },
  { d: '2026.07.18', tag: 'STRUCTURE', t: 'The closing auction tells the truth: an order-imbalance field guide', read: '8 MIN', conf: 90 },
  { d: '2026.07.14', tag: 'MACRO', t: 'Rate-path divergence and what it does to small-cap valuations', read: '10 MIN', conf: 77 },
  { d: '2026.07.09', tag: 'FLOWS', t: 'ETF creation baskets: the quiet tape beneath the loud one', read: '5 MIN', conf: 83 },
  { d: '2026.07.02', tag: 'CRYPTO', t: 'Funding-rate regimes: separating leverage heat from genuine demand', read: '12 MIN', conf: 72 },
]

export default function Insights() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('ALL')
  const notes = filter === 'ALL' ? NOTES : NOTES.filter((n) => n.tag === filter)

  return (
    <>
      <PageHero
        code="01.A / ANALYSIS — INSIGHTS"
        title="Insights"
        serif="archive"
        desc="SHORT, DENSE READS. EACH NOTE CARRIES A CONFIDENCE SCORE — A REMINDER THAT KNOWLEDGE IS A PROBABILITY, NOT A POSTURE."
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead
            index="FILTER"
            label="The archive"
            right={`${notes.length} NOTES`}
          />
          <div className="mb-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'border px-4 py-2 font-mono-lab text-[10px] tracking-[0.2em] transition-all duration-300',
                  filter === f
                    ? 'border-signal bg-signal text-[#060606]'
                    : 'border-line text-dim hover:border-[#333] hover:text-foreground'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid gap-px overflow-hidden border border-line bg-line">
            {notes.map((n, i) => (
              <Reveal key={n.t} delay={i * 40} className="index-row group cursor-pointer bg-[#060606] p-6 md:p-7">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
                  <span className="w-24 shrink-0 font-mono-lab text-[10px] tracking-wider text-faint">{n.d}</span>
                  <span className="w-24 shrink-0 font-mono-lab text-[10px] tracking-[0.2em] text-signal">{n.tag}</span>
                  <span className="flex-1 text-lg font-light tracking-tight transition-colors group-hover:text-signal">
                    {n.t}
                  </span>
                  <div className="flex items-center gap-6">
                    <span className="font-mono-lab text-[10px] tracking-wider text-faint">{n.read}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-16 overflow-hidden bg-[#1c1c1c]">
                        <div className="h-full bg-signal transition-all duration-700" style={{ width: `${n.conf}%` }} />
                      </div>
                      <span className="font-mono-lab text-[10px] text-dim">{n.conf}%</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">
              CONFIDENCE = OUR INTERNAL SCORE BLENDING DATA QUALITY, SAMPLE SIZE AND REGIME STABILITY. IT IS NOT A GUARANTEE — NOTHING IS.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
