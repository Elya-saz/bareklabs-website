import { useState } from 'react'
import { Reveal } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

export default function Insights() {
  const { t } = useLang()
  const FILTERS = t.insights.filters
  const [filter, setFilter] = useState(FILTERS[0])
  const notes = filter === FILTERS[0] ? t.insights.notes : t.insights.notes.filter((n) => n.tag === filter)

  return (
    <>
      <PageHero
        code={t.insights.hero.code}
        title={t.insights.hero.title}
        serif={t.insights.hero.serif}
        desc={t.insights.hero.desc}
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="FILTER" label={t.insights.head} right={`${notes.length} ${t.insights.notesUnit}`} />
          <div className="mb-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'border px-4 py-2 font-mono-lab text-[10px] tracking-[0.2em] transition-all duration-300',
                  filter === f
                    ? 'border-signal bg-signal text-[#0c0e12]'
                    : 'border-line text-dim hover:border-line-hover hover:text-foreground'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid gap-px overflow-hidden border border-line bg-line">
            {notes.map((n, i) => (
              <Reveal key={n.t} delay={i * 40} className="index-row group cursor-pointer bg-card2 p-6 md:p-7">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
                  <span className="w-24 shrink-0 font-mono-lab text-[10px] tracking-wider text-faint" dir="ltr">{n.d}</span>
                  <span className="w-28 shrink-0 font-mono-lab text-[10px] tracking-[0.14em] text-signal">{n.tag}</span>
                  <span className="flex-1 text-lg font-light tracking-tight transition-colors group-hover:text-signal">
                    {n.t}
                  </span>
                  <div className="flex items-center gap-6">
                    <span className="whitespace-nowrap font-mono-lab text-[10px] tracking-wider text-faint">
                      {n.read} {t.insights.readUnit}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-16 overflow-hidden bg-track">
                        <div className="h-full bg-signal transition-all duration-700" style={{ width: `${n.conf}%` }} />
                      </div>
                      <span className="font-mono-lab text-[10px] text-dim" dir="ltr">{n.conf}%</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.insights.confidenceNote}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
