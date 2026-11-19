import type { Golpe } from '../types'

export const golpes: Golpe[] = [
  {
    id: 'pix',
    titulo: 'Golpe do Pix / Falsa Confirmação de Pagamento',
    categoria: 'financeiro',
    tag: 'Financeiro',
    comoAcontece:
      'O golpista envia um comprovante adulterado de Pix ou diz que o pagamento foi agendado. No atendimento, a equipe libera o produto ou serviço antes de conferir o extrato real da conta.',
    sinalAlerta:
      'Comprovante com dados estranhos, valor diferente do combinado, mensagem de “já paguei, pode liberar” com urgência, ou comprovante de agendamento (que pode ser cancelado).',
    acaoPreventiva:
      'Só confirme o recebimento no extrato do banco ou do app oficial. Nunca libere mercadoria só com print. Em caso de dúvida, ligue para o cliente no número já salvo.',
  },
  {
    id: 'phishing',
    titulo: 'Phishing via WhatsApp e E-mail',
    categoria: 'phishing',
    tag: 'Phishing',
    comoAcontece:
      'Mensagens falsas se passam pela Receita Federal, bancos ou fornecedores, pedindo pagamento urgente de boletos ou acesso a links para “regularizar” CNPJ, conta ou pedido.',
    sinalAlerta:
      'Remetente desconhecido, erros de português, links encurtados, domínios estranhos (ex.: gov-br-suporte.com) e cobrança com prazo curto (48h) ameaçando bloqueio.',
    acaoPreventiva:
      'Não clique. Acesse diretamente gov.br, e-CAC ou o site oficial do banco pelo navegador. Confirme cobranças pelo canal oficial do fornecedor.',
  },
  {
    id: 'ransomware',
    titulo: 'Ransomware / Sequestro de Dados',
    categoria: 'ransomware',
    tag: 'Ransomware',
    comoAcontece:
      'Arquivos maliciosos (.exe, .zip, .scr) chegam por e-mail ou WhatsApp. Ao abrir, o malware criptografa documentos, sistemas de gestão e backups locais, exigindo resgate.',
    sinalAlerta:
      'Anexo inesperado, extensão diferente de .pdf em “boleto”, mensagem pedindo para “habilitar macros” ou executar instalador de “atualização urgente”.',
    acaoPreventiva:
      'Não abra anexos suspeitos. Mantenha backups offline/na nuvem separados. Atualize o sistema e use antivírus. Em ataque, desconecte a máquina da rede e busque suporte técnico.',
  },
  {
    id: 'instagram',
    titulo: 'Sequestro de Conta no Instagram / Redes Sociais',
    categoria: 'redes',
    tag: 'Redes Sociais',
    comoAcontece:
      'Sem autenticação em dois fatores (MFA), o golpista invade o perfil comercial, altera a senha e usa a conta para pedir Pix a clientes ou espalhar links maliciosos.',
    sinalAlerta:
      'E-mails de “nova sessão”, posts ou stories que você não fez, mensagens pedindo código de verificação ou links de “confirmação de conta”.',
    acaoPreventiva:
      'Ative MFA em todas as redes e no e-mail da empresa. Use senhas fortes e únicas. Avise clientes se a conta for comprometida e recupere o acesso pelos canais oficiais.',
  },
  {
    id: 'supply',
    titulo: 'Ataque Supply Chain (Fornecedor Conectado)',
    categoria: 'supply',
    tag: 'Supply Chain',
    comoAcontece:
      'Credenciais de sistemas terceirizados (gestão, PDV, ERP na nuvem) são comprometidas. O atacante entra “pelo fornecedor” e acessa dados, vendas ou financeiro da sua empresa.',
    sinalAlerta:
      'Mensagens de “suporte do PDV” pedindo senha, login em horário estranho, e-mails de redefinição não solicitados ou mudanças em cadastros de fornecedores/bancos.',
    acaoPreventiva:
      'Nunca envie senha por WhatsApp. Use MFA nos sistemas. Revise permissões de usuários. Confirme qualquer “atualização” ligando para o suporte oficial no telefone do contrato.',
  },
]

export const filtroLabels: Record<string, string> = {
  todos: 'Todos',
  financeiro: 'Financeiro',
  phishing: 'Phishing',
  ransomware: 'Ransomware',
  redes: 'Redes Sociais',
  supply: 'Supply Chain',
}
