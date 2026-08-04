import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/lab'
import { useLang } from '@/i18n/LanguageContext'
import { useTheme } from '@/theme/ThemeContext'
import { LANG_META, type Lang } from '@/i18n/translations'
import SearchPalette from '@/components/SearchPalette'

/* ---------- READING PROGRESS BAR ---------- */
function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div ref={barRef} className="reading-progress" />
}

/* ---------- NAV STRUCTURE ---------- */
type NavItem = {
  to: string
  label: string
  children?: { to: string; label: string; note: string }[]
}

function useNav(): NavItem[] {
  const { t } = useLang()
  return [
    { to: '/', label: t.nav.homepage },
    {
      to: '/analysis',
      label: t.nav.analysis,
      children: [
        { to: '/analysis/insights', label: t.nav.sub.insights.label, note: t.nav.sub.insights.note },
        { to: '/analysis/ideas', label: t.nav.sub.ideas.label, note: t.nav.sub.ideas.note },
      ],
    },
    { to: '/souk-signal', label: t.nav.soukSignal },
    {
      to: '/trade-tracker',
      label: t.nav.tradeTracker,
      children: [
        { to: '/trade-tracker/stocks', label: t.nav.sub.stocks.label, note: t.nav.sub.stocks.note },
        { to: '/trade-tracker/crypto', label: t.nav.sub.crypto.label, note: t.nav.sub.crypto.note },
      ],
    },
    { to: '/about', label: t.nav.about },
  ]
}

/* ---------- GLOBAL MARKET TAPE ---------- */
const TAPE: { s: string; v: string; d: string; up: boolean; g: 'US' | 'EU' | 'AS' | 'M7' | 'CR' }[] = [
  { s: 'S&P 500', v: '6,412.30', d: '+0.42%', up: true, g: 'US' },
  { s: 'NASDAQ', v: '21,208.7', d: '+0.68%', up: true, g: 'US' },
  { s: 'DOW', v: '44,912.0', d: '-0.11%', up: false, g: 'US' },
  { s: 'STOXX 600', v: '552.84', d: '+0.19%', up: true, g: 'EU' },
  { s: 'DAX', v: '24,315.0', d: '+0.31%', up: true, g: 'EU' },
  { s: 'CAC 40', v: '7,812.4', d: '-0.24%', up: false, g: 'EU' },
  { s: 'FTSE 100', v: '9,088.2', d: '+0.14%', up: true, g: 'EU' },
  { s: 'NIKKEI 225', v: '41,204.0', d: '+1.02%', up: true, g: 'AS' },
  { s: 'HANG SENG', v: '25,118.0', d: '-0.47%', up: false, g: 'AS' },
  { s: 'CSI 300', v: '4,086.5', d: '+0.36%', up: true, g: 'AS' },
  { s: 'AAPL', v: '232.40', d: '+0.83%', up: true, g: 'M7' },
  { s: 'MSFT', v: '512.15', d: '+0.57%', up: true, g: 'M7' },
  { s: 'NVDA', v: '182.66', d: '+1.94%', up: true, g: 'M7' },
  { s: 'GOOGL', v: '196.28', d: '-0.32%', up: false, g: 'M7' },
  { s: 'AMZN', v: '224.10', d: '+0.44%', up: true, g: 'M7' },
  { s: 'META', v: '712.90', d: '+1.12%', up: true, g: 'M7' },
  { s: 'TSLA', v: '308.72', d: '-1.28%', up: false, g: 'M7' },
  { s: 'BTC', v: '97,431', d: '+2.18%', up: true, g: 'CR' },
  { s: 'ETH', v: '3,812', d: '-1.04%', up: false, g: 'CR' },
  { s: 'SOL', v: '214.60', d: '+3.41%', up: true, g: 'CR' },
  { s: 'TAO', v: '412.30', d: '+5.02%', up: true, g: 'CR' },
  { s: 'ICP', v: '12.84', d: '-0.86%', up: false, g: 'CR' },
  { s: 'ZEC', v: '58.42', d: '+4.17%', up: true, g: 'CR' },
]

const TICKER_ITEMS = TAPE.map((t) => ({ s: t.s, v: t.v, d: t.d, up: t.up }))
export { TICKER_ITEMS }

const GROUP_TONE: Record<string, string> = {
  US: 'text-[#7db4ff]',
  EU: 'text-[#c9a86a]',
  AS: 'text-[#d98cb3]',
  M7: 'text-[#9d8cff]',
  CR: 'text-signal',
}

function TapeBar() {
  const { t } = useLang()
  const items = [...TAPE, ...TAPE]
  return (
    <div className="overflow-hidden border-b border-line bg-tape">
      <div className="ticker-track flex w-max items-center py-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2.5 px-5 font-mono-lab text-[10.5px] tracking-wider" dir="ltr">
            <span className={cn('text-[8px] tracking-[0.2em]', GROUP_TONE[it.g])}>{t.tape.groups[it.g]}</span>
            <span className="font-medium text-foreground/90">{it.s}</span>
            <span className="tabular-nums text-dim">{it.v}</span>
            <span className={cn('tabular-nums', it.up ? 'text-signal' : 'text-danger')}>
              {it.up ? '▲' : '▼'} {it.d}
            </span>
            <span className="ms-2 h-3 w-px bg-line" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- CLOCK ---------- */
function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const fmt = (tz: string) =>
    now.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  return (
    <div className="hidden items-center gap-4 font-mono-lab text-[10px] tracking-wider text-dim xl:flex" dir="ltr">
      <span>CAS {fmt('Africa/Casablanca')}</span>
      <span className="text-faint">/</span>
      <span>UTC {fmt('UTC')}</span>
    </div>
  )
}

/* ---------- LANGUAGE SWITCH ---------- */
function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang()
  return (
    <div className="flex items-center border border-line" role="group" aria-label="Language">
      {LANG_META.map((l: { id: Lang; label: string; short: string }) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          title={l.label}
          className={cn(
            'px-2.5 py-1.5 font-mono-lab text-[9.5px] tracking-[0.15em] transition-all duration-300',
            lang === l.id ? 'bg-signal text-[#0c0e12]' : 'text-dim hover:text-foreground'
          )}
        >
          {compact ? l.short : l.short}
        </button>
      ))}
    </div>
  )
}

/* ---------- THEME TOGGLE ---------- */
function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useLang()
  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? t.header.themeToLight : t.header.themeToDark}
      className="flex h-8 w-8 items-center justify-center border border-line text-dim transition-colors duration-300 hover:border-signal hover:text-signal"
      aria-label={theme === 'dark' ? t.header.themeToLight : t.header.themeToDark}
    >
      {theme === 'dark' ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
        </svg>
      )}
    </button>
  )
}

/* ---------- SEARCH BUTTON ---------- */
function SearchButton() {
  const { t } = useLang()
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('barek:search'))}
      className="hidden items-center gap-2.5 border border-line px-3 py-1.5 font-mono-lab text-[9.5px] tracking-[0.15em] text-dim transition-colors duration-300 hover:border-signal hover:text-signal md:flex"
    >
      <span>⌕</span>
      <span className="hidden lg:inline">{t.header.search}</span>
      <span className="border border-line px-1 py-px text-[8px] text-faint" dir="ltr">{t.header.searchHint}</span>
    </button>
  )
}

/* ---------- DESKTOP NAV ITEM (hover dropdown) ---------- */
function DesktopNavItem({ n }: { n: NavItem }) {
  const loc = useLocation()
  const isActive = n.to === '/' ? loc.pathname === '/' : loc.pathname.startsWith(n.to)
  const { t } = useLang()

  if (!n.children) {
    return (
      <NavLink
        to={n.to}
        end={n.to === '/'}
        className={cn(
          'nav-link flex h-full items-center whitespace-nowrap font-mono-lab text-[11px] tracking-[0.12em] transition-colors',
          isActive ? 'active text-signal' : 'text-foreground/85 hover:text-signal'
        )}
      >
        {n.label}
      </NavLink>
    )
  }

  return (
    <div className="group relative flex h-full items-center">
      <NavLink
        to={n.to}
        className={cn(
          'nav-link flex items-center gap-1.5 whitespace-nowrap font-mono-lab text-[11px] tracking-[0.12em] transition-colors',
          isActive ? 'active text-signal' : 'text-foreground/85 group-hover:text-signal'
        )}
      >
        {n.label}
        <span className="text-[8px] text-faint transition-all duration-300 group-hover:rotate-180 group-hover:text-signal">▼</span>
      </NavLink>

      {/* dropdown */}
      <div className="invisible absolute start-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 rtl:translate-x-1/2">
        <div className="min-w-[240px] border border-line bg-tape shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="border-b border-line px-5 py-2.5 font-mono-lab text-[8px] tracking-[0.3em] text-faint">
            {n.label} / {t.nav.subSections}
          </div>
          {n.children.map((c) => (
            <NavLink
              key={c.to}
              to={c.to}
              className={({ isActive: subActive }) =>
                cn(
                  'group/sub flex items-center justify-between gap-6 border-b border-line/50 px-5 py-3.5 transition-colors last:border-0 hover:bg-signal/[0.06]',
                  subActive && 'bg-signal/[0.04]'
                )
              }
            >
              <div>
                <div className="font-mono-lab text-[11px] tracking-[0.16em] text-foreground/90 group-hover/sub:text-signal">{c.label}</div>
                <div className="mt-1 font-mono-lab text-[9px] tracking-wider text-faint">{c.note}</div>
              </div>
              <span className="font-mono-lab text-faint transition-all duration-300 group-hover/sub:-translate-x-1 group-hover/sub:text-signal rtl:rotate-180">→</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- LAYOUT ---------- */
export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const loc = useLocation()
  const { t } = useLang()
  const NAV = useNav()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [loc.pathname])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgress />
      <SearchPalette />

      {/* ---- header ---- */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className={cn('border-b transition-all duration-500', scrolled ? 'border-line header-glass' : 'border-line/60 header-glass')}>
          <div className="mx-auto flex h-20 max-w-[1440px] items-stretch justify-between px-5 md:h-[76px] md:px-10">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="BAREK LABS" className="h-8 w-auto md:h-10 logo-adaptive" />
            </Link>

            <nav className="hidden items-stretch gap-7 md:flex">
              {NAV.map((n) => (
                <DesktopNavItem key={n.to} n={n} />
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Clock />
              <div className="hidden items-center gap-2 font-mono-lab text-[10px] tracking-wider text-signal xl:flex">
                <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                {t.header.systemsNominal}
              </div>
              <SearchButton />
              <ThemeToggle />
              <LangSwitch />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
                aria-label="Menu"
              >
                <span className={cn('h-px w-5 bg-foreground transition-transform', menuOpen && 'translate-y-[3.5px] rotate-45')} />
                <span className={cn('h-px w-5 bg-foreground transition-transform', menuOpen && '-translate-y-[3.5px] -rotate-45')} />
              </button>
            </div>
          </div>

          {/* mobile menu */}
          {menuOpen && (
            <nav className="border-t border-line bg-ink px-5 py-6 md:hidden">
              {NAV.map((n) => (
                <div key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) =>
                      cn('block py-3 font-mono-lab text-sm tracking-[0.12em]', isActive ? 'text-signal' : 'text-foreground/80')
                    }
                  >
                    {n.label}
                  </NavLink>
                  {n.children && (
                    <div className="mb-2 ms-6 border-s border-line ps-4">
                      {n.children.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          className={({ isActive }) =>
                            cn('block py-2 font-mono-lab text-[11px] tracking-[0.16em]', isActive ? 'text-signal' : 'text-dim')
                          }
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 border-t border-line pt-4">
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    window.dispatchEvent(new Event('barek:search'))
                  }}
                  className="flex w-full items-center gap-3 py-3 font-mono-lab text-sm tracking-[0.12em] text-foreground/80"
                >
                  <span>⌕</span> {t.header.search}
                </button>
              </div>
            </nav>
          )}
        </div>

        {/* ---- global market tape under menu ---- */}
        <TapeBar />
      </header>

      {/* ---- page ---- */}
      <main>
        <Outlet />
      </main>

      {/* ---- footer ---- */}
      <footer className="border-t border-line bg-footer">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <img src="/logo.svg" alt="BAREK LABS" className="h-6 w-auto logo-adaptive" />
              <p className="mt-5 max-w-sm font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{t.footer.tagline}</p>
              <div className="mt-6 flex items-center gap-2 font-mono-lab text-[10px] tracking-wider text-signal">
                <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                {t.footer.operational}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">{t.footer.sitemap}</div>
              <ul className="mt-4 space-y-2.5">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">{t.footer.subSections}</div>
              <ul className="mt-4 space-y-2.5">
                <li><Link to="/analysis/insights" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">{t.footer.subLinks.insights}</Link></li>
                <li><Link to="/analysis/ideas" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">{t.footer.subLinks.ideas}</Link></li>
                <li><Link to="/trade-tracker/stocks" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">{t.footer.subLinks.stocks}</Link></li>
                <li><Link to="/trade-tracker/crypto" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">{t.footer.subLinks.crypto}</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">{t.footer.protocol}</div>
              <p className="mt-4 font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{t.footer.protocolText}</p>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono-lab text-[10px] tracking-[0.2em] text-faint md:flex-row md:items-center">
            <span>{t.footer.copyright}</span>
            <span dir="ltr">{t.footer.build}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* Page hero shell shared by inner pages */
export function PageHero({
  code,
  title,
  serif,
  desc,
  children,
}: {
  code: string
  title: string
  serif?: string
  desc: string
  children?: React.ReactNode
}) {
  return (
    <section className="lab-grid relative border-b border-line pt-44 pb-16 md:pt-52 md:pb-20">
      <div className="scanline" />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{code}</div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 text-[13vw] font-medium leading-[0.92] tracking-tight md:text-[7.5vw]">
            {title}
            {serif && <span className="font-serif-lab italic text-dim"> {serif}</span>}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-xl font-mono-lab text-[12px] leading-6 tracking-wide text-dim">{desc}</p>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

/* Section heading */
export function SectionHead({ index, label, right }: { index: string; label: string; right?: React.ReactNode }) {
  return (
    <Reveal className="mb-10 flex items-end justify-between border-b border-line pb-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono-lab text-[10px] text-signal">{index}</span>
        <h2 className="text-xl font-medium tracking-tight md:text-2xl">{label}</h2>
      </div>
      {right && <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">{right}</div>}
    </Reveal>
  )
}
