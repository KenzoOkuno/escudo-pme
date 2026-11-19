# Escudo PME — Cibersegurança para Pequenos Negócios

**Protótipo funcional** desenvolvido no âmbito de um **Projeto de Extensão** da **Universidade Presbiteriana Mackenzie**.

Este repositório contém a aplicação web educativa e o documento de referência do projeto. Foi pensado para que o **professor avaliador** consiga, em poucos minutos:

1. Entender o que é o trabalho  
2. Abrir o PDF do projeto  
3. Rodar o protótipo localmente e navegar pelos módulos  

---

## Para o professor — leitura rápida

| Item | Descrição |
|------|-----------|
| **Instituição** | Universidade Presbiteriana Mackenzie |
| **Tipo** | Projeto de Extensão — protótipo acadêmico |
| **Público-alvo** | Donos e equipes de pequenos negócios (linguagem não técnica) |
| **Objetivo** | Transformar o material do projeto em uma plataforma prática, visual e educativa contra engenharia social, golpes no WhatsApp, phishing, ransomware e fraudes financeiras |
| **Formato** | Aplicação web responsiva (roda no navegador, sem backend nem chaves de API) |

### O que o protótipo demonstra

A plataforma transforma o conteúdo teórico do projeto em uma experiência interativa, com:

- Conscientização sobre o impacto real dos ciberataques em PMEs (incluindo o dado de que pequenas e médias empresas concentram **mais de 40%** dos ataques, conforme relatórios como Fortinet / FortiGuard Labs e pesquisas da Kaspersky)
- Guia dos **5 golpes digitais** mais relevantes ao cotidiano do pequeno negócio
- **Simulador** de golpe no WhatsApp (caso prático de “suporte PDV”)
- **Checklist operacional** “antes de agir”
- **Avaliação final** com regras acadêmicas: 10 questões, 15 minutos, até 3 tentativas, aprovação com mínimo de **7/10 (70%)**

---

## Documento do projeto (PDF)

O material de referência do Projeto de Extensão está neste repositório:

**[Abrir o PDF — Projeto de Extensão](./Projeto-de-Extensao.pdf)**

> Arquivo na raiz do repositório: `Projeto-de-Extensao.pdf`  
> No GitHub, clique no arquivo acima ou acesse-o pela listagem de arquivos do repositório.

---

## Como executar o protótipo

### Requisitos

- Node.js **18+** (recomendado 20+)
- npm **9+**

### Passos

```bash
npm install
npm run dev
```

Abra no navegador o endereço indicado no terminal (em geral `http://localhost:5173`).

### Outros comandos úteis

```bash
npm run build    # gera a build de produção
npm run preview  # pré-visualiza a build
npm run lint     # verifica o código (oxlint)
```

> **Importante:** não é necessário configurar banco de dados, servidor backend nem variáveis de ambiente. Checklist, tema claro/escuro e tentativas da avaliação ficam salvos no `localStorage` do navegador.

---

## Estrutura dos módulos (o que avaliar na interface)

| # | Módulo | O que o usuário encontra |
|---|--------|---------------------------|
| 1 | **Painel inicial** | Impacto real nas PMEs, engenharia social e ransomware; visão geral de como usar a plataforma |
| 2 | **Guia: 5 golpes** | Cards filtráveis — Golpe do Pix, Phishing (WhatsApp/e-mail), Ransomware, Sequestro de redes sociais, Supply chain — com *como acontece*, *sinal de alerta* e *ação preventiva* |
| 3 | **Simulador** | Mensagem falsa de suporte técnico/PDV; marcação de sinais (urgência, link suspeito, pedido de senha) e análise comentada |
| 4 | **Checklist** | 10 pontos essenciais com checkboxes, progresso, reset e exportação de resumo |
| 5 | **Avaliação** | Teste de 10 questões com cronômetro, limite de tentativas, critério de aprovação e gabarito comentado ao final |

### Regras da avaliação (implementadas no protótipo)

- **Tempo:** 15 minutos (encerramento automático ao zerar o cronômetro)  
- **Tentativas:** até 3 (controle persistente no navegador)  
- **Aprovação:** mínimo de 7 acertos em 10  
- **Resultado:** exibe pontuação, status (Aprovado / Reprovado) e gabarito comentado  

---

## Stack técnica

| Tecnologia | Uso |
|------------|-----|
| Vite | Empacotamento e servidor de desenvolvimento |
| React 19 + TypeScript | Interface e tipagem |
| Tailwind CSS 4 | Estilo responsivo (modo claro/escuro) |
| Lucide React | Ícones |

Não há dependência de APIs externas pagas.

---

## Organização do repositório

```text
├── Projeto-de-Extensao.pdf   ← documento acadêmico de referência
├── README.md                 ← este arquivo
├── package.json
├── index.html
└── src/
    ├── components/           ← cabeçalho e rodapé institucional
    ├── data/                 ← golpes, checklist e questões da avaliação
    ├── hooks/                ← tema e localStorage
    └── modules/              ← Painel, Guia, Simulador, Checklist, Avaliação
```

---

## Observação institucional

Este é um **protótipo acadêmico** de Projeto de Extensão da Universidade Presbiteriana Mackenzie. O conteúdo é **educativo** e **não substitui** assessoria jurídica, contábil ou de segurança da informação profissional.
