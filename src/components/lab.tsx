import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* Reveals children on scroll (IntersectionObserver) with optional stagger delay */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'span' | 'li'
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-in')
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={cn('reveal', className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

/* Interactive market canvas: drifting candles + live line + mouse crosshair with readout */
export function MarketCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef<{ x: number; y: number; inside: boolean }>({ x: 0, y: 0, inside: false })
  const [readout, setReadout] = useState<{ x: string; y: string } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    let t = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // pseudo-random walk seed
    const walk: number[] = []
    let v = 0.5
    for (let i = 0; i < 400; i++) {
      v += (Math.random() - 0.5) * 0.09
      v = Math.max(0.08, Math.min(0.92, v))
      walk.push(v)
    }

    const draw = () => {
      t += 0.0045
      ctx.clearRect(0, 0, w, h)

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.045)'
      ctx.lineWidth = 1
      const gs = 56
      for (let x = 0; x < w; x += gs) {
        ctx.beginPath()
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gs) {
        ctx.beginPath()
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(w, y + 0.5)
        ctx.stroke()
      }

      // faint candlesticks drifting in background
      const n = Math.floor(w / 34)
      for (let i = 0; i < n; i++) {
        const idx = (i * 7) % walk.length
        const base = walk[idx]
        const drift = Math.sin(t * 0.6 + i * 0.7) * 0.03
        const o = base + drift
        const c = base + drift + (Math.sin(i * 3.1 + t) * 0.05)
        const hi = Math.max(o, c) + 0.05
        const lo = Math.min(o, c) - 0.05
        const x = i * 34 + 18
        const up = c > o
        ctx.strokeStyle = up ? 'rgba(0,232,122,0.16)' : 'rgba(255,77,77,0.13)'
        ctx.fillStyle = up ? 'rgba(0,232,122,0.10)' : 'rgba(255,77,77,0.08)'
        ctx.beginPath()
        ctx.moveTo(x, h * (1 - lo))
        ctx.lineTo(x, h * (1 - hi))
        ctx.stroke()
        const top = h * (1 - Math.max(o, c))
        const bh = Math.max(3, Math.abs(h * (c - o)))
        ctx.fillRect(x - 5, top, 10, bh)
      }

      // live polyline across the canvas
      ctx.beginPath()
      const pts = 160
      for (let i = 0; i <= pts; i++) {
        const p = i / pts
        const widx = Math.floor(p * (walk.length - 30) + ((t * 8) % 20))
        const yv = walk[widx] + Math.sin(t * 2 + i * 0.35) * 0.02
        const x = p * w
        const y = h * (0.15 + yv * 0.7)
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      const grad = ctx.createLinearGradient(0, 0, w, 0)
      grad.addColorStop(0, 'rgba(0,232,122,0)')
      grad.addColorStop(0.35, 'rgba(0,232,122,0.55)')
      grad.addColorStop(1, 'rgba(0,232,122,0.15)')
      ctx.strokeStyle = grad
      ctx.lineWidth = 1.5
      ctx.stroke()

      // mouse crosshair
      const m = mouse.current
      if (m.inside) {
        ctx.strokeStyle = 'rgba(0,232,122,0.35)'
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(m.x, 0)
        ctx.lineTo(m.x, h)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, m.y)
        ctx.lineTo(w, m.y)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.arc(m.x, m.y, 4, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0,232,122,0.9)'
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouse.current = { x, y, inside: true }
      setReadout({
        x: ((x / rect.width) * 100).toFixed(2),
        y: (42000 + (1 - y / rect.height) * 4100).toFixed(2),
      })
    }
    const onLeave = () => {
      mouse.current.inside = false
      setReadout(null)
    }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className={cn('relative', className)}>
      <canvas ref={canvasRef} className="h-full w-full cursor-crosshair-lab" />
      {readout && (
        <div className="pointer-events-none absolute right-3 top-3 font-mono-lab text-[10px] leading-4 text-signal/80">
          <div>T.{readout.x}s</div>
          <div>PX {readout.y}</div>
        </div>
      )}
    </div>
  )
}

/* Spotlight wrapper: tracks mouse into CSS vars for .spot-card glow */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])
  return ref
}

/* Live-updating mock price (ticks every ~1.4s) */
export function useLivePrice(base: number, vol = 0.004) {
  const [price, setPrice] = useState(base)
  const [dir, setDir] = useState<1 | -1>(1)
  useEffect(() => {
    const id = setInterval(() => {
      setPrice((p) => {
        const d = (Math.random() - 0.48) * base * vol
        setDir(d >= 0 ? 1 : -1)
        return +(p + d).toFixed(2)
      })
    }, 1400)
    return () => clearInterval(id)
  }, [base, vol])
  return { price, dir }
}
