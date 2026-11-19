import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Lock,
  ShieldAlert,
  Users,
} from 'lucide-react'
import type { SectionId } from '../types'

interface PainelInicialProps {
  onNavigate: (id: SectionId) => void
}

export function PainelInicial({ onNavigate }: PainelInicialProps) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-700 via-brand-800 to-ink-900 px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-teal-300/10 blur-3xl"
          aria-hidden
        />
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">
          Painel inicial · Impacto real nas PMEs
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          Pequenos negócios também são alvo — e muitas vezes o elo mais frágil.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-50/90 sm:text-base">
          Relatórios como os da Fortinet / FortiGuard Labs e pesquisas da Kaspersky
          apontam que pequenas e médias empresas concentram uma parcela relevante dos
          incidentes. Defesas mais simples, equipes enxutas e o uso intenso do WhatsApp
          no dia a dia tornam a engenharia social especialmente perigosa.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm ring-1 ring-white/20">
          <AlertTriangle className="h-8 w-8 shrink-0 text-amber-300" aria-hidden />
          <div>
            <p className="text-2xl font-bold tabular-nums sm:text-3xl">+40%</p>
            <p className="text-sm text-brand-100">
              dos ciberataques atingem pequenas e médias empresas
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="surface rounded-xl p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-warn-100 text-warn-600 dark:bg-warn-500/20 dark:text-warn-500">
            <Users className="h-5 w-5" aria-hidden />
          </div>
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
            Engenharia social
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            O atacante manipula pessoas — não só sistemas. Urgência, medo e autoridade
            falsas fazem a equipe pagar, clicar ou passar senhas sem conferir.
          </p>
        </article>

        <article className="surface rounded-xl p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-danger-100 text-danger-600 dark:bg-danger-500/20 dark:text-danger-500">
            <Lock className="h-5 w-5" aria-hidden />
          </div>
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
            Ransomware
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            Sequestro de dados por criptografia: arquivos e sistemas ficam inacessíveis
            até o pagamento de um “resgate”. Pode parar vendas, estoque e atendimento.
          </p>
        </article>

        <article className="surface rounded-xl p-5 sm:col-span-2 lg:col-span-1">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
            <Building2 className="h-5 w-5" aria-hidden />
          </div>
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
            Por que a PME é vulnerável?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            Poucos controles técnicos, senhas compartilhadas, atendimento 100% no
            WhatsApp e confiança excessiva em comprovantes e “suporte” improvisado.
          </p>
        </article>
      </section>

      <section className="surface-muted rounded-xl p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-3">
            <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-brand-700 dark:text-brand-300" />
            <div>
              <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                Como usar esta plataforma
              </h2>
              <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
                Percorra os módulos na ordem sugerida: conheça os golpes, treine no
                simulador, marque o checklist operacional e finalize com a avaliação
                (70% de acertos, até 3 tentativas, 15 minutos).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('golpes')}
            className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            Começar pelos 5 golpes
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </section>
    </div>
  )
}
