import { Link } from 'react-router'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'

function PillarCard({ p, to, open, i }: { p: { code: string; name: string; desc: string; count: string }; to: string; open: string; i: number }) {
  const ref = useSpotlight<HTMLAnchorElement>()
  return (
    <Reveal delay={i * 100}>
      <Link
        ref={ref}
        to={to}
        className="spot-card group block border border-line p-8 transition-colors duration-300 border-line-hover md:p-12"
      >
        <div className="flex items-start justify-between">
          <span className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{p.code}</span>
          <span className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">{p.count}</span>
        </div>
        <h2 className="mt-12 text-3xl font-medium tracking-tight transition-colors group-hover:text-signal md:text-5xl">{p.name}</h2>
        <p className="mt-5 max-w-md font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{p.desc}</p>
        <div className="mt-10 font-mono-lab text-[11px] tracking-[0.25em] text-dim transition-all duration-300 group-hover:translate-x-2 group-hover:text-signal rtl:group-hover:-translate-x-2">
          {open}
        </div>
      </Link>
    </Reveal>
  )
}

export default function Analysis() {
  const { t } = useLang()
  const routes = ['/analysis/insights', '/analysis/ideas']

  return (
    <>
      <PageHero
        code={t.analysis.hero.code}
        title={t.analysis.hero.title}
        serif={t.analysis.hero.serif}
        desc={t.analysis.hero.desc}
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="01" label={t.analysis.pillars.head} right={t.analysis.pillars.headRight} />
          <div className="grid gap-4 md:grid-cols-2">
            {t.analysis.pillars.items.map((p, i) => (
              <PillarCard key={p.code} p={p} to={routes[i]} open={t.analysis.pillars.open} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-alt">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="02" label={t.analysis.method.head} right={t.analysis.method.headRight} />
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {t.analysis.method.items.map((m, i) => (
              <Reveal key={m.n} delay={i * 80} className="bg-card2 p-8 md:p-10">
                <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">
                  {t.analysis.method.step} {String(i + 1).padStart(2, '0')}
                </div>
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
