import { Moon, Shield, Sun } from 'lucide-react'
import type { SectionId } from '../types'
import type { ThemeMode } from '../hooks/useTheme'

const navItems: { id: SectionId; label: string; short: string }[] = [
  { id: 'painel', label: 'Painel', short: 'Início' },
  { id: 'golpes', label: '5 Golpes', short: 'Golpes' },
  { id: 'simulador', label: 'Simulador', short: 'Caso' },
  { id: 'checklist', label: 'Checklist', short: 'Lista' },
  { id: 'avaliacao', label: 'Avaliação', short: 'Teste' },
]

interface HeaderProps {
  active: SectionId
  onNavigate: (id: SectionId) => void
  theme: ThemeMode
  onToggleTheme: () => void
}

export function Header({ active, onNavigate, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/80 bg-white/90 backdrop-blur-md dark:border-ink-700 dark:bg-ink-900/90">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white shadow-sm">
            <Shield className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="font-display text-base font-bold leading-tight text-ink-900 dark:text-white sm:text-lg">
              Escudo PME
            </p>
            <p className="text-xs text-ink-500 dark:text-ink-400">
              Cibersegurança para Pequenos Negócios
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-100 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-ink-700"
          aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span className="hidden sm:inline">{theme === 'light' ? 'Escuro' : 'Claro'}</span>
        </button>
      </div>

      <nav
        className="mx-auto max-w-6xl overflow-x-auto px-2 pb-2"
        aria-label="Seções principais"
      >
        <ul className="flex min-w-max gap-1 sm:justify-center">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`focus-ring rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
                    isActive
                      ? 'bg-brand-700 text-white shadow-sm'
                      : 'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
