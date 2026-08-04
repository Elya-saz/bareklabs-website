import { useState } from 'react'
import { Reveal, useLivePrice } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { cn } from '@/lib/utils'

function LiveCell({ base, vol, dp = 2 }: { base: number; vol?: number; dp?: number }) {
  const { price, dir } = useLivePrice(base, vol ?? 0.006)
  return (
    <span className={cn('font-mono-lab text-sm tabular-nums transition-colors duration-500', dir > 0 ? 'text-signal' : 'text-[#ff4d4d]')}>
      {price.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp })}
    </span>
  )
}

const OPEN_POSITIONS = [
  { t: 'BTC/USD', side: 'LONG', entry: 94210, base: 97431, size: '1.2R', funding: 'NEUTRAL', open: '2026.07.22' },
  { t: 'SOL/USD', side: 'LONG', entry: 198.4, base: 214.6, size: '0.8R', funding: 'MILD +', open: '2026.07.30' },
  { t: 'ETH/USD', side: 'FLAT', entry: 0, base: 3812, size: '—', funding: 'RESET', open: 'CLOSED +6.4% R' },
]

const REGIME = [
  { k: 'FUNDING REGIME', v: 'NEUTRAL', tone: 'mid', note: 'Leverage is not the driver — spot is' },
  { k: 'STABLECOIN FLOW', v: 'INFLOW', tone: 'up', note: 'Dry powder building on exchanges' },
  { k: 'VOL REGIME', v: 'EXPANDING', tone: 'mid', note: 'Size reduced accordingly' },
  { k: 'CORRELATION TO MACRO', v: '0.34', tone: 'up', note: 'Decoupling — idiosyncratic window' },
]

type Tab = 'POSITIONS' | 'REGIME'

export default function Crypto() {
  const [tab, setTab] = useState<Tab>('POSITIONS')
  return (
    <>
      <PageHero
        code="03.B / TRADE TRACKER — CRYPTO"
        title="Crypto"
        serif="ledger"
        desc="DIGITAL ASSETS WITH TRADITIONAL DISCIPLINE: SPOT-LED, FUNDING-AWARE, REGIME-FILTERED. LEVERAGE IS A TOOL, NOT A PERSONALITY."
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="LEDGER" label="Book & regime" right="PRICES SIMULATED LIVE" />

          <div className="mb-8 flex gap-2">
            {(['POSITIONS', 'REGIME'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'border px-5 py-2 font-mono-lab text-[10px] tracking-[0.25em] transition-all duration-300',
                  tab === t ? 'border-signal bg-signal text-[#060606]' : 'border-line text-dim hover:text-foreground'
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'POSITIONS' ? (
            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-line bg-[#080808] font-mono-lab text-[9px] tracking-[0.25em] text-faint">
                    <th className="px-6 py-3 text-left">PAIR</th>
                    <th className="px-6 py-3 text-left">SIDE</th>
                    <th className="px-6 py-3 text-right">ENTRY</th>
                    <th className="px-6 py-3 text-right">LAST</th>
                    <th className="px-6 py-3 text-right">SIZE</th>
                    <th className="px-6 py-3 text-right">FUNDING</th>
                    <th className="px-6 py-3 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {OPEN_POSITIONS.map((p, i) => (
                    <tr key={p.t} className={cn('border-b border-line/50 transition-colors hover:bg-white/[0.02]', i % 2 && 'bg-white/[0.01]')}>
                      <td className="px-6 py-4 font-mono-lab text-sm font-medium">{p.t}</td>
                      <td className={cn(
                        'px-6 py-4 font-mono-lab text-[10px] tracking-[0.2em]',
                        p.side === 'LONG' ? 'text-signal' : p.side === 'SHORT' ? 'text-[#ff4d4d]' : 'text-dim'
                      )}>
                        {p.side}
                      </td>
                      <td className="px-6 py-4 text-right font-mono-lab text-sm tabular-nums text-dim">
                        {p.entry ? p.entry.toLocaleString() : '—'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <LiveCell base={p.base} dp={p.base > 1000 ? 0 : 1} />
                      </td>
                      <td className="px-6 py-4 text-right font-mono-lab text-[11px] text-dim">{p.size}</td>
                      <td className="px-6 py-4 text-right font-mono-lab text-[10px] tracking-wider text-dim">{p.funding}</td>
                      <td className="px-6 py-4 text-right font-mono-lab text-[10px] text-faint">{p.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {REGIME.map((r, i) => (
                <Reveal key={r.k} delay={i * 60} className="flex items-center justify-between gap-6 bg-[#060606] p-7">
                  <div>
                    <div className="font-mono-lab text-[10px] tracking-[0.2em] text-dim">{r.k}</div>
                    <div className="mt-2 font-mono-lab text-[10px] tracking-wider text-faint">{r.note}</div>
                  </div>
                  <div className={cn(
                    'font-mono-lab text-lg tracking-tight',
                    r.tone === 'up' ? 'text-signal' : 'text-[#ffb84d]'
                  )}>
                    {r.v}
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-8">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">
              DISPLAYED PRICES ARE SIMULATED FOR DEMONSTRATION. CRYPTO POSITIONS CARRY SPECIFIC RISKS — CUSTODY, GAPS, LIQUIDATION CASCADES — DOCUMENTED PER TRADE.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
