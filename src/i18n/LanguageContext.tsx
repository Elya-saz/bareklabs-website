import { createContext, useContext, useEffect, useState } from 'react'
import { translations, type Dict, type Lang } from './translations'

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: Dict; rtl: boolean }

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: translations.en, rtl: false })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('barek-lang')
    return saved === 'fr' || saved === 'ar' || saved === 'en' ? saved : 'en'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('barek-lang', l)
  }

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang === 'ar' ? 'ar' : lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <Ctx.Provider value={{ lang, setLang, t: translations[lang], rtl: lang === 'ar' }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLang() {
  return useContext(Ctx)
}
