import { Download, RotateCcw } from 'lucide-react'
import { checklistItems } from '../data/checklist'
import { useLocalStorage } from '../hooks/useLocalStorage'

const STORAGE_KEY = 'escudo-pme-checklist'

export function Checklist() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(STORAGE_KEY, {})

  const feitos = checklistItems.filter((item) => checked[item.id]).length
  const total = checklistItems.length
  const progresso = Math.round((feitos / total) * 100)

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const resetar = () => {
    setChecked({})
  }

  const exportar = () => {
    const linhas = [
      'Escudo PME — Checklist Operacional (Antes de Agir)',
      `Progresso: ${feitos}/${total} (${progresso}%)`,
      `Exportado em: ${new Date().toLocaleString('pt-BR')}`,
      '',
      ...checklistItems.map(
        (item, i) => `${checked[item.id] ? '[x]' : '[ ]'} ${i + 1}. ${item.texto}`,
      ),
      '',
      'Universidade Presbiteriana Mackenzie — Projeto de Extensão',
    ]
    const blob = new Blob([linhas.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `escudo-pme-checklist-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white sm:text-3xl">
            Checklist operacional
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-600 dark:text-ink-300 sm:text-base">
            Antes de agir em qualquer mensagem suspeita, passe por estes 10 pontos. Seu
            progresso fica salvo neste navegador.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportar}
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:border-ink-600 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-ink-700"
          >
            <Download className="h-4 w-4" aria-hidden />
            Exportar resumo
          </button>
          <button
            type="button"
            onClick={resetar}
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:border-ink-600 dark:text-ink-200 dark:hover:bg-ink-800"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Resetar
          </button>
        </div>
      </header>

      <div className="surface rounded-xl p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-ink-700 dark:text-ink-200">Progresso</span>
          <span className="tabular-nums text-ink-500">
            {feitos}/{total} · {progresso}%
          </span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700"
          role="progressbar"
          aria-valuenow={progresso}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {checklistItems.map((item, index) => {
          const ativo = Boolean(checked[item.id])
          return (
            <li key={item.id}>
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  ativo
                    ? 'border-brand-300 bg-brand-50 dark:border-brand-600/50 dark:bg-brand-900/20'
                    : 'border-ink-200 bg-white hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:hover:bg-ink-800/80'
                }`}
              >
                <input
                  type="checkbox"
                  checked={ativo}
                  onChange={() => toggle(item.id)}
                  className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-700 focus:ring-brand-500"
                />
                <span className="text-sm leading-relaxed text-ink-800 dark:text-ink-100">
                  <span className="mr-2 font-semibold text-brand-700 dark:text-brand-300">
                    {index + 1}.
                  </span>
                  {item.texto}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
