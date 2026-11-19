import { useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, Eye, Filter } from 'lucide-react'
import { filtroLabels, golpes } from '../data/golpes'
import type { GolpeCategoria } from '../types'

const filtros: GolpeCategoria[] = [
  'todos',
  'financeiro',
  'phishing',
  'ransomware',
  'redes',
  'supply',
]

export function GuiaGolpes() {
  const [filtro, setFiltro] = useState<GolpeCategoria>('todos')
  const [abertoId, setAbertoId] = useState<string | null>(golpes[0]?.id ?? null)

  const lista = useMemo(
    () => (filtro === 'todos' ? golpes : golpes.filter((g) => g.categoria === filtro)),
    [filtro],
  )

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white sm:text-3xl">
          Guia interativo: 5 golpes digitais
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-ink-600 dark:text-ink-300 sm:text-base">
          Filtre por tipo e abra cada card para ver como o golpe acontece, os sinais de
          alerta e a ação preventiva imediata.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
          <Filter className="h-3.5 w-3.5" aria-hidden />
          Filtrar
        </span>
        {filtros.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltro(f)}
            className={`focus-ring rounded-full px-3 py-1.5 text-sm font-medium transition ${
              filtro === f
                ? 'bg-brand-700 text-white'
                : 'bg-ink-100 text-ink-700 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-ink-700'
            }`}
          >
            {filtroLabels[f]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {lista.map((golpe) => {
          const aberto = abertoId === golpe.id
          return (
            <article
              key={golpe.id}
              className={`surface overflow-hidden rounded-xl transition ${
                aberto ? 'ring-2 ring-brand-500/60' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setAbertoId(aberto ? null : golpe.id)}
                className="focus-ring flex w-full items-start justify-between gap-3 p-5 text-left"
                aria-expanded={aberto}
              >
                <div>
                  <span className="inline-block rounded-md bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-800 dark:bg-brand-500/20 dark:text-brand-200">
                    {golpe.tag}
                  </span>
                  <h2 className="mt-2 font-display text-base font-semibold text-ink-900 dark:text-white sm:text-lg">
                    {golpe.titulo}
                  </h2>
                </div>
                <Eye
                  className={`mt-1 h-5 w-5 shrink-0 ${aberto ? 'text-brand-600' : 'text-ink-400'}`}
                  aria-hidden
                />
              </button>

              {aberto && (
                <div className="space-y-3 border-t border-ink-100 px-5 pb-5 pt-4 dark:border-ink-700">
                  <div className="rounded-lg bg-ink-50 p-3 dark:bg-ink-900/50">
                    <p className="text-xs font-bold uppercase tracking-wide text-ink-500">
                      Como acontece
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                      {golpe.comoAcontece}
                    </p>
                  </div>
                  <div className="rounded-lg bg-warn-50 p-3 dark:bg-warn-500/10">
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-warn-600 dark:text-warn-500">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                      Sinal de alerta
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                      {golpe.sinalAlerta}
                    </p>
                  </div>
                  <div className="rounded-lg bg-success-50 p-3 dark:bg-success-500/10">
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-success-600 dark:text-success-500">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                      Ação preventiva imediata
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                      {golpe.acaoPreventiva}
                    </p>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>

      {lista.length === 0 && (
        <p className="text-sm text-ink-500">Nenhum golpe neste filtro.</p>
      )}
    </div>
  )
}
