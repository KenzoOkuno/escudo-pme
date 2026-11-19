import { useMemo, useState } from 'react'
import { CheckCircle2, MessageCircle, RotateCcw, Sparkles } from 'lucide-react'

type SinalId = 'urgencia' | 'link' | 'credenciais'

interface Sinal {
  id: SinalId
  label: string
  explicacao: string
}

const SINAIS: Sinal[] = [
  {
    id: 'urgencia',
    label: 'Urgência excessiva',
    explicacao:
      'Frases como “pode bloquear suas vendas hoje” e “imediatamente” pressionam você a agir sem conferir. Suportes oficiais raramente cobram ação em minutos sob ameaça de perda.',
  },
  {
    id: 'link',
    label: 'Link suspeito / domínio não oficial',
    explicacao:
      'O domínio suporte-atualizacao-pdv.com não é o site do seu fornecedor. Canais oficiais usam o domínio contratado ou o app/portal que você já conhece — nunca um link frio no WhatsApp.',
  },
  {
    id: 'credenciais',
    label: 'Pedido de credenciais por canal não seguro',
    explicacao:
      'Suporte legítimo não pede usuário e senha por WhatsApp. Quem tem a senha pode alterar dados, desviar vendas e sequestrar o sistema. Confirme sempre pelo telefone do contrato.',
  },
]

const TRECHOS: { id: SinalId; texto: string }[] = [
  { id: 'urgencia', texto: 'pode bloquear suas vendas hoje' },
  { id: 'urgencia', texto: 'imediatamente' },
  { id: 'link', texto: 'http://suporte-atualizacao-pdv.com/login' },
  { id: 'credenciais', texto: 'confirme seu usuário e senha' },
]

export function Simulador() {
  const [marcados, setMarcados] = useState<SinalId[]>([])
  const [mostrarAnalise, setMostrarAnalise] = useState(false)

  const completo = marcados.length === SINAIS.length

  const mensagemPartes = useMemo(() => {
    const texto =
      'Olá! Sou do suporte técnico do seu sistema de gestão/PDV. Identificamos uma inconsistência na sua conta que pode bloquear suas vendas hoje. Para atualizar, clique no link abaixo e confirme seu usuário e senha imediatamente: http://suporte-atualizacao-pdv.com/login'

    const hits: { start: number; end: number; id: SinalId; texto: string }[] = []
    for (const trecho of TRECHOS) {
      const idx = texto.indexOf(trecho.texto)
      if (idx >= 0) {
        hits.push({
          start: idx,
          end: idx + trecho.texto.length,
          id: trecho.id,
          texto: trecho.texto,
        })
      }
    }
    hits.sort((a, b) => a.start - b.start)

    const parts: { type: 'text' | 'mark'; value: string; id?: SinalId }[] = []
    let cursor = 0
    for (const hit of hits) {
      if (hit.start > cursor) {
        parts.push({ type: 'text', value: texto.slice(cursor, hit.start) })
      }
      parts.push({ type: 'mark', value: hit.texto, id: hit.id })
      cursor = hit.end
    }
    if (cursor < texto.length) {
      parts.push({ type: 'text', value: texto.slice(cursor) })
    }
    return parts
  }, [])

  const toggleSinal = (id: SinalId) => {
    setMarcados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const reset = () => {
    setMarcados([])
    setMostrarAnalise(false)
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white sm:text-3xl">
          Simulador de caso prático
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-ink-600 dark:text-ink-300 sm:text-base">
          Clique nos trechos suspeitos da mensagem ou marque os sinais de fraude na
          lista. Depois veja a análise detalhada.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface rounded-xl p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200">
            <MessageCircle className="h-5 w-5 text-brand-600" aria-hidden />
            WhatsApp da empresa · mensagem recebida
          </div>

          <div className="rounded-2xl bg-[#e7f5e9] p-4 dark:bg-ink-900">
            <div className="max-w-[95%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-ink-800 shadow-sm dark:bg-ink-800 dark:text-ink-100">
              <p className="mb-1 text-xs font-semibold text-brand-700 dark:text-brand-300">
                Suporte PDV (desconhecido)
              </p>
              <p>
                {mensagemPartes.map((part, i) =>
                  part.type === 'text' ? (
                    <span key={i}>{part.value}</span>
                  ) : (
                    <button
                      key={i}
                      type="button"
                      onClick={() => part.id && toggleSinal(part.id)}
                      className={`mx-0.5 rounded px-1 font-semibold underline decoration-dashed underline-offset-2 transition ${
                        part.id && marcados.includes(part.id)
                          ? 'bg-danger-100 text-danger-700 dark:bg-danger-500/30 dark:text-danger-100'
                          : 'bg-amber-100/80 text-amber-900 hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-100'
                      }`}
                    >
                      {part.value}
                    </button>
                  ),
                )}
              </p>
            </div>
            <p className="mt-2 text-xs text-ink-500 dark:text-ink-400">
              Dica: toque nos trechos destacados para marcar os sinais.
            </p>
          </div>
        </section>

        <section className="surface rounded-xl p-5">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
            Sinais de fraude
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Marque os três sinais presentes nesta mensagem ({marcados.length}/3).
          </p>

          <ul className="mt-4 space-y-2">
            {SINAIS.map((sinal) => {
              const ativo = marcados.includes(sinal.id)
              return (
                <li key={sinal.id}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink-200 p-3 transition hover:bg-ink-50 dark:border-ink-600 dark:hover:bg-ink-800/80">
                    <input
                      type="checkbox"
                      checked={ativo}
                      onChange={() => toggleSinal(sinal.id)}
                      className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-700 focus:ring-brand-500"
                    />
                    <span className="text-sm font-medium text-ink-800 dark:text-ink-100">
                      {sinal.label}
                    </span>
                    {ativo && (
                      <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-success-600" />
                    )}
                  </label>
                </li>
              )
            })}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={!completo}
              onClick={() => setMostrarAnalise(true)}
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Ver análise detalhada
            </button>
            <button
              type="button"
              onClick={reset}
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:border-ink-600 dark:text-ink-200 dark:hover:bg-ink-800"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Reiniciar
            </button>
          </div>
        </section>
      </div>

      {mostrarAnalise && (
        <section
          className="rounded-xl border border-success-500/30 bg-success-50 p-5 dark:bg-success-500/10"
          role="status"
        >
          <h2 className="font-display text-lg font-semibold text-success-700 dark:text-success-400">
            Análise: isso é golpe
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
            Suportes oficiais de sistemas de gestão/PDV{' '}
            <strong>não pedem senha pelo WhatsApp</strong> e{' '}
            <strong>não enviam links suspeitos sem solicitação prévia</strong>. A
            combinação de urgência + domínio desconhecido + pedido de credenciais é o
            padrão clássico de engenharia social contra pequenos negócios.
          </p>
          <ul className="mt-4 space-y-3">
            {SINAIS.map((sinal) => (
              <li
                key={sinal.id}
                className="rounded-lg bg-white/80 p-3 text-sm dark:bg-ink-900/40"
              >
                <p className="font-semibold text-ink-900 dark:text-white">{sinal.label}</p>
                <p className="mt-1 text-ink-600 dark:text-ink-300">{sinal.explicacao}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-medium text-ink-800 dark:text-ink-100">
            Ação correta: não clicar, bloquear/denunciar o número, avisar a equipe e
            ligar para o suporte no telefone do contrato (se houver dúvida real).
          </p>
        </section>
      )}
    </div>
  )
}
