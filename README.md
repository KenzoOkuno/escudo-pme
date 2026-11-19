# Escudo PME — Cibersegurança para Pequenos Negócios

Protótipo funcional de plataforma educativa para o **Projeto de Extensão** da **Universidade Presbiteriana Mackenzie**. Destinado a donos e equipes de pequenos negócios que precisam se proteger contra engenharia social, golpes no WhatsApp, phishing, ransomware e fraudes financeiras.

> Não exige backend nem chaves de API. Todo o estado persistente (checklist, tema e tentativas do quiz) fica no `localStorage` do navegador.

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço indicado no terminal (geralmente `http://localhost:5173`).

### Outros comandos

```bash
npm run build    # build de produção (TypeScript + Vite)
npm run preview  # pré-visualiza o build
npm run lint     # oxlint
```

## Módulos

1. **Painel inicial** — impacto dos ciberataques em PMEs (+40%), engenharia social e ransomware  
2. **Guia dos 5 golpes** — cards filtráveis com como acontece, sinal de alerta e ação preventiva  
3. **Simulador** — mensagem falsa de “suporte PDV” no WhatsApp com marcação de sinais de fraude  
4. **Checklist operacional** — 10 itens com persistência, reset e exportação de resumo  
5. **Avaliação final** — 10 questões, 15 minutos, até 3 tentativas, aprovação com 7/10  

## Stack

- Vite + React 19 + TypeScript  
- Tailwind CSS 4  
- Lucide React (ícones)  

## Institucional

Protótipo acadêmico — **Universidade Presbiteriana Mackenzie** — Extensão em Cibersegurança para Pequenos Negócios. Conteúdo educativo; não substitui assessoria jurídica ou de segurança profissional.
