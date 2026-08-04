import { useEffect, useState } from 'react'
import { Reveal } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { cn } from '@/lib/utils'

function Gauge({ value, label }: { value: number; label: string }) {
  // value 0..100
  const angle = (value / 100) * 180
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" className="w-full max-w-[260px]">
        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#1c1c1c" strokeWidth="10" />
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="#00e87a"
          strokeWidth="10"
          strokeDasharray={`${(value / 100) * 283} 283`}
          className="transition-all duration-1000"
        />
        <line
          x1="100" y1="100"
          x2={100 + 70 * Math.cos(Math.PI - (angle * Math.PI) / 180)}
          y2={100 - 70 * Math.sin((angle * Math.PI) / 180)}
          stroke="#fff" strokeWidth="2"
          className="transition-all duration-1000"
        />
        <circle cx="100" cy="100" r="5" fill="#00e87a" />
      </svg>
      <div className="mt-2 text-3xl font-light tracking-tight">{value}<span className="text-dim text-xl">/100</span></div>
      <div className="mt-1 font-mono-lab text-[10px] tracking-[0.25em] text-dim">{label}</div>
    </div>
  )
}

const SIGNAL_ROWS = [
  { k: 'BREADTH (ADV/DEC)', v: '1.42', tone: 'up', note: 'Expanding for 3rd session' },
  { k: 'TURNOVER VELOCITY', v: '0.87', tone: 'mid', note: 'Compressing — energy building' },
  { k: 'FOREIGN NET FLOW', v: '+18.2M', tone: 'up', note: 'Largest print in 6 weeks' },
  { k: 'VOLATILITY REGIME', v: 'LOW', tone: 'mid', note: 'Compression precedes expansion' },
  { k: 'SECTOR LEADERSHIP', v: 'BANKS', tone: 'up', note: 'Rotation confirmed by breadth' },
  { k: 'ANOMALY SCAN', v: '2 FLAGS', tone: 'down', note: 'Volume outliers under review' },
]

export default function SoukSignal() {
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 100), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <PageHero
        code="02 / SOUK SIGNAL"
        title="Souk"
        serif="signal"
        desc="ONE DAILY READ ON REGIONAL MARKETS. BREADTH, FLOWS AND ANOMALIES — DISTILLED, SCORED AND TIMESTAMPED. UPDATED EACH SESSION CLOSE."
      >
        <Reveal delay={240}>
          <div className="mt-8 flex items-center gap-3 font-mono-lab text-[10px] tracking-[0.25em] text-signal">
            <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            NEXT UPDATE: SESSION CLOSE + 30 MIN
          </div>
        </Reveal>
      </PageHero>

      <section className="lab-grid-fine">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <Gauge value={68} label="COMPOSITE SIGNAL — CONSTRUCTIVE" />
            </Reveal>
            <div className="md:col-span-7">
              <Reveal delay={100}>
                <h2 className="text-2xl font-light leading-snug tracking-tight md:text-3xl">
                  Today's read: <span className="font-serif-lab italic text-signal">constructive, with a compression twist.</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <p className="mt-5 max-w-xl font-mono-lab text-[12px] leading-6 tracking-wide text-dim">
                  BREADTH EXPANDS WHILE TURNOVER COMPRESSES — A SIGNATURE THAT TYPICALLY RESOLVES IN DIRECTIONAL MOVES WITHIN 5–8 SESSIONS. FOREIGN FLOW CONFIRMS. WE STAY POSITIONED, STOPS TIGHTENED.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="FEEDS" label="Signal components" right="LIVE PULSE" />
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {SIGNAL_ROWS.map((r, i) => (
              <Reveal key={r.k} delay={i * 50} className="group flex items-center justify-between gap-6 bg-[#060606] p-6 transition-colors hover:bg-[#090909] md:p-7">
                <div>
                  <div className="font-mono-lab text-[10px] tracking-[0.2em] text-dim">{r.k}</div>
                  <div className="mt-2 font-mono-lab text-[10px] tracking-wider text-faint">{r.note}</div>
                </div>
                <div
                  className={cn(
                    'font-mono-lab text-xl tracking-tight md:text-2xl',
                    r.tone === 'up' ? 'text-signal' : r.tone === 'down' ? 'text-[#ff4d4d]' : 'text-[#ffb84d]'
                  )}
                >
                  {r.v}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-[#050505]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="WATCHLIST" label="On the radar" right={`REFRESH ${pulse}%`} />
          <div className="overflow-hidden border border-line">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line bg-[#080808] font-mono-lab text-[9px] tracking-[0.25em] text-faint">
                  <th className="px-6 py-3 text-left">TICKER</th>
                  <th className="px-6 py-3 text-left">SETUP</th>
                  <th className="hidden px-6 py-3 text-left md:table-cell">TRIGGER</th>
                  <th className="px-6 py-3 text-right">SIGNAL</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { t: 'ATW', s: 'Breakout retest', g: 'Hold above 405', sig: 'STRONG', up: true },
                  { t: 'LBV', s: 'Base formation', g: 'Volume expansion', sig: 'BUILDING', up: true },
                  { t: 'CSRH', s: 'Distribution risk', g: 'Lose 116 support', sig: 'CAUTION', up: false },
                  { t: 'IAM', s: 'Range compression', g: 'Break 132 pivot', sig: 'NEUTRAL', up: true },
                ].map((r, i) => (
                  <tr key={r.t} className={cn('border-b border-line/50 transition-colors hover:bg-white/[0.02]', i % 2 && 'bg-white/[0.01]')}>
                    <td className="px-6 py-4 font-mono-lab text-sm font-medium text-foreground">{r.t}</td>
                    <td className="px-6 py-4 font-mono-lab text-[11px] text-dim">{r.s}</td>
                    <td className="hidden px-6 py-4 font-mono-lab text-[11px] text-dim md:table-cell">{r.g}</td>
                    <td className={cn('px-6 py-4 text-right font-mono-lab text-[10px] tracking-[0.2em]', r.up ? 'text-signal' : 'text-[#ff4d4d]')}>
                      {r.sig}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
