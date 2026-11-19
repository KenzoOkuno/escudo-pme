import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useTheme } from './hooks/useTheme'
import { Avaliacao } from './modules/Avaliacao'
import { Checklist } from './modules/Checklist'
import { GuiaGolpes } from './modules/GuiaGolpes'
import { PainelInicial } from './modules/PainelInicial'
import { Simulador } from './modules/Simulador'
import type { SectionId } from './types'

export default function App() {
  const [section, setSection] = useState<SectionId>('painel')
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex min-h-svh flex-col bg-ink-100 text-ink-800 dark:bg-ink-900 dark:text-ink-100">
      <Header
        active={section}
        onNavigate={setSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">
        {section === 'painel' && <PainelInicial onNavigate={setSection} />}
        {section === 'golpes' && <GuiaGolpes />}
        {section === 'simulador' && <Simulador />}
        {section === 'checklist' && <Checklist />}
        {section === 'avaliacao' && <Avaliacao />}
      </main>

      <Footer />
    </div>
  )
}
