import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/lab'

/* ---------- NAV STRUCTURE (with sub-categories on hover) ---------- */
type NavItem = {
  to: string
  label: string
  code: string
  children?: { to: string; label: string; note: string }[]
}

const NAV: NavItem[] = [
  { to: '/', label: 'INDEX', code: '00' },
  {
    to: '/analysis',
    label: 'ANALYSIS',
    code: '01',
    children: [
      { to: '/analysis/insights', label: 'INSIGHTS', note: 'Research notes & reads' },
      { to: '/analysis/ideas', label: 'INVESTMENT IDEAS', note: 'Theses with receipts' },
    ],
  },
  { to: '/souk-signal', label: 'SOUK SIGNAL', code: '02' },
  {
    to: '/trade-tracker',
    label: 'TRADE TRACKER',
    code: '03',
    children: [
      { to: '/trade-tracker/stocks', label: 'STOCKS', note: 'Equity ledger, live' },
      { to: '/trade-tracker/crypto', label: 'CRYPTO', note: 'Digital assets ledger' },
    ],
  },
  { to: '/about', label: 'ABOUT', code: '04' },
]

/* ---------- GLOBAL MARKET TAPE (indices + MAG7 + crypto) ---------- */
const TAPE: { s: string; v: string; d: string; up: boolean; g: string }[] = [
  // US indices
  { s: 'S&P 500', v: '6,412.30', d: '+0.42%', up: true, g: 'US' },
  { s: 'NASDAQ', v: '21,208.7', d: '+0.68%', up: true, g: 'US' },
  { s: 'DOW', v: '44,912.0', d: '-0.11%', up: false, g: 'US' },
  // Europe
  { s: 'STOXX 600', v: '552.84', d: '+0.19%', up: true, g: 'EU' },
  { s: 'DAX', v: '24,315.0', d: '+0.31%', up: true, g: 'EU' },
  { s: 'CAC 40', v: '7,812.4', d: '-0.24%', up: false, g: 'EU' },
  { s: 'FTSE 100', v: '9,088.2', d: '+0.14%', up: true, g: 'EU' },
  // Asia
  { s: 'NIKKEI 225', v: '41,204.0', d: '+1.02%', up: true, g: 'AS' },
  { s: 'HANG SENG', v: '25,118.0', d: '-0.47%', up: false, g: 'AS' },
  { s: 'CSI 300', v: '4,086.5', d: '+0.36%', up: true, g: 'AS' },
  // MAG 7
  { s: 'AAPL', v: '232.40', d: '+0.83%', up: true, g: 'M7' },
  { s: 'MSFT', v: '512.15', d: '+0.57%', up: true, g: 'M7' },
  { s: 'NVDA', v: '182.66', d: '+1.94%', up: true, g: 'M7' },
  { s: 'GOOGL', v: '196.28', d: '-0.32%', up: false, g: 'M7' },
  { s: 'AMZN', v: '224.10', d: '+0.44%', up: true, g: 'M7' },
  { s: 'META', v: '712.90', d: '+1.12%', up: true, g: 'M7' },
  { s: 'TSLA', v: '308.72', d: '-1.28%', up: false, g: 'M7' },
  // Crypto
  { s: 'BTC', v: '97,431', d: '+2.18%', up: true, g: 'CR' },
  { s: 'ETH', v: '3,812', d: '-1.04%', up: false, g: 'CR' },
  { s: 'SOL', v: '214.60', d: '+3.41%', up: true, g: 'CR' },
  { s: 'TAO', v: '412.30', d: '+5.02%', up: true, g: 'CR' },
  { s: 'ICP', v: '12.84', d: '-0.86%', up: false, g: 'CR' },
  { s: 'ZEC', v: '58.42', d: '+4.17%', up: true, g: 'CR' },
]

/* keep old export name working for Home.tsx legacy import */
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
  const items = [...TAPE, ...TAPE]
  return (
    <div className="overflow-hidden border-b border-line bg-[#0d0f14]">
      <div className="ticker-track flex w-max items-center py-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2.5 px-5 font-mono-lab text-[10.5px] tracking-wider">
            <span className={cn('text-[8px] tracking-[0.2em]', GROUP_TONE[it.g])}>{it.g}</span>
            <span className="font-medium text-foreground/90">{it.s}</span>
            <span className="tabular-nums text-dim">{it.v}</span>
            <span className={cn('tabular-nums', it.up ? 'text-signal' : 'text-[#ff5c5c]')}>
              {it.up ? '▲' : '▼'} {it.d}
            </span>
            <span className="ml-2 h-3 w-px bg-line" />
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
    <div className="hidden items-center gap-4 font-mono-lab text-[10px] tracking-wider text-dim lg:flex">
      <span>CAS {fmt('Africa/Casablanca')}</span>
      <span className="text-faint">/</span>
      <span>UTC {fmt('UTC')}</span>
    </div>
  )
}

/* ---------- DESKTOP NAV ITEM (hover dropdown) ---------- */
function DesktopNavItem({ n }: { n: NavItem }) {
  const loc = useLocation()
  const isActive = n.to === '/' ? loc.pathname === '/' : loc.pathname.startsWith(n.to)

  if (!n.children) {
    return (
      <NavLink
        to={n.to}
        end={n.to === '/'}
        className={cn(
          'nav-link flex h-full items-center font-mono-lab text-[11.5px] tracking-[0.18em] transition-colors',
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
          'nav-link flex items-center gap-1.5 font-mono-lab text-[11.5px] tracking-[0.18em] transition-colors',
          isActive ? 'active text-signal' : 'text-foreground/85 group-hover:text-signal'
        )}
      >
        {n.label}
        <span className="text-[8px] text-faint transition-all duration-300 group-hover:rotate-180 group-hover:text-signal">▼</span>
      </NavLink>

      {/* dropdown */}
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
        <div className="min-w-[240px] border border-line bg-[#0d0f14] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="border-b border-line px-5 py-2.5 font-mono-lab text-[8px] tracking-[0.3em] text-faint">
            {n.label} / SUB-SECTIONS
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
                <div className={cn('font-mono-lab text-[11px] tracking-[0.2em]', 'text-foreground/90 group-hover/sub:text-signal')}>
                  {c.label}
                </div>
                <div className="mt-1 font-mono-lab text-[9px] tracking-wider text-faint">{c.note}</div>
              </div>
              <span className="font-mono-lab text-faint transition-all duration-300 group-hover/sub:translate-x-1 group-hover/sub:text-signal">→</span>
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
  const mainRef = useRef<HTMLElement>(null)

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
      {/* ---- header ---- */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            'border-b transition-all duration-500',
            scrolled ? 'border-line bg-[#0c0e12]/95 backdrop-blur-md' : 'border-line/60 bg-[#0c0e12]/80 backdrop-blur-sm'
          )}
        >
          <div className="mx-auto flex h-20 max-w-[1440px] items-stretch justify-between px-5 md:h-[76px] md:px-10">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="BAREK LABS" className="h-8 w-auto md:h-10" />
            </Link>

            <nav className="hidden items-stretch gap-8 md:flex">
              {NAV.map((n) => (
                <DesktopNavItem key={n.to} n={n} />
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <Clock />
              <div className="hidden items-center gap-2 font-mono-lab text-[10px] tracking-wider text-signal md:flex">
                <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                SYSTEMS NOMINAL
              </div>
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
            <nav className="border-t border-line bg-[#0c0e12] px-5 py-6 md:hidden">
              {NAV.map((n) => (
                <div key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-baseline gap-3 py-3 font-mono-lab text-sm tracking-[0.15em]',
                        isActive ? 'text-signal' : 'text-foreground/80'
                      )
                    }
                  >
                    <span className="text-[10px] text-faint">{n.code}</span>
                    {n.label}
                  </NavLink>
                  {n.children && (
                    <div className="mb-2 ml-8 border-l border-line pl-4">
                      {n.children.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          className={({ isActive }) =>
                            cn('block py-2 font-mono-lab text-[11px] tracking-[0.2em]', isActive ? 'text-signal' : 'text-dim')
                          }
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>

        {/* ---- global market tape under menu ---- */}
        <TapeBar />
      </header>

      {/* ---- page ---- */}
      <main ref={mainRef}>
        <Outlet />
      </main>

      {/* ---- footer ---- */}
      <footer className="border-t border-line bg-[#0a0c10]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <img src="/logo.svg" alt="BAREK LABS" className="h-6 w-auto" />
              <p className="mt-5 max-w-sm font-mono-lab text-[11px] leading-5 tracking-wide text-dim">
                INDEPENDENT RESEARCH LAB. MARKET INTELLIGENCE, SIGNAL PROCESSING AND EXECUTION TOOLING — BUILT IN THE OPEN.
              </p>
              <div className="mt-6 flex items-center gap-2 font-mono-lab text-[10px] tracking-wider text-signal">
                <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                ALL FEEDS OPERATIONAL
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">SITEMAP</div>
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
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">SUB-SECTIONS</div>
              <ul className="mt-4 space-y-2.5">
                <li><Link to="/analysis/insights" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">INSIGHTS</Link></li>
                <li><Link to="/analysis/ideas" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">IDEAS</Link></li>
                <li><Link to="/trade-tracker/stocks" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">STOCKS</Link></li>
                <li><Link to="/trade-tracker/crypto" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">CRYPTO</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">PROTOCOL</div>
              <p className="mt-4 font-mono-lab text-[11px] leading-5 tracking-wide text-dim">
                RESEARCH FIRST. EXECUTION LATER. NOTHING ON THIS SITE CONSTITUTES FINANCIAL ADVICE.
              </p>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono-lab text-[10px] tracking-[0.2em] text-faint md:flex-row md:items-center">
            <span>© 2026 BAREK LABS — ALL SIGNALS RESERVED</span>
            <span>BUILD 0.5.0 / VERCEL-READY</span>
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
