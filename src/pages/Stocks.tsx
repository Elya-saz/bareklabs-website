import { useState } from 'react'
import { Reveal, useLivePrice } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { cn } from '@/lib/utils'

function LiveCell({ base, vol }: { base: number; vol?: number }) {
  const { price, dir } = useLivePrice(base, vol ?? 0.003)
  return (
    <span className={cn('font-mono-lab text-sm tabular-nums transition-colors duration-500', dir > 0 ? 'text-signal' : 'text-[#ff4d4d]')}>
      {price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
    </span>
  )
}

const OPEN_POSITIONS = [
  { t: 'ATW', name: 'Attijariwafa Bank', side: 'LONG', entry: 398.2, base: 412.5, size: '1.5R', pnl: '+3.6%', open: '2026.07.28' },
  { t: 'LBV', name: 'Label Vie', side: 'LONG', entry: 198.0, base: 205.4, size: '1.0R', pnl: '+3.7%', open: '2026.08.01' },
  { t: 'IAM', name: 'Maroc Telecom', side: 'LONG', entry: 126.4, base: 129.95, size: '0.8R', pnl: '+2.8%', open: '2026.07.15' },
  { t: 'CSRH', name: 'Cash Plus Hldg', side: 'SHORT', entry: 121.3, base: 118.2, size: '0.5R', pnl: '+2.6%', open: '2026.08.02' },
]

const CLOSED = [
  { t: 'TQM', side: 'LONG', pnl: '+5.2%', r: '+1.9R', note: 'Breadth breakout, target hit' },
  { t: 'GAZ', side: 'LONG', pnl: '-1.8%', r: '-0.6R', note: 'Stopped — thesis intact, timing wrong' },
  { t: 'MNG', side: 'LONG', pnl: '+7.4%', r: '+2.4R', note: 'Earnings drift play, full target' },
  { t: 'S2M', side: 'SHORT', pnl: '+3.1%', r: '+1.1R', note: 'Distribution pattern resolved' },
  { t: 'DYT', side: 'LONG', pnl: '-2.2%', r: '-0.8R', note: 'Stopped — regime shifted mid-trade' },
]

type Tab = 'OPEN' | 'CLOSED'

export default function Stocks() {
  const [tab, setTab] = useState<Tab>('OPEN')
  return (
    <>
      <PageHero
        code="03.A / TRADE TRACKER — STOCKS"
        title="Stocks"
        serif="ledger"
        desc="EQUITY POSITIONS, LIVE. PRICES TICK, P&L MOVES, THE RECORD DOESN'T. EVERY ENTRY LINKED TO A PUBLISHED THESIS."
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="LEDGER" label="Positions" right="PRICES SIMULATED LIVE" />

          <div className="mb-8 flex gap-2">
            {(['OPEN', 'CLOSED'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'border px-5 py-2 font-mono-lab text-[10px] tracking-[0.25em] transition-all duration-300',
                  tab === t ? 'border-signal bg-signal text-[#060606]' : 'border-line text-dim hover:text-foreground'
                )}
              >
                {t} {t === 'OPEN' ? `(${OPEN_POSITIONS.length})` : `(${CLOSED.length})`}
              </button>
            ))}
          </div>

          {tab === 'OPEN' ? (
            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-line bg-[#080808] font-mono-lab text-[9px] tracking-[0.25em] text-faint">
                    <th className="px-6 py-3 text-left">TICKER</th>
                    <th className="px-6 py-3 text-left">SIDE</th>
                    <th className="px-6 py-3 text-right">ENTRY</th>
                    <th className="px-6 py-3 text-right">LAST</th>
                    <th className="px-6 py-3 text-right">SIZE</th>
                    <th className="px-6 py-3 text-right">P&L</th>
                    <th className="px-6 py-3 text-right">OPENED</th>
                  </tr>
                </thead>
                <tbody>
                  {OPEN_POSITIONS.map((p, i) => (
                    <tr key={p.t} className={cn('border-b border-line/50 transition-colors hover:bg-white/[0.02]', i % 2 && 'bg-white/[0.01]')}>
                      <td className="px-6 py-4">
                        <div className="font-mono-lab text-sm font-medium">{p.t}</div>
                        <div className="font-mono-lab text-[10px] text-faint">{p.name}</div>
                      </td>
                      <td className={cn('px-6 py-4 font-mono-lab text-[10px] tracking-[0.2em]', p.side === 'LONG' ? 'text-signal' : 'text-[#ff4d4d]')}>
                        {p.side}
                      </td>
                      <td className="px-6 py-4 text-right font-mono-lab text-sm tabular-nums text-dim">{p.entry.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right"><LiveCell base={p.base} /></td>
                      <td className="px-6 py-4 text-right font-mono-lab text-[11px] text-dim">{p.size}</td>
                      <td className="px-6 py-4 text-right font-mono-lab text-sm text-signal">{p.pnl}</td>
                      <td className="px-6 py-4 text-right font-mono-lab text-[10px] text-faint">{p.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden border border-line bg-line">
              {CLOSED.map((c, i) => (
                <Reveal key={c.t + i} delay={i * 40} className="flex flex-col gap-2 bg-[#060606] p-6 md:flex-row md:items-center md:gap-8">
                  <span className="w-16 font-mono-lab text-sm font-medium">{c.t}</span>
                  <span className={cn('w-16 font-mono-lab text-[10px] tracking-[0.2em]', c.side === 'LONG' ? 'text-signal' : 'text-[#ff4d4d]')}>
                    {c.side}
                  </span>
                  <span className="flex-1 font-mono-lab text-[11px] tracking-wide text-dim">{c.note}</span>
                  <span className={cn('font-mono-lab text-sm', c.pnl.startsWith('+') ? 'text-signal' : 'text-[#ff4d4d]')}>
                    {c.pnl} <span className="text-faint">/</span> {c.r}
                  </span>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-8">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">
              DISPLAYED PRICES ARE SIMULATED FOR DEMONSTRATION. LIVE EXECUTION FEEDS PLUG INTO THE SAME LEDGER AT LAUNCH.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
