import type { QuizQuestion } from '../types'

export const QUIZ_TEMPO_SEGUNDOS = 15 * 60
export const QUIZ_MAX_TENTATIVAS = 3
export const QUIZ_NOTA_MINIMA = 7

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    enunciado: 'Qual é a principal tática usada para fazer a vítima agir sem pensar?',
    opcoes: [
      { id: 'a', texto: 'Oferecer descontos exagerados' },
      { id: 'b', texto: 'Urgência e medo' },
      { id: 'c', texto: 'Enviar muitos emojis na mensagem' },
      { id: 'd', texto: 'Usar apenas e-mail corporativo' },
    ],
    correta: 'b',
    comentario:
      'Golpistas criam senso de urgência e medo (bloqueio, multa, perda de vendas) para impedir que a pessoa pare e verifique a informação.',
  },
  {
    id: 2,
    enunciado: 'Qual é o formato padrão de um boleto verdadeiro?',
    opcoes: [
      { id: 'a', texto: '.exe' },
      { id: 'b', texto: '.apk' },
      { id: 'c', texto: '.pdf' },
      { id: 'd', texto: '.scr' },
    ],
    correta: 'c',
    comentario:
      'Boletos legítimos costumam vir em PDF. Extensões como .exe, .apk e .scr podem instalar malware ou ransomware.',
  },
  {
    id: 3,
    enunciado: 'O que é a confirmação em duas etapas do WhatsApp?',
    opcoes: [
      { id: 'a', texto: 'Um segundo número de telefone obrigatório' },
      {
        id: 'b',
        texto:
          'Um PIN de seis dígitos que impede o acesso à conta mesmo que o golpista tenha o código SMS',
      },
      { id: 'c', texto: 'Um aplicativo separado de antivírus' },
      { id: 'd', texto: 'Uma senha enviada automaticamente pelo Facebook' },
    ],
    correta: 'b',
    comentario:
      'A confirmação em duas etapas adiciona um PIN. Mesmo com o código SMS, o invasor não entra sem esse PIN.',
  },
  {
    id: 4,
    enunciado:
      'Você recebe no WhatsApp uma mensagem dizendo ser da Receita Federal cobrando débito do CNPJ em 48h. O que fazer?',
    opcoes: [
      { id: 'a', texto: 'Clicar no link e pagar o boleto imediatamente' },
      { id: 'b', texto: 'Responder pedindo mais detalhes pelo mesmo chat' },
      {
        id: 'c',
        texto:
          'Ignorar a mensagem e entrar no site gov.br ou no e-CAC pelo navegador para verificar',
      },
      { id: 'd', texto: 'Encaminhar o link para o contador clicar' },
    ],
    correta: 'c',
    comentario:
      'A Receita não cobra por WhatsApp com links suspeitos. Verifique sempre pelos canais oficiais: gov.br ou e-CAC.',
  },
  {
    id: 5,
    enunciado: 'Como geralmente acontece a clonagem de WhatsApp?',
    opcoes: [
      { id: 'a', texto: 'Pelo Wi-Fi público automaticamente' },
      {
        id: 'b',
        texto: 'O golpista convence a vítima a passar o código de verificação que chega por SMS',
      },
      { id: 'c', texto: 'Só com acesso físico ao aparelho' },
      { id: 'd', texto: 'Pelo Instagram Business' },
    ],
    correta: 'b',
    comentario:
      'O atacante pede o código SMS “de verificação”. Quem passa o código entrega a conta. Nunca compartilhe esse código.',
  },
  {
    id: 6,
    enunciado:
      'Chega um pedido de Pix urgente do “dono” da empresa pelo WhatsApp. Qual a melhor atitude?',
    opcoes: [
      { id: 'a', texto: 'Pagar imediatamente para não atrapalhar o negócio' },
      {
        id: 'b',
        texto:
          'Ligar para o dono no número que já tem salvo e seguir a política interna de aprovação de pagamentos',
      },
      { id: 'c', texto: 'Pedir mais dados no mesmo chat e transferir' },
      { id: 'd', texto: 'Enviar o comprovante para o número que pediu o Pix' },
    ],
    correta: 'b',
    comentario:
      'Confirme por um canal conhecido (ligação no número salvo) e siga a política interna. Golpes de “chefe” exploram hierarquia e urgência.',
  },
  {
    id: 7,
    enunciado: 'Por que muitos golpes chegam na sexta-feira no final da tarde?',
    opcoes: [
      { id: 'a', texto: 'Porque os bancos fecham definitivamente na sexta' },
      {
        id: 'b',
        texto:
          'Porque é mais difícil ligar para fornecedores e bancos fora do horário comercial para confirmar a informação',
      },
      { id: 'c', texto: 'Porque o WhatsApp fica mais lento' },
      { id: 'd', texto: 'Porque a Receita Federal só envia cobranças às sextas' },
    ],
    correta: 'b',
    comentario:
      'Fora do horário comercial fica mais difícil validar com bancos e fornecedores — exatamente o que o golpista quer.',
  },
  {
    id: 8,
    enunciado:
      'Um cliente desconhecido envia um link encurtado (bit.ly) no WhatsApp. O que fazer?',
    opcoes: [
      { id: 'a', texto: 'Clicar para ver do que se trata' },
      { id: 'b', texto: 'Abrir em modo anônimo' },
      {
        id: 'c',
        texto: 'Não clicar e pedir que o cliente mande o conteúdo de outra forma',
      },
      { id: 'd', texto: 'Encaminhar para a equipe testar' },
    ],
    correta: 'c',
    comentario:
      'Links encurtados escondem o destino real. Peça o conteúdo por outro meio (PDF, site completo) sem clicar no atalho.',
  },
  {
    id: 9,
    enunciado: 'Qual ação NÃO ajuda a proteger o WhatsApp da empresa?',
    opcoes: [
      { id: 'a', texto: 'Ativar a confirmação em duas etapas' },
      { id: 'b', texto: 'Manter o aplicativo atualizado' },
      {
        id: 'c',
        texto:
          'Passar o código de verificação do WhatsApp para alguém que ligou dizendo ser do suporte técnico',
      },
      { id: 'd', texto: 'Restringir quem vê foto e status' },
    ],
    correta: 'c',
    comentario:
      'Passar o código de verificação é exatamente o que permite a clonagem. Suporte legítimo nunca pede esse código.',
  },
  {
    id: 10,
    enunciado: 'Qual é a sequência correta ao identificar tentativa de golpe no WhatsApp?',
    opcoes: [
      {
        id: 'a',
        texto:
          'Bloquear o número, denunciar dentro do aplicativo, avisar a equipe e registrar a ocorrência se necessário',
      },
      { id: 'b', texto: 'Responder com xingamentos e depois apagar a conversa' },
      { id: 'c', texto: 'Clicar no link para investigar melhor' },
      { id: 'd', texto: 'Ignorar sem avisar ninguém da empresa' },
    ],
    correta: 'a',
    comentario:
      'Bloquear e denunciar reduz o alcance do golpe; avisar a equipe evita novas vítimas; prints ajudam em eventual BO.',
  },
]
