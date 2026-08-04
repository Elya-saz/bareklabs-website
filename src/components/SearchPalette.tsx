import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

type Entry = { group: 'pages' | 'notes' | 'ideas' | 'trades'; label: string; sub: string; to: string }

export function useSearchIndex(): Entry[] {
  const { t } = useLang()
  return useMemo<Entry[]>(() => {
    const e: Entry[] = [
      { group: 'pages', label: t.nav.homepage, sub: '/', to: '/' },
      { group: 'pages', label: t.nav.analysis, sub: '/analysis', to: '/analysis' },
      { group: 'pages', label: t.nav.sub.insights.label, sub: '/analysis/insights', to: '/analysis/insights' },
      { group: 'pages', label: t.nav.sub.ideas.label, sub: '/analysis/ideas', to: '/analysis/ideas' },
      { group: 'pages', label: t.nav.soukSignal, sub: '/souk-signal', to: '/souk-signal' },
      { group: 'pages', label: t.nav.tradeTracker, sub: '/trade-tracker', to: '/trade-tracker' },
      { group: 'pages', label: t.nav.sub.stocks.label, sub: '/trade-tracker/stocks', to: '/trade-tracker/stocks' },
      { group: 'pages', label: t.nav.sub.crypto.label, sub: '/trade-tracker/crypto', to: '/trade-tracker/crypto' },
      { group: 'pages', label: t.nav.about, sub: '/about', to: '/about' },
    ]
    t.insights.notes.forEach((n) => e.push({ group: 'notes', label: n.t, sub: `${n.d} · ${n.tag}`, to: '/analysis/insights' }))
    t.ideas.items.forEach((i) => e.push({ group: 'ideas', label: i.title, sub: `${i.id} · ${t.ideas.status[i.status]}`, to: '/analysis/ideas' }))
    t.stocks.open.forEach((p) => e.push({ group: 'trades', label: `${p.t} — ${p.name}`, sub: `${t.stocks.side[p.side]} · ${p.open}`, to: '/trade-tracker/stocks' }))
    t.stocks.closed.forEach((p) => e.push({ group: 'trades', label: `${p.t} — ${p.note}`, sub: `${t.stocks.side[p.side]} · ${p.pnl}`, to: '/trade-tracker/stocks' }))
    t.crypto.positions.forEach((p) => e.push({ group: 'trades', label: p.t, sub: `${t.crypto.side[p.side]} · ${p.open}`, to: '/trade-tracker/crypto' }))
    return e
  }, [t])
}

export default function SearchPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const nav = useNavigate()
  const { t } = useLang()
  const index = useSearchIndex()

  // global Ctrl+K / Cmd+K + custom event from header button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('barek:search', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('barek:search', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQ('')
      setCursor(0)
      setTimeout(() => inputRef.current?.focus(), 30)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return index.slice(0, 9)
    return index.filter((e) => `${e.label} ${e.sub}`.toLowerCase().includes(needle)).slice(0, 12)
  }, [q, index])

  useEffect(() => setCursor(0), [results.length])

  const go = (to: string) => {
    setOpen(false)
    nav(to)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    } else if (e.key === 'Enter' && results[cursor]) {
      go(results[cursor].to)
    }
  }

  useEffect(() => {
    listRef.current?.children[cursor]?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  if (!open) return null

  return (
    <div className="search-overlay fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]" onClick={() => setOpen(false)}>
      <div
        className="w-full max-w-xl border border-line bg-panel shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        {/* input */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="font-mono-lab text-[11px] text-signal">⌕</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full bg-transparent font-mono-lab text-[13px] tracking-wide text-foreground placeholder:text-faint focus:outline-none"
          />
          <span className="shrink-0 border border-line px-1.5 py-0.5 font-mono-lab text-[9px] tracking-widest text-faint">{t.search.close}</span>
        </div>

        {/* results */}
        <div ref={listRef} className="max-h-[46vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-5 py-10 text-center font-mono-lab text-[11px] tracking-wider text-faint">{t.search.noResults}</div>
          ) : (
            results.map((r, i) => (
              <button
                key={`${r.to}-${i}`}
                onClick={() => go(r.to)}
                onMouseEnter={() => setCursor(i)}
                className={cn(
                  'flex w-full items-baseline gap-4 border-b border-line/40 px-5 py-3.5 text-start transition-colors last:border-0',
                  i === cursor ? 'bg-signal/[0.07]' : ''
                )}
              >
                <span className={cn('w-24 shrink-0 font-mono-lab text-[8px] tracking-[0.2em]', i === cursor ? 'text-signal' : 'text-faint')}>
                  {t.search.groups[r.group]}
                </span>
                <span className="flex-1">
                  <span className={cn('block text-[14px] font-light tracking-tight', i === cursor ? 'text-signal' : 'text-foreground')}>
                    {r.label}
                  </span>
                  <span className="mt-0.5 block font-mono-lab text-[9px] tracking-wider text-faint">{r.sub}</span>
                </span>
                <span className={cn('font-mono-lab text-[10px]', i === cursor ? 'text-signal' : 'text-faint')}>→</span>
              </button>
            ))
          )}
        </div>

        {/* footer hints */}
        <div className="flex items-center gap-5 border-t border-line px-5 py-2.5 font-mono-lab text-[8px] tracking-[0.2em] text-faint">
          <span>↑↓ {t.search.navigate}</span>
          <span>↵ {t.search.open}</span>
          <span className="ms-auto">BAREK LABS / SEARCH</span>
        </div>
      </div>
    </div>
  )
}
