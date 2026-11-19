export type SectionId =
  | 'painel'
  | 'golpes'
  | 'simulador'
  | 'checklist'
  | 'avaliacao'

export type GolpeCategoria =
  | 'todos'
  | 'financeiro'
  | 'phishing'
  | 'ransomware'
  | 'redes'
  | 'supply'

export interface Golpe {
  id: string
  titulo: string
  categoria: Exclude<GolpeCategoria, 'todos'>
  tag: string
  comoAcontece: string
  sinalAlerta: string
  acaoPreventiva: string
}

export interface ChecklistItem {
  id: string
  texto: string
}

export interface QuizOption {
  id: 'a' | 'b' | 'c' | 'd'
  texto: string
}

export interface QuizQuestion {
  id: number
  enunciado: string
  opcoes: QuizOption[]
  correta: 'a' | 'b' | 'c' | 'd'
  comentario: string
}

export interface QuizState {
  tentativasUsadas: number
  ultimaPontuacao: number | null
  ultimaAprovacao: boolean | null
}
