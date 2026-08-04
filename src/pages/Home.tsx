import { Link } from 'react-router'
import { MarketCanvas, Reveal, useLivePrice, useSpotlight } from '@/components/lab'
import { SectionHead, TICKER_ITEMS } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="overflow-hidden border-y border-line bg-ticker">
      <div className="ticker-track flex w-max items-center py-2.5">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-6 font-mono-lab text-[11px] tracking-wider" dir="ltr">
            <span className="text-dim">{it.s}</span>
            <span className="text-foreground">{it.v}</span>
            <span className={it.up ? 'text-signal' : 'text-danger'}>{it.d}</span>
            <span className="ms-3 text-faint">·</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ModuleCard({ mod, to, i }: { mod: { code: string; name: string; desc: string; meta: string[] }; to: string; i: number }) {
  const ref = useSpotlight<HTMLAnchorElement>()
  return (
    <Reveal delay={i * 90}>
      <Link
        ref={ref}
        to={to}
        className="spot-card group block border border-line p-7 transition-colors duration-300 border-line-hover md:p-9"
      >
        <div className="flex items-start justify-between">
          <span className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{mod.code}</span>
          <span className="font-mono-lab text-lg text-faint transition-all duration-300 group-hover:-translate-x-1 group-hover:text-signal rtl:rotate-180">
            →
          </span>
        </div>
        <h3 className="mt-10 text-2xl font-medium tracking-tight md:text-3xl">{mod.name}</h3>
        <p className="mt-4 max-w-md font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{mod.desc}</p>
        <div className="mt-8 flex gap-2">
          {mod.meta.map((m) => (
            <span key={m} className="border border-line px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em] text-dim">
              {m}
            </span>
          ))}
        </div>
      </Link>
    </Reveal>
  )
}

function LiveQuote() {
  const { price, dir } = useLivePrice(4213.86, 0.002)
  return (
    <span className={dir > 0 ? 'text-signal' : 'text-danger'}>
      {price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
    </span>
  )
}

const MODULE_ROUTES = ['/analysis', '/souk-signal', '/trade-tracker']

export default function Home() {
  const { t } = useLang()
  const m = t.home.manifesto

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-screen flex-col border-b border-line">
        <MarketCanvas className="absolute inset-0" />
        <div className="scanline" />
        <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pb-14 pt-44 md:px-10 md:pt-48">
          <Reveal>
            <div className="mb-6 flex items-center gap-3 font-mono-lab text-[10px] tracking-[0.3em] text-signal">
              <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
              {t.home.tag}
            </div>
          </Reveal>
          <h1 className="pointer-events-auto select-none text-[10vw] font-semibold leading-[0.9] tracking-[-0.03em] md:text-[6.5vw]">
            <Reveal delay={80}>
              <span className="block">{t.home.hero1}</span>
            </Reveal>
            <Reveal delay={180}>
              <span className="block">
                {t.home.hero2}
                <span className="font-serif-lab italic font-normal text-signal">,</span>
              </span>
            </Reveal>
            <Reveal delay={280}>
              <span className="block outline-text">{t.home.hero3}</span>
            </Reveal>
          </h1>
          <Reveal delay={400}>
            <div className="pointer-events-auto mt-8 flex flex-col justify-between gap-6 border-t border-line pt-6 md:flex-row md:items-end">
              <p className="max-w-md font-mono-lab text-[12px] leading-6 tracking-wide text-dim">{t.home.heroDesc}</p>
              <div className="flex items-center gap-6">
                <Link
                  to="/analysis"
                  className="group border border-foreground/30 px-6 py-3 font-mono-lab text-[11px] tracking-[0.25em] transition-all duration-300 hover:border-signal hover:bg-signal hover:text-[#0c0e12]"
                >
                  {t.home.heroCta}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
        {/* corner metadata */}
        <div className="pointer-events-none absolute end-5 top-24 z-10 hidden font-mono-lab text-[10px] leading-5 tracking-wider text-dim md:end-10 md:block">
          <div className="flicker" dir="ltr">BVX COMP <LiveQuote /></div>
          <div className="text-faint">{t.home.cornerFeed}</div>
        </div>
      </section>

      <Ticker />

      {/* ============ MANIFESTO ============ */}
      <section className="lab-grid border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{m.label}</div>
              <div className="mt-4 whitespace-pre-line font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{m.meta}</div>
            </Reveal>
            <div className="md:col-span-8">
              <Reveal delay={100}>
                <p className="text-3xl font-light leading-[1.25] tracking-tight md:text-5xl">
                  {m.big1} <span className="font-serif-lab italic text-signal">{m.big1Accent}</span>
                  {m.big2} <span className="outline-text">{m.big2Accent}</span>
                  {m.big3}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 max-w-lg font-mono-lab text-[12px] leading-6 tracking-wide text-dim">{m.sub}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MODULES ============ */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
          <SectionHead index="01—03" label={t.home.modules.head} right={t.home.modules.headRight} />
          <div className="grid gap-4 md:grid-cols-3">
            {t.home.modules.items.map((mod, i) => (
              <ModuleCard key={mod.code} mod={mod} to={MODULE_ROUTES[i]} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ NUMBERS ============ */}
      <section className="lab-grid-fine border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
            {t.home.numbers.map((s, i) => (
              <Reveal key={s.l} delay={i * 80} className="bg-card2 p-8 md:p-10">
                <div className="text-4xl font-light tracking-tight text-signal md:text-5xl" dir="ltr">{s.k}</div>
                <div className="mt-3 font-mono-lab text-[10px] tracking-[0.2em] text-dim">{s.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LATEST FEED ============ */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
          <SectionHead index="FEED" label={t.home.feed.head} right={t.home.feed.headRight} />
          <div>
            {t.home.feed.items.map((n, i) => (
              <Reveal key={n.t} delay={i * 60}>
                <Link to={n.to} className="index-row group flex flex-col gap-2 border-b border-line py-6 md:flex-row md:items-center md:gap-8">
                  <span className="w-28 shrink-0 font-mono-lab text-[10px] tracking-wider text-faint" dir="ltr">{n.d}</span>
                  <span className="w-20 shrink-0 font-mono-lab text-[10px] tracking-[0.2em] text-signal">{n.tag}</span>
                  <span className="flex-1 text-lg font-light tracking-tight transition-colors group-hover:text-signal md:text-xl">
                    {n.t}
                  </span>
                  <span className="font-mono-lab text-faint transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-signal rtl:rotate-180">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden">
        <div className="lab-grid absolute inset-0 opacity-60" />
        <div className="lab-halo absolute inset-0" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-28 text-center md:px-10 md:py-40">
          <Reveal>
            <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{t.home.cta.label}</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-light leading-[1.1] tracking-tight md:text-6xl">
              {t.home.cta.title1} <span className="font-serif-lab italic text-dim">{t.home.cta.title2}</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/souk-signal"
                className="bg-signal px-8 py-3.5 font-mono-lab text-[11px] tracking-[0.25em] text-[#0c0e12] transition-transform duration-300 hover:scale-[1.03]"
              >
                {t.home.cta.primary}
              </Link>
              <Link
                to="/about"
                className="border border-foreground/30 px-8 py-3.5 font-mono-lab text-[11px] tracking-[0.25em] transition-colors duration-300 hover:border-signal hover:text-signal"
              >
                {t.home.cta.secondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
