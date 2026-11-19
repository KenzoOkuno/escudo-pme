import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Award,
  Clock,
  RotateCcw,
  ShieldCheck,
  Timer,
  XCircle,
} from 'lucide-react'
import {
  QUIZ_MAX_TENTATIVAS,
  QUIZ_NOTA_MINIMA,
  QUIZ_TEMPO_SEGUNDOS,
  quizQuestions,
} from '../data/quiz'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { QuizState } from '../types'

type Fase = 'intro' | 'em_andamento' | 'resultado'

type Respostas = Record<number, 'a' | 'b' | 'c' | 'd' | undefined>

const QUIZ_STATE_KEY = 'escudo-pme-quiz-state'

function formatTempo(segundos: number) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function Avaliacao() {
  const [quizState, setQuizState] = useLocalStorage<QuizState>(QUIZ_STATE_KEY, {
    tentativasUsadas: 0,
    ultimaPontuacao: null,
    ultimaAprovacao: null,
  })

  const [fase, setFase] = useState<Fase>('intro')
  const [respostas, setRespostas] = useState<Respostas>({})
  const [tempoRestante, setTempoRestante] = useState(QUIZ_TEMPO_SEGUNDOS)
  const [pontuacao, setPontuacao] = useState(0)
  const [aprovado, setAprovado] = useState(false)
  const [encerradoPorTempo, setEncerradoPorTempo] = useState(false)
  const respostasRef = useRef(respostas)

  useEffect(() => {
    respostasRef.current = respostas
  }, [respostas])

  const tentativasRestantes = QUIZ_MAX_TENTATIVAS - quizState.tentativasUsadas
  const esgotouTentativas = tentativasRestantes <= 0

  const finalizar = useCallback(
    (respostasAtuais: Respostas, porTempo: boolean) => {
      let acertos = 0
      for (const q of quizQuestions) {
        if (respostasAtuais[q.id] === q.correta) acertos += 1
      }
      const passou = acertos >= QUIZ_NOTA_MINIMA
      setPontuacao(acertos)
      setAprovado(passou)
      setEncerradoPorTempo(porTempo)
      setFase('resultado')
      setQuizState((prev) => ({
        tentativasUsadas: Math.min(prev.tentativasUsadas + 1, QUIZ_MAX_TENTATIVAS),
        ultimaPontuacao: acertos,
        ultimaAprovacao: passou,
      }))
    },
    [setQuizState],
  )

  useEffect(() => {
    if (fase !== 'em_andamento') return

    const endsAt = Date.now() + QUIZ_TEMPO_SEGUNDOS * 1000
    let encerrado = false

    const id = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000))
      setTempoRestante(left)
      if (left === 0 && !encerrado) {
        encerrado = true
        window.clearInterval(id)
        finalizar(respostasRef.current, true)
      }
    }, 250)

    return () => window.clearInterval(id)
  }, [fase, finalizar])

  const iniciar = () => {
    if (esgotouTentativas) return
    setRespostas({})
    setTempoRestante(QUIZ_TEMPO_SEGUNDOS)
    setEncerradoPorTempo(false)
    setFase('em_andamento')
  }

  const reiniciarTentativa = () => {
    if (esgotouTentativas && fase === 'resultado') {
      // ainda pode ver gabarito; para nova tentativa precisa resetar contador
      return
    }
    if (!esgotouTentativas) {
      iniciar()
    }
  }

  const resetarTodasTentativas = () => {
    setQuizState({
      tentativasUsadas: 0,
      ultimaPontuacao: null,
      ultimaAprovacao: null,
    })
    setFase('intro')
    setRespostas({})
    setTempoRestante(QUIZ_TEMPO_SEGUNDOS)
  }

  const respondidas = useMemo(
    () => quizQuestions.filter((q) => respostas[q.id]).length,
    [respostas],
  )

  const tempoCritico = tempoRestante <= 60

  if (fase === 'intro') {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white sm:text-3xl">
            Avaliação final
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-ink-600 dark:text-ink-300 sm:text-base">
            Teste com 10 questões sobre os cuidados do dia a dia. Regras do projeto
            aplicadas neste protótipo.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="surface rounded-xl p-4">
            <Clock className="h-5 w-5 text-brand-700 dark:text-brand-300" />
            <p className="mt-2 text-sm font-semibold text-ink-900 dark:text-white">
              15 minutos
            </p>
            <p className="text-xs text-ink-500">Cronômetro automático</p>
          </div>
          <div className="surface rounded-xl p-4">
            <RotateCcw className="h-5 w-5 text-brand-700 dark:text-brand-300" />
            <p className="mt-2 text-sm font-semibold text-ink-900 dark:text-white">
              Até 3 tentativas
            </p>
            <p className="text-xs text-ink-500">
              Restam {Math.max(tentativasRestantes, 0)} neste navegador
            </p>
          </div>
          <div className="surface rounded-xl p-4">
            <Award className="h-5 w-5 text-brand-700 dark:text-brand-300" />
            <p className="mt-2 text-sm font-semibold text-ink-900 dark:text-white">
              Aprovação: 7/10
            </p>
            <p className="text-xs text-ink-500">Mínimo de 70% de acertos</p>
          </div>
        </div>

        {quizState.ultimaPontuacao !== null && (
          <p className="rounded-lg bg-ink-100 px-4 py-3 text-sm text-ink-700 dark:bg-ink-800 dark:text-ink-200">
            Último resultado salvo: {quizState.ultimaPontuacao}/10 —{' '}
            {quizState.ultimaAprovacao ? 'Aprovado' : 'Reprovado'}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={iniciar}
            disabled={esgotouTentativas}
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden />
            {esgotouTentativas ? 'Tentativas esgotadas' : 'Iniciar teste'}
          </button>
          {esgotouTentativas && (
            <button
              type="button"
              onClick={resetarTodasTentativas}
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:border-ink-600 dark:text-ink-200 dark:hover:bg-ink-800"
            >
              Reiniciar contador de tentativas
            </button>
          )}
        </div>
      </div>
    )
  }

  if (fase === 'em_andamento') {
    return (
      <div className="space-y-6">
        <div className="sticky top-[7.5rem] z-30 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur dark:border-ink-700 dark:bg-ink-900/95">
          <div className="flex items-center gap-2 text-sm font-medium text-ink-700 dark:text-ink-200">
            <Timer className="h-4 w-4" aria-hidden />
            Respondidas: {respondidas}/{quizQuestions.length}
          </div>
          <div
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-lg font-bold tabular-nums ${
              tempoCritico
                ? 'bg-danger-100 text-danger-700 dark:bg-danger-500/20 dark:text-danger-300'
                : 'bg-brand-50 text-brand-800 dark:bg-brand-500/15 dark:text-brand-200'
            }`}
            role="timer"
            aria-live="polite"
          >
            <Clock className="h-5 w-5" aria-hidden />
            {formatTempo(tempoRestante)}
          </div>
        </div>

        <ol className="space-y-5">
          {quizQuestions.map((q) => (
            <li key={q.id} className="surface rounded-xl p-5">
              <p className="text-sm font-semibold text-ink-900 dark:text-white">
                <span className="mr-2 text-brand-700 dark:text-brand-300">{q.id}.</span>
                {q.enunciado}
              </p>
              <fieldset className="mt-3 space-y-2">
                <legend className="sr-only">Alternativas da questão {q.id}</legend>
                {q.opcoes.map((op) => {
                  const selected = respostas[q.id] === op.id
                  return (
                    <label
                      key={op.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
                        selected
                          ? 'border-brand-400 bg-brand-50 dark:border-brand-500 dark:bg-brand-900/30'
                          : 'border-ink-200 hover:bg-ink-50 dark:border-ink-600 dark:hover:bg-ink-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={op.id}
                        checked={selected}
                        onChange={() =>
                          setRespostas((prev) => ({ ...prev, [q.id]: op.id }))
                        }
                        className="mt-0.5 text-brand-700 focus:ring-brand-500"
                      />
                      <span className="text-ink-800 dark:text-ink-100">
                        <strong className="mr-1 uppercase">{op.id})</strong>
                        {op.texto}
                      </span>
                    </label>
                  )
                })}
              </fieldset>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center gap-3 pb-4">
          <button
            type="button"
            onClick={() => finalizar(respostas, false)}
            className="focus-ring rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
          >
            Enviar respostas
          </button>
          <p className="text-xs text-ink-500">
            Tentativa {quizState.tentativasUsadas + 1} de {QUIZ_MAX_TENTATIVAS}
          </p>
        </div>
      </div>
    )
  }

  // resultado
  return (
    <div className="space-y-6">
      <section
        className={`rounded-2xl border p-6 ${
          aprovado
            ? 'border-success-500/40 bg-success-50 dark:bg-success-500/10'
            : 'border-danger-500/40 bg-danger-50 dark:bg-danger-500/10'
        }`}
      >
        <div className="flex flex-wrap items-start gap-3">
          {aprovado ? (
            <Award className="h-8 w-8 text-success-600" aria-hidden />
          ) : (
            <XCircle className="h-8 w-8 text-danger-600" aria-hidden />
          )}
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">
              {aprovado ? 'Aprovado' : 'Reprovado — Tente novamente'}
            </h1>
            <p className="mt-1 text-sm text-ink-700 dark:text-ink-200">
              Pontuação: <strong>{pontuacao}/10</strong>
              {encerradoPorTempo && ' · Tempo esgotado — respostas enviadas automaticamente'}
            </p>
            <p className="mt-1 text-xs text-ink-500">
              Tentativas usadas: {quizState.tentativasUsadas}/{QUIZ_MAX_TENTATIVAS}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {!esgotouTentativas && (
            <button
              type="button"
              onClick={reiniciarTentativa}
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Nova tentativa ({tentativasRestantes} restantes)
            </button>
          )}
          {esgotouTentativas && (
            <button
              type="button"
              onClick={resetarTodasTentativas}
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-ink-300 px-4 py-2.5 text-sm font-medium text-ink-800 hover:bg-white/60 dark:border-ink-500 dark:text-ink-100 dark:hover:bg-ink-800"
            >
              Reiniciar contador de tentativas
            </button>
          )}
          <button
            type="button"
            onClick={() => setFase('intro')}
            className="focus-ring rounded-lg border border-ink-300 px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-white/60 dark:border-ink-500 dark:text-ink-200 dark:hover:bg-ink-800"
          >
            Voltar ao início da avaliação
          </button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white">
          Gabarito comentado
        </h2>
        <ol className="mt-4 space-y-4">
          {quizQuestions.map((q) => {
            const marcada = respostas[q.id]
            const acertou = marcada === q.correta
            return (
              <li key={q.id} className="surface rounded-xl p-4">
                <p className="text-sm font-semibold text-ink-900 dark:text-white">
                  {q.id}. {q.enunciado}
                </p>
                <p className="mt-2 text-sm">
                  <span
                    className={
                      acertou
                        ? 'font-medium text-success-600 dark:text-success-400'
                        : 'font-medium text-danger-600 dark:text-danger-400'
                    }
                  >
                    Sua resposta: {marcada ? marcada.toUpperCase() : '— (em branco)'}
                    {acertou ? ' ✓' : ' ✗'}
                  </span>
                  <span className="mx-2 text-ink-300">|</span>
                  <span className="font-medium text-brand-700 dark:text-brand-300">
                    Correta: {q.correta.toUpperCase()}
                  </span>
                </p>
                <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
                  {q.opcoes.find((o) => o.id === q.correta)?.texto}
                </p>
                <p className="mt-2 rounded-lg bg-ink-50 p-3 text-sm leading-relaxed text-ink-700 dark:bg-ink-900/50 dark:text-ink-200">
                  {q.comentario}
                </p>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
