import { Link } from 'react-router'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'

function TrackCard({
  to, code, name, desc, stats, i,
}: {
  to: string; code: string; name: string; desc: string; stats: string[]; i: number
}) {
  const ref = useSpotlight<HTMLAnchorElement>()
  return (
    <Reveal delay={i * 100}>
      <Link ref={ref} to={to} className="spot-card group block border border-line p-8 transition-colors duration-300 border-line-hover md:p-12">
        <div className="flex items-start justify-between">
          <span className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{code}</span>
          <span className="font-mono-lab text-lg text-faint transition-all duration-300 group-hover:-translate-x-1 group-hover:text-signal rtl:rotate-180">→</span>
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
  const { t } = useLang()
  return (
    <>
      <PageHero
        code={t.tracker.hero.code}
        title={t.tracker.hero.title}
        serif={t.tracker.hero.serif}
        desc={t.tracker.hero.desc}
      />

      <section className="lab-grid-fine border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
            {t.tracker.stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 70} className="bg-card2 p-8">
                <div className="text-4xl font-light tracking-tight text-signal" dir="ltr">{s.k}</div>
                <div className="mt-3 font-mono-lab text-[10px] tracking-[0.2em] text-dim">{s.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="03" label={t.tracker.ledgers.head} right={t.tracker.ledgers.headRight} />
          <div className="grid gap-4 md:grid-cols-2">
            <TrackCard
              to="/trade-tracker/stocks"
              code={t.tracker.ledgers.stocks.code}
              name={t.tracker.ledgers.stocks.name}
              desc={t.tracker.ledgers.stocks.desc}
              stats={t.tracker.ledgers.stocks.stats}
              i={0}
            />
            <TrackCard
              to="/trade-tracker/crypto"
              code={t.tracker.ledgers.crypto.code}
              name={t.tracker.ledgers.crypto.name}
              desc={t.tracker.ledgers.crypto.desc}
              stats={t.tracker.ledgers.crypto.stats}
              i={1}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-alt">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="RULES" label={t.tracker.rules.head} right={t.tracker.rules.headRight} />
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {t.tracker.rules.items.map((m, i) => (
              <Reveal key={m.n} delay={i * 80} className="bg-card2 p-8 md:p-10">
                <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">
                  {t.tracker.rules.rule} {String(i + 1).padStart(2, '0')}
                </div>
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
