import { useState } from 'react'
import { Reveal, useLivePrice } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

function LiveCell({ base, vol, dp = 2 }: { base: number; vol?: number; dp?: number }) {
  const { price, dir } = useLivePrice(base, vol ?? 0.006)
  return (
    <span className={cn('font-mono-lab text-sm tabular-nums transition-colors duration-500', dir > 0 ? 'text-signal' : 'text-danger')}>
      {price.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp })}
    </span>
  )
}

type Tab = 'POSITIONS' | 'REGIME'

export default function Crypto() {
  const [tab, setTab] = useState<Tab>('POSITIONS')
  const { t } = useLang()

  return (
    <>
      <PageHero
        code={t.crypto.hero.code}
        title={t.crypto.hero.title}
        serif={t.crypto.hero.serif}
        desc={t.crypto.hero.desc}
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="LEDGER" label={t.crypto.head} right={t.crypto.headRight} />

          <div className="mb-8 flex gap-2">
            {(['POSITIONS', 'REGIME'] as Tab[]).map((tb) => (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                className={cn(
                  'border px-5 py-2 font-mono-lab text-[10px] tracking-[0.25em] transition-all duration-300',
                  tab === tb ? 'border-signal bg-signal text-[#0c0e12]' : 'border-line text-dim hover:text-foreground'
                )}
              >
                {tb === 'POSITIONS' ? t.crypto.tabs.positions : t.crypto.tabs.regime}
              </button>
            ))}
          </div>

          {tab === 'POSITIONS' ? (
            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-line bg-ticker font-mono-lab text-[9px] tracking-[0.25em] text-faint">
                    <th className="px-6 py-3 text-start">{t.crypto.cols.pair}</th>
                    <th className="px-6 py-3 text-start">{t.crypto.cols.side}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.entry}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.last}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.size}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.funding}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.crypto.positions.map((p, i) => (
                    <tr key={p.t} className={cn('border-b border-line/50 transition-colors bg-row-hover', i % 2 === 1 && 'bg-stripe')}>
                      <td className="px-6 py-4 font-mono-lab text-sm font-medium" dir="ltr">{p.t}</td>
                      <td className={cn(
                        'px-6 py-4 font-mono-lab text-[10px] tracking-[0.2em]',
                        p.side === 'LONG' ? 'text-signal' : p.side === 'SHORT' ? 'text-danger' : 'text-dim'
                      )}>
                        {t.crypto.side[p.side]}
                      </td>
                      <td className="px-6 py-4 text-end font-mono-lab text-sm tabular-nums text-dim" dir="ltr">
                        {p.entry ? p.entry.toLocaleString() : '—'}
                      </td>
                      <td className="px-6 py-4 text-end" dir="ltr">
                        <LiveCell base={p.base} dp={p.base > 1000 ? 0 : 1} />
                      </td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[11px] text-dim" dir="ltr">{p.size}</td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[10px] tracking-wider text-dim">{p.funding}</td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[10px] text-faint">{p.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {t.crypto.regime.map((r, i) => (
                <Reveal key={r.k} delay={i * 60} className="flex items-center justify-between gap-6 bg-card2 p-7">
                  <div>
                    <div className="font-mono-lab text-[10px] tracking-[0.2em] text-dim">{r.k}</div>
                    <div className="mt-2 font-mono-lab text-[10px] tracking-wider text-faint">{r.note}</div>
                  </div>
                  <div className={cn('font-mono-lab text-lg tracking-tight', r.tone === 'up' ? 'text-signal' : 'text-warn')} dir="ltr">
                    {r.v}
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-8">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.crypto.disclaimer}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
