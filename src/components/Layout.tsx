import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/lab'

const NAV = [
  { to: '/', label: 'INDEX', code: '00' },
  { to: '/analysis', label: 'ANALYSIS', code: '01' },
  { to: '/souk-signal', label: 'SOUK SIGNAL', code: '02' },
  { to: '/trade-tracker', label: 'TRADE TRACKER', code: '03' },
  { to: '/about', label: 'ABOUT', code: '04' },
]

const TICKER_ITEMS = [
  { s: 'BVX COMP', v: '4,213.86', d: '+0.84%', up: true },
  { s: 'ATW', v: '412.50', d: '+1.92%', up: true },
  { s: 'CSRH', v: '118.20', d: '-0.34%', up: false },
  { s: 'IAM', v: '129.95', d: '+0.51%', up: true },
  { s: 'BTC/USD', v: '97,431', d: '+2.18%', up: true },
  { s: 'ETH/USD', v: '3,812', d: '-1.04%', up: false },
  { s: 'MASI', v: '13,204.1', d: '+0.22%', up: true },
  { s: 'LBV', v: '205.40', d: '+0.76%', up: true },
  { s: 'SOL/USD', v: '214.6', d: '+3.41%', up: true },
  { s: 'TQM', v: '88.15', d: '-0.12%', up: false },
]

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
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-all duration-500',
          scrolled ? 'border-line bg-[#060606]/90 backdrop-blur-md' : 'border-transparent bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="BAREK LABS" className="h-5 w-auto" />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  cn('nav-link font-mono-lab text-[11px] tracking-[0.18em] text-dim hover:text-foreground', isActive && 'active')
                }
              >
                {n.label}
              </NavLink>
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
          <nav className="border-t border-line bg-[#060606] px-5 py-6 md:hidden">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-baseline gap-3 py-3 font-mono-lab text-sm tracking-[0.15em]',
                    isActive ? 'text-signal' : 'text-dim'
                  )
                }
              >
                <span className="text-[10px] text-faint">{n.code}</span>
                {n.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* ---- page ---- */}
      <main ref={mainRef}>
        <Outlet />
      </main>

      {/* ---- footer ---- */}
      <footer className="border-t border-line bg-[#050505]">
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
            <span>BUILD 0.4.2 / VERCEL-READY</span>
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
    <section className="lab-grid relative border-b border-line pt-32 pb-16 md:pt-40 md:pb-20">
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

export { TICKER_ITEMS }
