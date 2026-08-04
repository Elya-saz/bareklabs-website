import { useState } from 'react'
import { Reveal, useLivePrice } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

function LiveCell({ base, vol }: { base: number; vol?: number }) {
  const { price, dir } = useLivePrice(base, vol ?? 0.003)
  return (
    <span className={cn('font-mono-lab text-sm tabular-nums transition-colors duration-500', dir > 0 ? 'text-signal' : 'text-danger')}>
      {price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
    </span>
  )
}

type Tab = 'OPEN' | 'CLOSED'

export default function Stocks() {
  const [tab, setTab] = useState<Tab>('OPEN')
  const { t } = useLang()
  const OPEN = t.stocks.open
  const CLOSED = t.stocks.closed

  return (
    <>
      <PageHero
        code={t.stocks.hero.code}
        title={t.stocks.hero.title}
        serif={t.stocks.hero.serif}
        desc={t.stocks.hero.desc}
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="LEDGER" label={t.stocks.head} right={t.stocks.headRight} />

          <div className="mb-8 flex gap-2">
            {(['OPEN', 'CLOSED'] as Tab[]).map((tb) => (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                className={cn(
                  'border px-5 py-2 font-mono-lab text-[10px] tracking-[0.25em] transition-all duration-300',
                  tab === tb ? 'border-signal bg-signal text-[#0c0e12]' : 'border-line text-dim hover:text-foreground'
                )}
              >
                {tb === 'OPEN' ? t.stocks.tabs.open : t.stocks.tabs.closed} ({tb === 'OPEN' ? OPEN.length : CLOSED.length})
              </button>
            ))}
          </div>

          {tab === 'OPEN' ? (
            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-line bg-ticker font-mono-lab text-[9px] tracking-[0.25em] text-faint">
                    <th className="px-6 py-3 text-start">{t.stocks.cols.ticker}</th>
                    <th className="px-6 py-3 text-start">{t.stocks.cols.side}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.entry}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.last}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.size}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.pnl}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.opened}</th>
                  </tr>
                </thead>
                <tbody>
                  {OPEN.map((p, i) => (
                    <tr key={p.t} className={cn('border-b border-line/50 transition-colors bg-row-hover', i % 2 === 1 && 'bg-stripe')}>
                      <td className="px-6 py-4">
                        <div className="font-mono-lab text-sm font-medium" dir="ltr">{p.t}</div>
                        <div className="font-mono-lab text-[10px] text-faint">{p.name}</div>
                      </td>
                      <td className={cn('px-6 py-4 font-mono-lab text-[10px] tracking-[0.2em]', p.side === 'LONG' ? 'text-signal' : 'text-danger')}>
                        {t.stocks.side[p.side]}
                      </td>
                      <td className="px-6 py-4 text-end font-mono-lab text-sm tabular-nums text-dim" dir="ltr">{p.entry.toFixed(2)}</td>
                      <td className="px-6 py-4 text-end" dir="ltr"><LiveCell base={p.base} /></td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[11px] text-dim" dir="ltr">{p.size}</td>
                      <td className="px-6 py-4 text-end font-mono-lab text-sm text-signal" dir="ltr">{p.pnl}</td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[10px] text-faint" dir="ltr">{p.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden border border-line bg-line">
              {CLOSED.map((c, i) => (
                <Reveal key={c.t + i} delay={i * 40} className="flex flex-col gap-2 bg-card2 p-6 md:flex-row md:items-center md:gap-8">
                  <span className="w-16 font-mono-lab text-sm font-medium" dir="ltr">{c.t}</span>
                  <span className={cn('w-16 font-mono-lab text-[10px] tracking-[0.2em]', c.side === 'LONG' ? 'text-signal' : 'text-danger')}>
                    {t.stocks.side[c.side]}
                  </span>
                  <span className="flex-1 font-mono-lab text-[11px] tracking-wide text-dim">{c.note}</span>
                  <span className={cn('font-mono-lab text-sm', c.pnl.startsWith('+') ? 'text-signal' : 'text-danger')} dir="ltr">
                    {c.pnl} <span className="text-faint">/</span> {c.r}
                  </span>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-8">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.stocks.disclaimer}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
