# OdontoSmart — Landing Page

Landing page de captação da clínica **OdontoSmart** (Santa Maria-DF), focada em implantes, lentes de contato dental e clareamento. O único objetivo da página é levar o visitante ao **WhatsApp** da clínica, e cada clique é rastreado como conversão no Google Ads e no Meta Pixel.

- **Produção:** https://odontosmartdf.com
- **Repositório:** https://github.com/NycollasMartins/LP_OdontoSmart

---

## Sumário

1. [Stack](#stack)
2. [Rodando localmente](#rodando-localmente)
3. [Scripts](#scripts)
4. [Estrutura de pastas](#estrutura-de-pastas)
5. [Mapa da página (seções)](#mapa-da-página-seções)
6. [Guia rápido: onde alterar cada coisa](#guia-rápido-onde-alterar-cada-coisa)
7. [Rastreamento e conversões](#rastreamento-e-conversões)
8. [SEO](#seo)
9. [Deploy](#deploy)
10. [Checklist antes de subir](#checklist-antes-de-subir)
11. [Débitos técnicos conhecidos](#débitos-técnicos-conhecidos)

---

## Stack

| Camada       | Tecnologia                                                 |
| ------------ | ---------------------------------------------------------- |
| UI           | React 19 + TypeScript                                      |
| Build / dev  | Vite 6                                                     |
| Estilo       | Tailwind CSS v4 (via `@tailwindcss/vite`, sem config file) |
| Ícones       | `lucide-react` + 4 SVGs próprios no fim do `App.tsx`        |
| Servidor     | `serve` (arquivos estáticos de `dist/`)                    |
| Node         | **>= 22** (definido em `package.json > engines`)           |

É um site **100% estático**: não tem backend, banco de dados, formulário nem variável de ambiente obrigatória.

---

## Rodando localmente

```bash
git clone https://github.com/NycollasMartins/LP_OdontoSmart.git
cd LP_OdontoSmart
npm install
npm run dev
```

Acesse http://localhost:3001. O hot reload já vem ligado.

> Não é preciso criar `.env`. O `.env.example` é herança do template do Google AI Studio e não é usado pela página (veja [Débitos técnicos](#débitos-técnicos-conhecidos)).

---

## Scripts

| Comando           | O que faz                                                      |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento na porta **3001**                  |
| `npm run lint`    | Checagem de tipos com `tsc --noEmit` (rode antes de subir)     |
| `npm run build`   | Gera a versão de produção em `dist/`                           |
| `npm run preview` | Serve o `dist/` localmente pelo Vite, para conferir o build    |
| `npm start`       | Serve o `dist/` com `serve` na porta **3001** (usado em produção) |
| `npm run clean`   | Apaga o `dist/`                                                |

---

## Estrutura de pastas

```
.
├── index.html          # <head>: SEO, Open Graph, Google Ads e Meta Pixel
├── src/
│   ├── main.tsx        # Ponto de entrada React (não precisa mexer)
│   ├── App.tsx         # A PÁGINA INTEIRA: textos, seções, links e componentes
│   └── index.css       # Só importa o Tailwind
├── public/             # Arquivos servidos na raiz do site (/arquivo.ext)
│   ├── *.webp          # Imagens usadas na página
│   ├── favicon.ico
│   ├── robots.txt      # Instruções para buscadores
│   ├── sitemap.xml     # Mapa do site para o Google
│   └── _headers        # Regras de cache (Netlify / Cloudflare Pages)
├── serve.json          # Regras de cache usadas pelo `npm start` (produção atual)
├── vercel.json         # Regras de cache, caso o deploy migre para a Vercel
├── vite.config.ts      # Configuração do Vite (plugins React + Tailwind)
├── tsconfig.json
├── metadata.json       # Metadado do Google AI Studio (não afeta o site)
└── .env.example        # Herança do AI Studio (não usado)
```

**Regra principal:** quase toda alteração de conteúdo acontece em [`src/App.tsx`](src/App.tsx). O [`index.html`](index.html) só muda quando o assunto é SEO, metatags ou pixels.

---

## Mapa da página (seções)

Em `src/App.tsx`, cada seção começa com um comentário do tipo `{/* Section N: Nome */}`. **Busque o comentário com Ctrl/Cmd + F** em vez de confiar em números de linha, porque eles mudam a cada edição.

| #  | Comentário no código          | Âncora (`id`)   | Conteúdo                                                        |
| -- | ----------------------------- | --------------- | --------------------------------------------------------------- |
| –  | `Header / Navbar`             | –               | Logo, menu (Tratamentos, Diferenciais, Dúvidas) e botão do WhatsApp |
| 1  | `Section 1: Hero`             | –               | Título principal, CTA, carrossel de antes/depois, selo "5.0 no Google" |
| 2  | `Section 2: O Problema`       | –               | Banner do Dr. Marcus e 4 dores do paciente                      |
| 3  | `Section 3: A Solução`        | `#tratamentos`  | Os 4 tratamentos e o card "O resultado?"                        |
| 4  | `Section 4: Diferenciais`     | `#diferenciais` | 4 cards de diferenciais                                         |
| 5  | `Section 5: Comparação`       | –               | Tabela Convencional x OdontoSmart (cartões no mobile, tabela no desktop) |
| 6  | `Section 6: Como Funciona`    | –               | 3 passos, com imagem de fundo                                    |
| 7  | `Section 7: Credibilidade`    | –               | Grade de tecnologias (câmera 3D, DDS, facetas etc.)             |
| 8  | `Section 8: Sinais de Alerta` | –               | Lista "Quando você DEVE procurar o Dr. Marcus"                  |
| 9  | `Section 9: Localização`      | –               | Endereço, horários, telefone, botões do Maps e do WhatsApp      |
| 10 | `Section 10: CTA Final Forte` | –               | Chamada final e checklist de benefícios                         |
| 11 | `Section 11: FAQ`             | `#faq`          | Perguntas frequentes (acordeão)                                 |
| –  | `<footer>`                    | –               | Marca, redes sociais, navegação, horários, CRO do responsável   |

### Componentes internos (todos em `App.tsx`)

| Componente / constante | Função                                                                    |
| ---------------------- | ------------------------------------------------------------------------- |
| `Button`               | Botão/link padrão. Variantes: `primary` (verde), `secondary` (azul), `outline`. Se recebe `href` do WhatsApp, **dispara o rastreamento sozinho**. |
| `HeroCarousel`         | Carrossel do Hero. Troca a cada 5,5 s e tem setas e indicadores.          |
| `AccordionItem`        | Item do FAQ (pergunta + resposta).                                        |
| `WhatsAppIcon`, `StarIcon`, `MonitorPlayIcon`, `SunIcon` | Ícones SVG próprios.                    |
| `COMPARISON_ROWS`      | Linhas da tabela da Seção 5.                                              |
| `HERO_CAROUSEL_SLIDES` | Imagens do carrossel da Seção 1.                                          |

---

## Guia rápido: onde alterar cada coisa

### Número do WhatsApp e mensagem pré-preenchida

No topo de `src/App.tsx`:

```ts
const WHATSAPP_E164 = '556182300181';                          // 55 + DDD + número, só dígitos
const WHATSAPP_PRESET_MESSAGE = 'Olá, quero fazer um agendamento';
```

Todos os botões usam `WHATSAPP_URL`, que é montado a partir dessas duas constantes. **Atenção:** o número que aparece escrito na Seção 9 (`+55 61 8230-0181`) é texto fixo e também precisa ser trocado à mão (busque por `8230-0181`).

### Textos, títulos e CTAs

Edite direto no JSX da seção correspondente (veja o [mapa](#mapa-da-página-seções)). Para achar um texto, busque um trecho dele no `App.tsx`.

### Imagens

1. Coloque o arquivo em `public/`, de preferência em **`.webp`** e com menos de ~200 KB.
2. Referencie pelo caminho a partir da raiz, por exemplo `src="/minha-imagem.webp"`.

| Onde aparece             | Arquivo                       | Onde trocar no código                  |
| ------------------------ | ----------------------------- | -------------------------------------- |
| Carrossel do Hero        | `Lente.webp`, `clareamento.webp`, `aparelho-dental.webp` | Array `HERO_CAROUSEL_SLIDES` |
| Foto do Dr. Marcus (Seção 2) | `image-section-problema.webp` | Busque o nome do arquivo           |
| Logo do header           | `logo-icon-header.webp`       | Header e `<link rel="preload">` no `index.html` |
| Logo do rodapé / Open Graph | `logo-icon-footer.webp`    | Footer e metatags `og:image` / `twitter:image` |
| Fundo da Seção 6         | URL externa do **Unsplash**   | `style={{ backgroundImage: ... }}` na Seção 6 |

> Se trocar a **primeira** imagem do carrossel, atualize também o `<link rel="preload" href="/Lente.webp">` no `index.html`. Ela é pré-carregada por ser o maior elemento visível ao abrir a página (LCP).

### Cores

As cores estão **direto nas classes Tailwind** (ex.: `text-[#1a457c]`), não em variáveis. Para trocar uma cor no site inteiro, use buscar e substituir em `App.tsx`:

| Cor       | Uso                                         |
| --------- | ------------------------------------------- |
| `#1a457c` | Azul da marca (títulos, header, fundos)     |
| `#12315a` | Azul escuro (hover, gradientes)             |
| `#0f294a` | Fundo do rodapé                             |
| `#38bdf8` | Azul claro de destaque (ícones, detalhes)   |
| `#166534` / `#22c55e` | Verdes dos botões de CTA        |
| `#25D366` | Verde WhatsApp (checks do Hero)             |

A fonte é a **Montserrat** (Google Fonts), carregada no `index.html` e aplicada no logo via `font-[Montserrat,sans-serif]`.

### FAQ

Na Seção 11, cada pergunta é um `<AccordionItem question="..." answer="..." />`. Para adicionar, remover ou reordenar, basta copiar, apagar ou mover a linha.

### Tabela comparativa (Seção 5)

Edite o array `COMPARISON_ROWS` no topo do arquivo. A mesma fonte alimenta a versão mobile e a desktop.

### Endereço, horários e redes sociais

| Informação            | Onde está                                                          |
| --------------------- | ------------------------------------------------------------------ |
| Endereço              | Seção 9 (busque `CL 116`)                                          |
| Link do Google Maps   | Seção 9 (busque `maps.app.goo.gl`)                                 |
| Horários              | **Dois lugares:** Seção 9 **e** rodapé (busque `9h às 18h`)        |
| Instagram / Facebook  | Rodapé (busque `instagram.com` / `facebook.com`)                   |
| CRO do responsável    | Última linha do rodapé (busque `CRO-DF`)                           |
| Nota do Google (5.0)  | Seção 1 (busque `5.0 no Google`)                                   |

### Itens do menu

No header, os links usam âncoras (`#tratamentos`, `#diferenciais`, `#faq`). Para criar um item novo, dê um `id` à seção de destino e copie a classe `scroll-mt-*` das seções que já têm âncora. Ela compensa a altura do header fixo.

---

## Rastreamento e conversões

Há duas partes, e as duas precisam estar consistentes:

**1. Carregamento dos pixels: `index.html`**

- **Google Ads:** ID `AW-10784260927`
- **Meta Pixel:** ID `4510450285840688` (dispara `PageView`)
- Para não prejudicar a performance, os scripts externos só carregam **depois da primeira interação** (scroll, toque, tecla) **ou 3,5 s após o carregamento**. Os eventos disparados antes disso ficam na fila e são enviados depois.

**2. Evento de conversão: `src/App.tsx`, função `trackWhatsAppClick`**

Todo clique em link do WhatsApp dispara:

| Plataforma | Evento                                                       |
| ---------- | ------------------------------------------------------------ |
| Meta       | `Lead` (`content_name: whatsapp_click`)                      |
| Google     | `generate_lead` + `conversion` (`send_to: AW-10784260927`)   |

> **Para trocar o ID do Google Ads**, altere em **três lugares**: os dois no `index.html` (`gtag('config', ...)` e a URL do `gtag/js?id=...`) e a constante `GOOGLE_ADS_ID` no `App.tsx`.
> **Para trocar o ID do Meta Pixel**, altere os dois lugares do `index.html` (`fbq('init', ...)` e o `<noscript>` no `<body>`).
>
> Se for usar um rótulo de conversão específico do Google Ads, o `send_to` deve ficar no formato `AW-XXXX/rotulo`.

**Novo link de WhatsApp:** prefira o componente `<Button href={WHATSAPP_URL}>`, que já rastreia sozinho. Se usar um `<a>` comum, inclua `onClick={trackWhatsAppClick}`, ou o clique **não vai contar como conversão**.

**Como validar:** use as extensões *Meta Pixel Helper* e *Google Tag Assistant*, interaja com a página e clique num botão do WhatsApp.

---

## SEO

| Item                         | Onde                                   |
| ---------------------------- | -------------------------------------- |
| `<title>` e meta description | `index.html`                           |
| Open Graph / Twitter Card    | `index.html` (prévia ao compartilhar o link) |
| Idioma                       | `<html lang="pt-BR">` no `index.html`  |
| robots.txt                   | `public/robots.txt`                    |
| Sitemap                      | `public/sitemap.xml`                   |

Se o domínio mudar, atualize `https://odontosmartdf.com` no `index.html`, no `robots.txt` e no `sitemap.xml`.

---

## Deploy

**Fluxo:** o deploy parte do GitHub. Faça push na `main`, e a hospedagem baixa o código e executa:

```bash
npm install
npm run build   # gera dist/
npm start       # serve -s dist -l 3001
```

- O servidor de produção atende na **porta 3001**. Os headers de resposta indicam que hoje o site é servido pelo pacote `serve`, e as regras de cache dele ficam em `serve.json`.
- Não há variáveis de ambiente obrigatórias.
- **Cache:** `index.html` não é cacheado (`max-age=0`), então cada deploy aparece na hora. Os arquivos em `/assets/` têm hash no nome e ficam em cache por 1 ano.

> **Importante sobre imagens:** os arquivos de `public/` (ex.: `Lente.webp`) **não têm hash no nome** e são servidos com cache "imutável" de 1 ano. Ao **substituir** uma imagem, **use um nome novo** (ex.: `Lente-v2.webp`) e atualize a referência. Se mantiver o mesmo nome, quem já visitou o site continua vendo a imagem antiga.

### Outras plataformas (caso migre)

O repositório já tem configuração de cache para outras plataformas:

| Plataforma                  | Arquivo usado      | Configuração                                   |
| --------------------------- | ------------------ | ---------------------------------------------- |
| Vercel                      | `vercel.json`      | Framework: Vite (detectado automaticamente)    |
| Netlify / Cloudflare Pages  | `public/_headers`  | Build: `npm run build` · Publish: `dist`       |

Se mudar uma regra de cache, mantenha os três arquivos (`serve.json`, `vercel.json` e `public/_headers`) coerentes entre si.

---

## Checklist antes de subir

```bash
npm run lint     # não pode ter erro de tipo
npm run build    # o build precisa passar
npm run preview  # confira visualmente no navegador
```

- [ ] Conferi no **mobile** (DevTools, ~375 px) e no desktop
- [ ] Todos os botões do WhatsApp abrem com o número e a mensagem certos
- [ ] Imagens novas estão em `.webp`, otimizadas e com `alt` descritivo
- [ ] Imagem substituída ganhou **nome novo** (por causa do cache)
- [ ] Se mudei horário, telefone ou endereço, atualizei **todos** os lugares em que eles aparecem

Depois disso, basta `git push` na `main`.

---

## Débitos técnicos conhecidos

Nada aqui impede o site de funcionar. São melhorias recomendadas, em ordem de prioridade:

1. **`App.tsx` monolítico (~1.200 linhas).** O ideal é separar cada seção em `src/sections/*.tsx` e os componentes em `src/components/*.tsx`, e mover os textos para um `src/content.ts`.
2. **Cores fixas no código.** Centralizar como tokens do Tailwind v4 (`@theme` no `index.css`, ex.: `--color-brand: #1a457c`) e usar `text-brand` no lugar de `text-[#1a457c]`.
3. **Dependências sem uso:** `@google/genai`, `express`, `dotenv`, `tsx`, `@types/express`, `autoprefixer`, além da injeção de `GEMINI_API_KEY` no `vite.config.ts`. São herança do template do Google AI Studio e podem ser removidas junto com o `.env.example` e o `metadata.json`.
4. **Arquivos sem uso em `public/`:** `ChatGPT Image 9 de abr. de 2026, 15_08_55.png`, `Logo-Def.png`, `_MG_1125.jpg`, `img-1-carrossel.jpeg`, `img-2-carrossel.jpeg` e `logo-icon.webp`. Eles vão para o deploy sem necessidade. Confirme com o cliente antes de apagar, porque podem ser originais de referência.
5. **Imagem de fundo externa (Seção 6).** Ela vem do Unsplash. Se o link sair do ar, a seção perde o fundo. Recomendado: baixar, converter para `.webp` e colocar em `public/`.
6. **Dados duplicados.** Horários e telefone aparecem em mais de um lugar. Centralizar em constantes evita inconsistência.
7. **Erro de digitação na Seção 8:** "dentadura/**roach**" deveria ser "dentadura/**ponte móvel**". Confirmar com o cliente.
8. **`package.json`** ainda tem o nome `react-example` do template. Pode ser renomeado para `odontosmart-landing`.
9. **Sem testes automatizados nem CI.** Um workflow simples do GitHub Actions rodando `npm run lint && npm run build` a cada push já evitaria deploys quebrados.
