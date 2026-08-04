import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'

function ContactCard({ c, i }: { c: { k: string; v: string; note: string }; i: number }) {
  const ref = useSpotlight<HTMLDivElement>()
  return (
    <Reveal delay={i * 80}>
      <div ref={ref} className="spot-card border border-line p-7">
        <div className="font-mono-lab text-[9px] tracking-[0.3em] text-faint">{c.k}</div>
        <div className="mt-4 break-all font-mono-lab text-sm tracking-wide text-foreground">{c.v}</div>
        <div className="mt-3 font-mono-lab text-[10px] tracking-wider text-dim">{c.note}</div>
      </div>
    </Reveal>
  )
}

export default function About() {
  return (
    <>
      <PageHero
        code="04 / ABOUT"
        title="The lab"
        serif="behind the signal"
        desc="BAREK LABS IS AN INDEPENDENT FINANCE & TECHNOLOGY LABORATORY. SMALL BY DESIGN, RIGOROUS BY OBSESSION, TRANSPARENT BY DEFAULT."
      />

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <img src="/logo.svg" alt="BAREK LABS" className="h-8 w-auto" />
              <div className="mt-8 font-mono-lab text-[10px] leading-6 tracking-wider text-dim">
                HQ — CASABLANCA, MOROCCO
                <br />
                OPERATING — REMOTE / GLOBAL
                <br />
                STATUS — INDEPENDENT, SELF-FUNDED
                <br />
                CONFLICTS — NONE TO DECLARE
              </div>
            </Reveal>
            <div className="md:col-span-8">
              <Reveal delay={100}>
                <p className="text-2xl font-light leading-[1.35] tracking-tight md:text-4xl">
                  We started BAREK LABS on a simple observation: most market commentary is{' '}
                  <span className="font-serif-lab italic text-signal">storytelling dressed as analysis</span>. We wanted a place where the data leads, the method is visible, and being wrong is documented as carefully as being right.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 max-w-xl font-mono-lab text-[12px] leading-6 tracking-wide text-dim">
                  THE LAB RUNS THREE INSTRUMENTS — A RESEARCH DESK, A SIGNAL ENGINE FOR REGIONAL MARKETS, AND A PUBLIC TRADE LEDGER. EACH EXISTS TO MAKE THE OTHERS HONEST. RESEARCH WITHOUT EXECUTION IS THEORY; EXECUTION WITHOUT RESEARCH IS GAMBLING.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-[#050505]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="PRINCIPLES" label="Operating principles" right="ENGRAVED, NOT PRINTED" />
          <div>
            {[
              { n: '01', t: 'Evidence over eloquence', d: 'If a claim cannot be traced to data, it does not ship. Eloquence is welcome only after the receipts.' },
              { n: '02', t: 'Small surface, deep water', d: 'Fewer instruments, better calibrated. We would rather be excellent in three markets than average in thirty.' },
              { n: '03', t: 'Skin in the ledger', d: 'We track our own positions publicly. Accountability is not a policy — it is an architecture.' },
              { n: '04', t: 'Curiosity as infrastructure', d: 'The edge decays. The habit of asking better questions does not. We invest in the habit.' },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 60} className="index-row group flex flex-col gap-3 border-b border-line py-8 md:flex-row md:items-baseline md:gap-10">
                <span className="w-12 shrink-0 font-mono-lab text-[10px] text-signal">{p.n}</span>
                <h3 className="w-72 shrink-0 text-xl font-medium tracking-tight transition-colors group-hover:text-signal md:text-2xl">{p.t}</h3>
                <p className="max-w-xl font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="CONTACT" label="Reach the lab" right="RESPONSE < 48H" />
          <div className="grid gap-4 md:grid-cols-3">
            <ContactCard c={{ k: 'GENERAL', v: 'desk@bareklabs.io', note: 'Research queries, feedback, corrections' }} i={0} />
            <ContactCard c={{ k: 'COLLABORATION', v: 'labs@bareklabs.io', note: 'Data partnerships, joint research, tooling' }} i={1} />
            <ContactCard c={{ k: 'CODE / OPEN SOURCE', v: 'github.com/Bareklabs-io', note: 'Signal tooling, trackers, public models' }} i={2} />
          </div>
          <Reveal className="mt-14 text-center">
            <div className="select-none text-[18vw] font-semibold leading-none tracking-[-0.03em] outline-text md:text-[10vw]">
              BAREK/LABS
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
