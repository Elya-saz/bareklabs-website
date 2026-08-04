import { useState } from 'react'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
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

const STATUS_TONE: Record<Idea['status'], string> = {
  ACTIVE: 'border-signal/50 text-signal',
  WATCHING: 'border-warn/50 text-warn',
  CLOSED: 'border-line text-dim',
}

function IdeaCard({ idea, i }: { idea: Idea; i: number }) {
  const [open, setOpen] = useState(false)
  const ref = useSpotlight<HTMLDivElement>()
  const { t } = useLang()
  const scenarioLabel = (l: string) => (t.ideas.scenarioLabels as Record<string, string>)[l] ?? l

  return (
    <Reveal delay={i * 70}>
      <div ref={ref} className="spot-card border border-line">
        <button onClick={() => setOpen(!open)} className="w-full p-6 text-start md:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono-lab text-[10px] tracking-wider text-faint" dir="ltr">{idea.id}</span>
            <span className={cn('border px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em]', STATUS_TONE[idea.status])}>
              {t.ideas.status[idea.status]}
            </span>
            <span className="ms-auto font-mono-lab text-[10px] tracking-wider text-faint" dir="ltr">{idea.date}</span>
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
              <div className="bg-ticker p-6">
                <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{t.ideas.labels.entry}</div>
                <p className="mt-3 font-mono-lab text-[11px] leading-5 text-foreground/90">{idea.entry}</p>
              </div>
              <div className="bg-ticker p-6">
                <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{t.ideas.labels.invalidation}</div>
                <p className="mt-3 font-mono-lab text-[11px] leading-5 text-danger">{idea.invalidation}</p>
              </div>
              <div className="bg-ticker p-6">
                <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{t.ideas.labels.horizon}</div>
                <p className="mt-3 font-mono-lab text-[11px] leading-5 text-foreground/90">{idea.horizon}</p>
              </div>
            </div>
            <div className="border-t border-line bg-ticker p-6">
              <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{t.ideas.labels.scenarios}</div>
              <div className="mt-4 flex h-2 w-full overflow-hidden bg-track">
                {idea.scenarios.map((s) => (
                  <div
                    key={s.label}
                    className={cn('h-full transition-all duration-700', s.tone === 'down' ? 'bg-danger/70' : 'bg-signal/80')}
                    style={{ width: `${s.prob}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-5">
                {idea.scenarios.map((s) => (
                  <span key={s.label} className="font-mono-lab text-[10px] tracking-wider text-dim">
                    {scenarioLabel(s.label)}{' '}
                    <span className={s.tone === 'down' ? 'text-danger' : 'text-signal'} dir="ltr">
                      {s.prob}%
                    </span>
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
  const { t } = useLang()
  return (
    <>
      <PageHero
        code={t.ideas.hero.code}
        title={t.ideas.hero.title}
        serif={t.ideas.hero.serif}
        desc={t.ideas.hero.desc}
      />
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="LEDGER" label={t.ideas.head} right={t.ideas.headRight} />
          <div className="space-y-4">
            {t.ideas.items.map((idea, i) => (
              <IdeaCard key={idea.id} idea={idea} i={i} />
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.ideas.disclaimer}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
