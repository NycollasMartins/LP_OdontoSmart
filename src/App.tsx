import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Frown, 
  CameraOff, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Instagram,
  ArrowRight,
  Check,
  X,
  Smile,
  Zap,
  Award,
  ThumbsUp,
  Heart,
  Search,
  Calendar,
  FileText,
  Video,
  Facebook
} from 'lucide-react';

const PRIMARY_COLOR = '#1a457c';
const WHATSAPP_GREEN = '#25D366';

/** +55 61 8230-0181 — sem espaços para wa.me */
const WHATSAPP_E164 = '556182300181';
const WHATSAPP_PRESET_MESSAGE = 'Olá, quero fazer um agendamento';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(WHATSAPP_PRESET_MESSAGE)}`;
const GOOGLE_ADS_ID = 'AW-10784260927';

function isWhatsAppLink(href?: string) {
  if (!href) return false;
  return href.includes('wa.me') || href.includes('whatsapp.com');
}

function trackWhatsAppClick() {
  if (typeof window === 'undefined') return;

  const w = window as Window & {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  };

  if (typeof w.fbq === 'function') {
    w.fbq('track', 'Lead', {
      content_name: 'whatsapp_click',
      content_category: 'contact',
    });
  }

  if (typeof w.gtag === 'function') {
    w.gtag('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: 'whatsapp_click',
    });
    w.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
    });
  }
}

const COMPARISON_ROWS = [
  { trait: 'Planejamento', conventional: 'Moldes de massinha (desconfortáveis)', odonto: 'Câmera Intraoral (rápido e limpo)' },
  { trait: 'Previsibilidade', conventional: 'Surpresa no final do tratamento', odonto: 'Aprova o sorriso antes de começar (DDS)' },
  { trait: 'Naturalidade', conventional: 'Dentes opacos e artificiais (“tecla de piano”)', odonto: 'Translucidez e textura de dente natural' },
  { trait: 'Dor no implante', conventional: 'Pós-operatório doloroso e inchado', odonto: 'Cirurgia guiada minimamente invasiva' },
  { trait: 'Tempo de resultado', conventional: 'Meses de espera', odonto: 'Dias (ou até carga imediata)' },
  { trait: 'Durabilidade', conventional: 'Manutenção frequente', odonto: 'Materiais premium de altíssima duração' },
] as const;

const HERO_CAROUSEL_SLIDES = [
  {
    src: '/Lente.webp',
    alt: 'Antes e depois da lente de contato dental.',
  },
  {
    src: '/clareamento.webp',
    alt: 'Antes e depois de clareamento dental realizado na clínica.',
  },
  {
    src: '/aparelho-dental.webp',
    alt: 'Tratamento com aparelho dental.',
  },
] as const;

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const len = HERO_CAROUSEL_SLIDES.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % len);
    }, 5500);
    return () => window.clearInterval(id);
  }, [len]);

  const go = (delta: number) => {
    setActive((a) => (a + delta + len) % len);
  };

  return (
    <div className="relative h-[340px] w-full sm:h-[440px] lg:h-[560px]">
      {HERO_CAROUSEL_SLIDES.map((slide, idx) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          loading={idx === 0 ? 'eager' : 'lazy'}
          fetchPriority={idx === 0 ? 'high' : 'auto'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
            idx === active ? 'z-[1] opacity-100' : 'z-0 opacity-0'
          }`}
        />
      ))}

      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1a457c] shadow-md backdrop-blur-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a457c] md:left-3"
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1a457c] shadow-md backdrop-blur-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a457c] md:right-3"
        aria-label="Próxima imagem"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        className="absolute top-4 left-0 right-0 z-[2] flex justify-center gap-2"
        role="tablist"
        aria-label="Selecionar imagem do carrossel"
      >
        {HERO_CAROUSEL_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={idx === active}
            aria-label={`Imagem ${idx + 1} de ${len}`}
            onClick={() => setActive(idx)}
            className="flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                idx === active ? 'w-8 bg-white shadow' : 'w-2 bg-white/75 hover:bg-white'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Marca WhatsApp (glyph oficial), herda `currentColor` via `fill`. */
function WhatsAppIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Button({ children, className = '', variant = 'primary', href, onClick, ...props }: any) {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1";
  const variants = {
    primary: "bg-[#166534] text-white hover:bg-[#14532d]",
    secondary: "bg-[#1a457c] text-white hover:bg-[#12315a]",
    outline: "border-2 border-[#1a457c] text-[#1a457c] hover:bg-[#1a457c] hover:text-white"
  };
  const cls = `${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onClick={(event) => {
          if (isWhatsAppLink(href)) {
            trackWhatsAppClick();
          }
          onClick?.(event);
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}

function AccordionItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex w-full justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-[#1a457c]">{question}</span>
        {isOpen ? <ChevronUp className="text-[#1a457c]" /> : <ChevronDown className="text-[#1a457c]" />}
      </button>
      <div className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="pb-4">{answer}</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-[#1a457c] selection:text-white">
      
      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 flex items-center justify-between">
          <a
            href="#"
            className="flex min-w-0 max-w-[min(100%,calc(100vw-10rem))] shrink-0 items-center gap-2.5 leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a457c] focus-visible:ring-offset-0 rounded-md sm:max-w-none sm:gap-3 md:gap-4"
            aria-label="OdontoSmart — Sorriso em excelência"
          >
            <img
              src="/logo-icon-header.webp"
              alt=""
              className="h-11 w-auto shrink-0 object-contain sm:h-[3.25rem] md:h-[3.75rem] lg:h-[4.25rem] xl:h-[4.75rem]"
              width={112}
              height={112}
              decoding="async"
            />
            <div className="min-w-0 flex-1 text-left font-[Montserrat,sans-serif] sm:flex-none">
              <span className="block text-[1.05rem] uppercase leading-[1.05] tracking-[-0.02em] text-[#1a457c] sm:text-[1.35rem] md:text-[1.5rem] lg:text-[1.65rem] xl:text-[1.75rem]">
                <span className="font-bold">ODONTO</span>
                <span className="font-medium">SMART</span>
              </span>
              <div className="mt-[0.3rem] flex items-center gap-1.5 sm:mt-[0.35rem] sm:gap-2 md:gap-2.5">
                <span
                  className="h-px min-w-[1.25rem] flex-1 bg-[#1a457c]/45 sm:min-w-[2rem] md:min-w-[2.5rem]"
                  aria-hidden
                />
                <span className="shrink-0 text-[0.45rem] font-normal uppercase leading-none tracking-[0.2em] text-[#1a457c] sm:text-[0.5rem] sm:tracking-[0.22em] md:text-[0.5625rem] lg:text-[0.625rem]">
                  SORRISO EM EXCELÊNCIA
                </span>
              </div>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-6 lg:gap-7">
            <a href="#tratamentos" className="text-gray-700 hover:text-[#1a457c] font-semibold transition-colors text-base lg:text-lg leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a457c] rounded-sm">Tratamentos</a>
            <a href="#diferenciais" className="text-gray-700 hover:text-[#1a457c] font-semibold transition-colors text-base lg:text-lg leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a457c] rounded-sm">Diferenciais</a>
            <a href="#faq" className="text-gray-700 hover:text-[#1a457c] font-semibold transition-colors text-base lg:text-lg leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a457c] rounded-sm">Dúvidas</a>
            <Button href={WHATSAPP_URL} className="px-5 py-2.5 text-sm lg:text-base min-h-0 shadow-md hover:shadow-lg hover:-translate-y-px">
              <WhatsAppIcon className="w-4 h-4 shrink-0 lg:w-5 lg:h-5 mr-2" />
              Agendar Consulta
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-[4.5rem] sm:pt-24 md:pt-28 lg:pt-28 xl:pt-32">
      {/* Section 1: Hero */}
      <section className="relative pt-0 pb-20 lg:pb-32 overflow-hidden bg-white">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 pointer-events-none">
          <div className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-blue-50/80 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-7 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#1a457c] leading-[1.15] tracking-tight mb-4 md:mb-6">
                Seu sorriso está te impedindo de viver com confiança?
              </h1>

              <div className="mb-6 flex flex-col justify-center gap-4 sm:flex-row md:mb-8 lg:justify-start">
                <Button href={WHATSAPP_URL} className="px-6 py-5 md:px-8 md:py-4 text-sm sm:text-base md:text-lg w-full sm:w-auto shadow-xl shadow-[#25D366]/20 h-auto whitespace-normal text-center">
                  <WhatsAppIcon className="w-5 h-5 shrink-0 md:w-6 md:h-6 mr-2" />
                  <span>QUERO TRANSFORMAR MEU SORRISO PELO WHATSAPP</span>
                </Button>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl text-[#1a457c]/80 font-medium mb-8 md:mb-10 leading-snug">
                Descubra como transformar seus dentes em poucos dias sem dor e com resultado definitivo.
              </p>
              
              <p className="text-base sm:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed">
                Centenas de pacientes já recuperaram o sorriso, a autoestima e a liberdade de sorrir à vontade com os procedimentos estéticos do Dr. Marcus na OdontoSmart. Implantes definitivos, lentes de contato dental e clareamento de alto impacto com tecnologia de ponta e resultado que você vê no espelho já na primeira sessão.
              </p>
              
              <div className="flex flex-col gap-3 md:gap-4 text-left inline-flex">
                <div className="flex items-center text-gray-700 font-medium text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] mr-3 flex-shrink-0" />
                  <span>Procedimentos rápidos e sem dor</span>
                </div>
                <div className="flex items-center text-gray-700 font-medium text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] mr-3 flex-shrink-0" />
                  <span>Resultado estético imediato e duradouro</span>
                </div>
                <div className="flex items-center text-gray-700 font-medium text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] mr-3 flex-shrink-0" />
                  <span>Atendimento personalizado com Dr. Marcus</span>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="lg:col-span-5 relative mt-8 md:mt-12 lg:mt-0 max-w-md mx-auto lg:max-w-none w-full">
              {/* Decorative offset border */}
              <div className="absolute inset-0 border-2 border-[#1a457c]/10 rounded-[2rem] md:rounded-[2.5rem] transform translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6"></div>
              
              <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-white">
                <HeroCarousel />
              </div>

              {/* Card de avaliação — abaixo do carrossel */}
              <div className="relative z-30 mt-4 flex justify-center px-1 sm:mt-5 sm:justify-start sm:px-0 md:mt-6">
                <div className="flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl sm:max-w-none sm:justify-start sm:gap-4 md:p-4">
                  <div className="flex-shrink-0 rounded-full bg-[#1a457c] p-2 text-white shadow-inner md:p-2.5">
                    <StarIcon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="min-w-0 text-left">
                  <p className="text-[0.65rem] font-medium uppercase tracking-wider text-gray-700 md:text-xs">Avaliação</p>
                    <p className="text-sm font-bold text-[#1a457c] md:text-lg">5.0 no Google</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Section 2: O Problema */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Banner (Image 2 Style) */}
          <div className="bg-gradient-to-br from-[#1a457c] to-[#2a5a9c] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 relative mt-12 shadow-2xl">
            
            {/* Left side: Image overlapping */}
            <div className="w-full md:w-5/12 relative flex justify-center md:justify-start">
              <div className="relative -mt-20 md:-mt-28 z-10 w-full max-w-[320px] md:max-w-none">
                <img 
                  src="/image-section-problema.webp"
                  alt="Retrato profissional de dentista masculino sorrindo, com jaqueta azul em consultório moderno."
                  className="w-full h-[350px] md:h-[450px] object-cover object-[center_35%] rounded-[2rem] shadow-2xl border-4 md:border-8 border-white bg-white"
                  loading="lazy"
                  decoding="async"
                />
                {/* White card overlapping */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white rounded-2xl p-4 md:p-5 shadow-xl text-center border border-gray-100">
                  <p className="font-bold text-[#1a457c] text-lg md:text-xl">Dr. Marcus</p>
                  <p className="text-sm md:text-base text-gray-700 font-medium">Especialista em Estética</p>
                </div>
              </div>
            </div>

            {/* Right side: Text and CTA */}
            <div className="w-full md:w-7/12 text-center md:text-left mt-12 md:mt-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Você não está sozinho nessa insatisfação
              </h2>
              <p className="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed">
                Muitas pessoas deixam de aproveitar os melhores momentos da vida por vergonha do próprio sorriso. Estima-se que mais de 50% dos brasileiros adultos apresentam alguma insatisfação. <br className="hidden md:block" /><br className="hidden md:block" />
                <span className="font-semibold text-white">Mas a solução é muito mais simples, rápida e indolor do que você imagina.</span>
              </p>
              <Button href={WHATSAPP_URL} className="px-8 py-4 text-sm sm:text-base md:text-lg w-full sm:w-auto bg-[#22c55e] hover:bg-[#16a34a] border border-[#86efac]/80 shadow-[0_14px_32px_rgba(34,197,94,0.45)]">
                QUERO FAZER MINHA CONSULTA
              </Button>
            </div>
          </div>

          {/* 4 Items Below Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
            {/* Item 1 */}
            <div className="flex items-start gap-4 group">
              <div className="bg-blue-50 p-2.5 rounded-xl flex-shrink-0 group-hover:bg-[#38bdf8] transition-colors">
                <CameraOff className="w-6 h-6 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-[#1a457c] font-bold mb-1.5 leading-tight">Evita sorrir nas fotos</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sempre procura o melhor ângulo para esconder os dentes ou sorri de boca fechada.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4 group">
              <div className="bg-blue-50 p-2.5 rounded-xl flex-shrink-0 group-hover:bg-[#38bdf8] transition-colors">
                <Frown className="w-6 h-6 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-[#1a457c] font-bold mb-1.5 leading-tight">Perdeu um ou mais dentes</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sente dificuldade para mastigar e insegurança ao falar em público.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4 group">
              <div className="bg-blue-50 p-2.5 rounded-xl flex-shrink-0 group-hover:bg-[#38bdf8] transition-colors">
                <AlertCircle className="w-6 h-6 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-[#1a457c] font-bold mb-1.5 leading-tight">Próteses desconfortáveis</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Usa dentaduras ou pontes móveis que machucam e não trazem segurança.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-4 group">
              <div className="bg-blue-50 p-2.5 rounded-xl flex-shrink-0 group-hover:bg-[#38bdf8] transition-colors">
                <Activity className="w-6 h-6 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-[#1a457c] font-bold mb-1.5 leading-tight">Dentes manchados ou desgastados</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sente que o sorriso envelhece o seu rosto e prejudica sua imagem pessoal.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: A Solução */}
      <section id="tratamentos" className="scroll-mt-[4.75rem] sm:scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-32 xl:scroll-mt-36 py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a457c] mb-6">
                O sorriso que você sempre quis com resultado definitivo, segurança e tecnologia de ponta
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Imagine sorrir sem esconder os dentes, mastigar qualquer alimento com segurança e se olhar no espelho com orgulho. Na OdontoSmart, nós transformamos essa visão em realidade através de um protocolo exclusivo.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm flex-shrink-0 h-fit">
                    <Search className="w-6 h-6 text-[#1a457c]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a457c] mb-1">Consulta digital completa</h3>
                    <p className="text-gray-600">Câmera intraoral 3D sem moldes de massinha desconfortáveis.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm flex-shrink-0 h-fit">
                    <ShieldCheck className="w-6 h-6 text-[#1a457c]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a457c] mb-1">Implantes dentários de titânio</h3>
                    <p className="text-gray-600">Substituem definitivamente o dente perdido com estabilidade total.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm flex-shrink-0 h-fit">
                    <Sparkles className="w-6 h-6 text-[#1a457c]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a457c] mb-1">Lentes de contato dental</h3>
                    <p className="text-gray-600">Facetas ultrafinas personalizadas para corrigir cor, formato e alinhamento.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm flex-shrink-0 h-fit">
                    <Zap className="w-6 h-6 text-[#1a457c]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a457c] mb-1">Clareamento profissional</h3>
                    <p className="text-gray-600">Clareia até 8 tons em uma única sessão de alto impacto.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-[#1a457c] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                <Sparkles className="w-12 h-12 text-[#38bdf8] mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  O resultado? Você passa a sorrir com confiança.
                </h3>
                <p className="text-lg text-blue-50 mb-6">
                  A transformação é visível desde a primeira sessão. Sem dor, sem resultados artificiais e com a garantia de um trabalho feito por especialistas.
                </p>
                <div className="flex items-center gap-4 text-blue-100 font-medium">
                  <Check className="w-5 h-5 text-[#38bdf8]" />
                  <span>Sorriso natural</span>
                </div>
                <div className="flex items-center gap-4 text-blue-100 font-medium mt-3">
                  <Check className="w-5 h-5 text-[#38bdf8]" />
                  <span>Mastigação perfeita</span>
                </div>
                <div className="flex items-center gap-4 text-blue-100 font-medium mt-3">
                  <Check className="w-5 h-5 text-[#38bdf8]" />
                  <span>Autoestima renovada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Diferenciais */}
      <section id="diferenciais" className="scroll-mt-[4.75rem] sm:scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-32 xl:scroll-mt-36 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a457c] mb-6">
              Por que transformar seu sorriso com o Dr. Marcus é diferente de tudo que você já tentou?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1a457c] transition-colors">
                <ShieldCheck className="w-8 h-8 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#1a457c] mb-4">Implantes que duram a vida toda</h3>
              <p className="text-gray-600">
                Utilizamos implantes de titânio de grau cirúrgico, garantindo estabilidade perfeita, osseointegração rápida e uma duração de décadas sem preocupações.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1a457c] transition-colors">
                <Smile className="w-8 h-8 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#1a457c] mb-4">Lentes com resultado natural</h3>
              <p className="text-gray-600">
                Facetas ultrafinas personalizadas e planejamento digital prévio para evitar sorrisos artificiais. Seu sorriso fica perfeito, mas com a naturalidade que você exige.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1a457c] transition-colors">
                <Zap className="w-8 h-8 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#1a457c] mb-4">Clareamento em uma sessão</h3>
              <p className="text-gray-600">
                Protocolo LED avançado que clareia até 8 tons em uma única visita, sem sensibilidade exagerada e com resultado duradouro.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1a457c] transition-colors">
                <Video className="w-8 h-8 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#1a457c] mb-4">Planejamento digital 3D</h3>
              <p className="text-gray-600">
                Uso de Câmera Intraoral e Design Digital do Sorriso. Você aprova o resultado final na tela do computador antes mesmo de iniciar o tratamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Comparação */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-[22rem] text-center sm:max-w-2xl md:mb-12 md:max-w-none">
            <h2 className="text-balance text-lg font-bold leading-snug tracking-tight text-[#1a457c] sm:text-xl sm:leading-snug md:text-[1.65rem] md:leading-tight lg:text-3xl">
              Tratamento Convencional vs. Estética Avançada com Dr. Marcus
            </h2>
          </div>

          {/* Mobile: cartões empilhados (sem scroll horizontal) */}
          <div className="flex flex-col gap-3.5 md:hidden">
            {COMPARISON_ROWS.map((row) => (
              <article
                key={row.trait}
                className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-md"
              >
                <h3 className="border-b border-gray-100 bg-gray-50 px-4 py-3 text-left text-sm font-bold text-[#1a457c]">
                  {row.trait}
                </h3>
                <div className="space-y-3 px-4 py-4">
                  <div>
                    <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gray-600">
                      Tratamento convencional
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600">{row.conventional}</p>
                  </div>
                  <div className="rounded-xl border border-blue-100 bg-blue-50/90 px-3 py-3">
                    <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[#1a457c]/75">
                      OdontoSmart
                    </p>
                    <p className="text-sm font-semibold leading-relaxed text-[#1a457c]">{row.odonto}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Desktop: tabela */}
          <div className="hidden overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl md:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-1/3 border-b border-gray-200 bg-gray-50 p-6 font-medium text-gray-500">Característica</th>
                    <th className="w-1/3 border-b border-gray-200 bg-gray-100 p-6 text-center font-bold text-gray-600">
                      Tratamento Convencional
                    </th>
                    <th className="w-1/3 border-b border-[#1a457c] bg-[#1a457c] p-6 text-center font-bold text-white">OdontoSmart</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.trait}
                      className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${i === COMPARISON_ROWS.length - 1 ? 'border-b-0' : ''}`}
                    >
                      <td className="p-6 font-medium">{row.trait}</td>
                      <td className="p-6 text-center">{row.conventional}</td>
                      <td className="bg-blue-50/50 p-6 text-center font-bold text-[#1a457c]">{row.odonto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Como Funciona */}
      <section 
        className="relative py-24 lg:py-32 bg-fixed bg-center bg-cover" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a457c]/95 to-[#1a457c]/85"></div>
        
        {/* Top Slanted Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[40px] md:h-[80px]">
            <path d="M1200 0L0 0 0 120 1200 0z" className="fill-white"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8 md:mt-12">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Seu novo sorriso em 3 passos simples
            </h2>
            <p className="text-lg md:text-xl text-blue-50">
              Rápido, sem burocracia e 100% focado no seu bem-estar!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {/* Step 1 */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-5 group">
              <div className="w-14 h-14 rounded-full border-2 border-[#38bdf8] flex items-center justify-center text-[#38bdf8] font-bold text-2xl flex-shrink-0 group-hover:bg-[#38bdf8] group-hover:text-white transition-colors duration-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Agende sua Consulta</h3>
                <p className="text-blue-50 leading-relaxed text-sm lg:text-base">
                  O contato é rápido pelo WhatsApp, sem taxa de consulta. Você passará por uma consulta pessoal e detalhada diretamente com o Dr. Marcus.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-5 group">
              <div className="w-14 h-14 rounded-full border-2 border-[#38bdf8] flex items-center justify-center text-[#38bdf8] font-bold text-2xl flex-shrink-0 group-hover:bg-[#38bdf8] group-hover:text-white transition-colors duration-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Planejamento Digital Completo</h3>
                <p className="text-blue-50 leading-relaxed text-sm lg:text-base">
                  Realizamos todos os exames no local: Câmera Intraoral, Design Digital do Sorriso e análise completa. Tudo rápido, indolor e em um só lugar.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-5 group">
              <div className="w-14 h-14 rounded-full border-2 border-[#38bdf8] flex items-center justify-center text-[#38bdf8] font-bold text-2xl flex-shrink-0 group-hover:bg-[#38bdf8] group-hover:text-white transition-colors duration-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Realize seu Tratamento</h3>
                <p className="text-blue-50 leading-relaxed text-sm lg:text-base">
                  Implante com dente provisório no mesmo dia, lentes em 2-3 sessões ou clareamento imediato. Você sai da clínica com o sorriso transformado.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <Button href={WHATSAPP_URL} className="px-8 py-4 text-lg bg-[#22c55e] hover:bg-[#16a34a] border border-[#86efac]/80 shadow-[0_14px_32px_rgba(34,197,94,0.45)]">
              QUERO AGENDAR A MINHA CONSULTA
            </Button>
          </div>
        </div>
      </section>

      {/* Section 7: Credibilidade */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a457c] mb-6">
              A tecnologia que está revolucionando a estética dental e chegou até você
            </h2>
            <p className="text-lg text-gray-600">
              Equipamentos de ponta para garantir tratamentos mais rápidos, precisos e confortáveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Card 1: Câmera intraoral (Large) */}
            <div className="md:col-span-4 bg-gradient-to-br from-[#1a457c] to-[#12315a] p-8 md:p-10 rounded-3xl shadow-lg text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 h-full">
                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm flex-shrink-0">
                  <Activity className="w-12 h-12 text-[#38bdf8]" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Câmera intraoral 3D</h3>
                  <p className="text-blue-50 text-lg leading-relaxed">
                    Mapeamento preciso da sua boca em minutos, eliminando os antigos e desconfortáveis moldes de massa. Mais conforto e precisão milimétrica para o seu tratamento.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: DDS */}
            <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col justify-center">
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#38bdf8] transition-colors">
                <MonitorPlayIcon className="w-7 h-7 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#1a457c] mb-3">Design Digital do Sorriso (DDS)</h3>
              <p className="text-gray-600">
                Software que permite a visualização do resultado final do seu sorriso antes mesmo de iniciar qualquer procedimento.
              </p>
            </div>

            {/* Card 3: Facetas */}
            <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col justify-center">
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#38bdf8] transition-colors">
                <Sparkles className="w-7 h-7 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#1a457c] mb-3">Facetas de alta performance</h3>
              <p className="text-gray-600">
                Laminados ultrafinos (até 0,3 mm) que garantem máxima durabilidade e uma estética incrivelmente natural.
              </p>
            </div>

            {/* Card 4: Implantes */}
            <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col justify-center">
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#38bdf8] transition-colors">
                <Zap className="w-7 h-7 text-[#1a457c] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#1a457c] mb-3">Implantes de carga imediata</h3>
              <p className="text-gray-600">
                Técnica avançada que possibilita, em casos indicados, que você saia com o dente fixo no mesmo dia da cirurgia.
              </p>
            </div>

            {/* Card 5: Clareamento */}
            <div className="md:col-span-2 bg-[#e0f2fe] p-8 rounded-3xl shadow-sm border border-blue-100 hover:shadow-md transition-all hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-center">
              <div className="absolute -bottom-6 -right-6 text-blue-200 opacity-40 group-hover:scale-110 transition-transform duration-700">
                <SunIcon className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <SunIcon className="w-7 h-7 text-[#38bdf8]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a457c] mb-3">Clareamento LED de alta intensidade</h3>
                <p className="text-[#1a457c]/80 font-medium">
                  Tecnologia que clareia até 8 tons em menos de 2 horas, com protocolos que minimizam a sensibilidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Sinais de Alerta */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 rounded-3xl p-8 md:p-12 border border-red-100">
            <h2 className="text-3xl font-bold text-[#1a457c] mb-8 text-center">
              Quando você DEVE procurar o Dr. Marcus
            </h2>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium">Perdeu um ou mais dentes e sente dificuldade para mastigar.</p>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium">Usa prótese removível (dentadura/roach) que machuca ou solta.</p>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium">Tem dentes muito manchados, amarelados ou escurecidos.</p>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium">Possui dentes lascados, desgastados ou com formato irregular.</p>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium">Sente vergonha de sorrir e esconde a boca com as mãos.</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-red-800 font-bold text-lg mb-6">
                Atenção: Quanto antes você resolve, mais simples, rápido e barato fica o tratamento.
              </p>
              <Button href={WHATSAPP_URL} className="px-8 py-4 text-lg w-full sm:w-auto">
                QUERO AGENDAR A MINHA CONSULTA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Localização */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#1a457c] mb-6 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-[#38bdf8]" />
                Venha nos visitar
              </h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Endereço</p>
                  <p className="text-lg text-gray-700 font-medium">CL 116 G14, 1ºAndar - Santa Maria, Brasília - DF, 72546-200</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-8">
                  <div>
                    <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Horário de Atendimento</p>
                    <div className="flex items-start gap-2 text-gray-700">
                      <Clock className="w-5 h-5 text-[#1a457c] mt-0.5" />
                      <div>
                        <p>Segunda a Sexta: 9h às 18h</p>
                        <p>Sábados: 9h às 12h</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Contato</p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackWhatsAppClick}
                      className="text-lg text-gray-700 font-medium text-[#1a457c] underline-offset-2 hover:underline"
                    >
                      +55 61 8230-0181
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <Button
                variant="outline"
                href="https://maps.app.goo.gl/pJZdLXvTqqciS7Mr7"
                className="px-8 py-4 w-full"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Ver no Google Maps
              </Button>
              <Button href={WHATSAPP_URL} className="px-8 py-4 w-full">
                <WhatsAppIcon className="w-5 h-5 shrink-0 mr-2" />
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: CTA Final Forte */}
      <section className="py-24 bg-[#1a457c] text-white relative overflow-hidden">
        {/* Top Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[30px] md:h-[60px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>

        {/* Clean subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38bdf8] opacity-15 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mt-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Seu sorriso merece o melhor tratamento.<br/>
            <span className="text-[#38bdf8]">E você merece se olhar no espelho com orgulho.</span>
          </h2>
          
          <p className="text-xl text-blue-50 mb-6 leading-relaxed">
            Adiar essa decisão apenas prolonga a sua insatisfação e insegurança.
          </p>
          <p className="text-lg text-blue-100 mb-12">
            Você tem duas escolhas agora: continuar escondendo o seu sorriso nas fotos e sentindo desconforto ao mastigar, ou tomar a decisão de transformar a sua vida com a equipe da OdontoSmart.
          </p>
          
          <Button href={WHATSAPP_URL} className="px-10 py-5 text-xl w-full sm:w-auto mb-12 bg-[#22c55e] hover:bg-[#16a34a] border border-[#86efac]/80 shadow-[0_16px_36px_rgba(34,197,94,0.5)]">
            QUERO TRANSFORMAR MEU SORRISO AGORA
          </Button>
          
          <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-[#38bdf8] flex-shrink-0" />
              <span className="text-sm font-medium">Consulta completa com Dr. Marcus</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-[#38bdf8] flex-shrink-0" />
              <span className="text-sm font-medium">Planejamento digital 3D</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-[#38bdf8] flex-shrink-0" />
              <span className="text-sm font-medium">Procedimentos rápidos e sem dor</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-[#38bdf8] flex-shrink-0" />
              <span className="text-sm font-medium">Resultado natural e personalizado</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm sm:col-span-2 justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#38bdf8] flex-shrink-0" />
              <span className="text-sm font-medium">Implantes com garantia de osseointegração</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: FAQ */}
      <section id="faq" className="scroll-mt-[4.75rem] sm:scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-32 xl:scroll-mt-36 py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a457c] mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600">Tire suas dúvidas sobre os tratamentos estéticos e implantes.</p>
          </div>

          <div className="space-y-2">
            <AccordionItem 
              question="Colocar implante dói?" 
              answer="Não. O procedimento é realizado com anestesia local e, em muitos casos, de forma minimamente invasiva (cirurgia guiada). O pós-operatório costuma ser muito tranquilo, controlado apenas com analgésicos comuns." 
            />
            <AccordionItem 
              question="Quanto tempo demora para colocar um implante?" 
              answer="A cirurgia em si é rápida, muitas vezes durando menos de uma hora por implante. O tempo total do tratamento depende se é possível fazer a carga imediata (dente no mesmo dia) ou se é necessário aguardar a osseointegração (alguns meses)." 
            />
            <AccordionItem 
              question="As lentes de contato dental ficam com aspecto artificial?" 
              answer="De forma alguma. Utilizamos porcelanas de alta tecnologia que imitam a translucidez e a textura dos dentes naturais. O planejamento digital garante que o formato e a cor combinem perfeitamente com o seu rosto." 
            />
            <AccordionItem 
              question="Qual a durabilidade das lentes de contato?" 
              answer="Com os cuidados adequados de higiene e visitas regulares ao dentista, as lentes de porcelana podem durar 10, 15 anos ou mais. Elas são extremamente resistentes e não mancham com café ou vinho." 
            />
            <AccordionItem 
              question="O clareamento causa muita sensibilidade?" 
              answer="Utilizamos protocolos modernos e géis dessensibilizantes que reduzem drasticamente a sensibilidade. A maioria dos pacientes relata um desconforto mínimo ou nulo durante e após a sessão." 
            />
            <AccordionItem 
              question="Não tenho osso suficiente, posso fazer implante?" 
              answer="Sim. Hoje existem técnicas avançadas de enxerto ósseo e implantes curtos que viabilizam o tratamento mesmo para pacientes que perderam dentes há muito tempo." 
            />
            <AccordionItem 
              question="Posso fazer clareamento e lentes juntos?" 
              answer="Sim, é muito comum! Geralmente fazemos o clareamento primeiro para definir a cor base dos seus dentes naturais, e depois confeccionamos as lentes (para os dentes que precisam de correção de formato) na mesma cor alcançada." 
            />
            <AccordionItem 
              question="Quantas lentes preciso colocar?" 
              answer="Depende do seu objetivo e da amplitude do seu sorriso. Algumas pessoas precisam de apenas 4 a 6 lentes nos dentes da frente, enquanto outras optam por 8 a 10 para uma transformação completa. Avaliaremos isso no seu planejamento." 
            />
            <AccordionItem 
              question="O implante tem garantia?" 
              answer="Trabalhamos com as melhores marcas de implantes do mercado, que possuem altíssimas taxas de sucesso (acima de 98%). Oferecemos todo o suporte e acompanhamento para garantir a osseointegração perfeita." 
            />
            <AccordionItem 
              question="Como funciona o pagamento? Vocês parcelam?" 
              answer="Sim! Acreditamos que o sorriso dos sonhos deve ser acessível. Oferecemos diversas formas de pagamento e parcelamento facilitado. Explicaremos todas as opções após a sua consulta." 
            />
            <AccordionItem 
              question="Tenho muito medo de dentista, o que fazer?" 
              answer="Nossa clínica foi desenhada para ser um ambiente acolhedor e relaxante. Nossa equipe é treinada para um atendimento humanizado, respeitando o seu tempo. Explicamos cada passo para que você sinta total segurança." 
            />
            <AccordionItem 
              question="Consigo fazer tudo em uma única visita?" 
              answer="Alguns procedimentos, como o clareamento a laser, são finalizados em uma sessão. Implantes com carga imediata também permitem sair com dentes fixos no mesmo dia. Lentes de contato geralmente exigem de 2 a 3 sessões (consulta/preparo, prova e cimentação)." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      </main>

      <footer className="bg-[#0f294a] text-white pt-10 pb-6 border-t-4 border-[#38bdf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-8">
            {/* Col 1 — marca (layout alinhado ao Logo-Def) */}
            <div className="min-w-0 lg:max-w-none">
              <a
                href="#"
                className="mb-1.5 flex max-w-full items-center gap-3 sm:gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f294a] rounded-md"
                aria-label="OdontoSmart — Sorriso em excelência"
              >
                <img
                  src="/logo-icon-footer.webp"
                  alt=""
                  className="h-[3.25rem] w-auto shrink-0 object-contain brightness-0 invert sm:h-[3.75rem] md:h-[4.25rem] lg:h-[4.75rem] xl:h-[5.25rem]"
                  width={112}
                  height={112}
                  decoding="async"
                />
                <div className="min-w-0 flex-1 text-left font-[Montserrat,sans-serif]">
                  <span className="block text-[1.35rem] uppercase leading-[1.05] tracking-[-0.02em] text-white sm:text-[1.5rem] md:text-[1.65rem] lg:text-[1.75rem] xl:text-[1.9rem]">
                    <span className="font-bold">ODONTO</span>
                    <span className="font-medium">SMART</span>
                  </span>
                  <div className="mt-[0.35rem] flex items-center gap-2 sm:mt-1 sm:gap-2.5">
                    <span
                      className="h-px min-w-[2rem] flex-1 bg-white/85 sm:min-w-[2.5rem]"
                      aria-hidden
                    />
                    <span className="shrink-0 text-[0.5rem] font-normal uppercase leading-none tracking-[0.22em] text-white sm:text-[0.5625rem] md:text-[0.625rem]">
                      SORRISO EM EXCELÊNCIA
                    </span>
                  </div>
                </div>
              </a>
              <p className="text-blue-100 text-sm leading-snug mt-0 mb-4">
                Transformando sorrisos e resgatando a autoestima com tecnologia de ponta, especialistas renomados e atendimento humanizado.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/odontosmart.santamaria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2.5 rounded-lg hover:bg-[#38bdf8] hover:text-[#0f294a] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
                  aria-label="Instagram OdontoSmart Santa Maria"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="bg-white/10 p-2.5 rounded-lg hover:bg-[#38bdf8] hover:text-[#0f294a] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
                  aria-label="WhatsApp — agendamento"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                </a>
                <a
                  href="https://www.facebook.com/odontosmart.santamariadf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2.5 rounded-lg hover:bg-[#38bdf8] hover:text-[#0f294a] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
                  aria-label="Facebook OdontoSmart Santa Maria"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Col 2 */}
            <div className="min-w-0">
              <h3 className="text-base font-bold mb-3 text-white">Navegação</h3>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-[#38bdf8] transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-sm"><ArrowRight className="w-4 h-4" /> Home</a></li>
                <li><a href="#tratamentos" className="hover:text-[#38bdf8] transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-sm"><ArrowRight className="w-4 h-4" /> Tratamentos</a></li>
                <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick} className="hover:text-[#38bdf8] transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-sm"><ArrowRight className="w-4 h-4" /> Consulta</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="min-w-0">
              <h3 className="text-base font-bold mb-3 text-white">Tecnologias</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#38bdf8]" /> Câmera Intraoral 3D</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#38bdf8]" /> Design Digital do Sorriso</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#38bdf8]" /> Cirurgia Guiada</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#38bdf8]" /> Clareamento LED</li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="min-w-0">
              <h3 className="text-base font-bold mb-3 text-white">Atendimento</h3>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Horários</p>
                    <p className="text-sm">Seg a Sex: 9h às 18h</p>
                    <p className="text-sm">Sábados: 9h às 12h</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 mt-2">
                  <ShieldCheck className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Convênios</p>
                    <p className="text-sm">Consulte os planos aceitos na consulta.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-blue-300">
            <p>© {new Date().getFullYear()} OdontoSmart. Todos os direitos reservados.</p>
            <p>Responsável Técnico: Dr. Marcus - CRO-DF 13193</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper icons
function StarIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function MonitorPlayIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
      <polygon points="10 8 15 10 10 12 10 8" />
    </svg>
  )
}

function SunIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}
