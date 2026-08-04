import { Link } from 'react-router'
import { MarketCanvas, Reveal, useLivePrice, useSpotlight } from '@/components/lab'
import { SectionHead, TICKER_ITEMS } from '@/components/Layout'

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="overflow-hidden border-y border-line bg-[#080808]">
      <div className="ticker-track flex w-max items-center py-2.5">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-6 font-mono-lab text-[11px] tracking-wider">
            <span className="text-dim">{it.s}</span>
            <span className="text-foreground">{it.v}</span>
            <span className={it.up ? 'text-signal' : 'text-[#ff4d4d]'}>{it.d}</span>
            <span className="ml-3 text-faint">·</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const MODULES = [
  {
    to: '/analysis',
    code: '01',
    name: 'ANALYSIS & RESEARCH',
    desc: 'Macro reads, market structure and published research. Insights and investment ideas, documented with sources.',
    meta: ['INSIGHTS', 'IDEAS'],
  },
  {
    to: '/souk-signal',
    code: '02',
    name: 'SOUK SIGNAL',
    desc: 'Signal engine tuned to regional markets. Breadth, flows and anomaly detection distilled into one daily read.',
    meta: ['DAILY', 'REGIONAL'],
  },
  {
    to: '/trade-tracker',
    code: '03',
    name: 'TRADE TRACKER',
    desc: 'Transparent log of tracked positions across stocks and crypto. Entries, exits, sizing — visible, timestamped.',
    meta: ['STOCKS', 'CRYPTO'],
  },
]

function ModuleCard({ mod, i }: { mod: (typeof MODULES)[0]; i: number }) {
  const ref = useSpotlight<HTMLAnchorElement>()
  return (
    <Reveal delay={i * 90}>
      <Link
        ref={ref}
        to={mod.to}
        className="spot-card group block border border-line p-7 transition-colors duration-300 hover:border-[#2e2e2e] md:p-9"
      >
        <div className="flex items-start justify-between">
          <span className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{mod.code}</span>
          <span className="font-mono-lab text-lg text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal">
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
    <span className={dir > 0 ? 'text-signal' : 'text-[#ff4d4d]'}>
      {price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
    </span>
  )
}

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-screen flex-col border-b border-line">
        <MarketCanvas className="absolute inset-0" />
        <div className="scanline" />
        <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pb-14 pt-32 md:px-10">
          <Reveal>
            <div className="mb-6 flex items-center gap-3 font-mono-lab text-[10px] tracking-[0.3em] text-signal">
              <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
              BAREK LABS / RESEARCH TERMINAL v0.4
            </div>
          </Reveal>
          <h1 className="pointer-events-auto select-none text-[15vw] font-semibold leading-[0.88] tracking-[-0.03em] md:text-[10.5vw]">
            <Reveal delay={80}>
              <span className="block">MARKET</span>
            </Reveal>
            <Reveal delay={180}>
              <span className="block">
                SIGNAL<span className="font-serif-lab italic font-normal text-signal">,</span>
              </span>
            </Reveal>
            <Reveal delay={280}>
              <span className="block outline-text">DECODED.</span>
            </Reveal>
          </h1>
          <Reveal delay={400}>
            <div className="pointer-events-auto mt-8 flex flex-col justify-between gap-6 border-t border-line pt-6 md:flex-row md:items-end">
              <p className="max-w-md font-mono-lab text-[12px] leading-6 tracking-wide text-dim">
                AN INDEPENDENT FINANCE & TECH LAB. WE PUBLISH RESEARCH, ENGINEER SIGNALS AND TRACK EXECUTION — IN THE OPEN, WITH RECEIPTS.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  to="/analysis"
                  className="group border border-foreground/30 px-6 py-3 font-mono-lab text-[11px] tracking-[0.25em] transition-all duration-300 hover:border-signal hover:bg-signal hover:text-[#060606]"
                >
                  ENTER THE LAB →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
        {/* corner metadata */}
        <div className="pointer-events-none absolute right-5 top-24 z-10 hidden font-mono-lab text-[10px] leading-5 tracking-wider text-dim md:right-10 md:block">
          <div className="flicker">BVX COMP <LiveQuote /></div>
          <div className="text-faint">FEED: REALTIME / DELAYED MIX</div>
        </div>
      </section>

      <Ticker />

      {/* ============ MANIFESTO ============ */}
      <section className="lab-grid border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">§ MANIFESTO</div>
              <div className="mt-4 font-mono-lab text-[10px] leading-5 tracking-wider text-faint">
                EST. 2026
                <br />
                CASABLANCA / REMOTE
                <br />
                INDEPENDENT, SELF-FUNDED
              </div>
            </Reveal>
            <div className="md:col-span-8">
              <Reveal delay={100}>
                <p className="text-3xl font-light leading-[1.25] tracking-tight md:text-5xl">
                  Most market noise is <span className="font-serif-lab italic text-signal">curable</span>. We build the instruments — research, signals, trackers — that separate information from{' '}
                  <span className="outline-text">adrenaline</span>.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 max-w-lg font-mono-lab text-[12px] leading-6 tracking-wide text-dim">
                  EVERY CLAIM SOURCED. EVERY TRADE LOGGED. EVERY MODEL VERSIONED. CURIOSITY IS THE EDGE; DISCIPLINE IS THE MOAT.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MODULES ============ */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
          <SectionHead index="01—03" label="The Stack" right="3 MODULES ONLINE" />
          <div className="grid gap-4 md:grid-cols-3">
            {MODULES.map((m, i) => (
              <ModuleCard key={m.to} mod={m} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ NUMBERS ============ */}
      <section className="lab-grid-fine border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
            {[
              { k: '128', l: 'RESEARCH NOTES PUBLISHED' },
              { k: '342', l: 'TRADES LOGGED & AUDITED' },
              { k: '04', l: 'LIVE SIGNAL FEEDS' },
              { k: '24/7', l: 'MARKET SURVEILLANCE' },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 80} className="bg-[#060606] p-8 md:p-10">
                <div className="text-4xl font-light tracking-tight text-signal md:text-5xl">{s.k}</div>
                <div className="mt-3 font-mono-lab text-[10px] tracking-[0.2em] text-dim">{s.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LATEST FEED ============ */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
          <SectionHead index="FEED" label="Latest from the lab" right="UPDATED DAILY" />
          <div>
            {[
              { d: '2026.08.03', tag: 'INSIGHT', t: 'Liquidity cycles in frontier exchanges: a breadth-first autopsy', to: '/analysis/insights' },
              { d: '2026.08.01', tag: 'IDEA', t: 'Long consolidation: banking names vs. rate path — a barbell', to: '/analysis/ideas' },
              { d: '2026.07.29', tag: 'SIGNAL', t: 'SOUK: turnover compression precedes expansion — watchlist reset', to: '/souk-signal' },
              { d: '2026.07.26', tag: 'TRACKER', t: 'Closed: ETH momentum leg, +6.4% R — full log inside', to: '/trade-tracker/crypto' },
            ].map((n, i) => (
              <Reveal key={n.t} delay={i * 60}>
                <Link to={n.to} className="index-row group flex flex-col gap-2 border-b border-line py-6 md:flex-row md:items-center md:gap-8">
                  <span className="w-28 shrink-0 font-mono-lab text-[10px] tracking-wider text-faint">{n.d}</span>
                  <span className="w-20 shrink-0 font-mono-lab text-[10px] tracking-[0.2em] text-signal">{n.tag}</span>
                  <span className="flex-1 text-lg font-light tracking-tight transition-colors group-hover:text-signal md:text-xl">
                    {n.t}
                  </span>
                  <span className="font-mono-lab text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden">
        <div className="lab-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-28 text-center md:px-10 md:py-40">
          <Reveal>
            <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">ACCESS / OPEN</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-light leading-[1.1] tracking-tight md:text-6xl">
              Follow the signal, <span className="font-serif-lab italic text-dim">skip the noise.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/souk-signal"
                className="bg-signal px-8 py-3.5 font-mono-lab text-[11px] tracking-[0.25em] text-[#060606] transition-transform duration-300 hover:scale-[1.03]"
              >
                READ TODAY'S SIGNAL
              </Link>
              <Link
                to="/about"
                className="border border-foreground/30 px-8 py-3.5 font-mono-lab text-[11px] tracking-[0.25em] transition-colors duration-300 hover:border-signal hover:text-signal"
              >
                ABOUT THE LAB
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
