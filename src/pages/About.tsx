import { useEffect, useState } from 'react'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

function ContactCard({ c, i }: { c: { k: string; v: string; note: string }; i: number }) {
  const ref = useSpotlight<HTMLDivElement>()
  return (
    <Reveal delay={i * 80}>
      <div ref={ref} className="spot-card border border-line p-7">
        <div className="font-mono-lab text-[9px] tracking-[0.3em] text-faint">{c.k}</div>
        <div className="mt-4 break-all font-mono-lab text-sm tracking-wide text-foreground" dir="ltr">{c.v}</div>
        <div className="mt-3 font-mono-lab text-[10px] tracking-wider text-dim">{c.note}</div>
      </div>
    </Reveal>
  )
}

/* Sticky table of contents with active-section tracking */
function useToc(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

export default function About() {
  const { t } = useLang()
  const a = t.about
  const tocItems = [
    { id: 'founder', label: a.toc.founder },
    { id: 'story', label: a.toc.story },
    { id: 'principles', label: a.toc.principles },
    { id: 'contact', label: a.toc.contact },
  ]
  const active = useToc(tocItems.map((i) => i.id))

  return (
    <>
      <PageHero code={a.hero.code} title={a.hero.title} serif={a.hero.serif} desc={a.hero.desc} />

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="relative grid gap-12 lg:grid-cols-12">
          {/* ---- floating TOC ---- */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-44 py-20">
              <div className="font-mono-lab text-[9px] tracking-[0.3em] text-faint">{a.toc.onThisPage}</div>
              <nav className="mt-5 flex flex-col gap-1 border-s border-line">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      'toc-link -ms-px border-s py-2 ps-4 font-mono-lab text-[10px] tracking-[0.2em]',
                      active === item.id ? 'border-signal text-signal' : 'border-transparent text-dim hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-10 font-mono-lab text-[10px] leading-6 tracking-wider text-faint">
                {a.facts.hq}
                <br />
                {a.facts.ops}
                <br />
                {a.facts.status}
                <br />
                {a.facts.conflicts}
              </div>
            </div>
          </aside>

          {/* ---- main column ---- */}
          <div className="lg:col-span-9">
            {/* ===== FOUNDER ===== */}
            <section id="founder" className="scroll-mt-40 border-b border-line py-20">
              <SectionHead index="04.A" label={a.founder.head} right={a.founder.headRight} />
              <div className="grid gap-10 md:grid-cols-12">
                <Reveal className="md:col-span-5">
                  {/* PHOTO SLOT — replace /public/founder.jpg with the real portrait */}
                  <div className="group relative aspect-[3/4] overflow-hidden border border-line bg-card2">
                    {/* placeholder behind the photo */}
                    <div className="lab-grid-fine absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <span className="px-4 text-center font-mono-lab text-[10px] tracking-[0.3em] text-faint">{a.founder.photoNote}</span>
                      <span className="h-px w-10 bg-line" />
                      <span className="font-mono-lab text-[26px] font-light tracking-tight outline-text">BL</span>
                    </div>
                    <img
                      src="/founder.jpg"
                      alt={a.founder.head}
                      className="relative z-10 h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-line bg-tape px-4 py-2.5 font-mono-lab text-[9px] tracking-[0.25em] text-dim">
                      <span>{a.founder.role}</span>
                      <span className="text-signal">●</span>
                    </div>
                  </div>
                </Reveal>
                <div className="md:col-span-7">
                  <Reveal delay={120}>
                    <img src="/logo.svg" alt="BAREK LABS" className="h-7 w-auto logo-adaptive" />
                  </Reveal>
                  <Reveal delay={200}>
                    <p className="prose-lab mt-8">{a.founder.bio}</p>
                  </Reveal>
                </div>
              </div>
            </section>

            {/* ===== STORY ===== */}
            <section id="story" className="scroll-mt-40 border-b border-line py-20">
              <SectionHead index="04.B" label={a.story.head} right={a.story.headRight} />
              <Reveal>
                <div className="prose-lab">
                  {a.story.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* ===== PRINCIPLES ===== */}
            <section id="principles" className="scroll-mt-40 border-b border-line py-20">
              <SectionHead index="04.C" label={a.principles.head} right={a.principles.headRight} />
              <div>
                {a.principles.items.map((p, i) => (
                  <Reveal key={p.n} delay={i * 60} className="index-row group flex flex-col gap-3 border-b border-line py-8 md:flex-row md:items-baseline md:gap-10">
                    <span className="w-12 shrink-0 font-mono-lab text-[10px] text-signal" dir="ltr">{p.n}</span>
                    <h3 className="w-72 shrink-0 text-xl font-medium tracking-tight transition-colors group-hover:text-signal md:text-2xl">{p.t}</h3>
                    <p className="max-w-xl font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{p.d}</p>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ===== CONTACT ===== */}
            <section id="contact" className="scroll-mt-40 py-20">
              <SectionHead index="04.D" label={a.contact.head} right={a.contact.headRight} />
              <div className="grid gap-4 md:grid-cols-3">
                {a.contact.cards.map((c, i) => (
                  <ContactCard key={c.k} c={c} i={i} />
                ))}
              </div>
              <Reveal className="mt-14 text-center">
                <div className="select-none text-[18vw] font-semibold leading-none tracking-[-0.03em] outline-text md:text-[10vw]" dir="ltr">
                  BAREK/LABS
                </div>
              </Reveal>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
